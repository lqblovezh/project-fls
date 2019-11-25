<script>
import * as commonServices from "services/x-publish/common"
import {getTask} from "services/common"

export default {
  props: {
    detailDataOwn: Object,
  },
  data() {
    return {
      commonServices,
      isDefaultCover: false,
      metadata: [ //扩展属性
      ],
      previewImgUrl: null, // 详情图片本地预览
      previewMediaUrl: null, // 媒体文件预览
      previewOtherFileUrl: null, // 详情外链文件预览
      imgUrl: null, // 图片上传后的真实url
      fileMsg: { // 外链图片信息
        size: "", // 外链没有size
        format: "",
      },
      mediaFile: null, // 用于记录每次导入的文件信息
      coverFile: null, // 封面文件
      percentage: 0, // 上传百分比
      mediaTypeName: '视频',
      mediaType: 'video'
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addMetadata() { //新增扩展属性
      this.metadata.push({
        key: '',
        value: ''
      })
    },
    delMetadata(index) { //删除扩展属性
      this.metadata.splice(index, 1)
    },
    previewImg(e) { // 上传封面预览
      var node = e.target;
      this.coverFile = node.files[0];
      this.previewImgUrl = URL.createObjectURL(this.coverFile);
    },
    otherFile() { //外链文件
      var url = this.$refs.otherImgInput.value;
      if (!url) return
      //http://video19.ifeng.com/video09/2018/03/26/23436927-102-8987624-101226.mp4
      var urlt = url.split('?')[0];
      var format = urlt.substr(url.lastIndexOf('.') + 1);
      this.previewOtherFileUrl = url;
      this.fileMsg.format = format;
    },
    previewMedia(e) { //上传预览视频
      var node = e.target;
      var file = node.files[0];
      this.mediaFile = file;
      dir(file)
      if (file && file.size > 3000 * 1024 * 1024 * 1024) {
        this.$message.errot('文件过大!请小于3G')
        return;
      }
      this.detailDataOwn.size = file.size;
      this.detailDataOwn.format = file.name.substr(file.name.lastIndexOf('.') + 1);
      this.previewMediaUrl = URL.createObjectURL(file);
    },
    hasFile() {
      if (this.detailDataOwn.img_status) { //

      } else { // 本地文件形式

      }
    },
    setDefaultCover() {
      log("设置默认封面")
      this.commonServices.getDefaultCover().then(res => {
        // this.detailDataOwn.img = res.data ;
        this.previewImgUrl = res.data.url
        this.$set(this.detailDataOwn, 'img', res.data.path)
        // log(res);
        this.isDefaultCover = true;
      })
    },
    async submitDetail(formName) { //详情提交
      log("提交")
      var flag = this.$refs.detailFormVali.valiAll()
      if (!flag) return //log("验证失败")
      var loading = null;
      var fileMsg = null;

      if (this.detailType === "wailian") { //如果是外链
        log("外")
        var url = this.previewOtherFileUrl;
        this.detailDataOwn.preview = url;
        fileMsg = this.fileMsg;
        var loading = this.$loading({
          text: "正在上传",
          background: "rgba(0, 0, 0, 0.8)"
        })
        if (this.coverFile) {
          await getTask(this.coverFile, ).then(res => { //都需要上传封面图文件
            this.detailDataOwn.img = res.data.path
          }).catch(res => {
            this.$message.error("图片上传失败!")
            return
          })
        } else if (!this.isDefaultCover) { //无改变重置封面
          this.detailDataOwn.img = null
        }
        var data = {
          ...this.detailDataOwn,
          ...fileMsg,
        }
        if (this.detailDataOwn.id) {
          await this.services.modify(data).then(res => {
            this.$emit('detailBack')

          })
        } else {
          await this.services.add(data).then(res => {
            this.$emit('detailBack')
          })
        }
        this.$nextTick(res => {
          loading.close()
        })

      } else { // 如果是上传
        // 先上传文件, 得到返回结果后 ,  再提交整个表单
        log("本地")
        try {
          if (this.mediaFile) {
            await getTask(this.mediaFile, {
              is_chunk: true,
              size: 1024 * 1024
            }, (num) => {
              this.percentage = num
            }).then(res => {
              this.detailDataOwn.preview = res.data.path
            })
          } else if (this.detailDataOwn.preview) { // 说明是详情进来,具有preview属性
            this.detailDataOwn.preview = null
          } else {
            this.$message.error("请导入文件!")
            return
          }
          if (this.coverFile) {
            await getTask(this.coverFile, ).then(res => { //都需要上传封面图文件
              this.detailDataOwn.img = res.data.path
            })
          } else if (!this.isDefaultCover) { //无改变重置封面
            this.detailDataOwn.img = null
          }
        } catch (e) {
          this.$message.error("媒体文件上传失败!")
          this.percentage = 0;
          return
        }
        log("this.detailDataOwn", this.detailDataOwn)

        this.percentage = 0;
        this.$emit("submit")
        this.$emit('detailBack')

        // this.$emit('update:detailDialog', false)

        // this.$emit("submit")
        // if(this.detailDataOwn.id){
        //   await this.services.modify(this.detailDataOwn).then(res=>{
        //     this.$emit('detailBack')
        //   })
        // }else {
        //   await this.services.add(this.detailDataOwn).then(res=>{
        //     this.$emit('detailBack')
        //   })
        // }
        // this.percentage = 0;
      }
    },
  },
  computed: {
    detailType() {
      if (this.detailDataOwn.img_status) {
        return "wailian"
      }
      return "bendi"
    }
  },

}
</script>

<template lang="pug">
.div
	UploadProgress(:percentage="percentage" v-if="percentage")
	VaForm( ref="detailFormVali"  )
		form.detailForm( ref="detailForm"  )
			.group
				.label 名称:
				input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" )
			.group
				.label 类型:
				span.types
					span( v-text="mediaTypeName || '视频' ")
					//- span  序号: {{detailDataOwn.id}}
					span  创建时间: {{detailDataOwn.create_time}}

			.group
				.label 作者:
				input.form-control(    v-model="detailDataOwn.author"    type="text" )
			.group
				.label 标签:
				input.form-control( v-model="detailDataOwn.tag"   type="text"  )
			.group
				.label 简介:
				textarea.textarea(  v-model="detailDataOwn.abs"   type="text"  )
			.type-file
				.group
					.label 详情:
					span
						span
							input(type="radio" name="method" :value="false" v-model="detailDataOwn.img_status" )
							|本地
						span
							input(type="radio"  name="method"  :value="true"   v-model="detailDataOwn.img_status" )
							|外链
				//- 外链 输入
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
								video( v-if="mediaType && mediaType != 'voice'" :src="previewMediaUrl || detailDataOwn.preview" controls)
								audio( v-if="mediaType && mediaType == 'voice'" :src="previewMediaUrl || detailDataOwn.preview" controls)
								span.msg
									.type 格式:
										span.val(v-text="detailDataOwn.format")
									.size 大小:
										span.val(v-text="(detailDataOwn.size / 1024).toFixed(2) +'KB' ")
									el-button(@click="$refs.meidaFile.click()"  size="mini"  type="primary"  plain) 导入
									el-button(@click=""   size="mini"  type="primary"  plain)
										a(:href="detailDataOwn.preview" target="_black")  导出
									el-button(@click="$refs.coverInput.click()"    size="mini" type="primary" plain) 上传封面
									el-button(@click="setDefaultCover"    size="mini"  type="primary" plain)  使用默认封面
						//- 外链
						.group.detailmain.wailian(v-show="detailType == 'wailian'")
							.label
							span.wrap
								video( v-if="mediaType && mediaType != 'voice'"  :src="previewOtherFileUrl || detailDataOwn.preview" controls)
								audio( v-if="mediaType && mediaType == 'voice'" :src="previewOtherFileUrl || detailDataOwn.preview" controls)

								span.msg
									.type 格式:
										span.val(v-text="fileMsg.format || detailDataOwn.format")
									el-button(@click="$refs.coverInput.click()"    size="mini"  type="primary" plain) 上传封面
									el-button(@click="setDefaultCover"    size="mini"  type="primary" plain)  使用默认封面
						//- 封面预览
						.group.detailmain
							.label 封面
							span.wrap
								img.coverImg(:src="previewImgUrl || detailDataOwn.img "   )
						//- 隐藏inputs
						div.hide
							input.hide( @change="previewImg"   type="file"  ref="coverInput"  :accept="$config.imgAccept")
							input.hide( @change=" previewMedia "  type="file"  ref="meidaFile"  :accept=" mediaType && mediaType == 'voice' ? $config.voiceAccept : $config.videoAccept")
	.btns.right
		el-button( type="info" @click=" $emit('back')") 取消
		el-button(@click="submitDetail('detailForm')" type="primary" ) 确定
</template>

<style lang="stylus" scoped>

</style>
