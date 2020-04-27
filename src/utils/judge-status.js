export function judge(status) {
  const model = { label: '取消', type: 'primary', visible: true }
  switch (status) {
    case '待支付':
      model.label = '取消'
      model.type = 'danger'
      break
    case '待服务':
      model.label2 = '服务'
      model.type2 = 'primary'
      model.label = '取消'
      model.type = 'danger'
      break
    case '已取消':
      model.visible = false
      break
    case '退款中':
      model.label = '退款'
      model.type = 'info'
      model.label2 = '驳回'
      model.type2 = 'danger'
      break
    case '已退款':
      model.visible = false
      break
    case '服务中':
      model.label = '退款'
      model.type = 'info'
      break
    case '待评价':
      model.visible = false
      break
    case '已评价':
      model.visible = false
      break
    default:
      break
  }
  return model
}
