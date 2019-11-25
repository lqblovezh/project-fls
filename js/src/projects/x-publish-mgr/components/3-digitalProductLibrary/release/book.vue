<script>
import formSerialize from 'form-serialize'
import * as services from "services/common"
import {
  bookInfo,
  bookSave
} from 'services/x-publish/mixProduct'

export default {
  props: {
    bookDialog: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: {},
    },
    detailData: Object,
    optional: Array,
    readOnly: Boolean,
  },
  data() {
    return {
      information: {}, //列表信息
      previewImgUrl: null,
      metadata: [],
      radio: 'paperback',
    }
  },
  created() {
    if (Object.entries(this.item).length) {
      this.getInfo()
    } else {
      this.radio = this.optional.length && this.optional[0] || 'paperback'
    }
  },
  computed: {
    setTitle() {
      if (!Object.entries(this.item).length) {
        return '新增纸质书'
      }
      return this.item.name || '修改纸质书'
    }
  },
  methods: {
    getInfo() {
      bookInfo({
        id: this.item.id,
      }).then(res => {
        this.information = res.data
        this.metadata = res.data.attributes
        this.radio = res.data.type
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    colse() {
      this.$emit('update:bookDialog', false)
    },
    async save() { //保存
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        log("验证失败")
        return
      }
      const fenmian = this.$refs.fenmian.files[0]
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (fenmian) { //先处理封面
          await services.getTask(fenmian).then(res => {
            this.information.img = res.data.path
          })
        }
        if (!this.information.img) {
          this.$message.error('封面必填');
          loading.close()
          return
        }
        await bookSave({
          ...this.information,
          attributes: this.metadata,
          product_id: this.detailData.id,
          type: this.radio,
        }).then(res => {
          loading.close()
          this.$emit('saveok')
        })
      } catch ({
        payload
      }) {
        loading.close()
        // for(let i in payload.messages){
        //   this.$message.error(payload.messages[i])
        //   break
        // }
      }
    },
    previewImg(e, type) { //预览图
      var node = e.target
      var file = node.files[0]
      this.imgFile = file
      if (type) {
        this.previewPhotoUrl = URL.createObjectURL(file)
        return
      }
      this.previewImgUrl = URL.createObjectURL(file)
    },
    syncInfo(){ //同步信息
      let id = this.$refs.isbn.value
      if(!id) return
      services.synchronization({id:this.$refs.isbn.value}).then(res => {
        log(res)
        const {
          bookname, //图书名称
          writer, //作者
          isbn, //ISBN
          price, //定价
          price_min, //最低销售价
          weight, //图书重量
          isbn_ext, //ISBN扩展码
          bookbinding, //装帧
        } = res.data
        switch (bookbinding) {
          case '平':
            this.radio = 'paperback'
            break;
          case '精':
            this.radio = 'hardcover'
            break;
          case '软':
            this.radio = 'soft_hardcover'
            break;
          case '线':
            this.radio = 'thread_bound'
            break;
          default:
            break;
        }
        this.information = {
          name: bookname,
          book_isbn: isbn,
          price,
          sales_price_min: price_min,
          book_isbn_extension: isbn_ext,
          book_weight: weight,
        }
      }).catch(({
        payload
      }) => {
        log(111, payload)
        log(payload)
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    isShow(type) {
      if (this.optional.indexOf(type) > -1) {
        return false
      }
      return true
    }
  }
}
</script>

<template lang="pug">
div
	el-dialog.restBody2(
		:center="false"
		:visible="bookDialog"
		top="50px"
		width="1200px"
		:show-close="false"
		append-to-body
		)
		.header(slot="title")
			<i class="el-icon-close" @click="colse"></i>
			el-tabs(value="ff")
				el-tab-pane(:label="setTitle" name="ff")
		VaForm(ref="detailForm")
			form.detailForm.rowWrap
				.group.line
					.label 基本信息(必填)
				.left
					.group
						.label 名称:
						input.form-control( v-va="{ type:'required'}" name="name" v-model="information.name" type="text" :disabled="readOnly")
					.group
						.label ISBN:
						input.form-control( v-va="{ type:'required'}" v-model="information.book_isbn" ref="isbn" type="text" :disabled="readOnly")
						el-button.margin(@click="syncInfo" type="primary" size="small" v-if="!readOnly") 同步
					.group(v-if='optional.length')
						.label 类型:
						el-radio.el-radio(v-model="radio" :disabled="isShow('paperback')||readOnly" label="paperback") 平装
						el-radio.el-radio(v-model="radio" :disabled="isShow('hardcover')||readOnly" label="hardcover") 精装
						el-radio.el-radio(v-model="radio" :disabled="isShow('soft_hardcover')||readOnly" label="soft_hardcover") 软精装
						el-radio.el-radio(v-model="radio" :disabled="isShow('thread_bound')||readOnly" label="thread_bound") 线装
					.group
						.label 定价:
						input.form-control( v-va="{ type:'required'}" v-model="information.price" type="text" :disabled="readOnly")
						span  元
					.group
						.label 最低定价:
						input.form-control( v-va="{ type:'required'}" v-model="information.sales_price_min" type="text" :disabled="readOnly")
						span  元
				.right
					img.previewImgUrl(:src="previewImgUrl || information.img_src")
					input(type="hidden" :value="information.img" name="img")
					el-button.margin(size="mini" type="primary" @click="$refs.fenmian.click()" plain v-if="!readOnly") 选择封面
					input.hide(type="file" ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
				.group.line
					.label 其他信息
				.group
					.label ISBN扩展:
					input.form-control( v-model="information.book_isbn_extension" type="text" :disabled="readOnly")
				.group
					.label 图书重量:
					input.form-control( v-model="information.book_weight" type="text" :disabled="readOnly")
					span  KG
				.group.line
					.label 扩展属性
				.group
					.label
					MetaData( :metadata="metadata" :isShowBtn='false' :readOnly="readOnly")
		.footer(slot="footer" class="dialog-footer")
			el-button( @click="colse" type="info" ) 取消
			el-button( @click="save" type="primary" v-if="!readOnly") 确定
</template>


<style lang="stylus" scoped>

.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.rowWrap
  .left
    width 60%
    display inline-block
    box-sizing border-box
  .right
    width 40%
    text-align center
    display inline-block
    img
      max-height 140px
      max-width 280px
      vertical-align bottom
    .name
      text-align center
      margin 10px 0
  .btn
    margin-left 20px
.margin
  margin-left 70px
.form-control
  max-width 300px
.line
  font-size 16px
  border-bottom 1px solid #ddd
  >div
    text-align left
.el-radio
  line-height inherit
</style>
