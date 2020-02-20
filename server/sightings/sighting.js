const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const sightingSchema = new mongoose.Schema({
  description: {
    type: String
  },
  acquired: {
    type: Date
  },
  purchasePrice: {
    type: Number
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
    required: true
  },
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue'
  },
  images: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Sighting = mongoose.model('Sighting', sightingSchema)

module.exports = Sighting