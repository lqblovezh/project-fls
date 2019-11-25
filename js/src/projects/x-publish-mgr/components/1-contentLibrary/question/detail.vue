<script>
export default {
  props: ['detailData', 'detailDialog'],
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
    }
  },
  destroyed() {},
  methods: {
    numberToLetter(n) {
      // let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
      let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
      return unit[n]
    },
    close() {
      this.$emit('update:detailDialog', false)
    },
    getActive(index) {
      return this.detailData && this.detailData.answer
        .split(',')
        .includes(this.numberToLetter(index))
    },
  },
  computed: {},
  watch: {},
}
</script>

<template lang="pug">
.div
	el-dialog(
		:center="false"
		:visible.sync="detailDialog"
		:close-on-click-modal="false"
		:before-close="close"
		append-to-body
		top="50px"
		width="1000px"
	)
		.header(slot="title")
			el-tabs(value="detail")
				el-tab-pane(label="查看题目" name="detail")
		.content
			.topic-title(v-html="detailData.question")
			div.answer-area(v-if="detailData.question_type == 'subjective_item'||detailData.question_type == 'fill'")
				p.answer(v-if="detailData.answer") {{detailData.answer}}
			div.answer-area(v-else-if="detailData.question_type == 'judgment'")
				li.answer-item
					span.answer-title(:class="{'active':detailData.answer=='true'}") A
					.answer-content-wrap
						.answer-content 正确
				li.answer-item
					span.answer-title(:class="{'active': detailData.answer=='false'}") B
					.answer-content-wrap
						.answer-content 错误
			ul.answer-area(v-else)
				li.answer-item(v-for="item,index in detailData.option")
					span.answer-title(:class="{'active':getActive(index)}") {{numberToLetter(index)}}
					.answer-content-wrap
						.answer-content(v-html="item.title")
						img.img(:src="item.img" v-if="item.img")
			.analysis-area
				p.analysis-title 题目解析
				.analysis(v-html="detailData.analysis||'暂无解析'")
		.btns(slot="footer")
			el-button( type="info" @click="close") 取消
</template>

<style lang="stylus" scoped>
.content
  .topic-title
    font-weight 700
    color #333
    margin-bottom 20px
    white-space pre-wrap
    word-break break-word
    overflow hidden
    >>>img
      max-width 250px
      max-height 250px
      vertical-align text-bottom
  .analysis-area
    margin-top 30px
    position relative
    .analysis-title
      margin 20px 0
      height 1px
      line-height 1px
      color #333
      text-align center
      border-left 400px solid #ccc
      border-right 400px solid #ccc
    .analysis
      white-space pre-wrap
      word-break break-word
      overflow hidden
      padding 0 30px
      color #666
      >>>img
        max-width 250px
        max-height 250px
  .answer-area
    >.answer
      padding 20px
      line-height 34px
      border 1px solid #ddd
      border-radius 5px
    .answer-item
      display inline-block
      vertical-align top
      width 33.33333%
      margin-bottom 20px
      padding-left 15px
      padding-right 15px
      box-sizing border-box
      .answer-title
        display inline-block
        width 20px
        height 20px
        color #333
        margin-right 5px
        text-align center
        border 1px solid #ccc
        border-radius 50%
        vertical-align top
        &.active
          background #44c3aa
          border-color #44c3aa
          color #fff
      .answer-content-wrap
        width calc(100% - 30px)
        display inline-block
        vertical-align middle
        .answer-content
          display block
          word-break break-all
          white-space pre-wrap
          word-break break-word
          overflow hidden
        .img
          margin 5px 0
          display inline-block
          border 1px solid #ccc
          max-width 60px
          max-height 60px
          background-repeat no-repeat
          background-size contain
</style>
