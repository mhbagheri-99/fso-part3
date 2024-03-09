
const mongoose = require('mongoose')

// if (process.argv.length<3) {
//     console.log('give password as argument')
//     process.exit(1)
// }
  
// const password = process.argv[2]
  
//   const url =
//     `mongodb+srv://mhbagheri:${password}@fsophonebook.szfje3s.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FSOPhonebook`
  
mongoose.set('strictQuery',false)
const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB:', error.message)
    })
  
const contactSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

module.exports = mongoose.model('Contact', contactSchema)