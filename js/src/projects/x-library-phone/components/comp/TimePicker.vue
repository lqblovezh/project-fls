<script>
export default {
  data () {
    return {
      startTime: {
        default: new Date(),
        txt: '选择日期',
        start: new Date('1970'),
        end: new Date()
      },
      endTime: {
        default: new Date(),
        txt: '选择日期',
        start: new Date('1970'),
        end: new Date
      },
    }
  },
  methods: {
    confirmTime (type) {
      if (type === 'start') {
        this.startTime.txt = this.startTime.default
        this.endTime.start = this.startTime.default
      } else {
        this.endTime.txt = this.endTime.default
        this.startTime.end = this.endTime.default
      }
    }
  },
  filters: {
    formatDate(date) {
      return typeof date === 'object' ? `${date.getFullYear()}年${date.getMonth()+1}月${date.getDate()}日` : date
    }
  }
}
</script>
<template lang="pug">
.timepicker
  .flex
    .time.tc.f12(@click="$refs.startTimePicker.open()") {{startTime.txt | formatDate}}
    span 至
    .time.tc.f12(@click="$refs.endTimePicker.open()") {{ endTime.txt | formatDate }}
  mt-datetime-picker(ref="startTimePicker" type="date" v-model="startTime.default" :startDate="startTime.start" :endDate="startTime.end" @confirm="confirmTime('start')")
  mt-datetime-picker(ref="endTimePicker" type="date" v-model="endTime.default" :startDate="endTime.start" :endDate="endTime.end" @confirm="confirmTime('end')")
</template>
<style lang="stylus">
.timepicker
  padding-left 20px
  >.flex
    margin 15px 0 20px
    .time
      flex 1
      height 30px
      line-height 30px
      border-radius 3px
      color #000
      background-color #FFF
    >span
      margin 0 5px
</style>