const mongoose = require('mongoose')
const Schema = mongoose.Schema

const team = {
  name: { type: String, required: true },
  players: { type: [mongoose.Schema.Types.ObjectId], required: true },
  score: { type: Number, default: 0 }
}

module.exports = mongoose.model(
  'game',
  new Schema({
    date: { type: Date, required: true },
    team1: team,
    team2: team
  })
)
