<template>
  <div class="selecter">
    <div class="typeSelect border-1px">
      <div class="inlineBlock positive" :class="{active: selectOption.selected === 2}" @click="selectRatingType(2)">
        <span class="type">{{selectOption.desc.all}}</span>
        <span class="count">{{ratings.length}}</span>
      </div>
      <div class="inlineBlock positive" :class="{active: selectOption.selected === 0}" @click="selectRatingType(0)">
        <span class="type">{{selectOption.desc.positive}}</span>
        <span class="count">{{positive.length}}</span>
      </div>
      <div class="inlineBlock" :class="{active: selectOption.selected === 1}" @click="selectRatingType(1)">
        <span class="type">{{selectOption.desc.negative}}</span>
        <span class="count">{{negative.length}}</span>
      </div>
    </div>
    <div class="hasContent" @click="selectOnlyContent">
      <i class="icon icon-check_circle" :class="{active:selectOption.onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const ALL = 2
  const POSITIVE = 0
  const NEGATIVE = 1
  export default {
    props: {
      ratings: {
        type: Array,
        required: true
      },
      selectOption: {
        type: Object,
        default() {
          return {
            selected: ALL,
            onlyContent: true,
            desc: {
              all: '全部',
              positive: '满意',
              negative: '不满意'
            }
          }
        }
      }
    },
    computed: {
      positive() {
        return this.ratings.filter(item => item.rateType === POSITIVE)
      },
      negative() {
        return this.ratings.filter(item => item.rateType === NEGATIVE)
      }
    },
    methods: {
      selectRatingType(type) {
        this.$emit('selectRatingType', type)
      },
      selectOnlyContent() {
        this.$emit('onlyContent')
      }
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/scss/mixin"
  .selecter
    padding: 0 18px
    font-size: 0
    border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    .typeSelect
      padding: 18px 0
      @include border-1px(rgba(7, 17, 27, 0.1))
      .inlineBlock
        display: inline-block
        padding: 8px 12px
        margin-right: 8px
        border-radius: 2px
        background: rgba(77, 85, 93, 0.2)
        color: rgb(77, 85, 93)
        .type
          font-size: 12px
          line-height: 16px
        .count
          margin-left: 2px
          font-size: 8px
        &.active
          background: rgb(77, 85, 93)
          color: #fff
        &.positive
          background: rgba(0, 160, 220, 0.2)
          &.active
            background: rgb(0, 160, 220)
    .hasContent
      padding: 12px
      color: rgb(147, 153, 159)
      .icon
        font-size: 24px
        line-height: 24px
        &.active
          color: #1cb732
      .text
        margin-left: 4px
        font-size: 12px
        line-height: 24px
        vertical-align: top
</style>
