<script>
import formSerialize from "form-serialize"
import Menu from "@/components/common/Menu"

import * as managerServices from 'services/common/manager'
import {publicMixin} from '@/util/mixins'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      query: null,
      path: 'jurisdiction',
      activeName: "role",
      detailVisible: false,
      detailDate: {
        id: '',
        name: '',
        exp: '',
        accesses: {},
      },
      detailRules: {
        name: [
          { required: true, message: '请输入角色名', trigger: 'blur' },
        ],
        exp: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
        ]
      }
    };
  },
  methods: {
    getList(pageNum = 1, pageOffset = 1000, searchQuery) {
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
      }
      managerServices.listRole(data).then(res => {
        this.page = res.page
        this.pageList = res.data
      })
    },
    showDetaile(id) {
      this.detailDate.id =
      this.detailDate.name =
      this.detailDate.exp = ''
      managerServices.detailRole({id}).then(res => {
        if(id){
          let roleInfo = this.pageList.find(item => item.id === id)
          this.detailDate.id = id
          this.detailDate.name = roleInfo.name
          this.detailDate.exp = roleInfo.exp
        }
        this.detailDate.accesses = res.data
        this.detailVisible = true
      })
    },
    deleteHandeler(id = []) {
      if (!id.length) {
        Array.from(document.querySelectorAll("[name='checkbox']:checked")).forEach(item => {
          id.push(item.value)
        });
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的内容！')
      }
      this.$confirm("确认删除？")
        .then(_ => {
          managerServices.deleteRole({id}).then(res => {
            this.getList()
          })
        })
        .catch(_ => {});
    },
    save() {
      this.$refs.detailDialog.validate((valid) => {
        if (valid) {
          let loading = this.$loading({text:"保存中..." , background:"rgba(0, 0, 0, 0.8)"})
          managerServices.role(this.detailDate).then(res => {
            this.$message.success('保存成功')
            loading.close()
            this.getList()
            this.detailVisible = false
          }).catch(({payload}) => {
            loading.close()
            for(let i in payload.messages){
              this.$message.error(payload.messages[i])
              break
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handlePageClick(id,e) {
      let type = e.target.checked ? 1 : 0
      let list = this.detailDate.accesses[id]
      if(!type){
        this.$refs.checkAll.checked = false
      }
      list.allow_create = type
      list.allow_delete_all = type
      list.allow_edit_all = type
      list.allow_view_all = type
    },
    handleOptionsClick(index,e) {
      if(!e.target.checked){
        this.$refs.checkAll.checked = false
      }
      let type = e.target.getAttribute("data-type")
      let allNode = e.path[3].querySelectorAll('input').length
      let checked = e.path[3].querySelectorAll('input:checked').length
      this.detailDate.accesses[index][type] = allNode === checked ? 1 : 0
    },
    isChecked(item) { //页面是否选中
      return item.allow_create&&item.allow_delete_all&&item.allow_edit_all&&item.allow_view_all
    },
    selectAll(e) { // 权限全选
      let type = e.target.checked ? 1 : 0
      const lists = this.detailDate.accesses
      for(let item in lists){
        lists[item].allow_create = type
        lists[item].allow_delete_all = type
        lists[item].allow_edit_all = type
        lists[item].allow_view_all = type
      }
    }
  },
  computed: {
    isAllChecked() { // 所有是否选中
      let accesses = this.detailDate.accesses
      for(let key of Object.keys(accesses)){
        let item = accesses[key]
        if(!item.allow_create||!item.allow_delete_all||!item.allow_edit_all||!item.allow_view_all){
          return false
        }
      }
      return true
    },
  },
  components: { Menu }
};
</script>

<template lang="pug">
.indexs
  .mainRight
    .maindata
      .serachWrap
        .NavList
          el-tabs(v-model="activeName" @tab-click="handleNavClick")
            el-tab-pane(label="管理员列表" name="manager")
            el-tab-pane(label="管理员日志" name="journal")
            el-tab-pane(label="角色管理" name="role")
        form#mainForm
          el-row(:gutter="5")
            el-col(:span="3")
              input.form-control(name="name" placeholder="输入用户名搜索")
            el-col.right(:span="21")
              el-button(type="primary" icon="el-icon-search" @click="seareHandeler" plain) 搜索
              el-button(type="primary" icon="el-icon-plus" @click="showDetaile()" plain) 新增
      .tableWrap
        table.table
          thead
            tr
              th 角色名
              th(width="400") 角色描述
              th 操作
          tbody(v-if="pageList.length")
            tr(v-for="item in pageList")
              td(v-text='item.name')
              td(v-text='item.exp')
              td
                span.icon.icon-detail(type="primary" title="详情" plain size="mini" @click="showDetaile(item.id)")
                span.icon.icon-delete(type="primary" title="删除" plain size="mini" @click="deleteHandeler([item.id])")
    //- 详情dialog
    el-dialog(:visible.sync="detailVisible" :before-close="handleClose" :lock-scroll="false" width="70%")
      .header(slot="title")
        el-tabs(value="detail")
            el-tab-pane(label="详情" name="detail")
      el-form(:model="detailDate" :rules="detailRules" ref="detailDialog")
        el-form-item(label="角色名:" label-width="120px" prop="name")
          el-input(v-model="detailDate.name")
        el-form-item(label="角色描述:" label-width="120px" prop="exp")
          el-input(type="textarea" v-model="detailDate.exp")
      table.table.border(width="100%" id="detailTable")
          thead
            tr
              th
                span 页面显示
                input(type="checkbox" @click="selectAll" ref="checkAll" v-if='detailDate.accesses' :checked="isAllChecked")
                span 全选
              th 权限功能
          tbody()
            tr(v-for="item,key in detailDate.accesses")
              td(align="center")
                input(type="checkbox" name="pages" ref="ids" :id="'item_' + item.id" :checked="isChecked(item)" @click="handlePageClick(key,$event)")
                label(v-text="item.name" :for="'item_' + item.id")
              td(align="left")
                ul(class="options")
                  li
                    input(type="checkbox" :id="'items_' + item.id + 'add'" data-type="allow_create" :checked="item.allow_create" @click="handleOptionsClick(key,$event)")
                    label(:for="'items_' + item.id + 'add'") 新增
                  li
                    input(type="checkbox" :id="'items_' + item.id + 'del'" data-type="allow_delete_all" :checked="item.allow_delete_all" @click="handleOptionsClick(key,$event)")
                    label(:for="'items_' + item.id + 'del'") 删除
                  li
                    input(type="checkbox" :id="'items_' + item.id + 'mod'" data-type="allow_edit_all" :checked="item.allow_edit_all" @click="handleOptionsClick(key,$event)")
                    label(:for="'items_' + item.id + 'mod'") 修改
                  li
                    input(type="checkbox" :id="'items_' + item.id + 'viw'" data-type="allow_view_all" :checked="item.allow_view_all" @click="handleOptionsClick(key,$event)")
                    label(:for="'items_' + item.id + 'viw'") 查询
      div(slot="footer" class="dialog-footer")
        el-button(type="info" @click="handleClose" ) 取消
        el-button(type="primary" @click="save" ) 确定
</template>


<style lang="stylus" scoped rel="stylesheet/stylus">
.serachWrap
  margin-bottom 15px
.el-input
  width 300px
.addNew
  float right
.el-form-item__label
  text-align left
.pass-tip
  padding-left 20px
  font-size 12px
  line-height 1
  color #a0a0a0
  bottom 0
  position absolute
.options
  li
    padding-right 20px
    display inline-block
.el-dialog
  .table th, .table td
    border-right 1px solid #ddd
</style>
