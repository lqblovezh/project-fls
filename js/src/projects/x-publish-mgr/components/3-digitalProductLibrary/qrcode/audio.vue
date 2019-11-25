<script>
import { main } from '@/util/mixins'
import {qrcodeMixins} from './qrcodeMixins'

export default {
  mixins: [main, qrcodeMixins],
  data() {
    return {
      product_type: 'audios',
    }
  },
  methods: {
  },
}
</script>

<template lang="pug">
.index.clearfix
	include ./pug/tpl.pug
</template>


<style lang="stylus" scoped >
.icon-menu-publish
  color #44c3aa
</style>
