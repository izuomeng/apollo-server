const Mock = require('mockjs')
const { getResourceById, getOwnerResources, getAllResources } = require('../../data/resource/get')

module.exports = {
  TechResource: {
    owner(parent, args) {
      console.info('owner for resource id: ', parent.id, args)
      return Mock.mock({
        id: '@guid()',
        name: '@cname()',
        role: /EXPERT/,
        email: '@email()',
        phone: '@string(number, 11)',
        gender: /MALE|FEMALE/,
        institute: '@cname()'
      })
    },
    permitted(parent, args) {
      console.info('permitted user for resource id: ', parent.id, args)
      const data = Mock.mock({
        'list|0-5': [
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
      return data.list
    }
  },
  Query: {
    async resources(parent, args) {
      console.info('resouces: ', args)
      const data = Mock.mock({
        'list|5-20': [
          {
            id: '@guid()',
            name: '@word(1, 10).@word(2,4)',
            url: '@url()',
            price: '@float(100, 10000, 1, 2)',
            type: /PAPER|PATENT|PROJECT/,
            description: '@csentence()',
            'comment|0-10': ['@csentence()'],
            institute: '@cname()'
          }
        ]
      })
      if (args.userId) {
        return data.list
      } else if (args.ownerId) {
        return getOwnerResources(args.ownerId)
      } else if (args.resourceId) {
        const r = await getResourceById(args.resourceId)
        return r || []
      }
      return getAllResources()
    }
  },
  Mutation: {
    createResource() {
      return Mock.mock({
        id: '@guid()',
        name: '@word(1, 10)',
        url: '@url()',
        price: '@float(100, 10000, 1, 2)',
        type: /PAPER|PATENT|PROJECT/,
        description: '@csentence()',
        institute: '@cname()'
      })
    },
    removeResource() {
      return Mock.mock({
        id: '@guid()',
        name: '@word(1, 10)',
        url: '@url()',
        price: '@float(100, 10000, 1, 2)',
        type: /PAPER|PATENT|PROJECT/,
        description: '@csentence()',
        institute: '@cname()'
      })
    }
  }
}
