import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/course-details/getAll/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function updateCourse(data) {
  return request({
    url: '/course-details/update',
    method: 'put',
    data
  })
}

export function deleteCourse(id) {
  return request({
    url: '/course-details/delete/' + id,
    method: 'delete'
  })
}

export function saveCourse(data) {
  return request({
    url: '/course-details/save',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: '/course-details/getById/' + id,
    method: 'get'
  })
}
