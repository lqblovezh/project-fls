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
      formData: {},
    }
  },
  created() {
    this.info = this.$config.plantInfo.publisher
  },
  methods: {
    getUrl(type, e, item) {
      log(item)
      item[type + '_absolute'] = URL.createObjectURL(e.target.files[0])
    },
    async submit(obj, file1, file2, id) {
      if (file1) {
        await getTask(file1).then(res => {
          this.formData.logo = res.data.path
        })
      } else {
        this.formData.logo = obj.logo
      }
      if (file2) {
        await getTask(file2).then(res => {
          this.formData.icon = res.data.path
        })
      } else {
        this.formData.icon = obj.icon
      }
      this.formData.name = obj.name
      this.formData.exp = obj.exp
      if (id) {
        this.formData.id = id
      }
      services.setting(this.formData).then(
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
            table.table
              thead
                tr
                  th(width='') 应用类型 
                  th 系统名称
                  th 欢迎词
                  th LOGO
                  th 网站 ico
                  th 操作
              tbody
                tr(v-for="item,index in info.apps" :key="item.id")
                  td {{item.type}}
                  td
                    input(type="text" v-model="item.name")
                  td
                    input(type="text" v-model="item.exp")
                  td
                    img(:src="item.logo_absolute" class="scanImg")
                    input.hide(type="file" :ref="'logo'+index" @change="getUrl('logo',$event,item)" accept="image/jpeg,image/jpg,image/png")
                    el-button(plain type="primary" size="mini" @click="$refs['logo'+index][0].click()" ) 浏览
                  td
                    img(:src="item.icon_absolute" class="scanImg")
                    input.hide(type="file" :ref="'ico'+index" @change="getUrl('icon',$event,item)" accept="image/jpeg,image/jpg,image/png")
                    el-button(plain type="primary" size="mini" @click="$refs['ico'+index][0].click()" ) 浏览
                  td
                    el-button(plain type="primary" size="small" @click="submit(item,$refs['logo'+index][0]['files'][0],$refs['ico'+index][0]['files'][0],item.id)") 确认
</template>

<style lang="stylus" scoped>
tbody
  background #fff
.currFunc
  margin-top 20px
.loginSetting
  margin-top 20px
.titleWrap
  background #fff
  height 46px
  .title
    margin 0 15px
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
    left 10px
    background #39baa1
  .titleText
    color #333
    margin-left 20px
  .titleNotes
    color #9b9b9b
    font-size 12px
.scanImg
  max-width 100px
  max-height 100px
  margin-right 10px
.bannerWrap, .logoWrap
  width 1643px
  min-height 100px
  margin-top 15px
  .banner, .previewImgUrl
    max-width 100px
    max-height 100px
    margin-left 15px
.loginTitle
  font-size 12px
  color #333
  line-height 16px
.uploadText
  float left
.list
  height 131px
  background #ffffff
  padding 50px 0
  li
    a
      text-decoration none
    float left
    width 250px
    height 110px
    display inline-block
  .left
    width 100px
    height 100px
    display inline-block
  .body
    padding-left 32px
    display inline-block
    p
      &:first-child
        color #333
        line-height 55px
        font-size 14px
      &:last-child
        color #333
        font-size 12px
  .xPublish
    .left
      background-image url('../../assets/images/xPublish-authorize.png')
      background-repeat no-repeat
      background-position center
      background-size contain
      width 102px
      height 102px
  .xRead
    .left
      background-image url('../../assets/images/xRead-authorize.png')
      background-repeat no-repeat
      background-position center
      background-size contain
      width 102px
      height 102px
  .xData
    .left
      background-image url('../../assets/images/xData-noAuthorize.png')
      background-repeat no-repeat
      background-position center
      background-size contain
      width 102px
      height 102px
  .xSystem
    .left
      background-image url('../../assets/images/xSystem-noAuthorize.png')
      background-repeat no-repeat
      background-position center
      background-size contain
      width 102px
      height 102px
.loginBottom
  height 116px
  padding-top 25px
  padding-left 32px
</style>
