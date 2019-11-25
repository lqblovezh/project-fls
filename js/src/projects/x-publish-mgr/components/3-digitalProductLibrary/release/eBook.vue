<script>
import formSerialize from 'form-serialize'
import * as services from 'services/x-publish/mixProduct'
import { getTask } from 'services/common'
import { _themeDetail } from 'services/x-publish/theme'

export default {
  props: ['detailData', 'readOnly', 'defaultData'],
  data() {
    return {
      information: {},
      activeName: 'first',
      metadata: [], //x-read元数据
      shopMetadata: [], //电商扩展属性
      book_id: null, //关联书id
      retailer_id: null, //电子书电商信息id
      constitute_id: null, //第二次关联内容仓库id
      ebook_shop: {}, //电商信息
      current_id: null, // 电子书ID
    }
  },
  created() {
    if (this.detailData && this.detailData.id) {
      this.getEBook()
    }
    if (this.defaultData) {
      this.information = this.defaultData
      this.metadata = this.defaultData.attributes
      this.ebook_shop = this.defaultData.ebook_shop || {}
      this.shopMetadata = this.defaultData.ebook_shop
        ? this.defaultData.ebook_shop.attributes
        : []
    }
  },
  methods: {
    getEBook() {
      services.getEBook({ id: this.detailData.id }).then(res => {
        let data = res.data || {}
        this.information = data
        this.current_id = data.id
        if (!data.length && !Object.entries(data).length) {
          this.retailer_id = this.constitute_id = null
        } else {
          this.constitute_id = data.constitute_id
          this.book_id = data.book_id
          this.metadata = data.attributes || []
          this.ebook_shop = data.ebook_shop || {}
          if (data.ebook_shop) {
            this.retailer_id = data.ebook_shop.id
            this.shopMetadata = data.ebook_shop.attributes || []
          }
        }
      })
    },
    getRelation(item) {
      if (!item.length) return
      const { c_id, id, type } = item[0]
      log(c_id, id, type)
      _themeDetail({
        c_id,
        id,
        type,
      })
        .then(res => {
          this.information = res.data
          this.metadata = this.information.attributes
          this.constitute_id = null
          this.book_id = id
          log(this.information)
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    async submit() {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return this.$message.error('电子书信息不全!')
      }
      log({
        ...this.information,
        ...this.ebook_shop,
        book_id: this.book_id,
        components_id: this.detailData.id,
        attributes: this.metadata,
        shop_attributes: this.shopMetadata,
        constitute_id: this.constitute_id,
        retailer_id: this.retailer_id,
        current_id: this.current_id,
      })
      var progress = this.$progress()
      try {
        await services
          .saveEBook({
            ...this.information,
            ...this.ebook_shop,
            book_id: this.book_id,
            components_id: this.detailData.id,
            attributes: this.metadata,
            shop_attributes: this.shopMetadata,
            constitute_id: this.constitute_id,
            retailer_id: this.retailer_id,
            id: this.information.id,
            current_id: this.current_id,
          })
          .then(res => {
            if (!this.current_id && res.data) {
              this.current_id = res.data.id
            }
          })
        this.$message.success('保存成功')
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
      progress.close()
    },
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
  },
}
</script>

<template lang="pug">
  .div
    VaForm(ref="detailForm")
      form.detailForm
        .group.line
          .label 基本信息
        .group
          .label *关联书籍:
          //- img.previewImgUrl(:src="information.img_src||information.constitute_img_src")
          el-button.margin(size="mini" type="primary" @click="$emit('open','1')" v-if="!readOnly") 关联
        .group
          .label *名称:
          input.form-control( v-va="{ type:'required'}" v-model="information.name" type="text" :disabled="readOnly")
        .group
          .label *作者:
          input.form-control( v-va="{ type:'required'}" v-model="information.author" type="text" :disabled="readOnly")
        .group
          .label *类型:
          span.types
            span  {{information.type_name}}
            span  创建时间: {{information.create_time}}
        .group
          .label 简介:
          textarea.textarea(rows="3" v-model="information.abs" type="text" :maxlength='$config.ABS_MAX_LENGTH' :disabled="readOnly")
          span(style="vertical-align:bottom;color:#606266;font-size:12px" v-if="!readOnly") 您还可以输入{{$config.ABS_MAX_LENGTH-(information.abs?information.abs.length:0)}}
        // .btns
        //   el-button(@click="submitDetail('detailForm')" type="primary" size="small") 保存
      .info
        el-tabs.tabs-nav.restBody(v-model="activeName")
          el-tab-pane(label="x-read信息" name="first")
            form.readForm
              .group.line
                .label 扩展属性
              .group
                .label
                MetaData( :metadata="metadata" :isShowBtn='false' :readOnly="readOnly")
          el-tab-pane(label="电商信息" name="second" v-if="$config.isShowRetailers")
            form.commerceForm
              .group.line
                .label 必填信息
              .group
                .label 定价:
                input.form-control( v-model="ebook_shop.sale_price" type="text" :disabled="readOnly")
                span  元
              .group
                .label 最低定价:
                input.form-control( v-model="ebook_shop.min_sale_price" type="text" :disabled="readOnly")
                span  元
              .group
                .label 内容阅读地址:
                input.form-control( v-model="ebook_shop.read_url" type="text" :disabled="readOnly")
              .group.line
                .label 其他信息
              .group
                .label 内容试读地址:
                input.form-control( v-model="ebook_shop.trial_url" type="text" :disabled="readOnly")
                // el-button.margin(@click="" type="primary" size="small") 资源库
              .group.line
                .label 扩展属性
              .group
                .label
                MetaData( :metadata="shopMetadata" :isShowBtn='false' :readOnly="readOnly")
          el-tab-pane
            span(slot="label") 收起
              i.el-icon-arrow-up
      .btns(v-if="book_id")
          el-button(@click="submit('detailForm')" type="primary" v-if="!readOnly") 保存
</template>


<style lang="stylus" scoped>
img
  max-height 200px
  max-width 200px
.btns
  text-align center
  padding 10px 0
.line
  font-size 16px
  border-bottom 1px solid #ddd
  >div
    text-align left
.textarea
  height 80px !important
.form-control
  max-width 40%
.margin
  margin-left 20px
</style>
