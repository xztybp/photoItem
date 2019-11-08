<template>
  <div class="articleDetails">
    <van-row type="flex" justify="center" class="header">
      <van-col span="6">文章详情</van-col>
    </van-row>
    <van-cell v-for="(item,index) in articleDetailsList" :key="index">
      <template slot="default">
        <van-cell :title="item.title" title-class="title"></van-cell>
        <div class="authorMsg">
          <van-image width="40" height="40" round :src="item.aut_photo" />
          <div class="aut">
            <h5>{{item.aut_name}}</h5>
            <span class="time">{{item.pubdate | yearTimeFilter}}</span>
          </div>
          <div class="isLick">
            <van-button
              round
              :type="item.is_followed? 'warning':'info'"
              icon="plus"
              @click="isFollowed(item.is_followed,item.aut_id)"
            >{{item.is_followed? '取消关注':'关注'}}</van-button>
          </div>
        </div>
        <div v-html="item.content"></div>
        <div class="icon">
          <div class="isLike">
            <van-cell
              title="点赞"
              icon="good-job"
              @click="easeLike(item.attitude,item.art_id)"
              :border="false"
              :class="[item.attitude===1? 'bgc' :'']"
            />
          </div>
          <div class="isStart">
            <van-cell
              title="收藏"
              icon="star"
              @click="isStart(item.is_collected,item.art_id)"
              :border="false"
              :class="[item.is_collected? 'bgc' :'']"
            />
          </div>
        </div>
      </template>
    </van-cell>
    <!-- 评论列表 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item,index) in commentList" :key="index">
        <template slot="default">
          <!-- 生成评论组件 -->
          <comment :itemobj="item" @input="isShow=$event" :isOk="flag"></comment>
        </template>
      </van-cell>
    </van-list>
    <!-- 写评论 -->
    <addComment :commentList="commentList" :artid="this.$route.params.art_id" :isOk="flag"></addComment>
    <!-- 评论回复 -->
    <replyComment v-model="isShow" :artid="this.$route.params.art_id"></replyComment>
  </div>
</template>

<script>
import {
  getarticleDetailsList,
  getCommentsList,
  Followed,
  deleteFollowed,
  apieaseLike,
  deleteApieaseLike,
  collectionsApi,
  deleteCollectionsApi
} from '@/api/user.js'
import addComment from '@/components/addComment'
import comment from '@/components/comment'
import replyComment from '@/components/replyComment'
export default {
  data () {
    return {
      articleDetailsList: [],
      commentList: [],
      loading: false,
      finished: false,
      show: true,
      endid: '',
      lastid: '',
      offset: this.offset || undefined,
      /* 控制评论面板显示与隐藏 */
      isShow: false,
      /* 控制回复按钮显示与隐藏 */
      flag: true
    }
  },
  methods: {
    // 获取文章详情页面
    async getarticleDetails () {
      try {
        let res = await getarticleDetailsList(
          this.$http,
          this.$route.params.art_id
        )
        console.log(res)
        this.articleDetailsList.push(res)
        console.log(this.articleDetailsList)
      } catch (error) {
        console.log(error)
      }
    },
    async onLoad () {
      let res = await getCommentsList(
        this.$http,
        'a',
        this.$route.params.art_id,
        this.offset
      )
      console.log(res)
      this.commentList = [...this.commentList, ...res.results]
      /* 偏移量 下一个请求所获取的id */
      this.offset = res.last_id
      /* 结束时的评论列表ID */
      this.endid = res.end_id
      if (this.offset === this.endid) {
        this.finished = true
      }
      this.loading = false
    },
    // 是否关注
    async isFollowed (followed, autid) {
      if (followed) {
        this.$dialog
          .confirm({
            message: '确定取消关注吗？'
          })
          .then(async () => {
            let res = await deleteFollowed(this.$http, autid)
            if (!res) {
              this.articleDetailsList[0].is_followed = false
            }
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        let res = await Followed(this.$http, autid)
        console.log(res)
        if (res.target) {
          this.articleDetailsList[0].is_followed = true
        }
      }
    },
    // 点赞
    async easeLike (attitude, id) {
      if (attitude !== 1) {
        let res = await apieaseLike(this.$http, id)
        if (res.target) {
          this.articleDetailsList[0].attitude = 1
        }
      } else {
        let res = await deleteApieaseLike(this.$http, id)
        if (!res) {
          this.articleDetailsList[0].attitude = 0
        }
      }
    },
    // 收藏
    async isStart (collections, id) {
      if (collections) {
        let res = await deleteCollectionsApi(this.$http, id)
        if (!res) {
          this.articleDetailsList[0].is_collected = false
        }
      } else {
        let res = await collectionsApi(this.$http, id)
        if (res.target) {
          this.articleDetailsList[0].is_collected = true
        }
        console.log(res)
      }
    }
  },
  components: {
    addComment,
    comment,
    replyComment
  },
  watch: {
    $route () {
      console.log('aaaaaa')
      this.$router.push({
        path: '/search',
        name: 'search',
        params: { value: this.$route.params.value }
      })
    }
  },
  created () {
    this.getarticleDetails()
    console.log(this.$route)
    console.log(this.$router)
    console.log(location)
  }
}
</script>

<style lang="less" scoped>
div.articleDetails {
  margin-bottom: 44px;
  .header {
    height: 40px;
    background-color: #0094ff;
    color: #fff;
    font-weight: 500;
    align-items: center;
  }
  .van-cell {
    padding: 10px 4px;
    .title {
      font-size: 18px;
      color: black;
      font-weight: 700;
    }
    div.authorMsg {
      display: flex;
      align-items: center;
      position: relative;
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
      .isLick /deep/ {
        position: absolute;
        right: 5px;
        height: 100%;
        width: 20%;
        button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: 28px;
          line-height: 28px;
          clear: #fff;
          padding: 0;
        }
        .van-button--normal {
          font-size: 12px;
        }
      }
    }
  }
  div.icon /deep/ {
    display: flex;
    text-align: center;
    justify-content: space-between;
    padding: 0 20px;
    .van-cell.van-cell--borderless {
      padding: 5px 15px;
      border: 1px solid red;
      border-radius: 22px;
    }
    .van-icon {
      font-size: 20px;
    }
  }
  .like {
    color: red;
  }
  .van-cell__label {
    color: black;
  }
  .bgc {
    color: red;
  }
}
</style>
