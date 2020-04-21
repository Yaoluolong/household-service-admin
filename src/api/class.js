import request from '@/utils/request'

export function queryClass() {
  return request({
    url: '/class/list',
    method: 'get'
  })
}
