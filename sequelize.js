const Sequelize = require('sequelize')
const config = require('./config')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const dbConnString = config.dbConnStr

const initializeUser = async () => {
  //get all users from db; if there aren't any, initialize the first user (admin)
}

console.log('Connecting to database')
const sequelize = new Sequelize(dbConnString)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to database established')
  })
  .catch(err => {
    console.error('Database connection failed:', err)
  })

initializeUser()

const close = () => {
  sequelize.close()
  console.log('Database connection closed')
}

module.exports = { close }