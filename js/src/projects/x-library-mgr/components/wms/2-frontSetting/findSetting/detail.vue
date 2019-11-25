<script>
import { getTask } from 'services/common'
import * as services from 'services/x-library/fondSetting'
import Resource from '@/components/common/Resource'

export default {
  props: ['detailData'],
  components: { Resource },
  data() {
    return {
      currentRef: null,
      detailDate: {
        img_src: null,
        src: null,
        name: null,
        book_id: '',
        link: '',
      },
      resourceDialog: false,
      list: [],
      id: 100000,
    }
  },
  created() {
    this.list = this.detailData.childrens || []
    this.detailDate = this.detailData
  },
  methods: {
    update(e) {
      console.log(this.currentRef)
      getTask(e.target.files[0]).then(res => {
        if (this.currentRef) {
          let index = this.list.findIndex(item => item.id === this.currentRef)
          this.$set(this.list[index], 'img_src', res.data.url)
          this.$set(this.list[index], 'src', res.data.path)
        } else {
          this.$set(this.detailDate, 'img_src', res.data.url)
          this.$set(this.detailDate, 'src', res.data.path)
        }
      })
    },
    updateImg(ref) {
      this.currentRef = ref
      this.$refs.updateImg.click()
    },
    add() {
      this.id += 1
      this.list.push({
        act: 'add',
        name: '',
        link: '',
        src: '',
        book_id: '',
        id: this.id,
      })
    },
    save() {
      let list = [...this.list]
      list.forEach(item => {
        if (item.act == 'add') {
          item.id = null
        }
      })
      let data = {
        ...this.detailDate,
        childrens: this.list,
      }
      console.log(data)
      services.save(data).then(res => {
        this.$emit('saveOk')
      })
    },
    openResources(ref) {
      this.currentRef = ref
      this.resourceDialog = true
    },
    addSelcet(data,arr) {
      this.resourceDialog = false
      if (this.currentRef) {
        let index = this.list.findIndex(item => item.id === this.currentRef)
        this.$set(this.list[index], 'book_id', arr[0].product_id)
      } else {
        this.$set(this.detailDate, 'book_id', arr[0].product_id)
      }
    },
  },
}
</script>
<template lang="pug">
.div
	Resource(
		v-if="resourceDialog"
		:resourceDialog.sync="resourceDialog"
		:curSoucesList="[]"
    :singleElection="false"
		@select="addSelcet"
	)
	.top
		span 首部
		.left
			el-input(placeholder="文章标题" v-model="detailDate.name")
			el-input(placeholder="链接设置" v-model="detailDate.link")
			span(v-text="detailDate.book_name")
			el-button(type="primary" @click="openResources()" size="small" plain) 选择本地资源
		.right
			img.img(:src="detailDate.img_src" ref="mainImage")
			el-button(type="primary" @click="updateImg()" size="small" plain) 上传
	.bottom
		span 次级
		.box
			.list(v-for="item in list")
				.left
					el-input(placeholder="文章标题" v-model="item.name")
					el-input(placeholder="链接设置" v-model="item.link")
					span(v-text="item.book_name")
					el-button(type="primary" @click="openResources(item.id)" size="small" plain) 选择本地资源
				.right
					img.img(:src="item.img_src" :ref="item.id")
					el-button(type="primary" @click="updateImg(item.id)" size="small" plain) 上传
		.btn
			el-button(type="primary" @click="add()" class="el-icon-plus" size="small") 增加次级
	.btns
		input.hide(type="file" @change="update($event)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
		el-button(type="primary" @click="save()" ) 保存
</template>

<style lang="stylus" scoped>
.btns
  text-align center
.div
  margin-top 20px
  background #fff
  .top
    border-bottom 1px solid #ddd
    padding-bottom 20px
  .top, .bottom
    height auto
    margin-bottom 20px
    .left, .right, .box
      display inline-block
      margin-right 40px
      span
        font-size 14px
        margin-right 20px
        color #666
    .list
      border-bottom 1px solid #ddd
      padding-top 20px
      padding-bottom 20px
      &:first-child
        padding-top 0
      &:last-child
        border none
    .img
      width 250px
      height 100px
      margin-right 40px
      object-fit contain
    .el-input
      width 200px
      margin 0
      margin-bottom 20px
      display block
    span
      font-size 18px
      color 333
      line-height 30px
</style>
