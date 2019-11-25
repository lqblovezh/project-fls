<script>
export default {
  props: ['time']
}
// (v-if="!this.navList[this.currIndex].num")
</script>

<template lang="pug">
div(v-if="time")
  .during
    span(@click="$emit('openStartTime')") {{time.start_time}}
    |-
    span(@click="$emit('openEndTime' ) ") {{time.end_time}}
    span.time-confirm( @click="$emit( 'timePickConfirm' ) ")  确定  
</template>


<style lang="stylus" scoped>
.during
  height 30px
  background #fbfaef
  line-height 30px
  text-align center
  color #d6b177
  .time-confirm
    position absolute
    right 0
    margin-right 20px
    color #14afff
</style>
