const User = require('./user')
const UserRight = require('./userright')
const userRouter = require('./userController')
const userRightRouter = require('./userRightController')

module.exports = {
  User,
  UserRight,
  userRouter,
  userRightRouter
}