const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model(
  'player',
  new Schema(
    {
      _id: mongoose.Types.ObjectId,
      name: String
    },
    { collection: 'players' }
  )
)
