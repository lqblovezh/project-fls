<script>
import echarts from 'echarts';
import * as services from 'services/x-read/sale';
export default {
   methods:{
		  getLine(type=1){
					log(type)
          services.saleByDate({type}).then(res=>{
						let lineData = {book:[],video:[],audio:[],picture:[],theme:[],courseware:[],time:[]};
						res.data.forEach(value=>{
							lineData.book.push(value.book);
							lineData.video.push(value.video);
							lineData.audio.push(value.audio);
							lineData.picture.push(value.picture);
							lineData.theme.push(value.theme);
							lineData.courseware.push(value.courseware);
							lineData.time.push(value.start_time.substr(0,10));
						})
						let chart = document.querySelector('#Chart');
											echarts.init(chart).setOption({
													color: ['#C1232B','#B5C334','#FCCE10','#E87C25','#27727B','#FE8463','#9BCA63',],
													tooltip : {
														trigger: 'axis'
													},
													legend: {
															data:['电子书','视屏书','音频书','图片','课件','主题']
													},
													toolbox: {
															show : true,
															feature : {
																	mark : {show: true},
																	dataView : {show: true, readOnly: false},
																	magicType : {show: true, type: ['line', 'bar']},
																	restore : {show: true},
																	saveAsImage : {show: true}
															}
													},
													calculable : true,
													xAxis : [
															{
																	type : 'category',
																	boundaryGap : false,
																	data : lineData['time']
															}
													],
													yAxis : [
															{
																	type : 'value'
															}
													],
													series : [
																	{
																			name:'电子书',
																			type:'line',
																			tiled: '总量',
																			labelLine: {
																					lineStyle: {
																							color: '#f00'
																					}
																			},
																			data:lineData['book']
																	},
																	{
																			name:'视屏书',
																			type:'line',
																			tiled: '总量',
																			data:lineData['video']
																	},
																	{
																			name:'音频书',
																			type:'line',
																			tiled: '总量',
																			data:lineData['audio']
																	},
																	{
																			name:'图片',
																			type:'line',
																			tiled: '总量',
																			data:lineData["picture"]
																	},
																	{
																			name:'课件',
																			type:'line',
																			tiled: '总量',
																			data:lineData['courseware']
																	},
																	{
																			name:'主题',
																			type:'line',
																			tiled: '总量',
																			data:lineData['theme']
																	}
															]
																});
					})
			},
      getPie(){
         services.saleInfo().then(res=>{
					 log(res)
					  setTimeout(() => {
										let ctx= document.querySelectorAll('.myChart');
										Object.values(res.data).forEach((el,i) => {
                      var pieData = [{value:el.book,name:'电子书 '+ el.book },{value:el.video,name:'视频书 '+el.video},{value:el.audio,name:'音频书 '+el.audio},{value:el.picture,name:'图片 '+ el.picture},{value:el.courseware,name:'课件 '+el.courseware},{value:el.theme,name:'主题 '+el.theme}]
											let arr = ['总体销售额','今日销售额','本月销售额','本年销售额'];
										//option.title.text=arr[i]+'￥x元';
											echarts.init(ctx[i]).setOption({
													title:{
														text:arr[i]+`￥${el.count}元`,
														left:'center',
														bottom:'bottom'
													},
													series : [
													{
															name: '总体销售额',
															type: 'pie',
															radius: '55%',
															itemStyle: {
																	normal: {
																			color: function(params) {
																					// build a color map as your need.
																					var colorList = [
																						'#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
																						'#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
																						'#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
																					];
																					return colorList[params.dataIndex]
																			},
																			label: {
																					show: true,
																					position: 'top',
																					formatter: '{b}\n\n{d}%'
																			}
																	}
															},
															data:pieData
													}
											]
										});
										});
									}, 300);
				 })
      },
   },
   created(){
			this.getPie();
			this.getLine()
		}
}
</script>

<template lang="pug">
.box
	.top(style="margin-top:80px;")
		.item.myChart
		.item.myChart
		.item.myChart
		.item.myChart
	.content
		.dataline(style="position:absolute;z-index:9999; margin-left:1470px;margin-top:60px; width:200px ;")
			el-button-group
					el-button(type="primary" @click="getLine(1)") 日
					el-button(type="primary" @click="getLine(2)") 月
					el-button(type="primary" @click="getLine(3)") 年
		#Chart
</template>

<style lang="stylus" scoped>
.box
  min-width 1615px
  .top
    overflow hidden
    margin-bottom 100px;
    width 100%
    .item
      float left
      width 400px;
      height 300px;
			text-align center
  .content
      width 100%
			#Chart
			  text-align left
			  height 350px
				width 70%
</style>
