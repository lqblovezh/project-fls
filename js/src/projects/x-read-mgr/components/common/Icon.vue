<script>

export default {
  props:['type','click'],
  data() {
    return {
    };
  },
  methods:{
    callMethod(param) {
      this.$emit('click')
    }
  },
};
</script>

<template lang="pug">
  span
    i.icon(:class="type" @click='callMethod')
</template>

<style lang="stylus">

</style>


