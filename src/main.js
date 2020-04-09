// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import VueWechatTitle from'vue-wechat-title';

import axios from 'axios';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import Vuex from 'vuex';

//使用vue-cookies
import VueCookies from "vue-cookies";

import vuetify from '@/plugins/vuetify'
import '../static/css/unify.css'
import "./echarts/index.js";



// 使用axios
console.log(process.env);
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
axios.defaults.headers = {
  "Content-Type": "application/json"
};

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueCookies);
Vue.use(VueWechatTitle);
// Vue.use(Vuetify);

Vue.config.productionTip = false;
router.beforeEach((to,from,next) => {
  if(to.meta.title) {
    document.title = to.meta.title;    //在路由里面写入的meta里面的title字段
  }
  next();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  components: { App },
  template: '<App/>'
});
