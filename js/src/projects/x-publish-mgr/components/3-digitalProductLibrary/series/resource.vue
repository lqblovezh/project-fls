<script>
// import AddResource from './addResource'
import * as services from "services/x-publish/series"
import AddResource from '@/components/common/Resource'
import Info from './info'
export default {
	props:['resourceData','detailData','checkedSeries'],
	created(){
		log("122",this.checkedSeries)
		this.getList()
	},
	data(){
		return{
			type:'example',
			reslist:this.resourceData, //資源列表
			resourceDialog:false, //添加弹框
			resList1:[
				{
					name:"杀人案",
					number:"A1",
				},
				{
					name:"纵火案",
					number:"V2",
				},
				{
					name:"盗窃案",
					number:"E3",
				}
			],
			resList2:[
				{
					name:"国情",
					number:"A1",
				},
				{
					name:"权律二",
					number:"B2",
				},
				{
					name:"法律",
					number:"C3",
				}
			],
		}
	},
	components:{AddResource,Info},
	methods:{
		getList(){
			services.seriesResList({
				id:this.detailData.id,
			}).then(res=>{
				// log("456",res.data)
				this.reslist=res.data
			})
		},
		addSelcet(data) {
			this.curSoucesList=data
      this.resourceDialog = false
			// console.log('1111', data)
    },
	},
}
</script>

<template lang="pug">
.div
	AddResource(
		v-if="resourceDialog"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="[]"
		type="20"
		@select="addSelcet"
		:isShowType="true"
	)
	el-tabs(:value="type" @tab-click="$emit('handleClick')")
		el-tab-pane(label="指导案例" name="example")
			.tableWrap
				table.table
					thead
						tr
							th 名称
							th 编号
					tbody
						tr(v-for="item in resList1")
							td {{item.name}}
							td {{item.number}}
		el-tab-pane(label="栏目" name="column")
			.tableWrap
				table.table
					thead
						tr
							th 名称
							th 编号
					tbody
						tr(v-for="item in resList2")
							td {{item.name}}
							td {{item.number}}
	.footer
		el-button(type="primary" @click="resourceDialog=true" plain) 新增
</template>

<style lang="stylus" scoped>
.div
	padding 5px
	width 100%
.footer
	text-align center
</style>
