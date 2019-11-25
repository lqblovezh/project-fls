<script>
import formSerialize from "form-serialize"
import * as managerServices from 'services/system/auth'
import {publicMixin} from '@/util/mixins'
import urljoin from 'url-join'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      page:{num:1,offset:10,total:0},
      query: {
        id: '',
      },
      path: urljoin(baseUrl, '/app/systemManage'),
      activeName: "journal",
      timeValue: null,
      roleInfo:{
        roleValue: '',
        roleList: []
      },
    };
  },
  async created() {
    this.getRoleInfo()
  },
  methods: {
    getRoleInfo(pageNum = 1, pageOffset = 1000,) {
      managerServices.listRole({pageNum, pageOffset}).then(res => {
        this.roleInfo.roleList = res.data
      })
    },
    getList(pageNum=this.page.num, pageOffset=this.page.offset, searchQuery) {
      this.query.id = this.$route.query.id
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
        ...this.query,
        role: this.roleInfo.roleValue,
      };
      managerServices.logManager(data).then(res => {
       this.page.total = res.page.total
       this.pageList = res.data
      });
    },
  }
};
</script>

<template lang="pug">
.journal.innerBox
  .searchWrap.searchBar
    .NavList
      el-tabs(v-model="activeName" @tab-click="handleNavClick")
        el-tab-pane(label="管理员列表" name="manager")
        el-tab-pane(label="操作日志" name="journal")
        el-tab-pane(label="角色管理" name="role")
    form#mainForm
        span.group-inline
          input.form-control(name="name" placeholder="输入用户名搜索")
        span.group-inline
          input.form-control(name="nick_name" placeholder="输入名称搜索")
        span.group-inline
          input.form-control(name="client_ip" placeholder="输入IP搜索")
        span.group-inline
          TimePick(:inputsName="['start_time','end_time']")
        span.group-inline
          el-select(v-if="roleInfo.roleList" v-model="roleInfo.roleValue" name="searchName" placeholder="选择角色搜索" clearable)
            el-option(
              v-for="item in roleInfo.roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            )
        span.group-inline
          el-button(type="primary" icon="el-icon-search" @click="seareHandeler" plain) 搜索
  .tableWrap
    table.table
      thead
        tr
          th 用户名
          th 名称
          th 角色
          th IP地址
          th 操作时间
          th 操作记录
      tbody(v-if="pageList.length")
        tr(v-for="item in pageList")
          td(v-text='item.manager_name')
          td(v-text='item.manager_nick_name')
          td
            span(v-for="(items,key) in item.roles") {{items}}
          td(v-text='item.client_ip')
          td(v-text='item.create_time')
          td(v-text='item.content')
  .pageWrap(v-if="page")
    el-pagination( :small="false" background
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="page.num"
    :page-sizes="[10, 50, 100]"
    :page-size="page.offset"
    layout="total, sizes, prev, pager, next, jumper"
    :total="page.total")

</template>


<style lang="stylus" scoped rel="stylesheet/stylus">
.journal
  margin-top -20px
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
.left
  float left
</style>
