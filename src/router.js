import $ from 'zepto'

export default function (router) {
  router.map({
    '*': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/': {
      component (resolve) {
        require(['./views/welcome'], resolve)
      }
    },
    '/home': {
      component (resolve) {
        require(['./views/lottery/home'], resolve)
      }
    },
    '/choose': {
      component (resolve) {
        require(['./views/pay/choose'], resolve)
      }
    },
    '/payment': {
      component (resolve) {
        require(['./views/pay/payment'], resolve)
      }
    },
    '/history': {
      component (resolve) {
        require(['./views/lottery/history'], resolve)
      }
    },
    '/user': {
      component (resolve) {
        require(['./views/user/user'], resolve)
      }
    },
    '/record': {
      component (resolve) {
        require(['./views/lottery/record'], resolve)
      }
    },
    '/login': {
      component (resolve) {
        require(['./views/user/login'], resolve)
      }
    }
  })

  router.beforeEach(({abort, to, from, next, redirect}) => {
    let toPath = to.path
    let fromPath = from.path
    console.log('to: ' + toPath + ' from: ' + fromPath)
    // 进入详情页时需要记录滚动条距离头部距离
    if (fromPath === '/home') {
      router.app.planScrolltop = $('.content').scrollTop()
    }
    // else if (fromPath === '/happyPurchase') {
    //   router.app.hpScrolltop = $('.content').scrollTop()
    // }
    next()
  })

  router.afterEach(function (transition) {
    // console.log('成功浏览到: ' + transition.to.path)
    $.refreshScroller()
  })
}
