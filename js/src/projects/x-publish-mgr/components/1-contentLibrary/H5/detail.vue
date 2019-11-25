<script>
// import VaForm from  '@/components/common/VaForm'
import formSerialize from 'form-serialize'
import * as commonServices from 'services/common/'
import * as services from 'services/x-publish/library'
import UploadProgress from '@/components/common/UploadProgress'
import { getIconStyle } from '@/util/mixins'

export default {
  mixins: [getIconStyle],
  props: ['type', 'detailData', 'detailDialog', 'currGroup', 'detailBack'],
  components: { UploadProgress },
  created() {
    if (this.detailData.id) {
      log('查询元数据, 目录 , 数据本地化')
      services
        .detailLibrary({
          id: this.detailData.id,
        })
        .then(res => {
          log(111, res)
          this.detailDataOwn = res.data
          this.metadata = res.data.attributes
        })
      if (this.currGroup != 'non') {
        //当前分组id
        this.detailDataOwn.group_id = this.currGroup
      }
    } else {
      this.metadata = this.detailDataOwn.attributes
    }
  },
  data() {
    return {
      detailDataOwn: {
        img_status: false,
        attributes: [],
      },
      metadata: [
        //扩展属性
      ],
      previewImgUrl: null, // 详情图片本地预览
      previewMediaUrl: null, // 媒体文件预览
      previewOtherFileUrl: null, // 详情外链文件预览
      imgUrl: null, // 图片上传后的真实url
      fileMsg: {
        // 外链图片信息
        size: '', // 外链没有size
        format: '',
      },
      mediaFile: null, // 用于记录每次导入的文件信息
      coverFile: null, // 封面文件
      percentage: 0, // 上传百分比
    }
  },
  computed: {
    detailType() {
      if (this.detailDataOwn.img_status) {
        return 'wailian'
      }
      // return  "bendi"
      return 'wailian'
    },
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addMetadata() {
      //新增扩展属性
      this.metadata.push({
        key: '',
        name: '',
        value: '',
      })
    },
    delMetadata(index) {
      //删除扩展属性
      this.metadata.splice(index, 1)
    },
    previewImg(e) {
      // 上传封面预览
      var node = e.target
      this.coverFile = node.files[0]
      this.$ImageSizeCropper({
        file: this.coverFile,
        autoWidth: 236,
        autoHeight: 320,
      }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(this.coverFile)
        },
        data => {
          this.oldBlob = data
          this.previewImgUrl = URL.createObjectURL(data)
        }
      )
      // this.previewImgUrl = URL.createObjectURL(this.coverFile)
    },
    otherFile() {
      //外链文件
      var url = this.$refs.otherImgInput.value
      if (!url) return
      this.previewOtherFileUrl = url
      //http://video19.ifeng.com/video09/2018/03/26/23436927-102-8987624-101226.mp4
      // url = url.split('?')[0]  ;
      // var format = url.substr(url.lastIndexOf('.')+1 ) ;
      // this.fileMsg.format = format ;
    },
    previewMedia(e) {
      //上传预览视频
      var node = e.target
      var file = node.files[0]
      this.mediaFile = file
      dir(file)
      if (file && file.size > 3000 * 1024 * 1024 * 1024) {
        this.$message.errot('文件过大!请小于3G')
        return
      }
      this.detailDataOwn.size = file.size
      this.detailDataOwn.format = file.name.substr(
        file.name.lastIndexOf('.') + 1
      )
      this.previewMediaUrl = URL.createObjectURL(file)
    },
    async submitDetail(formName) {
      //详情提交
      log('提交')
      var flag = this.$refs.detailFormVali.valiAll()
      if (!flag) return //log("验证失败")
      var loading = null
      var fileMsg = null

      if (this.detailType === 'wailian') {
        //如果是外链
        log('外')
        var url = this.previewOtherFileUrl
        this.detailDataOwn.preview = url
        fileMsg = this.fileMsg
        var loading = this.$loading({
          text: '正在上传',
          background: 'rgba(0, 0, 0, 0.8)',
        })
        if (this.coverFile) {
          if (this.oldBlob) {
            this.coverFile = this.oldBlob
          }
          await commonServices
            .getTask(this.coverFile)
            .then(res => {
              //都需要上传封面图文件
              log('本地', res)
              this.detailDataOwn.img = res.data.path
            })
            .catch(res => {
              this.$message.error('图片上传失败!')
              return
            })
        } else {
          //无改变重置封面
          this.detailDataOwn.img = null
        }
        var data = {
          ...this.detailDataOwn,
          ...fileMsg,
        }
        if (this.detailDataOwn.id) {
          await services.modifyLibrary(data).then(res => {
            this.$emit('detailBack')
          })
        } else {
          await services.addLibrary(data).then(res => {
            this.$emit('detailBack')
          })
        }
        this.$nextTick(res => {
          loading.close()
        })
      } else {
        // 如果是上传
        // 先上传文件, 得到返回结果后 ,  再提交整个表单
        log('本地')
        try {
          if (this.mediaFile) {
            await commonServices
              .getTask(
                this.mediaFile,
                {
                  is_chunk: true,
                  size: 1024 * 1024,
                },
                num => {
                  this.percentage = num
                }
              )
              .then(res => {
                this.detailDataOwn.preview = res.data.path
              })
          } else {
            this.detailDataOwn.preview = null
          }
          if (this.coverFile) {
            if (this.oldBlob) {
              this.coverFile = this.oldBlob
            }
            await commonServices.getTask(this.coverFile).then(res => {
              //都需要上传封面图文件

              this.detailDataOwn.img = res.data.path
            })
          } else {
            //无改变重置封面
            this.detailDataOwn.img = null
          }
        } catch (e) {
          this.$message.error('媒体文件上传失败!')
          this.percentage = 0
          return
        }

        if (this.detailDataOwn.id) {
          await services.modifyLibrary(this.detailDataOwn).then(res => {
            this.$emit('detailBack')
          })
        } else {
          await services.addLibrary(this.detailDataOwn).then(res => {
            this.$emit('detailBack')
          })
        }
        // this.$emit('update:detailDialog', false)
        this.percentage = 0
      }
    },
    submitMetadata() {
      // 提交扩展属性
      var flag = true
      for (var i = 0; i < this.metadata.length; i++) {
        if (
          this.metadata[i].key.trim() === '' ||
          this.metadata[i].value.trim() === ''
        ) {
          flag = false
        }
      }
      if (!flag) {
        this.$message.error('扩展属性不能为空!')
        return
      }
      if (this.detailDataOwn.id) {
        //修改
        services.modifyLibrary({
          id: this.detailDataOwn.id,
          attributes: this.metadata,
        })
      } else {
        //新增
        services.addLibrary({
          attributes: this.metadata,
        })
      }
      this.$emit('detailBack')
    },

    async confirmUploadFile() {
      //确定上传视频
    },
  },
}
</script>

<template lang="pug">
.div
	UploadProgress(:percentage="percentage" v-if="percentage")
	el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="detailReadOnly" type="primary" size='small' plain) 修改
	el-tabs( :value="type" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name="xq")
			.div
				VaForm( ref="detailFormVali"  )
					form.detailForm( ref="detailForm"  )
						fieldset( :disabled='detailReadOnly' )
							.group
								.label *名称:
								input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" )
							TypeMsg(:detailDataOwn="detailDataOwn" name="H5")
							// .group
							//   .label 作者:
							//   input.form-control(    v-model="detailDataOwn.author"    type="text" )
							.group
								.label 标签:
								input.form-control( v-model="detailDataOwn.tag"   type="text"  )
							.group
								.label 简介:
								textarea.textarea(  v-model="detailDataOwn.abs"   type="text"  )
							.group
								.label 详情:
								span
									span
										input(type="radio"  name="method"  checked="true" )
										|外链
							//- 外链输入
							.group.wailianinput(v-if="detailType == 'wailian'")
								.label
								span
									input.form-control( :value="previewOtherFileUrl ||  detailDataOwn.preview"  @input="otherFile" ref="otherImgInput" v-va="{type:'required'}" placeholder="请输入链接")
									//- span.confirmBtn
									//-   el-button(type="primary" size="mini" plain ) 确定
									//- 本地
									.group.detailmain(v-show="detailType == 'bendi'")
										.label
										span.wrap
											//- video( :src="previewMediaUrl || detailDataOwn.preview" controls)
											span.msg
												//- .type 格式:
												//-   span.val(v-text="detailDataOwn.format")
												.size 大小:
													span.val(v-text="(detailDataOwn.size / 1024).toFixed(2) +'KB'")
												el-button(@click="$refs.meidaFile.click()"      size="mini"  type="primary"  plain) 导入
												el-button(@click=""   size="mini"  type="primary"  plain) 导出
												el-button(@click="$refs.coverInput.click()"    size="mini" type="primary" plain) 上传封面
									//- 外链
									.group.detailmain.wailian(v-show="detailType == 'wailian'")
										.label
										span.wrap
											//- video( :src="previewOtherFileUrl || detailDataOwn.preview" controls)
											span.msg
												//- .type 格式:
												//-   span.val(v-text="fileMsg.format || detailDataOwn.format")
												el-button(@click="$refs.coverInput.click()"    size="mini"  type="primary" plain) 导入封面
									//- 封面预览
									.group.detailmain
										.label
										span.wrap
											img.coverImg(:src=" previewImgUrl || detailDataOwn.img_src")
									p.imgSizeWrap
										span.imgSize 建议图片大小：118*160px
									//- 隐藏inputs
									div.hide
										input.hide( @change="previewImg"   type="file"  ref="coverInput"  :accept="$config.imgAccept")
										input.hide( @change=" previewMedia "  type="file"  ref="meidaFile"  :accept="$config.videoAccept")
				.btns
					el-button( type="info" @click=" $emit('update:detailDialog', false)") 取消
					el-button(@click="submitDetail('detailForm')" type="primary" v-if="!detailReadOnly") 确定
		//- 扩展属性
		el-tab-pane( label="扩展属性"  name="data" )
			MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)" :readOnly="detailReadOnly")
</template>


<style lang="stylus" scoped>
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  width 250px
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
.imgSizeWrap
  height 30px
  margin-top 30px
  .imgSize
    display inline-block
    line-height 20px
    margin-left 130px
    font-size 14px
    color #333
</style>
