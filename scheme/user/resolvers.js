const Mock = require('mockjs')

module.exports = {
  Query: {
    users(parent, args) {
      console.info('users: ', args)
      const data = Mock.mock({
        'list|1-20': [
          {
            id: '@guid()',
            name: '@cname()',
            role: /NORMAL|EXPERT/,
            email: '@email()',
            phone: '@string(number, 11)',
            gender: /MALE|FEMALE/,
            institute: '@cname()'
          }
        ]
      })
      if (args.id) {
        return data.list.slice(0, 1)
      }
      return data.list
    }
  },
  User: {
    uploaded(parent) {
      console.info('uploaded resources by user: ', parent.id)
      if (parent.role === 'NORMAL') {
        return []
      }
      const data = Mock.mock({
        'list|0-5': [
          {
            id: '@guid()',
            name: '@word(1, 10).@word(2,4)',
            url: '@url()',
            price: '@float(100, 10000, 1, 2)',
            type: /PAPER|PATENT|PROJECT/
          }
        ]
      })
      return data.list
    },
    purchased(parent) {
      console.info('purchased resources by user: ', parent.id)
      const data = Mock.mock({
        'list|0-10': [
          {
            id: '@guid()',
            name: '@word(1, 10).@word(2,4)',
            url: '@url()',
            price: '@float(100, 10000, 1, 2)',
            type: /PAPER|PATENT|PROJECT/
          }
        ]
      })
      return data.list
    }
  },
  Mutation: {
    updateUser() {
      return Mock.mock({
        id: '@guid()',
        name: '@cname()',
        idcard: '@string(number, 18)',
        role: /VISITER|EXPERT/,
        email: '@email()',
        phone: '@string(number, 11)',
        gender: /MALE|FEMALE/,
        institute: '@cname()',
        pending: '@natural(0,1)'
      })
    },
    createUser() {
      return Mock.mock({
        id: '@guid()',
        name: '@cname()',
        idcard: '@string(number, 18)',
        role: /VISITER|EXPERT/,
        email: '@email()',
        phone: '@string(number, 11)',
        gender: /MALE|FEMALE/,
        institute: '@cname()',
        pending: '@natural(0,1)'
      })
    },
    removeUser() {
      return Mock.mock({
        id: '@guid()',
        name: '@cname()',
        idcard: '@string(number, 18)',
        role: /VISITER|EXPERT/,
        email: '@email()',
        phone: '@string(number, 11)',
        gender: /MALE|FEMALE/,
        institute: '@cname()',
        pending: '@natural(0,1)'
      })
    },
    purchase() {
      return true
    }
  }
}
