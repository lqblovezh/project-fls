<script>
import Menu from "@/components/common/Menu";
import Top from "@/components/common/Top";
import * as services from 'services/x-publish/third_platforms'
import {getIconStyle} from '@/util/mixins'

export default {
  mixins: [getIconStyle],
  components: { Menu, Top },
  data() {
    return {
      accreditDialog: false,
      list: null,
    };
  },
  created () {
    this.getList()
    global.testID = this
  },
  methods: {
    getList() {
      services.getList({
        type:'weChat',
      }).then(res => {
        this.list = res.data
        log(this.list)
      })
    },
    accredit(type) {
      if(type=='weChat'){
        services.detail().then(res => {
          this.accreditDialog = true
          this.$nextTick(()=> {
            document.getElementById("readerIframe").setAttribute('src',res.data.url)
          })
        }).catch(res => {
          log(res)
        })
      }else{
        this.$message.error('新浪授权暂无!') 
      }
    },
  }
};
</script>

<template lang="pug">
.indexs
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/thirdParty")
  .mainRight
    .thirdParty.modular
      .title 公众平台授权
      .content
        ul.left
          li.weChat(@click="accredit('weChat')")
            div
            span 授权微信公众号
          li.sina(@click="accredit('sina')")
            div
            span 授权新浪微博
        .right
          table.table(width="100%")
              thead
                tr
                  th 已授权账号
                  th 授权说明
              tbody
                tr
                  td
                    ul.accountExec
                      li(v-for="item in list" :class="getStyle(item.type)")
                        div
                        span {{item.name}} (<span class='noAccount'>已授权</span>)
                      li.weChat(v-if="!list")
                        div
                        span 还 <span class='noAccount'>未授权</span> 微信公众号，点击右边的按钮进行授权
                      li.sina(v-if="!list")
                        div
                        span 还 <span class='noAccount'>未授权</span> 新浪微博，点击右边的按钮进行授权
                  td
                    h3 授权其他平台
                    p 本平台方正式授权应用，不会记录你的任何账号、密码信息，更不会泄露授权平台的隐私信息和影响任何功能，授权后可以随时取消授权。
                    h3 公众号授权
                    p 微信公众号授权给本平台，你可以在平台上进行内容推送与同步操作。<br>如何解除授权：进入微信公众号， 点击“+添加功能插件”，进入授权管理，解除授权。
                    h3 新浪微博解除授权
                    p 登录个人主页-点击“管理中心”-进入“我的应用”，解除授权。
    el-dialog.restBody(
      :center="false"
      :visible.sync="accreditDialog"
      top="50px"
      width="1200px"
      append-to-body
      )
      .header(slot="title")
        el-tabs(value="reader")
          el-tab-pane(label="授权" name="reader")
      .content(ref="readerIframe")
        iframe#readerIframe
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="accreditDialog = false" type="info" ) 关闭
</template>


<style lang="stylus" scoped>
@import "~common/stylus/mixin"

#readerIframe
  height 70vh
  width 100%
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.modular
  background-color #fff
  padding 10px 20px
  margin-top 30px
.thirdParty
  .content
    margin-top 35px
    border 1px solid #e1e1e1
    .left
      display inline-block
      width 230px
      text-align center
      margin 0 auto
      li
        width 186px
        height 56px
        line-height 56px
        border-radius 5px
        margin-top 30px
        border 1px solid #e1e1e1
        background-color #fff
        cursor pointer
        display inline-block
        &:hover
          border-color #44c3aa
        div 
          display inline-block
          width 40px
          height 32px
          position relative
          top 50%
          margin-top -16px
          margin-right 10px
        &.weChat
          div
            bg-image('icon-weChat')
        &.sina
          div
            left -10px
            bg-image('icon-sina')
    .right
      display inline-block
      width calc(100% - 230px)
      .accountExec
        li
          height 50px
          line-height 50px
          no-warp()
          div 
            display inline-block
            width 40px
            height 32px
            position relative
            top 50%
            margin-top -16px
          &.weChat
            div
              bg-image('icon-weChat')
          &.sina
            div
              bg-image('icon-sina')
          >span
            padding-left 10px
          .noAccount
            color #44c3aa
.title
  color #424857
  font-size 16px
  position relative
  padding-left 20px
  line-height 36px
  border-bottom 1px solid #e3e6ec
  &:after
    content ''
    display block
    width 3px 
    height 16px
    top 50%
    left 0
    margin-top -8px
    background-color #44c3aa
    position absolute
.table
  thead
    tr
      border-left 1px solid #e1e1e1
      border-bottom 1px solid #e1e1e1
  td
    border-left 1px solid #e1e1e1
    text-align left
    font-size 14px
    h3
      font-weight bold
      line-height 34px
    p
      color #777
      line-height 20px
  tbody
    color #555
    td
      padding-left 30px
    >tr:hover
      background-color #fff
</style>


