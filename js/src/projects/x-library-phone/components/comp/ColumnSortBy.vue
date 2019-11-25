<script>
export default {
  props: {
    list: {},
    top: {
      default: '130px',
    },
    height: {
      default: '30px',
    },
  },
  computed: {
    title(){
      if(this.name == '权威案例'){
        return '发布时间'
      }
      else if(this.name == '法律文件'){
        return '发布日期'
      }
      else if(this.name == '法学文献'){
        return '发表时间'
      }
      else if(this.name == '裁判文书'){
        return '判决时间'
      }
      else if(this.name == '文书范本'){
        return '发表时间'
      }
      else if(this.name == '法律图书'){
        return '出版日期'
      }
      else if(this.name == '课程影音'){
        return '创建时间'
      }
      else{
        return '发布时间'
      }
    },
    typeList() {
      return [
        { name: this.title, type: this.title, sort: 'asc' },
        { name: '热度', type: 'hot', sort: 'asc' },
      ]
    }
  },
  mounted() {
    this.name = this.$route.query.name
    // console.log(this.name);
    try {
      let order = this.$route.query.order

      if (order) {
        let res = JSON.parse(order)
        this.typeList.forEach(item => {
          let val = res[item.type]
          if (val) {
            console.log('ressssss', val)
            if (val === 'asc') {
              item.sort = 'desc'
            } else {
              item.sort = 'asc'
            }
          }
        })
      }
    } catch (error) {}
  },
  data() {
    return {
      name: null,
    }
  },
  methods: {
    changeType(item) {
      let { type, sort } = item
      item.sort = sort === 'asc' ? 'desc' : 'asc'
      let order = JSON.stringify({ [type]: sort })
      this.$emit('select', order)
    },
  },
}
</script>


<template lang="pug">
.comp-column-sort-by.c_6
  .sort-by.f14(:style="{top,height}")
    .ls.flex.tc
      .item(
        v-for="item in typeList"
        :key="item.type"
        @click="changeType(item)"
      )
        span {{item.name}}
        .icon.icon-sort(:class="{rt180:item.sort === 'desc'}")
      .item( @click="$emit('openPanel')")
        span 筛选
        .icon.icon-star-select
</template>
<style lang="stylus">
.comp-column-sort-by
  >.sort-by
    top 130px
    position fixed
    left 0
    right 0
    line-height 30px
    background #fff
    z-index 10
    box-shadow 0px 3px 2px 1px rgba(132, 136, 153, 0.1)
    >.ls
      justify-content space-around
      >.item
        width 33%
        transform rotate(0deg)
        >.icon-sort
          transition all ease 0.3s
          &.rt180
            transform rotate(-180deg)
            transition all ease 0.3s
        &::after
          content '|'
          color #bbb
          position absolute
          transform translateX(12px)
        &:last-child
          &::after
            content ''
        >span
          margin-right 15px
</style>
