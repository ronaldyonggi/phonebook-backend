// Error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'bad id format'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }

  next(error)
}

// Unknown endpoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

module.exports = { errorHandler, unknownEndpoint}