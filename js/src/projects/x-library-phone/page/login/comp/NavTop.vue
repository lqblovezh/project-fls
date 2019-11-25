<script>
import { mapState } from 'vuex'
export default {
  props: {},
  computed: {
    ...mapState({
      loginModalType: state => state.loginModalType,
    }),
  },
  methods: {
    change(type) {
      this.$store.state.loginModalType = type
    },
  },
}
</script> 
<template lang="pug">
  .comp-login-nav  
    .top 
      .name.f26  法律门·刑审智库
      .sub.f16 口袋里的法律内容资源数据库
    .content()
      .ib.active_border(
        @click="change('Account')" 
        :class="{active:loginModalType === 'Account'}"
      ) 账户登录 
      .ib.active_border(
        @click="change('Phone')" 
        :class="{active:loginModalType === 'Phone'}"
      ) 手机验证登录 
</template>
<style lang="stylus">
.comp-login-nav
  margin-bottom 30px
  >.top
    padding 0 25px
    >.sub
      opacity 0.9
      line-height 30px
      text-align center
      margin-bottom 30px
  >.content
    line-height 36px
    display flex
    justify-content space-around
</style>
