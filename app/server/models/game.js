const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Player = require('./player')

const team = {
  name: { type: String, required: false },
  players: {
    type: [String],
    required: true,
    validate: {
      validator: async function(players) {
        // Only check for duplicates when in team1
        if (players['_path'] === 'team1.players') {
          for (const player1 of players) {
            if (!this.team2.players.find(player2 => player2 !== player1)) {
              console.error(`Duplicate id ${player1._id}`)
              return false
            }
          }
        }

        const matches = await Promise.all(players.map(player => Player.findById(player)))
        if (matches.includes(null)) {
          console.error(`Invalid id in ${JSON.stringify(players)}`)
          return false
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
