<script>

import * as services from 'services/x-read/circleTheme'
import * as uServices from 'services/x-read/member'

export default {
  props:[],
  data(){
    return {
      newMemberDialogOpen:false,
      memberList:null,
      roleList:null,
      isSearch:false,
      page:null,
    }
  },
  created(){
    this.getList()
  },
  computed:{
  },
  methods:{
    getList(pageNum = 1, pageOffset = 10, searchQuery) { // 获取所有成员
      const data = {
        pageNum,
        pageOffset,
        ...searchQuery,
      }
      services.userList({id:this.$route.query.id,...data}).then(res =>{
        this.memberList = res.data
      })
    },
    MemberChange(id){
      this.$emit('MemberChange' , id) // 向父组件发送事件和数据
    },
    invitation(){//邀请新成员
      uServices.getList().then(res =>{
        this.roleList = res.data
        this.newMemberDialogOpen = true
      })
    },
    delMember(item){//删除成员
      this.$confirm("是否删除成员:"+item.nick_name).then(res=>{
        services.userDel({id:[item.id]}).then(res => {
          this.getList()
        })
      }).catch(res=>{
      })
    },
    addMember(){// 添加成员
      let id = this.$getChecked()
      if(!id){
        return
      }
      services.userAdd({
        book_circle_id: this.$route.query.id,
        user_id: id,
      }).then(res =>{
        this.getList()
        this.newMemberDialogOpen = false
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    searchMember(e) { //搜索成员
      this.getList(1,10,{user_name:e.target.value})
      this.isSearch = false
    },
    modify(status,item) {//禁言2或隐藏3
      if(!item.id){
        return
      }
      if(status == item.status){
        return 
      }
      services.userModify({status,id:item.id}).then(res => {
        this.$message.success("修改成功！")
        this.getList()
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    handleClick() { //选择成员事件
      
    }
  },
}
</script>

<template lang="pug">
.memberList
  .MemberWrap
    .list
      ul
        li.licontent
          .name.ellipsis(v-if="!isSearch") 全部成员
          .searchWrap(v-if="isSearch")
            input.form-control(@keyup.13="searchMember")
            i.el-icon-close(@click="isSearch=false")
          .btns(v-if="!isSearch")
            span(@click="isSearch=true")
              i.el-icon-search
        li.licontent(v-for="item in memberList")
          .name.ellipsis(@click="MemberChange(item.id)" ) {{item.nick_name}}
            .label
              span.exp(v-if="item.is_exp") 专家
              span.author(v-if="item.is_author") 作者
              span.owner(v-if="item.owner") 题主
          .btns(v-if="item.id")
            span(@click="modify(item.status =='2'||item.status =='3'?'1':'2',item)" title='禁言' :disabled="item.status == '2'")
              i.icon-reply(:class="{'icon-un-reply':item.status=='2'||item.status=='3'}")
            span(@click="modify(item.status =='3'?'2':'3',item)" title='隐藏')
              i.icon-preview(:class="{'icon-un-preview':item.status=='3'}" :disabled="item.status == '3'")
            span(@click="delMember(item)" title='删除')
              i.el-icon-delete
    .addMemberBtnWrap
      el-button(@click="invitation" class="el-icon-plus"  type="primary" plain ) 邀请新成员
    //- 新增成员Member
    el-dialog(
      :visible.sync="newMemberDialogOpen"
      v-if="newMemberDialogOpen"
      :lock-scroll="false"
      width="1000px"
    )
      .header(slot="title")
        el-tabs(value="ff")
          el-tab-pane(label="邀请新成员" name="ff")
      ul.content
        li(v-for="item,index in roleList")
          input(type="checkbox" ref="ids" :id="'items_' + item.id" @click="handleClick(index,$event)" :value="item.id")
          label.ellipsis(:for="'items_' + item.id") {{item.name}}
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="newMemberDialogOpen = false" type="info" size="small") 取消
        el-button( @click="addMember" type="primary" size="small") 确定
</template>


<style lang="stylus" scoped>


.searchWrap
  height 50px
  line-height @height
  input
    height 30px
    line-height @height
    width calc(100% - 50px)
    border 1px solid #39baa1
  i
    color #39baa1
.memberList
  display inline-block
  margin-left 20px
.MemberWrap
  display inline-block
  width 209px
  min-height 545px
  background #fff
  position relative
  .title
    height 50px
    cursor pointer
    line-height 50px
    font-size 14px
    padding-left 13px
    color #666666
    &.red
      background #efefef
.formWrap
  text-align center
.red
  background #efefef
.licontent
  height 50px
  line-height 50px
  padding-left 13px
  position relative
  cursor pointer
  &:first-child
    text-indent 10px
    font-size 16px
    color #424857
    font-weight 500
    &:after
      border-bottom 1px solid #e3e6ec
      z-index 10
    .name
        font-size 16px
    &:before
      content " "
      width 3px
      height 19px
      background #39baa1
      position absolute
      z-index 10
      margin-top 15px
      margin-left -10px
  .name
    display inline-block
    height 100%
    width 100%
    overflow hidden
    width 120px
    font-size 14px
    position relative
    .label
      display inline-block
      font-size 12px
      height 20px
      line-height 20px
      position relative
      top 50%
      margin-top -10px
      span
        padding 0 3px
        font-size 12px
        &.owner
          background #DB9D5F
        &.exp,&.author
          background #62A09A
  &:after
      content " "
      position absolute
      width 188px
      border-bottom 1px dashed #e3e6ec
      bottom 0
      left 10px
  .btns
    position absolute
    right 0
    display inline-block
    width 80px
    height 100%
    letter-spacing 7px
    >span
      display inline-block
      width 33.33%
      height 50px
      color #47a696
      .isClose
        color #ddd
      >i
        font-size 15px
        width 100%
        text-align center
        line-height 50px
        &.el-icon-delete
          color #e75f5f
.addMemberBtnWrap
  text-align center
  margin-top 15px
  .addMemberBtn
    display inline-block
    text-align center
    width 124px
    height 30px
    border 1px solid #999999
    line-height 30px
    cursor pointer
.el-icon-search
  color rgb(71, 166, 150)
  position relative
  left -30px
.el-dialog__body
  .content
    li
      cursor pointer
      width 160px
      display inline-block
      label 
        width 120px
        display inline-block
</style>


