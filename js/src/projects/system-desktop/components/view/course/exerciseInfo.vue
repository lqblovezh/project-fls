<script>
import Examinations from 'projects/x-publish-mgr/components/1-contentLibrary/question/examinations'
import * as services from 'services/x-publish/course/exercise'

export default {
  props: ['detailData', 'readOnly', 'currentExerise', 'exerciseDialog'],
  components: { Examinations },
  data() {
    return {
      services,
      exerciseList: [],
      ExerciseInfoDialog: false,
      currentDate: null,
      currentDateIndex: null,
      resourceDialog: false,
      curSoucesList: [],
      parameter: {},
    }
  },
  mounted() {
    // this.exerciseList = this.currentExerise.practice_list
  },
  methods: {
    colse() {
      this.$emit('update:exerciseDialog', false)
    },
    getAnswer(item) {
      if (item.type_name == 'judgment') {
        if (item.answer && item.answer !== 'false') {
          return '正确'
        }
        return '错误'
      } else if (item.type_name == 'multi') {
        return item.answer.replace(/,/g, '')
      }
      return item.answer
    },
    saveExamin(data) {
      console.log(data)
      if (!Object.entries(this.currentDate).length) {
        //新增
        this.exerciseList.push(data)
      } else {
        //修改
        this.$set(this.exerciseList, this.currentDateIndex, data)
      }
      this.ExerciseInfoDialog = false
    },
    saveInfo() {
      // console.log({
      //   questions: this.exerciseList,
      //   paper_id: this.currentExerise.id,
      // })
      // return
      this.services
        .saveExercise({
          questions: this.exerciseList,
          paper_id: this.currentExerise.id,
        })
        .then(res => {
          this.$message.success('保存成功!')
        })
    },
    detail(item, index) {
      this.currentDate = item || {}
      let findIndex = this.exerciseList.findIndex(
        items => item && item.id && items.id === item.id
      )
      this.currentDateIndex = findIndex > -1 ? findIndex : index
      console.log(this.currentDateIndex, this.currentDate)
      this.ExerciseInfoDialog = true
    },
    del(item, index) {
      this.$confirm('是否删除?')
        .then(res => {
          let exercisIndex =
            this.exerciseList.findIndex(item => item.id) || index
          this.exerciseList.splice(exercisIndex, 1)
        })
        .catch(res => {
          // 取消事件
        })
    },
    sort(item, type) {
      let index = this.exerciseList.findIndex(items => items.id == item.id)
      let num = type == 'up' ? -1 : 1
      let currentList = this.exerciseList
      currentList.splice(
        index,
        1,
        ...currentList.splice(index + num, 1, currentList[index])
      )
    },
    add(item, index) {
      let findIndex = this.exerciseList.findIndex(items => items.id === item.id)
      this.currentDateIndex = findIndex > -1 ? findIndex : index
      this.curSoucesList = item.tp_constitute_info || []
      this.resourceDialog = true
      this.parameter.course_id = this.detailData.id
    },
    addSelcet(data) {
      this.exerciseList[this.currentDateIndex].tp_constitute_info = data
      this.exerciseList[this.currentDateIndex].tp_constitute_id = data.map(
        item => item.tp_constitute_id
      )
      this.resourceDialog = false
    },
    delConstitute(items, item, index) {
      log(item, item.tp_constitute_info)
      this.$confirm('你真的要删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          let array = item.tp_constitute_info || []
          let index = array.findIndex(item => items.id === item.id)
          let array2 = item.tp_constitute_id || []
          let index2 = array2.findIndex(item => items.id === item.id)
          array2.splice(index2, 1)
          array.splice(index, 1)
        })
        .catch(() => {})
    },
  },
  computed: {
    totalScore() {
      let score = 0
      this.exerciseList.forEach(item => {
        score += item.score
      })
      return score
    },
  },
  filters: {
    numberToChinese(n) {
      // 判断里面是否有字母或别的
      if (!/^\d*$/.test(n)) {
        return 'Null'
      }
      if (typeof n == 'number') {
        n = n.toString()
      }
      const reg = new RegExp('([0]*)([1-9]+[0-9]+)', 'g')
      n = n.replace(reg, '$2') // console.log(n)
      let unit = '千百十亿千百十万千百十个'
      if (n.length > unit.length) {
        return 'Null'
      }
      let newStr = ''
      const nlength = n.length
      unit = unit.substr(unit.length - nlength)
      for (let i = 0; i < nlength; i++) {
        newStr += '零一二三四五六七八九'.charAt(n[i]) + unit.charAt(i)
      }
      newStr = newStr.substr(0, newStr.length - 1) // $1:捕捉第一个匹配的结果
      newStr = newStr
        .replace(/零(千|百|十)/g, '零')
        .replace(/(零)+/g, '零')
        .replace(/零(亿|万)/g, '$1')
      for (var i = newStr.length - 1; i > 0; i--) {
        if (newStr[i] == '零') {
          newStr = newStr.replace(newStr[i], '')
        } else {
          break
        }
      }
      return newStr
    },
    numberToLetter(n) {
      // let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
      let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
      return unit[n]
    },
  },
}
</script>

<template lang="pug">
.examination
  Examinations(
    v-if="ExerciseInfoDialog"
    :detailData="detailData"
    :exerciseDialog.sync="ExerciseInfoDialog"
    :currentExerise="currentDate"
    :services="services"
    @save="saveExamin"
  )
  p.title 习题设置（选填，更多功能前往控制台创建）
  VaForm(ref="detailForm")
    form.detailForm
      ul.exerciseInfo
        li(v-for="item,index in exerciseList" :key="index")
          div.top
            span.title 第{{index+1|numberToChinese}}题
            span.score {{item.score}}分
            span.name {{item.question_type_name}}
            span.answer(v-if="item.type_name!='subjective_item'") 正确答案：{{getAnswer(item)}}
          div.exercise
            .title 
              span 题目：
              .title-text(v-html="item.question")
            ul.options(v-if="item.question_type=='single'||item.question_type=='multi'")
              li(v-for="items,indexs in item.option")
                span {{indexs|numberToLetter}}
                span(v-html="items.title")
          div.analysis
            .title 
              span 【解析】: 
              .analysis-text(v-html="item.analysis")
          div.operation
            span.icon.icon-pass(size="mini" title="修改"  @click="detail(item,index)" type="primary"  plain)
            span.icon.icon-delete(size="mini" title="删除"  @click="del(item,index)" type="primary"  plain )
            span.icon.el-icon-sort-up(size="mini" title="上移" @click="sort(item,'up')" v-if="index!=0")
            span.icon.el-icon-sort-down(size="mini" title="下移" @click="sort(item,'down')" v-if="index!=(exerciseList.length-1)" )
    .btns
      el-button(@click="detail()" size="small" class="el-icon-plus" type="primary" ) 新增题目
</template>


<style lang="stylus" scoped>
.icon
  margin-right 10px
  cursor pointer
  display inline
.examination
  >.div
    padding-top 10px
.detailForm
  padding-left 0
.makeDetail
  min-height initial
  background-color none
.el-icon-sort-up, .el-icon-sort-down
  color #f7793e
.total-score
  position absolute
  left 0
  right 0
  text-align center
  z-index 0
  color #f7793e
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.exerciseInfo
  >li
    // padding 10px
    // background #ededed
    position relative
    margin-bottom 40px
    color #333
    .top
      background #f5f5f5
      height 36px
      line-height @height
      padding-left 50px
      >span
        margin-right 70px
    >div
      &.operation
        width 130px
        text-align left
        float right
        position absolute
        right 0
        top 8px
      &.exercise
        padding-left 50px
        display inline-block
        .title
          margin 20px 0
          line-height 26px
          &-text
            display inline-block
            >>>img 
              max-width 250px
              max-height 250px
              vertical-align middle
        .options
          padding-left 40px
          li
            margin-bottom 20px
            font-size 14px
            line-height 1
            span
              margin-right 20px
              >>> >p
                display inline-block
    .analysis
      padding-left 50px
      font-size 14px
      .analysis-text
        padding-left 4em
        padding-top 1em
        >>>img
          max-width 250px
          max-height 250px
      >div
        padding 20px
        background #fdf5ec
        color #777
</style>
