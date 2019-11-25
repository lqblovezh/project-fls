<script>
import * as services from 'services/x-read/headerSetting'
import { getTask } from 'services/common'
import Nav from 'projects/x-read-mgr/components/wms/2-settings/bookSettings'
export default {
  components: {
    Nav,
  },
  data() {
    let checkName = (rule, value, callback) => {
      if (!/^[\u4E00-\u9FA5 0-9 A-Z a-z]+$/.test(value)) {
        return callback('模块名称只能是中文字母或数字')
      } else {
        callback()
      }
    }
    let checkImgSrc = (rule, value, callback) => {
      log(this.src_img, 111)
      if (!this.src_img) {
        return callback('未选择图标')
      } else {
        callback()
      }
    }
    return {
      list: [],
      underList: ['项目模板', '主题模板', '普通模板'],
      value: '',
      name: '添加',
      visible: true,
      dialogVisible: false,
      addlist: {
        name: '',
        id: '',
      },
      src_img: '',
      rules: {
        name: [
          {
            required: true,
            message: '模块名不能为空',
            trigger: 'change',
          },
          {
            validator: checkName,
            trigger: 'change',
          },
        ],
        src_img: [
          {
            validator: checkImgSrc,
            trigger: 'change',
          },
        ],
      },
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      services.getList().then(res => {
        this.list = res.data
        log(this.list, 111)
      })
    },
    previewImg(e) {
      let node = e.target
      let file = node.files[0]
      this.src_img = URL.createObjectURL(file)
    },
    up(index) {
      //向上移动一位
      services
        .sort({
          id: this.list[index]['id'],
          status: 'up',
        })
        .then(res => {
          this.getList()
          this.$message.success('上移成功')
        })
    },
    down(index) {
      //元素向下移动一位
      services
        .sort({
          id: this.list[index]['id'],
          status: 'down',
        })
        .then(res => {
          this.getList()
          this.$message.success('下移成功')
        })
    },
    update(index) {
      //初始化修改数据
      this.dialogVisible = true
      this.name = '修改'
      this.addlist['id'] = this.list[index]['id']
      this.addlist['name'] = this.list[index]['name']
      this.src_img = this.list[index]['img_src']
    },
    del(index) {
      //删除
      this.$confirm('你真的要删除吗？').then(() => {
        services
          .del({
            id: this.list[index]['id'],
          })
          .then(res => {
            this.getList()
          })
      })
    },
    add() {
      this.dialogVisible = true
      this.name = '添加'
      this.addlist['id'] = ''
      this.addlist['name'] = ''
      this.src_img = ''
    },
    async save() {
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
      } catch (a) {
        loading.close()
      }
      this.dialogVisible = false
      setTimeout(() => {
        loading.close()
      }, 500)
      services.save(this.addlist).then(res => {
        this.getList()
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.save()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
  },
}
</script>

<template lang="pug">
div
	Nav
	.content
		.info
			img(src="../../../../static/images/settings/u2001.png")
			span 系统自动显示前4个书城头部设置，排序4及以上的将会被隐藏。栏目名称限制为2-6个汉字以内。
		.list(v-for="(item,index) in list")
			div.item
				el-input.txtInput(v-model='item.name' :disabled="!item.id")
				span.txt
					a(href='javascript:' @click='item.id&&update(index)' :class="{decoration:!item.id}") {{item.id ? '修改': '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'}}
					img.iconc(:src="item.img_src")
				span.txt 顺序 :
					span.color1 ( {{index+1}} )
				span(v-if="item.id")
					img.icon.up(src='../../../../static/images/settings/u1971.png' alt='icon' @click="up(index)" v-if="index!=1")
					img.icon.down(src='../../../../static/images/settings/u1973.png' alt='icon' @click="down(index)" v-if="index!=list.length-1")
					img.icon(src='../../../../static/images/settings/u2238.png' alt='icon' @click="del(index)")
		el-button.add(type="text" @click="add")
			img(src="../../../../static/images/settings/u2236.png")
		el-dialog.dialog(:title="name" :visible.sync="dialogVisible" width="30%" )
			span
				el-form(:rules="rules" :model="addlist" ref='ruleForm' )
					el-form-item(label='模块' prop="name")
						el-input( placeholder='请写点什么...' v-model='addlist.name')
					el-form-item(prop="src_img")
						input.hide(type="file"  ref="icon" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
						img.icon(:src="src_img" style="max-width:200px")
						el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.icon.click()" plain)  上传
					p.imgSize
						span.bannerSize 建议图片大小:60*60px
				span(slot="footer" class="dialog-footer")
					el-button(@click="dialogVisible = false" style='margin-bottom:30px' ) 取消
					el-button(@click="submitForm('ruleForm')") {{name}}
</template>


<style lang="stylus" scoped>
.decoration
  text-decoration none
.content
  padding-left 16px
  .info
    color #999999
    font-size 12px
    padding 20px 0
    span
      vertical-align sub
      padding-left 5px
  .list
    .item
      margin-bottom 10px
      .txtInput
        width 200px
      .icon
        margin 7px 0 0 10px
      .iconc
        width 30px
        margin 10px 20px 0 60px
      .up
        transform rotate(90deg)
      .down
        transform rotate(-90deg)
      .txt
        font-size 14px
        line-height 44px
        padding 0 24px
        .color1
          color #287F77
          padding-left 10px
    .disable
      color #999
      opacity 0.6
      a
        color #999
.imgSize
  margin-bottom 20px
  padding 20px 0
    .bannerSize
      display inline-block
      font-size 14px
    color #333
</style>
