<script>
import Login from '@/components/my/login'
import Registor from '@/components/my/registor'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isShowDialog: true, // 是否显示弹出框
      isShowLogin: true, // 显示登录或者注册
    }
  },
  components: {Login, Registor},
  methods: {
    ...mapMutations([
      'setIsLoginShow',
    ]),
    hideDialog() {
        this.setIsLoginShow(false)
    },
    toggleLogin() {
      this.isShowLogin = !this.isShowLogin
    }
  },
  computed: {
    ...mapState({
      isShowCloseBtn: state => state.isBook
    })
  }
}
</script>
<template lang="pug">
#dialog
  .loginDia-header.clearfix
    span(@click="hideDialog" v-if="!isShowCloseBtn").icon-close
  Login.pad(v-if="isShowLogin" @hide="hideDialog" @hideLogin="toggleLogin")
  Registor.pad(v-if="!isShowLogin" @toggleLogin="toggleLogin")
</template>
<style lang="stylus" scoped>
#dialog
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color #fff
  z-index 9999
  .loginDia-header
    padding-right 0.4rem
    padding-top 0.2rem
    span
      float right
      cursor pointer
      img
        width 0.5rem
        height 0.5rem
</style>
