import request from '@/utils/request'

export function list() {
  return request({
    url: '/promotion/list',
    method: 'get'
  })
}

export function replace(url) {
  return request({
    url: '/promotion/replace',
    method: 'post',
    data: {
      url
    }
  })
}

export function update(id, status) {
  return request({
    url: '/promotion/update',
    method: 'post',
    data: {
      id,
      status
    }
  })
}

export function remove(id) {
  return request({
    url: '/promotion/remove',
    method: 'post',
    data: {
      id
    }
  })
}

export function create(data) {
  return request({
    url: '/promotion/create',
    method: 'post',
    data
  })
}
