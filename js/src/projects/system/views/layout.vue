<script>
import Menu from '@/components/Menu.vue'
import SwitchSys from 'projects/common/SwitchSys'
import urljoin from 'url-join'
import { isLogin } from 'services/system/auth'
import qs from 'qs'
export default {
  components: { Menu, SwitchSys },
  data() {
    return {
      isCollspan: false,
    }
  },
  mounted(){
    this.checkLogin();
  },
  methods: {
    collspan(isCollspan) {
      console.log(isCollspan)
      this.isCollspan = isCollspan
    },
    async checkLogin(){
        this.isOpen = true
        await isLogin().then(res => {
          if(res && res.status){
            sessionStorage.userInfo = qs.stringify(res.data);
          }else{
            if(this.$route.path != urljoin(baseUrl,'')){
              this.$router.push({path:urljoin(baseUrl,'')})
            }
          }
        },err=>{
          if(this.$route.path != urljoin(baseUrl,'/')){
             this.$router.push({path:urljoin(baseUrl,'')})
           }
        })
    }
  }
}
</script>

<template>
  <div>
    <div class="top">
      <SwitchSys currentPlant='X-System' />
    </div>
    <div class="">
      <Menu @collspan="collspan" />
    </div>
    <div class="main-content"
      :class="isCollspan ? 'collspan':'' ">
      <div class="bg"></div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="stylus" >
.bg
  position fixed
  left 0
  right 0
  bottom 0
  top 0
  background #f2f2f2
  z-index -1
.main-content
  margin-top 50px
  margin-left 200px
  &.collspan
    margin-left 50px
</style>
