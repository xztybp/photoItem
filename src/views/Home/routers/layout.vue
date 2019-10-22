<template>
  <div class="layout">
    <van-search v-model="value" shape="round" @search="onSearch" background="#3296fa"></van-search>
    <van-tabs>
      <van-tab v-for="item in navList" :title="item.name" :key="item.id" class="nav-tab">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in list" :key="item">
              <van-panel :title="item" desc="描述信息">
                <div>内容</div>
              </van-panel>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <van-icon name="wap-nav" />
  </div>
</template>
<script>
import { layoutNavList } from '@/api/user.js'
export default {
  data () {
    return {
      value: '',
      loading: false,
      isLoading: false,
      finished: false,
      list: [],
      navList: []
    }
  },
  methods: {
    onSearch () {},
    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= 70) {
          this.finished = true
        }
      }, 500)
      /* console.log(this.loading) */
    },
    onRefresh () {
      setTimeout(() => {
        this.isLoading = false
      }, 1000)
    },
    // 获取导航栏信息
    async getNavList () {
      try {
        let res = await layoutNavList(this.$http, {
          url: 'user/channels',
          method: 'GET'
        })
        this.navList = res.data.data.channels
        /* console.log(res)
        console.log(this.navList) */
      } catch (error) {
        console.log(error)
      }
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
  .van-tabs__wrap.van-tabs__wrap--scrollable.van-hairline--top-bottom {
    width: 90%;
    position: fixed;
    z-index: 1;
    top: 80px;
  }
  .van-list {
    .van-cell:nth-child(even) {
      background-color: red;
    }
  }
}
i.van-icon.van-icon-wap-nav {
  position: fixed;
  top: 80px;
  right: 0;
  width: 10%;
  height: 42px;
  border-bottom: 1px solid #fff;
  text-align: center;
  line-height: 44px;
  font-size: 24px;
  z-index: 1000;
  background-color: #fff; // 此处需给字体设置背景色
}
</style>
