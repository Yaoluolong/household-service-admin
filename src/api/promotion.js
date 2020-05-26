import request from '@/utils/request'

export function list() {
  return request({
    url: '/promotion/list',
    method: 'get'
  })
}

export function queryPromotion(id) {
  return request({
    url: '/promotion/query',
    method: 'post',
    data: {
      id
    }
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

export function update(id, status, promotionPrice, commodityID) {
  return request({
    url: '/promotion/update',
    method: 'post',
    data: {
      id,
      status,
      promotionPrice,
      commodityID
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
