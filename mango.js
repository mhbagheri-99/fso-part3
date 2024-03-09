const mongoose = require('mongoose')

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

if (process.argv.length === 3) {
  console.log('phonebook:')
  Contact.find({}).then(result => {
    result.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length < 5) {
  console.log('Please provide both name and number as arguments')
  mongoose.connection.close()
  return
} else if (process.argv.length > 5) {
  console.log('Please provide name and number in quotes')
  mongoose.connection.close()
  return
} else if (process.argv.length === 5) {
  const person = new Contact({
      name: process.argv[3],
      number: process.argv[4]
  })
  person.save().then(result => {
  console.log(`added "${person.name}" number "${person.number}" to phonebook.`)
  mongoose.connection.close()
})
}

// const persons = [
//     { 
//       "name": "Arto Hellas", 
//       "number": "040-123456"
//     },
//     { 
//       "name": "Ada Lovelace", 
//       "number": "39-44-5323523"
//     },
//     { 
//       "name": "Dan Abramov", 
//       "number": "12-43-234345"
//     },
//     { 
//       "name": "Mary Poppendieck", 
//       "number": "39-23-6423122"
//     },
//     { 
//       "name": "Ringo Starr", 
//       "number": "555-123456"
//     }
// ]

// Contact.insertMany(persons)
//     .then(() => {
//         console.log('Persons inserted into the database')
//         mongoose.connection.close()
//     })
//     .catch((error) => {
//         console.error('Error inserting persons into the database:', error)
//         mongoose.connection.close()
//     })


