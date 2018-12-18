const graphqlHTTP = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('./types')
const resolvers = require('./resolvers')
const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = graphqlHTTP({
  schema,
  context: require('./models'),
  graphiql: true
})
