<script>
import mixins from './mixins'
import NavTop from './NavTop'
import OtherLogin from './OtherLogin'
import { mapState } from 'vuex'
export default {
  components: { NavTop, OtherLogin },
  mixins: [mixins],
  computed: {
    ...mapState({
      isLoginShow: state => state.isLoginShow,
    }),
  },
  activated() {
    console.log('actived account')
  },
  data() {
    return {
      valiData: {
        user_name: {
          // 验证所需字段
          display: '账号过短',
          rules: 'min_length(4)',
          // 组件额外字段
          cname: '账 户',
          type: 'text',
          isError: false,
          value: '',
          placeholder: '账 号',
        },
        user_pass: {
          display: '密码过短',
          rules: 'min_length(4)',
          cname: '密 码',
          type: 'password',
          isError: false,
          value: '',
          placeholder: '密 码',
        },
        // code_img: {
        //   display: '验证码错误',
        //   rules: 'min_length(1)',
        //   cname: '验证码',
        //   type: 'text',
        //   isCode: true,
        //   isError: false,
        //   value: '',
        //   img_src: '',
        //   placeholder: '短信验证码',
        //   code_id_img: '', // 图片的id
        // },
      },
    }
  },
  methods: {
    getImgCode() {
      this.$getImgCode()
    },
    login() {
      this.isPass()
        .then(res => this.$service.signin.login(res))
        .then(res => {
          console.log(res)
          // this.$loginBackHander(res.data)
          this.$successLogin(res)
        })
        .catch(err => {
          const {
            errors,
            message
          } = err.payload
          this.$Toast(errors[0] || message || '登录失败')
        })
    },
  },
}
</script>
<template lang="pug">
  .comp-login-account  
    NavTop
    .wrapper
      .content 
        form.form-login 
          LoginInput(
            @imgClickHander="getImgCode"
            :ref="`inp_${key}`"
            v-for="item,key in valiData"
            :name="key"
            :key="key"
            :data="item"
          )
          OtherLogin(
            :IsPhone='false'
            name="登录"
            @login="login"
          )
</template>
<style lang="stylus">
</style>
