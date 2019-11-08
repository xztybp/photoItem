<template>
  <div class="addComment">
    <van-cell-group class="footer">
      <van-field placeholder="写评论..." left-icon="edit" class="inputContent" @focus="show=true" />
    </van-cell-group>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }" class="message">
      <van-cell-group>
        <van-field
          v-model.trim="message"
          rows="1"
          autosize
          label="评论"
          type="textarea"
          maxlength="100"
          placeholder="请输入评论"
          show-word-limit
          @keyup.enter="sendMsg"
          v-focus
        />
      </van-cell-group>
      <van-button type="primary" size="small" class="send" @click="sendMsg">发送</van-button>
    </van-popup>
  </div>
</template>

<script>
import { addComments } from '@/api/user.js'
export default {
  data () {
    return {
      message: '',
      show: false
    }
  },
  props: ['commentList', 'artid', 'isOk', 'replyCommentList', 'comid'],
  directives: {
    focus: {
      inserted: function (el) {
        el.focus()
      }
    }
  },
  methods: {
    async sendMsg () {
      if (!this.message) {
        this.$toast('评论内容不能为空')
      } else {
        if (this.isOk) {
          let res = await addComments(this.$http, {
            target: this.artid,
            content: this.message
          })
          console.log(res)
          console.log(this.$emit('getComment'))
          this.commentList.unshift(res.new_obj)
        } else {
          let res = await addComments(this.$http, {
            target: this.comid.toString(),
            content: this.message,
            artid: this.artid
          })
          console.log(res)
          this.replyCommentList.unshift(res.new_obj)
          this.$emit('getComment')
        }
        /* 清空留言框中输入值 */
        this.message = ''
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
div.addComment {
  position: fixed;
  bottom: 0;
  left: 0px;
  right: 0px;
  div.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 44px;
    .inputContent {
      border-radius: 22px;
      height: 30px;
      line-height: 30px;
      padding: 0;
      margin: 0 5px;
      background-color: #ddd;
    }
  }
  .message /deep/ {
    .van-cell.van-field {
      height: 100%;
    }
  }
  .message /deep/ .van-cell__title.van-field__label {
    width: 10%;
  }
  .send {
    float: right;
    margin-right: 10px;
  }
}
</style>
