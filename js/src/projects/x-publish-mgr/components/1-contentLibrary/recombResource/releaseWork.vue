<script>
import {
  recursionTree
} from '@/util/math.js'
import * as commonServices from "services/common"
import {
  synchronization
} from "services/common"
import {
  getIconStyle
} from '@/util/mixins'
import * as myServices from 'services/x-publish/debris'
export default {
  props: ['type', 'detailData', 'publishDialog','recomId'],
  created() {
    if (this.detailData) {
			this.getDetail();
    }
  },
  mixins: [getIconStyle],
  data() {
    return {
      ml: null, //目录
      currMulu: null, // 当前点击的目录
      optional: Array,
      detailDataOwn: {},
      workType:[{
				name:"电子书",
				value:"1"
			},{
				name:"权威案例",
				value:"2"
			},{
				name:"法律法规",
				value:"3"
			},{
				name:"法律文献",
				value:"4"
			},{
				name:"裁判文书",
				value:"5"
			},{
				name:"图书",
				value:"7"
			},{
				name:"文书范本",
				value:"8"
			}
			],
    };
  },
  methods: {
		getDetail() {
			myServices.detailDebris({
				id: this.detailData.id
			}).then(res => {
				this.detailDataOwn = res.data
				if (!res.data.attributes) {
					res.data.attributes = [];
				}
			})
		},
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.name == 'ml') {
        this.currMulu = this.ml;
      }
    },
		async submitDetail(formName) {
		  var flag = this.$refs.detailForm.valiAll()
		  if (!flag) {
		    return
		  }
			await myServices.publishWork({
				id:this.recomId,
				name:this.detailDataOwn.name,
				type:this.workType.value,
			})
			this.$emit('detailBack')
			this.$message.success("发布重组资源成功")
		},
    submitMetadata() { // 提交扩展属性

    },
  },
};
</script>

<template lang="pug">
.div
	.dialogs
		el-tabs( :value="type" @tab-click="handleClick")
			//- 详情
			el-tab-pane( label="发布到作品池" name="xq")
				.div
					VaForm( ref="detailForm"  )
						form.detailForm( ref="detailForm")
							fieldset(:disabled="detailReadOnly")
								.group
									.label *作品名称:
									input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" maxlength="20")
								.group
									.label *作品类型:
									el-select(name="type" v-model="workType.value")
										el-option(v-for="item in workType"
										:value="item.value"
										:key="item.value"
										:label="item.name")
							.btns
								el-button( ype="info" @click=" $emit('update:publishDialog', false)") 取消
								el-button(@click="submitDetail('detailForm')" type="primary") 发布
</template>


<style lang="stylus" scoped>
.grid-content
  width 300px
  margin-right 30px
.iconRotate
  i
    color red
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  max-width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
.muluWrap
  .left
    width 300px
    background red
    display inline-block
    overflow auto
  .right
    width calc( 100% - 300px)
    display inline-block
    min-height 500px
.th-name
  height initial
.imgSizeWrap
	height 30px
	margin-top 30px
	.imgSize
		display inline-block
		line-height 20px
		margin-left 130px
		font-size 14px
		color #333
.el-radio
  line-height inherit
</style>
