const express = require('express')
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

app.get('/', (_, res) => res.send('Hello World!'))
app.use('/player', require('./players'))

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`))
