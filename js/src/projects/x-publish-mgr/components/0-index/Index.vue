<script>
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import RunningTime from 'projects/common/runningTime'
import { homeInfo } from 'services/x-publish/home'
import { getDispense } from 'services/x-publish/dispense'
import * as commonServices from 'services/common'
import { getIconStyle } from '@/util/mixins'
import * as myServices from 'services/x-publish/home'
import parse from 'url-parse'
import { mapMutations } from 'vuex'
import mulu from './mulu'

const servicesConfig = global.config

export default {
  mixins: [getIconStyle],
  components: { Menu, Top, RunningTime },
  data() {
    return {
      warehouse: {}, //仓库
      product: {}, //产品
      seriverTime: '', //系统时间
      channel: null, //发布渠道
      importDialog: false, // 转档工具点击
      token: {}, //token
      servicesConfig,
      plantInfo: this.$config.plantInfo,
      uploadDialog: false,
    }
  },
  created() {
    console.log(this.plantInfo);
    this.getInfo()
    this.getToken()
  },
  methods: {
    async getInfo() {
      try {
        await homeInfo().then(
          res => {
            this.seriverTime = res.data.now_time
            let warehouse = res.data.content_warehouse
            let product = res.data.product
            for (let key in warehouse) {
              let items = mulu.warehouse.find(item => key == item.type)
              // console.log(key, items)
              if (items) {
                items.count = warehouse[key].count
              }
            }
            // console.log(warehouse)
            for (let key in product) {
              let items = mulu.product.find(item => key == item.type)
              if (items) {
                items.count = product[key].count
              }
            }
            this.warehouse = mulu.warehouse
            this.product = mulu.product
            // console.log(res)
            // console.log(this.warehouse) 
          },
          error => {
            log(error)
          }
        )
        await getDispense().then(res => {
          this.channel = res.data
        })
      } catch ({ payload }) {
        if (!payload) return
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
    getToken() {
      commonServices.getClientToken().then(res => {
        this.token = res.data
      })
    },
    openSwitch() {
      location.href = this.TransferUrl()
      this.importDialog = true
    },
    TransferUrl() {
      let domain = parse(servicesConfig.baseUrl, true).host + global.restUrl
      return 'xswitch://url=' + domain + '&token=' + this.token.token
    },
    importFiles(data) {
      myServices.sendTemp(data).then(res =>{
        this.uploadDialog = false
        this.$message.success('导入成功')
      })
    },
    downloadUrl() {
      return global.restUrl_common + '/xswitch_Setup.exe'
    },
  },
  filters: {
    formatNum(value) {
      if (value > 100000) {
        return '10w+'
      }
      return value
    },
  },
  mounted () {
    console.log(this.warehouse)
  }
}
</script>

<template lang="pug">
.index
  //- 转档工具
  .dialogs
    el-dialog(
			:center="false"
			:visible.sync="uploadDialog"
			:close-on-click-modal="false"
			top="100px"
			)
      .content(slot="title")
        UploadAll(
					ref="upload"
					@upload="importFiles"
				)
    el-dialog.noPadding(
      style="margin-top:25vh"
      width="450px"
      :visible.sync="importDialog"
      append-to-body
    )
      .swithTitle(slot="title")
        .div &nbsp;
      .center
        a.block(:href="TransferUrl()")
          el-button(type="primary" size="small" plain) 点击调用转档
        a.block( :href="downloadUrl()")
          el-button(type="primary" size="small") 下载安装
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/index")
  .mainRight
    .headGuide
      .logo
        img(:src="plantInfo?plantInfo.logo_absolute:''", alt="alt")
      .guide
        h2 {{plantInfo?plantInfo.name:''}}
        p {{plantInfo?plantInfo.exp:''}}
        RunningTime(:currentTime='seriverTime' v-if='seriverTime')
          span 服务器当前时间：
    .content
      .warehouse.modular(v-if='warehouse')
        .title 内容仓库
        ul.list
          li(v-for="item in warehouse" :class="item.icon")
            router-link(:to="'/contentLibrary/'+item.path")
              p {{item.name}}
              p {{item.count|formatNum}}
      .product.modular(v-if='product')
        .title 我的产品
        ul.list
          li(v-for="item in product" :class="item.icon")
            router-link.body(:to="'/digitalProductLibrary/'+item.path")
              .left
              .body
                p {{item.name}}
                p {{item.count|formatNum}}
      .channel.modular
        .title 我的发布渠道
        ul.list
          li(v-for="item in channel")
            router-link(:to="'/distributed?id='+item.id")
              div(:class="getStyle(item.type)")
              span(v-text="item.name")
      .tool.modular
        .title 我的工具
        ul.list
          li.conversionTool(@click="openSwitch")
            .left
            .body() X-SWITCH智能转档系统
          li.uploadAll(@click="uploadDialog = true")
            .left
            .body() 全书上传
</template>


<style lang="stylus" scoped>
@import '~common/stylus/mixin'
$Library = digitalLibrary articleLibrary pictureLibrary audioLibrary videoLibrary contentLibrary workLibrary VRLibrary ARLibrary panorama
$Library2 = bookLibrary formLibrary topicLibrary pushLibrary shidu tingdu kejian conversionTool uploadAll
for name in $Library
  .{name}
    bg-image('icon-' + name)
for name in $Library2
  .{name}
    .left
      bg-image('icon-' + name)
.center
  padding 20px 0
.block
  display inline-block
.swithTitle
  background-color #44C3A9
  line-height 50px
  .div
    width 50%
    margin-left 20px
    bg-image('x-switch-logo')
.list
  li
    cursor pointer
    p
      margin-top -4px
.headGuide
  padding 20px
  .logo
    width 78px
    height 44px
    display inline-block
    margin-right 10px
    text-align center
    img
      max-width 100%
      max-height 100%
  .guide
    display inline-block
    h2
      padding-bottom 10px
      font-weight bold
      font-size 17px
      color #444
    p
      font-size 14px
      line-height 24px
      color #777
.content
  .modular
    background-color #fff
    padding 10px 20px
    margin-bottom 20px
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
  .warehouse
    .list
      padding-top 35px
      padding-bottom 15px
      li
        a
          display block
          height 100%
          text-decoration none
        width 190px
        height 110px
        display inline-block
        p
          color #fff
          padding-left 75px
          position relative
          &:first-child
            top 30px
            font-size 14px
          &:last-child
            top 40px
            font-size 20px
            padding-right 12px
            no-wrap()
  .product, .tool
    .list
      padding 45px 0
      li
        a
          text-decoration none
        width 186px
        height 64px
        display inline-block
        .left
          width 60px
          height 60px
          display inline-block
        .body
          padding-left 12px
          display inline-block
          p
            &:first-child
              line-height 34px
              color #555
            &:last-child
              color #333
              font-size 20px
              max-width 100px
              no-wrap()
  .channel
    .list
      padding 45px 0
      li
        min-width 160px
        height 56px
        line-height 56px
        display inline-block
        border-radius 5px
        border 1px solid #e1e1e1
        background-color #fafafa
        text-align center
        margin-right 20px
        margin-bottom 20px
        a
          display block
          height 100%
          text-decoration none
        div
          width 33px
          height 33px
          display inline-block
          margin-right 10px
          position relative
          top 50%
          margin-top -18px
        span
          color #555
  .tool
    .list
      li
        width 230px
    .body
      color #555
      line-height 60px !important
</style>
