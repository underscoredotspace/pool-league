const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = `
  type Team {
    name: String
    players: [String]
    score: Int
  }

  input TeamInput {
    name: String
    players: [String]
    score: Int
  }

  type Game {
    id: String
    date: String
    team1: Team
    team2: Team
  }

  type Query {
    allGames(
      date: String
    ): [Game!]!

    getGame(
      id: String
    ): Game!
  }

  type Mutation {
    addGame(
      date: String
      team1: TeamInput
      team2: TeamInput
    ): Game!
  }
`

const resolvers = {
  Query: {
    allGames: async (_, args, { Game }) => {
      const games = await Game.find(args)
      return games.map(game => Object.assign(game, { id: game._id.toString() }))
    },
    getGame: async (_, { id }, { Game }) => {
      const game = await Game.findById(id)
      return Object.assign(game, { id: game._id.toString() })
    }
  },
  Mutation: {
    addGame: async (_, newGame, { Game }) => {
      const game = await new Game(newGame).save()
      return Object.assign(game, { id: game._id.toString() })
    }
  }
}

module.exports = makeExecutableSchema({ typeDefs, resolvers })
