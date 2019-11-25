<script>
import * as services from 'services/common'
import * as myServices from 'services/x-publish/home'
import {main} from '@/util/mixins'
export default {
  mixins: [main],
  data() {
    return {
      services,
      myServices,
      tplUrl: '', // 模板地址
      isUploading: false, // 是否正在上传
      typeError: false, // 文件格式错误
      errorMsg: '格式错误，请重新上传！', // 错误信息
      percentOfFile: 0, // 上传文件进度
      title: '请按照以下格式上传文件', // 标题
      proStatus: '', // 进度条状态
    }
  },
  methods: {
    // 显示dialog
    init() {
      this.typeError = false
      this.isUploading = false
      this.percentOfFile = 0
      this.title = '请按照以下格式上传文件'
      this.proStatus = ''
    },
    // 获取模板下载地址
    getTplUrls() {
      myServices.getTplUrl().then(res => {
        this.urls = this.getCurTplUrl(res.data)
      })
    },
    getCurTplUrl(urls) {
      const paths = this.$route.path.split('/')
      const path = paths[paths.length-1]
      switch(path) {
        case 'imgs':
          this.tplUrl = urls.img_url
          break
        case '3D':
          this.tplUrl = urls['3d_url']
          break
        case 'article':
          this.tplUrl = urls.article_url
          break
        case 'ARandVR':
          this.tplUrl = urls.arvr_url
          break
        case 'voices':
          this.tplUrl = urls.audio_url
          break
        case 'digitalBook':
          this.tplUrl = urls.e_book_url
          break
        case 'H5':
          this.tplUrl = urls.h5_url
          break
        case 'videos':
          this.tplUrl = urls.video_url
          break
        case 'panorama':
          this.tplUrl = urls.panorama_url
          break
        default:
          this.tplUrl = urls.whole_book_url
      }
    },
    // 文件选择，并调用发送文件名称方法
    async uploadFile(evt) {
      const zipFile = evt.target.files[0]
      const {name} = zipFile
      if (!(/\.(zip|rar|7z)$/ig.test(name))) {
        this.typeError = true
        return
      }
      if (zipFile) {
        log('=== 上传 ===')
        this.isUploading = true
        this.title = '压缩包上传中，请不要退出，关闭系统'
        let res
				this.$message.success("压缩包上传中，请不要退出，关闭系统你可以在文件传输中查看进度")
        try {
          res = await services.getTask(zipFile,     {is_chunk: true}, percentage => {
          this.percentOfFile = percentage
          })
        } catch(e) {
          this.proStatus = 'exception'
        }
        const {data} = res
        if (data.completed) {
          this.percentOfFile = data.chunks_completed_percent
          this.proStatus = 'success'
          const {path} = data
          this.$emit('upload', {temp: path, name: name})
        }
      }
    }
  },
  created() {
    this.getTplUrls()
  }
}
</script>
<template lang="pug">
.uploadWrap
  .maindata.center
    .articleWrap
      p.title {{title}}
      a(:href="tplUrl" download="模板" v-if="!isUploading")
        span.left
        |模板下载
    .hide
      input(type="file"  ref="fenmian"  accept=".zip,.rar" @change="uploadFile")
    .taskBtns(v-if="!isUploading")
      .btns
        el-button(
          size="medium"
          type="primary"
          @click="$refs.fenmian.click()"
        )
          span.left
          |上传压缩包
        p.error(v-if="typeError")
          span.left
          | {{errorMsg}}
    el-progress.tProgress.aProgress(:percentage="percentOfFile"
    :status="proStatus" v-if="isUploading")
    el-button.reUpload(
        size="medium"
        type="primary"
        v-if="isUploading"
        @click="init"
      ) 重新上传
</template>
<style lang="stylus" scoped>
@import "~common/stylus/mixin"
.uploadWrap
  p.title
    margin-bottom 10px
    font-weight normal
  a
    display inline-block
    width 100px
    height 16px
    line-height 16px
    padding 10px 20px
    font-size 14px
    color #44c3aa
    border 1px solid #44c3aa
    border-radius 4px
    span.left
      display inline-block
      margin-right 10px
      width 20px
      height 15px
      bg-image('icon-download')
  .btns
    position relative
    display inline-block
    .el-button
      margin-right 0
      height 38px
      .left
        display inline-block
        margin-right 10px
        width 20px
        height 15px
        bg-image('icon-page-uplaod')
    p.error
      position absolute
      left 120px
      top 0
      width 210px
      padding 10px 20px
      line-height 16px
      span.left
        display inline-block
        margin-right 10px
        width 20px
        height 15px
        bg-image('icon-upload-error')
.reUpload
  margin-top 50px
</style>
