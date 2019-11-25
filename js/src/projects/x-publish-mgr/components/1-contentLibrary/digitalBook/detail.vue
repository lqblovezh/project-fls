<script>
import mulu from './mulu.json'
import { recursionTree } from '@/util/math.js'
import * as commonServices from 'services/common'
import * as myServices from 'services/x-publish/book'
import { synchronization } from 'services/common'
import { getIconStyle } from '@/util/mixins'

export default {
  props: ['type', 'detailData', 'detailDialog'],
  created() {
    if (this.detailData) {
      this.getDetail()
      this.getMulu()
      this.getToken()
    } else {
      this.metadata = this.detailDataOwn.attributes
    }
  },
  mixins: [getIconStyle],
  data() {
    return {
      detailDataOwn: {
        attributes: [],
      },
      metadata: [
        //扩展属性
      ],
      ml: null, //目录
      defaultProps: {
        //目录显示的字段
        children: 'children',
        label: 'chapter_name',
      },
      imageCropperDialog: false,
      oldBlob: null,
      currMulu: null, // 当前点击的目录
      previewImgUrl: null, // 图片预览
      imgUrl: null, // 图片上传后的真实url
      file: null, // 图书文件 //主文件用file
      importDialog: false,
      token: {},
    }
  },
  methods: {
    getDetail() {
      myServices
        .detailBooks({
          id: this.detailData.id,
        })
        .then(res => {
          // log(111,res)
          this.detailDataOwn = res.data
          if (!res.data.attributes) {
            res.data.attributes = []
          }
          this.metadata = res.data.attributes
        })
    },

    getMulu() {
      myServices
        .getBookCatalog({
          id: this.detailData.id,
        })
        .then(res => {
          // this.ml = res.data.data
          var mulu = recursionTree(res.data, 'pid', 'root')
          // log('目录',mulu);
          this.ml = mulu
          this.currMulu = mulu
        })
    },
    getToken() {
      commonServices.getClientToken().then(res => {
        // log("token",res)
        this.token = res.data
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.name == 'ml') {
        this.currMulu = this.ml
      }
    },
    handleNodeClick(data, node, obj) {
      // 目录节点节点事件
      this.currMulu = node.data.children
    },
    muluSort(item, index, type) {
      var currMulu = this.currMulu
      if (type === 'up') {
        if (index > 0) {
          currMulu.splice(index, 1)
          currMulu.splice(index - 1, 0, item)
        }
      } else {
        currMulu.splice(index, 1)
        currMulu.splice(index + 1, 0, item)
      }
      // log('发送请求',type)
      myServices.siblingSort({
        id: item.id,
        sort: type,
      })
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
    async upLoadXml() {
      if (this.file) {
        var progress = this.$progress()
        await commonServices
          .getTask(
            this.file,
            {
              is_chunk: true,
              size: 1024 * 1024,
            },
            num => {
              progress.percentage = num
            }
          )
          .then(res => {
            this.detailDataOwn.preview = res.data.path
          })
        progress.close()
      }
    },
    async submitDetail(formName) {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      // if(!this.detailDataOwn.preview  ){
      //   this.$message.error("请上传文件后,点击确定导入")
      //   return
      // }
      var progress = this.$progress()
      try {
        if (this.imgFiles) {
          if (this.oldBlob) {
            this.imgFiles = this.oldBlob
            this.imgFiles.name = 'img'
          }
          await commonServices.getTask(this.imgFiles).then(res => {
            this.detailDataOwn.img = res.data.path
          })
        }
        if (!this.detailDataOwn.img) {
          this.$message.error('请导入封面!')
          progress.close()
          return
        }
        if (this.detailDataOwn.id) {
          await myServices.modifyBooks(this.detailDataOwn)
        } else {
          await myServices.addBooks(this.detailDataOwn)
        }
        this.$emit('detailBack')
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
      progress.close()
    },
    submitMetadata() {
      // 提交扩展属性
    },
    previewImg(e) {
      //预览图
      var node = e.target
      var file = node.files[0]
      this.imgFiles = file
      this.imgFile = URL.createObjectURL(file)
      // this.previewImgUrl = URL.createObjectURL(file)
      this.$ImageSize({ file: file, ratio: 0.73, interval: 0.05 }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(file)
        },
        err => {
          console.log(err)
          if (err.status == 201) {
            this.imageCropperDialog = true
            return
          }
          this.$message.error(err.message)
        }
      )
    },
    previewBook(e) {
      var node = e.target
      var file = node.files[0]
      this.file = file
      dir(file, 'file')
    },
    syncInfo() {
      //同步信息
      let id = this.$refs.isbn.value
      if (!id) return
      synchronization({
        id,
      })
        .then(res => {
          const {
            bookname, //图书名称
            writer, //作者
            isbn, //ISBN
            bookbrief, //简介
          } = res.data
          this.$set(this.detailDataOwn, 'name', bookname)
          this.$set(this.detailDataOwn, 'abs', bookbrief)
          this.$set(this.detailDataOwn, 'author', writer)
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    preview(data) {
      this.previewImgUrl = URL.createObjectURL(data)
      this.oldBlob = data
      this.imageCropperDialog = false
    },
  },
}
</script>

<template lang="pug">
.div
	.dialogs
		ImageCropper(
			v-if="imageCropperDialog"
			ref="imageCropper"
			:imageCropperDialog.sync="imageCropperDialog"
			:imgFile="imgFile"
			:autoCropWidth="290"
			:autoCropHeight="400"
			@preview="preview"
		)
		el-dialog(
			width="400px"
			title="内层Dialog"
			:visible.sync="importDialog"
			append-to-body
		)
			.center
				el-button(type="primary" size="small" plain)
					a( :href="'xswitch://'+token.token"  ) 点击 调用exe
				el-button(type="primary" size="small" plain ) xxxx
		el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="detailReadOnly" type="primary" size='small' plain) 修改
		el-tabs( :value="type" @tab-click="handleClick")
			//- 详情
			el-tab-pane( label="详情" name="xq")
				.div
					VaForm( ref="detailForm"  )
						form.detailForm( ref="detailForm")
							fieldset(:disabled="detailReadOnly")
								.group
									.label ISBN或DOI:
									input.form-control.grid-content(v-model="detailDataOwn.isbn" ref="isbn"  type="text" maxlength="15")
									el-button(@click="syncInfo" type="primary" size='small') 同步
								.group
									.label *名称:
									input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" maxlength="20")
								TypeMsg(:detailDataOwn="detailDataOwn" name="数字图书")
								.group
									.label *作者:
									input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.author"    type="text" maxlength="10")
								.group
									.label *标签:
									input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.tag"   type="text"  maxlength="10")
								.group
									.label 简介:
									textarea.textarea( v-model="detailDataOwn.abs"   type="text" maxlength="300" )
								.group(style="width:50%;float:left")
									.label *设置封面:
									label
										el-button(size="mini" type="primary" @click="$refs.fenmian.click()") 导入封面
										input.hide( @change="previewImg" type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" )
								.group(style="width:50%;float:right")
									.label 图书稿件:
									label
										el-button(size="mini " type="primary"  @click="$refs.tushu.click()" ) 选择ZIP
										el-button(size="mini " type="primary"  @click="upLoadXml" ) 导入
										input.hide( @change="previewBook" type="file"  ref="tushu" accept="application/zip"  )
									div
										.label 当前书稿:
										span(v-text="file.name" v-if="file")
								.group
									.label
									img.previewImgUrl(:src="previewImgUrl || detailDataOwn.img_src"   )
								p.imgSizeWrap
									span.imgSize 建议图片大小：290*400px
							.btns
								el-button( ype="info" @click=" $emit('update:detailDialog', false)") 取消
								el-button(@click="submitDetail('detailForm')" type="primary" v-if="!detailReadOnly") 确定
			//- 扩展属性
			el-tab-pane( label="扩展属性" name="data" )
				MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)" :readOnly="detailReadOnly")
			//-  目录
			el-tab-pane( label="目录" name="ml" )
				.muluWrap
					.left
						el-tree.muluList( :data="ml" :props="defaultProps" node-key="id" @node-click="handleNodeClick" )
					.right
						fieldset(:disabled="detailReadOnly")
							table.table
								thead
									tr
										th(width=50) 序号
										th  名称
										th(width=110)  调序
								tbody
									tr(v-for="(item ,index) in currMulu")
										th(v-text="index+1")
										th.th-name(v-text="item.chapter_name")
										th
											.div
												el-button.iconRotate.up( @click="index!=0&&muluSort(item,index , 'up')" :disabled="index==0"  icon="el-icon-back" size="mini")
												el-button.iconRotate.down( @click="(index+1)!=currMulu.length&&muluSort(item,index , 'down')" :disabled="(index+1)==currMulu.length"  icon="el-icon-back" size="mini")
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
