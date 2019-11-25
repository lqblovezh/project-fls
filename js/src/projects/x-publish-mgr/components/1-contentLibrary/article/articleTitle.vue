<template lang="pug">
.articleWrap
  VaForm(ref = "titleForm" )
    .titleWrap
      input.title(name="title" v-va="{ type:'required' }"   id="richTitle" placeholder="请在这里输入标题" v-model="detailData.name"  )
    .authorWrap
      input.author(name="author"  v-va="{ type:'required' }"   id="richAuthor" placeholder="请在这里输入作者" v-model="detailData.author" )
  hr
</template>

<script>
export default {
  data(){
    return {
      detailData:{
        name:"",
        author:""
      }
    }
  },
  methods:{
    valiAll(){
      return this.$refs.titleForm.valiAll()
    }
  }
}
</script>

<style lang="stylus">
.articleWrap
  input
    width 94%
  .titleWrap
    line-height 24px
  .authorWrap
    line-height 30px
</style>
