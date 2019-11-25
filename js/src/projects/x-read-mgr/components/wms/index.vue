<script>
import Top from 'projects/x-publish-mgr/components/common/Top'
import Menu from '@/components/common/Menu'
import XData from '@/components/common/XData'
import { mapMutations } from 'vuex'

export default {
  components:{Top,Menu,XData},
  name: 'HelloWorld',
  data () {
    return {
      isCollapse: false,
    }
  },
  computed:{
    isXDataVisible(){
      return this.$store.state.xDataVisible
    }
  },
}
</script>

<template lang="pug">
.div
  Top(currentPlant='X-READ')
  XData(v-if="isXDataVisible")
  div(v-else)
    Menu
    .content#content
      router-view
</template>

<style lang="stylus" scoped>
.content
  margin 50px 0px 0px 200px
  transition  all  0.2s ease
  &.mini
    margin-left 51px
    transition  all  0.2s ease
</style>
