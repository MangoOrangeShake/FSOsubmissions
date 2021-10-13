const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('content', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content', {
    skip: (request, response) => { return request.method !== 'POST' }
}))

app.use(morgan('tiny', {
    skip: (request, response) => request.method === 'POST'
}))

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

const generateId = () => {
    const newId = Math.round(Math.random()*10000)
    return newId
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (! (body.name && body.number) ) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    if (persons.find(n => n.name === body.name)) {
        return response.status(400).json({
            error: 'name already exists in phonebook'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)
    response.send(person)
})

app.get('/info', (request, response) => {
    response.send(`
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${Date()}</p>`)
    console.log(new Date().toString());
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(n => n.id === id)

    if (!person) {
        response.status(404).end()
    }
    else {
        response.send(person)
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(n => n.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})