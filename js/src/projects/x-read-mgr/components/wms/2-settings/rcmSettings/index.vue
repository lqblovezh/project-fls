<script>
import GroupList from "@/components/common/GroupList"
import formSerialize from 'form-serialize'
import { main } from "@/util/mixins"
import MoveGroup from "../../1-product/moveGroup"
import * as services from 'services/x-read/recomSetting'
import  {mapMutations , mapState} from 'vuex'

export default {
  components: { GroupList, MoveGroup},
  mixins: [main],
  data() {
    return {
      services,
      detailDialog: false, // 详情框
      timePick: null, // 日期查询
      imgLinkDialog: false, //链接dialog
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      moveIds: null, // 需要移动的id
      pustSetDialog: false, // 上架dialog
      currentPut: null, // 上架信息
      toId: null, //移动到那一组
      fabuIds: [], //
      detailDate: {},//详情数据 ,  包含id等基本信息, 更多的在详情里面查
    };
  },
  methods: {
    async opneDetailDialog(item = {}) {
      if(item.id){
        await services.detail({id:item.id}).then(res => {
          this.detailDate = res.data
        })
      }else{
        this.detailDate = item
      }
      this.detailDialog = true
    },
    setList(data) {
      //设置列表
      this.setRecommendlist(data)
    },
    setGroupList(data) {
      //设置分组
      this.setRecommendGrouplist(data)
    },
    setPage(data) {
      //设置页码
      this.setRecommendlistPage(data)
    },
    srot(id,status) {//排序
      services.sort({id,status}).then(res =>{
        this.getList()
      })
    },
    upShelf(id) { //单个或多个上架
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked()
        if (!ids) return
      }
      this.services.put({id:ids}).then(res => {
        this.$message.success('上架成功')
        this.getList()
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    downShelf(id) {//单个或多个下架
      let ids = []
      if (id) { 
        ids.push(id)
      } else {
        ids = this.$getChecked();
        if (!ids) return
      }
      this.services.pull({id:ids}).then(res => {
        this.$message.success('下架成功')
        this.getList()
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    save() {//保存
      this.services.save(this.detailDate).then(res => {
        this.detailDialog = false
        this.getList()
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    about(url) {//关联地址
      if(url){
        window.open(url,'_blank')
      }
    },
    ...mapMutations([
      "setRecommendlist",
      "setRecommendGrouplist",
      "setRecommendlistPage"
    ])
  },
  computed: {
    ...mapState({
      list: state => state.recommend.list,
      groupList: state => state.recommend.groupList,
      page: state => state.recommend.page
    })
  }
}
</script>


<template lang="pug">
.index.clearfix
  .dialogs
    MoveGroup( v-if="moveToOtherDiaolog" 
      @back="moveToOtherDiaolog=false" 
      @submit="moveToSubmit"
      :currGroup="currGroup" :groupList="groupList" )
    //- 详情dialog
    el-dialog(:visible.sync="detailDialog")
      .header(slot="title")
        el-tabs(value="detail")
            el-tab-pane(label="详情" name="detail")
      VaForm(ref="detailForm")
        form.detailForm
          .group
            .label 推荐语：
            input.form-control( v-va="{ type:'required' }" v-model="detailDate.name" name="name")
          .group
            .label 推荐人：
            input.form-control( v-va="{ type:'required' }"  v-model='detailDate.referee' name="referee")
          .group
            .label 标签：
            input.form-control( v-va="{ type:'required' }"  v-model='detailDate.tag' name="tag")
          .group
            .label 关联地址：
            input.form-control( v-va="{ type:'required' }"  v-model='detailDate.ted_address' name="ted_address")
      div(slot="footer" class="dialog-footer")
        el-button(type="info"  @click="detailDialog = false") 取消
        el-button(type="primary"  @click="save") 确定
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .serachWrap
            .title 
            form#mainForm.clearfix
              span.group-inline
                el-input(placeholder="输入推荐语搜索" name="name" clearable v-model="searchQuery.name")
              span.group-inline
                el-input(placeholder="输入标签搜索" name="tag" clearable v-model="searchQuery.tag")
              span.group-inline
                el-input(placeholder="输入推荐人搜索" name="referee" clearable v-model="searchQuery.referee")
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']")
              span.group-inline
                select.form-control.width-small( placeholder="请选择" name="status")
                  option(value="") 所有
                  option(value="1") 未使用
                  option(value="2") 本周
                  option(value="3") 往期
              span.group-inline.float-right
                el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="query" plain ) 搜索
                el-button(size="mediu" type="primary" icon="el-icon-plus"  @click="opneDetailDialog()" plain ) 新建
          .tableWrap
            .tableTop
              .title.vel-line
                span 全部 <span v-if="page" class="totalNum">({{page.total}})</span>
                .btns
                  el-button(size="mini" type="primary"  @click="moveToOther" plain ) 移动分组
                  el-button(size="mini" type="primary"  @click="upShelf()" plain) 推荐
                  el-button(size="mini" type="primary" @click="downShelf()"  plain ) 撤下
                  el-button(size="mini" type="primary" @click="delChoosen()" plain) 删除
            table.table
              thead
                tr
                  th.table-check
                    input(type="checkbox" @click="$checkAll($event )")
                  th 推荐语
                  th 推荐人
                  th 标签
                  th 创建时间
                  th 关联地址
                  th 状态
                  th 排序
                  th(width=100) 操作
              tbody(v-if="list")
                tr(v-for="item,index in list")
                  td
                    input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
                  td
                    .th-name(:title="item.name") {{item.name}}
                  td
                    .th-name(:title="item.referee") {{item.referee}}
                  td
                    .th-name(:title="item.tag") {{item.tag}}
                  td {{item.create_time}}
                  td
                    .th-name(:title="item.ted_address") {{item.ted_address}}
                  td
                    .th-name {{item.status}}
                  td
                    el-button(type="text" @click='srot(item.id,"up")' :disabled="index==0")
                      i.icon.el-icon-sort-up
                    el-button(type="text" @click='srot(item.id,"down")' :disabled="index==list.length-1")
                      i.icon.el-icon-sort-down
                  td
                    .btns
                      Icon(type="icon-detail" @click="opneDetailDialog(item)" title="详情")
                      Icon(v-if="item.status!='本周'" type="icon-upload" @click="upShelf(item.id)" title="推荐")
                      Icon(v-if="item.status=='本周'" type="icon-reject" @click="downShelf(item.id)" title="撤下")
                      Icon(type="icon-preview" @click="about(item.ted_address)" title="查看关联")
                      Icon(type="icon-delete" @click="delChoosen(item.id)" title="删除")
            //- 分页
            .pageWrap(v-if="page")
              el-pagination(
                :small="false" background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page.num"
                :page-sizes="[10, 50, 100]"
                :page-size="page.offset"
                layout="total, sizes,prev, pager, next, jumper"
                :total="page.total"
              )
          //- 分组
          .gruopList
            GroupList(
              :groupList="groupList"
              :currGroup="currGroup"
              @addGroup="addGroup"
              @updateGroup="updateGroup"
              @delGroup="delGroup"
              @groupChange="groupChange" 
            )
</template>


<style lang="stylus" scoped>
.headerNav
  padding 10px 0
  margin-left 120px
  border-bottom 1px solid #E4E7ED
  >div 
    width 50%
    display inline-block
    &.right
      text-emphasis right 
    >span
      margin-right 20px
.putPlate
  >div
    padding-left 120px
.tableBox
  padding 0
  padding-left 120px
  box-sizing border-box
  width 100%
  max-height 500px
  overflow auto
.serachWrap .form-control 
  width 170px
.width-small 
  width 100px
.constiute .li
  cursor pointer
.constiuteGroup
  .line
    border-bottom 1px solid #E4E7ED
  .btns
    float right
.el-radio
  line-height inherit
.isCurrType
  color #44c3aa
</style>
