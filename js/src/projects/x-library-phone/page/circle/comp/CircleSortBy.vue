<script>
export default {
  props: {
    list: {},
    top: {
      default: '130px',
    },
    height: {
      default: '40px',
    },
  },
  mounted() {
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
      typeList: [
        { name: '最后发言时间', type: 'time', sort: 'asc' },
        { name: '最近查看排序', type: 'hot', sort: 'asc' },
      ],
      anime: {
        active: false,
        move: false,
      },
      data: {
        name: '',
      },
      inpHide: false,
    }
  },
  methods: {
    changeType(item) {
      // item.sort = !item.sort
      const { type, sort } = item
      let order = JSON.stringify({ [type]: sort })
      this.$emit('select', order, this.changeDirection.bind(this, item))
      this.changeDirection(item)
    },
    changeDirection(item) {
      if (item.sort === 'asc') {
        item.sort = 'desc'
      } else {
        item.sort = 'asc'
      }
    },
    focusHandler(e) {
      this.anime.active = true
      this.anime.move = true
    },
    blurHandler(e) {
      this.anime.move = false
      setTimeout(() => {
        this.anime.active = false
      }, 300)
    },
    search() {
      console.log('search')
      this.$emit('search', this.data)
      this.$refs.input.blur()
    },
  },
}
</script>

<template lang="pug">
.comp-circle-sort-by
  .sort-by(:style="{top,height}")
    .ls.flex.tc
      .item(
        v-for="item in typeList"
        :key="item.type"
        @click="changeType(item)"
      )
        span {{item.name}}
        .icon.icon-sort(
          :class="{rt180:item.sort === 'desc'}"
        )
      .inp( :class="anime" ref="inp" @click="$emit('select','panel')")
        input( 
          @focus="focusHandler" 
          @blur="blurHandler" 
          @keyup.enter="search"
          placeholder="查找圈子"
          v-model="data.name"
          ref="input"
          v-show="!inpHide"
        )
        .icon.icon-home-search(@click="search")
</template>
<style lang="stylus">
.comp-circle-sort-by
  font-size 0.24rem
  >.sort-by
    top 130px
    position fixed
    left 0
    right 0
    line-height 40px
    background #fff
    z-index 10
    box-shadow 0px 3px 2px 1px rgba(132, 136, 153, 0.1)
    >.ls
      justify-content space-around
      >.item
        width 33%
        flex auto
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
      .inp
        width 33%
        flex auto
        text-align right
        >input
          width 1.6rem
          transition width 0.3s ease-in-out
        >.icon
          width 0.8rem
          height 40px
        &.active
          position fixed
          left 0
          right 0
          width 100%
          background #fff
        &.move
          >input
            transition width 0.3s ease-in-out
            width 6.5rem
</style>
