// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'

//全局配置
Vue.config.productionTip = false;
//选择使用哪个 类型的 vue代码 选择使用生产版本的vue
Vue.config.silent = true;
Vue.use(resource)//在vue-cli中需要设置resource插件代理ajax

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
