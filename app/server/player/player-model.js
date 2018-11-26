const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model(
  'player',
  new Schema({
    name: String
  })
)
