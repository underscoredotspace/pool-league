const api = require('express').Router()

api.use('/player', require('./player/player-route'))
api.use('/game', require('./game/game-route'))

api.use('*', (_, res) => res.sendStatus(404))

module.exports = api
