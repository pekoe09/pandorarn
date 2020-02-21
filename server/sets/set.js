const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const setSchema = new mongoose.Schema({
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
  parentSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Set'
  },
  sets: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Set',
      required: true
    }],
    required: true
  },
  slots: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Slot',
      required: true    
    }],
    required: true
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

const Set = mongoose.model('Set', setSchema)

module.exports = Set