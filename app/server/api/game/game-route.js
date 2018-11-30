const gameRoute = require('express').Router()
const Game = require('./game-model')
const Player = require('../player/player-model')
const validId = require('mongoose').Types.ObjectId.isValid

gameRoute.get('/', (_, res) => {
  Game.find()
    .then(game => {
      res.json(game)
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error.message)
    })
})

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

gameRoute.post('/', async (req, res) => {
  const newGame = req.body

  // Check that all players exist
  try {
    for (const player of [...newGame.team1.players, ...newGame.team2.players]) {
      const found = await Player.findById(player)
      if (!found) {
        return res.status(400).json({ error: 'Invalid player ID found' })
      }
    }
  } catch (error) {
    console.error(error.message)
    return res.status(500).json({ error: 'Something went wrong' })
  }

  // Check that player doesn't exist in both teams
  for (player of newGame.team1.players) {
    if (newGame.team2.players.includes(player)) {
      return res.status(400).json({ error: 'A player cannot exist in both teams' })
    }
  }

  new Game(newGame)
    .save()
    .then(game => {
      res.json({ game })
    })
    .catch(error => {
      res.status(500).json({ error: 'Something went wrong' })
      console.error(error.message)
    })
})

gameRoute.use('*', (_, res) => res.sendStatus(404))

module.exports = gameRoute
