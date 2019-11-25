<script>
import * as services from "services/x-publish/digitalbooks"
import Info from './info'
import Knowledge from '../theme/knowledge'
import Structure from './structure'

export default {
  components: {Info, Structure, Knowledge},
  props:['type', 'detailData', 'detailDialog','readOnly','defaultData'],
  created(){
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    handleClick(tab,event) {
      this.activeName = tab.name
    },
  },
};
</script>

<template lang="pug">
.div
  el-tabs( :value="type")
    //- 产品信息
    el-tab-pane( label="产品信息" name="info")
      Info(:detailData='detailData' @saveok="(res) => $emit('saveok',res)" :readOnly="readOnly" :defaultData="defaultData")
    //- 产品结构
    el-tab-pane( label="产品结构" name="structure")
      Structure(:detailData='detailData' :readOnly="readOnly" :defaultData="defaultData")
    //- 知识点
    el-tab-pane( label="知识点" name="Knowledge")
      Knowledge(:detailData="detailData" :readOnly="readOnly" :defaultData="defaultData" @saveok="$emit('saveok')")
</template>


<style lang="stylus" scoped>
.btns
  text-align right
</style>


