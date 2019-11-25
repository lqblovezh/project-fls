<script>
import * as commonServices from 'services/common'
import Progress from 'projects/x-publish-mgr/components/common/UploadProgress'

export default {
  components: { Progress },
  props: ['ue', 'type'], //得到ue实例和传入类型
  created() {
    console.log(this.ue)
  },
  mounted() {},
  data() {
    return {
      showImgUrl: null, // 封面前端url
      localUrl: null, // 本地
      linkUrl: null, //外链
      file: null,
      percentage: 0, //进入百分比
      fileUrl: null, // 上传回传地址
      importType: 'local', // local | link
    }
  },
  computed: {
    accept() {
      var name = this.type + 'Accept'
      return this.$config[name]
    },
    command() {
      //根据类型插入
      var name = this.type + 'Command'
      return this.$config[name]
    },
  },
  methods: {
    showImgLocal(e) {
      var file = e.target.files[0]
      if (file) {
        //如果没选, 为null会报错
        this.file = file
        this.localUrl = URL.createObjectURL(file)
      }
    },
    back() {
      //关闭模态框
      this.$emit('cancle')
    },
    async commit() {
      if (this.importType == 'local') {
        if (this.file) {
          //如果文件存在
          var progress = this.$progress()
          await commonServices
            .getTask(this.file, { is_chunk: true, size: 1024 * 1024 }, num => {
              progress.percentage = num
            })
            .then(res => {
              this.fileUrl = res.data.url
              this.ue.execCommand(this.command, {
                src: res.data.url,
                url: res.data.url,
              })
              progress.close()
              this.back()
            })
        } else {
          this.$message.error('请先选择文件!')
        }
      } else if (this.importType == 'link') {
        this.ue.execCommand(this.command, {
          src: this.linkUrl,
          url: this.linkUrl,
        })
        this.back()
      }
    },
  },
}
</script>

<template lang="pug">
.div
  //- Progress( :percentage="percentage" v-if="percentage")
  .wrap
    form.detailForm
      .group
        .label 导入方式:
        span
          span
            input(type="radio"  name="methd" value="local" v-model="importType" )
            |本地
          span
            input(type="radio"   name="methd"  value="link" v-model="importType" )
            |外链
      .local(v-if="importType == 'local' ")
        .group
          .label
          el-button( @click="$refs.media.click()"      type='primary' size="small" plain  ) 选择
          input.hide(type="file"  @change="showImgLocal" ref="media"   :accept="accept")
        .group
            .label
            span.imgShow
              img( :src="localUrl" v-if="type=='img' && localUrl" )
              video(:src="localUrl"  controls v-if="type=='video' && localUrl" )
              audio(:src="localUrl" controls  v-if="type=='audio' && localUrl "  )
      .link(v-if="importType == 'link' ")
        .group
          .label 外链
          input.short.form-control(  ref="link"   v-model="linkUrl"   )
        .group
          .label
          span.imgShow
            img( :src="linkUrl" v-if="type=='img'  && linkUrl " )
            video(:src="linkUrl"  controls v-if="type=='video'  && linkUrl " )
            audio(:src="linkUrl" controls  v-if="type=='audio'  && linkUrl "  )

  .btns
    el-button( @click="back"  type="info" ) 取消
    el-button(@click="commit"  type="primary" ) 确定

</template>


<style lang="stylus" scoped>
.btns
  text-align right
.label
  display inline-block
  text-align right
  padding-right 20px
  min-width 100px
  color #000
.group
  line-height 38PX
  margin 10px 0
  & >span >span
    margin-right 20px
  .imgShow
    display inline-block
    img, video, audio
      width 450px
</style>
