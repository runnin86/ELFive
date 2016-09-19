<script>
// import $ from 'zepto'

export default {
  ready () {
    let appid = 'wxbd594e230ad03e37'
    let redirect_uri = 'http://freh5.zqsml.com/login'
    let oauthUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
    'appid=' + appid +
    '&redirect_uri=' + redirect_uri +
    '&response_type=code&scope=snsapi_base&state=plan#wechat_redirect'
    window.location.href = oauthUrl
  }
}
</script>
