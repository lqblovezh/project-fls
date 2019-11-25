<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as authority from 'services/x-publish/menu'
import {getUserInfo} from 'services/x-publish/common'

export default {
  name: "App",
  async created(){
    let user =  getUserInfo()
    // common.isLogin().then(res => {
    //   this.$config.userInfo = res.data
    //   // this.$set(this.$config,'userInfo',res.data)
    // })
    // common.platInfo({id:'current'}).then(res => {
    //   this.$config.plantInfo = res.data
    //   // this.$set(this.$config,'plantInfo',res.data)
    // })
    // if (this.$route.path == '/login' || user){
    //   // 如果用户存在或者用户走登陆, 打开路由 ,
    //   this.isOpen = true ;
    // }

    // if(!user){
    //   this.$router.push({path:'/login' })
    //   this.isOpen = true;
    // }
    // if(sessionStorage.getItem('token')){
    // }
    await this.getAuthority()//获取权限列表
  },
  methods: {
    async getAuthority() {
      await authority.menu().then(res => {
        this.updateAuthority(res.data)
        this.updateUser(getUserInfo())
      }).catch(({payload}) => {
        if(!payload) return
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    ...mapMutations(['updateUser','updateAuthority'])
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
