<script>
import Menu from '@/components/Menu.vue'
import SwitchSys from 'projects/common/SwitchSys'
import { isLogin } from 'services/common/manager'
import { addFavicon } from 'projects/common/util'
import { platInfo } from 'services/x-publish/common'
import qs from 'qs'

export default {
  components: { Menu, SwitchSys },
  data() {
    return {
      isCollspan: false,
      isOpen:false,
    }
  },
  created() {},
  async mounted() {
    await this.checkLogin()
    await this.platInfo()
  },
  methods: {
    collspan(isCollspan) {
      this.isCollspan = isCollspan
    },
    platInfo() {
      platInfo().then(res => {
        this.isOpen = true
        addFavicon(res.data.publisher.icon_absolute)
        this.$config.plantInfo = res.data
      })
    },
    checkLogin() {
      isLogin().then(
        res => {
          if (res && res.status) {
            sessionStorage.userInfo = qs.stringify(res.data)
            sessionStorage.token = res.data.token
            this.$refs.SwitchSys.update(res.data)
          }
        },
        err => {
          // location.href='/admin'
        }
      )
      if (!sessionStorage.userInfo) {
        // location.href='/admin'
      }
    },
  },
}
</script>

<template>
  <div v-if="isOpen">
    <div class="top">
      <SwitchSys ref="SwitchSys" currentPlant="X-SYSTEM"/>
    </div>
    <div>
      <Menu @collspan="collspan" />
    </div>
    <div class="main-content" :class="isCollspan ? 'collspan':'' ">
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
