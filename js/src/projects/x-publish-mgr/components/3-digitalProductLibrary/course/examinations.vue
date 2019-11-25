<script>
import formSerialize from 'form-serialize'

export default {
  props: ['readOnly', 'currentDate', 'detailDialog'],
  components: {},
  data() {
    return {
      answerType: [
        { label: '单选题', value: 'single' },
        { label: '多选题', value: 'multi' },
        { label: '主观题', value: 'subjective_item' },
        { label: '判断题', value: 'judgment' },
        { label: '填空题', value: 'fill' },
      ], //题目类型
      scoreList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], //分数
      defaultOption: [
        { title: '', isAnswer: false },
        { title: '', isAnswer: false },
        { title: '', isAnswer: false },
        { title: '', isAnswer: false },
      ], //默认选项
      currentDetail: { ...this.currentDate },
    }
  },
  created() {
    if (this.currentDetail.option) {
      this.defaultOption = [...this.currentDetail.option]
    }
  },
  methods: {
    colse() {
      this.$emit('update:detailDialog', false)
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
      this.defaultOption.splice(index, 1)
    },
    save() {
      if (!this.$refs.detailForm.valiAll()) return
      let answer = []
      if (
        this.currentDetail.type == 'single' ||
        this.currentDetail.type == 'multi'
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
        answer = this.currentDetail[this.currentDetail.type]
      }
      if (!this.currentDetail.score) {
        return this.$message.error('分数不能为空!')
      }
      // log(answer)
      if (this.currentDetail.type != 'subjective_item' && answer.length == 0) {
        return this.$message.error('答案不能为空!')
      }
      let type_name = this.answerType.find(
        item => item.value == this.currentDetail.type
      ).label
      this.$emit('save', {
        ...this.currentDetail,
        option: this.defaultOption,
        answer,
        type_name,
      })
      this.$emit('update:detailDialog', false)
    },
    selecet(index, value) {
      if (this.currentDetail.type == 'single') {
        this.defaultOption.forEach(item => (item.isAnswer = false))
      }
      this.defaultOption[index].isAnswer = value
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
    slecetChange() {
      if (this.currentDetail.type == 'single') {
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
    :visible="detailDialog"
    top="50px"
    width="800px"
    :show-close="false"
    append-to-body
  )
    //- .header(slot="title")
    //-   div(class="el-icon-close" @click="colse")
    //-   el-tabs(value="ff")
    //-     el-tab-pane(label="题目" name="ff")
    .content
      VaForm(ref="detailForm")
        form.detailForm
          .group
            .label *题目:
            input.form-control( v-va="{ type:'required'}" v-model="currentDetail.question" type="text")
          .group
            .label *分数:
            el-select(v-model="currentDetail.score" placeholder="请选择")
              el-option(
                v-for="item in scoreList"
                :key="item"
                :label="item"
                :value="item"
              )
          .group
            .label *类型:
            el-select(v-model="currentDetail.type" placeholder="请选择" @change="slecetChange")
              el-option(
                v-for="item in answerType"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              )
          .group(v-if="currentDetail.type=='single'||currentDetail.type=='multi'")
            .label *选项:
            ul.exerciseList(style="display:inline-block")
              li(v-for="item,index in defaultOption")
                span.option {{numberToLetter(index)}}
                span
                  input.form-control(v-va="{ type:'required'}" v-model="item.title" type="text")
                span
                  el-checkbox(:value="item.isAnswer==='true'||item.isAnswer===true" :label="numberToLetter(index)" v-if="currentDetail.type=='single'" @change="selecet(index,$event)") 正确答案
                  el-checkbox(:value="item.isAnswer==='true'||item.isAnswer===true" :label="numberToLetter(index)" v-if="currentDetail.type=='multi'" @change="selecet(index,$event)") 正确答案
                span(class="el-icon-remove" @click="removeOption(index)")
            .label 
              el-button( @click="addOption" type="primary" plain size="mini") 新增选项
          .group(v-if="currentDetail.type=='judgment'")
            .label *答案:
            el-select(v-model="currentDetail.judgment" placeholder="请选择")
              el-option(key="1" label="正确" :value="true")
              el-option(key="2" label="错误" :value="false")
          .group(v-if="currentDetail.type=='fill'")
            .label *答案:
            input.form-control( v-va="{ type:'required'}" v-model="currentDetail.fill" type="text")
          .group()
            .label 解析:
            textarea.textarea( v-model="currentDetail.analysis" type="text")
      .btns
    .footer(slot="footer" class="dialog-footer")
      el-button( @click="colse" type="info" ) 取消
      el-button( @click="save" type="primary" ) 确定
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
.el-icon-remove
  color #ff7676
  cursor pointer
.exerciseList
  display inline-block
  position relative
  >>> .el-checkbox__label
    line-height inherit
  .answers
    position absolute
    top -1px
    left 250px
  label
    line-height inherit
  li
    .option
      width 20px
      text-align center
      display inline-block
    >span
      margin-right 20px
.group
  line-height 38px
  margin 10px 0
  .textarea
    -webkit-appearance none
    background-color #fff
    background-image none
    border-radius 4px
    border 1px solid #dcdfe6
    -webkit-box-sizing border-box
    box-sizing border-box
    color #606266
    display inline-block
    font-size inherit
    height 35px
    line-height 1
    outline none
    width 300px
    height 150px
    margin-top 10px
    width calc(100% - 240px)
    min-width 200px
    font-size 14px
    padding 10px
    resize none
  .label
    display inline-block
    text-align right
    padding-right 20px
    min-width 100px
    color #000
    vertical-align top
</style>
