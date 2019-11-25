<script>
import { Popup } from 'mint-ui'

export default {
  components: {
    Popup,
  },
  props: {
    resource: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      link_url: '',
      popupVisible: false,
      index: 0,
      isPlayAll: false,
    }
  },
  methods: {
    palyClick(item, index) {
      if (item.preview) {
        this.index = index
        this.isPlayAll = false
        this.play(item.preview)
      }
    },
    playAll() {
      this.isPlayAll = true
      this.index = 0
      this.play(this.resource && this.resource[0].preview)
    },
    videoIsEnd() {
      if (this.index < this.resource.length - 1 && this.isPlayAll) {
        this.index += 1
        this.play(this.resource[this.index].preview)
      }
    },
    play(path) {
      this.link_url = path
      this.popupVisible = true
    },
  },
  watch: {
    popupVisible() {
      if (!this.popupVisible) {
        this.link_url = ''
      }
    },
  },
}
</script>


<template lang="pug">
ul.resource
  Popup(
    v-model="popupVisible"
    popup-transition="popup-fade"
  )
    video(
      controls
      controlslist="nodownload"
      autoplay="autoplay"
      preload="auto"
      @ended="videoIsEnd()"
      :src="link_url"
      v-if="link_url"
    )
  li.flex(v-for="item,index in resource" :key="item.name" @click="palyClick(item,index)")
    .index {{index+1}}
    .name.ellipsis-2 {{item.name}}
    .time {{item.节目时长}}
    .icon
      .icon-play
</template>

<style lang="stylus" scoped>
.resource
  >>> .mint-popup
    width 100%
  video
    max-width 100%
    max-height 80vh
  li
    border-bottom 1px solid #eee
    margin-top 0.2rem
    padding-bottom 0.2rem
    &:first-child
      margin-top 0
    .time, .index, .icon
      flex 0 0 1.5rem
      text-align center
      color #676a7b
      justify-content center
      align-items center
      display flex
    .icon
      flex 0 0 1rem
    .index
      flex 0 0 1rem
    .name
      width 100%
</style>
