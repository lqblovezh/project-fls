<script>
export default {
  props:['groupList' , 'currGroup'],
  created(){
    log("重庆插件")
  },
  data(){
    return{
      flag:true,
    }
  },
  methods:{
    submit(){
      let newId = this.$refs.moveToId.value ; 
      this.$emit('submit',newId)
    }
  },
  watch:{
    flag(){
      if(!this.flag){
        this.$emit('back')
      }
    }
  }
}
</script>


<template lang="pug">
.div 
  el-dialog(
    :center="false"
    :visible.sync="flag"
    v-if="flag"
    :close-on-click-modal="false"
    title="移动分组"
    width="400px"
    )
    span(v-text=""  )
    .group
      .label 移动到
      select.form-control(  ref="moveToId"   placeholder="请选择")
        option( v-for="(item,index) in groupList" v-if="item.id != currGroup && item.id!=''"
              v-text="item.name "  :value="item.id")
    span.dialog-footer( slot="footer" class="")
      el-button( @click="flag = false" type="info" ) 返回
      el-button( @click="submit" type="primary"  )  确定  
</template>


<style lang="stylus" scoped>

</style>
