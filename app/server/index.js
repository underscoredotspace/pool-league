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

app.get('/player/:id', (req, res) => {
  const Player = require('./models/Player')

  Player.findById(req.params.id, { _id: 0 })
    .then(player => {
      res.json(player)
    })
    .catch(error => {
      res.json({ error: 'Something Went Wrong!' })
      console.error(error)
    })
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`))
