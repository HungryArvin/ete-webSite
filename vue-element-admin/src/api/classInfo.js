import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/classInfo/getAll/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function updateClass(data) {
  return request({
    url: '/classInfo/update',
    method: 'put',
    data
  })
}

export function deleteClass(id) {
  return request({
    url: '/classInfo/delete/' + id,
    method: 'delete'
  })
}

export function saveClass(data) {
  return request({
    url: '/classInfo/save',
    method: 'post',
    data
  })
}

export function getClassListByToken(){
  return request({
    url: '/classInfo/getListByToken',
    method: 'get'
  })
}