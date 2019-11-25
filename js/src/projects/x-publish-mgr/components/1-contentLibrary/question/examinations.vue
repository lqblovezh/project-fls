<script>
import Ueditor from 'projects/x-publish-mgr/components/1-contentLibrary/question/Ueditor'
import FileUpload from 'projects/x-publish-mgr/components/1-contentLibrary/question/FileUpload'
import { listGroup } from 'services/x-publish/question'

export default {
  props: ['currentExerise', 'exerciseDialog'],
  components: { Ueditor, FileUpload },
  data() {
    return {
      answerType: [
        { label: '单选题', value: 'single' },
        { label: '多选题', value: 'multi' },
        { label: '主观题', value: 'subjective_item' },
        { label: '判断题', value: 'judgment' },
        { label: '填空题', value: 'fill' },
      ], //题目类型
      answerLevel: [
        { label: '简单', value: 'easy' },
        { label: '一般', value: 'general' },
        { label: '困难', value: 'difficulty' },
      ], //题目类型
      scoreList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //分数
      defaultOption: [
        { title: '', isAnswer: false },
        { title: '', isAnswer: false },
        { title: '', isAnswer: false },
        { title: '', isAnswer: false },
      ], //默认选项
      groupList: [],
      currentDetail: JSON.parse(JSON.stringify(this.currentExerise)),
    }
  },
  created() {
    if (!Object.entries(this.currentDetail).length) {
      this.currentDetail = {
        score: 2,
        level: 'easy',
        question_type: 'single',
      }
    }
    if (this.currentDetail.option) {
      this.defaultOption = this.currentDetail.option
    }
    this.listGroup()
  },
  mounted() {
    this.$nextTick(() => {})
  },
  methods: {
    listGroup() {
      listGroup().then(res => {
        this.groupList = res.data
      })
    },
    colse() {
      this.$emit('update:exerciseDialog', false)
    },
    addOption() {
      if (this.defaultOption.length > 26) {
        return this.$message.warning('禁止添加太多!')
      }
      this.defaultOption.push({
        title: '',
        isAnswer: false,
        action: 'add',
      })
    },
    removeOption(index) {
      if (this.defaultOption.length <= 2) {
        return this.$message.warning('选择项不能少于2项')
      }
      this.$confirm('是否删除?')
        .then(res => {
          this.defaultOption.splice(index, 1)
        })
        .catch(res => {
          // 取消事件
        })
    },
    save() {
      if (!this.$refs.detailForm.valiAll()) return
      let answer = []
      if (
        this.currentDetail.question_type == 'single' ||
        this.currentDetail.question_type == 'multi'
      ) {
        for (let key in this.defaultOption) {
          if (
            this.defaultOption[key].isAnswer === true ||
            this.defaultOption[key].isAnswer === 'true'
          ) {
            answer.push(this.numberToLetter(key))
          }
        }
        answer = answer.join(',')
      } else {
        // answer = this.currentDetail[this.currentDetail.question_type]
        answer = this.currentDetail.answer
      }
      if (!this.currentDetail.score) {
        return this.$message.error('分数不能为空!')
      }
      // log(answer)
      if (
        this.currentDetail.question_type != 'subjective_item' &&
        answer.length == 0
      ) {
        return this.$message.error('答案不能为空!')
      }
      let question_type_name = this.answerType.find(
        item => item.value == this.currentDetail.question_type
      ).label
      // console.log({
      //   ...this.currentDetail,
      //   option: this.defaultOption,
      //   answer,
      // })
      // return
      this.$emit('save', {
        ...this.currentDetail,
        option: this.defaultOption,
        answer,
        question_type_name,
      })
      // this.$emit('update:exerciseDialog', false)
    },
    selecet(index, value) {
      if (this.currentDetail.question_type == 'single') {
        this.defaultOption.forEach(item => (item.isAnswer = false))
      }
      this.defaultOption[index].isAnswer = value
    },
    change(path, url, item) {
      item.img = path
      item.img_src = url
    },
    uechange(item, name, val) {
      item[name] = val
    },
    numberToLetter(n) {
      // let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
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
    slecetChange() {
      this.$set(this.currentDetail, 'answer', '')
      if (this.currentDetail.question_type == 'single') {
        this.defaultOption.forEach(item => (item.isAnswer = false))
        this.defaultOption[0].isAnswer = true
      }
    },
  },
}
</script>

<template lang="pug">
.div
  el-dialog.restBody2(
    :center="false"
    :visible="exerciseDialog"
    :before-close="colse"
    top="50px"
    width="800px"
    :title="(currentDetail.id?'修改':'新增')+'题目'"
    append-to-body
  )
    .content
      VaForm(ref="detailForm")
        form
          .group.inline
            .label *分值:
            el-input-number(v-model="currentDetail.score" :min="1" :max="100")
          .group.inline
            .label *完成时间:
            el-input-number(v-model="currentDetail.time" :min="1" :max="100")
            | 
            span 秒
          .group.inline
            .label *题目类型:
            el-select(v-model="currentDetail.question_type" placeholder="请选择"  @change="slecetChange")
              el-option(
                v-for="item in answerType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              )
          .group.inline
            .label *难易程度:
            el-select(v-model="currentDetail.level" placeholder="请选择")
              el-option(
                v-for="item in answerLevel"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              )
          .group.inline
            .label *分组:
            el-select(v-model="currentDetail.group_id" placeholder="请选择")
              el-option(
                v-for="item in groupList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              )
          .group
            .label *题目名称:
            Ueditor(id="question" :isImage="true" :item="currentDetail" name='question' @uechange="uechange")
          .group(v-if="currentDetail.question_type=='single'||currentDetail.question_type=='multi'")
            .label *题目选项:
            ul.exerciseList(style="display:inline-block")
              li(v-for="item,index in defaultOption")
                span.option {{numberToLetter(index)}}
                span
                  el-checkbox(:value="item.isAnswer==='true'||item.isAnswer===true" :label="numberToLetter(index)" v-if="currentDetail.question_type=='single'" @change="selecet(index,$event)") 正确答案
                  el-checkbox(:value="item.isAnswer==='true'||item.isAnswer===true" :label="numberToLetter(index)" v-if="currentDetail.question_type=='multi'" @change="selecet(index,$event)") 正确答案
                el-button(class="el-icon-delete" type="danger" title="删除选项" @click="removeOption(index)" size="mini") 删除选项
                div
                  FileUpload(:data="item" @change="change")
                  Ueditor(:id="'option'+index" :item="item" name='title' @uechange="uechange")
          .group(v-if="currentDetail.question_type=='single'||currentDetail.question_type=='multi'")
            .label
            el-button( @click="addOption" icon="el-icon-plus" type="primary" plain size="mini") 新增选项
          .group(v-if="currentDetail.question_type=='judgment'")
            .label *答案:
            el-select(v-model="currentDetail.answer" placeholder="请选择")
              el-option(key="1" label="正确" value="true")
              el-option(key="2" label="错误" value="false")
          .group(v-if="currentDetail.question_type=='fill'")
            .label *答案:
            input.form-control( v-va="{ type:'required'}" v-model="currentDetail.answer" type="text")
          .group()
            .label 题目解析:
            Ueditor(id="analysis" :isImage="true" :item="currentDetail" name='analysis' @uechange="uechange")
    .footer(slot="footer" class="dialog-footer")
      el-button( @click="colse" type="info" ) 取消
      el-button( @click="save" type="primary" ) 确定
</template>


<style lang="stylus" scoped>
.group
  line-height 38px
  margin 10px 0
.label
  display inline-block
  text-align right
  padding-right 20px
  min-width 100px
  vertical-align top
  color #000
.content
  height 70vh
  overflow auto
.exerciseList
  display inline-block
  position relative
  .fileUpload
    margin-right 20px
    vertical-align top
  >>> .el-checkbox__label
    line-height inherit
  .answers
    position absolute
    top -1px
    left 250px
  label
    line-height inherit
  li
    background #F7F7F7
    margin-bottom 20px
    padding 10px
    .option
      width 20px
      text-align center
      display inline-block
    >span
      margin-right 20px
.group.inline
  width 50%
  display inline-block
</style>
