<script>
import formSerialize from 'form-serialize'
import AnchorList from './anchorList'
import Reader from './Reader'
import * as nowledgServices from 'services/x-publish/nowledges'
import * as digitalServices from 'services/x-publish/digitalbooks'

const [Anchors_chapter, Anchors_content, Anchors_audio, Anchors_video] = [
  '章节锚点',
  '内容锚点',
  '音频锚点',
  '视频锚点',
]

export default {
  components: { AnchorList, Reader },
  props: ['type', 'constitute', 'detailData', 'readOnly', 'defaultData'],
  created() {},
  async mounted() {
    if (this.defaultData) {
      this.glist = this.defaultData.knowledge
      if (!this.glist) return
      this.currGroupId = this.glist[0].id
      this.currGroup = this.glist[0]
      this.list = this.glist[0].nowledge_info
    }
    try {
      await this.getGlist() //获取左侧菜单并获取下级信息
      await this.getProgress() //获取进度
    } catch (res) {}
  },
  data() {
    return {
      list: null,
      glist: null,
      anchorsList: [],
      page: null,
      Anchors_chapter,
      Anchors_content,
      Anchors_audio,
      Anchors_video,
      checkedAll: false, // 主列表checked
      currGroupId: null, // 当前分组id
      currknowledgeId: null, //当前分组id下的知识点ID
      currGroup: {}, //同上 , 最后发现还是 不要只存id
      openAnchorList: false, // 设置锚点
      anchorType: Anchors_chapter,
      anchorList: null,
      bookInfo: {
        value: '',
        lsit: [],
      }, //书籍信息
      groupDialog: false, //分组修改增加
      knowledgeDialog: false, //知识点修改增加
      addAnchorDialog: false, //锚点增加
      readerDialog: false, //阅读器弹出层
      readerId: null, //阅读器信息
      editGroup: {}, //当前修改的组
      editKnowledge: {}, //当前修改的知识点
      anchorCheckedAll: false,
      mount: {
        number: 0,
      }, //挂载进度
    }
  },
  computed: {
    isBook() {
      return (
        this.anchorType == Anchors_chapter || this.anchorType == Anchors_content
      )
    },
  },
  methods: {
    async getGlist() {
      //获取分组list
      if (!this.detailData.id) return
      await nowledgServices
        .listGroup({ id: this.detailData.id })
        .then(res => {
          const findIndex = res.data.findIndex(
            item => this.currGroupId === item.id
          )
          const index = findIndex > -1 ? findIndex : 0
          this.glist = res.data
          if (this.glist && this.glist.length > 0) {
            this.currGroupId = res.data[index].id
            this.currGroup = res.data[index]
            this.anchorType = Anchors_chapter
            this.getList()
          } else {
            this.list = this.glist = this.currGroupId = null
            this.currGroup = {}
          }
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    async getList(pageNum = 1, pageOffset = 10, query) {
      //获取知识点list
      this.anchorCheckedAll = false
      await nowledgServices
        .listKnowledge({
          pageNum,
          pageOffset,
          ...query,
          id: this.detailData.id,
          group_id: this.currGroupId,
        })
        .then(res => {
          this.list = res.data
          this.page = res.page
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
      const parent = this.$refs.mainListWrap
      if (!parent) return
      const list = parent.querySelectorAll("input[type='checkbox']")
      list.forEach(item => {
        item.checked = false
      })
    },
    groupDel(item) {
      // 删除分组
      this.$confirm('是否删除该知识结构?').then(res => {
        nowledgServices
          .deleteGroup({
            id: [item.id],
            type: this.detailData.type_number,
            pid: this.detailData.id,
          })
          .then(res => {
            this.getGlist()
            this.$emit('saveok')
          })
          .catch(res => {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          })
      })
    },
    groupEdit(item) {
      //分组模态框
      if (!this.detailData.id) {
        return this.$message.error('请保存产品信息后再做添加')
      }
      this.editGroup = item
      this.groupDialog = true
    },
    KnowledgeEdit(item) {
      //知识点模态框
      this.editKnowledge = item
      this.knowledgeDialog = true
    },
    async groupCommit() {
      //知识点解构新增修改
      if (!this.$refs.groupFormVa.valiAll()) return
      var query = formSerialize(this.$refs.groupForm, {hash: true})
      // var query = this.editGroup
      try {
        if (!query.id) {
          query.id = this.detailData.id
          await nowledgServices
            .addGroup({
              ...query,
              type: this.detailData.type_number,
              pid: this.detailData.id,
            })
            .then(res => {
              this.groupDialog = false
              this.getGlist()
              this.$emit('saveok')
            })
        } else {
          await nowledgServices
            .modifyGroup({
              ...query,
              type: this.detailData.type_number,
              pid: this.detailData.id,
            })
            .then(res => {
              this.groupDialog = false
              this.getGlist()
              this.$emit('saveok')
            })
        }
      } catch ({ message }) {
        this.$message.error(message)
      }
    },
    async guaZai() {
      //一键挂载
      try {
        await nowledgServices.mount({ id: this.detailData.id })
        await this.getProgress()
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    async getProgress() {
      //获取进度
      await nowledgServices
        .mountSchedule({ id: this.detailData.id }, res => {
          if (res.data.number == '100') {
            this.getList()
            // this.getAnchorList()
          }
          this.mount = { ...res.data, number: parseInt(res.data.number) }
        })
        .then(res => {
          this.mount = res.data
        })
    },
    KnowledgeCommit() {
      //知识点新增修改
      if (!this.$refs.KnowledgeFormVa.valiAll()) return
      var query = formSerialize(this.$refs.KnowledgeForm, { hash: true })
      try {
        if (!query.id) {
          query.t_id = this.detailData.id
          query.group_id = this.currGroupId
          nowledgServices
            .addNowledges({
              ...query,
              type: this.detailData.type_number,
              pid: this.detailData.id,
            })
            .then(res => {
              this.knowledgeDialog = false
              this.getGlist()
              this.getList()
              this.$emit('saveok')
            })
        } else {
          nowledgServices
            .modifyNowledges({
              ...query,
              type: this.detailData.type_number,
              pid: this.detailData.id,
            })
            .then(res => {
              this.knowledgeDialog = false
              this.getList()
              this.$emit('saveok')
            })
        }
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    toTop() {
      //知识点置顶
      const id = []
      const parent = this.$refs.mainListWrap
      const list = parent.querySelectorAll("[name='ids']:checked")
      list.forEach(item => {
        id.push(item.value)
      })
      if (!id.length) {
        return this.$message.error('请确认你要置顶的内容！')
      }
      nowledgServices
        .upNowledges({ id })
        .then(res => {
          this.getList()
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    knowDel(id = []) {
      //知识点删除
      const parent = this.$refs.mainListWrap
      const list = parent.querySelectorAll("[name='ids']:checked")
      if (!id.length) {
        list.forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的内容！')
      }
      this.$confirm('是否删除选中知识点?').then(res => {
        nowledgServices
          .deleteNowledges({
            id,
            type: this.detailData.type_number,
            pid: this.detailData.id,
          })
          .then(res => {
            this.getGlist()
            this.$emit('saveok')
          })
          .catch(({ payload }) => {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          })
      })
    },
    removeAnchor(id = []) {
      //锚点删除
      const parent = this.$refs.anchorList
      const list = parent.querySelectorAll("[name='ids']:checked")
      if (!id.length) {
        list.forEach(item => {
          id.push(item.value)
        })
      }
      if (!id.length) {
        return this.$message.error('请确认你要删除的锚点！')
      }
      this.$confirm('是否删除选中锚点?').then(res => {
        nowledgServices
          .delAnchor({
            id,
            type: this.detailData.type_number,
            pid: this.detailData.id,
          })
          .then(res => {
            this.getAnchorList()
            this.$emit('saveok')
          })
          .catch(({ payload }) => {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          })
      })
    },
    handleSizeChange(size) {
      // size变化回调
      this.getList(1, size)
    },
    handleCurrentChange(page) {
      // 点击分页回调,
      this.getList(page, this.page.offset)
    },
    changeGroup(item) {
      //切换组
      this.checkedAll = false
      this.anchorCheckedAll = false
      this.currGroupId = item.id
      this.currGroup = item
      this.openAnchorList = false
      if (this.defaultData) {
        const index = this.glist.findIndex(v => v.id === item.id)
        this.list = this.glist[index].nowledge_info
        return
      }
      this.getList()
    },
    async getbookList() {
      //获取书籍列表
      await nowledgServices
        .listNowledges({ id: this.detailData.id })
        .then(res => {
          this.bookInfo.list = res.data
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    getBtn() {
      // 获取可选列表
      nowledgServices
        .nowledge_btn({ id: this.detailData.id })
        .then(async res => {
          this.anchorsList = res.data
          for (let key in this.anchorsList) {
            if (this.anchorsList[key]) {
              this.anchorType = this['Anchors_' + key]
              break
            }
          }
          await this.getbookList()
          await this.getAnchorList()
          this.openAnchorList = true
        })
    },
    addAnchor() {
      //添加锚点
      this.addAnchorDialog = true
    },
    async setAnchor(id) {
      //设置锚点
      this.currknowledgeId = id
      this.anchorList = []
      await this.getBtn()
    },
    changeAnchorType(type) {
      //章节切换
      this.anchorType = this['Anchors_' + type] // 带参查询列表
      this.anchorList = []
      this.getAnchorList()
    },
    getAnchorList() {
      // 获取锚点列表
      nowledgServices
        .nowledge_info({
          type: this.anchorType,
          id: this.currknowledgeId,
        })
        .then(res => {
          this.anchorList = res.data
        })
      this.getList()
    },
    bookinfoChange(val) {
      if (this.anchorType == Anchors_content) {
        this.readerId = val
        this.readerDialog = true
        return
      }
      this.addAnchorDialog = true
    },
    bookinfoBlur(type) {
      if (this.bookInfo.value && !type && this.anchorType == Anchors_chapter) {
        this.addAnchorDialog = true
      } else if (
        this.bookInfo.value &&
        !type &&
        this.anchorType == Anchors_content
      ) {
        if (!this.readerId) {
          this.readerId = this.bookInfo.value
        }
        this.readerDialog = true
      }
    },
    anchorListCancle() {
      //更新锚点列表数据
      this.addAnchorDialog = false
      this.getAnchorList()
      this.$emit('saveok')
    },
    addAnchorSuccess() {
      //添加内容锚点成功
      this.$message.success('添加锚点成功!')
      this.getAnchorList()
      // this.readerDialog = false
    },
    isShowAnchors(type) {
      //是否选中状态
      return this.anchorType == this['Anchors_' + type]
    },
    getAnchorsText(type) {
      return this['Anchors_' + type]
    },
    checkedAllBtn(e, type) {
      this[type] = e.target.checked
    },
  },
}
</script>

<template lang="pug">
.div
  //- 阅读器弹出层
  Reader(
    :readerDialog.sync="readerDialog"
    :currId="currknowledgeId"
    :readerId="readerId"
    :detailData="detailData"
    version="production"
    markBtn="锚点"
    @addAnchorSuccess="addAnchorSuccess"
    v-if="readerDialog"
  )
  .dialogs
      //- 知识点结构弹出层
      el-dialog(
        :center="false"
        :visible.sync="groupDialog"
        :close-on-click-modal="false"
        top="50px"
        width="500px"
        append-to-body
      )
        .header(slot="title")
          el-tabs(value="detail")
            el-tab-pane(label="知识点结构" name="detail")
        VaForm(ref="groupFormVa")
          form(ref="groupForm")
            input.hide(:value="editGroup.id" name="id")
            .group(v-if="groupDialog")
              .label 名称:
              input.form-control(:value="editGroup.name"
                v-va="{ type:'required' }"
                name="name" type="text")
            .btns
              el-button(size="mediu" type="primary" @click="groupCommit") 确定
              el-button(size="mediu" type="info" @click="groupDialog = false") 取消
      //- 知识点弹出层
      el-dialog(
        :center="false"
        :visible.sync="knowledgeDialog"
        :close-on-click-modal="false"
        top="50px"
        width="500px"
        append-to-body
      )
        .header(slot="title")
          el-tabs(value="detail")
            el-tab-pane(label="知识点" name="detail")
        VaForm(ref="KnowledgeFormVa")
          form(ref="KnowledgeForm")
            input.hide(:value="editKnowledge.id" name="id")
            .group(v-if="knowledgeDialog")
              .label 名称:
              input.form-control(:value="editKnowledge.name"
                v-va="{ type:'required' }"
                name="name" type="text")
            .btns
              el-button(size="mediu" type="primary" @click="KnowledgeCommit") 确定
              el-button(size="mediu" type="info" @click="knowledgeDialog = false") 取消
      //- 添加锚点弹出层
      el-dialog(
        :center="false"
        :visible.sync="addAnchorDialog"
        :close-on-click-modal="false"
        top="50px"
        width="80%"
        append-to-body
        title="锚点添加")
          AnchorList(
            @anchorListCancle="anchorListCancle"
            v-if="addAnchorDialog"
            :type="anchorType"
            :bookInfo="bookInfo"
            :themeId="detailData.id"
            :currknowledgeId="currknowledgeId"
            :detailData="detailData"
          )
  .topWrap
    .mount(v-if="mount && mount.number>0 && mount.number!=100 && !readOnly")
      <el-progress class="mountProgress" :text-inside="true" :stroke-width="18" :percentage="mount.number"></el-progress>
      span(v-if="mount.number>=100") 挂载完成
      span(v-else) 正在挂载"{{mount.name}}"
    .btns
      el-button(size="small" type="primary" @click="groupEdit({})" plain v-if="!readOnly") 新增知识结构
      el-button(size="small" type="primary" @click="guaZai" plain v-if="currGroupId&&!readOnly") 一键挂载
  .content.clearfix(v-if="currGroupId")
    .left
      ul
        .li(v-for="item in glist" @click="changeGroup(item)" :class="{currGroup:item.id == currGroupId}")
          span.name(:title="`${item.name}(100)`" v-text="`${item.name}(${item.num})`")
          .btns(v-if='!readOnly')
            span.icon.el-icon-edit(@click.stop="groupEdit(item)")
            span.icon.el-icon-delete(@click.stop="groupDel(item)")
    .tableWrap
      .nav.clearfix
        .name(v-text="currGroup.name")
        .btns(v-if="!openAnchorList")
          el-button(size="mini" type="primary" @click="KnowledgeEdit({})" plain v-if="!readOnly") 新增知识点
          el-button(size="mini" type="primary" @click="toTop" plain v-if="!readOnly") 置顶
          el-button(size="mini" type="primary" @click="knowDel()" plain v-if="!readOnly") 删除
        .btns(v-else)
          el-button(size="mini" type="primary" @click="openAnchorList = false" plain ) 返回
          el-button(size="mini" type="primary" @click="addAnchor" plain v-if='!isBook') 增加锚点
          el-select(
            v-if="bookInfo&&(anchorType==Anchors_chapter||anchorType==Anchors_content)"
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
              th(v-if="!readOnly") 全选
                input(type="checkbox"  @click="checkedAllBtn($event,'checkedAll')")
              th 名称
              th 数量
              th(width='160') 创建时间
              th(width='250' style="text-align:center" v-if="!readOnly") 操作
          tbody()
            tr(v-for="item in list")
              th(v-if="!readOnly")
                input(type="checkbox" :checked="checkedAll" :value="item.id" name="ids")
              th {{item.name}}
              th {{item.num}}
              th {{item.create_time}}
              th(v-if="!readOnly")
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
                th(width=50)
                  | 全选
                  input(type="checkbox" @click="checkedAllBtn($event,'anchorCheckedAll')")
                th
                  .title
                    span.btns
                      span(v-for="item,key in anchorsList"
                        @click="changeAnchorType(key)" v-if="item"
                        :class="{currAnchorType:isShowAnchors(key)}"
                        v-text='getAnchorsText(key)'
                      )
                th(width=180 v-show="isBook") 所属图书
                th.btns(style="padding-right:30px" width="50") 操作
            tbody.contentAnchors( )
              tr(v-for="item in anchorList")
                td
                  .input
                    input(type="checkbox" :checked="anchorCheckedAll" :value="item.id" name="ids")
                td.point
                  .div(v-if='anchorType==Anchors_content') {{item.point}}
                  .div(v-else) {{item.name}}
                td(v-if="isBook") {{item.book_name}}
                td
                  .btns
                    el-button(size="mini" type="primary" @click="removeAnchor([item.n_info_id])" plain ) 移除
          //- .btns
          //-     el-button( @click="$emit('knowback')") 取消
          //-     el-button(type="primary" ) 确定

</template>


<style lang="stylus" scoped>
.group
  line-height 38px
  margin 10px 0
  .label
    display inline-block
    text-align right
    font-size 14px
    padding-right 20px
    min-width 100px
    max-width 200px
    color #666666
    vertical-align middle
.el-icon-edit
  color #F7793E
  margin-right 5px
.el-icon-delete
  color #F7793E
.contentAnchors
  .input
    padding-left 25px
  .point
    text-align left
    >div
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
.btns
  text-align right
.topWrap
  margin 0 0 10px 0
.content
  margin-bottom 20px
  font-size 14px
  overflow hidden
  border 1px solid #e3e3e3
  .left
    width 230px
    min-height 500px
    float left
    font-size 16px
    border-right 1px solid #e3e3e3
    box-sizing border-box
    .li
      cursor pointer
      height 50px
      line-height 50px
      padding 0 10px
      box-sizing border-box
      &+.li
        border-top dashed 1px #e3e6ec
      .name
        font-size 14px
        max-width 150px
        overflow hidden
        display inline-block
        height 100%
      &.currGroup
        background #efefef
        overflow hidden
        width 100%
      .btns
        float right
        font-size 12px
        >span
          display inline-block
          height 50px
          line-height 50px
          font-size 16px
          float left
          // &:hover
          // background #f3f3f3
  .tableWrap
    margin 0
    padding 0 !important
    float left
    width calc(100% - 230px)
    overflow auto
    border-left 1px solid #e3e3e3
    box-sizing border-box
    position relative
    left -1px
    .nav
      border-left none
      height 50px
      line-height 50px
      padding-left 10px
      .name
        float left
      .btns
        float right
.currAnchorType
  color #F7793E
.anchorListWrap
  .title
    text-align left
    height 40px
    line-height 40px
    .btns >span
      height 40px
      font-size 16px
      padding 0 13px
      display inline-block
      cursor pointer
      border-left 1px solid #e3e3e3
.el-select
  margin 0 10px
.mount
  width 700px
  float left
  .mountProgress
    width 50%
    display inline-block
</style>
