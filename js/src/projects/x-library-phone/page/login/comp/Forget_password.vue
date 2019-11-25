<script>
import mixins from './mixins'
import NavTop from './NavTop'
import OtherLogin from './OtherLogin'
import { mapState } from 'vuex'

export default {
  components: { NavTop, OtherLogin },
  mixins: [mixins],
  activated() {
    console.log('actived forget_password')
    if (!this.valiData.code_img.img_src) {
      this.$getImgCode()
    }
  },
  data() {
    return {
      user_id: null,
      valiData: {
        phone: {
          // 验证所需字段
          display: '手机号码不正确',
          rules: 'is_phone',
          // 组件额外字段
          placeholder: '手机号',
          cname: '手机号',
          type: 'text',
          value: '',
          isError: false,
        },
        // 手机短信的codeval
        code_img: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '验证码',
          type: 'text',
          isCode: true,
          isError: false,
          value: '',
          img_src: '',
          placeholder: '图片验证码',
          code_id_img: '', // 图片的id
        },
        code_val: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '短信验证',
          placeholder: '手机验证码',
          type: 'text',
          isPhoneCode: true,
          isError: false,
          value: '',
        },
        // id, 短信发送成功后返回的字段
        code_id: {
          value: '',
          noRender: true,
        }, 
        pass: {
          display: '密码过短',
          rules: 'min_length(4)',
          cname: '新密码',
          type: 'password',
          isError: false,
          value: '',
          placeholder: '新密码',
        },
        pass_confirm: {
          display: '密码不一致',
          rules: '',
          cname: '确认密码',
          type: 'password',
          isError: false,
          value: '',
          placeholder: '确认密码',
        }
      },
    }
  },
  methods: {
    forget() {
      this.isPass()
        .then(res => {
          //console.log(res)
          console.log(res)
          // 因为code_id 字段不在渲染表单内, 但又需要发送
          return this.$service.signin.set({
              user_id: this.user_id,
              ...res
            })
        })
        .then(res => { 
          console.log(res)
          this.$Toast('重置成功! 请登陆')
          this.$store.state.loginModalType = 'Account'
        })
        .catch(err => {
          // this.$message.error(err.message)
          this.$Toast(err.message)
        })
    },
    back() {
      this.$store.state.loginModalType = 'Account'
    },
    getPhoneCodeHander2 () {
      console.log('xxxxxxxxxxxxxxxxxx')
      this.$refs.inp_phone[0].vali() // 验证手机号
      if (this.valiData.phone && this.valiData.phone.isError) {
        this.$Toast('手机号码错误!')
        return
      }
      let data = {
        code_id: this.valiData.code_img.code_id_img,
        code_val: this.valiData.code_img.value,
        phone: this.valiData.phone.value,
        not_check_user_exist: 1,
      }
      this.$service.signin
        .pwdBackPhoneCode(data)
        .then(res => {
          this.user_id = res.data.user_id
          console.log(this.user_id)
          //console.log('phoneback', res)
          this.$Toast({
            type: 'success',
            message: '短信发送成功!',
          })
          // this.valiData.code_id.value = res.data.code_id
          // 60秒内不再发送
          // this.$refs.inp_code_val[0].wait()
          console.log(res)
        })
        .catch(err => {
          //console.log('错误')
          if (err.message === '图片验证码错误') {
            this.valiData.code_img.isError = true
            this.$Toast('图片验证码错误!')
          } else {
            console.error(err)
            this.$Toast('短信发送失败! 请稍后再试!')
          }
        })
    },
  },
}
</script>
<template lang="pug">
  .comp-login-forget
    .wrapper
      .content 
        form.form-login
          LoginInput(
            @phoneClickHander="getPhoneCodeHander2"
            @imgClickHander="getImgCode"
            :ref="`inp_${key}`"
            v-for="item,key in valiData"
            :name="key"
            :key="key"
            :data="item"
            v-if="!item.noRender"
          )
        .tc.btn-ls
          .btn-login.linear-btn( @click="forget" )  提交修改
          .btn-login(@click="back")  返回
</template>
<style lang="stylus">
.comp-login-forget
  .btn-ls
    >div
      margin-bottom 20px
</style>
