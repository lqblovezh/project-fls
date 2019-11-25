<script>
import formSerialize from 'form-serialize'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
// import Detail from '../../4-myDistributed/detail'
import Detail from 'projects/common/readOnlyDetail'

import * as auditServices from 'services/x-publish/audit'
import * as pushServices from 'services/x-publish/dispense'
import { publicMixin, getIconStyle } from '@/util/mixins'

export default {
  mixins: [publicMixin, getIconStyle],
  data() {
    return {
      pageList: [],
      page: null,
      query: null,
      timeValue: null,
      detailVisible: false,
      detailValue: 'detail',
      item: null,
      roleInfo: {
        value: '', //内容属性值
        roleList: [
          { name: '融合发布库产品', value: '4' },
          { name: '主题产品', value: '1' },
          { name: '文章推送产品', value: '2' },
          { name: '视读产品', value: '5' },
          { name: '听读产品', value: '6' },
          { name: '课件产品', value: '3' },
        ], //内容属性
      },
      detailData: {
        id: null,
        detail: {},
        metadata: {},
      },
      isShowAuthor: false,
      productType: null,
      detailType: null, //这个参数是给文章的详情使用
    }
  },
  methods: {
    async getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      searchQuery
    ) {
      //获取列表信息
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
        type: this.roleInfo.value,
      }
      await auditServices.listAudit(data).then(res => {
        this.page = res.page
        this.pageList = res.data
      })
    },
    clear() {
      document.getElementById('text').value = ''
    },
    clear2() {
      document.getElementById('text2').value = ''
    },
    clear3() {
      document.getElementById('text3').value = ''
    },
    handeler(type, id = []) {
      //通过还是驳回
      if (!id.length) {
        Array.from(
          document.querySelectorAll("[name='checkbox']:checked")
        ).forEach(item => {
          id.push(item.value)
        })
      }
      let text = type == 'pass' ? '通过' : '驳回'
      if (!id.length) {
        return this.$message.error(`请确认你要${text}的内容！`)
      }
      this.$confirm(`是否确认${text}？`)
        .then(async _ => {
          try {
            let service =
              type == 'pass'
                ? auditServices.auditPass
                : auditServices.auditReject
            await service({ id }).then(res => {
              this.$message.success('成功')
              let { total, start, num } = this.page // 处理删除最后一页数据返回上页数据
              if (total - id.length == start) {
                this.page.num = !start ? 1 : num - 1
              }
              this.getList()
            })
          } catch ({ payload }) {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          }
        })
        .catch(_ => {})
    },
  },
  components: {
    Menu,
    Top,
    Detail,
  },
}
</script>

<template lang="pug">
.indexs
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/publishCheck")
  .mainRight
    .maindata
      .serachWrap
        form#mainForm
          span.group-inline
            el-input(placeholder="名称" name="name" clearable v-model="searchQuery.name")
          span.group-inline
            el-input(placeholder="标签" name="tag" clearable v-model="searchQuery.tag")
          span.group-inline
            el-input(placeholder="审核提交人" name="submit" clearable v-model="searchQuery.submit")
          span.group-inline
            TimePick(:inputsName="['start_time','end_time']")
          span.group-inline
            el-select(v-if="roleInfo.roleList" v-model="roleInfo.value" name="type" placeholder="选择类型" clearable)
              el-option(
                v-for="item in roleInfo.roleList"
                :key="item.value"
                :label="item.name"
                :value="item.value"
              )
          span.group-inline
            el-button(type="primary" plain icon="el-icon-search" @click="seareHandeler") 搜索
            el-button(type="primary" plain @click="handeler('pass')") 审核通过
            el-button(type="primary" @click="handeler('reject')") 审核驳回
      .tableWrap
        table.table
          thead
            tr
              th.allBtn
                input(type="checkbox" name='AllCheckbox' @click="selcetAll")
              th 名称
              th 产品类型
              th 标签
              th 说明
              th 审核提交时间
              th 审核提交人
              th(width="100") 操作
          tbody(v-if="pageList.length")
            tr(v-for="item in pageList")
              td
                input(type="checkbox" :value='item.id' name="checkbox")
              td
                img.cover-photo(:src="item.img_src")
                span.bookName(v-text='item.name' :title="item.name")
              td(v-text='item.type_name')
              td(v-text='item.tag' :title="item.tag")
              td(v-text='item.purpose')
              td(v-text='item.create_time')
              td(v-text='item.manager_name')
              td
                Icon(type="icon-detail" title="详情" plain size="mini" @click="showDetail(item)")
                Icon(type="icon-pass" title="通过" plain size="mini" @click="handeler('pass',[item.id])")
                Icon(type="icon-reject" title="驳回" plain size="mini" @click="handeler('reject',[item.id])")
      .pageWrap(v-if="page")
        el-pagination( :small="false" background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.num"
        :page-sizes="[10, 50, 100]"
        :page-size="page.offset"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total")
    //- 详情dialog
    Detail(
      :detailVisible.sync="detailVisible"
      v-if="detailVisible"
      :defaultData="detailData"
      :type="productType"
      :detailValue="detailValue"
      :detailType="detailType"
    )
</template>


<style lang="stylus" scoped rel="stylesheet/stylus">
@import '~common/stylus/mixin'

.bookName
  width calc(100% - 70px)
  display inline-block
  vertical-align middle
  no-wrap()
.serachWrap
  margin-bottom 15px
  min-width 1370px
.addNew
  float right
.cover-photo
  max-width 47px
  max-height 59px
  vertical-align middle
.el-form-item__label
  text-align left
.pass-tip
  padding-left 20px
  font-size 12px
  line-height 1
  color #a0a0a0
  bottom 0
  position absolute
.clear
  position absolute
  top 95px
  left 355px
  color #d9d9d9
  border-radius 50%
  background #efefef
  width 20px
  height 20px
  line-height 20px
  text-align center
  cursor pointer
.clear2
  position absolute
  top 95px
  left 516px
  color #d9d9d9
  border-radius 50%
  background #efefef
  width 20px
  height 20px
  line-height 20px
  text-align center
  cursor pointer
.clear3
  position absolute
  top 95px
  left 685px
  color #d9d9d9
  border-radius 50%
  background #efefef
  width 20px
  height 20px
  line-height 20px
  text-align center
  cursor pointer
</style>
