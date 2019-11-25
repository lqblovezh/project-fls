<script>
import { DatetimePicker } from 'mint-ui'
import dayjs from 'dayjs'
export default {
  components: { DatetimePicker },
  data() {
    return {
      type: 'date',
      pickerTime: new Date(),
      startDate: new Date('1980-01-01'),
      endDate: new Date(),
    }
  },
  methods: {
    open({ resolve, reject, type, limitTime }) {
      this.pickType = type
      if (type === 'end' && limitTime) {
        this.startDate = new Date(limitTime)
        this.endDate = new Date()
      } else if (type === 'start' && limitTime) {
        this.startDate = new Date('1980-01-01')
        this.endDate = new Date(limitTime)
      }
      this.resolve = resolve
      this.reject = reject
      this.$refs.picker.open()
    },
    confirm(date) {
      let timeStr = dayjs(date).format('YYYY-MM-DD')
      let time = ''
      // if (this.pickType === 'start') {
      //   time = ' 00:00:00'
      // } else {
      //   time = ' 23:59:59'
      // }
      this.resolve(timeStr + time)
    },
  },
}
</script>


<template lang="pug">
div
  DatetimePicker(
      ref="picker"
      :type="type"
      :startDate="startDate"
      :endDate="endDate"
      v-model="pickerTime"
      @confirm="confirm"
    )
</template>

<style lang="stylus" scoped>
</style>
