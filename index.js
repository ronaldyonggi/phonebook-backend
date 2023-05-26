const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3001

// Create a new token for morgan
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body)
})

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// Home page route
app.get('/', (request, response) => {
  response.send('<h1>Homepage</h1>')
})

// persons API route
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

// Info page route
app.get('/info', (request, response) => {
  response.send(`Phonebook has info for ${persons.length} people
   <br/> <br/> ${new Date()} `)
})

// Individual persons route
app.get('/api/persons/:id', (request, response) => {
  const requestId = Number(request.params.id)
  const matchingPerson = persons.find(person => person.id === requestId)

  // If a match is found, respond with that person's json
  if (matchingPerson) {
    response
      .status(200)
      .json(matchingPerson)
  } else {
      response
        .status(404)
        .json({error: "person not found!"})
  }

})

// Delete a person
app.delete('/api/persons/:id', (request, response) => {
  const requestId = Number(request.params.id)

  // Update the persons data to exclude person that has matching id
  persons = persons.filter(person => person.id !== requestId)

  response
    .status(204)
    .end()
})

// Add a new person
app.post('/api/persons', (request, response) => {
  const body = request.body

  // If name or number is missing, send error
  if (!body.name) {
    return response
            .status(400)
            .json({error: "name is missing!"})
  } else if (!body.number) {
    return response
            .status(400)
            .json({error: "number is missing!"})
  }

  // If a duplicate name is found, send error
  const requestName = request.body.name
  let duplicateExist = false
  persons.forEach(person => {
    if (person.name === requestName) {
      duplicateExist = true
    }
  })

  if (duplicateExist) {
    return response
            .status(400)
            .json({error: "name must be unique"})
  } else {
    // Otherwise add the new person to persons
    const newPerson = {
      id: generateRandomInt(),
      name: requestName,
      number: request.body.number
    }

    persons.push(newPerson)
    response
      .json(newPerson)
    }
})

// Listening to PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
