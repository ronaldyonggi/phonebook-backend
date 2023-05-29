const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const { Schema } = mongoose

const url = process.env.MONGO_URI

mongoose
  .connect(url)
  .then(() => console.log('connected to MongoDB') )
  .catch(error => console.log('error connecting to MongoDB:', error.message))

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: v => /\d{2,3}-\d+/.test(v),
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'phone number is required!']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

module.exports = Person