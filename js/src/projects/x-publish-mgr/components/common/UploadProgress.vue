<script>

export default {
  props:['percentage'],
  data(){
    return {

    }
  },
};
</script>

<template lang="pug">
.progressWrap(v-if="percentage"  )
  .content
    el-progress(type="circle" :percentage="percentage" color="#F7793E" :width="80" )
</template>

<style lang="stylus" scoped>
.progressWrap
  position fixed
  background rgba(0,0,0,0.8)
  left 0
  right 0
  top 0
  bottom 0
  z-index 2500
  display flex
  justify-content center
  align-items center
  .content
    text-align center

</style>


