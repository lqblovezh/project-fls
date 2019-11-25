<script>
export default {
  props:['inputsName','placeholder'],
  data() {
    return {
      timePick : null ,
      start:'开始日期',
      end:'结束日期',
    };
  },
  created () {
    if(this.placeholder){
      this.start = this.placeholder[0]||this.start
      this.end = this.placeholder[1]||this.end
    }
  },
  methods:{
  },
};
</script>

<template lang="pug">
.li
  el-date-picker.picker(
    type="daterange"
    align="right"
    :unlink-panels="true"
    :name="inputsName"
    v-model="timePick"
    range-separator="-"
    :start-placeholder="start"
    :end-placeholder="end"
    @change="$emit('getTime',timePick)"
    :default-time="['00:00:00', '23:59:59']"
    )

</template>

<style lang="stylus">
.picker 
  margin-right 8px
  width 350px
</style>



