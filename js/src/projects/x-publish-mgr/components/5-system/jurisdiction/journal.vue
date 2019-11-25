<script>
import formSerialize from "form-serialize"
import Menu from "@/components/common/Menu"
import Top from "@/components/common/Top"

import * as managerServices from 'services/common/manager'
import {publicMixin} from '@/util/mixins'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      page: null,
      query: {
        id: '',
      },
      path: 'jurisdiction',
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
    getList(pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10, searchQuery) {
      this.query.id = this.$route.query.id
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
        ...this.query,
        role: this.roleInfo.roleValue,
      };
      managerServices.logManager(data).then(res => {
        this.page = res.page
        this.pageList = res.data
      });
    },
  },
  components: { Menu, Top }
};
</script>

<template lang="pug">
.indexs
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/jurisdiction")
  .mainRight
    .maindata
      .serachWrap
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
            el-col.right(:span="4")
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
</style>
