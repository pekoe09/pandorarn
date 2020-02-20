const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const slotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  ordinality: {
    type: Number,
    required: true
  },
  collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
    required: true
  },
  set: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Set'
  },
  images: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image',
      required: true
    }],
    required: true
  },
  items: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    }],
    required: true
  },
  sightings: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sighting',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Slot = mongoose.model('Slot', slotSchema)

module.exports = Slot