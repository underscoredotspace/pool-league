const graphqlHTTP = require('express-graphql')
const { mergeSchemas } = require('graphql-tools')

// GQL Schemas
const PlayerShema = require('./Player')
const GameShema = require('./Game')

// Mongoose Models
const Player = require('../models/player')
const Game = require('../models/game')

module.exports = graphqlHTTP({
  schema: mergeSchemas({ schemas: [PlayerShema, GameShema] }),
  context: { Player, Game },
  graphiql: true
})
