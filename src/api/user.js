import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

export function remove(username) {
  return request({
    url: '/user/remove',
    method: 'post',
    data: {
      username
    }
  })
}

export function create() {
  return request({
    url: '/user/create',
    method: 'get'
  })
}

export function list() {
  return request({
    url: '/user/list',
    method: 'get'
  })
}

export function update(username, role) {
  return request({
    url: '/user/update',
    method: 'post',
    data: {
      username,
      role
    }
  })
}
