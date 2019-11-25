<script>
export default {
  props:{
    name:String, //显示的名称
    backUrl:String,//指定返回的页面, 默认返回上一页
  },
  methods:{
    back(){
      this.$emit('back')
      if(this.backUrl){
        this.$router.push({path:this.backUrl})
      }else {
        this.$router.go(-1)
      }
    },
    search(){

    }
  }
}
</script>

<template lang="pug">
.div 
  .head
    .back( @click="back" )
    .name.ell {{name}}
    .search( @click="search" )
</template>


<style lang="stylus" scoped>
.div 
  height 0.9rem
.head
  position fixed
  top 0
  left 0
  right 0
  height 0.9rem
  z-index 99
  background #fff
  display flex
  box-shadow: 1px 2px 7px 0px rgba(0, 0, 0, 0.04); 
  // align-items center
  .back 
    width 0.9rem
    background url('./img/back.png') no-repeat center 
    background-size 0.38rem 0.36rem
    flex 0 0 auto
  .name 
    flex 1 1 auto  
    text-align center
    line-height 0.9rem
    color #333333
    font-size 0.34rem
  .search 
    flex 0 0 auto
    width 0.9rem  
    // background url('./img/search.png') no-repeat center 
    // background-size 0.38rem 0.38rem
</style>
