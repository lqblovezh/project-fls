<script>
import { mapState } from 'vuex'
export default {
  components: {},

  asyncData({ store, route }) {
    return store.dispatch('category/getSubjectDetailPageData', route.query)
  },
  beforeDestroy() {
    this.$store.state.category.subjectDetail = null
  },
  data() {
    return {
      circle: {},
    }
  },
  computed: {
    ...mapState({
      subject: state => state.category.subjectDetail,
    }),
  },
  methods: {
    navClickHandler(item) {
      this.$go('/subject-detail-list', {
        class_id: item.id,
        product_id: this.subject.product_id,
        name: item.name,
      })
    },
    addCircle() {
      this.$addCircle(this.subject, 'book_circle_id')
    },
  },
}
</script>
<template lang="pug">
.page-taoxi.taoxi-bg.c_f(v-if="subject")
  .bg-bg-book2
  Head(type="dark" :name="subject.name") 
  .taoxi-info-bg
    .page-taoxi__info
      .page-taoxi__title.img_title
        img(:src="subject.img_src")
        span.page-taoxi__name.taoxiname {{subject.name}}
        .addcircle.icon.icon-add-circle(@click="addCircle" v-if="!subject.user_status")
        .clear
      .page-taoxi__author
        TopicTitle(name="内容简介" rname="" icon="false")
      .page-taoxi__intro.ellipsis-4 {{subject.abs}}
      .page-taoxi__author.flex-between-center
        .page-taoxi__pic.flex-between-center
          .page-taoxi__author
            TopicTitle(name="作者介绍" rname="" icon="false")
              img( :src="subject.components.author_img")
              span(class="anther") {{subject.author}}
      .page-taoxi__publish
        .flex-between(v-for="meta in subject.attributes")
          p 出版者
          p 法律出版社
  .page-taoxi__wrap
    .page-taoxi__menu()
      SubjectCard(
        v-for="item in subject.components.columns_info"
        :key="item.id"
        :title="item.name"  
        :intro="item.abs"
        :num="item.number"
        :img="item.img_src"
        @click.native="navClickHandler(item)"
      )
</template>
<style lang="stylus">
.page-taoxi
  >.taoxi-info-bg
    &.fixed
      position fixed
      top 0
      width 100%
      background-color rgba(0, 0, 0, 0.4)
      overflow-y auto
    >.page-taoxi__info
      padding 0px 15px
      >.page-taoxi__title
        button
          width 70px
          height 30px
          line-height 30px
          color #FFF
          background-color #F15A4A
          border-radius 15px
          border none
          outline none
      >.page-taoxi__intro
        margin-top 10px
        margin-bottom 15px
        font-size 12px
        opacity 0.9
      >.page-taoxi__author
        padding-bottom 5px
        padding-top 15px
        border-top 1px solid #F4F4F4 
        .page-taoxi__pic
          .anther
            margin-left 15px
          img
            width 72px
            height 72px
            margin-top 6%
            margin-bottom 5%
            border-radius 50%
            object-fit cover
      >.page-taoxi__publish
        padding-top 15px
        font-size 12px
        color rgba(255, 255, 255, 0.6)
        >p
          line-height 20px
  >.page-taoxi__wrap
    box-sizing border-box
    >.page-taoxi__menu
      overflow auto
      height 100%
      box-sizing border-box
      padding 15px
      display flex
      flex-wrap wrap
      >.sub-item
        &:nth-of-type(odd)
          margin-right 15px
.taoxiname 
  margin-left 5%
  float left
  margin-top 3%
  font-weight bold
.img_title
  margin 4% 0
  >img 
    max-width 60%
    float left
.clear
  clear both
.addcircle
  margin-top 10%
  float right 
</style>