const playerRoute = require('express').Router()
const Player = require('./player-model')
const validId = require('mongoose').Types.ObjectId.isValid

playerRoute.get('/', (_, res) => {
  Player.find()
    .then(players => {
      res.json(players)
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error.message)
    })
})

playerRoute.get('/:id', (req, res) => {
  const { id } = req.params

  if (!validId(id)) {
    return res.status(400).json({ error: 'Invalid Player ID' })
  }

  Player.findById(id)
    .then(player => {
      if (!player) {
        return res.status(404).json({ error: 'Player not found' })
      }

      res.json(player)
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error.message)
    })
})

playerRoute.post('/', (req, res) => {
  new Player(req.body)
    .save()
    .then(player => {
      res.json({ player })
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error.message)
    })
})

playerRoute.use('*', (_, res) => res.sendStatus(404))

module.exports = playerRoute
