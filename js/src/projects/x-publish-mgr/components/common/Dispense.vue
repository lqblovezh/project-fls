<script>
import { getIconStyle } from '@/util/mixins'
import { getDispense, dispense } from 'services/x-publish/dispense'

export default {
  mixins: [getIconStyle],
  props: {
    publishDialog: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      default: {},
    },
    is_release: Boolean,
  },
  data() {
    return {
      list: null,//列表信息
      coverDialog: false,
      choiceDialog: false,
      currentItem: null,
      currentVersion: null,
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      getDispense({
        entity_type: this.item.type_number||this.item.type,
        id: this.item.id,
      }).then(res => {
        this.list = res.data
      }).catch(({ payload }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    colse() {
      this.$emit('update:publishDialog', false)
    },
    save() {
      let id = []
      this.$refs.dispense.querySelectorAll("input[type=checkbox]:checked").forEach(element => {
        id.push(element.value)
      })
      if (!id.length) {
        this.$message.error('请选择你要发布的平台')
        return
      }
      this.$emit('dispenseSave', id)
    },
    pushTime(data) {
      return data ? `最近${data}发布过` : '最近暂无分发'
    },
    push(item) {
      this.currentItem = item
      if (this.is_release && item.release_msg.length) {
        this.$confirm("信息不全是否分发?").then(res => {
          if(item.version){
            this.coverDialog = true
          }else{
            this.dispense()
          }
        },({payload}) => {
          log(payload.message)
        }).catch(res => {
          log('cancel')
        })
        return
      }
      if(item.version&&item.version.length){
        this.coverDialog = true
      }else{
        this.dispense()
      }
    },
    dispense(is_cover,version_id) {
      dispense({
        platform_id: this.currentItem.id,
        audits_id: this.item.audits_id,
        is_cover,
        version_id,
      }).then(res => {
        this.$message.success('分发提交成功,请稍后查看结果!')
        this.$emit('dispenseOk')
      }).catch(({ payload }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    getdefect(item) {
      return '缺失字段: ' + item.release_msg.join('/')
    },
    getBtnName(item) {
      if (this.is_release && !item.is_release) {
        return '缺少关键信息不能分发'
      }
      return item.release_msg && item.release_msg.length ? '确认分发' : '分发'
    },
    coverDispense() {
      if(!this.currentVersion){
        return this.$message.warning('请选择你要覆盖的版本号!')
      }
      const version_id = this.currentItem.version.find(item => item.xread_book_id === this.currentVersion).version_id
      this.dispense(this.currentVersion,version_id)
    }
  }
}
</script>

<template lang="pug">
  div
    el-dialog(
      :center="false"
      :visible="coverDialog"
      top="50px"
      width="500px"
      :show-close="false"
      title='x-read系统中已有该产品，选择你的操作'
      )
      .coverContent
        el-button( @click="choiceDialog=true" type="primary" ) 覆盖原有产品
        el-button( @click="dispense()" type="primary" ) 创建新的产品版本
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="coverDialog=false" type="info" ) 取消
    el-dialog(
      :center="false"
      :visible="choiceDialog"
      v-if="choiceDialog"
      top="50px"
      width="500px"
      :show-close="false"
      title='选择版本号'
      )
      .coverContent
        el-radio-group(v-model="currentVersion")
          el-radio(:label="item.xread_book_id" :key="item.xread_book_id" v-for="item in currentItem.version") {{item.version_id}}
      div(slot="footer" class="dialog-footer")
        el-button( @click="coverDispense" type="primary" ) 确定
        el-button( @click="choiceDialog=false" type="info" ) 取消

    el-dialog(
      :center="false"
      :visible="publishDialog"
      top="50px"
      width="1000px"
      :show-close="false"
      )
      .header(slot="title")
        div(class="el-icon-close" @click="colse")
        el-tabs(value="ff")
          el-tab-pane(label="分发" name="ff")
      ul.content.modular(ref="dispense")
        li(v-for='item in list')
          .icon
            div(:class="getStyle(item.type)") 
            span(v-text="item.name") 
          ul.defect
            li.pass(v-if="item.release_msg&&!item.release_msg.length") 可正常分发
            li(v-if="item.release_msg&&item.release_msg.length" v-text="getdefect(item)")
          el-button( 
            @click="(!is_release||item.is_release) && push(item)" 
            :type="!is_release||item.is_release?'primary':'info'"  
            size="mini" 
            plain v-text="getBtnName(item)")
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="colse" type="info" ) 取消

</template>


<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.btns
  text-align right
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
body .coverContent
  text-align center
  label
    display block
    margin 0
    padding 10px 0
  button
    display block
    margin 20px auto
.content
  >li
    margin-right 60px
    margin-bottom 20px
    display inline-block
    text-align center
    width 187px
    &:nth-child(4n)
      margin-right 0
    .icon
      min-width 178px
      height 56px
      line-height 56px
      border-radius 5px
      border 1px solid #e1e1e1
      position relative
      display block
      margin-right 0
      div
        width 33px
        height 33px
        display inline-block
        margin-right 10px
        position relative
        top 50%
        margin-top -18px
      span
        max-width 130px
        display inline-block
        no-wrap()
    .text
      font-size 12px
      margin 10px 0
    label
      cursor pointer
      display inline-block
      position relative
      .right
        width 30px
        height 30px
        font-size 30px
        position absolute
        bottom 0
        top 0
        z-index 1
        right 0
        display none
      input
        opacity 0
        width 30px
        height 30px
        position absolute
        bottom 0
        top 0
        z-index 1
        right 0
        &:checked+i
          display block
          color #fe4902 !important
  .defect
    margin 10px 0
    li
      background #ffefef
      border 1px solid #ffbbba
      color #ff0a0a
      line-height 25px
      &.pass
        border none
        background none
        color #44c3aa
</style>


