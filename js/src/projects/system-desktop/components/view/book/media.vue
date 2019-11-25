<script>
import defaultImage from '@/components/view/img/default.png'

export default {
  props: {
    title: {
      type: String,
      default: '插入音视频',
    },
    isMust: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      videoList: [],
      audioList: [],
      currentItem: {},
      defaultImage,
    }
  },
  mounted() {},
  methods: {
    addVideo() {
      this.videoList.push({
        video_name: 'video',
        video_img: '',
        video_preview: '',
      })
    },
    addAudio() {
      this.audioList.push({
        audio_name: 'audio',
        audio_img: '',
        audio_preview: '',
      })
    },
    delVideo(index) {
      this.videoList.splice(index, 1)
    },
    delAudio(index) {
      this.audioList.splice(index, 1)
    },
    choice(item, type, file) {
      this.currentItem = item
      if (type) {
        this.$refs.updateFile.setAttribute('accept', file || '.mp3')
        this.$refs.updateFile.click()
        return
      }
      this.$refs.updateImg.click()
    },
    async previewImg(e) {
      let node = e.target
      let file = node.files[0]
      const { url, path } = await this.$globalUpdateFile(file)
      this.$set(this.currentItem, 'video_img', path)
      this.$set(this.currentItem, 'audio_img', path)
      this.$set(this.currentItem, 'img_src', url)
      this.$refs.updateImg.setAttribute('type', 'text')
      this.$refs.updateImg.setAttribute('type', 'file')
    },
    async previewFile(e) {
      let node = e.target
      let file = node.files[0]
      const { url, name, path } = await this.$globalUpdateFile(file)
      this.$set(this.currentItem, 'video_preview', path)
      this.$set(this.currentItem, 'audio_preview', path)
      this.$set(this.currentItem, 'preview_name', name)
      this.$refs.updateFile.setAttribute('type', 'text')
      this.$refs.updateFile.setAttribute('type', 'file')
    },
  },
}
</script>

<template lang="pug">
.media
  p.title(:class='{must:isMust}')
    span {{title}}
    slot(name="title")
  VaForm(ref="detailForm")
    form.detailForm
      .group
        .label 视频（MP4）：
        .list
          .large(v-for="item,index in videoList" :key="'video'+index")
            .group
              .label {{index+1}}. 视频名称
              el-input.small(size='small' v-model="item.video_name")
            .group
              .label 封面上传
              img.preveImage(:src="item.img_src||defaultImage")
              el-button(type="primary" plain size="small" @click="choice(item)") 浏览
            .group
              .label 视频文件
              el-input.small(size='small' v-model='item.preview_name' disabled)
              el-button(type="primary" size="small" @click="choice(item,true,'.mp4')") 浏览
              el-button(type="danger" icon="el-icon-delete" size="small" @click="delVideo(index)") 删除
        .btns
          el-button(type="primary" icon="el-icon-plus" size="mini" @click="addVideo") 新增
      .group
        .label 音频（MP3）：
        .large(v-for="item,index in audioList" :key="'audio'+index")
          .group
            .label {{index+1}}. 音频名称
            el-input.small(size='small' v-model="item.audio_name")
          .group
            .label 封面上传
            img.preveImage(:src="item.img_src||defaultImage")
            el-button(type="primary" plain size="small" @click="choice(item)") 浏览
          .group
            .label 音频文件
            el-input.small(size='small' v-model='item.preview_name' disabled)
            el-button(type="primary" size="small" @click="choice(item,true,'.mp3')") 浏览
            el-button(type="danger" icon="el-icon-delete" size="small" @click="delAudio(index)") 删除
        .btns
          input.hide(type="file" @change="previewImg($event)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
          input.hide(type="file" @change="previewFile($event)" ref="updateFile" accept=".mp3")
          el-button(type="primary" icon="el-icon-plus" size="mini" @click="addAudio") 新增
</template>

<style lang="stylus" scoped>
.media
  .title.must
    position relative
    font-size 16px !important
    &:before
      content '*'
      position absolute
      color #fb7f72
      left -15px
      top 10px
  .detailForm
    >.group
      border-bottom 1px solid #ddd
      padding-bottom 20px
      &:last-child
        border none
      .large
        padding-top 8px
        // border-bottom 1px solid #ddd
        // &:last-child
        // border none
</style> 

