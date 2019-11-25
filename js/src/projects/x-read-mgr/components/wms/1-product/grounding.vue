<script>
export default {
  props:['groupList' , 'currGroup'],
  created(){
  },
  data(){
    return{
      flag: true,
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
    title="是否更改用户已购买产品版本"
    width="400px"
    )
    .content
      el-button( @click="$emit('upShelf')" type="primary" ) 只上架
      el-button( @click="$emit('upShelf',true)" type="primary"  ) 上架同步用户已购买  
</template>


<style lang="stylus" scoped>
  .content
    text-align center
    padding 20px
</style>
