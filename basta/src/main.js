// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Auth from './authentication.js'
import axios from 'axios'
import authentication from "./authentication";
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate);
Vue.use(BootstrapVue);
Vue.use(authentication.authenticated());
Vue.config.productionTip = false;

Vue.filter('formatDate', function (value) {
  if (value) {
    let date = new Date(value);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
  }
});

Vue.filter('formatDateWithWeekday', function (value) {
  if (value) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let date = new Date(value);
    return days[date.getDay()] + ', ' + date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear()
  }
});


router.beforeEach((to, from, next) => {
  if (from.name === 'login' && ['login', 'logout', 'password-reset-confirm'].indexOf(to.name) >= 0) {
    next({name: 'home'})
  }
  if (to.meta.auth && !Auth.authenticated()) {
    next('/login')
  } else {
    next()
  }
});


window.authentication = authentication;

window.axios = axios;

if (Auth.authenticated()) {
  window.axios.defaults.headers.common = {
    'Authorization': ('Token ' + JSON.parse(localStorage.getItem('user')).data.auth_token)
  };
  console.log(window.axios.defaults.headers.common)
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
