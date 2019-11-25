<script>
import {adminLogin} from 'services/common/manager'
import {getAppId} from 'services/common'
import formSerialize from "form-serialize"
import { mapMutations } from 'vuex'
import * as authority from 'services/x-publish/menu'

export default {
  data() {
    return {
      supplierId: null,//供应商id
    };
  },
  created() {
  },
  mounted() {
    // console.log(this.warehouse.articleLibrary)
  },
  methods: {
    logint() {
      let data = formSerialize(document.querySelector(".form"), {hash: true})
      adminLogin({...data,app_id:''}).then(res => {
        this.updateUser(res.data.user)
        this.getAuthority() //获取权限列表
        this.$router.push({
          path: '/index',
        })
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    getSupplier(e) {
      getAppId({
        name:e.target.value
      }).then(res => {
        this.supplierId = res.data.id
        this.$nextTick(()=> {
          document.querySelector('input[name=user_name]').focus()
        })
      }).catch(({payload}) => {
        log('error',payload)
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    async getAuthority() {
      await authority.menu().then(res => {
        this.updateAuthority(res.data)
      }).catch(({payload}) => {
        log(payload)
        // for(let i in payload.messages){
        //   this.$message.error(payload.messages[i])
        //   break
        // }
      })
    },
    ...mapMutations(['updateUser','updateAuthority']),
  },
};
</script>

<template lang="pug">
.login
  .content
    i.icon
    .title 资源管理后台系统
    form.form(action="" method="method")
      .supplier
        input(placeholder="请输入供应商" name="app_id" @blur="getSupplier")
        i(class="el-icon-goods")
      .user
        input(placeholder="用户名" ref="userName" name="user_name" @keyup.13="logint" :disabled="!supplierId")
        i
      .pass
        input(placeholder="请输入密码" name="user_pass" type="password" @keyup.13="logint" :disabled="!supplierId")
        i
    .btns
      el-button( @click ="logint") 登录
</template>


<style lang="stylus" scoped>
  @import "~common/stylus/mixin"
  .btns
    margin 15px
  .login
    height 100%
    width 100%
    position absolute
    left 0
    top 0
    bg-image('login')
    background-size cover
    .content
      position absolute
      left 50%
      top 50%
      width 600px
      height 550px
      margin-left -(@width / 2)
      margin-top -(@height / 2)
      text-align center
      display flex
      flex-direction column
      align-items center
      border 2px solid rgba(255, 255, 255, 0.4)
      background-color rgba(255, 255, 255, 0.1)
      border-radius 20px
      box-shadow 0px 4px 5px 0px rgba(16, 118, 100, 0.1)
      z-index 10
      .icon
        width 140px
        height 10px
        border 2px solid rgba(255, 255, 255, 0.4)
        background-color #3acdad
        border-radius 10px
        margin-top 45px
        display inline-block
      .title
        font-size 34px
        margin 60px 0
        color rgba(255, 255, 255, .8)
        font-weight bold
      .form
        text-align center
        > div
          width 400px
          height 52px
          line-height @height
          border-radius 5px
          overflow hidden
          margin 0 auto 30px
          background #fff
          position relative
          i
            width 22px
            height 22px
            left (@height - 2)
            top 50%
            margin-top -(@width / 2)
            display inline-block
            position absolute
          input
            width 100%
            height 100%
            padding-left 62px
            font-size 16px
            border none
            box-sizing border-box
            outline none
      .supplier
        color #585858
      .user
        i
          bg-image('icon-user')
      .pass
        i
          bg-image('icon-pass')
.el-icon-goods
  font-size 20px
</style>
