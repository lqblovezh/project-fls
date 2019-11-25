<script>
import { recursionTree } from '@/util/math.js'
import * as commonServices from 'services/common'
import * as myServices from 'services/x-publish/book'
import Vue from 'vue'

export default {
  props: [
    'type',
    'detailData',
    'detailDialog',
    'detailType',
    'defaultData',
    'services',
    'readOnly',
  ],
  created() {
    // if(this.detailType!=8){
      console.log(this.readOnly, this.detailType)
      if (!this.defaultData && this.detailData) {
        if(this.detailData.id){
          this.getDetail()
          this.getMulu(this.detailData.id)
        }
      } else {
        const { attributes, chapters, components } = Object.entries(
          this.defaultData
        ).length
          ? this.defaultData
          : this.detailData
        let quality = components || this.defaultData
        if(this.getMainList){
          this.getMainList.forEach(element => {
          for (let key in quality) {
            if (key === element.label || key === element.name) {
              element.value = quality[key]
            }
          }
        })
        }
        if(this.detailType==6){
          this.detailDataOwn.封面 = quality.封面
        }else{
          this.detailDataOwn.资源地址 = quality.资源地址
        }
        this.metadata = attributes || []
        if (this.readOnly && chapters) {
          let mulu = recursionTree(chapters, 'pid', 'root')
          this.ml = mulu
          this.currMulu = mulu
        } else {
          this.getMulu(this.defaultData.id)
        }
      }
    // }else{
    //   console.log('新增影音')
    // }
  },
  data() {
    return {
      detailDataOwn: {
        attributes: [],
      },
      metadata: [], //扩展属性
      ml: null, //目录
      defaultProps: {
        children: 'children',
        label: 'chapter_name',
      }, //目录显示的字段
      currMulu: null, // 当前点击的目录
      previewImgUrl: null, // 图片预览
      file: null, // 图书文件 //主文件用file
      detailReadOnly: false,
      viewpoint: [
        { label: '标题', value: '', required: true },
        { label: '副标题' },
        { label: '作者' },
        { label: '品类维度' },
        { label: '品类维度编号' },
        { label: '专业类别' },
        { label: '专业类别编号' },
        { label: '文集类别' },
        { label: '文集来源ID' },
        { label: '文献出处' },
        { label: '文献出处ID' },
        { label: '套系栏目' },
        { label: '价格' },
        {
          label: '创建时间',
          name: 'create_time',
          isDdisabled: true,
          NoNeed: true,
        },
      ], //法律观点
      statute: [
        { label: '标题', value: '', required: true },
        { label: '发文字号' },
        { label: '发布单位' },
        { label: '效力状态' },
        { label: '品类维度' },
        { label: '品类维度编号' },
        { label: '法规类别' },
        { label: '法规类别编号' },
        { label: '学科分类' },
        { label: '学科分类编号' },
        { label: '法规来源ID' },
        { label: '文献出处' },
        { label: '法规文献出处ID' },
        { label: '套系栏目' },
        { label: '价格' },
        {
          label: '创建时间',
          name: 'create_time',
          isDdisabled: true,
          NoNeed: true,
        },
      ], //法规
      case: [
        { label: '标题', value: '', required: true },
        { label: '主要问题(副标题)', name: '副标题' },
        { label: '案件类别' },
        { label: '案件类别编号' },
        { label: '案例编号' },
        { label: '效力状态' },
        { label: '品类维度' },
        { label: '品类维度编号' },
        { label: '案例来源ID' },
        { label: '案例(文献)出处', name: '出处' },
        { label: '文献出处ID' },
        { label: '套系栏目' },
        { label: '价格' },
        {
          label: '创建时间',
          name: 'create_time',
          isDdisabled: true,
          NoNeed: true,
        },
      ], //权威案例
      referee: [
        { label: '标题', value: '', required: true },
        { label: '案号' },
        { label: '品类维度' },
        { label: '品类维度编号' },
        { label: '案件类别' },
        { label: '案件类别编号' },
        { label: '审理法院' },
        { label: '裁判来源ID' },
        { label: '裁判文献出处' },
        { label: '裁判文献出处ID' },
        { label: '套系栏目' },
        { label: '价格' },
        {
          label: '创建时间',
          name: 'create_time',
          isDdisabled: true,
          NoNeed: true,
        },//裁判文书
      ],
      book: [
        { label: '标题', value: '', required: true },
        { label: '副标题'},
        { label: '出版者' },
        { label: 'ISBN' },
        { label: '出版日期' },
        { label: '作者' },
        { label: '责任方式' },
        { label: '专业类别' },
        { label: '专业类别编号' },
        { label: '品类维度' },
        { label: '品类维度编号' },
        { label: '简介' },
        { label: '归属套系' },
        { label: '价格' },
        {
          label: '创建时间',
          name: 'create_time',
          isDdisabled: true,
          NoNeed: true,
        } // 图书
			],
			 ModelEssay: [
        { label: '标题', value: '', required: true },
        { label: '作者' },
        { label: '资源出处' },
        { label: '发表时间' },
        { label: '资源说明' },
        { label: '适用场景' },
        { label: '流程类别' },
        { label: '价格' },
        { label: '资源类别' },
        {
          label: '创建时间',
          name: 'create_time',
          isDdisabled: true,
          NoNeed: true,
				}
      ],
       ClassVideo: [
        { label: '标题', value: '', required: true },
        { label: '专辑演播者' },
        { label: '专辑责任者' },
        { label: '专辑简介' },
        { label: '专业类别' },
        { label: '专业类别编号' },
        { label: '内容原作者' },
        { label: '出版时间' },
        { label: '关联资源' },
        { label: '节目数' },
        { label: '品类维度' },
        { label: '品类维度编号' },
        { label: '节目内容来源' },
        { label: '价格' },
      ]
      // 课程影音
    }
  },
  methods: {
    getDetail() {
      this.services
        .detailResource({
          id: this.detailData.id,
        })
        .then(res => {
					this.detailDataOwn = res.data
          if(this.getMainList){
            this.getMainList.forEach(element => {
              for (let key in res.data) {
                if (key === element.label || key === element.name) {
                  element.value = res.data[key]
                }
              }
            })
        }
          this.metadata = res.data.attributes || []
        })
    },
    getMulu(id) {
      myServices.getBookCatalog({ id }).then(res => {
        // this.ml = res.data.data
        var mulu = recursionTree(res.data, 'pid', 'root')
        // log('目录',mulu);
        this.ml = mulu
        this.currMulu = mulu
      })
    },
    handleClick(tab, event) {
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
      myServices.siblingSort({
        id: item.id,
        sort: type,
      })
    },
    async submitDetail(formName) {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      var progress = this.$progress()
      try {
        let img
        if (this.imgFile) {
          await commonServices.getTask(this.imgFile).then(res => {
            img = res.data.path
          })
        }
        // if (!this.detailDataOwn.img) {
        //   this.$message.error('请导入封面!')
        //   progress.close()
        //   return
        // }
        let data = {}
        if(this.detailType==6){
          data['封面'] = img ? img : this.detailDataOwn.封面
        }else{
          data['资源地址'] = img ? img : this.detailDataOwn.资源地址
        }
        if(this.getMainList){
          this.getMainList.forEach(element => {
            if (element.name) {
              data[element.name] = element.value
            } else {
              data[element.label] = element.value
            }
          })
        }
        await this.services.save({
          id: this.detailData ? this.detailData.id : null,
          ...data,
          attributes: this.metadata,
          type: this.detailType,
          link_id: this.defaultData ? this.defaultData.id : null,
        })
        this.$emit('detailBack')
      } catch (err) {
        console.log(err)
        // this.$message.error(err.payload.error[i])
      }
      progress.close()
    },
    previewImg(e) {
      //预览图
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      this.previewImgUrl = URL.createObjectURL(file)
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
    previewBook(e) {
      var node = e.target
      var file = node.files[0]
      this.file = file
      dir(file, 'file')
    },
  },
  computed: {
    getMainList() {
      switch (Number(this.detailType)) {
        case 1:
          return this.case
          break
        case 2:
          return this.statute
          break
        case 3:
          return this.viewpoint
          break
        case 4:
          return this.referee
          break
        case 6:
          return this.book
          break
        case 7:
					return this.ModelEssay
          break
        case 8:
					return this.ClassVideo
					break
        default:
          break
      }
    },
  },
}
</script>

<template lang="pug">
.div
  el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="!readOnly&&detailReadOnly" type="primary" size='small' plain) 修改
  el-tabs( :value="type" @tab-click="handleClick")
    //- 详情
    el-tab-pane( label="基本信息" name='info')
      .div
        VaForm( ref="detailForm"  )
          form.detailForm( ref="detailForm")
            fieldset(:disabled="readOnly||detailReadOnly")
              .group(v-for="item in getMainList")
                .label 
                  span(v-show="item.required") *
                  |{{item.label}}:
                input.form-control(v-if="item.label === '标题'" v-va="{type: 'required'}" v-model="item.value" type="text" :disabled="item.isDdisabled&&item.value&&item.value.length>=10")
                input.form-control(v-else v-model="item.value" type="text" :disabled="item.isDdisabled&&item.value&&item.value.length>=10")
              div(v-if="Number(detailType) === 6||8")
                .group(style="width:50%;float:left")
                  .label 封面:
                  label
                    el-button(size="mini" type="primary" @click="$refs.fenmian.click()") 导入封面
                    input.hide( @change="previewImg" type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" )
                .group
                  .label
                  img.previewImgUrl(:src="detailDataOwn.封面 ")
              div(v-if="Number(detailType) === 7")
                .group(style="float:left")
                  .label 资源地址:
                  label
                    el-button(size="mini" type="primary" @click="$refs.dizhi.click()") 上传
                    input.hide(  @change="previewImg" type="file"  ref="dizhi" accept="*" )
                .group
                  a(:href='detailDataOwn.资源地址'  download="File") 下载
              div(v-if="Number(detailType) === 8")
                
              //- .group(style="width:50%;float:right")
              //- 	.label 图书稿件:
              //- 	label
              //- 		el-button(size="mini " type="primary"  @click="$refs.tushu.click()" ) 选择ZIP
              //- 		el-button(size="mini " type="primary"  type="file") 导入
              //- 		input.hide( @change="previewBook" type="file"  ref="tushu" accept="application/zip"  )
              //- 	div
              //- 		.label 当前书稿:
              //- 		span(v-text="file.name" v-if="file")
            .btns(v-if="!readOnly")
              el-button( ype="info" @click=" $emit('update:detailDialog', false)") 取消
              el-button(@click="submitDetail()" type="primary") 确定
    //- 扩展属性
    el-tab-pane( label="扩展属性" name="data" )
      MetaData( :metadata="metadata" @submit="submitDetail()" @back="$emit('update:detailDialog', false)" :readOnly="readOnly||detailReadOnly")
    //-  目录
    el-tab-pane( label="目录" name="ml" )
      .muluWrap
        .left
          el-tree.muluList( :data="ml" :props="defaultProps" node-key="id" @node-click="handleNodeClick" )
        .right
          fieldset(:disabled="readOnly||detailReadOnly")
            table.table
              thead
                tr
                  th(width=50) 序号
                  th  名称
                  th(width=110 v-if="!readOnly")  调序
              tbody
                tr(v-for="(item ,index) in currMulu")
                  th(v-text="index+1")
                  th.th-name(v-text="item.chapter_name")
                  th(v-if="!readOnly")
                    .div
                      el-button.iconRotate.up( @click="index!=0&&muluSort(item,index , 'up')" :disabled="index==0"  icon="el-icon-back" size="mini")
                      el-button.iconRotate.down( @click="(index+1)!=currMulu.length&&muluSort(item,index , 'down')" :disabled="(index+1)==currMulu.length"  icon="el-icon-back" size="mini")
</template>


<style lang="stylus" scoped>
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
.detailForm
  .group
    .label
      min-width 140px
    a
      display block
      padding-top 1%
.btns
  text-align right
.previewImgUrl
  max-width 250px
  max-height 250px
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
