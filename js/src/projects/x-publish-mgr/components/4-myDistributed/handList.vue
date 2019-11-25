<script>
export default {
  props: {
    showByImage: {
      type: Boolean,
      default: true
    },
    pageList: {
      type: Object,
      default: function() {
        return {
          books: [], //图书产品
          theme: [], //主题产品
          article: [] //文章
        };
      }
    },
    currentType: {
      type: String,
      default: "Xbook"
    }
  },
  created() {
    log(this.pageList)
  },
  methods: {
    showDetail(item, type, value) {
      this.$emit('showDetail',{item, type, value})
    }
  },
};
</script>
<template lang="pug">
  .boxList
    .books.modular(v-show="pageList.books.length")
      .title 图书产品
      ul.listPanel(v-show="showByImage")
        li(v-for="item,index in pageList.books" @click="showDetail(item,'books')")
          .img-box
            img(:src="item.img_src")
          .exp
            div
              p.name(v-text="item.name")
              p.time(v-text="item.update_time")
      table.table(width="100%" v-show="!showByImage")
        thead
          tr
            th 名称
            th 作者
            th 标签
            th 所含内容
            th 发布时间
            th 操作
        tbody
          tr(v-for="item,index in pageList.books")
            td.alignL
              img.cover-photo(:src="item.img_src")
              span.bookName(v-text="item.name")
            td(v-text="item.author")
            td(v-text="item.tag")
            td
              ul.contList
                li(v-for="items in item.contents" v-if="item.contents")
                  span(v-text="items.name" :class="{disabled:items.count==0}")
            td(v-text="item.update_time")
            td
              Icon(type="icon-detail" title="详情" size="mini" plain @click="showDetail(item,'books','detail')") 
              Icon(type="icon-data" title="扩展属性" size="mini" plain @click="showDetail(item,'books','metadata')") 
              Icon(type="icon-know" title="知识点" size="mini" plain @click="showDetail(item,'books','Knowledge')") 
    .theme.modular(v-show="pageList.theme.length")
      .title 主题产品
      ul.listPanel(v-show="showByImage")
        li(v-for="item,index in pageList.theme" @click="showDetail(item,'theme')")
          .img-box.theme
            img(:src="item.img_src")
          .exp
            div
              p.name(v-text="item.name")
              p.time(v-text="item.update_time")
      table.table(width="100%" v-show="!showByImage")
        thead
          tr
            th 名称
            th 主题类型
            th 所含数量
            th 标签
            th 发布时间
            th 操作
        tbody
          tr(v-for="item,index in pageList.theme")
            td.alignL
              img.cover-photo(:src="item.img_src")
              span.bookName(v-text="item.name")
            td(v-text="item.type")
            td(v-text="item.type_number")
            td(v-text="item.tag")
            td(v-text="item.update_time")
            td
              Icon(type="icon-detail" title="详情" size="mini" plain @click="showDetail(item,'theme','detail')")
              Icon(type="icon-data" title="扩展属性" size="mini" plain @click="showDetail(item,'theme','metadata')")
              Icon(type="icon-know" title="知识点" size="mini" plain @click="showDetail(item,'theme','Knowledge')")
    .article.modular(v-show="pageList.article&&pageList.article.length")
      .title 推送文章
      ul.listPanel(v-show="showByImage")
        li(v-for="item,index in pageList.article" @click="showDetail(item,'article')")
          .img-box
            img(:src="item.img_src")
          .exp
            div
              p.name(v-text="item.name")
              p.time(v-text="item.update_time")
      table.table(width="100%" v-show="!showByImage")
        thead
          tr
            th 名称
            th 作者
            th 标签
            th 发布时间
            th 操作
        tbody
          tr(v-for="item,index in pageList.article")
            td.alignL
              img.cover-photo(:src="item.img_src")
              span.bookName(v-text="item.name")
            td(v-text="item.author")
            td(v-text="item.label")
            td(v-text="item.update_time")
            td
              Icon(type="icon-detail" title="详情" size="mini" plain @click="showDetail(item,'article','detail')")
              Icon(type="icon-data" title="扩展属性" size="mini" plain @click="showDetail(item,'article','metadata')")
              Icon(type="icon-know" title="知识点" size="mini" plain @click="showDetail(item,'theme','Knowledge')" v-if="currentType==='Xbook'")
</template>

<style lang="stylus" scoped>
@import "~common/stylus/mixin"

.el-button--primary.is-plain:hover
  background #44C3AA
  border-color #44C3AA
  color #fff
.el-button--primary.is-plain:focus
  border-color none
  color none
.modular
  background-color #fff
  padding 10px 20px
  padding-bottom 0
.bookName
  width calc(100% - 70px)
  display inline-block
  vertical-align middle
  no-wrap()
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
.el-button--primary.is-plain
  background #fff
  border-color #44C3AA
  color #44C3AA
.button-box
  position absolute
  right 20px
  top 10px
  z-index 2
  .active
    background: #44c3aa
    border-color #44c3aa
    color: #fff
.cover-photo
  max-width 47px 
  max-height 59px
  vertical-align middle
.alignL
 text-align left
.contList
  li
    display inline-block
    padding-right 10px
  .disabled
    color #bdbdbd
.listPanel
  li
    margin 20px 40px 20px 0
    margin-bottom 20px
    margin-top 20px
    display inline-block
    position relative
    overflow hidden
    cursor pointer
    box-shadow 1px 1px 5px 1px #d8d8d8
    .img-box
      display table-cell
      vertical-align middle
      text-align center
      width 145px
      height 210px
      &.theme
        height 100px
        img 
          max-height 100px
    img
      max-width 100%
      max-height 210px
    .exp
      width 100%
      height 100%
      bottom -100%
      position absolute
      padding 20px
      box-sizing border-box
      background-color rgba(0,0,0,.6)
      display -webkit-flex
      -webkit-justify-content center
      -webkit-align-items center
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
      transition transform 0.35s,bottom 0.35s
      bottom 0px
</style>


