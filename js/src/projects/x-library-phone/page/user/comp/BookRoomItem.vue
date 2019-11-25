<script>
export default {
  props: {
    item: {
      type: Object,
      // required: true
    },
    idx: {},
    top: {},
    type: {
      type: String,
      default: 'bookroom'
    },
  },
  computed: {},
  methods: {
     async goRead (item) {
       console.log(item)
      // 如果是管理状态，就不允许跳进阅读器
      if (item.type==8) {
        this.$go('/column-bookproduct', {
          id: item.product_id,
          name: item.type_name,
        })
        return
      }
      try {
        let res = await this.$service.category.getAccessCode({
          product_id:item.components.read_product,
          book_id:item.components.read_book
        })
        console.log(res)
        localStorage.access_code = res.data
        this.$go('/reader', {
          product_id:item.components.read_product,
          book_id:item.components.read_book
        })
      } catch(e) {
        console.log(e)
      }
    },
  }
}
</script>
<template lang="pug">
.bookroom-item.flex(@click="goRead(item)")
  .item-checkbox(v-if="type==='bookroom'")
    input(type="checkbox" @click.stop="$emit('selectItem', {idx, item})" v-model="item.checked")
  .item-content.f14
    .item-content__title
      span(v-if="item.components.type==1") {{ item.components['案例编号']}}
      |{{ item.name }}
    .item-content__intro(v-show="item.components['副标题']") ——{{ item.components['副标题'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['案例出处']&&item.components.type==1") 案例出处：{{ item.components['案例出处'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['发文字号']&&item.components.type==2") 发文字号：{{ item.components['发文字号'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['文献出处']&&item.components.type==3") 文献出处：{{ item.components['文献出处'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['审理法院']&&item.components.type==4") 审理法院：{{ item.components['审理法院'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['判决时间']&&item.components.type==4") 判决时间：{{ item.components['判决时间'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['裁判出处']&&item.components.type==4") 裁判出处：{{ item.components['裁判出处'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['资源出处']&&item.components.type==7") 资源出处：{{ item.components['资源出处'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['卷册号']&&item.components.type==6") 卷册号：{{ item.components['卷册号'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['专辑演播者']&&item.components.type==8") 专辑演播者：{{ item.components['专辑演播者'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['专辑责任者']&&item.components.type==8") 专辑责任者：{{ item.components['专辑责任者'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['作者']") 作者：{{ item.components['作者'] }}
    .item-content__source.f12.c_gray1(v-if="item.components['案例作者']&&item.components.type==1") 案例作者：{{ item.components['案例作者'] }}
    .item-content__footer.f12.c_gray1.flex-between-center
      .time(v-if="item.components['发布时间']") 发布时间：{{ item.components['发布时间'] }}
      .time(v-if="item.components['发布日期']") 发布日期：{{ item.components['发布日期'] }}
      .time(v-if="item.components['发表时间']") 发表时间：{{ item.components['发表时间'] }}
      .hot.flex(v-if="top === 'afford'")
        .icon-fire
        span {{ item.hot }}
      .price
        span.f14 ￥
        |{{ parseInt(item.components.price) }}
</template>
<style lang="stylus">
.bookroom-item
  padding 15px
.item-content
  line-height 20px
  width 100%
  .item-content__title
    span
      color #B1936A
      margin-right 10px
  .item-content__intro
    color #676A7B
  .item-content__footer
    .hot
      align-items center
      span
        margin-left 7px
    >.price
      font-size 18px
      letter-spacing -1px
      color #f15a4a
</style>
