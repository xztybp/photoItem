<template>
  <div class="replyComment">
    <van-popup
      :value="isShow"
      @input="$emit('input',false)"
      position="bottom"
      :style="{ height: '70%' ,marginBottom:'44px'}"
    >
      <van-cell value="当前评论 :" />
      <comment :itemobj="itemobj"></comment>
      <van-cell value="评论回复 :" v-if="replyCommentList.length>0" />
      <van-cell v-for="(item,index) in replyCommentList" :key="index">
        <template slot="default">
          <!-- 生成评论回复组件 -->
          <comment :itemobj="item" :isOk="true"></comment>
        </template>
      </van-cell>
      <addComment
        :comid="comid"
        :replyCommentList="replyCommentList"
        :artid="artid"
        @getComment="refreshComment"
      ></addComment>
    </van-popup>
  </div>
</template>

<script>
import { getCommentsList } from '@/api/user'
import addComment from '@/components/addComment'
import comment from '@/components/comment'
import bus from '@/assets/bus'
export default {
  /* 修改传入变量属性名 */
  model: {
    prop: 'isShow',
    event: 'input'
  },
  props: ['isShow', 'artid'],
  data () {
    return {
      itemobj: null,
      comid: '',
      replyCommentList: []
    }
  },
  components: {
    addComment,
    comment
  },
  methods: {
    async getComment () {
      let id = this.comid.toString()
      console.log(this.itemobj)
      let res = await getCommentsList(this.$http, 'c', id)
      console.log(res)
      this.replyCommentList = res.results
    },
    refreshComment () {
      console.log('1112222222222')
      this.getComment()
      console.log('3333333333333333333')
    }
  },
  /* 数据初始完后请求数据 */
  created () {
    bus.$on('bus1', value => {
      this.itemobj = value
      this.comid = value.com_id
      window.console.log(this.itemobj)
      /* 每次兄弟传参即调用 */
      this.getComment()
    })
  }
}
</script>

<style>
</style>
