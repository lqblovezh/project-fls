<script>
import * as services from 'services/x-read/distribution'
export default {
  data() {
    return {
      infoData:{service_money:'',reward_money:'',distribute_rule:'',reward_type:'0',service_type:'1',pay_type:[true,false]},
    }
  },
  methods:{
     info(){
        services.info().then(res=>{ 
           this.infoData.distribute_rule=res.data.distribute_rule;
           this.infoData.service_money=res.data.service_money;
           this.infoData.reward_money=res.data.reward_money;
           this.infoData.reward_type = String(res.data.reward_type);
           this.infoData.service_type = String(res.data.service_type);
           this.infoData.pay_type = res.data.pay_type.map((val)=>{
              if(val === 'false'){
                 return false;
              }else if(val ==='true'){
                 return true;
              }
           })
        })
     },
     send(){
        services.save(this.infoData).then(_=>{
            this.info();
            this.$message.success('修改成功');
        })
     }
  },
  created(){
     this.info();
  }
}
</script>


<template lang="pug">
  .box 
    .part 
      .title 分销说明
      el-form.content(ref="form" )
        el-form-item
          el-input.area(type="textarea" rows='8' v-model='infoData.distribute_rule')
        el-form-item
          el-button(@click='send') 提交
    .part
      .title 奖励及提现设置
      .content
        div.other 
          .lside 分销奖励
          .rside
            el-radio.radio(v-model='infoData.reward_type' label='0') 按比例
             el-input.w(v-model='infoData.reward_money')
               <template slot="append">%</template>
            br
            el-radio.radio(v-model='infoData.reward_type' label='1') 按固定
             el-input.w(v-model='infoData.reward_money')
        div.other
          .lside 提现渠道：
          .rside
            el-checkbox(v-model='infoData.pay_type[0]') 银行转账
            el-checkbox(v-model='infoData.pay_type[1]') 支付宝
        div.other
          .lside 提现手续费：
          .rside
            el-radio.radio(v-model="infoData.service_type" label='0') 按比例
              el-input.w(v-model='infoData.service_money')
                template(slot="append") %
            br
            el-radio.radio(v-model='infoData.service_type' label='1') 按固定
             el-input.w(v-model='infoData.service_money')
          
             
          

</template>


<style lang="stylus" scoped>
   .box
     .part 
       color #333
       font-size 14px
       .title
          background rgba(242, 242, 242, 1)
          padding 30px 35px
       .content
          padding 0 35px
          .area
            max-width 500px
            margin 20px 0
          .other
             padding 20px 0
             overflow hidden
            .lside
              float left 
              padding 15px 0px 0 30px 
              width 100px
            .rside
              float left
              .radio 
                line-height 45px
              .w
                width 200px
                margin-left 20px
     
</style>
