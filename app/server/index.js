require('dotenv').config()

// Database Connection
const mongoose = require('mongoose')

const { MDB_ADDR, PORT = 3001 } = process.env
if (!MDB_ADDR) {
  throw new Error('MongoDB Address required in env: MDB_ADDR')
}

mongoose
  .connect(
    MDB_ADDR,
    { useNewUrlParser: true }
  )
  .then(() => console.log('Connected to mongo'))
  .catch(error => {
    throw new Error(error)
  })

// Start Web Server
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.set('json spaces', 2)

app.get('/', express.static(path.join(__dirname, '../client')))
app.use('/api', require('./api'))
app.use('*', (_, res) => res.sendStatus(404))

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/`))
