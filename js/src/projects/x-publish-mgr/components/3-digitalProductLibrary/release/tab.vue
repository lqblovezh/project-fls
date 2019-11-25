<script>
import formSerialize from 'form-serialize'
import * as services from "services/x-publish/mixProduct"

export default {
  props:['dataType', 'isShow', 'detailData', 'defaultList','isLabelHide','onlyShow'],
  data() {
    return {
      services,
      type: '1',
      list: [],
    };
  },
  created () {
    if(this.defaultList) {
      this.list = this.defaultList
    }else{
      this.getList(this.dataType)
    }
  },
  computed:{
  },
  methods: {
    handleClick() {
    },
    getList(type) {
      if(!(this.detailData&&this.detailData.id)) return
      this.services.getList({type,id:this.detailData.id,resource_type:this.type}).then(res => {
        this.list = res.data
      })
    },
    handleClick(tab) {
      log(tab)
    }
  },
  watch: {
    defaultList() {
      this.list = this.defaultList
    },
    type(type) {
      this.getList(this.dataType)
    }
  }
};
</script>

<template lang="pug">
  .tableWrap(v-if="list")
    el-radio-group(v-model="type" v-if='isShow&&!onlyShow' size="small" style="margin-bottom: 20px;")
      el-radio-button(label="1") 图集
      el-radio-button(label="2") 视频集
      el-radio-button(label="3") 音频集
    table.table
      thead
        tr
          th 名称
          th 类型
          th(v-if="!isLabelHide") 标签
          th 创建时间
          th(width=100) 操作
      tbody()
        tr(v-if="!list.length")
          td.colspan(:colspan="!isLabelHide?5:4") 暂无数据
        tr(v-for="(item,index) in list")
          th
            .th-name {{item.name}}
          th
            .th-name {{item.type_name}}
          th(v-if="!isLabelHide")
            .th-name {{item.tag}}
          th
            .th-name {{item.create_time}}
          th
            .icon.icon-detail(title="详情" @click="$emit('detail',item)")
            .icon.icon-delete(title="删除" @click="$emit('del',item)" v-if="!onlyShow")
</template>


<style lang="stylus" scoped>
  .tableWrap
    padding 0
    margin-bottom 20px
    width 100%
  body .table th,
  body .table td
    padding 0
  .colspan
    height 60px
    text-align center
    color #6f7180
</style>
