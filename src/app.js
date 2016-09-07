import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import routerConfig from './router'
import pullToRefresh from './directives/pullToRefresh'
import infiniteScroll from './directives/infiniteScroll'
import * as filters from './filters'
import app from './main'

// debug
Vue.config.debug = true

// Router
Vue.use(VueRouter)

const router = new VueRouter({
  // suppressTransitionError: true,
  // transitionOnLoad: true,
  hashbang: true,
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

routerConfig(router)

// Resource
Vue.use(VueResource)

// Vue.http.options.root = '/data/'
Vue.http.options.emulateJSON = true
// Vue.http.options.emulateHTTP = true
// Vue.http.options.headers['Access-Control-Allow-Origin'] = '*'
// Vue.http.options.headers['Access-Control-Allow-Methods'] = 'get'

// Directive
Vue.directive('pullToRefresh', pullToRefresh)
Vue.directive('infiniteScroll', infiniteScroll)
// 全局拦截
Vue.http.interceptors.push({
  request: function (request) {
    return request
  },
  response: function (response) {
    return response
  }
})

// Filters
Vue.filter('date', filters.dateFilter)
Vue.filter('split', filters.splitFilter)
Vue.filter('getArray', filters.getArray)
Vue.filter('getGameTypeName', filters.gameTypeFilterDesc)

router.start(app, '#app')

window.router = router
