<template>
  <div class="login">
    <van-nav-bar title="登录"></van-nav-bar>
    <van-cell-group>
      <van-field
        left-icon="contact"
        placeholder="请输入手机号"
        v-model.trim="msg.mobile"
        :error-message="errmsg.mobile"
      >
        <template slot="left-icon">
          <i class="iconfont icon-shouji"></i>
        </template>
      </van-field>
      <van-field placeholder="请输入密码" v-model.trim="msg.code" :error-message="errmsg.code">
        <van-button slot="button" size="small" type="info">发送验证码</van-button>
        <template slot="left-icon">
          <i class="iconfont icon-icon--"></i>
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="primary" size="large" @click="login">登录</van-button>
    <div class="msg">
      <span class="bottom">隐私条款</span>
    </div>
  </div>
</template>
<script>
import { userLogin } from '@/api/user.js'
export default {
  data () {
    return {
      msg: {
        mobile: '13911111111',
        code: '246810'
      },
      errmsg: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    login () {
      if (!this.validData()) {
        return
      }
      userLogin(this.$http, {
        url: 'authorizations',
        method: 'POST',
        data: this.msg
      }).then(res => {
        console.log(res)
      })
    },
    // 验证数据方法
    validData () {
      if (!this.msg.mobile) {
        this.errmsg.mobile = '手机号不能为空'
        return false
      }
      if (this.msg.mobile.length !== 11) {
        this.errmsg.mobile = '请输入11位有效数字'
        return false
      }
      this.errmsg.mobile = ''
      if (!this.msg.code) {
        this.errmsg.code = '验证码不能为空'
        return false
      }
      if (this.msg.code.length !== 6) {
        this.errmsg.code = '验证码必须为6位有效数字'
        return false
      }
      this.errmsg.code = ''
      return true
    }
  }
}
</script>

<style lang="less" scoped>
div.login {
  background-color: #f5f7f9;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  .van-nav-bar.van-hairline--bottom {
    background-color: #3195f9;
    .van-nav-bar__title {
      color: #fff;
      font: 16px '微软雅黑';
      line-height: 46px;
    }
  }
  .van-cell.van-field {
    background-color: #fff;
  }
  button.van-button.van-button--info.van-button--small {
    border-radius: 10px;
    border: none;
    background-color: #ececec;
    color: #6f6f6f;
  }
  button.van-button.van-button--primary.van-button--large {
    margin: 15px 0px;
  }
  div.msg {
    display: flex;
    width: 100%;
    justify-content: center;
    span.bottom {
      position: absolute;
      bottom: 0px;
      margin-bottom: 20px;
    }
  }
  i.iconfont {
    font-size: 30px;
  }
}
</style>
