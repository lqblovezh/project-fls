<script>
import { getAuthList, detail, saveAuth } from 'services/system/press'
export default {
  props: ['isVis', 'detail', 'id'],
  data() {
    return {
      isOpen: false,
      formData: null,
    }
  },
  mounted() {
    this.isOpen = this.isVis
    getAuthList().then(res => {
      detail({ id: this.id }).then(arr => {
        let auth = []
        arr.data.app_accesses.forEach(e => {
          auth.push(e.access_identifier)
        })
        for (let n in res.data) {
          for (let i in res.data[n]) {
            res.data[n][i].checked = auth.includes(res.data[n][i]['identifier'])
          }
        }
        this.formData = res.data
        log(this.formData, 777)
      })
    })
  },
  methods: {
    handleClose() {
      this.$emit('authClose', true)
    },
    selectAll(vo, el) {
      let isCheckedAll = el.target.checked
      vo.forEach(e => {
        e.checked = isCheckedAll
      })
    },
    save() {
      let arr = []
      console.log(1, this.formData)
      for (let i in this.formData) {
        for (let n in this.formData[i]) {
          if (this.formData[i][n]['checked']) {
            arr.push(this.formData[i][n]['identifier'])
          }
        }
      }
      console.log(2, this.formData)
      saveAuth({
        id: this.id,
        app_accesses: JSON.stringify(arr),
      }).then(
        res => {
          this.$emit('authClose', true)
          // this.$nextTick(function () {
          //   this.$loadingClose()
          // })
          this.$message.success('保存成功')
        },
        err => {
          // this.$nextTick(function () {
          //   this.$loadingClose()
          // })
          this.$message.error(err.payload.message)
        }
      )
    },
  },
  watch: {
    isVis() {
      this.isOpen = this.isVis
    },
  },
}
</script>

<template lang="pug">
  el-dialog(:visible.sync="isOpen" :before-close="handleClose" :lock-scroll="false" width="1200px")
    el-tabs.tabs(value="common权限" type="border-card")
      el-tab-pane(:label="key+'权限'" :name="key+'权限'" v-for="(vo,key) in formData" :key="key")
        .selectAll 
          input(type="checkbox" @click="selectAll(vo,$event)")
          span 全选
        .item(v-for="(item,key) in vo") 
          //- input(type="checkbox" :checked="item.checked")
          input(type="checkbox" v-model="item.checked")
          span {{item.name}}
    div(slot="footer" class="dialog-footer")
      el-button(type="info" @click="handleClose" ) 取消
      el-button(type="primary" @click="save" ) 确定
</template>
<style lang="stylus" scoped>
.tabs
  margin-top 20px
.selectAll
  line-height 30px
.item
  width 24.25%
  float left
  text-indent 10px
  line-height 50px
  background #eee
  border-radius 5px
  border 1px solid #e8e8e8
  margin 3px
</style>
