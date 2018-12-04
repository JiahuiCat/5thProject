<template>
  <div class="seller">
    <div>
      <div class="overView">
        <div class="headerView border-1px">
          <h2 class="name">{{seller.name}}</h2>
          <div class="desc">
            <star :score="seller.score" size="36"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="favorite" @click="favoriteFunc">
            <i class="icon-favorite" :class="{active:favorite}"></i>
            <div class="text">{{favoriteText}}</div>
          </div>
        </div>
        <div class="bottomView">
          <div class="item">
            <div class="title">起送价</div>
            <div class="content"><span class="big">{{seller.minPrice}}</span>元</div>
          </div>
          <div class="item">
            <div class="title">商家配送</div>
            <div class="content"><span class="big">{{seller.deliveryPrice}}</span>元</div>
          </div>
          <div class="item">
            <div class="title">平均配送时间</div>
            <div class="content"><span class="big">{{seller.deliveryTime}}</span>分钟</div>
          </div>
        </div>
      </div>
      <split></split>
      <div class="banner">
        <h2 class="name">商家实景</h2>
        <div class="pics" ref="pics">
          <ul class="picList" ref="picContent">
            <li ref="picItme" v-for="(img,index) in seller.pics" class="picItem" :key="index">
              <img :src="img" width="120" height="90"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  import {Star, Split} from '../widget'

  export default {
    props: {
      seller: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        favorite: false
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        vm._initHorizontalScroller()
      })
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    methods: {
      _initHorizontalScroller() {
        if (this.seller.pics) { // 滑动原理内容大于容器，但是我们发现这里内容等于容器
          // 先判断当前seller值不能为空时才有图片数据，实现横轴滚动
          // 因为我们发现容器并没有撑开，js强制撑开
          let picsLength = this.seller.pics.length
          let picWidth = this.$refs.picItme[0].offsetWidth
          let picListWidth = (picWidth + 6) * picsLength
          this.$refs.picContent.style.width = picListWidth + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) { // 判断是否已经有图片滑动实例对象
              this.picScroll = new BScroll(this.$refs.pics, {
                scrollX: true
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      },
      favoriteFunc() {
        this.favorite = !this.favorite
      }
    },
    components: {
      Star,
      Split
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  @import "../public/scss/mixin"
  .seller
    position: fixed
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    font-size: 0
    .overView
      position: relative
      padding: 18px
      .headerView
        padding-bottom: 18px
        @include border-1px(rgba(7, 17, 27, 0.1))
        .name
          margin-bottom: 8px
          font-size: 14px
          line-height: 14px
          color: rgb(7, 17, 27)
        .ratingCount, .sellCount
          vertical-align: top
          font-size: 10px
          line-height: 18px
          color: rgb(77, 85, 93)
        .ratingCount
          margin: 0 12px 0 8px
        .favorite
          position: absolute
          top: 0
          right: 0
          display: inline-block
          width: 36px
          text-align: center
          .icon-favorite
            display: inline-block
            margin-bottom: 4px
            font-size: 24px
            line-height: 24px
            color: rgba(77, 85, 93, 0.2)
            &.active
              color: rgb(240, 20, 20)
          .text
            font-size: 10px
            line-height: 10px
            color: rgb(77, 85, 93)
      .bottomView
        margin-top: 18px
        display: flex
        .item
          flex: 1
          text-align: center
          border-right: 1px solid rgba(7, 17, 27, 0.1)
          &:last-child
            border-right: none
          .title
            margin-bottom: 8px
            font-size: 10px
            line-height: 10px
            color: rgb(147, 153, 159)
          .content
            font-size: 10px
            line-height: 24px
            font-weight: 200
            color: rgb(7, 17, 27)
            .big
              font-size: 24px
    .banner
      padding: 18px 0 18px 18px
      width: 100%
      box-sizing: border-box
      .name
        margin-bottom: 12px
        font-size: 14px
        line-height: 14px
        color: rgb(7, 17, 27)
      .pics
        white-space: nowrap
        overflow: hidden
        width: 100%
        .picItem
          display: inline-block
          margin-right: 6px
          width: 120px
          height: 90px
</style>
