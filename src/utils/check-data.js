export function check(data) {
  if (data) {
    if (!Array.isArray(data)) { return [data] } else { return data }
  } else { return console.log('data不存在') }
}
