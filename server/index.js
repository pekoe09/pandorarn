const http = require('http')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const config = require('./config')
const mongo = require('./mongo')
const { tokenExtractor } = require('./utils/tokenExtractor')
const { userExtractor } = require('./utils/userExtractor')

const { collectionRouter } = require('./collections')
const { imageRouter } = require('./images')
const { setRouter } = require('./sets')
const { slotRouter } = require('./slots')
const { userRouter } = require('./users')
const { venueRouter } = require('./venues')

app.use(cors())
app.use(bodyparser.json())
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/collections', collectionRouter)
app.use('/api/images', imageRouter)
app.use('/api/sets', setRouter)
app.use('/api/slots', slotRouter)
app.use('/api/users', userRouter)
app.use('/api/venues', venueRouter)

app.use(express.static('/pandora/public'))

app.use(express.static(path.resolve(__dirname, '../pandora/build')))

app.get('*', (req, res) => {
  console.log('unspecified request', req.url)
  res.sendFile(path.resolve(__dirname, '../pandora/build', 'index.html'))
})

app.use((err, req, res, next) => {
  console.log(err.message)
  if (err.isBadRequest) {
    res.status(400).json({ error: err.message })
  } else if (err.isUnauthorizedAttempt) {
    res.status(401).json({ error: err.message })
  } else if (err.isForbidden) {
    res.status(403).json({ error: err.message })
  } else {
    res.status(500).json({ error: 'Something has gone wrong' })
  }
})

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  console.log('Shutting down server')
  mongo.close()
})

module.exports = {
  app,
  server
}