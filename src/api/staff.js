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

export function update(data, filename, ori) {
  return request({
    url: '/staff/update',
    method: 'post',
    data: {
      ...data,
      filename,
      ori
    }
  })
}

export function remove(id, url) {
  return request({
    url: '/staff/remove',
    method: 'post',
    data: {
      id,
      url
    }
  })
}

export function list() {
  return request({
    url: '/staff/list',
    method: 'get'
  })
}

export function query(id) {
  return request({
    url: '/staff/query',
    method: 'post',
    data: {
      id
    }
  })
}
