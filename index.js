const express = require('express')
const app = express()
const PORT = 3001

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

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

// Listening to PORT
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
