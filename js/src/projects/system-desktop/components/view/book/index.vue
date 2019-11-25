<script>
import Xswitch from './switch'
import Info from './info'
import Media from './media'
import Knowledge from './knowledge'
import Finish from './finish'
import { modifyBooks, fastAdd, fastPrevew } from 'services/x-publish/book'
import { save } from 'services/x-publish/infoProduct'
import Store from 'store2'

export default {
  data() {
    return {
      steps: 1,
      typeName: '5分钟制作你的第一本多媒体电子书',
    }
  },
  components: {
    Xswitch,
    Info,
    Media,
    Knowledge,
    Finish,
  },
  mounted() {},
  methods: {
    async nextstep(type) {
      if (type) {
        switch (this.steps) {
          case 1:
            if (!this.$refs.Xswitch.book_id) {
              return this.$message.warning('请上传电子书')
            }
            if (
              this.$refs.Xswitch.radio2 == 1 &&
              !this.$refs.Xswitch.valiAll()
            ) {
              return this.$message.warning('缺少必要信息') //log("验证失败")
            }
            await modifyBooks(this.$refs.Xswitch.detailInfo).then(
              res => {
                const { id, ...data } = this.$refs.Xswitch.detailInfo
                this.$refs.Info.detailInfo = this.$refs.Info.xRead = data
                this.steps = 2
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 2:
            if (!this.$refs.Info.valiAll())
              return this.$message.warning('缺少必要信息') //log("验证失败")
            await save({
              ...this.$refs.Info.detailInfo,
              attributes: {
                xRead: {
                  ...this.$refs.Info.xRead,
                },
              },
            }).then(
              res => {
                this.steps = 3
                this.$refs.Info.detailInfo.id = res.data.id
                this.$set(this.$refs.Info.detailInfo, 'id', res.data.id)
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 3:
            // if (!this.$refs.Info.valiAll())
            //   return this.$message.warning('缺少必要信息') //log("验证失败")
            await fastAdd({
              id: this.$refs.Info.detailInfo.id,
              book_id: this.$refs.Xswitch.book_id,
              task_id: this.$refs.Xswitch.task_id,
              audio: this.$refs.Media.audioList,
              video: this.$refs.Media.videoList,
            }).then(
              res => {
                this.steps = 4
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 4:
            await fastPrevew({
              id: this.$refs.Info.detailInfo.id,
              task_id: this.$refs.Xswitch.task_id,
            }).then(
              res => {
                Store.session(this.$refs.Xswitch.makeType + '_task_id', '')
                this.$refs.Finish.getInfo(this.$refs.Xswitch.task_id)
                this.steps = 5
                this.typeName = '电子书制作成功'
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 5:
            this.$go('/personal')
            break
          default:
            break
        }
        // this.steps += 1
      } else {
        this.steps -= 1
      }
    },
  },
}
</script>

<template lang="pug">
.container.makeDetail
  .content
    p.typeName {{typeName}}
    .box
      Xswitch(v-show="steps==1" ref="Xswitch")
      Info(v-show="steps==2" ref="Info")
      Media(v-show="steps==3" ref="Media")
      Knowledge(v-if="steps==4" :detailData="{id:$refs.Info.detailInfo.id}")
      Finish(v-show="steps==5" ref="Finish")
      //- .finish(v-if="steps==5") 制作中,请前往个人作品中心查看结果
    el-steps(:space="250" :active="steps" align-center process-status="wait")
      el-step(title="调用x-switch专业装档软件")
      el-step(title="填写必要字段信息")
      el-step(title="插入音视频")
      el-step(title="设置知识点")
      el-step(title="完成预览")
    .btns
      el-button(type="primary" v-if='steps!=1&&steps!=5' @click='nextstep(false)') 上一步
      el-button(type="primary" @click='nextstep(true)' v-if="steps!=5") {{steps==5?'完成':'下一步'}}
</template>

<style lang="stylus" scoped></style> 

