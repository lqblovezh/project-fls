<script>
import { DatetimePicker } from 'mint-ui'
export default {
  components: { DatetimePicker },
  data() {
    return {
      type: 'date',
      pickerTime: '',
    }
  },
  methods: {
    open(resolve, reject) {
      this.resolve = resolve
      this.reject = reject
      this.$refs.picker.open()
    },
    confirm(date) {
      this.resolve(date)
    },
  },
}
</script>


<template lang="pug">
div
  DatetimePicker(
      ref="picker"
      :type="type"
      :endDate="new Date()"
      v-model="pickerTime"
      @confirm="confirm"
    )
</template>


<style lang="stylus" scoped>
</style>
