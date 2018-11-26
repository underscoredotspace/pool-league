const gameRoute = require('express').Router()
const Game = require('./game-model')
const validId = require('mongoose').Types.ObjectId.isValid

gameRoute.get('/:id', (req, res) => {
  const { id } = req.params

  if (!validId(id)) {
    return res.status(400).json({ error: 'Invalid Game ID' })
  }

  Game.findById(id)
    .then(game => {
      if (!game) {
        return res.status(404).json({ error: 'Game not found' })
      }

      res.json(game)
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error)
    })
})

module.exports = gameRoute
