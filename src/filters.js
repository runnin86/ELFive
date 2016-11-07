
let format = (value) => {
  return value >= 10 ? value : '0' + value
}
/**
 * 时间格式化
 */
export let dateFilter = (time, type) => {
  let date = new Date(time * 1000)
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let second = date.getSeconds()
  let result
  switch (type)
  {
    case 0: // 01-05
      result = `${format(month)}-${format(day)}`
      break
    case 1: // 11:12
      result = `${format(hours)}-${format(minutes)}`
      break
    case 2: // 2015-01-05
      result = `${year}-${format(month)}-${format(day)}`
      break
    case 3: // 2015-01-05 11:12
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}`
      break
    case 4:// 2015-01-05 11:12:06
      result = `${year}-${format(month)}-${format(day)}  ${format(hours)}:${format(minutes)}:${format(second)}`
      break
  }
  return result
}

/**
 * 字符串str按照s进行分割,返回一个数组
 */
export let splitFilter = (str, s) => {
  return str != null ? str.split(s) : ''
}

/**
 * 获取数组中的某个元素
 */
export let getArray = (arr, i) => {
  return arr[i]
}

/**
 * 玩法转换为文字描述
 */
export let gameTypeFilterDesc = (gt) => {
  let name = ''
  if (gt === 'Z2') {
    name = '前二直选'
  }
  else if (gt === 'R3') {
    name = '任选三'
  }
  else if (gt === 'R5') {
    name = '任选五'
  }
  else if (gt === 'R6') {
    name = '任选六'
  }
  else if (gt === 'R7') {
    name = '任选七'
  }
  return name
}
