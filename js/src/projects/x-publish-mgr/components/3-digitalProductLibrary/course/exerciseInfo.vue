<script>
import formSerialize from 'form-serialize'
import ExerciseInfo from '../../1-contentLibrary/question/examinations'
import ExerciseDetail from '../../1-contentLibrary/question/detail'
import Resource from '@/components/common/Resource'
import { save as questionSave } from 'services/x-publish/question'
// import * as services from "services/x-publish/course/exercise"

export default {
  props: [
    'detailData',
    'readOnly',
    'currentExerise',
    'exerciseDialog',
    'services',
  ],
  components: { ExerciseInfo, Resource, ExerciseDetail },
  data() {
    return {
      exerciseList: [
        // {question:'中国人口多少人?',score:'2',type:'single',type_name:'单选题',answer:'C',id:'',option:[
        //   {title:"12亿",isAnswer:false},
        //   {title:"13亿",isAnswer:false},
        //   {title:"14亿",isAnswer:true},
        //   {title:"15亿",isAnswer:false},
        // ]},
        // {question:'中国四大直辖市哪几个在沿海?',score:'2',type:'multi',type_name:'多选题',answer:'B,C,D',id:'',option:[
        //   {title:"重庆",isAnswer:false},
        //   {title:"天津",isAnswer:true},
        //   {title:"北京",isAnswer:true},
        //   {title:"上海",isAnswer:true},
        // ]},
        // {question:'你觉得中国最美的城市是哪个?',score:'1',type:'subjective_item',type_name:'主观题',answer:'上海市',id:''},
        // {question:'中国人口全世界最多?',score:'1',type:'judgment',type_name:'判断题',answer:true,id:''},
        // {question:'中国的首都是',score:'2',type:'fill',type_name:'填空题',answer:'北京市',id:''},
      ],
      detailDialog: false,
      currentDate: null,
      currentDateIndex: null,
      resourceDialog: false,
      ExerciseInfoDialog: false,
      curSoucesList: [],
      resourceType: '19',
      parameter: {},
      idName: 'tp_constitute_id',
    }
  },
  created() {
    if (this.services) {
      // this.services.getInfo({ id: this.currentExerise.id }).then(res => {
      //   this.exerciseList = res.data.practice_list || []
      // })
      this.services.getInfos({ id: this.currentExerise.id }).then(res => {
        this.exerciseList = res.data.practice_list || []
      })
    } else {
      log(this.currentExerise)
      this.exerciseList = this.currentExerise.practice_list
    }
  },
  methods: {
    colse() {
      this.$emit('update:exerciseDialog', false)
    },
    getAnswer(item) {
      if (item.question_type == 'judgment') {
        if (item.answer && item.answer !== 'false') {
          return '正确'
        }
        return '错误'
      } else if (item.question_type == 'multi') {
        return item.answer.replace(/,/g, '')
      }
      return item.answer
    },
    saveExamin(data) {
      if (!Object.entries(this.currentDate).length) {
        //新增
        this.exerciseList.push(data)
      } else {
        //修改
        this.$set(this.exerciseList, this.currentDateIndex, data)
      }
      this.ExerciseInfoDialog = false
      // questionSave({ ...data, id: data.practice_id }).then(
      //   res => {
      //     this.ExerciseInfoDialog = false
      //     data.practice_id = res.data.id

      //     console.log(this.exerciseList)
      //   },
      //   err => {
      //     this.$message.error('保存失败')
      //   }
      // )
    },
    saveInfo() {
      // this.services
      //   .saveExercise({
      //     questions: this.exerciseList,
      //     paper_id: this.currentExerise.id,
      //   })
      //   .then(res => {
      //     this.$message.success('保存成功!')
      //   })
      this.services
        .saveExercises({
          questions: this.exerciseList,
          paper_id: this.currentExerise.id,
        })
        .then(
          res => {
            this.$message.success('保存成功!')
          },
          err => {
            this.$message.error('保存失败')
          }
        )
    },
    detail(item, index) {
      this.currentDate = item || {}
      let findIndex = this.exerciseList.findIndex(
        items => item && items.id && items.id === item.id
      )
      this.currentDateIndex = findIndex > -1 ? findIndex : index
      console.log(this.currentDateIndex)
      if (item && item.id) {
        this.detailDialog = true
      } else {
        this.ExerciseInfoDialog = true
      }
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
      this.resourceType = '19'
      this.idName = 'tp_constitute_id'
      let findIndex = this.exerciseList.findIndex(items => items.id === item.id)
      this.currentDateIndex = findIndex > -1 ? findIndex : index
      this.curSoucesList = item.tp_constitute_info || []
      this.resourceDialog = true
      this.parameter.course_id = this.detailData.id
    },
    addExercise() {
      this.resourceType = '31'
      this.curSoucesList = []
      this.currentDate = {}
      this.idName = ''
      this.resourceDialog = true
      this.parameter.course_id = this.detailData.id
    },
    addSelcet(data) {
      if (this.resourceType == '19') {
        this.exerciseList[this.currentDateIndex].tp_constitute_info = data
        this.exerciseList[this.currentDateIndex].tp_constitute_id = data.map(
          item => item.tp_constitute_id
        )
      } else {
        data.forEach(item => {
          this.saveExamin(item)
        })
        // console.log(data)
      }
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
      let unit = [
        'A',
        'B',
        'C',
        'D',
        'E',
        'F',
        'G',
        'H',
        'I',
        'J',
        'K',
        'L',
        'M',
        'N',
        'O',
        'P',
        'Q',
        'R',
        'S',
        'T',
        'U',
        'V',
        'W',
        'X',
        'Y',
        'Z',
      ]
      return unit[n]
    },
  },
}
</script>

<template lang="pug">
.div
  //- Resource(
  //-   v-if="resourceDialog"
  //-   :type="resourceType"
  //-   ref="resource"
  //-   :parameter="parameter"
  //-   :resourceDialog.sync="resourceDialog"
  //-   :curSoucesList="curSoucesList"
  //-   :isShowSearch="true"
  //-   :idName="idName"
  //-   @select="addSelcet"
  //- )
  Resource(
    v-if="resourceDialog"
    :resourceDialog.sync="resourceDialog"
    :curSoucesList="curSoucesList"
    :type="resourceType"
    @select="addSelcet"
  )
  ExerciseInfo(
    v-if="ExerciseInfoDialog"
    :detailData="detailData"
    :exerciseDialog.sync="ExerciseInfoDialog"
    :currentExerise="currentDate"
    :services="services"
    @save="saveExamin"
  )
  ExerciseDetail(
    v-if="detailDialog"
    :detailDialog.sync="detailDialog"
    :detailData="currentDate"
  )
  el-dialog.restBody2(
    :center="false"
    :visible="exerciseDialog"
    top="50px"
    width="1200px"
    :show-close="false"
    append-to-body
  )
    .header(slot="title")
      div(class="el-icon-close" @click="colse")
      div.total-score() 总分 
        span {{totalScore}}
      el-tabs(value="ff")
        el-tab-pane(label="习题" name="ff")
    .content
      ul.exerciseInfo
        li(v-for="item,index in exerciseList" :key="index")
          div.top
            span.title 第{{index+1|numberToChinese}}题
            span.score {{item.score}}分
            span.name {{item.question_type_name}}
            span.answer(v-if="item.question_type!='subjective_item'") 正确答案：{{getAnswer(item)}}
          div.exercise
            .title 
              span.title-name 题目：
              .title-text(v-html="item.question")
            ul.options(v-if="item.question_type=='single'||item.question_type=='multi'")
              li(v-for="items,indexs in item.option")
                span.options-option {{indexs|numberToLetter}}
                .options-text(v-html="items.title")
          div.relation
            ul
              span.title 课时计划链接
              li(v-for="items in item.tp_constitute_info")
                span {{items.teaching_plan_info||items.tag}} 
                span {{items.resource_name||items.name}} 
                Icon(size="mini" title="删除"  @click="delConstitute(items,item,index)" type="icon-delete"  plain )
          div.analysis
            .title
              span 【解析】:
              .analysis_text(v-html="item.analysis") 
          div.operation(v-if="!readOnly")
            Icon(size="mini" title="详情"  @click="detail(item,index)" type="icon-detail"  plain)
            Icon(size="mini" title="添加课时计划链接"  @click="add(item,index)" type="icon-link"  plain)
            Icon(size="mini" title="删除"  @click="del(item,index)" type="icon-delete"  plain )
            Icon(size="mini" title="上移" @click="sort(item,'up')" type="el-icon-sort-up" v-if="index!=0")
            Icon(size="mini" title="下移" @click="sort(item,'down')" type="el-icon-sort-down" v-if="index!=(exerciseList.length-1)" )
      .btns
        el-button(@click="detail()" size="small" class="el-icon-plus" type="primary" v-if="!readOnly") 新增题目
        el-button(@click="addExercise()" size="small" class="el-icon-search" type="primary" v-if="!readOnly") 选择题目
    .footer(slot="footer" class="dialog-footer")
      el-button( @click="colse" type="info" ) 取消
      el-button( @click="saveInfo" type="primary" v-if="!readOnly") 确定
</template>


<style lang="stylus" scoped>
.el-icon-sort-up, .el-icon-sort-down
  color #44c3aa
.total-score
  position absolute
  left 0
  right 0
  text-align center
  z-index 0
  color #44c3aa
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.exerciseList
  display inline-block
  label
    line-height inherit
  li
    .option
      width 20px
      text-align center
      display inline-block
    >span
      margin-right 20px
.exerciseInfo
  >li
    padding 10px
    background #ededed
    position relative
    margin-bottom 20px
    .top
      >span
        margin-right 20px
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
        width 50%
        display inline-block
        .title
          margin 10px 0
          &-text
            display inline-block
            >>> img
              max-width 250px
              max-height 250px
        .options
          padding-left 40px
          &-text
            display inline-block
          li
            margin-bottom 5px
            span
              margin-right 20px
    .analysis
      padding-left 50px
      .title
        .analysis_text
          padding-left 4em
          padding-top 1em
        >>> img
          max-width 200px
          max-height 200px
    .relation
      width 40%
      display inline-block
      .title
        margin 10px 0
        display block
</style>
