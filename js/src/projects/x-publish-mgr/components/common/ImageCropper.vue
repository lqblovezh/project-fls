<script>
export default {
  props: {
    imageCropperDialog: {
      type: Boolean,
      default: false,
    },
    autoCropWidth: {
      type: Number,
      default: 250,
    },
    autoCropHeight: {
      type: Number,
      default: 150,
    },
    imgFile: String,
  },
  components: { VueCropper: () => import('vue-cropper/src/vue-cropper') },
  data() {
    return {
      model: false,
      modelSrc: '',
      crap: false,
      option: {
        img: this.imgFile,
        size: 1,
        full: false,
        outputType: 'png',
        canMove: true,
        fixedBox: true,
        original: false,
        canMoveBox: true,
        autoCrop: true,
        centerBox: false,
        high: true,
      },
      show: true,
    }
  },
  created() {
    console.log(this.imgFile)
  },
  methods: {
    startCrop() {
      // start
      this.crap = true
      this.$refs.cropper.startCrop()
    },
    stopCrop() {
      //  stop
      this.crap = false
      this.$refs.cropper.stopCrop()
    },
    clearCrop() {
      // clear
      this.$refs.cropper.clearCrop()
    },
    refreshCrop() {
      // clear
      this.$refs.cropper.refresh()
    },
    changeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    rotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    rotateRight() {
      this.$refs.cropper.rotateRight()
    },
    finish(type) {
      // 输出
      // var test = window.open('about:blank')
      // test.document.body.innerHTML = '图片生成中..'
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          console.log(data)
          // var img = window.URL.createObjectURL(data)
          // this.model = true
          // this.modelSrc = img
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.model = true
          this.modelSrc = data
        })
      }
    },
    finish2(type) {
      this.$refs.cropper2.getCropData(data => {
        this.model = true
        this.modelSrc = data
      })
    },
    finish3(type) {
      this.$refs.cropper3.getCropData(data => {
        this.model = true
        this.modelSrc = data
      })
    },
    down(type) {
      // event.preventDefault()
      var aLink = document.createElement('a')
      aLink.download = 'demo'
      // 输出
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          // this.downImg = window.URL.createObjectURL(data)
          // aLink.href = window.URL.createObjectURL(data)
          aLink.click()
        })
      } else {
        this.$refs.cropper.getCropData(data => {
          this.downImg = data
          aLink.href = data
          aLink.click()
        })
      }
    },
    uploadImg(e, num) {
      //上传图片
      // this.option.img
      var file = e.target.files[0]
      if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
        alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
        return false
      }
      var reader = new FileReader()
      reader.onload = e => {
        let data
        if (typeof e.target.result === 'object') {
          // 把Array Buffer转化为blob 如果是base64不需要
          // data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        if (num === 1) {
          this.option.img = data
        } else if (num === 2) {
          this.example2.img = data
        }
      }
      // 转化为base64
      // reader.readAsDataURL(file)
      // 转化为blob
      reader.readAsArrayBuffer(file)
    },
    imgLoad(msg) {
      console.log(msg)
    },
    colse() {
      this.$emit('update:imageCropperDialog', false)
    },
    addSelection() {
      this.$refs.cropper.getCropBlob(data => {
        console.log(data)
        this.$emit('preview', data)
      })
    },
  },
}
</script>

<template lang="pug">
el-dialog.vueCropper(
	:center="false"
	:visible.sync="imageCropperDialog"
	width="1000px"
	top="50px"
	:close-on-click-modal="false"
	:close-on-press-escape="false"
	append-to-body
	:before-close="colse"
	title="选择截图"
)
	.content
		vue-cropper(
			ref="cropper" :img="option.img" :output-size="option.size" :output-type="option.outputType" :info="true" :full="option.full"
			:can-move="option.canMove" :can-move-box="option.canMoveBox" :fixed-box="option.fixedBox" :original="option.original"
			:auto-crop="option.autoCrop" :auto-crop-width="autoCropWidth" :auto-crop-height="autoCropHeight" :center-box="option.centerBox"
			:high="option.high"
			@img-load="imgLoad" 
		)
	div(slot="footer" class="dialog-footer")
		el-button(type="info"  @click="colse") 取消
		el-button(type="primary"  @click="addSelection") 确定
</template>

<style lang="stylus" scoped>
.vueCropper
  >>> .el-dialog__body
    .vue-cropper
      height 70vh
</style>


