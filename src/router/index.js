import Vue from 'vue'
import Router from 'vue-router'
import sgoods from "@/components/goods/sgoods"
import sratings from "@/components/ratings/sratings"
import sseller from "@/components/seller/sseller"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'sgoods',
      component: sgoods
    },
    {
      path: '/ratings',
      name: 'sratings',
      component: sratings
    },
    {
      path: '/seller',
      name: 'sseller',
      component: sseller
    },
  ]
})
