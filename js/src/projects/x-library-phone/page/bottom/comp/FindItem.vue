<script>
export default {
  props: {
    name: '',
    img: '',
    item :null , // 父级数据item
    author: '',
    time: '',
    des: '',
  },
  computed: {
    ISTYPE(){
      if(this.item.book_info){
        return false
      }else{
        return true
      }
    },
    Fitem(){
      if(this.item.book_info){
        return this.item.book_info.components
      }else{
        return null
      }
    },
    Fitem_type () {
      if(this.item.book_info){
        return this.item.book_info.components.type
      }else{
        return null
      }
    }
  }
}
</script>

<template lang="pug">
div
  .comp-find-item.tl(v-if="ISTYPE")
    .wrapper 
      .left.ib
        .name.f16 {{name}}
        .des.c_6(v-if="des") 简介
        .other.f12.c_6
          span.author(v-if="author")
            span 作者: 
            span {{author}} 
          span.time(v-if="time")
            span 时间: 
            span {{time|formateTime}}
      .right 
        img(:src="img")
  .comp-find-item.tl(v-if="!ISTYPE")
    .wrapper 
      .left.ib
        .name.f16 {{name}}
        .des.c_6(v-if="des") 简介
        .other.f12.c_6(v-if="Fitem_type==1")
          span.author.ds(v-if="Fitem&&Fitem.案例出处")
            span 案例出处: 
            span {{Fitem.案例出处}} 
          span.author.ds(v-if="Fitem&&Fitem.案例作者")
            span 作者: 
            span {{Fitem.案例作者}} 
          span.author.ds(v-if="Fitem&&Fitem.发布时间")
            span 发布时间: 
            span {{Fitem.发布时间}} 
        .other.f12.c_6(v-if="Fitem_type==2")
          span.author.ds(v-if="Fitem&&Fitem.发布日期")
            span 发布日期: 
            span {{Fitem.发布日期}} 
          span.author.ds(v-if="Fitem&&Fitem.发文字号")
            span 发文字号: 
            span {{Fitem.发文字号}} 
        .other.f12.c_6(v-if="Fitem_type==3")
          span.author.ds(v-if="Fitem&&Fitem.作者")
            span 作者: 
            span {{Fitem.作者}} 
          span.author.ds(v-if="Fitem&&Fitem.文献出处")
            span 文献出处: 
            span {{Fitem.文献出处}} 
          span.author.ds(v-if="Fitem&&Fitem.发表时间")
            span 发表时间: 
            span {{Fitem.发表时间}} 
        .other.f12.c_6(v-if="Fitem_type==4")
          span.author.ds(v-if="Fitem&&Fitem.审理法院")
            span 审理法院: 
            span {{Fitem.审理法院}} 
          span.author.ds(v-if="Fitem&&Fitem.判决时间")
            span 判决时间: 
            span {{Fitem.判决时间}} 
          span.author.ds(v-if="Fitem&&Fitem.裁判出处")
            span 裁判出处: 
            span {{Fitem.裁判出处}} 
        .other.f12.c_6(v-if="Fitem_type==7")
          span.author.ds(v-if="Fitem&&Fitem.作者")
            span 作者: 
            span {{Fitem.作者}} 
          span.author.ds(v-if="Fitem&&Fitem.发表时间")
            span 发表时间: 
            span {{Fitem.发表时间}} 
        .other.f12.c_6(v-if="Fitem_type==6")
          span.author.ds(v-if="Fitem&&Fitem.卷册号")
            span 卷册号: 
            span {{Fitem.卷册号}} 
          span.author.ds(v-if="Fitem&&Fitem.出版日期")
            span 出版日期: 
            span {{Fitem.出版日期}} 
          span.author.ds(v-if="Fitem&&Fitem.作者")
            span 作者: 
            span {{Fitem.作者}} 
        .other.f12.c_6(v-if="Fitem_type==8")
          span.author.ds(v-if="Fitem&&Fitem.专辑演播者")
            span 演播者: 
            span {{Fitem.专辑演播者}} 
          span.author.ds(v-if="Fitem&&Fitem.专辑责任者")
            span 责任者: 
            span {{Fitem.专辑责任者}}
          span.author.ds(v-if="Fitem&&Fitem.create_time")
            span 创建时间: 
            span {{Fitem.create_time}} 
      .right 
        img(:src="img")
</template>

<style lang="stylus">

.comp-find-item.tl
  >.wrapper
    background #FFFFFF
    box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
    display flex
    padding 15px
    >.left
      display inline-block
      width 5rem
      >.name
        margin-bottom 11px !important
      >.other
        >.author
          margin-right 30px
          >span 
            color #676a7b
            opacity 0.8
        >.ds
          display block
    >.right
      width 2rem
      flex 1 1 none
      >img
        width 96px
        height 96px
        border-radius 4px
</style>
