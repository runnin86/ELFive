import $ from 'zepto'
import wx from 'wx'

const START_HOUR = 8
const START_MINUTE = 55
const END_HOUR = 21
const END_MINUTE = 45
const ADVANCE = 5

// 计算时间差
export let getDateDiff = (startTime, endTime, diffType) => {
  // 将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式
  startTime = startTime.replace(/\-/g, '/')
  endTime = endTime.replace(/\-/g, '/')
  // 将计算间隔类性字符转换为小写
  diffType = diffType.toLowerCase()
  var sTime = new Date(startTime) // 开始时间
  var eTime = new Date(endTime)   // 结束时间
  // 作为除数的数字
  var divNum = 1
  switch (diffType)
  {
    case 'second':
      divNum = 1000
      break
    case 'minute':
      divNum = 1000 * 60
      break
    case 'hour':
      divNum = 1000 * 3600
      break
    case 'day':
      divNum = 1000 * 3600 * 24
      break
    default:
      break
  }
  return parseInt((eTime.getTime() - sTime.getTime()) / parseFloat(divNum, 0), 0)
}

// 打印钩子函数运行的时间
export let hookTime = (component, hookFnName) => {
  let date = new Date()
  let m = date.getMinutes()
  let s = date.getSeconds()
  let ms = date.getMilliseconds()
  console.log(`${component} ${hookFnName} ${m}-${s}-${ms}`)
}

// 加载动画
export let loader = {
  show () {
    if ($('.ball-beat')[0]) {
      return
    }
    let modalContainer = document.body
    $(modalContainer).append('<div class="loader-inner ball-beat"><div></div><div></div><div></div></div>')
  },
  hide () {
    $('.ball-beat').remove()
  }
}

// 微信分享配置
export let wxShareConfig = ({title, desc, link, imgUrl}, success, fail, invite) => {
  console.log('wxShare Config')
  wx.ready(() => {
    /*
     * config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，
     * config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
     * 则须把相关接口放在ready函数中调用来确保正确执行。
     * 对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
     */
    // “分享给朋友”
    wx.onMenuShareAppMessage({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })
    // “分享到朋友圈”
    wx.onMenuShareTimeline({
      title: title,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })

    // 分享到QQ
    wx.onMenuShareQQ({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })
    // 分享到腾讯微博
    wx.onMenuShareWeibo({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })
    // 分享到QQ空间
    wx.onMenuShareQZone({
      title: title,
      desc: desc,
      link: link,
      imgUrl: imgUrl,
      success: success,
      fail: fail
    })
  })
}

export let dateFormat = (date, fmt)=> {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'H+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 定义玩法对应的赔率
// R1(6.5), R2(3), R3(9.5), R4(39), R5(270), R6(45), R7(13), R8(4.5);
export let getOdds = (gameType) => {
  let odds = 0
  switch (gameType)
  {
    case 'F2G':
      odds = 32.5
      break
    case 'F2D':
      odds = 65
      break
    case 'R1':
      odds = 6.5
      break
    case 'R2':
      odds = 3
      break
    case 'R3':
      odds = 9.5
      break
    case 'R4':
      odds = 39
      break
    case 'R5':
      odds = 270
      break
    case 'R6':
      odds = 45
      break
    case 'R7':
      odds = 13
      break
    case 'R8':
      odds = 4.5
      break
    default:
      break
  }
  return parseFloat(odds)
}

// 获得组合的个数C(6,5)=6
export let getCombinationCount = (m, n) => {
  n = (n < m - n) ? n : (m - n)
  let a = 1
  for (let i = 1; i <= n; i++) {
    a = a * m-- / i
  }
  return parseInt(a, 0)
}

// 生成一天能生成的期号和每期开始时间
export let getAllPeriodsOneDay = (time) => {
  let map = new Map()
  let now = new Date(time)
  now.setHours(START_HOUR)
  now.setMinutes(START_MINUTE)
  now.setSeconds(0)
  let start = new Date(now)
  now.setHours(END_HOUR)
  now.setMinutes(END_MINUTE)
  now.setSeconds(0)
  let end = new Date(now)
  // 设置提前量时间(分)
  if (ADVANCE > 0) {
    start.setMinutes(start.getMinutes() - ADVANCE)
    end.setMinutes(end.getMinutes() - ADVANCE)
  }
  let dayNum = dateFormat(now, 'yyyyMMdd')
  let i = 1
  while (true) {
    if (start.getTime() <= end.getTime()) {
      let p = i < 10 ? '0' + i : '' + i
      map.set(dateFormat(start, 'yyyy-MM-dd HH:mm:ss'), dayNum + p)
      // console.log(dateFormat(start, 'yyyy-MM-dd HH:mm:ss') + '->' + dayNum + p)
      i++
      start.setMinutes(start.getMinutes() + 10)
    }
    else {
      break
    }
  }
  return map
}
