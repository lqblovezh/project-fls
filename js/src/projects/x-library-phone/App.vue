
<script>
import moduleName from 'vuex'
import { mapState, mapMutations } from 'vuex'
import service from 'services/x-teach/front'

export default {
  mounted() {
    this.getBaseConfig()
  },
  methods: {
    getBaseConfig() {
      service.home
        .getConfig({
          isNoTitle: this.$route.meta && this.$route.meta.isFastLibrary,
        })
        .then(res => {
          this.SET_CONFIG(res.data)
        })
    },
    ...mapMutations(['SET_CONFIG']),
  },
}
</script>
<template lang="pug">
#app
  router-view
</template>
