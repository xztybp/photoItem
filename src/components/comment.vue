<template>
  <div class="comment">
    <van-cell>
      <template slot="default">
        <div class="authorMsg">
          <van-image width="40" height="40" round :src="itemobj.aut_photo" />
          <div class="aut">
            <h5>{{itemobj.aut_name}}</h5>
            <span class="time">{{itemobj.pubdate | yearTimeFilter}}</span>
          </div>
        </div>
        <van-cell :title="itemobj.content">
          <template slot="label" v-if="isOk" class="lable">
            <div class="lable">
              <span v-if="itemobj.reply_count===0" class="reply">回复</span>
              <span v-else class="reply">{{itemobj.reply_count}}条回复</span>
              <van-button type="primary" size="mini" plain @click.stop="replyComment(itemobj)">回复评论</van-button>
            </div>
          </template>
        </van-cell>
      </template>
    </van-cell>
  </div>
</template>

<script>
/* 兄弟组件传参:导入公用bus */
import bus from '../assets/bus'
export default {
  props: ['itemobj', 'isOk'],
  data () {
    return {}
  },
  methods: {
    replyComment (itemobj) {
      this.$emit('input', true)
      bus.$emit('bus1', itemobj)
    }
  }
}
</script>

<style lang="less" scoped>
div.comment {
  div.authorMsg {
    display: flex;
    align-items: center;
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
  }
  div.lable {
    display: flex;
    justify-content: space-between;
    span.reply {
      font-size: 12px;
      color: rgb(14, 14, 206);
    }
  }
}
</style>
