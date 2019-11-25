<script >
import VaForm from '@/components/common/VaForm'
import { getDefaultInfo } from 'services/x-read/defaultAudio'
import { resetDefaultAudio } from 'services/x-read/defaultAudio'
import { getTask } from 'services/common/index'
// import formSerialize from 'form-serialize'
export default {
  data() {
    return {
      defaultAudioInfo: '',
      mediaFile: null, // 用于记录每次导入的文件信息
      coverFile: null, // 封面文件
      previewImgUrl: null, // 详情图片本地预览
      previewMediaUrl: null, // 媒体文件预览
      mediaType: 'voice',
      mediaTypeName: '音频',
    }
  },
  mounted() {
    this.getAudioInfo()
  },
  methods: {
    async getAudioInfo() {
      await getDefaultInfo().then(res => {
        this.previewImgUrl = res.data.img_src
        this.previewMediaUrl = res.data.preview_src
      })
    },
    previewImg(e) {
      //预览图
      var node = e.target
      var file = node.files[0]
      this.coverFile = file
      this.previewImgUrl = URL.createObjectURL(file)
    },
    previewMedia(e) {
      //上传预览视频
      var node = e.target
      var file = node.files[0]
      this.mediaFile = file
      dir(file)
      this.previewMediaUrl = URL.createObjectURL(file)
    },
    async submit() {
      try {
        await resetDefaultAudio(
          [this.mediaFile, this.coverFile],
          [this.previewMediaUrl, this.previewImgUrl]
        ).then(res => {
          return res.data.path
        })
        this.$message.success('媒体文件上传成功!')
      } catch (e) {
        console.error(e)
        this.$message.error('媒体文件上传失败!')
        return
      }
    },
  },
}
</script>
<template lang="pug">
.mainRight
	.contentWrap
		.contentLeft
			.maindata
				.box
					.tableWrap
						.tableTop
							.title.vel-line
								span 默认音频(默认为用户打开任何音频是播放音频，建议上传出版社介绍音频)
					.AudioInfo
						.videoAddr
							p 默认音频:
							audio(:src="previewMediaUrl" ref="media" controls)
						.select
							el-button(size="mini" type="primary" style="margin-top:20px" @click="$refs.meidaFile.click()" plain) 音频上传
							input.hide( @change=" previewMedia "  type="file"  ref="meidaFile"  :accept=" mediaType && mediaType == 'voice' ? $config.voiceAccept : $config.videoAccept")
						.imgAddr
							p 默认封面:
							img.coverImg(:src="previewImgUrl")
						.select
							el-button(size="mini" type="primary" style="margin-top:20px" @click="$refs.coverInput.click()" plain) 图片上传
							input.hide( @change="previewImg"   type="file"  ref="coverInput"  :accept="$config.imgAccept")
							.submit
								el-button(size="mini" type="primary" @click="submit()" plain) 确定
</template>

<style lang="stylus" scoped>
.box
  background #fff
  height 600px
  width 1663px
  position relative
  top 20px
  .AudioInfo
    width 100%
    height auto
    margin-top 10px
    background #fff
    p
      color #333
      font-size 14px
      line-height 20px
      padding 10px
  .select, img
    padding-left 10px
  .coverImg
    width 250px
    height 140px
  .submit
    margin-top 20px
  .videoAddr
    height 90px
</style>
