<script>
import formSerialize from "form-serialize"
import * as managerServices from 'services/common/manager'
import {publicMixin} from '@/util/mixins'
import urljoin from 'url-join'

export default {
  mixins: [publicMixin],
  data() {
    return {
      pageList: [],
      page: null,
      query: null,
      path: urljoin(baseUrl, '/app/systemManage'),
      activeName: "manager",
      timeValue: null,
      choose:[],
      detailVisible: false,
      roleInfo:{
        roleValue: '',
        roleList: []
      },
      detailDate: {
        id: '',
        name: '',
        nick_name: '',
        phone: '',
        email: '',
        role: '',
        reset: '',
      },
      detailRules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        nick_name: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入联系邮箱', trigger: 'blur' },
        ],
      }
    };
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      // await this.getList();
      this.getRoleInfo()
    },
    getRoleInfo(pageNum = 1, pageOffset = 1000,) {
      managerServices.listRole().then(res => {
        this.roleInfo.roleList = res.data
        this.choose = this.detailDate.role
      })
    },
    getList(pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10, searchQuery) {
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
        role: this.roleInfo.roleValue,
      };
      managerServices.listManager(data).then(res => {

        this.page = res.page
        this.pageList = res.data
      });
    },
    showDetaile(id) {
      this.detailDate.id =''
      this.detailDate.name =''
      this.detailDate.nick_name =''
      this.detailDate.phone =''
      this.detailDate.email =''
      this.detailDate.reset =''
      this.detailDate.role = []
      if (!id) {
        this.detailVisible = true
      }else{
        let roleInfo = this.pageList.find(item => item.id === id)
        log(roleInfo,888)
        this.detailDate.id = id
        this.detailDate.name = roleInfo.name
        this.detailDate.nick_name = roleInfo.nick_name
        this.detailDate.phone = roleInfo.phone
        this.detailDate.email = roleInfo.email
        this.detailDate.role = roleInfo.roles.map(el=>{
             return el.name
          })
        this.detailVisible = true
      }

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
      this.$confirm("确认删除？").then(_ => {
        managerServices.deleteManager({id}).then(res => {
          this.getList()
          this.$message({
            message:'删除成功',
            type:'success'
          })
        })
      }).catch(_ => {});
    },
    async save() {
      let arr =[];
      this.roleInfo.roleList.forEach(el=>{
        if(this.detailDate.role.includes(el.name)){
           arr.push(el.id)
        }
      })
      this.$refs.detailDialog.validate(async(valid) => {
        if (valid) {
           if(!arr.length){
             arr.push('xx')
           }
            if(!this.detailDate.id) {
              await managerServices.addManager({
                ...this.detailDate,
                roles: arr,
              }).then(res => {
                this.getList()
                this.$message({
                  message:'添加成功',
                  type:'success'
                })
                this.detailVisible = false
              },err=>{
                log(err,666) 
              })
              return
            }
            await managerServices.modifyManager({
              ...this.detailDate,
              roles:arr,
            }).then(res => {
              this.getList()
              this.$message({
                message:'修改成功',
                type:'success'
              })
              this.detailVisible = false
            },err=>{
              log(err)
            })
          }
           else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetPassword() {
      this.$confirm("是否确认重置密码?")
        .then(_ => {
          this.detailDate.reset_pass = "1"
        })
        .catch(_ => {});
    },
    viewLog(id){
      let arrurl=this.$route.path.split('/');
          arrurl[arrurl.length-1] = 'journal'
      this.$router.push({
        path: arrurl.join('/'),
        query: {
          id,
        }
      })
    }
  }
};
</script>

<template lang="pug">
.content
  .searchWrap
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
          input.form-control(name="phone" placeholder="输入电话搜索")
        span.group-inline
          input.form-control(name="email" placeholder="输入邮箱搜索")
        span.group-inline
          TimePick(:inputsName="['start_time','end_time']")
        span.group-inline
          el-select(v-if="roleInfo.roleList" v-model="roleInfo.roleValue"  placeholder="选择角色搜索" clearable)
            el-option(
              v-for="item in roleInfo.roleList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            )
        span.group-inline
          el-button(type="primary" icon="el-icon-search" @click="seareHandeler" plain) 搜索
          el-button(type="primary" icon="el-icon-circle-plus-outline" @click="showDetaile()" plain) 新增
  .tableWrap
    table.table
      thead
        tr
          th 用户名
          th 昵称
          th 联系电话
          th 联系邮箱
          th 创建时间
          th 角色
          th 操作
      tbody(v-if="pageList.length")
        tr(v-for="item in pageList")
          td(v-text='item.name')
          td(v-text='item.nick_name')
          td(v-text='item.phone')
          td(v-text='item.email')
          td(v-text='item.create_time')
          td
            template(v-for="(items,i) in item.roles")
              span(v-if="item.roles.length!= i+1 ") {{items.name}} ,
              span(v-else) {{items.name}}
          td(id="icon")
            span.icon.icon-detail(type="primary" title="详情" plain size="mini" @click="showDetaile(item.id)")
            span.icon.icon-preview(type="primary" title="查看日志" plain size="mini" @click="viewLog(item.id)")
            span.icon.icon-delete(type="primary" title="删除" plain size="mini" @click="deleteHandeler([item.id])")
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
  el-dialog(
  :visible.sync="detailVisible"
  :before-close="handleClose"
  :lock-scroll="false"
  :close-on-click-modal="false"
  width="600px"
  )
    .header(slot="title")
      el-tabs(value="detail")
          el-tab-pane(label="详情" name="detail")
    el-form(:model="detailDate" :rules="detailRules" ref="detailDialog")
      el-form-item(label="用户名:" label-width="120px" prop="name")
        el-input(v-model="detailDate.name" :disabled="detailDate.id!=''")
      el-form-item(label="名称:" label-width="120px" prop="nick_name")
        el-input(v-model="detailDate.nick_name")
      el-form-item(label="联系电话:" label-width="120px" prop="phone")
        el-input(v-model="detailDate.phone")
      el-form-item(label="联系邮箱:" label-width="120px" prop="email")
        el-input(v-model="detailDate.email")
      el-form-item(label="角色:" label-width="120px" prop="role")
        //- el-select(v-if="roleInfo.roleList" v-model="detailDate.role" name="" placeholder="选择角色")
        //-   el-option(
        //-     v-for="item in roleInfo.roleList"
        //-     :key="item.name"
        //-     :label="item.name"
        //-     :value="item.id"
        //-   )
        el-checkbox-group(v-model="detailDate.role")
          el-checkbox(v-for="item in roleInfo.roleList" :label="item.name" :key="item.id") {{item.name}}
            //- span {{"x-"+item.app_type}}
      el-form-item(label="登录密码:" label-width="120px" v-show="detailDate.id")
        el-button(type="primary" @click="resetPassword" size="small" plain) 重置
        span(class="pass-tip") 将重置为初始密码：123456

    div(slot="footer" class="dialog-footer")
      el-button(type="info" @click="handleClose" size="small" ) 取消
      el-button(type="primary" @click="save" ) 确定
</template>


<style lang="stylus" scoped rel="stylesheet/stylus">
.searchWrap
  margin 0 0 15px 0
  min-width 1700px
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
  bottom 12px
  position absolute
.icon
  margin-right 10px
</style>
