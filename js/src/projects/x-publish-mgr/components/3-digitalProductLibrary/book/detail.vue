<script>
import Add from './addConstitue'
import Knowledge from '../theme/knowledge'
import Info from '../theme/info'

import {
  recursionTree
} from '@/util/math.js'
import * as commonServices from "services/common"
import * as services from "services/x-publish/digitalbooks"
import {synchronization} from 'services/common'
import * as themeServices from 'services/x-publish/theme'


export default {
  components: {
    Add,
    Knowledge,
    Info
  },
  props: ['type', 'detailData', 'detailDialog'],
  created() {
    if (this.detailData && this.detailData.id) {
      log("查询元数据, 目录 , 数据本地化")
      services.detailDigitalBook({
        id: this.detailData.id
      }).then(res => {
        log(res)
        this.detailDataOwn = res.data
        this.metadata = res.data.attributes || []
      })
    } else {
      this.metadata = this.detailDataOwn.attributes;
    }
  },
  data() {
    return {
      detailDataOwn: {
        img_status: false,
        attributes: [],
        constitute: [],
      },
      metadata: [ //扩展属性
      ],
      ml: null, //目录
      defaultProps: { //目录显示的字段
        children: 'children',
        label: 'name'
      },
      currMulu: null, // 当前点击的目录
      previewImgUrl: null, // 图片预览
      imgUrl: null, // 图片上传后的真实url
      currType: '1', // 4种之一
      checkedAll: false,
      detailAddDialog: false,
      infoDialog: false, //详情模态框
      infoValue: 'info',
      infoData: {}, //详情数据
    };
  },
  methods: {
    test2() {},
    syncInfo(item) { //同步信息
      synchronization({
        id: item.b_id ? item.b_id : item.id
      }).then(res => {
        res.data.constitute = this.detailDataOwn.constitute;
        this.detailDataOwn = res.data;
        this.metadata = this.detailDataOwn.attributes;
      }).catch(({
        payload
      }) => {
        this.$message.error(payload.messages[0])
      })
    },
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleNodeClick(data, node, obj) { // 目录节点节点事件
      this.currMulu = node.data.children
    },
    muluSort(item, index, type) {
      var currMulu = this.currMulu
      if (type === 'up') {
        if (index > 0) {
          currMulu.splice(index, 1, )
          currMulu.splice(index - 1, 0, item)
        }
      } else {
        currMulu.splice(index, 1, )
        currMulu.splice(index + 1, 0, item)
      }
      log('发送请求', type)
    },
    addMetadata() { //新增扩展属性
      this.metadata.push({
        key: '',
        value: ''
      })
    },
    delMetadata(index) { //删除扩展属性
      this.metadata.splice(index, 1)
    },

    async submitDetail(formName) {
      var flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return
      }
      var progress = this.$progress();
      try {
        if (this.imgFile) {
          await commonServices.getTask(this.imgFile).then(res => {
            this.detailDataOwn.img = res.data.path
          })
        }
        if (this.detailData) {
          await services.modify({ ...this.detailDataOwn,
            id: this.detailData.id
          })
        } else {
          await services.add(this.detailDataOwn)
        }
        this.$emit('detailBack', true)
      } catch (error) {
        this.$message.error("上传出错!")
      }
      this.$emit('detailBack', true)
      progress.close();
    },


    submitMetadata() { // 提交扩展属性

    },
    previewImg(e) { //预览图
      var node = e.target;
      var file = node.files[0];
      this.imgFile = file;
      this.previewImgUrl = URL.createObjectURL(file);
    },
    sortByType(item, index, direction) {
      log(item, index, direction)
      // 判断方向  找以该index前后的第一个同类型
      var c = this.detailDataOwn.constitute;
      var changeIndex = null;
      var flag = true;
      var tempIndex = index;
      if (direction == 'up') {
        //从0- index 倒序查找
        while (flag) {
          --tempIndex;
          if (!c[tempIndex]) {
            flag = false;
            break
          }
          if (c[tempIndex].type === item.type) {
            flag = false;
            var changeIndex = tempIndex;
          }
        }
        log(changeIndex, index)
      } else {
        //从 index-length  倒序查找
        while (flag) {
          tempIndex++;
          if (!c[tempIndex]) {
            flag = false;
            break
          }
          if (c[tempIndex].type === item.type) {
            flag = false;
            var changeIndex = tempIndex;
          }
        }
      }
      if (changeIndex !== null) { //交换
        log("change", c[changeIndex], c[index])
        var temp = c[changeIndex];
        // c[changeIndex] = c[index] ;
        // c[index] = temp ;
        // [c[changeIndex] ,  c[index] ] =  [ c[index] , c[changeIndex] ]
        // this.detailDataOwn.constitute = JSON.parse(JSON.stringify(c)) ; // vue不能检查数组的顺序变化, 只能赋值新数组
        c.splice(changeIndex, 1, c[index])
        c.splice(index, 1, temp)
      }
      log(this.detailDataOwn.constitute)
    },
    changeCurrType(type) {
      this.currType = type
    },
    addback(obj) { //增加返回
      var arr = obj.arr
      this.detailAddDialog = false;
      log("返回", obj)
      var constitute = this.detailDataOwn.constitute;
      var i = false;
      constitute.forEach((item, index) => {
        if (item.type == '1') {
          i = index;
        }
      })

      if (obj.book) { //有书加进来
        if (i !== false) { // 本来有书
          constitute[i] = obj.book
        } else { // 没书
          log("没书")
          arr.push(obj.book)
        }
      }
      log(arr);
      this.detailDataOwn.constitute = constitute.concat(arr);
      log('this', this.detailDataOwn.constitute);

      // this.detailDataOwn.constitute.push(...arr);
      // id 相同 ,
    },
    setTop() { //置顶
      let ids = this.getChecked("idsConstitute");
      if (!ids) return
      let c = this.detailDataOwn.constitute;
      var temp = [];
      ids.forEach(item => {
        temp.push(c[item]);
        c[item] = null;
      })
      temp.reverse();
      this.detailDataOwn.constitute = temp.concat(c).filter(i => i);
    },
    delConstitute(index) {
      var c = this.detailDataOwn.constitute;
      c.splice(index, 1)
    },
    delConstituteAll() {
      var ids = this.getChecked("idsConstitute")
      if (!ids) return
      log(ids)
      var c = this.detailDataOwn.constitute
      ids.forEach(item => {
        c[item] = null;
      })
      this.detailDataOwn.constitute = c.filter(item => item)
    },
    getChecked(refName) {
      if (refName == undefined) {
        throw new Error("获取选中,请先传入ref")
      }

      var ids = []
      this.$refs[refName].forEach(item => {
        if (item.checked) {
          ids.push(item.value)
        }
      })
      if (ids.length > 0) {
        return ids
      } else {
        this.$message.error("请先选中")
        return false;
      }
    },
    infoHandleClick(tab) {
      this.infoValue = tab.name
    },
    bookDetailInfo(item, type, Ptype) { //详情内的详情&扩展属性
      const {
        id,
        c_id,
      } = item
      themeServices._themeDetail({
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
  },
};
</script>

<template lang="pug">
.div
	.dialogs
		el-dialog(
			:visible.sync="infoDialog"
			width="1000px"
			append-to-body
			)
			.header(slot="title")
				Info(
					:type="infoValue"
					:infoDialog="infoDialog"
					:infoData='infoData'
					@infoClick='infoHandleClick'
				)
			div(slot="footer" class="dialog-footer")
				el-button(type="info" @click="infoDialog = false" ) 取消
		//- 添加
		el-dialog(
			:center="false"
			:visible.sync="detailAddDialog"
			:close-on-click-modal="false"
			top="50px"
			width="1000px"
			append-to-body
			title="添加"
			)
				Add( v-if="detailAddDialog"
					@cancleBack="detailAddDialog = false"
					@addback="addback"
					:type="currType"
					:detailId="detailDataOwn.id"
					:constitute="detailDataOwn.constitute")
	el-tabs( :value="type" @tab-click="handleClick")
		//- 详情
		el-tab-pane( label="详情" name="info")
			.div
				VaForm( ref="detailForm"  )
					form.detailForm
						.group
							.label *名称:
							input.form-control( v-va="{ type:'required' }"  v-model="detailDataOwn.name"   type="text" )
						TypeMsg(:detailDataOwn="detailDataOwn" name="阅读")
						.group
							.label 作者:
							input.form-control(    v-model="detailDataOwn.author"    type="text" )
						.group
							.label 标签:
							input.form-control( v-model="detailDataOwn.tag"   type="text"  )
						.group
							.label 简介:
							textarea.textarea(  v-model="detailDataOwn.abs"   type="text"  )
						.group
							.label 设置封面:
							el-button(size="mini" type="primary" @click="$refs.fenmian.click()") 导入
							input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
						.group
							.label
							img.previewImgUrl(:src="previewImgUrl || detailDataOwn.img_src")
				.group.constiuteGroup
					.label 图书构成:
					span.constiute
						span.li(@click="changeCurrType('1')" :class="{isCurrType: currType == '1' }"  ) 阅读
						span.li(@click="changeCurrType('3')" :class="{isCurrType: currType == '3' }") 图片
						span.li(@click="changeCurrType('4')" :class="{isCurrType: currType == '4' }" ) 音频
						span.li(@click="changeCurrType('5')" :class="{isCurrType: currType == '5' }")  视频
					.btns
						el-button( @click="setTop"   type="primary" plain size="mini") 置顶
						el-button(  @click="delConstituteAll"   type="primary" plain size="mini") 移除
						el-button(@click="detailAddDialog=true"    type="primary" plain size="mini") 添加
				.tableWrap(v-if="detailDataOwn")
					table.table
						thead
							tr
								th.table-check
									input(type="checkbox"   @click="checkedAll = !checkedAll")
								th 标签
								th 类型
								th 创建时间
								th(v-show="currType != '1' ") 调序
								th 操作
						tbody( )
							tr(v-for="(item,index) in detailDataOwn.constitute"   v-if="item.type == currType")
								th
									input(type="checkbox"  :checked="checkedAll" :value="index" name="ids"   ref="idsConstitute"  )
								th
									.th-name {{item.name}}
								th
									.th-name {{item.type_name}}
								th
									.th-name {{item.create_time}}
								th(v-show="currType != '1' ")
									.icon.el-icon-sort-up( @click="sortByType(item, index , 'up')"   icon="el-icon-sort-up" size="mini")
									.icon.el-icon-sort-down( @click="sortByType(item, index , 'down')"  icon="el-icon-sort-down" size="mini")
								th
									.th-name
										.icon.icon-sync(size="mini" v-if="item.type == '1'" title="同步信息"  @click="syncInfo(item)" type="primary"  plain  )
										.icon.icon-detail(size="mini"  @click="bookDetailInfo(item,item.type,'info')" title="详情" type="primary"  plain  )
										.icon.icon-data(size="mini"  @click="bookDetailInfo(item,item.type,'data')" title="扩展属性" type="primary"  plain  )
										.icon.icon-delete(size="mini"  @click="delConstitute(index)"  type="primary" title="删除"  plain  )
			.btns
				el-button( @click=" $emit('update:detailDialog', false)" type="info") 取消
				el-button(@click="submitDetail('detailForm')" type="primary" ) 确定
		//- 扩展属性
		el-tab-pane( label="扩展属性" name="data" )
			MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)" )
			//- .meta
			//-   include ../../common/pug/meta
			//- 知识点
			el-tab-pane( label="知识点" name="ml" v-if="detailData")
				Knowledge(:detailId="detailData.id"  :detailData="detailData"  @knowback="$emit('update:detailDialog', false) " )
</template>


<style lang="stylus" scoped>
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
.isCurrType
  color #44c3aa
.constiute
  .li
    display inline
    padding 0 10px
    cursor pointer
    text-align center
  .li+.li
    border-left 1px solid #e3e3e3
.constiuteGroup
  .btns
    float right
</style>
