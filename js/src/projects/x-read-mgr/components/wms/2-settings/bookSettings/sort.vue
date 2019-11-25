<script>
import * as services from 'services/x-read/cityClassSetting'
import {
  getTask
} from 'services/common'
import Nav from 'projects/x-read-mgr/components/wms/2-settings/bookSettings'
export default {
  components: {
    Nav
  },
  data() {
    return {
      services,
      list: [], //所有分类
      openStation: 0, //默认展架分类
      top: { //顶级分类
        list: [],
        value: '',
      },
      addSortValue: "", //分类名称
      currentId: null,
    }
  },
  created() {
    this.getList()
    this.getTop()
  },
  methods: {
    getList() { //书城分类列表
      this.services.getList().then(res => {
        this.list = res.data
      })
    },
    getTop() { //书城获取顶级分类
      this.services.top().then(res => {
        this.top.list = res.data
      })
    },
    handleChange(index) {
      if (this.openStation == index) {
        this.openStation = -1
      } else {
        this.openStation = index
      }
    },
    add() { //添加分类
      if (!this.addSortValue) {
        return this.$message.error('请输入分类名称')
      }
      this.services.add({
        name: this.addSortValue,
        img: '',
        pid: this.top.value,
      }).then(res => {
        this.addSortValue = ''
        this.top.value = ''
        this.getList()
        this.$message.success('添加成功')
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    changeNum(id, ev) { //修改排序
      this.services.modify({
        id,
        number: ev.target.value,
      }).then(res => {
        this.$message.success('修改成功')
        this.getList()
      }).catch(({
        payload
      }) => {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    delChoosen(id) { //删除或多个单个
      let ids = [];
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked();
        if (!ids) {
          return
        }
      }
      this.$confirm("是否删除？")
        .then(_ => {
          this.services.del({
            id: ids
          }).then(res => {
            this.getList()
          }).catch(({
            payload
          }) => {
            for (let i in payload.messages) {
              this.$message.error(payload.messages[i])
              break
            }
          })
        })
        .catch(_ => {})
    },
    checkAll(e, id) {
      let type = e.target.checked
      if (id) {
        let box = document.getElementById(id)
        box.querySelectorAll('input').forEach(item => {
          item.checked = type
        })
      } else {
        Array.from(document.querySelectorAll(".checkbox")).forEach(item => {
          item.checked = type
        })
      }
    },
    imageUp(id) {
      this.$refs.fenmian.click()
      this.currentId = id
    },
    async previewImg(e) { //图片上传
      let node = e.target
      let file = node.files[0]
      await getTask(file).then(res => {
        log(res)
        this.services.modify({
          id: this.currentId,
          img: res.data.path,
        }).then(res => {
          this.$message.success('修改成功')
          this.getList()
        })
      })
    },
  },
};
</script>


<template lang="pug">
div
	Nav
	.content
		.info
			img(src="../../../../static/images/settings/u2001.png")
			span 一级分类可更换图片
		.sort_top
			span.selectAll
				input(type="checkbox" @change="checkAll")
				span 全部
			span.selectDel 批量操作:
			el-button(size="mini" style="margin-left:20px;" type="danger" @click="delChoosen()" plain) 删除
		.box
			dl.head
				dd 设置分类
				dd 一级分类图片
				dd 排序
				dd 下级分类
			dl(v-for="(item,index) in list")
				dd
					.first
						input.checkbox(type="checkbox" @click='checkAll($event,item.id)' ref="ids" :value="item.id")
						span {{item.name}}
						.second(v-show='item.children.length>0 &&  openStation == index' :id="item.id")
							p(v-for='vo in item.children')
								input.checkbox(type="checkbox" name="ids" ref="ids" :value="vo.id")
								span {{vo.name}}
				dd
					img.bookCover.src(:src="item.img_src||'./static/images/settings/u2909.png'"  @click='imageUp(item.id)')
					p.imgSize
						span.bannerSize 建议图片大小:50*70px
				dd
					.first
						input( :value='item.number' type='text' min='1' @change='changeNum(item.id,$event)')
						.second(v-if='item.children.length>0 &&  openStation == index')
							p(v-for='(vo,i) in item.children')
								input( :value='vo.number' type='text' min='1' @change='changeNum(vo.id,$event)')
				dd
					.first
						span(v-text="item.children.length+'项'")
						p.solwDown(@click='handleChange(index)' :class="{active:openStation == index}")
							i.el-icon-caret-bottom
			.add
				el-form(ref="form" label-width="60px")
					el-form-item(label='新增 : ')
						el-input(placeholder="请填写分类名称" style='width:200px;margin-right:10px;' v-model='addSortValue')
						el-select(placeholder="请选择一个上级分类" v-model="top.value" style='margin-right:10px;' clearable)
							el-option(v-for="(item,i) in top.list"  :key='item.id'   :label="item.name" :value="item.id")
						el-button(type='primary' @click='add()') 新增
			input.hide(type="file"  ref="fenmian" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
			input.hide(name="img" type="text")
</template>


<style lang="stylus" scoped>

input[type="text"]
  width 40px
  text-align center
input[type="checkbox"]
  position relative
.bookCover
  cursor pointer
  max-width 100px
  max-height 70px
  min-width 50px
  min-height 50px
  box-shadow 0 0 2px 1px #b7b7b7
  margin 10px
.content
  padding-left 16px
  .info
    color #999999
    font-size 12px
    padding 20px 0
    span
      vertical-align sub
      padding-left 5px
  .sort_top
    line-height 30px
    border-bottom 0.5px solid #999
    font-size 12px
    text-align center
    padding-bottom 10px
    .selectAll
      line-height 30px
      float left
      input[type="checkbox"]
        top 2px
    .del
      color #f56c6c
  .box
    font-size 12px
    color #333
    overflow hidden
    padding 10px 0
    dl.head
      line-height 40px
    dl
      overflow hidden
      border-bottom 1px solid #999
      dd
        float left
        width 25%
      .first
        padding 20px 0
        line-height 20px
        .solwDown
          cursor pointer
          display inline-block
          width 20px
          height 20px
          font-size 20px
          margin-left 10px
          transition all .5s
          &.active
            transform rotate(180deg)
        .second
          padding 10px 0 10px 20px
          p
            padding 10px 0
  .add
    padding 20px 0
	.imgSize
		margin-bottom 5px
		.bannerSize
			font-size 12px
			color #333
</style>
