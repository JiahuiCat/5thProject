<template>
  <div class="rating" ref="rating">
    <div>
      <div class="overview">
        <div class="overviewLeft">
          <h2 class="score">{{seller.score}}</h2>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overviewRight">
          <div class="scoreWrapper">
            <span class="title">服务态度</span>
            <star :score="getScore(seller.serviceScore)" size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="scoreWrapper">
            <span class="title">食品评分</span>
            <star :score="getScore(seller.foodScore)" size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="scoreWrapper">
            <span class="title">送达时间</span>
            <span class="desc">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-selecter :ratings="ratings"
                       :selectOption="selectOption"
                       @selectRatingType="selectRatingType" @onlyContent="selectContent"></rating-selecter>
      <div class="ratingWrapper">
        <rating-item v-for="(item,index) in showRatings" :key="index" :rating="item"
                     v-show="selectOption.onlyContent ? item.text : true"></rating-item>
      </div>
    </div>
  </div>
</template>

<script>
  import {RatingSelecter, Star, Split} from '../widget'
  import RatingItem from './RatingItem.vue'
  import BScroll from 'better-scroll'

  export default {
    created() {
      this.axios('/api/ratings')
        .then(res => {
          res = res.data
          if (res.errno === 0) {
            this.ratings = res.data
            // 等待数据请求完毕后并组件子组件全部加载渲染完毕之后,使用better-scroll实现滑动
            this.$nextTick(() => {
              this.ratingScroll = new BScroll(this.$refs.rating, {
                click: true
              })
            })
          }
        })
    },
    props: {
      seller: {
        type: Object,
        require: true
      }
    },
    data() {
      return {
        ratings: [],
        selectOption: {
          selected: 2,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      // 全部为好评的评论
      positiveRatings() {
        return this.ratings.filter(item => item.rateType === 0)
      },
      // 全部为差评的评论
      negativeRatings() {
        return this.ratings.filter(item => item.rateType === 1)
      },
      // 当前需要展示的评论
      showRatings() {
        switch (this.selectOption.selected) {
          case 0:
            return this.positiveRatings
          case 1:
            return this.negativeRatings
          default:
            return this.ratings
        }
      }
    },
    methods: {
      getScore (score) {
        // eslint-disable-next-line
        return score ? score : 0
      },
      selectRatingType(type) {
        this.selectOption.selected = type
      },
      selectContent() {
        this.selectOption.onlyContent = !this.selectOption.onlyContent
      }
    },
    components: {
      Star,
      Split,
      RatingSelecter,
      RatingItem
    }
  }
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
  .rating
    position: fixed
    top: 174px
    left: 0
    bottom: 0
    width: 100%
    overflow: hidden
    .overview
      padding: 18px 0
      display: flex
      .overviewLeft
        flex: 0 0 137px
        width: 137px
        text-align: center
        border-right: 1px solid rgba(7, 17, 27, 0.1)
        .score
          margin-bottom: 6px
          font-size: 24px
          line-height: 28px
          color: rgb(255, 153, 0)
        .title
          margin-bottom: 8px
          font-size: 12px
          line-height: 12px
          color: rgb(7, 17, 27)
        .rank
          margin-bottom: 6px
          font-size: 10px
          line-height: 10px
          color: rgb(147, 153, 159)
      .overviewRight
        flex: 1
        padding: 2px 0 0 24px
        .scoreWrapper
          margin-bottom: 8px
          &:last-child
            margin-bottom: 0
          .title
            margin-right: 12px
            font-size: 12px
            line-height: 16px
            color: rgb(7, 17, 27)
          .score
            margin-left: 12px
            font-size: 12px
            line-height: 16px
            color: rgb(255, 153, 0)
          .desc
            font-size: 12px
            color: rgb(147, 153, 159)
            line-height: 16px
    .ratingWrapper
      padding: 0 18px
</style>
