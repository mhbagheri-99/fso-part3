const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

morgan.token('body', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.use(express.json())

app.use(cors())

app.use(express.static('dist'))

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://mhbagheri:${password}@fsophonebook.szfje3s.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSOPhonebook`

mongoose.set('strictQuery',false)
mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

// if (process.argv.length === 3) {
//   console.log('phonebook:')
//   Contact.find({}).then(result => {
//     result.forEach(contact => {
//       console.log(`${contact.name} ${contact.number}`)
//     })
//     mongoose.connection.close()
//   })
// } else if (process.argv.length < 5) {
//   console.log('Please provide both name and number as arguments')
//   mongoose.connection.close()
//   return
// } else if (process.argv.length > 5) {
//   console.log('Please provide name and number in quotes')
//   mongoose.connection.close()
//   return
// } else if (process.argv.length === 5) {
//   const person = new Contact({
//       name: process.argv[3],
//       number: process.argv[4]
//   })
//   person.save().then(result => {
//   console.log(`added "${person.name}" number "${person.number}" to phonebook.`)
//   mongoose.connection.close()
//   })
// }
  
app.get('/info', (request, response) => {
  response.send(`<h1>Phonebook has ${persons.length} contacts!</h1><br>${new Date()}`)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.statusMessage = "No contact found with that id.";
    response.status(404).end()
  }
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name and number should have a value.' 
    })
  }

    if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
            error: 'name must be unique' 
        })
    }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
  
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(result => {
    response.json(notes)
  })
})
  
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})