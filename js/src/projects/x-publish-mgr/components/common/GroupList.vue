<script>
export default {
  props:['groupList' , 'currGroup'],
  data(){
    return {
      newGroupDialogOpen:false,
      updateGroupDialogOpen:false,
      currEditGroup:null,
    }
  },
  created(){

  },
  computed:{
  },
  methods:{
    groupChange(id){
      this.$emit('groupChange' , id) // 向父组件发送事件和数据
    },
    addGroupDialog(){

    },
    delGroup(item){
      this.$confirm("是否删除分组:"+item.name).then(res=>{
        dir(res)//confirm
        this.$emit("delGroup",item.id)
      }).catch(res=>{
        dir(res)//cancle
      })
    },
    updateGroupDialog(item){
      this.updateGroupDialogOpen = true;
      this.currEditGroup = item ;
    },
    // 添加分组
    addGroup(){
      var flag = this.$refs.addGroupForm.valiAll()
      if(!flag) return
      var node = document.querySelector('#addGroupForm' )

      this.$emit('addGroup',node)
      this.newGroupDialogOpen = false
    },
    updateGroup(){
      var flag = this.$refs.updateGroupForm.valiAll()
      if(!flag) return
      var node = document.querySelector('#updateGroupForm' )
      this.$emit('updateGroup',node)
      this.updateGroupDialogOpen = false
    }
  },
}
</script>

<template lang="pug">
.div
  .groupWrap
    .list
      ul
        li.licontent( :class="{red: item.id == currGroup }"  v-for="item in groupList" )
          .name.ellipsis(  @click="groupChange(item.id)"   :title="`${item.name}(${item.num})` "  )
            span.title {{item.name}}
            span {{`(${item.num})`}}
          .btns( v-if="item.id != '' && item.id!='non' "  )
            span(@click="updateGroupDialog(item)")
              i.el-icon-edit
            span(@click="delGroup(item)")
              i.el-icon-delete()
    .addGroupBtnWrap
      el-button(@click="newGroupDialogOpen = true"  type="primary" plain )
        i.el-icon-plus 新建分组
  .dialogs
    //- 新增分组group   diglog不适合提出来, dialog有很多  , 频繁回调父组件不见得是件好事, 所以在这里宁愿多点代码
    el-dialog(
    title="新增"
    :visible.sync="newGroupDialogOpen"
    v-if="newGroupDialogOpen"
    width="500px"
    )
      .formWrap
        VaForm(ref="addGroupForm")
          form#addGroupForm
            .group
              input.form-control( v-va="{ type:'required' }"   name="name" )
      span.dialog-footer( slot="footer" class="")
        el-button(type="info" @click="newGroupDialogOpen = false" ) 取消
        el-button( type="primary" @click="addGroup") 确定
    el-dialog(
    title="修改"
    :visible.sync="updateGroupDialogOpen"
    v-if="updateGroupDialogOpen"
    width="500px"
    )
      .formWrap
        VaForm(ref="updateGroupForm")
          form#updateGroupForm(v-if="currEditGroup" )
            .group
              input.form-control(v-va="{ type:'required' }"  name="name" :value="currEditGroup.name" )
              input.hide(name="id" :value="currEditGroup.id" )
      span.dialog-footer( slot="footer" class="")
        el-button( type="info"  @click="updateGroupDialogOpen = false" ) 取消
        el-button( type="primary" @click="updateGroup") 确定
</template>


<style lang="stylus" scoped>
.groupWrap
  display inline-block
  width 209px
  min-height 545px
  background #fff
  position relative
  // .title
  //   height 50px
  //   // background #efefef
  //   cursor pointer
  //   line-height 50px
  //   font-size 14px
  //   padding-left 13px
  //   color #666666
  //   &.red
  //     background #efefef
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
        display initial
        // font-weight 600
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
    width 150px
    font-size 14px
    position relative
    .title
      max-width 110px
      display inline-block
      overflow hidden
      text-overflow ellipsis
      white-space nowrap
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
    width 50px
    height 100%
    letter-spacing 7px
    >span
      display inline-block
      width 50%
      font-size 0px
      height 50px
      >i
        font-size 15px
        width 100%
        text-align center
        line-height 50px
        &.el-icon-edit
          color #44c3aa
        &.el-icon-delete
          color #e75f5f
.addGroupBtnWrap
  text-align center
  margin 15px 0
  .addGroupBtn
    display inline-block
    text-align center
    width 124px
    height 30px
    border 1px solid #999999
    line-height 30px
    cursor pointer
</style>
