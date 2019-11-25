<script>
export default {
  data() {
    return {
      show: false,
      startX: 0,
      startY: 0,
      moveX: 0,
      moveY: 0,
    }
  },
  created() {
    const a= {
      back(){

      }
    }
  },
  methods: {
    change() {},
    startHandler(e) {
      const { pageX, pageY } = e.changedTouches[0]
      this.startX = pageX
      this.startY = pageY
    },
    moveHandler(e) {
      const { pageX, pageY } = e.changedTouches[0]
      this.moveX = pageX 
      this.moveY = pageY

      this.$refs.btn.style.transform = `translateX(${this.moveX}px)`
    },
    endHandler(e) {
      const { pageX, pageY } = e.changedTouches[0]
      this.startX = 0
      this.startY = 0
      console.dir(e)
    },
  },
}
</script>

<template lang="pug">
.div 
  button.btn.btn-primary( 
    ref="btn"
    @touchstart="startHandler"
    @touchmove="moveHandler"
    @touchend="endHandler"

   ) Submit
   button(@click="") 重置
  transition( name="li") 
    div(v-if="show") li1111111111111
</template>


<style lang="stylus" scoped>
.li-enter-active, .li-leave-active
  transition opacity 3s
.li-enter, .li-leave-to /* .fade-leave-active below version 2.1.8 */
  opacity 0
.btn
  transition all 0.1s linear
</style>
