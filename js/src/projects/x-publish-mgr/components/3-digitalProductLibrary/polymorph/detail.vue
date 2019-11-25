<script>
import VaForm from '@/components/common/VaForm'

import mulu from './mulu.json'
import {
  recursionTree
} from '@/util/math.js'
import * as commonServices from "services/common"
import * as services from "services/x-publish/mult_book"


export default {
  props: ['type', 'detailData', 'detailDialog'],
  created() {
    log("detail", this.detailData)
    if (this.detailData) {
      this.getDetail();
      this.getMulu();
    } else {
      this.metadata = this.detailDataOwn.attributes;
    }
  },
  data() {
    return {
      services,
      detailDataOwn: {
        attributes: [],
      },
      metadata: [ //扩展属性
      ],
      ml: null, //目录
      defaultProps: { //目录显示的字段
        children: 'children',
        label: 'chapter_name'
      },
      currMulu: null, // 当前点击的目录
      previewImgUrl: null, // 图片预览
      imgUrl: null, // 图片上传后的真实url
      file: null, // 图书文件 //主文件用file
    };
  },
  methods: {
    getDetail() {
      services.detail({
        id: this.detailData.id
      }).then(res => {
        log(111, res)
        this.detailDataOwn = res.data
        if (!res.data.attributes) {
          res.data.attributes = [];
        }
        this.metadata = res.data.attributes;
      })
    },
    getMulu() {
      console.log(1)
      services.getCatalog({
        id: this.detailData.id
      }).then(res => {
        // this.ml = res.data.data
        log("目录", res)
        var mulu = recursionTree(res.data, "pid", "root")
        this.ml = mulu
        this.currMulu = mulu
      })
    },

    handleClick(tab, event) {
      console.log(tab, event);
      if (tab.name == 'ml') {
        this.currMulu = this.ml;
      }
    },
    handleNodeClick(data, node, obj) { // 目录节点节点事件
      this.currMulu = node.data.children
    },
    muluSort(item, index, type) {
      var currMulu = this.currMulu
      if (type === 'up') {
        if (index > 0) {
          currMulu.splice(index, 1, )
          currMulu.splice(index - 1, 0, item)
        }
      } else {
        currMulu.splice(index, 1, )
        currMulu.splice(index + 1, 0, item)
      }
      services.siblingSort({
        id: item.id,
        sort: type
      })
      log('发送请求', type)
    },
    addMetadata() { //新增扩展属性
      this.metadata.push({
        name: '',
        value: ''
      })
    },
    delMetadata(index) { //删除扩展属性
      this.metadata.splice(index, 1)
    },

    async submitDetail(formName) {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      var progress = this.$progress();
      try {
        if (this.imgFile) {
          await commonServices.getTask(this.imgFile).then(res => {
            this.detailDataOwn.img = res.data.path
          })
        }
        if (this.detailDataOwn.id) {
          await services.modify(this.detailDataOwn)
        }
        this.$emit('detailBack', true)
      } catch (error) {
        this.$message.error("上传出错!")
      }
      progress.close();
    },

    submitMetadata() { // 提交扩展属性

    },
    previewImg(e) { //预览图
      var node = e.target;
      var file = node.files[0];
      this.imgFile = file;
      log(1111111111)
      this.previewImgUrl = URL.createObjectURL(file);
    },
    previewBook(e) {
      var node = e.target;
      var file = node.files[0];
      this.file = file;
      dir(file, 'file');
    },
    exportFile() { // 导出

    }

  },
  components: {
    VaForm
  }
};
</script>

<template lang="pug">
.div
	el-tabs( :value="type" @tab-click="handleClick")
		el-tab-pane( label="详情" name="info")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm( ref="detailForm"  )
						.group
							.label *名称:
							input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" )
						TypeMsg(:detailDataOwn="detailDataOwn" :name="detailDataOwn.type")
						.group
							.label 作者:
							input.form-control(    v-model="detailDataOwn.author"    type="text" )
						.group
							.label 标签:
							input.form-control( v-model="detailDataOwn.tag"   type="text"  )
						.group
							.label 简介:
							textarea.textarea(  v-model="detailDataOwn.abs"   type="text"  )
						.group
							.label 设置封面:
							label
								el-button(size="mini" type="primary" @click="$refs.fenmian.click()") 导入封面
								//- el-button(size="mini " type="primary"  @click="$refs.tushu.click()" ) 导入xml
								input.hide( @change="previewImg" type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" )
								input.hide( @change="previewBook" type="file"  ref="tushu"  )
						.group
							.label
							img.previewImgUrl(:src="previewImgUrl || detailDataOwn.img_src"   )
						p.imgSizeWrap
							span.imgSize 建议图片大小：118*160px
							.label(v-if="file") 图书稿件:
								span(v-text="file.name")
								el-button(size="mini " type="primary"  @click="upLoadXml" ) 确定导入
						.group
							.label
							a(:href='detailData.path_src' download="e")
								el-button(size="mini" type="primary") 导出
						.btns
							el-button(type="info" @click=" $emit('update:detailDialog', false)") 取消
							el-button(@click="submitDetail('detailForm')" type="primary" ) 确定
		//- 扩展属性
		el-tab-pane( label="扩展属性" name="data" )
			MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)" )


		//- 目录
		el-tab-pane( label="目录" name="ml" )
			.muluWrap
				.left
					el-tree.muluList( :data="ml" :props="defaultProps" node-key="id" @node-click="handleNodeClick" )
				.right
					table.table
						thead
							tr
								th(width=50) 序号
								th  名称
								// th(width=110)  调序
						tbody
							tr(v-for="(item ,index) in currMulu")
								th(v-text="index+1")
								th(v-text="item.chapter_name")
								// th
								//   .div
								//     el-button( @click="muluSort(item,index , 'up')"   icon="el-icon-sort-up" size="mini")
								//     el-button( @click="muluSort(item,index , 'down')"  icon="el-icon-sort-down" size="mini")
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
    width calc( 100% - 300px)
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
