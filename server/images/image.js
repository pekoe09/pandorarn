const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const imageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  isThumb: {
    type: Boolean,
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
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot'
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  },
  sighting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sighting'
  },
  scaledCopy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Image'
  },
  metaData: metaDataSchema
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image