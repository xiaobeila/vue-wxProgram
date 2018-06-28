<template>
  <div class="content-wrap">
    <h3 class="info-title">{{detail.title}}</h3>
    <div class="author">
      <span>作者：橙诺咨询</span>
      <span style="margin-left: 20px;">{{detail.publishAt}}</span>
    </div>
    <div class="info-content">
      <div v-html="detail.content"></div>
    </div>
  </div>
</template>

<script>
import { getDetail } from '@/api/api'
export default {
  data () {
    return {
      detail: []
    }
  },
  mounted () {
    this.getDetail()
  },
  methods: {
    async getDetail () {
      let data = await getDetail({
        id: this.$route.params.id
      })
      if (JSON.stringify(data.data) !== '{}') {
        this.detail = data.data
      }
    }
  }
}
</script>

<style scoped>
/*详情*/
.content-wrap {
  width: 100%;
  background: #fff;
  box-sizing: border-box;
  padding: 15px 15px 0px 15px;
  display: flex;
  flex-direction: column;
}

.info-title {
  width: 100%;
  font-size: 16px;
  color: #333;
  height: auto;
  overflow: hidden;
}

.author {
  display: inline-block;
  vertical-align: middle;
  color: #999;
  font-size: 14px;
  flex: 1;
}

.info-content {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  letter-spacing: 2px;
  font-size: 12px;
  color: #666;
  margin-bottom: 50px;
}

.info-content >>> img {
  max-width: 100% !important;
  align-items: center;
}
</style>
