import request from '@/utils/request'

export function list() {
  return request({
    url: '/order/list',
    method: 'get'
  })
}

export function update(id, status) {
  console.log(id + status)
  return request({
    url: '/order/update',
    method: 'post',
    data: {
      id,
      status
    }
  })
}
