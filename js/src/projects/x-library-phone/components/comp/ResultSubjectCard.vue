<script>
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  props: {
    name: {},
    fire: {},
    des: {},
    time: {},
    img: {},
    book_info: {}
  },  
  computed: {
    ...mapState({
      subject: state => state.category.subjectDetail,
      homeSubjectList: state => state.home.homeSubjectList,
    }),
  },
  methods: {
     async addCircle(data) {
    let a =  await this.$store.dispatch('category/getSubjectDetailPageData', data)
    let book_circle_id = a[0].book_circle_id
    this.$service.circle.join({id:book_circle_id}).then(res => {
        this.$Toast('加入成功!')
        })
        .catch(err => {
          this.$Toast(err.payload.errors[0])
        })
    },
  },
}
</script>


<template lang="pug">
  .comp-search-result-subject-card.line-single 
    .wrapper.flex
      div
        img(:src="img")
      .right.f12
        .name.f16(style="font-weight:600") {{name}}
        .time.c_9 更新于{{ book_info.update_time }}
        .author.c_9 作者：{{ book_info.author }}
        div
          .intro.ellipsis-2.c_6
            span {{ book_info.abs }}
</template>
<style lang="stylus">
.comp-search-result-subject-card:first-child
  margin-top 0px
.comp-search-result-subject-card
  margin-top 5%
  .wrapper
    line-height 20px
    padding 0 15px 10px 25px
    display flex
    >div
      >img
        width 100px
        height 140px
        object-fit contain
        margin-top -34px
    >.right
      padding-left 15px
      flex 1
      .ellipsis-2
        margin-left -131px  
        margin-top 13%
        text-indent 10px
</style>
