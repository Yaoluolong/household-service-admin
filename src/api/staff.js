import request from '@/utils/request'

export function create(data, filename) {
  return request({
    url: '/staff/create',
    method: 'post',
    data: {
      ...data,
      filename
    }
  })
}

export function update(data, filename) {
  return request({
    url: '/staff/create',
    method: 'post',
    data: {
      ...data,
      filename
    }
  })
}

export function list() {
  return request({
    url: '/staff/list',
    method: 'get'
  })
}
