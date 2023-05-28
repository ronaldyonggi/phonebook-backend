const mongoose = require('mongoose')

// Checks if id is a valid MongoDB object ID
const isValidId = id => {
  return mongoose.Types.ObjectId.isValid(id)
}

module.exports = isValidId