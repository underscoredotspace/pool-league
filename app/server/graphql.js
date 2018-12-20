const graphqlHTTP = require('express-graphql')
const { mergeSchemas } = require('graphql-tools')
const Player = require('./schema/Player')
const Game = require('./schema/Game')

module.exports = graphqlHTTP({
  schema: mergeSchemas({ schemas: [Player, Game] }),
  context: require('./models'),
  graphiql: true
})
