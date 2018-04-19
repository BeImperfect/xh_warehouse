// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router.config'
import Less from 'less'
import axios from 'axios'
import store from './store/'
import VueLazyload from 'vue-lazyload'
import App from './App'
import Loading from './components/loading/'
require('./assets/css/base.css')
Vue.use(Less)
Vue.use(VueRouter)
Vue.use(Loading)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: require('./assets/images/err.png'),
  loading: require('./assets/images/loading.gif'),
  attempt: 1,
  listenEvent: ['scroll']
});

const router = new VueRouter({
  mode: 'history',
  scrollBehavior: () => {
    y: 0
  },
  routes
})

Vue.config.productionTip = false

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的
axios.interceptors.request.use(config => { //配置发送请求的信息
  store.dispatch('showLoading');
  return config;
}, error => {
  return Promise.reject(error);
});

axios.interceptors.response.use(response => {
  store.dispatch('hideLoading');
  return response;
}, error => {
  return Promise.reject(error);
});

axios.defaults.baseURL = 'http://localhost:3333/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http = axios;

// 处理刷新时vuex被清空但是用户名已经登录的情况
if (window.sessionStorage.userInfo) {
  store.dispatch('setUserInfo', JSON.parse(window.sessionStorage.userInfo));
}

// 登录中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.user_id) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 把要跳转的地址作为参数传到下一步
      });
    }
  } else {
    next();
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
