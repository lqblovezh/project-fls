<script>
import * as services from 'services/x-read/btnSetting'
import { getTask } from 'services/common'
import Nav from 'projects/x-read-mgr/components/wms/2-settings/indexSettings'
export default {
  components: {
    Nav,
  },
  data() {
    return {
      block: [],
      new_index: [],
      dialogVisible: false,
      iconImg: '',
      src_img: '',
      status: '',
      addlist: {
        name: '',
        img: '',
        number: '',
        src: '',
        src_status: false,
        type: '',
        status: false,
        id: '',
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      services.getList().then(res => {
        this.block = res.data.block
        this.new_index = res.data.new_index
        if (this.block[0]['status'] == 'true') {
          this.status = 2
        } else {
          this.status = 1
        }
      })
    },
    update(type, index, num) {
      this.addlist.type = num
      let _this = this[type][index]
      this.src_img = _this['img_src']
      this.addlist.name = _this['name']
      this.addlist.src = _this['src']
      this.addlist.id = _this['id']
      if (_this.src_status) {
        this.addlist.src_status = true
      } else {
        this.addlist.src_status = false
      }
      if (num == this.status) {
        this.addlist.status = true
      } else {
        this.addlist.status = false
      }
      this.addlist.number = _this['number']
      this.dialogVisible = true
    },
    previewImg(e) {
      let node = e.target
      let file = node.files[0]
      this.src_img = URL.createObjectURL(file)
    },
    add(type) {
      this.addlist.type = type
      this.src_img = ''
      this.addlist.name = ''
      this.addlist.src = ''
      this.addlist.id = null
      this.addlist.num = ''
      this.dialogVisible = true
      this.addlist.type = 3
    },
    async save() {
      log(this.addlist)
      const icon = this.$refs.icon.files[0]
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      try {
        if (icon) {
          await getTask(icon).then(res => {
            this.addlist.img = res.data.path
          })
        }
        setTimeout(() => {
          loading.close()
        }, 500)
      } catch (a) {
        loading.close()
      }
      this.dialogVisible = false
      services.save(this.addlist).then(res => {
        this.getList()
      })
    },
  },
  watch: {
    status() {
      if (this.status == 1) {
        services.show({
          type: 1,
        })
      } else if (this.status == 2) {
        services.show({
          type: 2,
        })
      }
    },
  },
}
</script>


<template lang="pug">
div
	Nav
	.content
		.box
			.item(v-for="(item,index) in new_index" @click='update("new_index",index,"1")')
				p.icon(:style="{backgroundImage:`url(${item.img_src}`}")
					// img(:src="item.img_src" alt='圆形图标'  style="width:40px;")
				p.txt {{item.name}}
			div.add(v-if="!new_index.length")
				el-button(type='primary' @click='add')  添加图片
		el-dialog(title="" :visible.sync="dialogVisible" width="30%")
			span.dialog
				el-form(ref="form" label-width="80px")
					el-form-item(label='图标 : ')
						input.hide(type="file"  ref="icon" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
						img.icon(:src="src_img")
						el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.icon.click()" plain)  替换
					p.imgSize
						span.bannerSize 建议图片大小:126*126px
					el-form-item(label='名称 : ')
						el-input(v-model='addlist.name')
					el-checkbox.hide(v-model="addlist.src_status") 链接
					el-form-item(label='简介 : ')
						el-input(v-model="addlist.src")
					el-form-item(label='是否开启 : ')
						el-checkbox(v-model="addlist.status")
			span(slot="footer" class="dialog-footer")
				el-button(@click="dialogVisible = false") 取消
				el-button(type="primary" @click="save()") 确定
</template>


<style lang="stylus" scoped>
.content
  padding 0 16px
  min-width 800px
  .info
    color #999999
    font-size 12px
    padding 20px 0
    span
      vertical-align sub
      padding-left 5px
  .box
    padding 20px 0
    overflow hidden
    .item
      float left
      text-align center
      font-size 12px
      .icon
        display inline-block
        height 60px
        width 60px
        margin 0 22px
        background no-repeat center center
        background-size 80%
      .txt
        line-height 40px
  .line
    color rgba(255, 255, 255, 0)
    height 20px
    margin-bottom 40px
    border-bottom 1px solid #ccc
.btn
  color #fff
.dialog
  .icon
    padding 0 30px 0 5px
    max-height 50px
    max-width 50px
.imgSize
  margin-bottom 22px
.bannerSize
  font-size 14px
  color #333
  padding-left 10px
</style>
