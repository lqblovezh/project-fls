<script>
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import PreviewArticle from '@/components/common/previewArticle'
import MaskShow from '@/components/common/MaskShow'
import Vue from 'vue'
import formSerialize from 'form-serialize'
import Reader from '@/components/common/Reader'
import articleTitleVue from './articleTitle.vue'
import RightMediaList from './rightMediaList.vue'

import { imgUploadBtn, videoUploadBtn, voiceUploadBtn } from './UEBtns'
import { HtmlDecode } from '@/util/domUtil'

import * as services from 'services/common/'
import * as articleServices from 'services/x-publish/article'
import * as pushServices from 'services/x-publish/push_articles'
import * as imgServices from 'services/x-publish/picture'
import * as audioServices from 'services/x-publish/audio'
import * as videoServices from 'services/x-publish/video'
import * as bookServices from 'services/x-publish/book'

import UeUpload from './UeUpload'
// import '../../../../static/ueditor/ueditor.config.js'
// import '../../../../static/ueditor/ueditor.all.js'
// import '../../../../static/ueditor/lang/zh-cn/zh-cn.js'

export default {
  components: {
    Menu,
    Reader,
    Top,
    UeUpload,
    RightMediaList,
    PreviewArticle,
    MaskShow,
  },
  async created() {
    var from = this.$route.query.from
    this.isShowSave = this.$route.query.hide
    this.serv = this.ser[from]
  },
  async mounted() {
    await this.getDetail()
    this.queryImg()
    this.queryVoice()
    this.queryVideo()
    this.queryBook()
    this.UeUploadBtn()

    this.ue = UE.getEditor('editor')
    this.ue.addListener('ready', () => {
      //创建挂载节点
      document
        .querySelector('.edui-editor-toolbarbox')
        .insertAdjacentHTML('afterend', '<div id="articleTitle"> </div> ')
      // 挂载内容
      var T = Vue.extend(articleTitleVue)
      this.t = new T({
        el: '#articleTitle',
      })
      this.t.detailData = this.detailData
      this.ue.execCommand('insertHtml', this.detailData.preview)
      setTimeout(() => {
        // TODO:后期处理
        document.documentElement.scrollTop = 0
      }, 500)
    })
  },
  destroyed() {
    this.ue.destroy() // 必须销毁
  },
  data() {
    return {
      detailId: null,
      detailData: {
        img: '',
      },
      isShowSave: false,
      showImgUrl: null, // 封面前端url
      imgs: null, //图片库
      books: null,
      voices: null, //音频库
      videos: null, //视频库
      bookPage: null,
      videoPage: null, //视频库
      imgPage: null, //视频库
      voicePage: null, //视频库
      uploadDialog: false, //图片上传
      imgListDialog: false, //选择封面
      previewArticleDialog: false,
      uploadType: 'img', //上传类型
      html: {}, // 富文本内容
      type: 'queryBook',
      readerDialog: false, //阅读器dialog
      readerId: '', //
      ser: {
        push: pushServices,
        default: articleServices,
      },
      serv: {},
    }
  },
  computed: {
    switchTypeName() {
      switch (this.uploadType) {
        case 'img':
          return '图片'
        case 'video':
          return '视频'
        case 'voice':
          return '音乐'
      }
    },
  },
  methods: {
    getDetail() {
      this.detailId = this.$route.query.articleId
      if (this.detailId) {
        return this.serv
          .detailArticle({ id: this.detailId })
          .then(res => {
            delete res.data.attributes
            this.detailData = res.data
            console.log('推送', res)
          })
          .catch(res => {
            console.log('获取文章出错')
          })
      }
    },
    queryImg(pageNum = 1, pageOffset = 12, query = {}) {
      //查询img
      imgServices
        .listPicture({ pageNum, pageOffset, group_id: '', ...query })
        .then(res => {
          console.log('img', res)
          this.imgs = res.data
          this.imgPage = res.page
        })
    },
    queryVoice(pageNum = 1, pageOffset = 12, query = {}) {
      //查询img
      audioServices
        .listAudio({ pageNum, pageOffset, group_id: '', ...query })
        .then(res => {
          console.log('voice', res)
          this.voices = res.data
          this.voicePage = res.page
        })
    },
    queryVideo(pageNum = 1, pageOffset = 12, query = {}) {
      //查询img
      videoServices
        .listVideo({ pageNum, pageOffset, group_id: '', ...query })
        .then(res => {
          console.log('音频', res)
          this.videos = res.data
          this.videoPage = res.page
        })
    },
    queryBook(pageNum = 1, pageOffset = 12, query = {}) {
      bookServices
        .listBooks({ pageNum, pageOffset, group_id: '', ...query })
        .then(res => {
          console.log('book', res)
          this.books = res.data
          this.bookPage = res.page
        })
    },
    handleSizeChange() {},
    handleClick(tab, e) {
      // this.type = tab.name
    },
    handleCurrentChange(data) {
      this[this.type](data.page, 12, data.query)
    },
    handleCurrentChangeImg(page) {
      this.queryImg(page)
    },
    addHtml(item) {
      this.ue.execCommand(
        'inserthtml',
        `<p>
          <img src="${item.img_src}"/>
          <p>
            <span style='color:#666;font-size:14px'> 书名：${item.name ||
              ''} </span>
            <span style='color:#666;font-size:14px'> 作者：${item.author ||
              ''} </span>
          </p>
          <p>简介:</p>
          <p style="text-indent:2em;color:#666;">${item.abs || ''}</p>
        </p>`
      )
      // this.ue.execCommand('inserthtml', '<p>click mybtn1</p>')
    },
    insertImg(item) {
      // console.log('插入', item)
      switch (this.type) {
        case 'queryVideo':
          this.ue.execCommand('insertvideo', {
            url: item.preview,
          })
          break
        case 'queryImg':
          this.ue.execCommand('insertimage', {
            src: item.preview_path,
          })
          break
        case 'queryBook':
          this.addHtml(item)
          break
        case 'queryVoice':
          this.ue.execCommand('music', {
            url: item.preview,
          })
          break
      }
    },
    insertCover(item) {
      this.showImgUrl = item.preview_path
      this.detailData.img = item.preview
      this.imgListDialog = false
    },
    showImg(e) {
      var file = e.target.files[0]
      if (file) {
        this.$ImageSizeCropper({
          file: file,
          autoWidth: 900,
          autoHeight: 500,
        }).then(
          res => {
            this.showImgUrl = URL.createObjectURL(file)
            this.uploadFile(file)
          },
          data => {
            this.uploadFile(data)
          }
        )
      }
    },
    uploadFile(data) {
      var progress = this.$progress()
      services
        .getTask(data, { is_chunk: true, size: 1024 * 1024 }, num => {
          progress.percentage = num
        })
        .then(res => {
          progress.close()
          this.detailData.img = res.data.path
          this.showImgUrl = res.data.url
        })
    },
    UeUploadBtn() {
      imgUploadBtn(this, '', 'editor') //位置影响按钮排序
      videoUploadBtn(this, '', 'editor')
      voiceUploadBtn(this, '', 'editor')
    },
    openUploadDialog(type) {
      this.uploadType = type
      this.uploadDialog = true
      console.log(this.uploadDialog)
    },
    insertMedia() {
      this.ue.execCommand('inserthtml', insertMedia())
    },
    openReader(item) {
      // 打开阅读器
      this.readerId = item.id
      this.readerDialog = true
    },
    previewArt() {
      //预览
      var titleNode = document.querySelector('#richTitle')
      var authorNode = document.querySelector('#richAuthor')
      var title = titleNode.value
      var author = authorNode.value
      var preview = this.ue.getContent()
      // 有时间写个日期插件
      var date = new Date()
      var year = date.getFullYear()
      var month = date.getMonth()
      var day = date.getDate()
      var time = year + '-' + month + '-' + day
      this.previewArticleDialog = true
      this.html = { preview, title, author, time }
    },
    async submit() {
      var flag = this.t.valiAll()
      if (!flag) {
        this.$message.error('标题和作者不能为空!')
        return
      }
      if (!this.detailData.abs) {
        console.log('获取正文前54字')
        var txt = this.ue.getContentTxt()
        var txt = txt.substr(0, 54)
        this.detailData.abs = txt
      }
      this.detailData.preview = this.ue.getContent()
      console.log(this.detailData)
      try {
        if (this.detailData.id) {
          await this.serv.modifyArticle(this.detailData).then(res => {
            this.$message.success('修改成功!')
            this.$router.back()
          })
        } else {
          await this.serv.addArticle(this.detailData).then(res => {
            this.$message.success('新增成功!')
            this.$router.back()
          })
        }
      } catch ({ payload }) {
        for (let i in payload.messages) {
          this.$message.error(payload.messages[i])
          break
        }
      }
    },
  },
}
</script>

<template lang="pug">
.index.clearfix
  MaskShow( v-if="previewArticleDialog")
    PreviewArticle(:item="html"  @cancle="previewArticleDialog = false" )
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/contentLibrary/article")
  .mainRight
    .contentWrap
      .contentLeft
        .msgWrap
          .btns
              el-button( @click="$router.go(-1)" type="primary " plain  ) 返回
              el-button(type="primary" @click="previewArt"  ) 预览
              el-button( @click="submit" v-if="!isShowSave" type="primary" plain) 保存
          .left
            span.vel-line
              span.shallow-color  类型:
              span.main-color 文章
            //- span
            //-   span.shallow-color  序号:
            //-   span.main-color {{detailData.id}}
            span
              span.shallow-color  创建时间:
              span.main-color {{detailData.create_time}}
        .editorWrap
          #editor
            <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
          .formWrap
            form#articleForm
              .group
                .label 封面:
                span
                  span.shallow-color (图片建议使用900*500像素的封面)
              .group
                .label
                img.preimg(  :src="showImgUrl || detailData.img_src" )
              .group
                .label
                span
                  input.hide( @change="showImg"  type="file" ref="preImg"  :accept="$config.imgAccept"    )
                  el-button( @click="$refs.preImg.click()" v-if="!isShowSave" type="primary" plain ) 本地上传
                  el-button(   @click="imgListDialog=true" v-if="!isShowSave" type="primary" plain ) 从图库选择
                //- .previewImg
                //-   img(  :src="showImgUrl" v-if="showImgUrl"  accept="image/jpeg,image/jpg,image/png"  )
              .group
                .label 摘要:
                span.shallow-color  (选填，如果不填写会默认抓取正文前54个字)
              .group
                .label
                span
                  textarea.form-control(v-model="detailData.abs")
              .group
                .label 标签:
                input.form-control( v-model="detailData.tag")
        .tabsWrap
          el-tabs(type="border-card" @tab-click="handleClick" v-model="type" )
            el-tab-pane(label="我的图书" name="queryBook"   )
              .all
                RightMediaList(
                  :type="type"
                  :list="books"
                  :page="bookPage"
                  @pageChange="handleCurrentChange"
                  @insertImg="insertImg"
                )
            el-tab-pane(label="我的图片" name="queryImg"  )
              .all
                RightMediaList(
                  :type="type"
                  :list="imgs"
                  :page="imgPage"
                  @pageChange="handleCurrentChange"
                  @insertImg="insertImg"
                )
            el-tab-pane(label="我的音频" name="queryVoice")
              .all
                RightMediaList(
                  :type="type"
                  :list="voices"
                  :page="voicePage"
                  @insertImg="insertImg"
                  @pageChange="handleCurrentChange"
                )
            el-tab-pane(label="我的视频" name="queryVideo"  )
              .all
                RightMediaList(
                  :type="type"
                  :list="videos"
                  :page="videoPage"
                  @pageChange="handleCurrentChange"
                  @insertImg="insertImg"
                )
  .dialogs
    Reader(
      :readerDialog.sync="readerDialog"
      :readerId="readerId"
      version="draft"
      v-if="readerDialog"
    )
    el-dialog(
      :center="false"
      v-if="imgListDialog"
      :visible.sync="imgListDialog"
      :close-on-click-modal="false"
      top="50px"
      width="800px"
      title="选择封面"
    )
      .linkListWrap
        .linksImg
          .imgWrap(v-for="item in imgs")
            img(:src="item.preview_path" @click="insertCover(item)")
        .center
          el-pagination(small
          @size-change="handleSizeChange"
          @current-change="handleCurrentChangeImg"
          layout="prev, pager, next, jumper"
          :current-page="imgPage.num"
          :page-size="imgPage.offset"
          :total="imgPage.total" )
        .right
          el-button(type="info" @click="imgListDialog=false") 返回
    el-dialog(
      :center="false"
      :visible.sync="uploadDialog"
      :close-on-click-modal="false"
      v-if="uploadDialog"
      top="50px"
      width="800px"
      :title="'上传'+ switchTypeName"
    )
      UeUpload(:ue="ue" :type="uploadType"  @cancle="uploadDialog = false")

</template>


<style lang="stylus" scoped>
*
  white-space normal !important
.linkListWrap
  .imgWrap
    display inline-block
    width 45%
    height 200px
    margin 5px
    margin-left 20px
    cursor pointer
    >img
      width 100%
      height 200px
.left
  display inline-block
  margin-left 180px
  .vel-line:before
    margin-top -10px
    margin-left -14px
  >span+span
    margin 40px
  .linksImg
    margin-left 50px
    margin-bottom 50px
    display inline-block
    .imgWrap
      display inline-block
      img
        width 200px
        margin 5px
        cursor pointer
.contentWrap
  min-width 1430px
  margin-bottom 100px
.contentRight
  display inline-block
  margin 20px 0px 0px 10px
  .tabsWrap
    width 420px
    .serchWrap
      text-align right
      line-height 35px
      input
        margin-right 50px
        width 250px
    .listWrap
      margin-top 25px
      text-align left
      .imgWrap
        display inline-block
        width 45%
        text-align center
        margin 5px
        padding-left 5px
        &.book
          position relative
          cursor pointer
          &:hover
            .cover
              display block
          .cover
            display none
            position absolute
            top 0
            right 0
            left 0
            bottom 0
            background rgba(0, 0, 0, 0.5)
            z-index 10
            color #fff
            line-height 50px
            .insert
              height 50%
            .open
              height 50%
              border-top 1px solid #fff
              box-sizing border-box
        img
          transition all 0.2s ease-in-out
          width 100%
          cursor pointer
          &:hover
            box-shadow 0px 4px 8px 0px rgba(4, 0, 0, 0.25)
            transform translateY(-4px)
            transition all 0.2s ease-in-out
.contentLeft
  // display inline-block
  // max-width 1000px
  min-width 600px
  .msgWrap
    margin-top 20px
    height 68px
    background #fff
    line-height 68px
    padding-left 20px
    .btns
      display inline-block
    .msg
      display inline-block
      margin-left 200px
  .previewImg
    .img
      width 400px
      margin 10px 50px
  .editorWrap
    margin-top 25px
    padding 15px
    background #fff
    display inline-block
  .tabsWrap
    display inline-block
    width 420px
    margin 25px 0px 0px 25px
  #editor
    width 850px
  textarea
    height 100px
    font-size 14px
    margin-top 10px
  .formWrap
    .btns
      margin 50px
      text-align right
      width 800px
.preimg
  max-width 700px
  max-height 200px
.main-color
  margin-left 15px
.group
  .label
    text-align left
</style>
