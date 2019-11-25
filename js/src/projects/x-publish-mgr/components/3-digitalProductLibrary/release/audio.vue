<script>
import * as services from "services/x-publish/mixProduct"

export default {
  props: {
    detailData: Object,
    media:{
      type: Number,
      default: 1,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
    defaultData: Array,
  },
  data(){
    return {
      audioList: [],
    }
  },
  created() {
    if(this.detailData&&this.detailData.id){
      this.getAudio()
    }
    if(this.defaultData){
      this.audioList = this.defaultData
    }
  },
  computed: {
  },
  methods: {
    getAudio() { // 获取听读组信息
      services.groupList({id:this.detailData.id,type:this.media}).then(res => {
        this.audioList = res.data
      })
    },
    del(data,node) {
      // log(data,node)
      let id = null
      let product_id = null
      if(typeof(data.children) == 'object') {
        id = data.id
      }else{
        id = node.parent.data.id
        product_id = data.id
      }
      log(id)
      services.audioDel({
        id,
        resource_id: product_id,
        product_id: this.detailData.id
      }).then(res => {
        this.getAudio()
      })
    }
  }
}
</script>

<template lang="pug">
  .div.box
    table.table
      thead
        tr
          th 组名称
          th(width=100) 操作
    el-tree(
      :data="audioList"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    )
      span(class="custom-tree-node" slot-scope="{ node, data }")
        span {{ data.name }}
        span.options(style="float:right")
          .icon.icon-detail(@click="$emit('detail',data, data.children)" title="详情")
          // .icon.icon-delete(@click="$emit('del',data, data.children)" title="删除")
          .icon.icon-delete(@click="del(data,node)" title="删除" v-if="!readOnly")

</template>


<style lang="stylus" scoped>

.box
  margin-bottom 20px
.options
    float right 
    width 110px
</style>


