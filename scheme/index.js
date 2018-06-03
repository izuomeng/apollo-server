const user = require('./user')
const resource = require('./resource')
const { merge } = require('lodash')

module.exports = {
  scheme: `
    ${user.scheme}
    ${resource.scheme}
    type Query {
      ${user.queries}
      ${resource.queries}
    }
    type Mutation {
      ${user.mutations}
      ${resource.mutations}
    }
  `,
  resolvers: merge(user.resolvers, resource.resolvers)
}
