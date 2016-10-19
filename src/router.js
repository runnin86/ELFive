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
    '/oauth': {
      component (resolve) {
        require(['./views/oauthWechat'], resolve)
      }
    },
    '/home': {
      component (resolve) {
        require(['./views/lottery/home'], resolve)
      }
    },
    '/sub': {
      component (resolve) {
        require(['./views/pay/sub'], resolve)
      }
    },
    '/choose': {
      component (resolve) {
        require(['./views/pay/choose'], resolve)
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
    },
    '/reg': {
      component (resolve) {
        require(['./views/user/register'], resolve)
      }
    },
    '/order': {
      component (resolve) {
        require(['./views/user/order'], resolve)
      }
    },
    '/bill': {
      component (resolve) {
        require(['./views/user/bill'], resolve)
      }
    },
    '/modify': {
      component (resolve) {
        require(['./views/user/modify'], resolve)
      }
    },
    '/withdrawals': {
      component (resolve) {
        require(['./views/user/withdrawals'], resolve)
      }
    },
    '/withdrawals_complete': {
      component (resolve) {
        require(['./views/user/withdrawals_complete'], resolve)
      }
    },
    '/rule': {
      component (resolve) {
        require(['./views/user/rule'], resolve)
      }
    },
    '/protocol': {
      component (resolve) {
        require(['./views/user/protocol'], resolve)
      }
    },
    '/home/payment': {
      name: 'payment',
      component (resolve) {
        require(['./views/pay/payment'], resolve)
      }
    }
  })

  router.beforeEach(({abort, to, from, next, redirect}) => {
    // let toPath = to.path
    let fromPath = from.path
    // console.log('to: ' + toPath + ' from: ' + fromPath)
    // 进入详情页时需要记录滚动条距离头部距离
    if (fromPath === '/home') {
      router.app.planScrolltop = $('.content').scrollTop()
    }
    next()
  })

  router.afterEach(function (transition) {
    // console.log('成功浏览到: ' + transition.to.path)
    $.refreshScroller()
  })
}
