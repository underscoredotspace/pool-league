const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Player {
    id: String
    name: String
  }

  type Query {
    allPlayers(
      name: String
    ): [Player!]!

    getPlayer(
      id: String
    ): Player!
  }

  type Mutation {
    addPlayer(
      name: String
    ): Player!
  }
`

const resolvers = {
  Query: {
    allPlayers: async (_, args, { Player }) => {
      const players = await Player.find(args)

      return players.map(player => Object.assign(player, { id: player._id.toString() }))
    },
    getPlayer: async (_, { id }, { Player }) => {
      const player = await Player.findById(id)

      return Object.assign(player, { id: player._id.toString() })
    }
  }
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
