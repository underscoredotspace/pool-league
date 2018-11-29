const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

require('dotenv').config()
mongoose
  .connect(
    process.env.MDB_ADDR,
    { useNewUrlParser: true }
  )
  .then(ok => {
    console.log('Connected to mongo')
  })
  .catch(error => {
    throw new Error(error)
  })

const app = express()
const port = 3000

app.use(bodyParser.json())

app.get('/', express.static(path.join(__dirname, '../client')))
app.use('/api', require('./api'))
app.use('*', (_, res) => res.sendStatus(404))

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`))
