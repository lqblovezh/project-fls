<script>
import formSerialize from 'form-serialize'
import * as commonServices from 'services/x-publish/common'
import * as services from 'services/common/setting'
import { debounce } from 'lodash'
import { save, getInfo } from 'services/system/home'
import { getTask } from 'services/common/index'

export default {
  data() {
    return {
      info: {}, //当前平台
      previewImgUrl: null,
      list: [],
      id: 100000,
      data: {
        name: '',
        exp: '',
        logo: '',
        icon: '',
        setting: {
          banners: [
            {
              title: '',
              path: '',
              link: '',
            },
          ],
        },
      },
    }
  },
  created() {
    this.info = this.$config.plantInfo.publisher
    this.list = Object.entries(this.info.setting).length
      ? this.info.setting.banners
        ? this.info.setting.banners
        : []
      : []
  },
  methods: {
    update(e) {
      getTask(e.target.files[0]).then(res => {
        if (typeof this.currentRef == 'object') {
          let index = this.list.findIndex(
            item => item.id === this.currentRef.id
          )
          this.$set(this.list[index], 'path', res.data.path)
          this.$set(this.list[index], 'url', res.data.url)
        } else {
          this.info[this.currentRef] = res.data.path
          this.info[this.currentRef + '_absolute'] = res.data.url
        }
      })
      this.$refs.updateImg.setAttribute('type', 'text')
      this.$refs.updateImg.setAttribute('type', 'file')
    },
    updateImg(item) {
      this.currentRef = item
      this.$refs.updateImg.click()
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
        list,
      }
      console.log(data)
    },
    add() {
      this.id += 1
      this.list.push({
        act: 'add',
        title: '',
        path: '',
        link: '',
        id: this.id,
      })
    },
    del(index) {
      this.$confirm('是否确认退出?')
        .then(_ => {
          this.list.splice(index, 1)
        })
        .catch(_ => {})
    },
    async submit() {
      const { name, exp, icon, logo } = this.info
      services
        .publisherSetting({
          name,
          exp,
          icon,
          logo,
          setting: {
            banners: this.list,
          },
        })
        .then(
          res => {
            if (res && res.status) {
              this.$message.success('保存成功')
            }
          },
          err => {
            this.$message.error('保存失败')
          }
        )
    },
  },
}
</script>

<template lang="pug">
.content-wrap
  .content
    .titleWrap
      .tableTop
        .title.vel-line
          span(class="titleText") 首页配置
    .tableWrap
      .left
        .group
          label 系统名称:
          input.form-control(type="text" v-model="info.name")
        .group
          label 欢迎词:
          input.form-control(type="text" v-model="info.exp")
        .group
          label logo:
          img(:src="info.logo_absolute" class="scanImg")
          el-button(plain type="primary" size="mini" @click="updateImg('logo')" ) 选择
        .group
          label ico:
          img(:src="info.icon_absolute" class="scanImg")
          el-button(plain type="primary" size="mini" @click="updateImg('icon')" ) 选择
      .right
        .btn
          el-button(type="primary" @click="add()" class="el-icon-plus" size="small") 增加banner
        .list(v-for="item,index in list" :key="index")
            input.form-control(placeholder="title" v-model="item.title")
            input.form-control(placeholder="path" v-model="item.link")
            img.img(:src="item.url" :ref="item.id")
            el-button(type="primary" @click="updateImg(item)" size="small" plain) 上传
            el-button(type="primary" @click="del(index)" size="small" plain) 删除
      .btns
        input.hide(type="file" @change="update($event)" ref="updateImg" accept="image/jpeg,image/jpg,image/png")
        el-button(type="primary" @click="submit()" ) 保存
</template>

<style lang="stylus" scoped>
.content
  background #fff
  padding 20px
  box-sizing border-box
  min-width 1500px
  .titleWrap
    height 46px
    .title
      line-height 46px
      position relative
      border-bottom 1px solid #ccc
    .vel-line:before
      content ' '
      position absolute
      width 4px
      height 20px
      z-index 10
      top 13px
      left -10px
      background #39baa1
  .tableWrap
    margin-top 20px
    .left
      width 460px
      display inline-block
      margin-right 20px
      .group
        line-height 40px
        margin-bottom 20px
        button
          margin-left 20px
        img
          max-width 250px
          max-height 200px
        label
          display inline-block
          padding-right 20px
          min-width 100px
          text-align right
    .right
      width calc(100% - 490px)
      display inline-block
      .list
        height 150px
        line-height 150px
        > *
          margin-right 20px
        img
          max-height 110px
          max-width 200px
          vertical-align middle
</style>
