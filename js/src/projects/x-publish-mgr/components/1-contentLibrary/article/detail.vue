<script>

import mulu from './mulu.json'

import * as articleServices from "services/x-publish/article"

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

      }
    };
  },
  methods: {
    getDetail(){
      if(this.detailId){
        articleServices.detailArticle({id:this.detailId}).then(res=>{
          this.detailData = res.data;
        }).catch(res=>{
          console.log("获取出错")
        })
      }
    },
    submitMetadata(){ // 提交扩展属性
      var {id, attributes} = this.detailData ;
      console.log(attributes)
      articleServices.modifyArticle({id, attributes}).then(res=>{
        this.$message.success("修改扩展属性成功!")
        this.$emit('update:detailDialog', false)
      })
    }
  },
};
</script>

<template lang="pug">
.div
  el-tabs( :value="type")
    //- 扩展属性
    el-tab-pane( label="扩展属性" name="data" )
      MetaData( :metadata="detailData.attributes" @submit="submitMetadata" @back="$emit('update:detailDialog', false)" )

      //- .meta
      //-   .group.rowWrap( v-if="metadata"  v-for="(item, index) in   detailData.attributes  ")
      //-     .label( v-text="index+1")
      //-     input.form-control.left( v-model="item.key")
      //-     input.form-control.right( v-model="item.value")
      //-     span.btn
      //-       el-button(@click="delMetadata(index)" size="medium" type="primary" plain icon="el-icon-delete" ) 删除
      //-   .metaadd
      //-     el-button(@click="addMetadata" type="primary" plain size="medium") 新增
      //-   .btns
      //-     el-button( @click=" $emit('update:detailDialog', false)" type="info") 取消
      //-     el-button(@click="submitMetadata('detailForm')"  type="primary" ) 确定
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
