<script>
import { loginOut } from 'services/common/member'
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      userInfo: {},
    }
  },
  computed: {
    ...mapState({
      //   userInfo: state =>state.userInfo,
      isLoginShow: state => state.isLoginShow,
    }),
		mySaleVisible () {
			return __SUFFIX__ != ''
		},
  },
  watch: {
    isLoginShow(newValue, oldValue) {
      if (!newValue) {
        const uf = sessionStorage.userInfo
        if (typeof uf !== 'undefined' && uf !== '' && JSON.parse(uf) !== null) {
          this.userInfo = JSON.parse(sessionStorage.userInfo)
        }
      }
    },
  },
  mounted() {
    const uf = sessionStorage.userInfo
    if (typeof uf !== 'undefined' && uf !== '' && JSON.parse(uf) !== null) {
      this.userInfo = JSON.parse(sessionStorage.userInfo)
    }
  },
  methods: {
    ...mapMutations(['setIsLoginShow']),
    go(url) {
      if (Object.keys(this.userInfo).length !== 0) {
        this.$router.push({ path: url })
        return
      }
      this.setIsLoginShow(true)
    },
    logout() {
      // this.$go('/login')
      sessionStorage.userInfo = ''
      this.userInfo = {}
      sessionStorage.removeItem('token')
      delete localStorage.token
      loginOut()
    },
  },
}
</script>

<template lang="pug">
.userInfo()
    .top
        img.tx(:src='userInfo.picture_absolute' v-if='userInfo && userInfo.picture_absolute')
        img.tx(src='./img/avatar.png' v-else-if='Object.keys(this.userInfo).length !== 0')
        img.tx.xx(src='./img/avatar.png' @click="go" v-else)
        p(v-if="userInfo && userInfo.nick_name") {{userInfo.nick_name}}
    .ls
        .line-part
        .item(@click='go("/user_info")')
            img.icon(src='./img/userInfo.png')
            span 个人资料
            //- span.go
        .line-part

        .item(@click='go("/safe")')
            img.icon(src='./img/icon_save.png')
            span 账户安全
            //- span.go

        .item(@click='go("/my_sale")' v-if='mySaleVisible')
            img.icon(src='./img/u_2003.png')
            span 我的分销
            //- span.go ●
        .line-part
        .item(@click='go("/bookmark")')
            img.icon(src='./img/u_2004.png')
            span 我的书签
            //- span.go ●

        .item(@click='go("/backmsg")')
            img.icon(src='./img/u_2005.png')
            span 我的回复
            //- span.go ●

        .item(@click='go("/bookcircle")')
            img.icon(src='./img/u_2006.png')
            span 我的书圈
            //- span.go ●

        .item(@click='go("/readHistory")')
            img.icon(src='./img/u_2006.png')
            span 历史记录
            //- span.go ●
        .line-part

        .item(@click='go("/msg")')
            img.icon(src='./img/u_2007.png')
            span 消息
            //- span.go ●

        .item(@click='go("/feedback")')
            img.icon(src='./img/u_2008.png')
            span 反馈
            //- span.go ●
        .line-part
    .out(@click="logout" v-if="Object.keys(userInfo).length!=0")
        .item
        a.exit( ) 退出登陆
    .line-part

</template>

<style lang="stylus" scoped>
.out
    height 1rem
    line-height 1rem
    text-align center
    color #14afff
    font-size 16px
.ls
    font-size 0.32rem
    .item
        height 1rem
        padding 0 0.3rem
        line-height 1rem
        background url('./img/icon_go.png') no-repeat 7rem center
        background-size 7px 12px
        .go
            position absolute
            right 0.7rem
            color #e8554d
            font-size 12px
        >img
            width 20px
            vertical-align middle
            margin-top -0.1rem
        >span
            margin-left 12px
.userInfo
    padding-bottom 1rem
    .top
        color #fff
        height 3.15rem
        font-size 0.28rem
        text-align center
        background url('./img/userInfoBg.png') no-repeat
        background-size 100% 100%
        padding-top 0.6rem
        .tx
            width 1.5rem
            height 1.5rem
            margin 0 auto 0.2rem auto
            border-radius 1.5rem
</style>
