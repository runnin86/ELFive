<script>
// import $ from 'zepto'

export default {
  ready () {
    let appid = 'wxda10e6b61a107d64'
    let redirect_uri = 'http://9756.ngrok.cc/'
    let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
    'appid=' + appid +
    '&redirect_uri=' + redirect_uri +
    '&response_type=code&scope=snsapi_base&state=plan#wechat_redirect'
    window.location.href = oauthUrl
  }
}
</script>
