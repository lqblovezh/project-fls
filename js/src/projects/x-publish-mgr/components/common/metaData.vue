<script>
export default {
  props:{
    metadata:Array,
    isShowBtn:{
      type: Boolean,
      default: true,
    },
    isOption:{
      type: Boolean,
      default: true,
    },
    readOnly:{
      type: Boolean,
      default: false,
    }
  },
  data(){
    return {

    }
  },
  methods:{
    addMetadata(){ //新增扩展属性
      this.metadata.push({key:'' ,name:"", value:''})
    },
    delMetadata(index){ // 删除扩展属性
      this.metadata.splice(index , 1)
    },
    submitDetail(){
      this.$emit('submit')
    },
  }
}
</script>

<template lang="pug">
.div
  .group.rowWrap( v-if="metadata"  v-for="(item, index) in metadata")
    .label( v-text="index+1")
    input.form-control.left( v-model="item.key" placeholder="键" :disabled="readOnly")
    input.form-control.middle(v-model="item.name" placeholder="名称" :disabled="readOnly")
    input.form-control.right( v-model="item.value" placeholder="值" :disabled="readOnly")
    span.btn(v-if="isOption&&!readOnly")
      el-button(@click="delMetadata(index)" size="medium" type="primary" plain icon="el-icon-delete" v-if="!readOnly") 删除
  .metaadd(v-if='isOption&&!readOnly')
    el-button(@click="addMetadata" type="primary" size="medium" plain v-if="!readOnly") 添加扩展属性
  .btns.right(v-if="isShowBtn&&!readOnly")
    el-button( @click="$emit('back', false)"  type="info" ) 取消
    el-button(@click="submitDetail('detailForm')"  type="primary" ) 确定
</template>

<style lang="stylus" scoped>
.rowWrap
  .left
    width 150px
    min-width 150px
  .middle
    width 150px
    margin-left 10px
  .right
    width 190px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
</style>
