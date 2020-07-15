const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const panCollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userRights: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserRight',
      required: true
    }],
    required: true
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

const PanCollection = mongoose.model('Collection', panCollectionSchema)

module.exports = PanCollection