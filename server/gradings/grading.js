const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const gradeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  abbreviation: {
    type: String,
    required: true
  },
  ordinality: {
    type: Number,
    required: true
  }
})

const gradingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  grades: [gradeSchema],
  metaData: metaDataSchema
})

const Grading = mongoose.model('Grading', gradingSchema)

module.exports = Grading