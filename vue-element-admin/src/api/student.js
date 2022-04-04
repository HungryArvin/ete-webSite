import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/student-info/getAll/' + query.page + '/' + query.limit,
    method: 'get'
  })
}

export function updateStudent(data) {
  return request({
    url: '/student-info/update',
    method: 'put',
    data
  })
}

export function deleteStudent(id) {
  return request({
    url: '/student-info/delete/' + id,
    method: 'delete'
  })
}

export function getAllByQuery(query) {
  return request({
    url: '/student-info/getByQuery/' + query.page + '/' + query.limit + '?' + 'studentName=' + query.studentName + '&studentNum=' + query.studentNum +
    '&level=' + query.level + '&className=' + query.className + '&role=' + query.role + '&teacherId=' +query.teacherId,
    method: 'get'
  })
}
