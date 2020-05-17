import request from '@/utils/request'

export function staffCount() {
  return request({
    url: '/dashboard/staff',
    method: 'get'
  })
}

export function evaluateCount() {
  return request({
    url: '/dashboard/evaluate',
    method: 'get'
  })
}

export function promotionCount() {
  return request({
    url: '/dashboard/promotion',
    method: 'get'
  })
}

export function commodityCount() {
  return request({
    url: '/dashboard/commodity',
    method: 'get'
  })
}
