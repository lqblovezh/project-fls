<script>
// import * as services from "services/x-publish/readingListening"
import Info from './info'
import Tab from '../release/tab'
import Audio from '../release/audio'
import Group from '../release/group'
import Resource from '@/components/common/Resource'
import ContentDetail from '../release/contentDetail'
import Knowledge from '../theme/knowledge'
import {_themeDetail} from 'services/x-publish/theme'
import {getTask} from "services/common"

export default {
  components: {
    Info,
    Tab,
    Resource,
    ContentDetail,
    Audio,
    Group,
    Knowledge,
  },
  props: {
    type: String,
    detailData: Object,
    detailDialog: Boolean,
    services: Object,
    media:{
      type: Number,
      default: 1,
    },
    defaultData: Object,
    readOnly: Boolean,
  },
  created() {
    this.curSoucesList = this.detailData&&this.detailData.constitute || this.defaultData&&this.defaultData.structure ||[]
    if(this.defaultData){
      this.defaultAList = this.defaultData.structure
    }
  },
  data() {
    return {
      resourceDialog: false,
      curSoucesList: [],
      infoDialog: false,
      infoData: null,
      metadata: [],
      currentItem: {},
      groupDialog: false,
      defaultAList: null,//默认听读
    };
  },
  computed: {

  },
  methods: {
    handleClick(tab, event) {
      this.activeName = tab.name
    },
    detail(item,type) {
      if(typeof(type) == 'object') {
        this.curSoucesList = item.children
        this.addVideo(item)
        return
      }
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
      this.resourceDialog = true
      log(type)
      this.resourceType = type
    },
    addSelcet(data) {
      this.$refs.group.update(data)
      this.curSoucesList = data
      this.resourceDialog = false
    },
    addVideo(item) { //新增组
      if(this.detailData&&!this.detailData.id) {
        return this.$message.error('请保存产品信息后再做添加')
      }
      if(!item){
        this.curSoucesList = []
      }
      this.currentItem = item||{}
      this.groupDialog = true
    },
    saveAudioOK() {//保存
      // this.getAudio()
      this.$refs.audio.getAudio()
      this.$emit('saveok')
    },
    async submitDetail() {
      const fenmian = this.$refs.info.$refs.fenmian.files[0]
      let flag = this.$refs.info.$refs.detailForm.valiAll()
      let info = this.$refs.info.information
      if (!flag) {
        return this.$message.error('请完善产品信息后再提交!')
      }
      if (!this.curSoucesList.length) {
        return this.$message.error('产品结构必传!')
      }
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (fenmian) {
          await getTask(fenmian).then(res => {
            info.img = res.data.path
          })
        }
        if (!info.img) {
          return this.$message.error('请上传封面!')
        }
        // log({
        //   id:this.detailData.id,
        //   ...info,
        //   constitute: this.curSoucesList
        // })
        await this.services.save({
          id: this.detailData.id,
          ...info,
          constitute: this.curSoucesList,
          attributes:{xRead:this.$refs.info.retailers},
          pro_attributes: this.$refs.info.metadata,
        }).then(res => {
          this.$message.success('保存成功')
          loading.close()
          this.$emit('saveok', res.data)
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
	Group(
    :item='currentItem'
    :detailData="detailData"
    :groupDialog.sync="groupDialog"
    :onlyShow="readOnly"
    :isMedia="media"
    v-if="groupDialog"
    ref="group"
    @open="openResources"
    @detail="detail"
    @del="del"
    @save="saveAudioOK"
  )
	el-tabs( :value="type")
		//- 产品信息
		el-tab-pane( label="产品信息" name="info")
			Info(
        :detailData='detailData'
        ref="info"
        @close="$emit('update:detailDialog',false)"
        @saveok="(data) => $emit('saveok',data)"
        :services="services"
        :readOnly="readOnly"
        :defaultData="defaultData"
      )
		//- 产品结构
		el-tab-pane( label="产品结构" name="structure")
			Audio(:detailData="detailData" @detail='detail' :defaultData="defaultAList" @del='del' ref="audio" :media="media" :readOnly="readOnly")
			el-button(type="primary" @click="addVideo()" size="small" v-if="!readOnly") 新增组
		el-tab-pane( label="知识点" name="Knowledge" v-if="media==1")
			Knowledge(:detailData="detailData" :readOnly="readOnly" :defaultData="defaultData" @saveok="$emit('saveok')")

</template>


<style lang="stylus" scoped>
.btns
  padding 20px 0
  text-align right
</style>
