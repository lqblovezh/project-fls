<script>
export default {
  props: {
    type: {
      type: String,
      default: 'primary',
    },
    plain: {
      type: Boolean,
      default: true,
    },
    size: {
      type: String,
      default: 'small',
    },
  },
  created() {
  },
  data() {
    return {
      data: {},
    }
  },
}
</script>


<template lang="pug">
  .li-btn 
    el-button( @click="$emit('click')" :type="type" :plain="plain" :size="size")  
      slot 
</template>


<style lang="stylus">
.li-btn
  display inline-block
</style>
