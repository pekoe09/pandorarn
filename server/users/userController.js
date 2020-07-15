const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { wrapAsync } = require('../utils/controllerHelpers')
const userRouter = require('express').Router()
const User = require('./user')

userRouter.post('/login', wrapAsync(async (req, res, next) => {
  console.log('Incoming call', req.body)
  const body = req.body
  console.log('body:', req.body)
  const user = await User
    .findOne({ username: body.username })
    .select({
      _id: 1,
      username: 1,
      passwordHash: 1,
      lastName: 1,
      firstNames: 1,
      email: 1
    })
  console.log('found user', user)

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
    token
  })
}))

// userRouter.post('/register', wrapAsync(async (req, res, next) => {

// }))

// userRouter.put(':/id', wrapAsync(async (req, res, next) => {
  
// }))

module.exports = userRouter