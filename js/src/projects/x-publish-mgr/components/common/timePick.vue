<script>

export default {
  props:['inputsName','placeholder'],
  data() {
    return {
      timePick : null ,
      timePick2 : null ,
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
    changeStart(){

    },
    changeStart(){

    }
  },
};
</script>

<template lang="pug">
.li
  el-date-picker(
    type="datetimerange"
    align="right"
    :unlink-panels="true"
    :name="inputsName"
    v-model="timePick"
    range-separator="-"
    :start-placeholder="start"
    :end-placeholder="end"
    :default-time="['00:00:00', '23:59:59']"
    )
  //- el-date-picker(
  //-   default-time="00:00:00"
  //-   v-model="timePick",
  //-   type="datetime",
  //-   format="yyyy-MM-dd HH:mm:ss"
  //-   placeholder="起始时间",
  //-   :name="inputsName[0]"
  //- )
  //- el-date-picker(
  //-   default-time="23:59:59"
  //-   v-model="timePick2",
  //-   type="datetime",
  //-   placeholder="结束时间",
  //-   format="yyyy-MM-dd HH:mm:ss"
  //-   :name="inputsName[1]"
  //- )

</template>

<style lang="stylus">
// .li
//   .el-date-editor
//       width 180px
//   .el-input__inner
//       width 172px
//       margin 0
</style>


