const express = require('express')
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

app.get('/', (_, res) => res.send('Hello World!'))
app.use('/player', require('./player/player-route'))
app.use('/game', require('./game/game-route'))

app.listen(port, () => console.log(`Listening on http://localhost:${port}/`))
