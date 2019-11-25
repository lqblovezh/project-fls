<script>
import * as servers from 'services/x-read/userCenter';
export default {
    data(){
      return {
        data:{old_pass:'',new_pass:'',new_pass_confirm:''},
        result:'',
      }
    },
    methods: {
      send() {
         if(this.check()){
            servers.resetPwd(this.data).then(res=>{
               if(res.data.status){
                 sessionStorage.userInfo = null
               }
            })

         }
      },
      check(){
         let oldPwd = this.$refs.oldPwd;
         let newPwd = this.$refs.newPwd;

         if(oldPwd.iserror || oldPwd.isempty){
             this.result = `旧密码只能为中文数字字母且大于三位数`;
             return false;
         }else if(newPwd.iserror || newPwd.isempty){
            this.result = `新密码只能为中文数字字母且大于三位数`;
             return false;
         }else if(this.data.new_pass != this.data.new_pass_confirm){
            this.result = '两次输入的新密码有误';

             return false;
         }else{
           this.result='';
           return true;
         }

      }
    }
}
</script>

<template lang="pug">
div
  Head(name="账号安全" hide="true")
  .box
    yd-cell-group
      yd-cell-item
        yd-input(slot="right" ref='oldPwd' regex='^[\u4E00-\u9FA5 0-9 A-Z a-z]{4,}$'  v-model="data.old_pass"  placeholder="请输入旧密码")
      yd-cell-item
        yd-input(slot="right" ref='newPwd' regex='^[\u4E00-\u9FA5 0-9 A-Z a-z]{4,}$'  v-model="data.new_pass" placeholder="请输入新密码" type='password')
      yd-cell-item
        yd-input(slot="right" ref='verifyPwd' regex='^[\u4E00-\u9FA5 0-9 A-Z a-z]{4,}$' v-model="data.new_pass_confirm" placeholder="请再次输入新密码" type='password')
      p(slot="bottom" style="color:#F00;padding: 0 .3rem; line-height:0.8rem" v-html="result")
    yd-button(size="large" type="hollow" style='border-color:#eee;position:fixed;bottom:0' color='#3cb4ff' @click.native='send') 确认
</template>

<style lang="stylus" scoped>
   .navbar
     margin-bottom 0.2rem
   .tx
      width 0.6rem
      border 1px solid #e8e8e8
      border-radius 5rem
   .goBack
       width 0.35rem
       margin-left 0.1rem
</style>
