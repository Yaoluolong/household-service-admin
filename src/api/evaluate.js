import request from '@/utils/request'

export function list() {
  return request({
    url: '/evaluate/list',
    method: 'get'
  })
}

export function update(id, feedback) {
  return request({
    url: '/evaluate/update',
    method: 'post',
    data: {
      id,
      feedback
    }
  })
}
