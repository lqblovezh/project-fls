<script>
export default {
  components: {},
  data() {
    return {
      data: {
        value: '',
        files: [],
      },
    }
  },

  methods: {
    cleanImg() {
      this.data.files = []
    },
    openImg() {
      this.$refs.fileImg.open()
    },
    focus() {
      this.$refs.inp.focus()
    },
    clickHandler(e) {},
    async commit() {
      if (!this.data.value) {
        this.$Toast('请输入内容')
        return
      }
      try {
        let img = await this.$compressAndUpload(this.data.files)
        this.$emit('commit', {
          value: this.data.value,
          img,
        })
      } catch (error) {
        this.$closeLoading()
        this.$Toast('上传出错...')
      }
    },
    clean() {
      this.data.files = []
      this.data.value = ''
    },
  },
}
</script>


<template lang="pug">
  .comp-circle-reply-input
    .wrapper.vm-all.f14.c_6
      .del(v-if="data.files.length" ref=""  @click="cleanImg" )
          .icon.icon-del( )
          span.f12.c_price 清空图片
      FileImg( 
        :files="data.files"
        @cleanImg="cleanImg"
        ref="fileImg"
      )
      .main
        .icon.icon-photo(@click="openImg")
        input.inp( 
          ref="inp" 
          placeholder="请输入评价内容" 
          v-model="data.value"
          @blur="$emit('blur')"
        )
        .ib(@click="commit") 评价

</template>
<style lang="stylus">
.comp-circle-reply-input
  position fixed
  bottom 0
  left 0
  right 0
  z-index 23
  background #fff
  box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
  >.wrapper
    >.del
      margin 10px 0
    >.main
      display flex
      justify-content space-between
      text-align center
      align-items center
      min-height 50px
      >.icon, >.ib
        width 60px
        flex none
      >.inp
        width 80%
</style>
