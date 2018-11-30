const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Player = require('../player/player-model')

const team = {
  name: { type: String, required: false },
  players: {
    type: [Schema.Types.ObjectId],
    required: true,
    validate: {
      validator: async function(players) {
        for (const player1 of players) {
          const id = player1._id.toHexString()

          if (!(await Player.findById(id))) {
            // Player ID supplied is invalid
            return false
          }

          // Only check for duplicates when in team1
          if (players['_path'] === 'team1.players') {
            // return false if Player ID appears in both teams
            return !this.team2.players.find(player2 => player2._id.toHexString() === id)
          }
        }

        return true
      },
      message: 'Invalid or Duplicate Player ID supplied'
    }
  },
  score: { type: Number, default: 0 }
}

module.exports = mongoose.model(
  'game',
  new Schema(
    {
      date: { type: Date, default: Date.now },
      team1: team,
      team2: team
    },
    { validateBeforeSave: true }
  )
)
