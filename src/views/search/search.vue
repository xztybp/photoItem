<template>
  <div class="search">
    <!-- 搜索 -->
    <van-search
      :value="value"
      @input="thinkSearch"
      placeholder="请输入搜索关键词"
      show-action
      shape="round"
      @search="onSearch"
      @clear="onCancel "
      class="header"
      background="#0094ff"
    >
      <div slot="action" @click="onSearch(value)" class="reset">搜索</div>
    </van-search>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in ArticleSearchList" :key="index">
        <template slot="default">
          <div class="authorMsg">
            <van-image width="40" height="40" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="aut">
              <h5>{{item.aut_name}}</h5>
              <span class="time">{{item.pubdate | yearTimeFilter}}</span>
            </div>
          </div>
          <van-cell :title="item.title" />
          <div class="imgList" v-if="item.cover.images.length>0">
            <van-image
              width="100"
              height="100"
              :src="item"
              v-for="(item,index) in item.cover.images"
              :key="index"
            >
              <template v-slot:error>加载失败</template>
            </van-image>
          </div>
          <div class="icon">
            <van-cell :title="item.comm_count" icon="chat-o" :border="false" />
            <van-cell :title="item.collect_count" icon="good-job-o" :border="false" />
            <van-cell :title="item.like_count" icon="star-o" :border="false" />
          </div>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { getArticleSearchList } from '@/api/user.js'
export default {
  data () {
    return {
      page: 0,
      value: this.$route.params.value,
      loading: false,
      finished: false,
      ArticleSearchList: [],
      totalcount: ''
    }
  },
  methods: {
    thinkSearch () {},
    onSearch () {},
    onCancel () {},
    /* 滚动时发送请求 */
    async onLoad () {
      if (!this.value) {
        return
      }
      this.page++
      try {
        let res = await getArticleSearchList(this.$http, this.page, this.value)
        console.log(res)
        /* 保存数据源 */
        this.ArticleSearchList = [...this.ArticleSearchList, ...res.results]
        /* 数据的总条数 */
        this.totalcount = res.total_count
        if (this.totalcount === this.ArticleSearchList.length) {
          this.finished = true
        }
        this.loading = false
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
div.search {
  div.authorMsg {
    display: flex;
    align-items: center;
    .aut {
      margin-left: 8px;
      h5 {
        margin: 0;
        line-height: 16px;
      }
      .time {
        font-size: 12px;
        line-height: 12px;
      }
    }
  }
  div.imgList {
    display: flex;
    justify-content: space-between;
  }
  div.icon /deep/ {
    display: flex;
    i.van-icon {
      font-size: 20px;
    }
  }
}
</style>
