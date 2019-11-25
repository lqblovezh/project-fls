<script>
import Info from './info'
import Hour from './hour'
import Plan from './plan'
import Finish from '../book/finish'
import Exercise from './exerciseInfo'
import Store from 'store2'
import { makeMixin } from '@/utils/mixins'
import { save, getAllInfo, fastPlan, dataFast } from 'services/x-publish/course'
import { save as hourSave } from 'services/x-publish/course/hours'
import { saveExercises } from 'services/x-publish/course/exercise'

export default {
  mixins: [makeMixin],
  data() {
    return {
      steps: 1,
      course_id: '',
      currentExeriseId: '',
      typeName: '5分钟制作你的第一堂课',
      makeType: 'teach',
    }
  },
  components: {
    Info,
    Hour,
    Plan,
    Exercise,
    Finish,
  },
  mounted() {
    this.getTask()
    this.$nextTick(() => {
      this.course_id = Store.session('course_id')
      this.course_id = Store.session('course_id')
      if (this.course_id) {
        getAllInfo(this.course_id).then(res => {
          this.$refs.Info.detailInfo = res
          this.$refs.Hour.detailInfo = res.course_period_list[0] || {}
        })
      }
    })
  },
  methods: {
    async getTask() {
      this.task_id = Store.session(this.makeType + '_task_id')
      this.getTaskId()
    },
    async nextstep(type) {
      if (type) {
        switch (this.steps) {
          case 1:
            if (!this.$refs.Info.valiAll())
              return this.$message.warning('缺少必要信息') //log("验证失败")
            await save(this.$refs.Info.detailInfo).then(
              res => {
                if (!this.course_id) {
                  this.$refs.Info.detailInfo.id = res.data.id
                  this.course_id = res.data.id
                  Store.session('course_id', res.data.id)
                }
                this.steps = 2
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 2:
            await hourSave({
              ...this.$refs.Hour.detailInfo,
              course_id: this.course_id,
            }).then(
              res => {
                if (!this.$refs.Hour.detailInfo.id) {
                  this.$set(this.$refs.Hour.detailInfo, 'id', res.data.id)
                }
                this.$refs.Hour.detailInfo.id
                this.steps = 3
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 3:
            if (!this.$refs.Info.valiAll())
              return this.$message.warning('缺少必要信息') //log("验证失败")
            await fastPlan({
              ...this.$refs.Plan.detailInfo,
              period_id: this.$refs.Hour.detailInfo.id,
              course_id: this.course_id,
              resources: this.$refs.Plan.resources,
            }).then(
              res => {
                this.currentExeriseId = res.data.id
                this.steps = 4
              },
              err => {
                this.$message.error(err.message)
              }
            )
            break
          case 4:
            // if (
            //   !this.$refs.Exercise.exerciseList ||
            //   !this.$refs.Exercise.exerciseList.lenght
            // ) {
            //   return this.$message({
            //     type: 'warning',
            //     message: '请添加题目',
            //     showClose: true,
            //   })
            // }
            if(this.$refs.Exercise.exerciseList&&this.$refs.Exercise.exerciseList.lenght){
              await saveExercises({
                questions: this.$refs.Exercise.exerciseList,
                paper_id: this.currentExeriseId,
              }).then(res => {
                this.$message.success('保存成功!')
              })
            }
            await dataFast({
              task_id: this.task_id,
              id: this.course_id,
            }).then(
              res => {
                Store.session(this.makeType + '_task_id', '')
                Store.session('course_id', '')
                this.$refs.Finish.getInfo(this.task_id)
                this.steps = 5
                this.typeName = '课件制作成功'
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
  },
}
</script>

<template lang="pug">
.container.makeDetail
  .content
    p.typeName {{typeName}}
    .box
      Info(v-show="steps==1" ref="Info")
      Hour(v-show="steps==2" ref="Hour")
      Plan(v-show="steps==3" ref="Plan")
      Exercise(v-if="steps==4" ref="Exercise")
      Finish(v-show="steps==5" ref="Finish")
    el-steps(:space="250" :active="steps" align-center process-status="wait")
      el-step(title="课程基本信息")
      el-step(title="课时创建")
      el-step(title="学习计划")
      el-step(title="设置习题")
      el-step(title="完成预览")
    .btns
      el-button(type="primary" v-if='steps!=1&&steps!=5' @click='nextstep(false)') 上一步
      el-button(type="primary" @click='nextstep(true)' v-if="steps!=5") {{steps==5?'完成':'下一步'}}
</template>

<style lang="stylus" scoped>
.container
  background-color #f5f5f5
  min-height 700px
  .content
    width 1300px
    padding 60px 50px 140px
    background-color #fff
    margin 30px auto 70px
    border-top 3px solid #f7793e
    .box
      overflow hidden
    >>> .el-steps
      margin 60px 0 70px
      background-color #f5f5f5
      padding 30px
      .el-step__title
        font-size 14px
    .title
      text-align center
      font-size 26px
      color #444
      margin-bottom 70px
</style> 

