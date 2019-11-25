<script>
export default {
  data(){
    return {
      show:false,
      text:'正在上传'
    }
  },
  methods:{
  }
}
</script>

<template lang="pug">
.div(v-if="show") 
  .mask 
    .content 
      svg.circular(  viewBox="25 25 50 50" class="circular")
        circle( cx="50" cy="50" r="20" fill="none" class="path" )
      .text {{text}}
          
</template>


<style lang="stylus" scoped>
@keyframes loading-dash {
  0% {
    transform rotate(0deg)
  }  
  100% {
    transform rotate(360deg)
  }
}
.mask  
    position absolute
    top 0 
    left 0
    right 0
    bottom 0
    z-index 10000
    background rgba(0,0,0,0.8)
    .content
      margin-top 45vh
      text-align center
      .text
        color #fff
        height 20px
        line-height 20px
        text-align center
        font-size 12px
        color #14afff
.circular
  animation loading-dash 1s linear infinite
  height 0.9rem
  width 0.9rem
  color #fff 
  stroke-dasharray: 90,150;
  stroke-dashoffset: 0;
  stroke-width: 4;
  stroke: #14afff;
  stroke-linecap: round;
</style>
