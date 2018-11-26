const mongoose = require('mongoose')
const Schema = mongoose.Schema

const team = {
  name: String,
  players: [mongoose.Schema.Types.ObjectId],
  score: Number
}

module.exports = mongoose.model(
  'game',
  new Schema({
    date: Date,
    team1: team,
    team2: team
  })
)
