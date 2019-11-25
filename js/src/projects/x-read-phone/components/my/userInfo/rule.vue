<script>
import * as servers from 'services/x-read/mySale';
export default {
    data(){
      return{
        distribute_rule:'' 
      }
    },
    methods:{
        rule(){
            servers.rule().then((res)=>{
               this.distribute_rule= res.data.distribute_rule;
            })
        }
    },
    created(){
       this.rule();
    }
}
</script>

<template lang="pug">
  .box
    Head(name="分销规则")
    ol
      p
      li 
        pre {{distribute_rule}}
    
</template>

<style lang="stylus" scoped> 
ol 
  padding 0 0.3rem
  p
    height 1px
    margin-bottom 0.3rem
    border-bottom 0.1px solid #eee
  li
    line-height 0.6rem
    color  #888
    font-size 0.28rem
</style>


 
