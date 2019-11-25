<script>
import {_addBooks} from "services/x-publish/digitalbooks"
import * as commonServices from 'services/x-read/common'
import formSerialize from 'form-serialize'
import { circleMixin,publicMixin } from "@/util/mixins"

export default {
  mixins: [publicMixin],
  props: {
    detailAddDialog: {
      type: Boolean,
      default: false,
    },
    singleElection:  Boolean,
    curSoucesList: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
      dataList: [],//列表信息
      page: null,
      currentType: 'book',
      contentType: [
        {name:"图书",value:'book'},
        {name:"主题",value:'theme'},
        {name:"听读",value:'audio'},
        {name:"视读",value:'video'},
        {name:"课件",value:'course'}
      ], //内容属性
    }
  },
  created() {
    log(this.curSoucesList)
  },
  methods: {
    getList(pageNum=this.page&&this.page.num||1, pageOffset=this.page&&this.page.offset||10, query) {
      const data = {
        pageNum,
        pageOffset,
        shelf: true,
        ...query,
        type: this.currentType || this.contentType[0].value,
      }
      commonServices.getMainList(data).then(res => {
        this.dataList = res.data
        this.page = res.page
      })
    },
    colse() {
      this.$emit('update:detailAddDialog',false)
    },
    seareHandeler(){//条件查询
      let query = formSerialize(document.querySelector("#detailSearchForm" ) , {hash:true})
      this.getList(1 , this.page.offset , query)
    },
    async addSelection() {//添加选中
      const page = document.querySelector(".addBookForm")
      const list = page.querySelectorAll('input[name="ids"]:checked')
      let array = []
      if(!list.length) {
        return this.$message.warning('请选择添加内容')
      }
      for(let item of list) {
        let index = this.curSoucesList.findIndex(items => {
          return items.b_id == item.value||items.id == item.value
        })
        if(index > -1){
          continue
        }
        array.push(this.dataList.find(items => items.id == item.value).id)
      }
      this.$emit('select',array)
    },
    checkAll(e,name){//全选
      const parent = document.querySelector('.' + name)
      parent.querySelectorAll('input[name="ids"]').forEach((item, index) => {
        item.checked = e.target.checked
      })
    },
    uncheckedAll(e){
      if(!this.singleElection){
        this.$refs.ids.forEach(item => item.checked = false)
        e.target.checked = true
      }
    },
    isChecked(id) {//选中状态
      if(this.curSoucesList.findIndex(item => item.b_id === id||item.id === id) > -1) {
        return true
      }
      return false
    },
    handleSizeChange(val) {//处理size变化
      let query = formSerialize(document.querySelector("#detailSearchForm" ) , {hash:true})
      this.getList(1, val, query)
    },
    handleCurrentChange(val) {//处理页码变化
      let query = formSerialize(document.querySelector("#detailSearchForm" ) , {hash:true})
      this.getList(val, this.page.offset, query)
    },
  },
  watch: {
    currentType(type) {
      this.getList(1)
    }
  }
}
</script>

<template lang="pug">
  div
    //- 添加
    el-dialog(
      :center="false"
      :visible="detailAddDialog"
      width="1000px"
      top="50px"
      :show-close="false"
      append-to-body
      )
      .header(slot="title")
        span(class="el-icon-close" @click="colse")
        el-tabs(value="detail")
          el-tab-pane(label="添加" name="detail")
      el-form.addBookForm
        span.group-inline(style="margin:0 20px;")
          el-radio-group(v-model="currentType")
            el-radio-button(v-for="item in contentType"  :key="item.id" :label="item.value") {{item.name}}
        .serachWrap
          form#detailSearchForm
            span.group-inline
              input.form-control( placeholder="输入名称"  name="name")
            span.group-inline
              TimePick(:inputsName="['start_time','end_time']")
            span.group-inline.right
              el-button(@click="seareHandeler" type="primary" icon="el-icon-search" plain) 搜索
              el-button(@click="addSelection" type="primary" plain) 添加选中
        table.table(width="100%")
            thead
              tr
                th(width=50) 选择
                th 名称
                th 标签
                th 类型
                th 创建时间
            tbody(v-if="dataList.length")
              tr(v-for="item,index in dataList")
                td
                  input(type="checkbox" :data-type="item.status" :value="item.id" :checked="isChecked(item.id)" name="ids")
                td {{item.books_info.name}}
                td {{item.books_info.tag}}
                td {{item.type_name}}
                td {{item.create_time}}
        .pageWrap(v-if="page")
          el-pagination( :small="false" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.num"
            :page-sizes="[10, 50, 100]"
            :page-size="page.offset"
            layout="total, sizes,prev, pager, next, jumper"
            :total="page.total"
          )
      div(slot="footer" class="dialog-footer")
        el-button(type="info"  @click="colse") 取消
        el-button(type="primary"  @click="addSelection") 确定
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
</style>


