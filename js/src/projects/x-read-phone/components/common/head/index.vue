<script>
import { mapState } from 'vuex'

export default {
  props: {
    name: String, //显示的名称
    backUrl: {
      type: String,
    }, //指定返回的页面, 默认返回上一页
    isSearch: {
      default: true,
    }, // 是否隐藏search
    color: {
      default: '',
    },
  },
  computed: {
    ...mapState({
      historyList: state => state.historyList,
      historyLen: state => state.historyLen,
      isLoginBack: state => state.isLoginBack,
    }),
    isHide() {
      return this.hide === 'true' ? true : false
    },
  },
  methods: {
    back() {
      // debugger
      this.$emit('back')
      if (this.backUrl) {
        if (this.backUrl == 'no') {
          // 不执行任何操作,交给父组件
          return
        }
        this.$router.push({ path: this.backUrl })
      } else {
        if (this.isLoginBack) {
          // 解决登陆, 返回登陆页面
          this.$router.go(-2)
          this.$store.commit('changeIsLoginBack', false)
        } else {
          // 解决分享外链出去没有历史记录, 返回空白页面
          if (this.historyLen < 2) {
            let { meta, query } = this.$route
            if ((meta && meta.isFastLibrary) || query.isFast == 'true') {
              this.$router.push({
                path: '/fastHome',
                query: {
                  id: query.id,
                },
              })
            } else {
              this.$router.push({ path: '/home' })
            }
            return
          }
          setTimeout(() => {
            this.$store.commit('changeHistoryLen', -2)
          }, 0)
          // this.$router.go(-1)
          this.$router.back()
        }
      }
    },
    search() {
      this.$go('/home/search')
    },
  },
}
</script>

<template lang="pug">
.div
  .head
    .back.icons( 
      :class="`icon-back${color}`"
      @click="back" )
    .name.ell {{name}}
    .search.ib
      .icons.icon-search-n(v-if="isSearch" @click="search" )
</template>


<style lang="stylus" scoped>
.div
  height 0.9rem
.head
  position fixed
  top 0
  left 0
  right 0
  height 0.9rem
  z-index 99
  background #fff
  display flex
  box-shadow 1px 2px 7px 0px rgba(0, 0, 0, 0.04)
  // align-items center
  .back
    width 0.9rem
    height 100%
    // background url('./img/back.png') no-repeat center
    // background-size 19px 18px
    // flex 0 0 auto
  .name
    flex 1 1 auto
    text-align center
    line-height 0.9rem
    color #333333
    font-size 0.34rem
  .search
    width 0.9rem
    height 100%
    >.icons
      width 100%
      height 100%
</style>
