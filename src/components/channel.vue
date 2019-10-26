<template>
  <div class="channel">
    <!-- 作用：将一个数据双向绑定到一个子组件中 -->
    <!-- - 会默认给子组件入一个名为 value 的参数
- 会默认给子组件绑定一个名为 input 的事件
    -->
    <van-popup
      :value="value"
      @input="$emit('input',false)"
      closeable
      close-icon="cross"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '80%' }"
    >
      <van-cell title="我的频道" title-class="btnFont">
        <template slot="default">
          <van-button plain type="warning" round size="small" v-if="flag" @click="flag=false">编辑</van-button>
          <van-button plain type="warning" round size="small" v-else @click="flag=true">完成</van-button>
        </template>
      </van-cell>
      <van-grid :column-num="3" :border="false">
        <van-grid-item text="文字" v-for="(item,index) in navList" :key="index" class="myColumn">
          <template slot="text">
            <div class="myDefault">
              <div
                :class="{mytext:true,activeColor:index===active}"
                @click="$emit('update:active',index)"
              >{{item.name}}</div>
              <!-- 让推荐不被选中 -->
              <van-icon
                name="clear"
                v-show="!flag&&index!==0"
                class="myIcon"
                @click.stop="DelNavList(index)"
              />
            </div>
          </template>
        </van-grid-item>
      </van-grid>
      <van-cell title="频道推荐" title-class="btnFont"></van-cell>
      <van-grid :column-num="3" :border="false">
        <van-grid-item v-for="(item,index) in otherChannelList" :key="index" class="myColumn">
          <template slot="text">
            <div class="myAdd">
              <transition>
                <div class="mytext" @click="addNavList(item)" v-show="true">
                  <van-icon name="plus" class="myAddIcon" />
                  {{ item.name}}
                </div>
              </transition>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script>
import { allChannel, bulkEditingChannel } from '@/api/user.js'
export default {
  data () {
    return {
      flag: true,
      ALLChannel: []
    }
  },
  props: ['value', 'navList', 'active'],
  methods: {
    // 获取全部文章列表
    async getAllChannel () {
      let res = await allChannel(this.$http, {
        url: 'channels',
        method: 'GET'
      })
      console.log(res)
      this.ALLChannel = res.channels
    },
    // 用户登录后重置频道数据方法
    async resetChannel () {
      let newChannelList = this.navList.slice(1).map((item, index) => {
        return { id: item.id, seq: index + 2 }
      })
      let res = await bulkEditingChannel(this.$http, {
        url: 'user/channels',
        method: 'PUT',
        data: {
          channels: newChannelList
        }
      })
      console.log(res)
      console.log(newChannelList)
    },
    // 点击删除频道方法
    DelNavList (index) {
      this.navList.splice(index, 1)
      let user = this.$store.state.userInfo
      // 判断用户是否登录
      if (!user) {
        window.localStorage.setItem(
          'navlist',
          JSON.stringify(this.navList)
        ) /* 注意 此处保存的一定是JSON格式的字符串 */
      } else {
        /* 登录过 */
        this.resetChannel()
      }
    },
    // 添加用户频道列表
    addNavList (item) {
      this.navList.push(item)
      let user = this.$store.state.userInfo
      // 判断用户是否登录
      if (!user) {
        window.localStorage.setItem(
          'navlist',
          JSON.stringify(this.navList)
        ) /* 注意 此处保存的一定是JSON格式的字符串 */
      } else {
        this.navList.some(item => {
          this.$set(item, 'pull', false)
          this.$set(item, 'up', false)
          this.$set(item, 'finished', false)
          this.$set(item, 'article', [])
        })
        this.resetChannel()
      }
    }
  },
  computed: {
    /* 计算属性的本质其实是一个方法,在使用的时候将计算属性当做属性去使用,一定不能加()去调用,只要函数内部使用到的data数据发生改变就会重新计算 */
    otherChannelList () {
      /* 此方法返回数组中的每一项形成新的数组 */
      let idList = this.navList.map(item => {
        return item.id
      })
      /* 此方法会过滤掉所有符合条件的数据 返回符合条件的新数组 */
      return this.ALLChannel.filter(item => {
        return !idList.includes(item.id)
      })
    }
  },
  created () {
    this.getAllChannel()
  }
}
</script>

<style lang="less" scoped>
div.channel {
  .van-popup.van-popup--bottom {
    padding-top: 40px;
    .btnFont {
      font-size: 18px;
    }
  }
  .myColumn /deep/ .van-grid-item__content {
    padding: 8px;
    border: none;
  }
  .myColumn {
    position: relative;
    border: 1px solid #fff;
    .myDefault {
      width: 100%;
      text-align: center;
      background-color: #eee;
      .myIcon {
        position: absolute;
        top: 0;
        right: 0;
        color: #aaa;
        font-size: 20px;
      }
    }
  }
  .mytext {
    font-size: 12px;
    padding: 10px 0;
    color: black;
  }
  .activeColor {
    color: red;
  }
  .myAdd {
    width: 100%;
    text-align: center;
    background-color: rgb(245, 236, 236);
    position: relative;
    .myAddIcon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .v-enter,
  .v-leave-to {
    opacity: 0;
  }
  .v-leave-active,
  .v-enter-active {
    transition: all 0.4s ease;
  }
}
</style>
