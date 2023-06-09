// import .env variables
require('dotenv').config()

const express = require('express')
const app = express()
// const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001
const { unknownEndpoint, errorHandler } = require('./middlewares')
const Person = require('./models/Person')

// Create a new token for morgan
// morgan.token('body', (req, res) => {
//   return JSON.stringify(req.body)
// })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
// app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Home page route
app.get('/', (request, response) => {
  response.send('<h1>Homepage</h1>')
})

// Get all Persons
app.get('/api/persons', (request, response, next) => {
  Person
    .find({})
    .then(allPerson => response.json(allPerson))
    .catch(error => next(error))
})

// Info page route
app.get('/info', (request, response) => {
  Person
    .find({})
    .then (allPerson => {
      response.send(`Phonebook has info for ${allPerson.length} people
      <br/> <br/> ${new Date()} `)
    })
})

// Individual persons route
app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  Person.findById(id)
    .then(match => {
      // If a match is found, then respond with the found person
      if (match) response.json(match)
      // Otherwise no matching id
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// Delete a person
app.delete('/api/persons/:id', (request, response, next) => {
  Person
    .findByIdAndDelete(request.params.id)
    .then(deleted => {
      // if a person is successfully found and deleted
      if (deleted) response.status(204).end()
      // Otherwise no id match is found. Response 404
      else response.status(404).end()
    })
    .catch(error => next(error))
})

// Add a new person
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const newPerson = new Person({
    name: body.name,
    number: body.number
  })

  newPerson
    .save()
    .then(addedPerson => response.status(201).json(addedPerson))
    .catch(error => next(error) )
})

// Edit the number of existing person
app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const body = request.body

  const updatedPerson = {
    name: body.name,
    number: body.number
  }

  Person
    .findByIdAndUpdate(id, updatedPerson, { new: true })
    .then(result => response.json(result))
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

// Listening to PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
