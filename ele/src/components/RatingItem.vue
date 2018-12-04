<template>
  <div class="rating-item border-1px">
    <div class="avatar">
      <img :src="rating.avatar" width="28"/>
    </div>
    <div class="content">
      <div class="name">{{rating.username}}</div>
      <div class="desc">
        <star :score="rating.score" size="24"></star>
        <span class="delivery">{{rating.deliveryTime}}分钟送达</span>
      </div>
      <div class="text">
        {{rating.text}}
      </div>
      <div class="ratingText">
        <i class="icon" :class="rating.rateType===0?'icon-thumb_up':'icon-thumb_down'"></i>
        <span class="recommend" v-for="(item,index) in rating.recommend" :key="index">
          {{item}}
        </span>
      </div>
      <span class="time">{{rating.rateTime | time}}</span>
    </div>
  </div>
</template>

<script>
  import {Star} from '../widget'
  import {filterCustomDate} from '../public/js/tools' // 引入时间戳处理函数
  export default {
    props: {
      rating: {
        type: Object,
        required: true
      }
    },
    components: {
      Star
    },
    filters: {
      time(date) {
        return filterCustomDate(date)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/scss/mixin"
  .rating-item
    display: flex
    padding: 18px 0
    width: 100%
    font-size: 0
    @include border-1px(rgba(7, 17, 27, 0.1))
    .avatar
      flex: 0 0 28px
      width: 28px
      height: 28px
      border-radius: 50%
      overflow: hidden
    .content
      position: relative
      flex: 1
      margin-left: 12px
      color: rgb(7, 17, 27)
      .name
        margin-bottom: 4px
        font-size: 10px
        line-height: 12px
      .desc
        margin-bottom: 6px
        .delivery
          margin-left: 6px
          font-size: 10px
          line-height: 12px
          color: rgb(147, 153, 159)
      .text
        margin-bottom: 8px
        font-size: 12px
        line-height: 18px
      .ratingText
        line-height: 16px
        .icon
          position: relative
          top: 4px
          font-size: 12px
          &.icon-thumb_up
            color: rgb(0, 160, 220)
          &.icon-thumb_down
            color: rgb(183, 187, 191)
        .recommend
          display: inline-block
          margin: 4px 0 0 8px
          padding: 0 6px
          max-width: 55px
          font-size: 9px
          border: 1px solid rgba(7, 17, 27, 0.1)
          vertical-align: bottom
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          color: rgb(147, 153, 159)
      .time
        position: absolute
        top: 0
        right: 0
        font-size: 10px
        line-height: 12px
        color: rgb(147, 153, 159)
</style>
