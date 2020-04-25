import request from '@/utils/request'

export function list() {
  return request({
    url: '/commodity/list',
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

export function update(data) {
  return request({
    url: '/commodity/update',
    method: 'post',
    data
  })
}

export function remove(id, files) {
  return request({
    url: '/commodity/remove',
    method: 'post',
    data: {
      id,
      files
    }
  })
}
