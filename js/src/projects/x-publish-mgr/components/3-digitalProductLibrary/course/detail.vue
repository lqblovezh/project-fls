<script>
import Info from './info'
import Hour from './hour'
import Exercise from './exercise'

export default {
  components: {Info, Hour, Exercise},
	props:['type', 'detailData', 'defaultData', 'detailDialog', 'readOnly', 'services', 'hourSever', 'exerciseSever'],
	beforeCreate() {

	},
  data() {
    return {
      infoDate:{},
      hourDate: [],
      exerciseDate: [],
      priceDate: {},
    };
	},
	created(){
		let allDate = this.detailData || this.defaultData
		this.infoDate = allDate||{}
		this.hourDate = allDate.course_period_list||[]
		this.exerciseDate = allDate.examination_paper_list||[]
		this.priceDate = allDate.price||{}
  },
  methods: {
    exerciseChange(data) {
      this.exerciseSever.getList({id:this.detailData.id}).then(res => {
        this.exerciseDate = res.data
      })
    },
    hourChange() {
      this.hourSever.getList({course_id:this.detailData.id}).then(res => {
        this.hourDate = res.data
      }) 
    },
    savePrice() {
      if(!this.detailData.id){
        return this.$message.warning('请先保存基本信息后再保存!')
      }
      this.services.savePrice({
        id: this.detailData.id,
        ...this.priceDate
      }).then(res => {
        this.$message.success('价格保存成功!')
      })
    },
    restprice() { //添加共享资源之后重新更新价格
      this.services.getPrice({id:this.detailData.id}).then(res => {
        this.priceDate = res.data
      })
    }
  },
};
</script>

<template lang="pug">
.div
  el-tabs( :value="type||'info'")
    //- 基本信息
    el-tab-pane( label="基本信息" name="info")
      Info(
				:detailData="detailData"
				:infoDate="infoDate"
				:services="services"
				:readOnly="readOnly"
				@close="$emit('update:detailDialog',false)"
				@saveok="(data) => $emit('saveok',data)"
			)
    //- 教学计划
    el-tab-pane( label="教学计划" name="hour")
      Hour(
				:detailData="detailData"
				:hourDate="hourDate"
				:services="hourSever"
				:readOnly="readOnly"
				@change="hourChange"
        @restprice="restprice"
			)
    //- 习题设置
    el-tab-pane( label="习题设置" name="example")
      Exercise(
				:detailData="detailData"
				:exerciseDate="exerciseDate"
				:hourDate="hourDate"
				:services="exerciseSever"
				:readOnly="readOnly"
				@change="exerciseChange"
			)
    //- 价格设置
    el-tab-pane( label="价格设置" name="price")
      .group
        .label 使用授权课程价格:
        span {{priceDate.share_course_price||0}}
      //- .group
      //-   .label 使用共享资源价格:
      //-   span {{priceDate.share_resource_price||0}}
      .group
        .label *设置你的课程价格:
        input.form-control( v-va="{ type:'required'}" v-model="priceDate.price" placeholder="请输入价格" type="text" :disabled="readOnly")
        //- span.price *管理员会审核你的价格,价格不能低于授权课程价格+共享资源价格
        span.price *管理员会审核你的价格,价格不能低于授权课程价格
      .group
        .label *预计收益:
        //- span （设置价格 - 共享资源价格 - 使用授权课程价格）* 80%
        span （设置价格 - 使用授权课程价格）* 80%
      .btns(v-if="!readOnly")
        el-button(@click="$emit('update:detailDialog',false)" type="info" ) 取消
        el-button(@click="savePrice" type="primary") 保存
</template>


<style lang="stylus" scoped>
.label
  width 150px
.form-control
  width 150px
.price
  margin-left 20px
  color #929292
.btns
  text-align right
</style>


