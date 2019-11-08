<template>
  <div class="home">
    <router-view></router-view>
    <van-tabbar route v-show="flag">
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
      active: '',
      /* 获取设备实际高度 */
      documentHeight: document.documentElement.clientHeight,
      dynamicHeight: document.documentElement.clientHeight,
      flag: true
    }
  },
  mounted () {
    /* 当视口区尺寸发生变化时执行 */
    window.onresize = () => {
      return (() => {
        this.dynamicHeight = window.document.body.clientHeight
      })()
    }
  },
  /* 监听动态高度 */
  watch: {
    dynamicHeight () {
      console.log(this.documentHeight)
      console.log(this.dynamicHeight)
      if (this.documentHeight > this.dynamicHeight) {
        this.flag = false
      } else {
        this.flag = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
div.home {
  i.iconfont {
    font-size: 30px;
  }
}
</style>
