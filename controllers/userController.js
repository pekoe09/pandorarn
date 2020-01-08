const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { wrapAsync } = require('./controllerHelpers')
const userRouter = require('express').Router()

userRouter.post('/login', wrapAsync(async (req, res, next) => {
    const body = req.body
    // TODO - get from db
    const user = {}
  
    const isCorrectPsw = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
    if (!user || !isCorrectPsw) {
      let err = new Error('Invalid username or password')
      err.isUnauthorizedAttempt = true
      throw err
    }
  
    const tokenPayload = {
      username: user.username,
      userId: user._id
    }
  
    const token = jwt.sign(tokenPayload, process.env.SECRET)
  
    res.send({
      username: user.username,
      lastName: user.lastName,
      firstNames: user.firstNames,
      email: user.email,
      locations: user.locations,
      token
    })
  }))
  
  module.exports = userRouter