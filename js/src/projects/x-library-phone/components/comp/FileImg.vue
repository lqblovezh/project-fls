<script>
export default {
  props: {
    files: {},
    type: {
      default: 1,
    },
  },
  files() {
    return {
      // files: [],
    }
  },

  methods: {
    fileChangeHandler(e) {
      let files = e.target.files
      this.files.push(...files)
    },
    cleanImg() {
      this.$emit('cleanImg')
      // this.files = []
    },
    open() {
      this.$refs.fileInp.click()
    },
  },
}
</script>


<template lang="pug">
  .comp-circle-file-img
    .imgs.flex(v-if="type === 1")
      img(
        v-for="item,index in files"
        :key="index"
        v-srcFile="item"
      )
    .imgs.flex(v-else)
      img(
        v-for="item,index in files"
        :key="index"
        :src="item"
      )
    //- .ib.del.fr(v-if="files.length"  @click="cleanImg" )
      .icon.icon-del( )
      span.f12.c_price 清空图片
    input.hide( 
      v-if="type === 1"
      type="file"   
      @change="fileChangeHandler" 
      accept="image/*" 
      mutiple="mutiple"
      ref="fileInp")
</template>
<style lang="stylus">
.comp-circle-file-img
  >.imgs
    display flex
    overflow-x auto
    >img
      width auto
      height 100px
      margin-right 10px
</style>
