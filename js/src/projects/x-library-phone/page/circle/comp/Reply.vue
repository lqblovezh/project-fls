<script>
import DetailCard from './DetailCard'
import Compressor from 'compressorjs'
export default {
  components: { DetailCard },
  props: {
    reply: {},
    detail: {},
  },
  data() {
    return {
      data: {
        title: '',
        value: '',
        files: [],
      },
      score: 0
    }
  },

  mounted() {},
  methods: {
    back() {
      this.reply.isOpen = false
    },
    dragHnadler(e) {
      e.dataTransfer.setData('Text', e.target.id)
    },
    dropHandler(e) {
      e.dataTransfer.setData('Text', e.target.id)
    },
    cleanImg() {
      this.data.files = []
    },
    openImg() {
      this.$refs.fileImg.open()
    },
    async commit() {
      if (this.reply.type === 1 && !this.data.title) {
        this.$Toast('请输入标题')
        return
      }
      if (!this.data.value) {
        this.$Toast('请输入内容')
        return
      }
      try {
        let img = await this.$compressAndUpload(this.data.files)
        await this.$service.circle.score({
          book_id: this.detail.book_id,
          score: this.score
        })
        this.$emit('commit', {
          type: this.reply.type,
          value: this.data.value,
          title: this.data.title,
          img,
        })
      } catch (error) {
        console.log(error)
        this.$closeLoading()
        this.$Toast(error)
      }
    },
  },
}
</script>


<template lang="pug">
  .page-circle-reply
    Head( :name="reply.type === 1 ? '发布话题':'发布评论'" type="dark" @back="back" :isModel="true")
    .wrapper
      DetailCard(  
        type="reply" 
        :detail="detail"
        :title="reply.type"
        :name="detail.name"
        :img="detail.img_src"
        :author="detail.author"
        v-model="score"
      )
      .main 
        .inp(v-if="reply.type === 1")
          input(placeholder="好的标题会更有吸引力…" v-model="data.title")
        .inp.txt
          textarea(placeholder="请输入内容…" v-model="data.value")
        FileImg( 
          :files="data.files"
          @cleanImg="cleanImg"
          ref="fileImg"
        )
        .icon.icon-take-photo(@click="openImg")
        .ib.del.fr(v-if="data.files.length"  @click="cleanImg" )
          .icon.icon-del( )
          span.f12.c_price 清空图片
        .confirm.tc
          .cbtn.b9a(@click="commit") 发布并等待审核

</template>
<style lang="stylus">
.page-circle-reply
  position fixed
  z-index 18
  top 0
  left 0
  right 0
  bottom 0
  background #fff
  overflow-y auto
  >.wrapper
    >.main
      padding 15px
      >.inp
        >input
          width 100%
          background #FBFBFB
          border 1px solid #ccc
          border-radius 4px
        >textarea
          width 100%
          background #FBFBFB
          border 1px solid #ccc
          border-radius 4px
          height 100px
          margin-top 15px
      >.confirm
        margin-top 30px
        >.cbtn
          width 216px
</style>
