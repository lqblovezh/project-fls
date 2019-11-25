<script>
import mixins from './mixins'
import NavTop from './NavTop'
import OtherLogin from './OtherLogin'
import { mapState } from 'vuex'

export default {
  components: { NavTop, OtherLogin },
  mixins: [mixins],
  activated() {
    console.log('actived phone')
    if (!this.valiData.code_img.img_src) {
      this.$getImgCode()
    }
  },
  data() {
    return {
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
        code_img: {
          display: '验证码错误',
          rules: 'min_length(1)',
          cname: '验证码',
          type: 'text',
          isCode: true,
          isError: false,
          value: '',
          img_src: '',
          placeholder: '输入验证码',
          code_id_img: '', // 图片的id
        },
        // 手机短信的codeval
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
      },
    }
  },
  watch: {
    '$store.state.isLoginShow': function(flag) {},
  },
  methods: {
    login() {
      this.isPass()
        .then(res => {
          console.log(res)
          return this.$service.signin.phoneLogin(res)
        })
        .then(res => {
          this.$successLogin(res)
        })
        .catch(err => {
          this.$Toast({ message: err.message })
        })
    },
  },
}
</script>
<template lang="pug">
  .comp-login-phone
    NavTop(type="phone")
    .wrapper
      .content 
        form.form-login
          LoginInput(
            @phoneClickHander="getPhoneCodeHander"
            @imgClickHander="getImgCode"
            :ref="`inp_${key}`"
            v-for="item,key in valiData"
            :name="key"
            :key="key"
            :data="item"
            v-if="!item.noRender"
          )
          OtherLogin(
            :IsPhone='true'
            name="登录"
            @login="login"
          )
</template>


<style lang="stylus">
</style>
