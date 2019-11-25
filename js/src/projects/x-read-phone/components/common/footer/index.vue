<script>
import {
	mapMutations,
	mapState
} from 'vuex'

export default {
	methods: {
		setCurr(name) {
			let userInfo = JSON.parse(sessionStorage.userInfo || null)
			switch (name) {
				case 'my':
					if (!userInfo) {
						// name = "login"
					}
					break;
				case 'book':
					if (!userInfo) {
						name = "login"
						this.setIsBook(true)
					}
					break;
				default:
					break;
			}
			// this.setFooterCurr(name);
			this.$router.push({
				path: `/${name}`
			})
		},
		play() {
			if (!this.currMedia.preview) return //没有播放列表不允许播放
			this.setFullScreenStatus(true); // 有footer不需要半屏显示
			this.setIsPlayerShow(true)

			// this.setIsPaused(!this.paused);
			// var node = document.querySelector("#audio")
			// var status = node.paused
			// this.setIsPaused(!status)
			this.$audioPlay()
		},
		go() {},
		...mapMutations([
			'setFooterCurr',
			'setIsPaused',
			'setIsPlayerShow',
			'setFullScreenStatus',
			'setIsBook',
			'setIsLoginShow'
		])
	},
	computed: {
		...mapState({
			userInfo: state => state.userInfo,
			curr: state => state.footer.curr,
			// isPlay:state => state.footer.isPlay,
			paused: state => state.player.paused,
			audioPlayList: state => state.player.audioPlayList,
			currAudioIndex: state => state.player.currAudioIndex,
			isPlayerShow: state => state.isPlayerShow,
			isLoginShow: state => state.isLoginShow
		}),
		currMedia() {
			if (this.audioPlayList.length > 0 && this.currAudioIndex !== null && this.audioPlayList[this.currAudioIndex]) {
				return this.audioPlayList[this.currAudioIndex].content || this.audioPlayList[this.currAudioIndex];
			} else {
				return {}
			}
		}
	}
}
</script>
<template lang="pug">
.footer
	.content
		.main
			.item( @click="setCurr('home')"  :class="{active:'/home' == curr}" )
				.icon.icon-home( )
				.name.active 首页
			.item( @click="setCurr('find')"  :class="{active:'/find' == curr}" )
				.icon.icon-find
				.name 发现
			.profile
				.play(@click="play" )
					.play-mask
						.img(v-show="currMedia.img_src" :class="{anima:!paused}")
							img(:src="currMedia.img_src")
							span.play-btn(v-show="paused")

			.item( @click="setCurr('book')"  :class="{active:'/book' == curr}" )
				.icon.icon-book
				.name 书房
			.item( @click="setCurr('my')"  :class="{active:'/my' == curr}" )
				.icon.icon-my
				.name 我的
</template>

<style lang="stylus" scoped>
@keyframes spin
  0%
    transform rotate(0deg)
  100%
    transform rotate(360deg)

.content
  position fixed
  bottom 0px
  width 100%
  background #fff
  z-index 999
  box-shadow -3px 0 5px rgba(0,0,0,.3)
.main
  display flex
  // background red
  justify-content space-around
  // width 7.5rem
  height 50px
  text-align center
  .profile
    position relative
    top -0.2rem
  .play
    width 1.2rem
    height 1.2rem
    border-radius 50%
    position relative
    background-color #fff
    box-shadow -3px 3px 5px rgba(0,0,0,.3), 0px -3px 5px rgba(0,0,0,.3)
    z-index 5
    .play-mask
      position absolute
      left -0.1rem
      bottom 0
      width 1.4rem
      height 1rem
      background-color #fff
      z-index -2
    .img
      left 0
      right 0
      top -0.2rem
      bottom 0
      position absolute
      width 0.9rem
      height 0.9rem
      margin auto
      z-index -1
      // opacity 0.2
      >img
        width 100%
        height 100%
        border-radius 0.5rem
      >.isPause
        opacity 0
      &.anima
        animation spin 15s linear infinite
    &.pause
      background #c0c0c0 url('./img/pause.png') no-repeat center
      background-size 0.26rem 0.3rem
    span.play-btn
      position absolute
      top -0.04rem
      left 0
      display inline-block
      width 1rem
      height 1rem
      background transparent url('./img/play.png') no-repeat center
      background-size 0.26rem 0.3rem
      border-radius 0.5rem
  .item
    width 0.8rem
    // background green
    font-size 0.2rem
    display flex
    flex-flow column nowrap
    .name
      color #a6a6a6
    &.active
      .name
        color #14afff
    .icon
      height 0.65rem
    .icon-home
      background url('./img/home.png') no-repeat center
      background-size 21px 21px
    &.active
      .icon-home
        background url('./img/home-active.png') no-repeat center
        background-size 21px 21px
    .icon-find
      background url('./img/find.png') no-repeat center
      background-size 21px 21px
    &.active
      .icon-find
        background url('./img/find-active.png') no-repeat center
        background-size 21px 21px
    .icon-book
      background url('./img/book.png') no-repeat center
      background-size 21px 21px
    &.active
      .icon-book
        background url('./img/book-active.png') no-repeat center
        background-size 21px 21px
    .icon-my
      background url('./img/my.png') no-repeat center
      background-size 21px 21px
    &.active
      .icon-my
        background url('./img/my-active.png') no-repeat center
        background-size 21px 21px
</style>
