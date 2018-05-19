<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">萌萌哒</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>


      <div class="login_content">
        <!--阻止了button对表单的默认提交行为-->
        <form @submit.prevent="login">
          <div :class="{on: loginWay}">
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!rightPhone" class="get_verification"
                :class="{right_phone: rightPhone}" @click="getCode">
                {{computeTime>0 ? `已发送${computeTime}s` : '获取验证码'}}
              </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>

          <div :class="{on: !loginWay}">
            <section>
              <section class="login_message">
                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <!--通过判断 showPwd，来显示关联的2个输入框-->
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
                <!--都是通过判断，添加样式-->
                <div class="switch_button off" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd ? 'abc' : ''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <!--这里可以直接发送请求，不存在跨域-->
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="imgUpdate">

              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>

    <!--
      提示框
      在父级定义事件，在子级通过this.emit(事件名)触发
      所以，这个closeTip事件对应的回调函数，是通过子级触发的。

    -->
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip1"/>
  </section>
</template>

<script>
  import AlertTip from '../../components/AlertTip/AlertTip'

  export default {
    data () {
      return {
        loginWay: true,  //切换登陆的方式
        phone: '',
        name: '',
        pwd: '',
        showPwd: false,   //是否显示密码
        code: '',   //短信验证码
        captcha: '',    //图片验证码
        computeTime: 0,  //验证码计时开始时间

        alertText: '',   //提示文本
        alertShow: false    //是否显示提示框
      }
    },

    computed: {
      /*
      * 为了满足条件时，'获取验证码'的button，样式改变（新添加了对应的样式）
      *   输入的电话号，以 1开头，后面必须还有10位数，返回值Boolean
      * */
      rightPhone () {
        return /^1\d{10}$/.test(this.phone)
      }
    },

    methods: {
      getCode () {
        if(!this.computeTime){
          this.computeTime = 5
          const IntervalId = setInterval(() => {
            this.computeTime--
            if (this.computeTime <= 0) {
              clearInterval(IntervalId)
            }
          }, 1000)
        }
      },

      //配合下面的login使用，来确定是否显示提示框
      showAlert (alertText) {
        this.alertShow = true
        this.alertText = alertText
      },

      //异步登陆
      login () {
        const {phone, rightPhone, code, showAlert} = this
        if (this.loginWay) {
          if (!rightPhone) {
            //电话格式错误
            showAlert('电话格式错误')
          } else if (!/^\d{6}$/.test(code)) {
            //验证码错误
            showAlert('验证码错误')
          }


        } else {
          const {name, pwd, captcha} = this
          if (!name) {
            //用户名必须指定
            showAlert('用户名必须指定')
          } else if (!pwd) {
            //密码必须指定
            showAlert('密码必须指定')
          } else if (!captcha) {
            //验证码必须指定
            showAlert('验证码必须指定')
          }
        }
      },

      //点击时，关闭提示框，并清空提示文字
      closeTip1 () {
        this.alertShow = false
        this.alertText = ''
      },

      imgUpdate (event) {
        /*
        * src必须变化，才会重新发送请求，
        *   所以可以添加一个当前时间，并不会影响返回值。
        * */
        event.target.src = 'http://localhost:4000/captcha?time='+Date.now()
      }
    },

    components: {
      AlertTip
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"

  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #0085ff
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #0085ff
              font-weight 700
              border-bottom 2px solid #0af
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #0085ff
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                    transform translateX(-8px)
                &.on
                  background-image linear-gradient(90deg,#0af,#0085ff)
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #0085ff
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background-image linear-gradient(90deg,#0af,#0085ff)
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>
