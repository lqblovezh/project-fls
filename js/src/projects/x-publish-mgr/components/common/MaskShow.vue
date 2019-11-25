<script>

export default {
  created(){
    document.querySelector('html').classList.add('noscorll')
  },
  data() {
    return {
      inputs:[],
    };
  },
  methods:{
  },
  destroyed(){
    document.querySelector('html').classList.remove('noscorll')

  }
};
</script>

<template lang="pug">
.mask
  slot

</template>

<style lang="stylus" scoped >
.mask
  z-index 3000
  position: fixed;
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0,0,0,0.5)
</style>


