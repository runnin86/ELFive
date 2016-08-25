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
    '/login': {
      component (resolve) {
        require(['./views/user/login'], resolve)
      }
    },
    '/happyPurchase': {
      component (resolve) {
        require(['./views/hp/happyPurchase'], resolve)
      }
    },
    '/happyPurchase/detail/:id': {
      name: 'itemDetail',
      component (resolve) {
        require(['./views/hp/itemDetail'], resolve)
      }
    },
    '/latestAnnounced': {
      component (resolve) {
        require(['./views/hp/latestAnnounced'], resolve)
      }
    },
    '/plan': {
      component (resolve) {
        require(['./views/plan/plan'], resolve)
      }
    },
    '/plan/detail/:id': {
      name: 'planDetail',
      component (resolve) {
        require(['./views/plan/planDetail'], resolve)
      }
    },
    '/plan/rank': {
      component (resolve) {
        require(['./views/plan/rank'], resolve)
      }
    },
    '/shopCart': {
      component (resolve) {
        require(['./views/cart/shopCart'], resolve)
      }
    },
    '/user': {
      component (resolve) {
        require(['./views/user/user'], resolve)
      }
    },
    '/user/order': {
      component (resolve) {
        require(['./views/user/userOrder'], resolve)
      }
    },
    '/user/setting': {
      component (resolve) {
        require(['./views/user/setting'], resolve)
      }
    },
    '/user/message': {
      component (resolve) {
        require(['./views/user/message'], resolve)
      }
    },
    '/user/changePwd': {
      component (resolve) {
        require(['./views/user/changePwd'], resolve)
      }
    },
    '/user/qrCode': {
      component (resolve) {
        require(['./views/user/userQRCode'], resolve)
      }
    },
    '/user/team': {
      component (resolve) {
        require(['./views/user/userTeam'], resolve)
      }
    },
    '/user/help': {
      component (resolve) {
        require(['./views/user/help'], resolve)
        // require(['./views/user/help-sd'], resolve)
      }
    },
    '/user/commission': {
      component (resolve) {
        require(['./views/user/userCommission'], resolve)
      }
    },
    '/user/bill': {
      component (resolve) {
        require(['./views/user/userBill'], resolve)
      }
    },
    '/user/bill/plan': {
      component (resolve) {
        require(['./views/user/bill/plan'], resolve)
      }
    },
    '/user/bill/recharge': {
      component (resolve) {
        require(['./views/user/bill/recharge'], resolve)
      }
    },
    '/user/bill/withdraw': {
      component (resolve) {
        require(['./views/user/bill/withdraw'], resolve)
      }
    },
    '/user/bill/reward': {
      component (resolve) {
        require(['./views/user/bill/reward'], resolve)
      }
    },
    '/user/forgetPwd': {
      component (resolve) {
        require(['./views/user/forgetPwd'], resolve)
      }
    },
    '/more': {
      component (resolve) {
        require(['./views/more/more'], resolve)
      }
    },
    '/more/feedback': {
      component (resolve) {
        require(['./views/more/feedback'], resolve)
      }
    },
    '/more/about': {
      component (resolve) {
        require(['./views/more/about'], resolve)
        // require(['./views/more/about-sd'], resolve)
      }
    },
    '/checkout/:token/:pwd': {
      name: 'checkout',
      component (resolve) {
        require(['./views/cart/checkout'], resolve)
      }
    },
    '/recharge/:state': {
      name: 'recharge',
      component (resolve) {
        require(['./views/user/recharge'], resolve)
      }
    }
  })

  router.beforeEach(({abort, to, from, next, redirect}) => {
    let toPath = to.path
    let fromPath = from.path
    // console.log('to: ' + toPath + ' from: ' + fromPath)
    if (toPath.replace(/[^/]/g, '').length > 1 || toPath.substring(0, 6) === '/login') {
      router.app.isIndex = false
    }
    else {
      let depath = toPath === '/' || toPath === '/latestAnnounced'
      router.app.isIndex = depath ? 0 : 1
    }
    if (toPath === '/plan' && !window.localStorage.getItem('token')) {
      this.$route.router.go({path: '/happyPurchase', replace: true})
    }
    // 进入详情页时需要记录滚动条距离头部距离
    if (fromPath === '/plan') {
      router.app.planScrolltop = $('.content').scrollTop()
    }
    else if (fromPath === '/happyPurchase') {
      router.app.hpScrolltop = $('.content').scrollTop()
    }
    next()
  })

  router.afterEach(function (transition) {
    // console.log('成功浏览到: ' + transition.to.path)
    $.refreshScroller()
  })
}
