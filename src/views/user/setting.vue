<template>
<div class="content setting" transition="setting-transition">
  <header class="bar bar-nav">
    <a class="button button-link button-nav pull-left" v-link="{path: '/user', replace: true}">
    <span class="icon icon-left"></span>
    </a>
    <h1 class="title color">设置</h1>
  </header>
  <div class="list-block">
    <ul style="margin-top:.5rem;">
      <!-- <li>
        <div class="item-link item-content">
            <div class="item-inner" v-link="{ path: '/user/changePwd', replace: false}">
                <div class="item-title label">密码修改</div>
                <div class="item-input">
                    <input type="text" readonly="true">
                </div>
            </div>
        </div>
      </li> -->
      <li>
        <div class="item-content">
            <div class="item-inner">
                <div class="item-title label">加载图片</div>
                <div class="item-input">
                  <label class="label-switch pull-right">
                    <input type="checkbox" v-model="showImg">
                    <div class="checkbox"></div>
                  </label>
                </div>
            </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="submit-button">
    <button class="button button-big button-fill" @click="logout(this.$route.router, this.$root)">退出登录</button>
  </div>
</div>
</template>

<script>
import $ from 'zepto'

export default {
  ready () {
  },
  data () {
    return {
      showImg: this.$root.showImg
    }
  },
  methods: {
    logout (route, root) {
      var buttons1 = [
        {
          text: '确定退出登录?',
          label: true
        },
        {
          text: '确定',
          bold: true,
          color: 'danger',
          onClick: function () {
            root.cardBadge = 0
            root.showPlan = false
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('token')
            window.localStorage.removeItem('imageSwitch')
            window.localStorage.setItem('imageSwitch', true)
            route.go({path: '/user', replace: true})
          }
        }
      ]
      var buttons2 = [
        {
          text: '取消'
          // bg: 'danger'
        }
      ]
      var groups = [buttons1, buttons2]
      $.actions(groups)
    }
  },
  watch: {
    'showImg': {
      handler: function (val, oldVal) {
        // 调用vuex方法改变展示图片开关
        this.$root.setShowImg(Boolean(val))
      }
    }
  }
}
</script>

<style>
.setting .list-block {
  margin: 2.4rem 0 1rem 0;
  font-size: .65rem;
}
.setting .list-block .item-subtitle {
  font-size: .65rem;
}
.setting .list-block .item-input {
  margin-top: .06rem;
  margin-bottom: .06rem;
}
.setting .list-block input {
  font-size: .65rem;
}
.setting .list-block select {
  font-size: .65rem;
}
.setting .list-block textarea {
  font-size: .65rem;
}
.setting .list-block .item-title.label  {
  width: 30%;
}
.setting .submit-button {
  margin: 0 auto 2rem auto;
  width: 100%;
  padding: 0 .45rem;
}
.setting .submit-button button {
  background-color: red;
  width: 100%;
  line-height: 2.1rem !important;
  height: 2.1rem !important;
}
.color {
  background-color: #ed8e07;
}
/*
 从右至左切入
 */
.setting-transition-enter {
  animation: bounce-in .5s;
}
.setting-transition-leave {
  animation: bounce-out .5s;
}

@keyframes bounce-in {
  0% {
		opacity: 0;
		-webkit-transform: translateX(100%);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(0);
	}
}
@keyframes bounce-out {
  0% {
		opacity: 0;
		-webkit-transform: translateX(0);
	}
	100% {
		opacity: 1;
		-webkit-transform: translateX(100%);
	}
}
</style>
