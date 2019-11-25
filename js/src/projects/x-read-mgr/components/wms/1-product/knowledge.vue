<script>
import formSerialize from 'form-serialize'
import AnchorList from  './anchorList'
import Reader from '@/components/common/Reader'
import * as nowledgServices from 'services/x-publish/nowledges'
import * as digitalServices from 'services/x-publish/digitalbooks'

const [
  Anchors_chapter,
  Anchors_contetn,
  Anchors_audio,
  Anchors_video,
] = ['章节锚点','内容锚点','音频锚点','视频锚点']

export default {
  components: { AnchorList, Reader},
  props:['type' , 'constitute' , 'detailId'],
  async created(){
    try{
      // await this.getGlist()//获取左侧菜单并获取下级信息
      // await this.getProgress()//获取进度
    }
    catch(res) {
    }
  },
  data() {
    return {
      list:null,
      glist:null,
      page:null,
      Anchors_chapter,
      Anchors_contetn,
      Anchors_audio,
      Anchors_video,
      checkedAll:false , // 主列表checked
      timePick:null ,
      currGroupId: null ,// 当前分组id
      currknowledgeId: null,//当前分组id下的知识点ID
      currGroup:{} ,//同上 , 最后发现还是 不要只存id
      openAnchorList:false  , // 设置锚点
      anchorType: Anchors_chapter,
      anchorList: null ,
      bookInfo: {
        value: '',
        lsit: []
      },//书籍信息
      groupDialog:false , //分组修改增加
      knowledgeDialog:false,//知识点修改增加
      addAnchorDialog:false , //锚点增加
      readerDialog:false, //阅读器弹出层
      readerId: null,//阅读器信息
      editGroup:{} , //当前修改的组
      editKnowledge: {},//当前修改的知识点
      anchorCheckedAll: false,
      mount: {
        number: 0
      },//挂载进度
    };
  },
  computed:{
    isBook() {
      return this.anchorType == Anchors_chapter || this.anchorType == Anchors_contetn
    }
  },
  methods: {
    async getGlist(){//获取分组list
      await nowledgServices.listGroup({id:this.detailId}).then(res => {
        const findIndex = res.data.findIndex(item => this.currGroupId === item.id)
        const index = findIndex>-1 ? findIndex : 0
        this.glist = res.data
        if(this.glist && this.glist.length > 0){
          this.currGroupId = res.data[index].id
          this.currGroup = res.data[index]
          this.anchorType = Anchors_chapter
          this.getList()
        } else {
          this.currGroupId = null
          this.currGroup = {}
        }
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    async getList(pageNum =1, pageOffset =10, query){//获取知识点list
      await nowledgServices.listKnowledge({
        pageNum,
        pageOffset,
        ...query,
        id: this.detailId,
        group_id: this.currGroupId,
      }).then(res=>{
        this.list = res.data
        this.page = res.page
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
      const parent = this.$refs.mainListWrap
      const list = parent.querySelectorAll("input[type='checkbox']")
      list.forEach( item => {
        item.checked = false
      })
    },
    groupDel(item){// 删除分组
      this.$confirm("是否删除该分组?").then(res=>{
        nowledgServices.deleteGroup({id:item.id}).then(res=>{
          this.getGlist()
        }).catch(res=>{
          for(let i in payload.messages){
            this.$message.error(payload.messages[i])
            break
          }
        })
      })
    },
    // groupEdit(item){ //分组模态框
    //   this.editGroup = item
    //   this.groupDialog = true
    // },
    KnowledgeEdit(item) {//知识点模态框
      this.editKnowledge = item
      this.knowledgeDialog = true
    },
    groupCommit(){//知识点解构新增修改
      if (!this.$refs.groupFormVa.valiAll()) return
      var query = formSerialize(this.$refs.groupForm, {hash: true})
      if(!query.id){
        query.id = this.detailId
        nowledgServices.addGroup(query).then(res => {
          this.groupDialog = false
          this.getGlist()
        })
      }else {
        nowledgServices.modifyGroup(query).then(res => {
          this.groupDialog = false
          this.getGlist()
        })
      }
    },
    // async getProgress() {//获取进度
    //   await nowledgServices.mountSchedule({id:this.detailId},(res) => {
    //     this.mount = res.data
    //   }).then(res => {
    //     this.mount = res.data
    //   })
    // },
    KnowledgeCommit() {//知识点新增修改
      if (!this.$refs.KnowledgeFormVa.valiAll()) return
      var query = formSerialize(this.$refs.KnowledgeForm, {hash: true})
      try{
        if(!query.id){
          query.t_id = this.detailId
          query.group_id = this.currGroupId
          nowledgServices.addNowledges(query).then(res=>{
            this.knowledgeDialog = false
            this.getGlist()
            this.getList()
          })
        }else {
          nowledgServices.modifyNowledges(query).then(res=>{
            this.knowledgeDialog = false
            this.getList()
          })
        }
      }
      catch({payload}) {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    toTop(){//知识点置顶
      const id = []
      const parent = this.$refs.mainListWrap
      const list = parent.querySelectorAll("[name='ids']:checked")
      list.forEach(item => {
        id.push(item.value)
      })
      if (!id.length) {
        return this.$message.error('请确认你要置顶的内容！');
      }
      nowledgServices.upNowledges({id}).then(res => {
        this.getList()
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    knowDel(id=[]){//知识点删除
      const parent = this.$refs.mainListWrap
      const list = parent.querySelectorAll("[name='ids']:checked")
      if(!id.length){
        list.forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的内容！');
      }
      this.$confirm('是否删除选中知识点?').then( res => {
        nowledgServices.deleteNowledges({id}).then(res => {
          this.getGlist()
        }).catch(({payload}) => {
          for(let i in payload.messages){
            this.$message.error(payload.messages[i])
            break
          }
        })
      })
    },
    removeAnchor(id=[]) {//锚点删除
      const parent = this.$refs.anchorList
      const list = parent.querySelectorAll("[name='ids']:checked")
      if(!id.length){
        list.forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的锚点！')
      }
      this.$confirm('是否删除选中锚点?').then(res => {
        digitalServices.delAnchor({id}).then(res => {
          this.getAnchorList()
        }).catch(({payload}) => {
          for(let i in payload.messages){
            this.$message.error(payload.messages[i])
            break
          }
        })
      })
    },
    handleSizeChange(size){// size变化回调
      this.getList(1, size)
    },
    handleCurrentChange(page){// 点击分页回调,
      this.getList(page,this.page.offset)
    },
    changeGroup(item){
      this.currGroupId = item.id
      this.currGroup = item
      this.openAnchorList = false
      this.getList()
    },
    async getbookList() {//获取书籍列表
      await nowledgServices.listNowledges({id:this.detailId}).then(res => {
        this.bookInfo.list = res.data
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    addAnchor() {//添加锚点
      this.addAnchorDialog = true
    },
    async setAnchor(id){//设置锚点
      this.currknowledgeId = id
      await this.getbookList()
      this.getAnchorList()
      this.openAnchorList = true
    },
    changeAnchorType(type){//章节切换
      this.anchorType = type  // 带参查询列表
      this.getAnchorList()
    },
    getAnchorList(){// 获取锚点列表
      nowledgServices.nowledge_info({
        type: this.anchorType,
        id: this.currknowledgeId
      }).then(res=>{
        this.anchorList = res.data
      })
    },
    bookinfoChange(val) {
      if(this.anchorType == Anchors_contetn){
        this.readerId = val
        this.readerDialog = true
        return
      }
      this.addAnchorDialog = true
    },
    bookinfoBlur(type) {
      if(this.bookInfo.value && !type && this.anchorType == Anchors_chapter){
        this.addAnchorDialog = true
      }else if(this.bookInfo.value && !type && this.anchorType == Anchors_contetn){
        this.readerDialog = true
      }
    },
    anchorListCancle() {//更新锚点列表数据
      this.addAnchorDialog = false
      this.getAnchorList()
    },
    addAnchorSuccess() {//添加内容锚点成功
      // this.readerDialog = false
      this.getAnchorList()
    },
  }
};
</script>

<template lang="pug">
.div
  .content.clearfix(v-if="currGroupId")
    .left
      ul
        .li(v-for="item in glist" @click="changeGroup(item)" :class="{currGroup:item.id == currGroupId}")
          span.name(:title="`${item.name}(100)`" v-text="`${item.name}(${item.num})`")
    .tableWrap
      .nav.clearfix
        .name(v-text="currGroup.name")
        .btns(v-if="!openAnchorList")
          el-button(size="mini" type="primary" @click="KnowledgeEdit({})" plain ) 新增知识点
          el-button(size="mini" type="primary" @click="toTop" plain ) 置顶
          el-button(size="mini" type="primary" @click="knowDel()" plain ) 删除
        .btns(v-else)
          el-button(size="mini" type="primary" @click="openAnchorList = false" plain ) 返回
          el-button(size="mini" type="primary" @click="addAnchor" plain v-if='!isBook') 增加锚点
          el-select(
            v-if="bookInfo&&(anchorType==Anchors_chapter||anchorType==Anchors_contetn)"
            v-model="bookInfo.value"
            placeholder="书籍设置"
            size="small"
            @change="bookinfoChange"
            @visible-change="bookinfoBlur"
          )
            el-option(
              v-for="item in bookInfo.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            )
          el-button(size="mini" type="primary" @click="removeAnchor()" plain ) 移除
      .mainListWrap(v-if="!openAnchorList" ref='mainListWrap')
        table.table()
          thead
            tr
              th 全选
                input(type="checkbox"  @click="checkedAll = !checkedAll")
              th 名称
              th 数量
              th(width='160') 创建时间
              th(width='250' style="text-align:center") 操作
          tbody()
            tr(v-for="item in list"  )
              th
                input(type="checkbox" :checked="checkedAll" :value="item.id" name="ids")
              th {{item.name}}
              th {{item.num}}
              th {{item.create_time}}
              th
                .btns
                  el-button(size="mini" type="primary" @click="KnowledgeEdit(item)" plain ) 重命名
                  el-button(size="mini" type="primary" @click="setAnchor(item.id)" plain ) 设置锚点
                  el-button(size="mini" type="primary" @click="knowDel([item.id])" plain ) 删除
        .pageWrap(v-if="page")
          el-pagination( :small="false" background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page.num"
            :page-sizes="[10, 50, 100]"
            :page-size="page.offset"
            layout="sizes,prev, pager, next, jumper"
            :total="page.total")
        .btns
          //- el-button( @click="$emit('knowback')") 取消
          //- el-button(type="primary" ) 确定
      .anchorListWrap(v-if="openAnchorList")
        //- 章节锚点列表弹出层
        .article
          table.table(v-if="openAnchorList" ref="anchorList")
            thead
              tr
                th(colspan=2)
                  .title
                    |全选
                    input(type="checkbox"   @click="anchorCheckedAll = !anchorCheckedAll")
                    span.btns
                      span(@click="changeAnchorType(Anchors_chapter)" :class="{currAnchorType:anchorType==Anchors_chapter}") 章节锚点
                      span(@click="changeAnchorType(Anchors_contetn)" :class="{currAnchorType:anchorType==Anchors_contetn}") 内容锚点
                      span(@click="changeAnchorType(Anchors_audio)" :class="{currAnchorType:anchorType==Anchors_audio}") 音频锚点
                      span(@click="changeAnchorType(Anchors_video)" :class="{currAnchorType:anchorType==Anchors_video}") 视频锚点
                th(v-show="isBook") 所属图书
                th.btns(style="padding-right:30px" width="50") 操作
            tbody( )
              tr(v-for="item in anchorList")
                td(style="padding-left:50px;width:100px;max-width:100px")
                  input(type="checkbox" :checked="anchorCheckedAll" style="padding-left:20px;" :value="item.id" name="ids")
                td(style="text-align: left;") {{item.name}}
                td(v-if="isBook") {{item.book_name}}
                td
                  .btns
                    el-button(size="mini" type="primary" @click="removeAnchor([item.n_info_id])" plain ) 移除
          //- .btns
          //-     el-button( @click="$emit('knowback')") 取消
          //-     el-button(type="primary" ) 确定

</template>


<style lang="stylus" scoped>
.btns
  text-align right
.topWrap
  margin 0 0 10px 0
.content
  .left
    width 230px
    min-height 500px
    float left
    font-size 16px
    border 1px solid #e3e3e3
    box-sizing border-box
    .li
      padding 5px
      cursor pointer
      height 50px
      line-height 50px
      &+.li
         border-top dashed 1px #e3e6ec ;
      .name
        font-size 14px
        max-width 150px
        overflow hidden
        display inline-block
        height 100%
      &.currGroup
        background #e3e6ec
      .btns
        float right
        font-size 12px
        >span
          display inline-block
          height 50px
          line-height 50px
          font-size 16px
          padding 0 5px
          &:hover
            background #f3f3f3
  .tableWrap
    margin 0
    padding 0 !important
    float left
    width calc(100% - 230px)
    overflow auto
    .nav
      border 1px solid #e3e3e3
      border-left none
      height 50px
      line-height 50px
      padding-left 10px
      .name
        float left
      .btns
        float right
.currAnchorType
  color #44c3aa
.anchorListWrap
  .title
    text-align left
    padding-left 10px
    height 40px
    line-height 40px
    .btns >span
      height 40px
      font-size 16px
      padding 0 13px
      display inline-block
      cursor pointer
      border-left 1px  solid #e3e3e3
.el-select
  margin 0 10px
.mount
  width 50%
  float left
  .mountProgress
    width 60%
    display inline-block
</style>


