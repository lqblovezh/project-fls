<script>
export default {
  props: ['detailData', 'detailDialog'],
  components: {},
  created() {
    console.log(this.detailData,'111')
  },
  data() {
    return {}
  },
  mounted() {},
  destroyed() {},
  methods: {
    numberToLetter(n) {
      // let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
      let unit = ['A','B','C','D', 'E','F','G','H','I','J','K','L','M','N', 'O','P','Q','R','S','T','U','V','W','X','Y','Z',]
      return unit[n]
    },
    close() {
      this.$emit('close', false)
    },
    getActive(index) {
      return this.detailData.answer.split(',').includes(this.numberToLetter(index))
    }
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
			ul.answer-area
				li.answer-item(v-for="item,index in detailData.option")
					span.answer-title(:class="{'active':getActive(index)}") {{numberToLetter(index)}}
					.answer-content-wrap
						.answer-content(v-html="item.title")
						img.img(:src="item.img" v-if="item.img")
			.analysis-area
				p.analysis-title 题目解析
				.analysis(v-html="detailData.analysis||'暂无解析'")
		.btns(slot="footer")
			el-button( type="info" @click="$emit('update:detailDialog', false)") 取消
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
			max-width 150px
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
	.answer-area
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
