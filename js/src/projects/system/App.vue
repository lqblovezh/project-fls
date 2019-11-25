
<script>
import Vue from 'vue'
import urljoin from 'url-join'
export default {
  asyncData({ store, route }) {
    return store.dispatch('init', 'xSystem')
  },
  data(){
    return {
      isOpen:false
    }
  },
  computed: {
    title() {
      return this.$store.state.title
    },
  },
}
</script>
<template lang="html">
  <div id="app">
    <router-view ></router-view>
  </div>
</template>
