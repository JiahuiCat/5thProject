import Vue from 'vue'
import Router from 'vue-router'
import GoodsView from '../components/GoodsView'
import RatingsView from '../components/RatingsView'
import SellerView from '../components/SellerView'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/goods', component: GoodsView},
    {path: '/rating', component: RatingsView},
    {path: '/seller', component: SellerView}
  ],
  linkActiveClass: 'active'
})
