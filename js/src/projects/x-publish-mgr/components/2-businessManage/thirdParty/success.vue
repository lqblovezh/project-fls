<script>

export default {
  data() {
    return {
    };
  },
  created () {
    setTimeout(()=>{
      this.$message.success('成功!')
      window.parent.testID.accreditDialog = false
      window.parent.testID.getList()
    },2000)
  },
  methods: {
    
  }
};
</script>

<template lang="pug">
.success 授权成功
  
</template>


<style lang="stylus" scoped>
@import "~common/stylus/mixin"

.success
  text-align center
</style>


