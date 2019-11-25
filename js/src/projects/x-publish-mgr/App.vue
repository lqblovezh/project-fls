<script>

import Top from '@/components/common/Top'
import Menu from '@/components/common/Menu'
import { mapMutations } from 'vuex'
import * as authority from 'services/x-publish/menu'
import * as common from 'services/x-publish/common'

export default {
  name: 'App',
  async created(){
    let user =  common.getUserInfo()
    // common.isLogin().then(res => {
    //   this.$config.userInfo = res.data
    // })
    // common.platInfo({id:'current'}).then(res => {
    //   this.$config.plantInfo = res.data
    // })
    if (this.$route.path == '/login' || user){
      // 如果用户存在或者用户走登陆, 打开路由 ,
      this.isOpen = true ;
    }

    if(!user){
      this.$router.push({path:'/login' })
      this.isOpen = true;
    }
    await this.getAuthority()//获取权限列表

    // if(AdBlockEnable){
    //   this.$message.error({
    //     message:"请不要在此页面使用AdBlock屏蔽插件! 否则图片预览将会无效!",
    //     duration:30000,
    //     showClose:true ,
    //   })
    // }
  },
  data(){
    return{
      isOpen:null,
    }
  },
  mounted(){
    //检查用户登陆
  },
  watch:{

  },
  computed:{
  },
  methods:{
    async getAuthority() {
      await authority.menu().then(res => {
        this.updateAuthority(res.data)
        this.updateUser(common.getUserInfo())
      }).catch(({payload}) => {
        if(!payload) return
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    ...mapMutations(['updateUser','updateAuthority'])
  },
  components:{Top , Menu},
}
</script>

<template lang="pug">
  #app
    router-view(v-if="isOpen")
</template>



<style lang="stylus">
.notPush
  color #CF2424
.pushed
  color #4AC4AC
.noPush
  color #D64848
.pushing
  color #4AC472
</style>
