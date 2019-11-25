<script>
export default {
  data () {
    return {
      imgs: [],
      maxImgLen: 6,
      content: '',
    }
  },
  methods: {
    previewImg (evt) {
      let file = evt.target.files[0]
      let url = URL.createObjectURL(file)
      this.imgs.length < this.maxImgLen && this.imgs.push({
        id: Date.now().toString(36),
        url
      })
    },
    remove (id) {
      let index = this.getImgItemById(id)
      this.imgs.splice(index, 1)
    },
    getImgItemById (id) {
      let idx
      this.imgs.forEach((item, index) => {
        if (item.id === id) {
          idx = index
        }
      })
      return idx
    },
    postMsg () {
      if (this.content) {
        this.$service.feedback.save({ content: this.content }).then(res => {
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>
<template lang="pug">
.page-help-detail
  .help-detail
    p.txt-describe.f15 描述你的问题
    textarea.f12(placeholder="请输入内容..." v-model="content")
    .help-pics
      button.btn-reset.icon-take-photo.mr10(@click="$refs.file.click()")
      input(type="file" ref="file" @change="previewImg($event)" accept="image/*" capture="camera")
      .help-img(v-for="img in imgs")
        img(:src="img.url")
        button.btn-reset.c_f(@click="remove(img.id)") X
  .help-btn
    button.linear-btn.c_f.f16(@click="postMsg") 提交
</template>
<style lang="stylus">
.page-help-detail
  padding-top 20px
  .help-detail
    padding 0 15px
    >.txt-describe
      color #373944
    >textarea
      padding 16px
      width 100%
      height 190px
      // border-color #000
      border-radius 0
      box-sizing border-box
    >.help-pics
      input
        display none
      >.help-img
        position relative
        display inline-block
        margin-right 10px
        width 65px
        height 65px
        img
          width 100%
          height 100%
        >button
          position absolute
          right 5px
          top 5px
          height 15px
          line-height 15px
          background-color transparent
  >.help-btn
    width calc(100%-30px)
</style>