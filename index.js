const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

let persons = 
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    response.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${Date(Date.now()).toString()}
        `)
})
app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (!body.name || !body.number){
        response.status(400).end('Incorrect request body json fields!')
    } else if (persons.findIndex(person => person.name == body.name) != -1){
        response.status(400).end('Name alreayd exists in phonebook!')
    }
    let person = {
        name: body.name, 
        number: body.number, 
        id: Math.floor(Math.random() * 1e10)}
    persons = persons.concat(person)
    response.json(person)
})

const PORT = process.env.PORT || 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})