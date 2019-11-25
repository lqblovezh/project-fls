<script>



export default {
  props:{
    imgLinkDialog:Boolean,
    imgSrc:String,
    link:String ,
    type:{
      type:String,
      default:'img'
    }
  },
  created(){
    this.dialog = this.imgLinkDialog ;
  },
  data(){
    return {
      dialog:false ,
    }
  },
  methods:{
    copyLink(name){//复制链接
      if(!this.link){
        this.$message.error("链接不存在!")
        return
      }
      try{
        var t = this.$refs.inp.select();
        document.execCommand('copy')
        this.$message.success('复制成功!');
      }catch(e){
        this.$message.error("已选择,请使用ctrl+c 实现复制")
      }
    },
    back(){
      this.$emit('back')
    },

  },
  watch:{
    dialog(){
      if(this.dialog == false){
        this.back();
      }
    }
  }

}
</script>

<template lang="pug">
.div
  el-dialog(
    :center="false"
    :visible.sync="dialog"
    :close-on-click-modal="false"
    width="350px"
    )
    .imgLinkDialogContent( )
      .imgWrap
        img( v-if="type == 'img'"   :src="imgSrc"   )
        audio( v-if="type == 'voice'" :src ="src" controls)
        video( v-if="type == 'video'" :src ="src" controls)
        .inp
          input.form-control( placeholder="暂无链接..." ref="inp" :value="link"   )
      .btns
        // el-button(type="primary" plain size="medium" )
        //   a(:href="link" :download="Math.floor(Math.random()*1000)") 下载图片
        el-button(type="primary"  @click="copyLink()" size="medium" ) 复制链接
</template>

<style lang="stylus" scoped>
.inp
  margin-top 35px
.btns
  margin-top 30px
.form-control
  width 100%
</style>
