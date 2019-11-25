<script>
export default {
  props:['isTrue','type'],
  computed:{
    hasPadding(){
      if(this.$slots.default ){
        return '0.4rem'
      }else {
        return '0'
      }
    }
  },
  mounted(){
    // log(this.$slots.default)
  }
}
</script>

<template lang="pug">
.myIcon 
  .icon(@click.stop="$emit('change')" :style="{paddingLeft: hasPadding  }" :class="[type, isTrue]" )
    slot

</template>

<style lang="stylus" scoped>
.myIcon
  height 0.5rem
  margin-right 10px
  min-width 15px
  color #999
.icon 
  height 15px
  line-height 17px
  padding-left 0.4rem
.up
  font-size 11px
  background url('./img/up.png') no-repeat left  
  background-size 14px
  &.true 
    background url('./img/up-true.png') no-repeat left  
    background-size 14px
.replay
  font-size 11px
  background url('./img/replay.png') no-repeat left  
  background-size 14px
.share
  font-size 11px
  background url('./img/share.png') no-repeat left  
  background-size 14px
</style>
