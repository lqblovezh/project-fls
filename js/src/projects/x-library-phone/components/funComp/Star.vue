<script>
export default {
  data () {
    return {
      x0: 0, // 拖动初始横向坐标
      len: 0, // 组件宽度
      val: 0, // 暂存刚拖动组件时的分数
    }
  },
  computed: {
    socreArr() {
      const value = this.$parent.value
      return [0,0,0,0,0].map((a, idx) => {
        if (2 * (idx + 1) <= value) {
          return 2
        } else if (2 * (idx + 1) - 1 === value) {
          return 1
        } else {
          return a
        }
      })
    }
  },
  methods: {
    setScore(i) {
      this.$parent.$emit('input', i)
    },
    touchStart (evt) {
      this.x0 = evt.touches[0].clientX
      this.len = evt.currentTarget.offsetWidth
      this.val = this.$parent.value
    },
    touchMove (evt) {
      const x1 = evt.touches[0].clientX
      this.caculate(x1 - this.x0)
    },
    caculate (num) {
      let temp = parseInt(num/this.len*10) + this.val
      if (temp >= 10) {
        temp = 10
      }
      if (temp <= 0) {
        temp = 0
      }
      this.setScore(temp)
    }
  }
}
</script>
<template lang="pug">
.comp-star.flex
  .star-list.ib(@touchstart="touchStart" @touchmove="touchMove")
    .star-icon(
      :class="{'icon-star_full': socreArr[index] === 2, 'icon-star_half': socreArr[index] === 1, 'icon-star_empty': socreArr[index] === 0}"
      v-for="(i, index) in 5"
    )
  .star-tips.f12.ib 轻触添加评分
</template>
<style lang="stylus">
.comp-star
  margin-top 30px
  align-items center
  >.star-list
    height 16px
    margin-right 16px
    >.star-icon
      display inline-block
      &:not(:last-child)
        margin-right 8px
</style>
