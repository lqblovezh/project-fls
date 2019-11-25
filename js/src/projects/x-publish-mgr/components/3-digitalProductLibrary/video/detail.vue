<script>
import * as services from "services/x-publish/visualReading"
import Info from './info'
import Tab from '../release/tab'
import Resource from '@/components/common/Resource'
import Knowledge from '../theme/knowledge'
import {_themeDetail} from 'services/x-publish/theme'
import ContentDetail from '../release/contentDetail'
import {getTask} from "services/common"

export default {
  components: {
    Info,
    Tab,
    Resource,
    ContentDetail,
    Knowledge,
  },
  props: {
    type: String,
    detailData: Object,
    detailDialog: Boolean,
    defaultData: Object,
    readOnly: Boolean,
  },
  created() {
    this.curSoucesList = this.detailData&&this.detailData.constitute || this.defaultData&&this.defaultData.structure ||[]
  },
  data() {
    return {
      resourceDialog: false,
      curSoucesList: [],
      infoDialog: false,
      infoData: null
    };
  },
  computed: {

  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    detail(item) {
      this.bookDetailInfo(item, item.type)
    },
    del(item) {
      let index = this.curSoucesList.findIndex(v => v.id === item.id)
      if (index > -1) {
        this.curSoucesList.splice(index, 1)
      }
    },
    bookDetailInfo(item, type) { //详情内的详情
      const {
        id,
        c_id,
      } = item
      _themeDetail({
        c_id,
        id,
        type,
      }).then(res => {
        this.infoData = res.data
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
    openResources(type) {
      if(this.detailData&&!this.detailData.id) {
        return this.$message.error('请保存产品信息后再做添加')
      }
      this.resourceDialog = true
      this.resourceType = type
    },
    addSelcet(data) {
      services.add({
        product_id: this.detailData.id,
        constitutes: data,
      }).then(res => {
        this.curSoucesList = data
        this.resourceDialog = false
      }).catch(({payload}) => {
        this.$message.error('添加失败')
      })
    },
    async submitDetail() {
      const fenmian = this.$refs.info.$refs.fenmian.files[0]
      let flag = this.$refs.info.$refs.detailForm.valiAll()
      let info = this.$refs.info.information
      if (!flag) {
        return this.$message.error('请完善产品信息后再提交!')
      }
      // if (!this.curSoucesList.length) {
      //   return this.$message.error('产品结构必传!')
      // }
      let loading = this.$loading({text:"正在上传" , background:"rgba(0, 0, 0, 0.8)"})
      try {
        if (fenmian) {
          await getTask(fenmian).then(res => {
            info.img = res.data.path
          })
        }
        if (!info.img) {
          loading.close()
          return this.$message.error('请上传封面!')
        }
        await services.save({
          id: this.detailData.id,
          ...info,
          // constitute: this.curSoucesList,
          attributes:{xRead:this.$refs.info.xRead},
          pro_attributes: this.$refs.info.metadata,
        }).then(res => {
          this.$message.success('保存成功')
          loading.close()
          this.$emit('saveok', res.data)
        })
      } catch ({payload}) {
        loading.close()
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
  },
};
</script>

<template lang="pug">
.div
	Resource(
		v-if="resourceDialog"
		:type="resourceType"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="curSoucesList"
		@select="addSelcet"
	)
	ContentDetail(
		:infoData="infoData"
		:infoDialog.sync="infoDialog"
		v-if="infoDialog"
	)
	el-tabs( :value="type")
		//- 产品信息
		el-tab-pane( label="产品信息" name="info")
			Info(:detailData='detailData' ref="info" :readOnly="readOnly" :defaultData="defaultData")
			.btns(v-if="!readOnly")
				el-button(@click="$emit('update:detailDialog',false)" type="info" ) 取消
				el-button(@click="submitDetail('detailForm')" type="primary") 保存
		//- 产品结构
		el-tab-pane( label="产品结构" name="structure")
			Tab(dataType="video" :defaultList="curSoucesList" :detailData="detailData" @detail='detail' @del='del' ref="video" :onlyShow="readOnly")
			el-button(type="primary" @click="openResources('5')" size="small" v-if="!readOnly") 新增
		el-tab-pane( label="知识点" name="Knowledge")
			Knowledge(:detailData="detailData" :readOnly="readOnly" :defaultData="defaultData" @saveok="$emit('saveok')")
	//- .btns(v-if="!readOnly")
	//- 	el-button(@click="$emit('update:detailDialog',false)" type="info" ) 取消
	//- 	el-button(@click="submitDetail('detailForm')" type="primary") 保存
</template>


<style lang="stylus" scoped>
.btns
  padding 20px 0
  text-align right
</style>
