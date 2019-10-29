<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item to="/home">
        首页
        <template slot="icon">
          <i class="iconfont icon-shouye"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/layout1" icon="search">
        问答
        <template slot="icon">
          <i class="iconfont icon-xiaoxi"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/layout2" icon="friends-o">
        视频
        <template slot="icon">
          <i class="iconfont icon-shipin"></i>
        </template>
      </van-tabbar-item>
      <van-tabbar-item to="/home/layout3" icon="setting-o">
        我的
        <template slot="icon">
          <i class="iconfont icon-xiazai"></i>
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: ''
    }
  }
  /*   methods: {
    del () {
      this.$http({
        url: `user/blacklists/2`,
        method: 'DELETE'
      }).then(res => {
        console.log(res)
      })
    }
  }, */
  /*   created () {
    this.del()
  } */
}
</script>

<style lang="less" scoped>
div.home {
  i.iconfont {
    font-size: 30px;
  }
}
</style>
