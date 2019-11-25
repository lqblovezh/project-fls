<script>

export default {
  data() {
    return {
    };
  },
  created () {
    setTimeout(()=>{
      log(window.parent)
      this.$message.success('失败!')
      window.parent.testID.accreditDialog = false
    },2000)
  },
  methods: {
    
  }
};
</script>

<template lang="pug">
.success 授权失败
  
</template>


<style lang="stylus" scoped>
@import "~common/stylus/mixin"

.success
  text-align center
</style>


