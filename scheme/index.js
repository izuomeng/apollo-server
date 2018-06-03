const user = require('./user')
const resource = require('./resource')
const { merge } = require('lodash')

module.exports = {
  scheme: `
    type Account {
      name: String!
      role: String!
    }

    type Category {
      name: String!
    }
    ${user.scheme}
    ${resource.scheme}
    type Query {
      account: Account
      categories: [Category]
      ${user.queries}
      ${resource.queries}
    }
    type Mutation {
      ${user.mutations}
      ${resource.mutations}
    }
  `,
  resolvers: merge(user.resolvers, resource.resolvers, {
    Query: {
      account() {
        return {
          name: 'zuomeng',
          role: 'admin'
        }
      },
      categories() {
        return [
          { name: '力学' },
          { name: '机械工程' },
          { name: '光学工程' },
          { name: '地质工程' },
          { name: '建筑学' },
          { name: '矿业工程' },
          { name: '交通运输' },
          { name: '核科学' }
        ]
      }
    }
  })
}
