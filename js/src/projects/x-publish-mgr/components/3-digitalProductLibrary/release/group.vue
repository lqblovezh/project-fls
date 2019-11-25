<script>
import * as services from "services/x-publish/mixProduct"
import Tab from './tab'

export default {
  components: { Tab },
  props: {
    groupDialog: {
      type: Boolean,
      default: false,
    },
    detailData: Object,
    item: {
      type: Object,
      default: {},
    },
    isMedia:{
      type: Number,
      default: 1,
    },
    onlyShow: Boolean,
    defaultData: Object,
  },
  data(){
    return {
      information: {},//列表信息
      list: [],
      addMediaType: "4", 
    }
  },
  created() {
    if(Object.entries(this.item).length&&!this.defaultData){
      // this.getInfo()
    }
    this.information = this.item
    this.list = this.item.children||[]
    if(this.isMedia==2){
      this.addMediaType = "5"
    }
  },
  computed: {
    setTitle() {
      if(!Object.entries(this.item).length){
        return '新增组'
      }
      return this.item.name||'修改组'
    }
  },
  methods: {
    getInfo() {
      services.groupDetail({
        id: this.item.id,
        type:this.isMedia
      }).then(res => {
        this.information = res.data
        this.list = res.data.constitute
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    update(data) {
      this.list = data
    },
    colse() {
      this.$emit('update:groupDialog',false)
    },
    save() {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      services.groupSave({
        id: this.item?this.item.id:'',
        ...this.information,
        product_id: this.detailData.id,
        type: this.isMedia,
        constitute: this.list,
      }).then(res => {
        log(res)
        this.$message.success('保存成功')
        this.$emit('save')
        this.colse()
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    del(cur) {
      let index = this.list.findIndex(item => item.id === cur.id)
      if( index >-1 ) {
        this.list.splice(index,1)
      }
    }
  }
}
</script>

<template lang="pug">
  div
    el-dialog.restBody2(
      :center="false"
      :visible="groupDialog"
      top="50px"
      width="1200px"
      :show-close="false"
      append-to-body
      )
      .header(slot="title")
        <i class="el-icon-close" @click="colse"></i>
        el-tabs(value="ff")
          el-tab-pane(:label="setTitle" name="ff")
      VaForm(ref="detailForm")
        form.detailForm.rowWrap
          .group.line
            .label 基本信息(必填)
          .group
            .label 组名称:
            input.form-control( v-va="{ type:'required'}" v-model="information.group_name" type="text" :disabled="onlyShow")
          .group
            .label 定价:
            input.form-control( v-va="{ type:'required'}" v-model="information.price" type="text" :disabled="onlyShow")
            span  元
          .group
            .label 最低定价:
            input.form-control( v-va="{ type:'required'}" v-model="information.min_price" type="text" :disabled="onlyShow")
            span  元
          .group
            .label 主讲人:
            input.form-control( v-va="{ type:'required'}" v-model="information.speaker" type="text" :disabled="onlyShow")
          .group.line
            .label 其他信息
          .group
            .label 试听地址:
            input.form-control( v-model="information.src" type="url" :disabled="onlyShow")
            // el-button.margin(@click="" type="primary" size="small") 资源库
          .group.line
            .label(v-text="isMedia=='2'?'关联视频':'关联音频'")
          .group
            Tab(dataType="audio" :onlyShow="onlyShow" :defaultList="list" :detailData="item" @detail="(item) => $emit('detail',item)" @del="(item) => del(item)" ref="video")
            el-button(type="primary" @click="$emit('open',addMediaType)" size="small" v-if="!onlyShow") 新增
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="colse" type="info" ) 取消
        el-button( @click="save" type="primary" v-if="!onlyShow") 确定

</template>


<style lang="stylus" scoped>

.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.rowWrap
  .left
    width 60%
    display inline-block
    box-sizing border-box
  .right
    width 40%
    text-align center
    display inline-block
    img
      max-height 140px
      max-width 100px
      vertical-align bottom
    .name
      text-align center
      margin 10px 0
  .btn
    margin-left 20px
.margin
  margin-left 70px
.form-control
  max-width 300px
.line
  font-size 16px
  border-bottom 1px solid #ddd
  >div
    text-align left
.el-radio
  line-height inherit
</style>
