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
        <van-button
          slot="button"
          size="small"
          type="info"
          @click="sendCode"
        >{{flag?'发送验证码':'10s后重新发送'}}</van-button>
        <template slot="left-icon">
          <i class="iconfont icon-icon--"></i>
        </template>
      </van-field>
    </van-cell-group>
    <van-button
      type="primary"
      size="large"
      @click="login"
      :loading="loading"
      loading-text="登录中..."
      :disabled="loading"
    >登录</van-button>
    <div class="msg">
      <span class="bottom">隐私条款</span>
    </div>
  </div>
</template>
<script>
import { userLogin } from '@/api/user.js'
import { setUserLocal } from '@/utils/userInfo.js'
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
      },
      loading: false
    }
  },
  methods: {
    // 目的 可以让异步代码以同步的方式进行书写
    // async    用来修饰异步所在的函数
    async login () {
      if (!this.validData()) {
        return
      }
      // await 用来修改返回 promise 对象的异步请求
      try {
        this.loading = true
        let res = await userLogin(this.$http, {
          url: 'authorizations',
          method: 'POST',
          data: this.msg
        })
        // 调用方法将返回的数据存在本地磁盘中
        setTimeout(() => {
          this.loading = false
          this.$router.push('/home')
        }, 2000)
        setUserLocal(res.data.data)
      } catch (err) {
        console.log(err)
        this.$toast('用户信息错误,请重新登录')
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    },
    // 发送验证码
    sendCode () {
      var reg = /^1[3|4|5|7|8][0-9]{9}$/
      /* console.dir(reg) */
      if (reg.test(this.msg.mobile) === true) {
        console.log('验证成功')
      } else {
        console.log('验证失败')
      }
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
