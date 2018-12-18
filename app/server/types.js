module.exports = `

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
