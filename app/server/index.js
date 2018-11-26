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
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid Player ID' })
  }

  const Player = require('./models/Player')

  Player.findById(id)
    .then(player => {
      if (!player) {
        return res.status(404).json({ error: 'Player not found' })
      }

      res.json(player)
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error)
    })
})

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`))
