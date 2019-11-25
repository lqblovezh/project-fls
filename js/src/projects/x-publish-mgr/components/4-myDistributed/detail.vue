<script>
import * as nowledgServices from 'services/x-publish/nowledges'
import Info from  '../3-digitalProductLibrary/theme/info'
import * as themeServices from 'services/x-publish/theme'

export default {
  components: {
    Info
  },
  props: {
    type: {
      type: String,
      default: "info"
    },
    isKnowledge: {
      type: Boolean,
      default: false,
    },
    isMetadata: {
      type: Boolean,
      default: true,
    },
    isAuthor: {
      type: Boolean,
      default: true,
    },
    item: Object,
    defaultData: Object,
  },
  data() {
    return {
      currGroupId: null,//当前分组id
      currGroup: null,//当前分组内容
      detailId: '',//当前详情id
      gList: null,//知识点分组
      list: null,//知识点列表
      infoDialog: false,//详情模态框
      infoData: {},//详情数据
      infoValue: 'detail',
      detailData: {},
    }
  },
  created() {
    if(false&&this.type == 'Knowledge'){
      this.getGlist()
    }
    if(this.defaultData){
      this.detailData = this.defaultData
      this.gList = this.detailData.knowledge
      this.currGroup = this.gList[0]
      this.list = this.gList[0]?this.gList[0].nowledge_info:[]
    }
  },
  methods: {
    handleClick(tab, event) {
      if(tab.name==='Knowledge' && !this.gList){
        // this.getGlist()
      }
    },
    handKnowledgeClick(item) {
      this.currGroupId = item.id
      this.currGroup = item
      const index = this.gList.findIndex(v => v.id === item.id)
      this.list = this.gList[index].nowledge_info
      // this.getGlist()
    },
    async getGlist(){//获取分组list
      await nowledgServices.listGroup({id:this.item.entity_id||this.item.foreign_id}).then(res => {
        const findIndex = res.data.findIndex(item => this.currGroupId === item.id)
        const index = findIndex>-1 ? findIndex : 0
        this.gList = res.data
        if(res.data && res.data.length > 0){
          this.currGroupId = res.data[index].id
          this.currGroup = res.data[index]
          this.getList()
        } else {
          log('暂无分组!')
        }
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    async getList(){//获取知识点list
      await nowledgServices.listKnowledge({
        id: this.item.entity_id||this.item.foreign_id,
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
    },
    infoHandleClick(tab) {
      this.infoValue = tab.name
    },
    bookDetailInfo(item, type, Ptype) {//详情内的详情&扩展属性
      const {
        id,
        c_id,
      } = item.content
      themeServices._themeDetail({
        c_id,
        id,
        type,
      }).then(res => {
        this.infoData = res.data
        this.infoValue = Ptype
        this.infoDialog = true
      }).catch( ({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
  }
};
</script>

<template lang="pug">
.div
  //- 详情
  el-dialog(
    :visible.sync="infoDialog"
    width="1000px"
    top="50px"
    append-to-body
    )
    .header(slot="title")
      Info(
        :type="infoValue"
        :infoDialog="infoDialog"
        :infoData='infoData'
        @infoClick='infoHandleClick'
      )
    div(slot="footer" class="dialog-footer")
        el-button(type="info" @click="infoDialog = false" ) 取消
  el-tabs( :value="type" @tab-click="handleClick")
    //- 详情
    el-tab-pane( label="详情" name="info")
      .div
        form.detailForm( ref="detailForm" )
          .group
            .label 名称:
            input.form-control( @blur="$vali" v-model="detailData.base.name"  name="name" type="text" disabled )
          //- .group
          //-   .label 类型:
          //-   input.form-control( @blur="$vali" v-model="detailData.base.type_name"  name="name" type="text" disabled )
          //- .group(v-if="isAuthor")
          //-   .label 作者:
          //-   input.form-control( name="author" v-model="detailData.base.author"  type="text" disabled )
          .group
            .label 标签:
            input.form-control(name="label" v-model="detailData.base.tag"  type="text"  disabled )
          .group
            .label 简介:
            textarea.textarea( name="intro" v-model="detailData.base.abs"  type="text"  disabled )
          .group.fenmian
            .label 封面:
            .wrap
              img.previewImgUrl( :src="detailData.base.img_src" alt="暂无图片" )
          .group
            .label 主题构成:
          .group
            .label
            .tableBox
              table.table.border(width="100%")
                thead
                  tr
                    th 名称
                    th 标签
                    th 作者
                    th 发布时间
                    th(width=30) 详情
                tbody
                  tr(v-for="item,index in detailData.components")
                    td(v-text="item.content.name")
                    td(v-text="item.content.tag")
                    td(v-text="item.content.author")
                    td(v-text="item.content.create_time")
                    td
                      Icon(@click="bookDetailInfo(item,item.content.type,'info')" title="详情" type="icon-detail" size="mini" plain)

    //- 扩展属性
    el-tab-pane( label="扩展属性" name="metadata")
      .meta
        .group.rowWrap( v-for="(item, index) in detailData.attributes" )
          span( v-text="index+1")
          span.left( v-text="item.key" )
          span.centet(v-text="item.name")
          span.right( v-text="item.value")
    //- 知识点
    el-tab-pane( label="知识点" name="Knowledge")
      .KnowledgeWrap(v-if='gList')
        ul.left
          li(v-for="item in gList" @click="handKnowledgeClick(item)") {{item.name}}
        .right
          p.name(v-text="currGroup.name")
          table.table
            thead
              tr
                th 知识点名称
                th 数量
                th 创建时间
            tbody()
              tr(v-for="item in list")
                th {{item.name}}
                th {{item.num}}
                th {{item.create_time}}

</template>


<style lang="stylus" scoped>

.btns
  text-align right
.tableBox
  display inline-block
  width calc(100% - 240px)
.fenmian
  height 200px
  .wrap
    display inline-block
.previewImgUrl
  max-width 150px
  max-height 180px
.rowWrap
  >span
    text-overflow: ellipsis
    overflow: hidden
    white-space: nowrap
    width 150px
    text-align center
    height 35px
    line-height 35px
    display inline-block
.KnowledgeWrap
  border 1px solid #dcdfe6
  overflow hidden
  .left
    float left
    width 30%
    min-height 50px
    padding 0 20px
    box-sizing border-box
    position relative
    left 1px
    border-right 1px solid #dcdfe6
    li
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
      cursor pointer
      font-size 14px
      color #555
      line-height 50px
      border-bottom 1px dashed #e3e6ec
      &:last-child
        border none
  .right
    float right
    width 70%
    border-left 1px solid #dcdfe6
    box-sizing border-box
    .name
      color #424857
      font-size 15px
      line-height 50px
      padding-left 20px
      text-align left
      border-bottom 1px solid #ddd
      text-overflow: ellipsis
      overflow: hidden
      white-space: nowrap
    .el-tabs--border-card
      border none
      box-shadow none
      border-top 1px solid #dcdfe6
    .list
      margin-top -15px
      li
        border-bottom 1px solid #dcdfe6
        line-height 40px
        text-overflow: ellipsis
        overflow: hidden
        white-space: nowrap
        &:last-child
          border none
</style>
