<script>
import formSerialize from 'form-serialize'
import * as managerServices from 'services/common/manager'
import { publicMixin } from '@/util/mixins'
import urljoin from 'url-join'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      query: null,
      path: urljoin(baseUrl, '/app/systemManage'),
      activeName: 'role',
      publish: null,
      read: null,
      auth: null,
      detailVisible: false,
      detailDate: {},
      detailRules: {
        name: [{ required: true, message: '请输入角色名', trigger: 'blur' }],
        exp: [{ required: true, message: '请输入角色描述', trigger: 'blur' }],
      },
    }
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
      this.detailDate = {}
      managerServices.detailRole({ id }).then(res => {
        this.detailDate = res
        this.detailVisible = true
      })
    },
    deleteHandeler(id = []) {
      if (!id.length) {
        Array.from(
          document.querySelectorAll("[name='checkbox']:checked")
        ).forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的内容！')
      }
      this.$confirm('确认删除？')
        .then(_ => {
          managerServices.deleteRole({ id }).then(
            res => {
              this.getList()
            },
            err => {
              this.$message.error(err.message)
            }
          )
        })
        .catch(_ => {})
    },
    async save() {
      for (let key in this.detailDate.accesses) {
        let obj = {}
        this.detailDate.accesses[key].forEach(el => {
          for (let n in el) {
            if (el[n] == true) {
              el[n] = 1
            } else if (el[n] == false) {
              el[n] = 0
            }
          }
          obj[el.identifier] = el
        })
        this.detailDate.accesses[key] = obj
      }
      this.$refs.detailDialog.validate(valid => {
        if (valid) {
          let arr = { ...this.publish, ...this.read }
          this.detailDate.accesses = JSON.stringify(this.detailDate.accesses)
          managerServices
            .role(this.detailDate)
            .then(res => {
              this.$message.success('保存成功')
              this.getList()
              this.detailVisible = false
            })
            .catch(({ payload }) => {
              for (let i in payload.messages) {
                this.$message.error(payload.messages[i])
                break
              }
            })
        } else {
          this.$message.error('error submit!!')
          return false
        }
      })
    },
    handlePageClick(item, e) {
      let type
      if (!e.target.checked) {
        type = false
        e.target.checked = false
      } else {
        type = true
      }
      item.checkedList = type
      item.allow_create = type
      item.allow_delete_own = type
      item.allow_delete_all = type
      item.allow_edit_own = type
      item.allow_edit_all = type
      item.allow_view_own = type
      item.allow_view_all = type
    },
    handleOptionsClick(obj, key, e) {
      obj[key] = e.target.checked
      if (
        obj.allow_create &&
        obj.allow_view_own &&
        obj.allow_view_all &&
        obj.allow_edit_all &&
        obj.allow_edit_own &&
        obj.allow_delete_all &&
        obj.allow_delete_own
      ) {
        obj.checkedList = 1
      } else {
        obj.checkedList = 0
      }
    },
    isChecked(item) {
      //页面是否选中
      return (
        item.allow_create &&
        item.allow_delete_all &&
        item.allow_edit_all &&
        item.allow_view_all
      )
    },
    selectAll(lists, e) {
      // 权限全选
      let type
      if (!e.target.checked) {
        type = 0
        e.target.checked = false
      } else {
        type = 1
      }
      for (let item in lists) {
        lists[item].checkedList = type
        lists[item].allow_create = type
        lists[item].allow_delete_own = type
        lists[item].allow_delete_all = type
        lists[item].allow_edit_own = type
        lists[item].allow_edit_all = type
        lists[item].allow_view_own = type
        lists[item].allow_view_all = type
      }
    },
  },
  computed: {
    isAllChecked(type) {
      // 所有是否选中
      let accesses = this.detailDate.accesses
      for (let key of Object.keys(accesses)) {
        let item = accesses[key]
        if (
          !item.allow_create ||
          !item.allow_delete_all ||
          !item.allow_edit_all ||
          !item.allow_view_all
        ) {
          return false
        }
      }
    },
  },
}
</script>

<template lang="pug">
.role.innerBox
  .searchWrap.searchBar
    .NavList
      el-tabs(v-model="activeName" @tab-click="handleNavClick")
        el-tab-pane(label="管理员列表" name="manager")
        el-tab-pane(label="管理员日志" name="journal")
        el-tab-pane(label="角色管理" name="role")
    form#mainForm
      span.group-inline
        input.form-control(name="name" placeholder="输入角色名搜索")
      span.group-inline
          el-button(type="primary" icon="el-icon-search" @click="seareHandeler" plain) 搜索
          el-button(type="primary" icon="el-icon-circle-plus-outline" @click="showDetaile()" plain) 新增
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
  el-dialog(:visible.sync="detailVisible" :before-close="handleClose" :lock-scroll="false" width="1200px")
    .header(slot="title")
      el-tabs(value="detail")
          el-tab-pane(label="详情" name="detail")
    el-form(:model="detailDate" :rules="detailRules" ref="detailDialog")
      el-form-item(label="角色名:" label-width="120px" prop="name")
        el-input(v-model="detailDate.name")
      el-form-item(label="角色描述:" label-width="120px" prop="exp")
        el-input(type="textarea" v-model="detailDate.exp")
    el-tabs(value="common权限" type="border-card")
      el-tab-pane(:label="detailDate.pointer[key]['name']+'权限'" :name="key+'权限'" v-for="(vo,key) in detailDate.accesses" :key = "vo.id")
        table.table.border(width="100%" id="detailTable1") 
          thead
            tr
              th(width="300px")
                span 页面显示
                input(type="checkbox" @click="selectAll(vo,$event)")
                span 全选 
              th 权限功能
          tbody
            tr(v-for="item,i in vo")
              td(align="center")
                input(type="checkbox" :checked="item.checkedList"  @click="handlePageClick(item,$event)")
                label {{item.name}}
              td(align="left")
                ul(class="options" )
                  li
                    input(type="checkbox"  :checked="item.allow_create" @click="handleOptionsClick(item,'allow_create',$event)")
                    label 新增
                  li
                    input(type="checkbox" :checked="item.allow_delete_own" @click="handleOptionsClick(item,'allow_delete_own',$event)")
                    label 删除自己的
                  li
                    input(type="checkbox"  :checked="item.allow_delete_all" @click="handleOptionsClick(item,'allow_delete_all',$event)")
                    label 删除全部
                  li
                    input(type="checkbox"  :checked="item.allow_edit_own" @click="handleOptionsClick(item,'allow_edit_own',$event)")
                    label 修改自己的
                  li
                    input(type="checkbox"  :checked="item.allow_edit_all" @click="handleOptionsClick(item,'allow_edit_all',$event)")
                    label 修改全部
                  li
                    input(type="checkbox"  :checked="item.allow_view_own" @click="handleOptionsClick(item,'allow_view_own',$event)")
                    label 查询自己的
                  li
                    input(type="checkbox" :checked="item.allow_view_all" @click="handleOptionsClick(item,'allow_view_all',$event)")
                    label 查询全部
    div(slot="footer" class="dialog-footer")
      el-button(type="info" @click="handleClose" ) 取消
      el-button(type="primary" @click="save" ) 确定
</template>


<style lang="stylus" scoped rel="stylesheet/stylus">
.searchWrap.searchBar
  margin 0 0 15px 0
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
.icon
  margin-right 10px
</style>
