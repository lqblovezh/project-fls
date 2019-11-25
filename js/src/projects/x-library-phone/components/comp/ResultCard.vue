<script>
export default {
  props: {
    parent: null,
    type: {},
    name: {},
    credit:null, // 资源出处
    fire: {},
    publicationTime:null, // 发表时间
    des: {},
    time: {},
    keyword: {},
    status: {},
    number: {}, // 第1090号..
    taoxi: {},
    volume: {},
    cpts: {},
    author: null,
    abs: null,
    chapters: null,
    content: null,
    from: null,
  },
  data() {
    return {
      chapterList: [],
      isMore: this.chapters && this.chapters.length > 5,
    }
  },
  created() {
    console.log(this.type);
    console.log(this.cpts);
    if (this.isMore) {
      let newArray = [...this.chapters]
      this.chapterList = newArray.splice(0, 5)
    } else {
      this.chapterList = this.chapters
    }
  },
  computed: {
    metaData() {
      let meta = []
      switch (this.type) {
        case 1:
          meta = [
            { key: '作者', val: this.cpts.案例作者 },
            { key: '案例出处', val: this.cpts.案例出处 },
            { key: '发布时间', val: this.cpts.发布时间 },
          ]
          break
        case 2:
          meta = [
            { key: '发布日期', val: this.cpts.发布日期 },
            { key: '发文字号', val: this.cpts.发文字号 },
            // { key: '发布机关', val: this.cpts.发布机关 },
            // { key: '实施日期', val: this.cpts.实施日期 },
            // { key: '修改日期', val: this.cpts.修改日期 },
          ]
          break
        case 3:
          meta = [
            { key: '作者', val: this.cpts.作者 },
            { key: '其他作者', val: this.cpts.其他作者 },
            { key: '文献出处', val: this.cpts.文献出处 },
            { key: '发表时间', val: this.cpts.发表时间 },
          ]
          break
        case 4:
          meta = [
            { key: '审理法院', val: this.cpts.审理法院 },
            { key: '案号', val: this.cpts.案例编号 },
            { key: '判决时间', val: this.cpts.判决时间 },
            { key: '裁判出处', val: this.cpts.裁判出处 },
          ]
          break
        case 6:
          meta = [
            { key: '卷册号', val: this.cpts.卷册号 },
            { key: '出版日期', val: this.cpts.出版日期 },
            { key: '作者', val: this.cpts.作者 },
            { key: '责任方式', val: this.cpts.责任方式 },
          ]
          break
        case 7:
          meta = [
            { key: '作者', val: this.cpts.作者 },
            { key: '发表时间', val: this.cpts.发表时间 },
          ]
          break
        case 8:
          meta = [
            { key: '专辑演播者', val: this.cpts.专辑演播者 },
            { key: '专辑责任者', val: this.cpts.专辑责任者 },
            { key: '创建时间', val: this.cpts.create_time },
          ]
          break
      }
      return meta
    },
    title_keywords(){
      if (!this.keyword){
        return null
      }
      else if(typeof this.keyword=='string'){
        return this.keyword
      }else{
        return this.keyword.filter(i => i.type == 'title').map(({value}) => value)
      }
  },
    content_keywords(){
      if (!this.keyword){
        return null
      }
      else if(typeof this.keyword=='string'){
        return this.keyword
      }else{
        return this.keyword.filter(i => i.type == 'text').map(({value}) => value)
      }
  },
  all_keywords(){
      if (!this.keyword){
        return null
      }
      else if(typeof this.keyword=='string'){
        return this.keyword
      }else{
        return this.keyword.map(({value}) => value)
      }
  }
  },
  methods: {
    more() {
      if (this.isMore) {
        this.chapterList = this.chapters
      } else {
        let newArray = [...this.chapters]
        this.chapterList = newArray.splice(0, 5)
      }
      this.isMore = !this.isMore
    },
    chapterClick(item) {
      this.$emit('chapterclick', item, this.parent)
    },
  },
  filters: {
    filterText(data, keyword) {
      if(typeof keyword!='string'){
        keyword = keyword[0]
      }
      let index = data.indexOf(keyword)
      if (index > -1) {
        let text = data.substring(index, index + 50)
        if (text.length >= 47) {
          return text + '...'
        }
        return data.substring(index, index + 50)
      }
      return data
    },
  },
}
</script>

<template lang="pug">
  .comp-search-result-card.line-single(:class="{invalid: status === 'N'}")
    .invalid-flag.tc(v-show="status === 'N'")
      .invalid-body.f12.c_f 失效
    .wrapper
      .name.f16
        span.number.c_orange2(v-if="number&&type!=4") {{number}} 
        HighLigth( :text="name" :keyword="title_keywords" )
      // .author(v-if="type==7&&author") 作者：{{author}}
      .author(v-if="credit") 资源出处：{{credit}}
      // .author(v-if="type==7&&publicationTime") 发表时间：{{publicationTime}}
      .abs(v-if="abs") 简介：{{abs}}
      .content(v-if="content") 
        span 详情：
        HighLigth(:text="content|filterText(content_keywords)" :keyword="content_keywords")
      .from(v-if="from")
        span 来源书籍：
        HighLigth(:text="'《'+from+'》'" :keyword="all_keywords")
      .chapters(v-if="chapters && chapters.length" :style="[{paddingBottom:isMore?'30px':'0'}]")
        .name.f14(v-for="item,index in chapterList" :key="index" @click.stop="chapterClick(item)")
          HighLigth(:text="item.chapter_name" :keyword="all_keywords")
        .more(v-if="chapters && chapters.length > 5" @click.stop="more") {{isMore?'展开':'收起'}}
      .des.f14(:class="{'c_6': status !== 'N'}" v-show="des") —— 
        HighLigth(:text="des" :keyword="all_keywords")
      .meta.f13(:class="{'c_9': status !== 'N'}" v-for="meta in metaData" v-show="meta.val")
        .p {{ meta.key }}：{{ meta.val }}
      .fire.pa.vm-all(v-if="fire")
        .icon.icon-fire
        span.c_error.f12 {{fire}}
</template>
<style lang="stylus">
.comp-search-result-card
  position relative
  &.invalid
    color #A6AAC1
    overflow hidden
    .invalid-flag
      position absolute
      top 0
      width 56.6px
      height 28.2px
      overflow hidden
      transform-origin top center
      transform translateX(-50%) rotate(-45deg)
      background-color #A6AAC1
      >.invalid-body
        margin-top 10px
  .wrapper
    line-height 28px
    padding 10px 15px
    .author
      color #676a7b
      font-size 14px
      margin 10px 0
    .content
      color #888
      font-size 0.24rem
      line-height 1.8em
      margin-top 0.1rem
    .from
      margin-top 0.15rem
      font-size 0.24rem
      color #999
      line-height 1.5em
    .chapters
      background #eaeaeb
      margin-top 10px
      padding-left 10px
      position relative
      // padding-bottom 30px
      .name
        color #7b7b7b
      .more
        position absolute
        bottom 0
        background #ddd
        left 0
        right 0
        text-align center
        color #8a8a8a
    .abs
      line-height 16px
      color #a6aac1
      font-size 14px
    >.source
      color #A6AAC1
    >.meta
      line-height 18px
    >.fire
      right 15px
      line-height 20px
      transform translateY(-20px)
      >.icon
        margin-right 8px
.line-single:after
  margin -1px auto
</style>
