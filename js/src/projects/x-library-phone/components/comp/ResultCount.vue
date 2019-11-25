<script>
export default {
  props: {
    num: '',
    top: {
      default: '50px',
    },
    type:{
      type:Array
    },
    typeResult:{
      type:Array
    },
    list:null,
    left: {
      default: '15px',
    },
    name: {
      type: String
    }
  },
  computed: {
    isArticle () {
      if(this.$route.name=='column-nav'){
        const { name } = this.$route.query
        // return (this.name || name) === '权威案例' ? '案例' : '文章'
        if(name==='法律文件'){
          return '篇法规'
        }
        else if(name==='权威案例'){
          return '篇案例'
        }
        else if(name==='法学文献'){
          return '篇文章'
        }
        else if(name==='裁判文书'){
          return '篇文书'
        }
        else if(name==='文书范本'){
          return '篇文章'
        }
        else if(name==='法律图书'){
          return '本图书'
        }
        else if(name==='课程影音'){
          return '个资源'
        }
        else{
          return '篇文章'
        }
      }
      else if(this.$route.name == 'result'){
        if(this.typeResult[0].book_info.components.type==1){
          return '篇案例'
        }
        else if(this.typeResult[0].book_info.components.type==2){
          return '篇法规'
        }
        else if(this.typeResult[0].book_info.components.type==3){
          return '篇文章'
        }
        else if(this.typeResult[0].book_info.components.type==4){
          return '篇文书'
        }
        else if(this.typeResult[0].book_info.components.type==6){
          return '本图书'
        }
        else if(this.typeResult[0].book_info.components.type==7){
          return '篇文章'
        }
        else if(this.typeResult[0].book_info.components.type==8){
          return '个资源'
        }
      }
      else if(this.$route.name == 'normal-list'){
        if(this.type[0].book_info.components.type==1){
          return '篇案例'
        }
        else if(this.type[0].book_info.components.type==2){
          return '篇法规'
        }
        else if(this.type[0].book_info.components.type==3){
          return '篇文章'
        }
        else if(this.type[0].book_info.components.type==4){
          return '篇文书'
        }
        else if(this.type[0].book_info.components.type==6){
          return '本图书'
        }
        else if(this.type[0].book_info.components.type==7){
          return '篇文章'
        }
        else if(this.type[0].book_info.components.type==8){
          return '个资源'
        }
      }
    }
  }
}
</script>


<template lang="pug">
  .comp-result-count.f12(:style="{top,left}")
    span 刑审智库为您收录 
    span.c_price {{  num  }} 
    span {{ isArticle }}
</template>
<style lang="stylus">
.comp-result-count
  position fixed
  z-index 5
  color #666
</style>
