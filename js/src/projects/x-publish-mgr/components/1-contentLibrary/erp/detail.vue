<script>
import axios from 'axios'
import { recursionTree } from '@/util/math.js'
import * as commonServices from 'services/x-publish/common'
import * as myServices from 'services/x-publish/erp'
import { synchronization } from 'services/x-publish/infoProduct'
import { getIconStyle } from '@/util/mixins'

export default {
  props: ['type', 'detailData', 'detailDialog'],
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
      myServices.detail(this.detailData).then(res => {
        this.detailDataOwn = res.data
      }, err => {
        this.$message.error(err.message)
      })
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
  },
}
</script>

<template lang="pug">
.div
  //- el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="detailReadOnly" type="primary" size='small' plain) 修改
  el-tabs( :value="type")
    //- 详情
    el-tab-pane( label="详情" name="xq")
      .div
        VaForm( ref="detailForm"  )
          form.detailForm( ref="detailForm")
            fieldset(:disabled="detailReadOnly")
              .group
                .label 书籍名称:
                input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.bookname" type="text" maxlength="20")
              .group
                .label ISBN:
                input.form-control.grid-content(v-model="detailDataOwn.isbn" ref="isbn" type="text" maxlength="15")
              .group
                .label 作者:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.writer" type="text" maxlength="10")
              .group
                .label 装帧:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.bookbinding" type="text"  maxlength="10")
              .group
                .label 中图法分类:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.bookcategory" type="text"  maxlength="10")
              .group
                .label 印张:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.booksheets" type="text"  maxlength="10")
              .group
                .label 版次:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.editionnumber" type="text"  maxlength="10")
              .group
                .label 开本:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.format" type="text"  maxlength="10")
              .group
                .label 定价:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.price" type="text"  maxlength="10")
              .group
                .label 最低售价:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.price_min" type="text"  maxlength="10")
              .group
                .label 读者对象:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.readership" type="text"  maxlength="10")
              .group
                .label 字数:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.wordcount" type="text"  maxlength="10")
              .group
                .label 创建时间:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.create_time" type="text"  maxlength="10")
              .group
                .label 选题号:
                input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.topicno" type="text"  maxlength="10")
              .group
                .label 内容简介:
                textarea.textarea( v-model="detailDataOwn.bookbrief"   type="text" maxlength="300" )
                //- input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.bookbrief" type="text"  maxlength="10")
              .group
                .label 专家推荐:
                textarea.textarea( v-model="detailDataOwn.expertnote"   type="text" maxlength="300" )
                //- input.form-control(v-va="{ type:'required' }" v-model="detailDataOwn.expertnote" type="text"  maxlength="10")
            .btns
              el-button( ype="info" @click=" $emit('update:detailDialog', false)") 取消
              //- el-button(@click="submitDetail('detailForm')" type="primary" v-if="!detailReadOnly") 确定
</template>


<style lang="stylus" scoped>
.btns
  float right
.group
  width 50%
  display inline-block
</style>
