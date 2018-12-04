<template>
  <div class="controlBtn">
    <transition name="move">
      <div v-show="item.count" @click="decCount" class="btn icon-remove_circle_outline"></div>
    </transition>
    <transition name="fade">
      <div v-show="item.count" class="count">{{item.count}}</div>
    </transition>
    <div @click="addCount" class="btn icon-add_circle"></div>
  </div>
</template>

<script>
  export default {
    name: 'ControlBtn',
    props: {
      item: {
        type: Object,
        required: true
      },
      drop: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {count: 0}
    },
    methods: {
      addCount(e) {
        let target = this.drop ? e.target : false

        this.$emit('addCount', {item: this.item, target})
      },
      decCount() {
        this.$emit('decCount', this.item)
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .controlBtn
    width: 72px
    text-align: right
    transition: all 0.5s linear
    .btn
      display: inline-block
      font-size: 24px
      line-height: 24px
      color: rgb(0, 160, 220)
      vertical-align: top
      transition: all 0.5s linear
      &.move-leave-to, &.move-enter
        opacity: 0
        transform-origin: center center
        transform: translateX(36px) rotateZ(180deg)
    .count
      display: inline-block
      width: 24px
      font-size: 10px
      line-height: 24px
      text-align: center
      color: rgb(147, 153, 159)
      transition: all 0.5s linear
      &.fade-enter, &.fade-leave-to
        opacity: 0
</style>
