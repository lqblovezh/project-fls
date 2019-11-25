<script>
import store from '@/store'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      src: '',
      isOpen: false,
    }
  },
  methods: {
    ...mapMutations(['changeIsAppShow']),
    open(res, rej) {
      this.res = res
      this.rej = rej
      this.isOpen = true
      store.commit('changeIsAppShow', false)
      // document.querySelector('#app').style.display = 'none'
      // document.addEventListener('touchmove', this.stopMove, { passive })
    },
    clickHandler() {
      this.isOpen = false
      this.src = null
      store.commit('changeIsAppShow', true)
    },
  },
}
</script>


<template lang="pug">
  .open-img-wrap(v-if="isOpen" @click="clickHandler") 
    .content 
      .img-wrap 
        img(:src="src") 

</template>


<style lang="stylus" scoped>
.open-img-wrap
  position fixed
  background-color #000
  top 0
  bottom 0
  left 0
  right 0
  z-index 1000
  .content
    img
      position fixed
      width 100%
      left 0
      top 50%
      transform translateY(-50%)
</style>
