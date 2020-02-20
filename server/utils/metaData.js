const mongoose = require('mongoose')

const metaDataSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  },
  edited: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  }
})

module.exports = metaDataSchema