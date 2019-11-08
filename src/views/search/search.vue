<template>
  <div class="search">
    <!-- 搜索 -->
    <van-search
      :value="value"
      @input="Onsearch"
      show-action
      shape="round"
      class="header"
      @clear="onclear"
      @search="searchWord"
      background="#0094ff"
    >
      <div slot="action" class="reset" @click="searchWord">搜索</div>
    </van-search>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      class="searchList"
    >
      <van-cell
        v-for="(item,index) in ArticleSearchList"
        :key="index"
        @click="articleDetails(item.art_id)"
      >
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
            <van-cell
              :title="item.comm_count"
              icon="chat-o"
              @click.stop="comment(item.art_id)"
              :border="false"
            />
            <van-cell
              :title="item.collect_count"
              icon="good-job-o"
              @click.stop="easeLike(item.art_id)"
              :border="false"
            />
            <van-cell
              :title="item.like_count"
              icon="star-o"
              @click.stop="isStart(item.art_id)"
              :border="false"
            />
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
      value: '',
      loading: false,
      finished: false,
      ArticleSearchList: [],
      totalcount: '',
      i: ''
    }
  },
  methods: {
    /* 点击清除按钮直接跳转到搜索页面 */
    onclear () {
      this.$router.push({ name: 'Layout1' })
    },
    /* 监听输入框的值是否为空 */
    Onsearch (value) {
      this.value = value
      if (!this.value) {
        this.$router.push('/home/layout1')
      }
    },
    async searchWord () {
      this.page = 1
      let res = await getArticleSearchList(this.$http, this.page, this.value)
      this.ArticleSearchList = res.results
    },
    /* 滚动时发送请求 */
    async onLoad () {
      if (!this.value) {
        return
      }
      this.page++
      try {
        let res = await getArticleSearchList(this.$http, this.page, this.value)
        /* console.log(res) */
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
    },
    /* 评论操作 */
    comment (id) {
      let user = this.$login()
      if (user) {
        this.$router.push({
          path: '/articleDetails',
          name: 'articleDetails',
          params: { art_id: id, value: this.value }
        })
      }
    },
    /* 点赞操作 */
    async easeLike () {
      this.$login()
    },
    /* 收藏操作 */
    isStart () {
      this.$login()
    },
    // 点击文章跳转
    articleDetails (id) {
      this.$router.push({
        path: '/articleDetails',
        name: 'articleDetails',
        params: { art_id: id, value: this.value }
      })
    }
  },
  created () {
    this.value = this.$store.state.search
  }
}
</script>

<style lang="less" scoped>
div.search {
  margin-top: 54px;
  .header {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
  }
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
  .like {
    color: red;
  }
}
</style>
