const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const gradingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  metaData: metaDataSchema
})

const Grading = mongoose.model('Grading', gradingSchema)

module.exports = Grading