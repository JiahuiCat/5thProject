<template>
  <div class="header">
    <div class="contentWrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="desc">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports&&seller.supports.length">
          <transition-group name="fade">
            <div v-for="(item,index) in seller.supports" class="item" :key="index" v-show="currentIndex==index">
              <span class=icon                 :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </div>
          </transition-group>
        </div>
      </div>
      <div v-if="seller.supports&&seller.supports.length"
           @click="showDetail"
           class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class=bulletinWrapper  @click="showDetail">
      <span class="bulletin"></span>
      <span class="bulletinText">{{seller.bulletin}}</span>
      <i class="icon icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="80%"/>
    </div>
    <transition name="detail">
      <detail-view v-show="show" @close="closeDetail" :seller="seller" :classMap="classMap"></detail-view>
    </transition>
  </div>
</template>

<script>
  import DetailView from './DetailView'
  export default {
    mounted() {
      this.$nextTick(() => {
        setInterval(() => {
          this.currentIndex++
          if (this.currentIndex >= this.seller.supports.length) {
            this.currentIndex = 0
          }
        }, 1000)
      })
    },
    props: {
      seller: {
        type: Object,
        required: true
      },
      classMap: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        currentIndex: 0,
        show: false
      }
    },
    methods: {
      showDetail() {
        this.show = true
      },
      closeDetail() {
        this.show = false
      }
    },
    components: {
      DetailView
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/scss/mixin"
  .header
    position: relative
    font-size: 0
    background: rgba(7, 17, 27, 0.5)
    color: #fff
    .contentWrapper
      display: flex
      position: relative
      padding: 24px 12px 18px 24px
      .avatar
        flex: 0 0 64px
        display: inline-block
        border-radius: 2px
        overflow: hidden
      .content
        flex: 1
        margin-left: 16px
        .title
          margin-top: 2px
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            @include bg-img('../public/img/brand', 30px 18px)
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .desc
          margin-top: 8px
          font-size: 12px
          line-height: 12px
        .support
          margin: 10px 0 2px
          position: relative
          height: 12px
          overflow: hidden
          .item
            position: absolute
            &.fade-enter-active
              transition: all 0.5s
            &.fade-enter
              transform: translateY(100%)
            &.fade-leave-active
              transition: all 0.5s
            &.fade-leave-to
              transform: translateY(-100%)
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            @include map-icon("../public/img", 1, 12px 12px)
          .text
            margin-left: 4px
            font-size: 12px
            line-height: 11px
      .support-count
        position: absolute
        right: 12px
        bottom: 18px
        padding: 7px 8px
        border-radius: 12px
        background: rgba(0, 0, 0, 0.2)
        .count
          display: inline-block
          font-size: 12px
          line-height: 12px
        .icon
          display: inline-block
          height: 10px
          font-size: 12px
          margin: 1px 2px
          vertical-align: bottom
    .bulletinWrapper
      box-sizing: border-box
      display: flex
      width: 100%
      padding: 0 12px
      height: 28px
      line-height: 28px
      font-size: 0
      background: rgba(7, 17, 27, 0.2)
      .bulletin
        flex: 0 0 30px
        display: inline-block
        margin-top: 5px
        width: 30px
        height: 18px
        vertical-align: top
        @include bg-img("../public/img/bulletin", 30px 18px)
      .bulletinText
        flex: 0 1 auto
        display: inline-block
        white-space: nowrap
        overflow: hidden
        text-overflow: ellipsis
        margin: 0 4px
        font-size: 12px
      .icon
        flex: 0 0 12px
        font-size: 12px
        line-height: 28px
    .background
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      overflow: hidden
      text-align: center
      filter: blur(10px)
      z-index: -1
    .detail-enter-active, .detail-leave-active
      transition: all 0.5s
    .detail-enter, .detail-leave-to
      opacity: 0
</style>
