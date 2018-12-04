<template>
  <div id="app">
    <ele-header :seller="seller" :classMap="classMap"></ele-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/rating">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller" :classMap="classMap"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import EleHeader from './components/EleHeader.vue'
  export default {
    name: 'App',
    data() {
      return {
        seller: {},
        classMap: ['decrease', 'discount', 'special', 'invoice', 'guarantee']
      }
    },
    created() {
      this.axios.get('/api/seller')
        .then(res => {
          console.log(res)
          res = res.data
          if (res.errno === 0) { // 模拟公司状态值判断,数据请求成功
            this.seller = res.data
          }
        })
    },
    components: {
      EleHeader
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "./public/scss/mixin"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      @include border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
