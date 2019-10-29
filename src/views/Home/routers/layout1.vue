<template>
  <div class="search">
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
    <!-- 联想操作 -->
    <van-cell-group v-if="thinkList.length>0">
      <van-cell
        icon="search"
        v-for="(item,index) in thinkList"
        :key="index"
        @click="onSearch(item.item)"
      >
        <template solt="title">
          <span v-html="item.itemColor"></span>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <van-icon
          slot="right-icon"
          name="delete"
          style="line-height: inherit;"
          v-if="flag"
          @click="flag=false"
        />
        <template slot="default" v-else>
          <span class="history" @click="delAllHistory">清空历史</span>
          <span class="history" @click.stop="flag=true">完成</span>
        </template>
      </van-cell>
      <!-- 历史信息 -->
      <van-cell
        :title="item"
        icon="clock-o"
        v-for="(item,index) in historyList"
        :key="index"
        @click="onSearch(item)"
      >
        <van-icon
          slot="right-icon"
          name="cross"
          style="line-height: inherit;"
          v-show="!flag"
          @click.stop="delHistory(index)"
        />
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import { getThinkList } from '@/api/user.js'
export default {
  data () {
    return {
      value: '',
      timer: '',
      thinkList: [],
      flag: true,
      historyList: JSON.parse(localStorage.getItem('history')) || []
    }
  },
  methods: {
    /* 执行时机: 输入完成确认后触发 */
    onSearch (value) {
      if (!value.trim()) {
        this.$toast('你输入的内容为空')
        return
      }
      /* 从头部存入输入数据记录 */
      this.historyList.unshift(value)
      /* 注意  此处历史记录必须去重 */
      this.historyList = [...new Set(this.historyList)]
      /* 保存在本地磁盘中 */
      localStorage.setItem('history', JSON.stringify(this.historyList))
      /* 跳转到搜索页面 */
      this.$router.push({ name: 'search', params: { value: value } })
    },
    // 点击后清空列表与输入框的值
    onCancel (value) {
      this.value = ''
      this.thinkList = []
    },
    /* 执行时机: 输入框的值发生改变时触发 */
    thinkSearch (value) {
      this.value = value
      /* 由于此处存在JS抖动问题,所以需要进行防抖操作 */
      // 必须先清除定时器
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        // 判断输入值是否为空,如果为空,直接return
        if (!value.trim()) {
          return
        }
        let res = await getThinkList(this.$http, {
          url: `suggestion?q=${value}`,
          method: 'get'
        })
        this.thinkList = res.options.map(item => {
          return {
            itemColor: item
              .split(value) // 数组方法,将字符串分割成数组
              .join(`<span style="color: red">${value}</span>`), // 字符串方法 ,将数组拼接成字符串
            item: item
          }
        })
        console.log(this.thinkList)
      }, 500)
    },
    /* 删除历史记录 */
    delHistory (index) {
      console.log(index)
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认删除'
        })
        .then(() => {
          this.historyList.splice(index, 1)
          localStorage.setItem('history', JSON.stringify(this.historyList))
          this.$toast('删除成功')
        })
    },
    /* 删除全部历史记录 */
    delAllHistory () {
      if (!this.historyList.length) {
        this.$toast('你的历史记录为空')
        return
      }
      console.log(this.historyList)
      this.$dialog
        .confirm({
          title: '温馨提示',
          message: '是否确认删除全部历史记录'
        })
        .then(() => {
          this.historyList = []
          localStorage.removeItem('history')
          this.$toast('删除成功')
          this.flag = true
        })
    }
  },
  watch: {
    /* 监听输入框的值是否为空,若为空,则清空联想列表 */
    value () {
      if (!this.value) {
        this.thinkList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
div.search {
  .van-search__action:active {
    background-color: #0094ff;
    color: black;
  }
  .reset {
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
  span.history {
    cursor: pointer;
    color: blue;
    margin-left: 10px;
    font-size: 12px;
  }
}
</style>
