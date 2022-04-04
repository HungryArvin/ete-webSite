import request from '@/utils/request'

export function fetchList(data) {
  return request({
    url: 'teacher-info/getAll',
    method: 'post',
    data
  })
}

export function updateTeacher(data) {
  return request({
    url: '/teacher-info/update',
    method: 'put',
    data
  })
}

export function deleteTeacher(id) {
  return request({
    url: '/teacher-info/delete/' + id,
    method: 'delete'
  })
}

export function saveTeacher(data) {
  return request({
    url: '/teacher-info/save',
    method: 'post',
    data
  })
}

export function getById(id) {
  return request({
    url: '/teacher-info/getById/' + id,
    method: 'get'
  })
}

export function getClassList() {
  return request({
    url: '/classInfo/getList',
    method: 'get'
  })
}

export function getCourseList() {
  return request({
    url: '/course-details/getNameList',
    method: 'get'
  })
}

export function getByToken() {
  return request({
    url: '/teacher-info/getByToken',
    method: 'get'
  })
}

export function getUserCard() {
  return request({
    url:"/user/info",
    method: 'get'
  })
}