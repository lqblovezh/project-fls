<script>
import Info from './info'
import Update from './update'
import Keyword from './keyword'
import Finish from '../book/finish'
import Store from 'store2'
import { bookAdd, dataFast } from 'services/x-publish/book'
import { close } from 'fs'

export default {
  data() {
    return {
      steps: 1,
      typeName: '5分钟制作你的数据库',
    }
  },
  components: {
    Info,
    Update,
    Keyword,
    Finish,
  },
  mounted() {},
  methods: {
    async nextstep(type) {
      if (type) {
        switch (this.steps) {
          case 1:
            if (!this.$refs.Info.valiAll())
              return this.$message.warning('缺少必要信息') //log("验证失败")
            this.steps = 2
            // this.$nextTick(() => {
            //   if (!this.$refs.Update.task_id) {

            //   }
            // })
            break
          case 2:
            if (!this.$refs.Update.book_id) {
              return this.$message.warning('请上传文件')
            }
            let loading = this.$loading({
              text: '请稍后...',
              background: 'rgba(0, 0, 0, 0.8)',
            })
            await bookAdd({
              ...this.$refs.Info.detailInfo,
              id: this.$refs.Update.list.map(item => item.book_id),
              task_id: this.$refs.Update.task_id,
            }).then(
              res => {
                this.steps = 3
                loading.close()
              },
              err => {
                loading.close()
                this.$message.error(err.message)
              }
            )
            break
          case 3:
            await dataFast({
              task_id: this.$refs.Update.task_id,
            }).then(
              res => {
                Store.session(this.$refs.Update.makeType + '_task_id', '')
                this.$refs.Finish.getInfo(this.$refs.Update.task_id)
                this.steps = 4
                this.typeName = '数据库制作成功'
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          default:
            break
        }
      } else {
        this.steps -= 1
      }
    },
    taskId() {
      return this.$refs.Update ? this.$refs.Update.task_id : ''
    },
  },
  computed: {
    // taskId() {
    //   return this.$refs.Update ? this.$refs.Update.task_id : ''
    // },
  },
}
</script>

<template lang="pug">
.container.makeDetail
  .content
    p.typeName {{typeName}}
    .box
      Info(v-show="steps==1" ref="Info")
      Update(v-show="steps==2" ref="Update")
      Keyword(v-show="steps==3" ref="Keyword"  :taskId="taskId")
      Finish(v-show="steps==4" ref="Finish")
    el-steps(:space="300" :active="steps" align-center process-status="wait")
      el-step(title="数据库基本信息")
      el-step(title="数据上传")
      el-step(title="关键词聚类")
      el-step(title="完成预览")
    .btns
      el-button(type="primary" v-if='steps!=1&&steps!=4' @click='nextstep(false)') 上一步
      el-button(type="primary" @click='nextstep(true)' v-if="steps!=4") {{steps==4?'完成':'下一步'}}
</template>

<style lang="stylus" scoped></style> 

