const { ApolloServer, gql } = require('apollo-server')
const { scheme, resolvers } = require('./scheme')

const server = new ApolloServer({ typeDefs: scheme, resolvers })

// eslint-disable-next-line
server.listen().then(({ url, ...rest }) => {
  console.info(`🚀  Server ready at ${url}`)
})
