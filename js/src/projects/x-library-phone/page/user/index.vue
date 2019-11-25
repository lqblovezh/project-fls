<script>
import Item from './comp/Item'
export default {
  components: { Item },
  data() {
    return {}
  },
  computed: {
    needCompleteInfo () {
      const attrs = ['sex', 'date_of_birth', 'email', 'duties', 'phone']
      return this.$user && attrs.some(attr => !this.$user[attr])
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   if (from.path == '/') {
  //     console.log('wai lian')
  //   }
  //   next()
  // },
  methods: {
    openLogin() {
      if (this.$user) {
        this.$logOut()
      } else {
        this.$openLogin()
      }
    },
    viewInfo () {
      if (this.$user) {
        this.$go('/info')
      }
    }
  },
}
</script>
<template lang="pug">
.page-user
  .bg.bg-bg-house
  .page-user__bg
    .page-user__top.icon-user_bg
      .page-user__fix.tr(v-show="needCompleteInfo")
        button.c_f.f14(@click="$go('/info')") 完善信息
      .page-user__info
        .page-user__pic
          img( v-if="$user && $user.picture_absolute" :src="$user.picture_absolute" @click="viewInfo")
          .icon.icon-avatar(v-else @click="openLogin")
        .page-user__name.c_f
          p.username {{$user &&　$user.name}}
          p.intro.info_width.f12 {{ $user && $user.summary }}
        .page-user__unlogin(v-if="!$user")
          p.c_f(@click="openLogin") 点击登录
    .page-user__menu.mt30
      Item(name="book" label="我的书房" path="/bookroom")
      Item(name="note" label="我的笔记" path="/note")
      Item(name="read" label="阅读历史" path="/read-history")
      Item(name="bookcard" label="我的书签" path="/bookmark")
      Item(name="shopcar" label="购买记录" path="/shop-record")
    .page-user__menu.mt20
      Item(name="help" label="帮助中心" path="/help")
      Item(name="message" label="消息中心" path="/message")
    p.tc.f14
      button.btn-logout(@click="openLogin") {{$user ? '退出登录':'登录'}}
</template>
<style lang="stylus">
.page-user
  height 100vh
  >.bg
    position fixed
    top 0
    right 0
    bottom 0
    left 0
    z-index -10
  .page-user__title
    margin 0
  >.page-user__bg
    height 100%
    padding-bottom 65px
    box-sizing border-box
    overflow auto
    .page-user__top
      max-height 154px
      background-color rgba(37, 39, 44, 0.5)
      >.page-user__fix
        padding 19px 15px 0
        button
          margin 0
          padding 0
          width 100px
          height 30px
          line-height 30px
          background-color #F15A4A
          border none
          border-radius 999px
          outline none
      >.page-user__info
        position relative
        display flex
        // align-items center
        padding 0 23px
        padding-top 30px
        >.page-user__pic
          position relative
          width 90px
          height 90px
          background-color #676a7b
          border 2px solid #F6D27E
          border-radius 50%
          >img
            width 90px
            height 90px
            border-radius 50%
            object-fit fill
          >.icon
            position absolute
            right 0
            bottom 0
        >.page-user__name
          margin-left 23px
          .info_width
            max-height 60px
            line-height 20px
            overflow hidden
            text-overflow ellipsis
          p
            margin 0
            padding 0
            &.username
              font-size 18px
              margin-bottom 10px
        >.page-user__unlogin
          position absolute
          top 30px
          left 143px
          p
            margin 0
    >.page-user__menu
      margin-left 14px
      margin-right 14px
      color #fff
      border-radius 5px
      background-color rgba(55, 57, 68, 0.8)
      >.comp-item
        &:last-child
          .comp-item__name
            border none
      &.mt30
        margin-top 30px
      &.mt20
        margin-top 20px
    >p
      >.btn-logout
        width 260px
        height 40px
        border none
        outline none
        color #FFF
        border-radius 20px
        background radial-gradient(#F6D27E, #B1936A)
</style>