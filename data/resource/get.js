const { query } = require('../../sql')
const fetch = require('node-fetch') // eslint-disable-line

async function getCommentsByRId(rid) {
  const { results } = await query('select comment from res_comment where rid = ?', rid)
  // return {
  //   rid: '0001',
  //   comments: ['abc', 'deg', '...'] | []
  // }
  return { rid, comments: results.map(item => item.comment) }
}

async function getResourceById(rid) {
  if (!rid) throw new Error('getResourcesById: must have resource id')
  const { results: resources } = await query('select * from resources where id = ?', rid)
  if (!resources[0] || !resources[0].id) {
    return []
  }
  const singleComment = await getCommentsByRId(resources[0].id)
  return [{ ...resources[0], comments: singleComment.comments }]
}

async function getOwnerResources(uid) {
  if (!uid) throw new Error('getResourcesById: must have resource id')
  const { results: resources } = await query('select * from resources where owner = ?', uid)
  if (!resources[0] || !resources[0].id) {
    return []
  }
  const allComments = await Promise.all(resources.map(resource => getCommentsByRId(resource.id)))
  return resources.map(resource => {
    const singleComment = allComments.find(item => item.rid === resource.id) || {}
    return { ...resource, comment: singleComment.comments || [] }
  })
}

async function getAllResources() {
  const { results: resources } = await query('select * from resources')
  if (!resources[0] || !resources[0].id) {
    return []
  }
  const allComments = await Promise.all(resources.map(resource => getCommentsByRId(resource.id)))
  return resources.map(resource => {
    const singleComment = allComments.find(item => item.rid === resource.id) || {}
    return { ...resource, comment: singleComment.comments || [] }
  })
}

module.exports = {
  getResourceById,
  getOwnerResources,
  getAllResources
}
