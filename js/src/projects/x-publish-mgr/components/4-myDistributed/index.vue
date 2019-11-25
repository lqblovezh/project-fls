<script>
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import HandList from './handList'
import Detail from 'projects/common/readOnlyDetail'
import { getIconStyle, publicMixin } from '@/util/mixins'
import * as pushServices from 'services/x-publish/dispense'
import formSerialize from 'form-serialize'

const XREAD = 'xRead'
export default {
  components: {
    Menu,
    Top,
    HandList,
    Detail,
  },
  mixins: [getIconStyle],
  data() {
    return {
      navList: [],
      pageList: [],
      page: null,
      currentIndex: null, //当前索引
      item: null, //单个列表数据
      currentType: null, //当前类型
      currentId: null, //当前类型的ID
      showByImage: false, //默认图文选中
      pageSize: [12, 24, 36],
      detailVisible: false,
      detailValue: 'info',
      detailData: {
        id: null,
        detail: {},
        metadata: {},
      },
      isShowAuthor: false,
      productType: null,
    }
  },
  created() {
    this.getNavInfo()
  },
  computed: {
    isKnowledge() {
      if (this.currentType == XREAD) {
        return true
      }
      return false
    },
  },
  methods: {
    getNavInfo() {
      pushServices.getDispense().then(res => {
        this.navList = res.data
        if (!this.navList.length) {
          return
        }
        if (this.$route.query.id) {
          let findIndex = this.navList.findIndex(
            item => item.id === this.$route.query.id
          )
          this.currentIndex = findIndex
        } else {
          this.currentIndex = 0
        }
        let { type, id } = this.navList[this.currentIndex]
        this.currentType = type
        this.currentId = id
        this.getList()
      })
    },
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 12,
      searchQuery
    ) {
      // this.pageList = []
      // this.page = null
      pushServices
        .getList({
          id: this.currentId,
          pageNum,
          pageOffset,
          ...searchQuery,
        })
        .then(res => {
          this.pageList = res.data
          this.page = res.page
        })
    },
    navChange(index) {
      this.page = null
      if (this.currentIndex === index) return
      this.currentIndex = index
      let { type, id: currentId } = this.navList[this.currentIndex]
      this.currentType = type
      this.currentId = currentId
      log(this.currentType)
      this.getList()
    },
    changeShowType(type) {
      this.showByImage = type
    },
    handleTabClick({ tab }) {
      this.detailValue = tab.name
    },
    seareHandeler() {
      //搜索
      this.query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      this.getList(1, 10, this.query)
    },
    handleSizeChange(val) {
      //处理size变化
      this.getList(1, val, this.query)
    },
    handleCurrentChange(val) {
      //处理页码变化
      this.getList(val, this.page.offset, this.query)
    },
    clear() {
      document.getElementById('text').value = ''
    },
  },
  mounted() {},
}
</script>

<template lang="pug">
.index
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/distributed")
  .mainRight
    .content
      ul.navHead.modular(v-if="navList.length")
        li(v-for="item,index in navList" :class="{active:currentIndex==index}" @click="navChange(index,item.id)")
          div(:class="getStyle(item.type)")
          span(v-text="item.name")
      .serachWrap
        form#mainForm
          span.group-inline
            el-input(placeholder="输入产品搜索" name="name" clearable  v-model="searchQuery.name")
          span.group-inline
            TimePick(:inputsName="['start_time','end_time']")
          span.group-inline(:span="9")
            el-button(type="primary" icon="el-icon-search" @click="seareHandeler" plain) 搜索
      .box
        .button-box
          el-button(:class="{active:showByImage}" type="primary" size="mini" icon="el-icon-menu" plain @click="changeShowType(true)") 图文
          el-button(:class="{active:!showByImage}" type="primary" size="mini" icon="el-icon-tickets" plain @click="changeShowType(false)") 列表
        .books.modular(style="padding-bottom:20px")
          .title 产品
          ul.listPanel(v-show="showByImage")
            li.colspan(v-if="!pageList.length")
              .img-box 暂无数据
            li(v-for="item,index in pageList" @click="showDetail(item,'books')")
              .imgWrap
                .img-box
                  img(:src="item.entity_thumb")
              .exp
                div
                  p.name(v-text="item.entity_name")
                  p.time(v-text="item.update_time")
          table.table(width="100%" v-show="!showByImage")
            thead
              tr
                th 名称
                th 作者
                th 标签
                th(v-if="currentType == 'xRead'") 所含内容
                th 类型
                th 发布时间
                th 操作
            tbody
              tr.colspan(v-if="!pageList.length")
                td(colspan="6" style="text-align:center") 暂无数据
              tr(v-for="item,index in pageList")
                td.alignL
                  img.cover-photo(:src="item.entity_thumb")
                  span.bookName(v-text="item.entity_name" :title="item.entity_name")
                td(v-text="item.entity_author" :title="item.entity_author")
                td(v-text="item.entity_tag" :title="item.entity_tag")
                td(v-if="currentType == 'xRead'")
                  ul.contList
                    li(v-for="items in item.entity_content" v-if="item.entity_content")
                      span(v-text="items.name" :class="{disabled:items.count==0}")
                td {{item.type_name}}
                td(v-text="item.update_time")
                td
                  Icon(type="icon-detail" title="详情" size="mini" plain @click="showDetail(item,'books','info')")
                  Icon(type="icon-know" v-if="['1','4','5','6'].includes(item.entity_type)" title="知识点" size="mini" plain @click="showDetail(item,'books','Knowledge')")
    .pageWrap(v-if="page")
      el-pagination( :small="false" background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page.num"
      :page-sizes="pageSize"
      :page-size="page.offset"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total")
    //- 详情dialog
    Detail(
      :detailVisible.sync="detailVisible" 
      v-if="detailVisible" 
      :defaultData="detailData" 
      :type="productType" 
      :detailValue="detailValue"
      :detailType="detailType"
    )
</template>


<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.colspan
  text-align center
  color #6f7180
ul
  li
    cursor pointer
.contList
  li
    display inline-block
    padding-right 10px
  .disabled
    color #bdbdbd
.content
  .modular
    background-color #fff
    padding 20px
    padding-bottom 0
  .title
    color #424857
    font-size 16px
    position relative
    padding-left 20px
    line-height 36px
    border-bottom 1px solid #e3e6ec
    &:after
      content ''
      display block
      width 3px
      height 16px
      top 50%
      left 0
      margin-top -8px
      background-color #44c3aa
      position absolute
  .navHead
    margin 20px 0
    li
      min-width 187px
      height 56px
      line-height 56px
      display inline-block
      border-radius 5px
      border 1px solid #e1e1e1
      background-color #fafafa
      text-align center
      margin-right 20px
      margin-bottom 20px
      &:last-child
        margin-right 0
      div
        width 33px
        height 33px
        display inline-block
        margin-right 10px
        position relative
        top 50%
        margin-top -18px
    .active
      border-color #44c3aa
      background-color #f4fbfa
  .box
    position relative
    .button-box
      position absolute
      right 20px
      top 10px
      z-index 2
      .active
        background #44c3aa
        border-color #44c3aa
        color #fff
.listPanel
  li
    margin 20px 0px 20px 0
    margin-bottom 20px
    margin-top 20px
    display inline-block
    position relative
    cursor pointer
    width 16.66%
    .imgWrap
      width 200px
      margin 0 auto
      box-shadow 2px 2px 5px 1px #d6d3d3
    .img-box
      display table-cell
      vertical-align middle
      text-align center
      width 200px
      height 210px
      &.theme
        height 100px
        img
          max-height 100px
    &:nth-child(5n)
      margin-right 0
    img
      max-width 100%
      max-height 210px
    .exp
      width 100%
      height 100%
      bottom 0
      z-index -10
      position absolute
      padding 20px
      box-sizing border-box
      display -webkit-flex
      -webkit-justify-content center
      -webkit-align-items center
      background-color rgba(0, 0, 0, 0)
      transition all 0.3s ease-in-out
      .name
        font-size 16px
        color #fff
      .time
        width 100%
        font-size 12px
        color #fff
        position absolute
        bottom 10px
        left 0
        text-align center
    &:hover .exp
      transition all 0.3s ease-in-out
      background-color rgba(0, 0, 0, 0.8)
      z-index 10
.bookName
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.clear
  position absolute
  top 215px
  left 355px
  color #d9d9d9
  border-radius 50%
  background #efefef
  width 20px
  height 20px
  line-height 20px
  text-align center
  cursor pointer
</style>
