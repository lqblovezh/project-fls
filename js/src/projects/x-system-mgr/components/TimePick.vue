<script>

export default {
  props:['inputsName'],
  data() {
    return {
      timePick:''
    };
  },
};
</script>

<template lang="pug">
  el-date-picker.picker(
    type="datetimerange"
    align="right"
    :unlink-panels="true"
    :name="inputsName"
    v-model="timePick"
    value-format="yyyy-MM-dd HH:mm:ss "
    dateType="time"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="$emit('getTime',timePick)"
    :default-time="['00:00:00', '23:59:59']"
    )
</template>

<style lang="stylus" scoped>
.picker 
  margin-right 8px
  margin-bottom 8px
</style>


