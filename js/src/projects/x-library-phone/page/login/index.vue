<script>
import Account from './comp/Account'
import Phone from './comp/Phone'
import Register from './comp/Register'
import Password from './comp/Forget_password'
export default {
  components: { Account, Phone, Register, Password},
  data() {
    return {
      type: 'Account', // Phone||Register||Password
    }
  },
  methods: {
    close() {
      this.$store.state.isLoginShow = false
    },
  },
}
</script>


<template lang="pug">
  .comp-login
    .bg-bg-house
    .top.fix
      .icon.icon-close3.fr(@click="close")
    keep-alive
      component(:is="$store.state.loginModalType") 
</template>

<style lang="stylus">
.comp-login
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  background #fff
  z-index 20
  color #fff
  overflow scroll
  >.top
    >.icon-close3
      width 36px
      height 36px
      background-color #fff
      border-radius 50%
  input::-webkit-input-placeholder
    color #ddd
</style>
