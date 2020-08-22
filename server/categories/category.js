const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  collections: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Collection',
      required: true
    }],
    required: true
  },
  categories: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }]
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
  metaData: metaDataSchema
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category