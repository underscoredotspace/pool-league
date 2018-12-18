module.exports = {
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
