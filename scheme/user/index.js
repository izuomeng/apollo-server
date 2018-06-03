const { gql } = require('apollo-server')
const resolvers = require('./resolvers')

const scheme = gql`
  enum Role {
    NORMAL
    EXPERT
    ADMIN
  }

  enum Gender {
    MALE
    FEMALE
  }

  type User {
    id: ID!
    name: String!
    role: Role!
    email: String
    phone: String
    gender: Gender
    # 身份证号
    idcard: String
    # 所属机构
    institute: String
    # 是否处于需要管理员认证的状态
    pending: Int
    # 已上传资源，如果角色是普通用户则为空
    uploaded: [UserResource!]
    # 已购买资源
    purchased: [UserResource!]
  }

  input UserInput {
    id: ID!
    name: String!
    email: String
    phone: String
    gender: Gender
    idcard: String
    institute: String
  }
`
const rootQueries = gql`
  # 获取用户，根据用户ID或者用户类型，都不指定则为全部用户，不可同时指定
  users(id: String, role: Role): [User!]
`
const mutations = gql`
  # 更新user信息
  updateUser(info: UserInput!): User
  # 创建user
  createUser(info: UserInput!): User
  # 删除user
  removeUser(id: String!): User
  # 某个用户购买了某个资源
  purchase(userId: String!, resourceId: String!): Boolean
`
module.exports = {
  queries: rootQueries,
  mutations,
  scheme,
  resolvers
}
