
<script>
import { mapState, mapMutations } from 'vuex'
import Player from '@/components/player'
import PlayerVideo from '@/components/playerVideo'

import { noLoginToast, getHistoryLastAudio } from '@/utils/util'
export default {
  components: { Player, PlayerVideo },
  name: 'App',
  async created() {
    await this.init()
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    async init() {
      if (typeof sessionStorage.userInfo != undefined && sessionStorage.userInfo != '') {
        getHistoryLastAudio()
      }
    },
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      isPlayerVideoShow: state => state.player.isPlayerVideoShow,
      currAudioIndex: state => state.player.currAudioIndex,
      audioPlayList: state => state.player.audioPlayList,
      isLoginShow: state => state.isLoginShow,
      isFooterShow: state => state.isFooterShow,
      isAppShow: state => state.isAppShow,
    }),
  },
  // 这个蛋疼的keep-alive , 要做到体验好好, 开发极为不方便
}
</script>
<template lang="pug">
#app(v-show="isAppShow")
  //- keep-alive( :exclude="/Reader|comment|themeReplayLsit|listenRead|bookDetail|bookMedia|keySearch/")
  router-view( v-show="!isPlayerShow  || !fullScreen"  )
  //- 有播放器不显示
  Footer(v-show="isFooterShow && !isPlayerShow" )
  .audio-footer(v-show="isPlayerShow && !fullScreen")
  Player(v-show="isPlayerShow" )
  PlayerVideo(v-show="isPlayerVideoShow" )
  LoginReg(v-if="isLoginShow")
</template>

<style lang="stylus">

body
  font-size 0.3rem
// #app
// height 100%
.audio-footer
  height 3.2rem
  background #fff
</style>
