<template>
  <div class="container">
     <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in informationBanner" :style="{ backgroundImage: 'url(' + item.image + ')' }" :key="item.image"></div>
        </div>
        <div class="swiper-pagination swiper-pagination-white"></div>
    </div>
    <div class="news-wrap">
      <news-item v-for="item of information" :news="item" :key="item.newsid"></news-item>
    </div>
    <div class="nomore">只给看这么多</div>
  </div>
</template>

<script>
import {
  getInfoList
} from '@/api/api'
import newsItem from '@/components/news-item'

import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

// const uiti = global.uiti

export default {
  data () {
    return {
      page: 1,
      hasMore: true,
      information: [],
      informationBanner: [],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination'
        }
      },
      listImg: [{
        url: 'http://fq-img.cnicchina.com/FsL8oTxUgYOzT-o1x1urBkYIztl5'
      }, {
        url: 'http://fq-img.cnicchina.com/Frnk8tEOq0rUEJsNyZEXE9_OLjRQ'
      }]
    }
  },
  created () {
    // console.log(uiti.formatTime('2018-04-03'))
  },
  components: {
    newsItem
  },

  computed: {},

  mounted () {
    var swiper = new Swiper('.swiper-container', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      loop: true,
      speed: 600,
      autoplay: 1000,
      onTouchEnd: function () {
        swiper.startAutoplay()
      }
    })
    this.getInfoList()
  },

  methods: {
    async getInfoList () {
      if (!this.hasMore) return

      let data = await getInfoList({
        page: this.page++
      })
      //  轮播图
      if (data.data.informationBanner.length) {
        this.informationBanner = data.data.informationBanner
      }
      // 资讯列表
      if (data.data.information.items.length) {
        this.information.push.apply(this.information, data.data.information.items)
      } else {
        this.hasMore = false
      }
    }
  },

  async onPullDownRefresh () { // 下拉刷新
    this.page = 1
    this.information = []
    this.hasMore = true
    await this.getNewsList()
  },

  onReachBottom () { // 上拉加载
    this.getNewsList()
  },

  onUnload () { // 清空状态
    this.page = 1
    this.information = []
    this.hasMore = true
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  width: 100%;
  height: 10rem;
  .swiper-wrapper {
    width: 100%;
    height: 100%;
  }
  .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .swiper-pagination-bullet {
    width: 0.833rem;
    height: 0.833rem;
    display: inline-block;
    background: #7c5e53;
  }
}
.news-wrap {
  padding: 0 10px;
}

.nomore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  font-size: 14px;
  color: #ccc;
}
</style>
