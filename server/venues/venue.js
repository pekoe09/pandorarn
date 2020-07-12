const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const venueSchema = new mongoose.Schema({
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

const Venue = mongoose.model('Venue', venueSchema)

module.exports = Venue