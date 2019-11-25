<script>
// import SelResource from './selResource'
import SelResource from "@/components/common/Resource"
export default {
  props: ['addDialog'],
  components: {
    SelResource,
  },
  data() {
    return {
      resourceDialog: false, //选择资源弹框
      types: [
				{
          name: '权威案例',
          value: '1',
        },
        {
          name: '法律法规',
          value: '2',
        },
        {
          name: '法律观点',
          value: '3',
        },
        {
          name: '裁判文书',
          value: '4',
				},
        {
          name: '图书',
          value: '6',
				},
        {
          name: '文书范本',
          value: '7',
				},
        {
          name: '课程影音',
          value: '8',
				},
			], //新建类型
			currentType: null,
    }
  },
  methods: {
		// 选择资源
		selResource(){
			if(this.types.value){
				if(this.types.value==8){
					this.$emit('addVideos',8)
					return
				}else{
					console.log('error')
				}
				this.currentType = this.types.value
				this.resourceDialog = true
			}else{
				this.$message.error("请选择类型")
			}
		},
		addSelcet(data){
			this.curSoucesList = data
			this.resourceDialog = false
			this.$emit('slecet',data,this.currentType)
			// log("544",data)
		},
  },
}
</script>
<template lang="pug">
.box
	//- 选择添加资源
	SelResource(
		v-if="resourceDialog"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="[]"
		:type="'20-'+currentType"
		@select="addSelcet"
		:singleElection="false"
	)
	.type
		span 新建类型
		el-select(v-model="types.value")
			el-option(v-for="item in types"
			:value="item.value"
			:key="item.value"
			:label="item.name")
	.btn
		el-button(type="primary" plain @click="selResource") 选择资源
</template>
<style lang="stylus" scoped>
.box
	.type,.btn
		margin 0 auto
		width 450px
		height 40px
		span
			font-size 16px
			line-height 40px
			color #333
			font-weight bold
			margin-right 20px
	.btn
		padding 50px 0
		text-align center
</style>
