this.$http.post(userApi.login,
  {
    'userName': this.userName,
    'password': this.password
  })
.then(({data: {code, msg, info}})=>{
  if (code === 1) {
    if (info.user.user_status === 0) {
      $.toast('账户未激活，充值后激活账户')
    }
    else if (info.user.user_status === 1) {
      $.toast('登录成功')
      window.localStorage.setItem('elUser', JSON.stringify(info.user))
      window.localStorage.setItem('elToken', info.token)
      window.localStorage.setItem('imageSwitch', true)
      // 调用公告处理
      this.$root.loadNotice()
      this.$route.router.go({path: this.path, replace: true})
      // 设置购物车图标
      this.$root.setCardBadge()
    }
  }
  else {
    $.toast(msg)
  }
}).catch((e)=>{
  $.alert('服务器连接中断...')
  console.error('无法连接服务器:' + e)
})
