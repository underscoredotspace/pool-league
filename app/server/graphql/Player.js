const { GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLString } = require('graphql')

const PlayerType = new GraphQLObjectType({
  name: 'PlayerType',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
})

const query = new GraphQLObjectType({
  name: 'PlayerQuery',
  fields: () => ({
    player: {
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      type: PlayerType,
      resolve: async (_, { id }, { Player }) => {
        const player = await Player.findById(id)
        return Object.assign(player, { id: player._id.toString() })
      }
    },
    players: {
      args: {
        name: { type: GraphQLString }
      },
      type: new GraphQLList(PlayerType),
      resolve: async (_, args, { Player }) => {
        const players = await Player.find(args)
        return players.map(player => Object.assign(player, { id: player._id.toString() }))
      }
    }
  })
})

const mutation = new GraphQLObjectType({
  name: 'PlayerMutation',
  fields: () => ({
    createPlayer: {
      name: 'CreatePlayer',
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) }
      },
      type: PlayerType,
      resolve: async (_, args, { Player }) => {
        const player = await new Player(args).save()
        return Object.assign(player, { id: player._id.toString() })
      }
    }
  })
})

module.exports = new GraphQLSchema({
  query,
  mutation
})
