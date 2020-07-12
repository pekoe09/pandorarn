const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const itemSchema = new mongoose.Schema({
  description: {
    type: String
  },
  acquired: {
    type: Date
  },
  purchasePrice: {
    type: Number
  },
  disposed: {
    type: Date
  },
  salesPrice: {
    type: Number
  },
  ordinality: {
    type: Number,
    required: true
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Slot',
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

const Item = mongoose.model('Item', itemSchema)

module.exports = Item