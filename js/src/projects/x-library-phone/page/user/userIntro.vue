<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      intro: ''
    }
  },
  mounted() {
    this.intro = this.$user && this.$user.summary
  },
  computed: {
    hasChange () {
      return this.$user.summary !== this.intro
    }
  },
  methods: {
    ...mapMutations(['SET_USER']),
    async save () {
      if (!this.hasChange) {
        return
      }
      try {
        let res = await this.$service.user.changeUserInfo({
          summary: this.intro
        })
        this.SET_USER(res.data)
        this.$Toast({
          message: '修改成功',
          iconClass: 'icon-success'
        })
      } catch(e) {
        this.$Toast({
          message: '数据修改失败',
          iconClass: 'icon-failed'
        })
      }
    }
  }
}
</script>
<template lang="pug">
.page-user__intro
  Head(name="个人介绍" type="dark")
  textarea.f16(v-model="intro")
  .btn-box.pl15.pr15
    button.btn-reset.linear-btn.c_f(@click="save" :class="{dis: !hasChange}") 保存数据
</template>
<style lang="stylus">
.page-user__intro
  >textarea
    padding 10px
    width 100%
    height 200px
    line-height 20px
    text-indent 2em
    color #444
    box-sizing border-box
  >.btn-box
    margin-top 15px
    >button
      width 100%
      height 35px
      line-height 35px
      border-radius 5px
      &.dis
        color #6b6a6a
        background #e6e6e6
</style>