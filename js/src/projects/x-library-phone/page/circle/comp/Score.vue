<script>
export default {
  props: {
    detail: {}
  },
  data () {
    return {
      info: {}
    }
  },
  computed: {
    socreArr() {
      console.log(this.info, '...')
      if (this.info.score) {
        const value = this.info.score
        return [0,0,0,0,0].map((a, idx) => {
          if (2 * (idx + 1) <= value) {
            return 2
          } else if (2 * (idx + 1) - 1 === value) {
            return 1
          } else {
            return a
          }
        })
      } else {
        return [0,0,0,0,0]
      }
    }
  },
  mounted () {
    this.getScore()
  },
  methods: {
    async getScore () {
      try {
        const res = await this.$service.circle.getScore({
          book_id: this.detail.book_id
        })
        this.info = res.data
      } catch(e) {
        console.warn(e)
      }
    }
  }
}
</script>
<template lang="pug">
.comp-star.flex
  .star-list.ib
    .star-icon(
      :class="{'icon-star_full': socreArr[index] === 2, 'icon-star_half': socreArr[index] === 1, 'icon-star_empty': socreArr[index] === 0}"
      v-for="(i, index) in 5"
    )
  .tips.f12 {{ info.score }}评分({{info.number}}人评)
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
