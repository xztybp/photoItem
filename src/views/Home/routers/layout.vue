<template>
  <div class="layout">
    <!--  <van-search v-model="value" shape="round" @search="onSearch" background="#3296fa"></van-search> -->
    <van-nav-bar title="首页" />
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in navList" :title="item.name" :key="index" class="nav-tab">
        <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
          <van-list
            v-model="item.up"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(articleItem,i) in item.article" :key="i">
              <template slot="default">
                <div class="title">{{articleItem.title}}</div>
                <div class="img">
                  <div class="imgList" v-for="(imgList,j) in articleItem.cover.images" :key="j">
                    <van-image
                      width="100"
                      height="100"
                      :src="imgList"
                      lazy-load
                      v-if="imgList.length>0"
                    />
                  </div>
                </div>
                <div class="btn-memo">
                  <span :style="{color:'red'}">{{articleItem.is_top | IstopFilter(i)}}</span>
                  <span>{{articleItem.aut_name}}</span>
                  <span>{{articleItem.comm_count}}评论</span>
                  <span>{{articleItem.pubdate | timeFilter}}</span>
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-icon name="wap-nav" @click="show=true" />
    <channel
      v-model="show"
      :navList="navList"
      :active="active"
      @update:active="(event)=>{active=event}"
    ></channel>
    <!--  @update:active="acrive=$event" 也可以 或者:active.sync="active" 利用修饰符也行 都能实现子传父 -->
  </div>
</template>
<script>
import { layoutNavList, articleList } from '@/api/user.js'
import channel from '@/components/channel.vue'
export default {
  data () {
    return {
      value: '',
      active: 0,
      navList: [],
      timestamp: '',
      show: false
    }
  },
  methods: {
    onSearch () {},
    // 上拉刷新
    async onLoad () {
      // 获取文章数据
      let navList = this.navList[this.active]
      let navListId = this.navList[this.active].id
      try {
        let res = await articleList(this.$http1, {
          url: 'articles',
          method: 'GET',
          params: {
            channel_id: navListId,
            timestamp: !navList.article.length ? Date.now() : this.timestamp, // 得到当前时间戳
            with_top: this.active === 0 ? 1 : 0
          }
        })
        // 展开运算符
        console.log(res)
        navList.article = [...navList.article, ...res.results]
        this.timestamp = res.pre_timestamp
        navList.up = false // 将加载状态重置
        // 如果返回的文章为空 则将finished设置为触底状态
        if (!res.results.length) {
          navList.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 下拉刷新
    onRefresh () {
      let navList = this.navList[this.active]
      navList.article = []
      navList.up = false
      navList.finished = false
      this.onLoad()
      this.$toast('刷新成功')
      // 将下拉状态重置为 false
      navList.pull = false
    },
    // 获取导航栏信息
    async getNavList () {
      try {
        // 判断用户是否登录
        let user = this.$store.state.userInfo
        // 用户未登录 未携带token
        if (!user) {
          let navList = JSON.parse(window.localStorage.getItem('navlist'))
          if (navList) {
            this.navList = navList
          } else {
            let res = await layoutNavList(this.$http, {
              url: 'user/channels',
              method: 'GET'
            })
            this.navList = res.channels
          }
        } else {
          // 用户有登录 即携带token
          let res = await layoutNavList(this.$http, {
            url: 'user/channels',
            method: 'GET'
          })
          this.navList = res.channels
        }
        // 判断完成调用添加属性方法
        this.addAttrNavlist()
      } catch (error) {
        console.log(error)
      }
    },
    // 给顶部导航栏添加动态属性: 注意 只有定义在data中的数据才支持响应式,所以需要用到this.$set方法
    addAttrNavlist () {
      this.navList.some(item => {
        this.$set(item, 'pull', false)
        this.$set(item, 'up', false)
        this.$set(item, 'finished', false)
        this.$set(item, 'article', [])
      })
      console.log(this.navList)
    }
  },
  filters: {
    IstopFilter (value, i) {
      if (i <= 4) {
        return '置顶'
      }
    }
  },
  created () {
    this.getNavList()
    console.log(this)
  },
  components: {
    channel
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar.van-hairline--bottom {
  background-color: #0094ff;
  top: 0;
  width: 100%;
  position: fixed;
}
/* div.layout /deep/ .van-search {
  height: 80px;
  top: 0;
  position: fixed;
  width: 100%;
  z-index: 999;

  .van-search__content.van-search__content--round {
    background-color: #5babfb;
    i.van-icon.van-icon-search {
      position: absolute;
      font-size: 24px;
      left: 50%;
      transform: translateX(-50%);
      vertical-align: middle;
      height: 100%;
      color: #fff;
      &::after {
        content: '搜索';
        font-size: 16px;
        position: relative;
        top: -8px;
      }
    }
  }
} */
div.layout /deep/ .van-tabs.van-tabs--line {
  margin-bottom: 50px;
  margin-top: 90px;
  position: relative;
  width: 100%;
  overflow: hidden;
  .van-tabs__wrap.van-hairline--top-bottom {
    width: 90%;
    position: fixed;
    z-index: 1;
    top: 46px;
  }
  .van-list {
    .van-cell:nth-child(even) {
      background-color: rgb(238, 238, 245);
    }
  }
}
i.van-icon.van-icon-wap-nav {
  position: fixed;
  top: 46px;
  right: 0;
  width: 10%;
  height: 44px;
  text-align: center;
  line-height: 44px;
  border-bottom: 0.5px solid #ebedf0;
  font-size: 24px;
  z-index: 1000;
  background-color: #fff; // 此处需给字体设置背景色
}
.img {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 16px;
  font-weight: 700;
}
.btn-memo {
  span {
    margin-right: 10px;
  }
}
</style>
