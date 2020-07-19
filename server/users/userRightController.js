const {
  wrapAsync,
  checkUser,
  getMetaData,
  validateMandatoryFields,
  findObjectById
} = require('../utils/controllerHelpers')
const userRightRouter = require('express').Router()
const UserRight = require('./userright')

userRightRouter.post('/', wrapAsync(async (req, res, next) => {

}))

userRightRouter.route('/:id', wrapAsync(async (req, res, next) => {

}))

userRightRouter.delete('/:id', wrapAsync(async (req, res, next) => {

}))

module.exports = userRightRouter