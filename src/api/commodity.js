import request from '@/utils/request'

export function list() {
  return request({
    url: '/create/list',
    method: 'get'
  })
}

export function create(data) {
  return request({
    url: '/commodity/create',
    method: 'post',
    data
  })
}
