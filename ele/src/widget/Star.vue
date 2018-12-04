<template>
  <div :class="starType" class="star">
    <span v-for="(star,index) in classMap" :class="star" class="item" :key="index"></span>
  </div>
</template>

<script>
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      score: {
        type: Number,
        required: true
      },
      size: {
        type: String,
        default: '24'
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      classMap() {
        let score = Math.floor(this.score * 2) / 2
        let result = []
        for (var i = 0; i < LENGTH; i++) {
          if (i < Math.floor(score)) {
            result.push(CLS_ON)
          } else if (i === Math.floor(score) && i < score) {
            result.push(CLS_HALF)
          } else {
            result.push(CLS_OFF)
          }
        }
        return result
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/scss/mixin"
  .star
    display: inline-block
    vertical-align: top
    .item
      display: inline-block
    &.star-24
      .item
        width: 12px
        height: 12px
        margin-right: 3px
        &:last-child
          margin-right: 0
        &.on
          @include bg-img("../public/img/star24_on", 12px 12px)
        &.half
          @include bg-img("../public/img/star24_half", 12px 12px)
        &.off
          @include bg-img("../public/img/star24_off", 12px 12px)
    &.star-36
      .item
        width: 15px
        height: 15px
        margin-right: 4px
        &:last-child
          margin-right: 0
        &.on
          @include bg-img("../public/img/star36_on", 15px 15px)
        &.half
          @include bg-img("../public/img/star36_half", 15px 15px)
        &.off
          @include bg-img("../public/img/star36_off", 15px 15px)
    &.star-48
      .item
        width: 20px
        height: 20px
        margin-right: 22px
        &:last-child
          margin-right: 0
        &.on
          @include bg-img("../public/img/star48_on", 20px 20px)
        &.half
          @include bg-img("../public/img/star48_half", 20px 20px)
        &.off
          @include bg-img("../public/img/star48_off", 20px 20px)
</style>
