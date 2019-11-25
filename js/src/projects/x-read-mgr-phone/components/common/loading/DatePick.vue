<script>

import { DatetimePicker } from 'mint-ui' // mint-ui 按需引入

export default {
  components:{DatetimePicker},
  data(){
    return {
      type:"date",
      startDate:null,
      endDate:null,
      pickerTime:new Date()
    }
  },
  computed:{
    calcTime(){
      let start , end ;
      start = this.startDate ? this.startDate : new Date('1990-1-1') ; 
      end = this.endDate ? this.endDate : new Date() ; 
      return {
        start ,
        end 
      }
    }
  },
  methods:{
    timeHandleConfirm(val){
      this.res(val)
    },
    open(){
      this.$refs.picker.open()
      return new Promise((res ,rej) => {
        this.res = res 
        this.rej = rej
      })
    },
  }
  
}
</script>


<template lang="pug">
  div 
    DatetimePicker( 
      ref="picker"
      :type="type" 
      :startDate="calcTime.start"
      :endDate="calcTime.end"
      @confirm="timeHandleConfirm"
      v-model="pickerTime")
</template>


<style lang="stylus" scoped>

</style>
