const { error } = require('console')
const express = require('express')
const path = require('path')
const app = express()

app.use(express.json())
app.use(express.static('public'))

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

app.get("/api/persons", (request, response) => {
    response.json(persons)
})

app.get("/info", (request, response) => {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <title>Info Page</title>
    </head>
    <body>
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${new Date()}</p>
    </body>
    </html>
    `;
    response.send(html);
})

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(!person){
        return response.status(400).end()
    }

    return response.json(person)
})

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post("/api/persons", (request, response) => {
    const body = request.body
    console.log(body)

    if(!body.name || !body.number){
        return response.status(400).json({
            error: "name or number missing"
        })
    }    
    if(persons.some(person => person.name == body.name)){
        return response.status(400).json({
            error: "name must be unique"
        })
    }

    const newPerson = {
        name: body.name,
        number: body.number,
        id: Math.random(10000)
    }

    persons = persons.concat(newPerson)
    return response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})