<script>
import {login} from 'services/system/auth'
import urlJoin from 'url-join'
import qs from 'qs'
export default {
  data(){
    return {
      loginInfo:{user_name:'',user_pass:''}
    }
  },
  created(){

  },
  methods:{
    send(){
       login(this.loginInfo).then(res=>{
          sessionStorage.userInfo=qs.stringify(res.data);
					sessionStorage.token = res.data.token
          this.$router.push(urlJoin(baseUrl,'/app/home'))
       },err=>{
          this.$message.error('用户名和密码不正确')
       })
    }
  }
} 
</script>

<template lang="pug">
.login
  .box
    .title X-System 后台管理系统
    .form
      .label.first
        input( placeholder="请输入用户名" v-model="loginInfo.user_name" autocomplete="off")
      .label
        input( placeholder="密码" type="password" v-model="loginInfo.user_pass"  @keyup.enter="send" autocomplete="off")
      .label
        button(@click="send" type="submit") 登录
</template>

<style lang="stylus" scoped>
.login 
  height 100vh
  background linear-gradient(#195d9e, #41cca2)
  display flex
  justify-content center
  align-items center
  .box
    height 305px
    width 480px
    color #fff
    .title 
      text-align center
      position absolute
      font-size 30px
      margin-top -50px
      width 480px
  .form
    height 305px
    background rgba(255,255,255,0.18)
    text-align center
    border-radius 8px
    border 1px solid transparent
    .label
      padding 10px 0
      margin 4px 0
    button 
      height 40px
      width 280px
      outline none
      border none 
      border-radius 40px
      color #549eaf
      font-size 20px
    .first 
      margin-top 60px
    input 
      height 35px
      color #fff
      width 280px
      border-radius 35px
      text-indent 15px
      background rgba(255,255,255,0)
      border 1px solid rgba(255,255,255,0.3)
      outline none
      transition 0.1s
      &:hover
        border-color rgba(255,255,255,0.5)
      &:focus 
        border-color #41cca2
input::-webkit-input-placeholder { /* WebKit browsers */
    color:    #fff;
}
input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #fff;
}
input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #fff;
}
input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #fff;
}
</style>
