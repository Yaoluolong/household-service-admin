import request from '@/utils/request'

export function create(data) {
  return request({
    url: '/staff/create',
    method: 'post',
    data
  })
}

export function list() {
  return request({
    url: '/staff/list',
    method: 'get'
  })
}
