// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.config.productionTip = false
Vue.use(router);
Vue.use(ElementUI);

// 定义路由
// 每个路由应该映射一个组件。
// let router = new VueRouter({
//   routes: [
//     {path: '/', redirect: '/one'},
//     {path: '/one', component: one},
//     {path: '/two', component: two},
//     {path: '/three', component: three},
//     {path: '/four', component: four},
//     {path: '/five', component: five}
//   ]
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
  data: {
    eventHub: new Vue() // 使用集中的事件处理器,一劳永逸的在任何组件调用事件发射、接受的方法
  }
})
