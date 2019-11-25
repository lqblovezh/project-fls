<script>

import mulu from './mulu.json'

import * as articleServices from "services/x-publish/push_articles"

export default {
  props:['type' , 'detailId' , 'detailDialog'],
  created(){
    this.getDetail();
  },
  mounted(){
  },
  data() {
    return {
      metadata:[  //扩展属性
      ],
      detailData:{
        id:this.detailId,
        attributes:[],
      }
    };
  },
  methods: {
    getDetail(){
      if(this.detailId){
        articleServices.getMetadata({id:this.detailId}).then(res=>{
          this.detailData.attributes = res.data;
          log(res,111111111111)
        }).catch(res=>{
          log("获取出错")
        })
      }
    },
    addMetadata(){ //新增扩展属性
      this.detailData.attributes.push({key:'' , value:''})
    },
    delMetadata(index){ //删除扩展属性
      this.detailData.attributes.splice(index , 1)
    },
    submitMetadata(){ // 提交扩展属性
      var {id, attributes} = this.detailData ;
      log(attributes)
      articleServices.modifyArticle({id, attributes}).then(res=>{
        this.$message.success("修改扩展属性成功!")
        this.$emit('detailBack', false)
      })
    },
  },
};
</script>

<template lang="pug">
.div
  el-tabs( :value="type")
    MetaData( :metadata="detailData.attributes" @submit="submitMetadata" @back="$emit('detailBack')" )
</template>


<style lang="stylus" scoped>
.w-e-text-container
  height 800px
#editor
  max-height 1000px
  width 100%
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  max-width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
.muluWrap
  .left
    width 300px
    background red
    display inline-block
    overflow auto
  .right
    width calc( 100% - 300px)
    display inline-block
    min-height 500px
</style>
