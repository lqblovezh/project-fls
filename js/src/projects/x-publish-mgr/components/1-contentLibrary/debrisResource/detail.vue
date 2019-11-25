<script>
import * as commonServices from 'services/common'
import * as myServices from 'services/x-publish/debris'
import { getIconStyle } from '@/util/mixins'
import formSerialize from 'form-serialize'
import { imgUploadBtn, videoUploadBtn, voiceUploadBtn } from '../article/UEBtns'
import UeUpload from '../article/UeUpload'
import { log } from 'util'

export default {
  props: ['type', 'detailData', 'detailDialog'],
  components: { UeUpload },
  created() {
    if (this.detailData) {
      this.getDetail()
    } else {
      this.metadata = this.detailDataOwn.attributes
    }
  },
  mixins: [getIconStyle],
  data() {
    return {
      detailDataOwn: {},
      metadata: [], //扩展属性
      uploadDialog: false, //图片上传
      testDialog: false, //图片上传
      uploadType: 'img', //上传类型
      ue: null,
    }
  },
  async mounted() {
    await this.getDetail()
    this.UeUploadBtn()
    this.ue = UE.getEditor('editor')
    this.ue.addListener('ready', () => {
      this.ueIsReady = true
      this.ue.setHeight(350)
      this.ue.execCommand('insertHtml', this.detailDataOwn.text)
    })
  },
  destroyed() {
    this.ue.destroy() // 必须销毁
  },
  methods: {
    UeUploadBtn() {
      imgUploadBtn(this,null,'editor') //位置影响按钮排序
      videoUploadBtn(this,'','editor')
      voiceUploadBtn(this,'','editor')
    },
    getDetail() {
      if (this.detailData && this.detailData.id) {
        return myServices
          .detailDebris({
            id: this.detailData.id,
          })
          .then(res => {
            this.detailDataOwn = res.data
            if (!res.data.attributes) {
              res.data.attributes = []
            }
            this.metadata = res.data.attributes
          })
      }
    },
    openUploadDialog(type) {
      this.uploadType = type
      this.uploadDialog = true
      console.log(this.uploadDialog)
    },
    async submitDetail() {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      try {
        if (this.detailDataOwn.id) {
          await myServices.modifyDebris({...this.detailDataOwn,text:this.ue.getContent()})
        } else {
          await myServices.addDebris({...this.detailDataOwn,text:this.ue.getContent()})
        }
        this.$emit('detailBack')
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    submitMetadata() {
      // 提交扩展属性
    },
  },
  computed: {
    switchTypeName() {
      switch (this.uploadType) {
        case 'img':
          return '图片'
        case 'video':
          return '视频'
        case 'voice':
          return '音乐'
      }
    },
  },
  watch: {
    ueIsReady() {},
  },
}
</script>

<template lang="pug">
.div
	.dialogs
		el-dialog.testclass(
			:center="false"
			:visible.sync="uploadDialog"
			:close-on-click-modal="false"
			v-if="uploadDialog"
			top="50px"
			width="800px"
			:title="'上传'+ switchTypeName"
			append-to-body
		)
			UeUpload(:ue="ue" :type="uploadType"  @cancle="uploadDialog = false")
	//- el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="detailReadOnly" type="primary" size='small' plain) 修改
	el-tabs( :value="type")
		//- 详情
		el-tab-pane( label="基本信息" name="xq")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm( ref="detailForm")
						fieldset(:disabled="false")
							.group
								.label *内容名称:
								input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" maxlength="20")
							.group
								.label
									span.types 类型:
										span.shallow-color()
									span 大小：
										span.shallow-color() {{detailDataOwn.word_size}}
									span  资源序号:
										span.shallow-color {{detailDataOwn.id}}
									span  创建时间:
										span.shallow-color {{detailDataOwn.create_time}}
							.group
								.label *内容详情:
								.editorWrap
									#editor
										<script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
						.btns
							el-button( type="info" @click=" $emit('update:detailDialog', false)") 取消
							el-button(@click="submitDetail()" type="primary") 确定
</template>


<style lang="stylus" scoped>
.grid-content
  width 300px
  margin-right 30px
.iconRotate
  i
    color red
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  max-width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
.muluWrap
  .left
    width 300px
    background red
    display inline-block
    overflow auto
  .right
    width calc(100% - 300px)
    display inline-block
    min-height 500px
.th-name
  height initial
.el-textarea
  width 720px
.imgSizeWrap
  height 30px
  margin-top 30px
  .imgSize
    display inline-block
    line-height 20px
    margin-left 130px
    font-size 14px
    color #333
.editorWrap
  padding 15px
  background #fff
  display inline-block
  #editor
    line-height 1
    >>>.edui-editor-toolbarbox
      position static !important
    >>>.edui-editor-iframeholder
      // height 20px !important
.group>.label>span
  margin 0 15px
.group>.label>.types
  margin-left 38px
</style>
