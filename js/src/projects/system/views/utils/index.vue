<script>
import * as services from 'services/system/utils'
export default {
  data() {
    return {
      jsonText: '',
    }
  },
  created() {
    services.utils().then(res => {
      this.jsonText = JSON.stringify(res.data)
    })
  },
}
</script>


<template lang="pug">
textarea.div {{jsonText}}
</template>

<style lang="stylus" scoped>
textarea.div
  margin 30px
  padding 10px
  width calc(100% - 60px)
  height 300px
</style>