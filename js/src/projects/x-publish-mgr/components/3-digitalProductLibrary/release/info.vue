<script>
import formSerialize from 'form-serialize'
import * as services from 'services/common'
import { save, getInfo } from 'services/x-publish/infoProduct'
// import { debounce } from "@/util/domUtil"
import { debounce } from 'lodash'

export default {
  props: ['detailData', 'readOnly', 'defaultData'],
  data() {
    return {
      information: {},
      previewImgUrl: null,
      retailers: {
        clc_category: '', //  - 可选 中图法分类
        clc_category_id: '', //
        cp_category: '', //可选 营销分类
        cp_category_id: '', //可选 营销分类id 先留空上传
        describe: '', // 可选 内容简介
        editor_recommend: '', // 可选 编辑推荐
        book_directory: '', // 可选 图书目录
      }, // 电商信息
      xRead: {}, // x-read信息
      activeName: '1',
      keyWord: '', // 搜索关键字
      title: '作者',
      metadata: [],
      creatAuthorInfo: {}, // 创建作者信息
      choiceDialog: false, // 作者选择弹框
      creatDialog: false, // 创建作者弹框
      authorList: [], // 作者列表
      authorInfo: {},
      authorOptions: [], // 作者分类
      authorValue: [], // 作者分类选中值
      translatorOptions: [], // 译者分类
      translatorValue: [], // 译者分类选中值
      out_print: '2',
      have_print: '2',
      imageCropperDialog: false,
      file: null,
      oldBlob: null,
    }
  },
  created() {
    if (this.detailData && Object.entries(this.detailData).length) {
      this.getInfo()
    }
    if (this.defaultData) {
      this.setInfo()
    }
    this.init()
  },
  computed: {
    detailType() {
      return this.infoData.img_status
    },
    hassVideo() {
      if (
        this.infoData.type == 6 ||
        this.infoData.type == 5 ||
        this.infoData.type == 8
      ) {
        return true
      }
      return false
    },
    gauthorList() {
      return this.authorList
    },
  },
  methods: {
    init() {
      // searchAuthor: debounce(() => log(this.getAuthors),500),
      //debounce将会立即执行, 若放在methods里面, 虽然能获取this, 但是将会找不到this.getAuthors
      this.searchAuthor = debounce(() => this.getAuthors(), 500)
    },
    setInfo() {
      this.information = this.xRead = this.defaultData.base || {}
      this.metadata = this.defaultData.attributes || []
      this.retailers = this.defaultData.retailers || {}
      this.setEbookInfo()
    },
    getInfo() {
      getInfo({
        id: this.detailData.id,
      }).then(res => {
        this.information = res.data
        this.retailers = res.data.retailers
        this.xRead = res.data['x-read']
        this.metadata = res.data.pro_attributes
        this.setEbookInfo()
      })
    },
    setEbookInfo() {
      this.out_print = this.retailers.out_print || '2'
      this.have_print = this.retailers.have_print || '2'
      let author = this.retailers.author ? this.retailers.author.split(',') : []
      let author_id = this.retailers.author_id
        ? this.retailers.author_id.split(',')
        : []
      let translator = this.retailers.translator
        ? this.retailers.translator.split(',')
        : []
      let translator_id = this.retailers.translator_id
        ? this.retailers.translator_id.split(',')
        : []
      this.authorOptions = author.map((item, index) => {
        let data = {}
        data.value = author_id[index]
        data.label = item
        return data
      })
      this.translatorOptions = translator.map((item, index) => {
        let data = {}
        data.value = translator_id[index]
        data.label = item
        return data
      })
      this.authorValue = author_id
      this.translatorValue = translator_id
    },
    handleClick(tab, event) {
      this.$emit('infoClick', tab)
    },
    previewImg(e, type) {
      //预览图
      var node = e.target
      this.file = node.files[0]
      this.imgFile = URL.createObjectURL(this.file)
      this.$ImageSize({ file: this.file, ratio: 0.73, interval: 0.05 }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(this.file)
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
    addAuthor(type) {
      //添加作者弹框
      this.title = type
      this.keyWord = ''
      this.authorList = []
      this.choiceDialog = true
    },
    choiceAuthor() {
      //选择作者
      let name = this.title == '作者' ? 'author' : 'translator'
      const page = document.querySelector('.authorListForm')
      const list = page.querySelectorAll('input[name="ids"]:checked')
      if (!list.length) {
        this.$message.warning('请选择你要添加的' + this.title)
      }
      for (let i of list) {
        if (this[name + 'Options'].find(item => i.value == item.value)) {
          continue
        }
        this[name + 'Options'].push({
          value: i.value,
          label: i.getAttribute('label'),
        })
        this[name + 'Value'].push(i.value)
      }
      this.$message.success('添加' + this.title + '成功!')
    },
    async saveAuthor() {
      //添加作者
      await services
        .addAuthor({
          author_name: this.creatAuthorInfo.name,
        })
        .then(res => {
          this.$message.success('创建成功')
        })
        .catch(err => {
          this.$message.error(err.messages)
        })
      this.creatDialog = false
    },
    getAuthors() {
      log(this.title)
      services
        .getAuthor({
          author_name: this.keyWord,
        })
        .then(res => {
          this.authorList = res.data
          log(this.authorList)
        })
    },
    creatAuthor() {
      this.creatAuthorInfo = {}
      this.creatDialog = true
    },
    syncInfo(e) {
      //同步信息
      let id = this.$refs.isbn.value
      if (!id) return
      services
        .synchronization({
          id: this.$refs.isbn.value,
        })
        .then(res => {
          log(res)
          const {
            bookname, //图书名称
            writer, //作者
            isbn, //ISBN
            bookcatalog, //图书目录
            majorword, //主题词
            bookbrief, //内容简
            readership, //读者对象
            editornote, //编辑推荐
            price, //定价
            price_min, //最低销售价
            weight, //图书重量
            bookcategory, //中图法分类
            bookcategory2, //营销分类
          } = res.data
          this.information = {
            name: bookname,
            book_isbn: isbn,
            abs: bookbrief,
          }
          this.xRead = {
            tag: '',
            author: writer,
          }
          this.retailers = {
            subject_terms: majorword,
            target_audience: readership,
            clc_category: bookcategory,
            cp_category: bookcategory2,
            describe: bookbrief,
            editor_recommend: editornote,
            book_directory: bookcatalog,
          }
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    async submitDetail() {
      const fenmian = this.$refs.fenmian.files[0]
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      try {
        if (fenmian) {
          await services.getTask(fenmian).then(res => {
            this.information.img = res.data.path
          })
        }
        await save({
          id: this.detailData.id,
          ...this.information,
        }).then(res => {
          this.$message.success('保存成功')
          loading.close()
          this.$emit('saveok', res.data)
        })
      } catch ({ payload }) {
        loading.close()
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    preview(data) {
      this.previewImgUrl = URL.createObjectURL(data)
      this.oldBlob = data
      this.imageCropperDialog = false
    },
    async submitInfo() {
      // 保存扩展信息
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) return //log("验证失败")
      let fenmian = this.$refs.fenmian.files[0]
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let data = {
        ...this.information,
        pro_attributes: this.metadata,
        attributes: {
          xRead: {
            ...this.xRead,
          },
          eCommerce: {
            ...this.retailers,
            author_id: this.authorValue.join(','),
            translator_id: this.translatorValue.join(','),
            author: this.authorOptions
              .map(item => {
                if (this.authorValue.indexOf(item.value) > -1) {
                  return item.label
                }
              })
              .filter(x => {
                if (x) return x
              })
              .join(','),
            translator: this.translatorOptions
              .map(item => {
                if (this.translatorValue.indexOf(item.value) > -1) {
                  return item.label
                }
              })
              .filter(x => {
                if (x) return x
              })
              .join(','),
            out_print: this.have_print,
            have_print: this.have_print,
          },
        },
      }
      if (fenmian) {
        //先处理封面 线上传图片文件, 得到返回结果后 ,  再提交整个表单
        if (this.oldBlob) {
          fenmian = this.oldBlob
          fenmian.name = this.file.name
        }
        await services.getTask(fenmian).then(res => {
          data.img = res.data.path
        })
      }
      await save(data)
        .then(res => {
          //上传信息
          if (!this.detailData.id) {
            this.information = res.data
          }
          loading.close()
          this.$message.success('操作成功!')
          this.$emit('saveok', res.data)
        })
        .catch(err => {
          loading.close()
          this.$message.error(err.message || '错误!');
        })
    },
  },
}
</script>

<template lang="pug">
.div
	ImageCropper(
		v-if="imageCropperDialog"
		ref="imageCropper"
		:imageCropperDialog.sync="imageCropperDialog"
		:imgFile="imgFile"
		:autoCropWidth="290"
		:autoCropHeight="400"
		@preview="preview"
	)
	//- 选择作者
	el-dialog(
		:visible.sync="choiceDialog"
		width="500px"
		append-to-body
		)
		.header(slot="title")
			el-tabs(value="detail")
				el-tab-pane(:label="'选择'+title" name="detail")
		form.rowWrap
			.group
				input.form-control(@input="searchAuthor" :placeholder="'输入查询'+title" v-model='keyWord' type="text")
				el-button(type="primary" @click="creatAuthor" size="small") 创建新{{title}}
			ul.authorListForm
				li(v-for="item in gauthorList")
					input(ref='ids' name='ids' type="checkbox" :value="item.id" :label="item.name" :id="'author_'+item.id")
					label(:for="'author_'+item.id") {{item.name}}
		.div(slot="footer" class="dialog-footer")
			el-button(type="info" @click="choiceDialog = false" ) 取消
			el-button(type="primary" @click="choiceAuthor" ) 确定
	//- 创建作者
	el-dialog(
		:visible.sync="creatDialog"
		width="500px"
		append-to-body
		)
		.header(slot="title")
			el-tabs(value="detail")
				el-tab-pane(:label="'创建'+title" name="detail")
		form.authorInfo
			.group
				.label 姓名:
				input.form-control( v-va="{ type:'required'}" type="text" v-model="creatAuthorInfo.name" name="name")
		.div(slot="footer" class="dialog-footer")
			el-button(type="info" @click="creatDialog = false" ) 取消
			el-button(type="primary" @click="saveAuthor" ) 确定
	VaForm(ref="detailForm")
		form.detailForm
			.group.line
				.label 基本信息
			.group
				.label *产品名称:
				input.form-control( v-va="{ type:'required'}" v-model="information.name" type="text" :disabled="readOnly")
			.group
				.label ISBN:
				input.form-control(v-model="information.ISBN||information.book_isbn" ref="isbn" type="text" :disabled="readOnly")
				el-button(@click="syncInfo" type="primary" size="small" v-if="!readOnly") 同步
			.group
				.label *内容简介:
				textarea.textarea( v-va="{ type:'required'}" v-model="information.abs" :maxlength="$config.ABS_MAX_LENGTH" type="text" :disabled="readOnly")
				span(style="vertical-align:bottom;color:#606266;font-size:12px" v-if="!readOnly") 您还可以输入{{$config.ABS_MAX_LENGTH-(information.abs?information.abs.length:0)}}
			.group
				.label *设置封面:
				el-button(size="mini" type="primary" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
				input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
			.group
				.label
				img.previewImgUrl(:src="previewImgUrl || information.img_src")
				input(type="hidden" name="img" :value="information.img")
			p.imgSizeWrap
				span.imgSize 建议图片大小：290*400px
			//.btns
				el-button(@click="submitDetail('detailForm')" type="primary" size="small") 保存
		.info()
			el-tabs.tabs-nav(v-model="activeName")
				el-tab-pane(label="x-read信息" name="1")
					form.readForm
						.group.line
							.label 必填信息
						.group
							.label *标签:
							input.form-control( v-va="{ type:'required'}" v-model="xRead.tag" type="text" :disabled="readOnly")
						.group
							.label *作者:
							input.form-control( v-va="{ type:'required'}"  v-model="xRead.author" type="text" :disabled="readOnly")
						.group
							.label 扩展属性:
							MetaData( :metadata="metadata" :isShowBtn='false' :readOnly="readOnly")
				el-tab-pane(label="电商信息" name="2" v-if="$config.isShowRetailers")
					form.commerceForm
						.group.line
							.label 必填信息
						.group
							.label 绝版:
							el-radio.el-radio(v-model="out_print" name="out_print" label="1" :disabled="readOnly") 是
							el-radio.el-radio(v-model="out_print" name="out_print" label="2" :disabled="readOnly") 否
						.group
							.label 是否有版:
							el-radio.el-radio(v-model="have_print" name="have_print" label="1" :disabled="readOnly") 是
							el-radio.el-radio(v-model="have_print" name="have_print" label="2" :disabled="readOnly") 否
						.group
							.label 作者:
							el-select(
								v-model="authorValue"
								multiple
								collapse-tags
								placeholder="请选择"
								size="small"
								style="margin-right:20px"
								name="author"
								:disabled="readOnly"
							)
								el-option( v-for="item in authorOptions" :key="item.value" :label="item.label" :value="item.value")
							el-button(@click="addAuthor('作者')" type="primary" size="small" v-if="!readOnly") 添加
						.group.line
							.label 其他信息
						.group
							.label 译者:
							el-select(
								v-model="translatorValue"
								multiple
								collapse-tags
								placeholder="请选择"
								size="small"
								style="margin-right:20px"
								name="translator"
								:disabled="readOnly"
							)
								el-option( v-for="item in translatorOptions" :key="item.value" :label="item.label" :value="item.value")
							el-button(@click="addAuthor('译者')" type="primary" size="small" v-if="!readOnly") 添加
						// .group
						//   .label 作者:
						//   input.form-control(v-model="retailers.author" type="text")
						.group
							.label 主题词:
							input.form-control(v-model="retailers.subject_terms" type="text" :disabled="readOnly")
						.group
							.label 读者对象:
							input.form-control(v-model="retailers.target_audience" type="text" :disabled="readOnly")
						.group
							.label 中图法分类:
							input.form-control(v-model="retailers.clc_category" type="text" :disabled="readOnly")
						.group
							.label 营销分类:
							input.form-control(v-model="retailers.cp_category" type="text" :disabled="readOnly")
						.group
							.label 内容简介:
							textarea.textarea(v-model="retailers.describe" type="text" :disabled="readOnly")
						.group
							.label 编辑推荐:
							textarea.textarea(v-model="retailers.editor_recommend" type="text" :disabled="readOnly")
						.group
							.label 图书目录:
							textarea.textarea(v-model="retailers.book_directory" type="text" :disabled="readOnly")
				el-tab-pane(name='3')
					span(slot="label") 收起
						i.el-icon-arrow-up
		.btns
			el-button(@click="submitInfo()" type="primary" v-if="!readOnly") 保存
</template>


<style lang="stylus" scoped>
.el-radio
  line-height 40px
.btns
  text-align center
  padding 10px 0
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.data
  padding-left 100px
  span
    padding 0 15px
.previewImgUrl
  // min-width 100px
  height 180px
.rowWrap
  .left
    width 60%
    min-height 200px
    display inline-block
    border-right 1px solid #ddd
    box-sizing border-box
  .right
    width 40%
    text-align center
    display inline-block
    img
      width 100px
      height @width
      border-radius 50%
    .name
      text-align center
      margin 10px 0
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
.form-control
  line-height 35px
  max-width 40%
  margin-right 20px
input.form-control.width
  width 200px
.textarea
  height 80px !important
.line
  font-size 16px
  border-bottom 1px solid #ddd
  >div
    text-align left
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
