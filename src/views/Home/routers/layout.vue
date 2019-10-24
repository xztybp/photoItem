<template>
  <div class="layout">
    <van-search v-model="value" shape="round" @search="onSearch" background="#3296fa"></van-search>
    <van-tabs v-model="active">
      <van-tab v-for="(item,index) in navList" :title="item.name" :key="index" class="nav-tab">
        <van-pull-refresh v-model="item.pull" @refresh="onRefresh">
          <van-list
            v-model="item.up"
            :finished="item.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="(articleItem,i) in item.article" :key="i" :title="articleItem.title"></van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-icon name="wap-nav" />
  </div>
</template>
<script>
import { layoutNavList, articleList } from '@/api/user.js'
export default {
  data () {
    return {
      value: '',
      active: 0,
      navList: [],
      timestamp: ''
    }
  },
  methods: {
    onSearch () {},
    // 下拉刷新
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
    // 上拉刷新
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
  created () {
    this.getNavList()
  }
}
</script>

<style lang="less" scoped>
div.layout /deep/ .van-search {
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
}
div.layout /deep/ .van-tabs.van-tabs--line {
  margin-bottom: 50px;
  margin-top: 124px;
  position: relative;
  width: 100%;
  overflow: hidden;
  .van-tabs__wrap.van-hairline--top-bottom {
    width: 90%;
    position: fixed;
    z-index: 1;
    top: 80px;
  }
  .van-list {
    .van-cell:nth-child(even) {
      background-color: #dbd3d3;
    }
  }
}
i.van-icon.van-icon-wap-nav {
  position: fixed;
  top: 80px;
  right: 0;
  width: 10%;
  height: 43px;
  border-bottom: 1px solid #fff;
  text-align: center;
  line-height: 43px;
  border-bottom: 1px solid #fff;
  font-size: 24px;
  z-index: 1000;
  background-color: #fff; // 此处需给字体设置背景色
}
</style>
