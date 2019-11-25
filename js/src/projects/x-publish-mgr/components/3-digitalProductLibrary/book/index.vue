<script>
import formSerialize from 'form-serialize'

import Dispense from '@/components/common/Dispense'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import GroupList from '@/components/common/GroupList'
import Detail from './detail'

import {main} from '@/util/mixins'

import * as services from "services/x-publish/digitalbooks"

export default {
  mixins:[main],
  components:{Menu , Top,  GroupList , Detail , Dispense},
  data(){
    return {
      services,
      list:null,  //主数据
      page:null,
      groupList :null, // 组列表
      detailDialog:false, // 详情框
      detailDialoaType:"info", //详情tabs类型
      detailData:null , //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      timePick:null, // 日期查询
      imgLinkDialog:false, //链接dialog
      publishDialog:false, //发布dialog
      moveToOtherDiaolog:false ,// 移动分组dialog
      moveIds:null, // 需要移动的id
      toId:null, //移动到那一组
      showContent:false ,
    }
  },
  methods:{
    // 主列表公用查询
    getList( pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10  , query =null  ){
      services.listDigitalBook({ pageNum , pageOffset , group_id: this.currGroup , ...query}).then(res=>{
        this.list = res.data
        this.page = res.page
      })
    },
    urgentDigitalBook(){ //加急审核
      var ids = this.getChecked()
      for(var i = 0 , len = ids.length ; i < len ; i++){
        for(var j = 0 , jlen = this.list.length ; j < jlen ; j++){
          if(this.list[j].id == ids[i] ){ //当前选项
            if(this.list[j].audits_status != 1 ){
              this.$message.error("只能勾选待审核数据")
              return
            }
          }
        }
      }
      if(ids){
        this.services.urgentDigitalBook({id:ids}).then(res => this.$message.success("已提交加急审核"));
      }
    },
    // 详情新增
    opneDetailDialogAdd(type ){
      this.detailDialog = true;
      this.detailDialoaType = type;
      this.detailData = null ;
      this.metadata = null ;
    },
    //打开发布
    opnePublishDialog(item){
      this.detailData = item ;
      this.publishDialog = true ;
    },
    //导出
    exportSomething(e){ //默认的事件对象
      log("导出操作!")
    },
    //删除选中
    delChoosens(id){
      var ids = []
      log(id)
      if(!id){
        var nodes = Array.from(document.querySelectorAll('input[name="ids"]:checked'))
        nodes.forEach(item => {
          ids.push(item.value)
        })
        if(!nodes.length ){
          this.$message.error('请先选中!');
          return
        }
      }else {
        ids.push(id)
      }
      if(ids.length > 0){
        this.$confirm("是否删除?").then(res=>{
          var query = formSerialize(document.querySelector("#mainForm" ) , {hash:true}); // 分页带参数
          this.services.deleteDigitalBook({id:ids}).then(_ => {
            this.getList(this.page.num , this.page.offset , query)
            this.getGroupList()
          })
        }).catch(res=>{
          // 取消事件
        })
      }
    },



  },

}
</script>

<template lang="pug">
.index.clearfix
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/digitalProductLibrary/book")
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .serachWrap
            .title
            form#mainForm.clearfix
              span.group-inline
                input.form-control( placeholder="书名"  name="name")
              span.group-inline
                input.form-control( placeholder="作者" name="author")
              span.group-inline
                input.form-control( placeholder="标签" name="tag")
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']")
              span.group-inline
                select.form-control( placeholder="状态" name="status" style="width:110px")
                  option(value="") 状态
                  option(value="3") 已发布
                  option(value="1") 待审核
                  option(value="2") 审核未通过
                  option(value="0") 未分发
              span.group-inline.form-content(
                @click="showContent = !showContent"
                :class="showContent? 'content-active' : 'content-default'" )    筛选
              span.group-inline.inputBoxs(v-if="showContent")
                input(type="checkbox" value="1" name="type" )
                span 阅读
                input(type="checkbox" value="4" name="type" )
                span 音频
                input(type="checkbox" value="3" name="type" )
                span 图片
                input(type="checkbox" value="5" name="type" )
                span 视频
              span.group-inline
                el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
                el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="opneDetailDialogAdd('info',true)" plain ) 新建

          .tableWrap
            .tableTop
              .title.vel-line
                span 全部
                .btns
                  el-button(size="mini" type="primary"  @click="urgentDigitalBook" plain ) 加急审核
                  el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
                  el-button(size="mini" type="primary" @click="delChoosen(false)" plain) 删除
            table.table
              thead
                tr
                  th.allBtn
                    input(type="checkbox" @click="checkAll($event)")
                  th 书名
                  th 作者
                  th 标签
                  th(style="width:150px") 所含内容
                  th.time 创建时间
                  th(style="width:80px") 发布状态
                  th.time 分发时间
                  th.operate 操作
              tbody(v-if="list")
                tr(v-for="item in list")
                  th
                    input(type="checkbox"  :value="item.id" name="ids" ref="ids")
                  th
                    img.cover-photo(:src="item.img_src")
                    .th-name.bookName(:title="item.name") {{item.name}}
                  th
                    .th-name(:title="item.author") {{item.author}}
                  th
                    .th-name(:title="item.tag") {{item.tag}}
                  th
                    ul.mediaList(v-if="item.contents")
                      li( :class=`{"had": item.contents['book'].count}`) 阅读
                      li( :class=`{"had": item.contents['img'].count}` ) 图片
                      li( :class=`{"had": item.contents['audio'].count}` ) 音频
                      li( :class=`{"had": item.contents['video'].count}` ) 视频
                  th {{item.create_time}}
                  th
                    .th-name(
                      :class="{'already-color':item.audits_status =='3' ,'wait-color':item.audits_status =='1' ,'danger-color':item.audits_status =='2' || item.audits_status =='0' }"
                    ) {{item.status}}
                  th {{item.audits_time}}
                  th
                    .btns
                      Icon(size="mini" title="详情"  @click="opneDetailDialog('info' , item)" type="icon-detail"  plain  )
                      Icon(size="mini" title="扩展属性"  @click="opneDetailDialog('data',  item)" type="icon-data"  plain  )
                      Icon(size="mini" title="分发"  @click="opnePublishDialog(item)"  v-if="item.audits_status != '1'" type="icon-fenfa"  plain   )
                      Icon(size="mini" title="删除"  @click="delChoosen(item.id)"  type="icon-delete"  plain  )
            .pageWrap(v-if="page")
              el-pagination( :small="false" background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.num"
              :page-sizes="[10, 50, 100]"
              :page-size="page.offset"
              layout="total, sizes,prev, pager, next, jumper"
              :total="page.total")
          .gruopList
            GroupList( :groupList="groupList" :currGroup="currGroup"
              @addGroup="addGroup"
              @updateGroup="updateGroup"
              @delGroup="delGroup"
              @groupChange="groupChange")
      //- .contentRight  数据统计
  .dialogs
    Examine(:examineDialog.sync="examineDialog" @saveExamine="saveExamine")
    //- 详情
    Dispense(
      :publishDialog.sync="publishDialog"
      :item="detailData"
      v-if="publishDialog"
      @dispenseOk="dispenseOk"
    )
    el-dialog(
      :center="false"
      :visible.sync="detailDialog"
      :close-on-click-modal="false"
      top="50px"
      width="1000px"
      )
      .content(slot="title")
        //- 在组件里面写请求!而不是传进去, 因为他不是公用的组件
        Detail(   @detailBack="detailBack"
          :type="detailDialoaType"
          v-if="detailDialog"
          :detailDialog.sync="detailDialog"
          :detailData="detailData"    )
    //- 链接
    el-dialog(
      :center="false"
      :visible.sync="imgLinkDialog"
      :close-on-click-modal="false"
      width="800px"
      )
      .content(slot="title" v-if="detailData")
        .imgWrap
          img(  :src="detailData.id", alt="alt")
        .btns
          el-button 下载图片
          el-button( @click="copyLink('copy'+detailData.id)" ) 复制链接
          input.zhide( :id="'copy'+detailData.id" :value="detailData.id"  )
      span.dialog-footer( slot="footer" class="")
        el-button( @click="imgLinkDialog = false" ) 返回
    //- 移动分组
    el-dialog(
      :center="false"
      :visible.sync="moveToOtherDiaolog"
      :close-on-click-modal="false"
      title="移动分组"
      width="500px"
      )
      include ../../common/pug/moveGroupDialog.pug


</template>


<style lang="stylus" scoped >
.inputBoxs
  display inline-block
  line-height 40px
  height 40px
  >input,span
    vertical-align middle
    height 20px
    width 20px
  >input
    height 15px
.group-inline
  margin 0 10px
  display inline-block
  // width 180px
.form-control
  width 160px
.mediaList
  >li
    margin-left 5px
    float left
    color grey
  .had
    color black
</style>
