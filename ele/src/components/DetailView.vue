<template>
  <div class=detail>
    <div class="detailWrapper clear-fix">
      <div class="detailMain">
        <h2 class="title">{{seller.name}}</h2>
        <star :score="seller.score ? seller.score : 0" size="48"></star>
        <div class="desc-title">
          <div class="line"></div>
          <div class="text">优惠信息</div>
          <div class="line"></div>
        </div>
        <ul class="supports" v-if="seller.supports&&seller.supports.length">
          <li class="support" v-for="(support,index) in seller.supports" :key="index">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
        <div class="desc-title">
          <div class="line"></div>
          <div class="text">商家公告</div>
          <div class="line"></div>
        </div>
        <div class="bulletin">
          {{seller.bulletin}}
        </div>
      </div>
    </div>
    <div class="close">
      <i class="icon-close icon" @click="$emit('close')"></i>
    </div>
  </div>
</template>

<script>
  import Star from '../widget/Star.vue'
  export default {
    props: ['seller', 'classMap'],
    components: {
      Star
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/scss/mixin"
  .detail
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    text-align: center
    overflow: auto
    background: rgba(7, 17, 27, 0.8)
    // 背景模糊 ios/OS X支持
    -webkit-backdrop-filter: blur(10px)
    backdrop-filter: blur(10px)
    z-index: 100
    .detailWrapper
      box-sizing: border-box
      width: 100%
      min-height: 100%
      padding-bottom: 64px
      .detailMain
        margin: 64px 36px 0
        .title
          margin-bottom: 16px
          font-size: 16px
          font-weight: 700
          line-height: 16px
        .desc-title
          display: flex
          margin: 28px 0 24px
          width: 100%
          .line
            flex: 1
            position: relative
            top: -6px
            border-bottom: 1px solid rgba(255, 255, 255, 0.2)
          .text
            margin: 0 12px
            font-size: 14px
            line-height: 14px
            font-weight: 700
        .supports
          width: 100%
          padding: 0 12px
          .support
            margin-bottom: 12px
            text-align: left
            .icon
              display: inline-block
              width: 16px
              height: 16px
              vertical-align: top
              @include map-icon("../public/img", 2, 16px 16px)
            .text
              font-size: 12px
              line-height: 16px
              margin-left: 6px
            &:last-child
              margin-bottom: 0
        .bulletin
          box-sizing: border-box
          width: 100%
          padding: 0 12px
          font-size: 12px
          line-height: 24px
          text-align: left

    .close
      height: 64px
      margin-top: -64px
      font-size: 32px
      color: rgba(255, 255, 255, 0.5)
</style>
