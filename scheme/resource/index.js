const { gql } = require('apollo-server')
const resolvers = require('./resolvers')

const scheme = gql`
  # 数据资源服务
  enum FileType {
    # 论文
    PAPER
    # 专利
    PATENT
    # 项目
    PROJECT
  }

  type UserResource {
    id: ID!
    name: String!
    url: String!
    price: Float!
    type: FileType
  }

  type TechResource {
    id: ID!
    # 文件名
    name: String!
    # 文件的下载路径
    url: String!
    price: Float!
    # 文件类型
    type: FileType
    # 文件说明
    description: String
    # 文件所有者
    owner: User!
    # 允许下载的人
    permitted: [User!]
    # 评论
    comment: [String!]
    # 资源机构信息
    institute: String
  }

  scalar Upload
`
const rootQueries = gql`
  # 获取资源，根据用户ID或者资源ID，都不指定则返回全部资源，不可同时指定
  resources(userId: String, resourceId: String, ownerId: String): [TechResource!]
`
const mutations = gql`
  # 上传文件
  createResource(file: Upload!, id: String!): TechResource
  # 删除文件
  removeResource(id: String!): TechResource
`
module.exports = {
  queries: rootQueries,
  mutations,
  scheme,
  resolvers
}
