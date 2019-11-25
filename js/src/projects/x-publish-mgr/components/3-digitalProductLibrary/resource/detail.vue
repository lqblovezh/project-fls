<script>
import VaForm from '@/components/common/VaForm'

import {getTask} from 'services/common'
import * as services from 'services/x-publish/resource'
import formSerialize from "form-serialize"
import Resource from '@/components/common/Resource'
import Info from '../theme/info'

export default {
	props: ['type', 'detailData', 'detailDialog', 'defaultData', 'readOnly'],
	components: {Resource,VaForm,Info},
  data() {
    return {
      detail: {
        constitute: [],
      }, //详情
      previewImgUrl: null, //图片预览
      imgUrl: null, //图片上传后的真实url
      resourceDialog: false, //添加模态框
      infoDialog: false, //详情模态框
      infoData: {}, //详情数据
      dataList: {}, //图书所有列表
      infoValue: 'info',
      isShowAuthor: false,
      chocesArray: [],
    };
  },
  created() {
    this.detail = {...this.detailData,...this.defaultData}
  },
  methods: {
    getDetail() { //获取详情数据
      services.getInfo({
        id: this.detailData.id
      }).then(res => {
        this.detail = res.data
        this.previewImgUrl = res.data.img_src
        this.imgUrl = res.data.path
        this.detail.img = res.data.path
        this.detail.constitute = res.data.constitute
        this.chocesArray = [...res.data.constitute]
        log(11111,this.chocesArray)
      })
    },
    async submitDetail() { //详情数据提交
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        log("验证失败")
        return
      }
      let fenmian = this.$refs.fenmian.files[0]
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (fenmian) { //先处理封面 线上传图片文件, 得到返回结果后 ,  再提交整个表单
          await getTask(fenmian).then((res) => {
            this.detail.img = res.data.path
          })
        }
        await services.save(this.detail).then(res => {
          this.$emit('saveok')
        })
        this.$nextTick(() => { //以服务的方式调用的 Loading 需要异步关闭
          loading.close()
          this.$emit('update:detailDialog', false)
        })
      } catch ({
        payload
      }) {
        loading.close()
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    previewImg(e) { //详情预览图
      let node = e.target;
      let file = node.files[0];
      this.previewImgUrl = URL.createObjectURL(file);
    },
    delDetail(id = [], type) { //详情移除
			const data = {}
      const parent = this.$refs.detailForm.$el
      const list = parent.querySelectorAll("[name='ids']:checked")
      if (!id.length) {
        list.forEach(item => {
          data[item.value] = item.getAttribute('data-type')
          id.push(item.value)
        })
      } else {
        data[id] = type
      }
      if (!id.length) {
        return this.$message.error('请确认你要移除的内容！');
      }
      id.forEach(item => {
        let index = this.detail.constitute.findIndex(items => items.c_id == item || items.id == item)
        let index_choce = this.chocesArray.findIndex(items => items.c_id == item || items.id == item)
        if (index > -1) {
          this.detail.constitute.splice(index, 1)
        }
        if(index_choce>-1) {
          this.chocesArray.splice(index, 1)
        }
      })
      parent.querySelectorAll("input[type='checkbox']").forEach((item) => {
        item.checked = false
      })
    },
    async detailAddHandle() { //详情添加
      this.resourceDialog = true
    },
    bookDetailInfo(item, type, Ptype) { //详情内的详情&扩展属性
      this.isShowAuthor = type != '1'
      const {
        id,
        c_id,
      } = item
      if(!services._themeDetail){
        this.infoData = item
        this.infoValue = Ptype
        this.infoDialog = true
        return
      }
      services._themeDetail({
        c_id,
        id,
        type,
      }).then(res => {
        this.infoData = res.data
        this.infoValue = Ptype
        this.infoDialog = true
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    addSelcet() { //添加选中
      this.detail.constitute = [...this.chocesArray]
      this.resourceDialog = false
    },
    infoHandleClick(tab) {
      this.infoValue = tab.name
    },
  },
};
</script>

<template lang="pug">
.div
	//- 详情
	el-dialog(
		:visible.sync="infoDialog"
		width="1000px"
		top="50px"
		append-to-body
		)
		.header(slot="title")
			Info(
				:type="infoValue"
				:infoDialog="infoDialog"
				:isAuthor="isShowAuthor"
				:infoData='infoData'
				@infoClick='infoHandleClick'
			)
		div(slot="footer" class="dialog-footer")
			el-button(type="info" @click="infoDialog = false" ) 取消
	Resource(
		v-if="resourceDialog"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="chocesArray"
    :isShowType="true"
		@select="addSelcet"
	)
	el-tabs( :value="type||'info'" )
		//- 详情
		el-tab-pane( label="详情" name="info")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm
						.group
							.label *资源名称:
							input.form-control( v-va="{ type:'required' }" v-model="detail.name" vali="" name="name" type="text" :disabled="readOnly")
						.group
							.label *授权价格:
							input.form-control( v-va="{ type:'required' }" v-model="detail.price" name="price"  type="text" :disabled="readOnly")
						.group
							.label *简介:
							textarea.textarea( v-va="{ type:'required' }" :maxlength="$config.ABS_MAX_LENGTH" v-model="detail.abs" name="abs" type="text" :disabled="readOnly")
							span(v-if="!readOnly" style="vertical-align:bottom;color:#606266;font-size:12px") 您还可以输入{{$config.ABS_MAX_LENGTH-(detail.abs?detail.abs.length:0)}}
						.group
							.label *设置封面:
							el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.fenmian.click()" v-if="!readOnly") 上传
						.group.fenmian
							.label.fenmain
							img.previewImgUrl(:src="previewImgUrl||detail.img_src"  alt="暂无图片")
							input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
							input.hide(name="img" type="text" :value="imgUrl" )
						p.imgSizeWrap
							span.imgSize 建议图片大小：118*160px
						.group
							.label 构成:
							.btn-right(v-if="!readOnly")
								el-button(@click="delDetail()" type="primary" size="mini" plain) 移除
								el-button(@click="detailAddHandle()" type="primary" size="mini" plain) 添加
						.group
							table.table.border(width="100%")
								thead
									tr
										th(width=55)
											input(type="checkbox" name="checkAll" @click="$checkAll($event)")
											span 全选
										th 名称
										th 标签
										th 类型
										th(width=100) 操作
								tbody
									tr(v-for="item,index in detail.constitute")
										td
											input(type="checkbox" name="ids" :value="item.id" ref="ids" :data-type='item.type')
										td
											div.th-name(:title="item.name") {{item.name}}
										td {{item.tag}}
										td {{item.type_name}}
										td
											Icon(@click="bookDetailInfo(item,item.type,'info')" title="详情" type="icon-detail" size="mini" plain)
											Icon(@click="delDetail([item.c_id||item.id],item.type)" title="移除" v-if="!readOnly" :data-id="item.c_id" type="icon-delete" size="mini" plain)
			.btns(v-if="!readOnly")
				el-button( type="info" @click="$emit('update:detailDialog', false)" ) 取消
				el-button(@click="submitDetail" type="primary") 确定
</template>


<style lang="stylus" scoped>

.btn-right
  display inline-block
  float right
.btns
  text-align right
.imgSizeWrap
	height 30px
	margin-top 30px
	.imgSize
		display inline-block
		line-height 20px
		margin-left 130px
		font-size 14px
		color #333
.previewImgUrl
  max-width 300px
  max-height 180px
.textarea
	resize  none
.form-control
	width 50%
</style>
