<script>
import { mapState } from 'vuex'
import * as readerService from 'services/common/reader'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as dbiServices from 'services/x-read/dbi'
// import { isWeixin } from '@/utils/util'
// import Sales from '@/mixins/sales'

export default {
  name: 'Reader',
  props: {
    params: {},
  },
  created() {},
  mounted() {
    this.query = this.$route.query
    this.access_code = localStorage.access_code
    this.init()
  },
  data() {
    return {
      access_code: '',
      isNav: true,
      query: {},
      isShowX: false,
      infoData: null,
      preChapterId: 0,
      curChapterId: 0,
    }
  },
  computed: {
    ...mapState({
      // info: state => state.bookinfo.info,
      // Ebooks: state => state.bookinfo.Ebooks,
    }),
  },
  methods: {
    async init() {
      // this.query = this.$route.query

      if (!reader3) return
      // this.declareOne(this.info.id, '阅读', this.info)
      let p = { id: this.query.id, type: 3 }
      // if (this.query.from && this.query.from == 'themeXknow') {
      //   p.type = 6
      //   p.book_id = this.$route.query.book_id
      // }
      // await this.getAccessCodes(p) // 3表示书籍的code
      let start = null
      if (this.query.range) {
        start = JSON.parse(this.query.range).start
      }

      const validUser = !!this.$user
      let chapterRid
      if(this.query.chapter_rid){
        chapterRid = this.query.chapter_rid
      }
      else if (this.query.chapter_root) {
        chapterRid = this.query.chapter_root.split(' ')[1]
      } else {
        chapterRid = null
      }

      // 知识点相关
      // let res = await this.getInfo()
      // this.infoData = res.data
      // const { knowledge } = this.infoData.books_info
      // if (!knowledge || knowledge.length === 0) {
      //   this.isShowX = false
      // } else {
      //   this.isShowX = true
      // }
      this.isShowX = false

      let reader = new reader3.Mobile({
        imagePath: '/res', // 内网
        services: {
          ...readerService,
         go_back: () => {
            reader.unmount()
            reader = null
            this.$router.go(-1)
          },
          request_full_screen: () => {
            this.isNav = false
          },
          exit_full_screen: () => {
            this.isNav = true
          },
          show_toast: message => {
            this.$Toast({
              message,
            })
          },
          show_confirm: text => {
            return this.$MessageBox.confirm(text)
              .then(res => {
                return true
              })
              .catch(console.log)
          },
          goXknow: () => {
            // const config = { id: this.$route.query.id }
            // if (this.$route.query.from === 'themeXknow') {
            //   config.clean = this.$route.query.clean
            //   config.from = 'theme'
            // }
            // this.$go('/home/xknow', config)
          },
          do_share: ({ bookId, bookName, chapterRid, chapterName }, app) => {
            if (isWeixin()) {
            } else {
            }
          },
          action_control: (params, app) => {
            const { type, action } = params
            for (const { type, action } of params) {
              if (
                action == 'read' &&
                (type == 'chapter' || type == 'section')
              ) {
                this.$confirm('您还未购买该章节，前往购买？')
                  .then(res => {
                    if (this.$route.query.from !== undefined) {
                      const params = {
                        type: 'Read',
                        id: this.$route.query.id,
                        inType: 'Read',
                      }
                      this.$go('/bookMedia', params)
                    }
                    this.$router.go(-1)
                  })
                  .catch(() => {
                    if (this.$route.query.from !== undefined) {
                      this.$router.go(-1)
                    }
                    // const toPath = decodeURIComponent(this.$route.fullPath)
                    // const finalPath = toPath.replace(new RegExp('\\b' + this.curChapterId + '\\b', 'g'), this.preChapterId)
                    // this.$router.replace(finalPath)
                  })
                return false
              }
              return true
            }
          },
        },
        fontSize: {
          list: [
            { title: '小', value: '14px' },
            { title: '中', value: '16px' },
            { title: '大', value: '18px' },
            { title: '特大', value: '20px' },
          ],
          index: 0,
        },
        // copyEnabled: true,
        labelEnabled: true,
        fullScreenEnabled: !true,
        bookmarkEnabled: true,
        searchEnabled: true,
        preloadEnabled: true,
        goBackEnabled: true,
        userEnabled: true,// 关闭用户设置
        rootAsChapter: false,
        quickLabelBtnText: '划线',
        toolBarActions: [
          // this.isShowX && {
          //   title: 'X一下',
          //   className: 'xBtn',
          //   service: 'goXknow',
          //   active: false,
          // },
        ].filter(item => item),
        defaultPageLayout: 'normal',
        defaultTextLayout: 'lr/static',
        // params: {},
        readModeList: [
          { title: '无', pageLayout: 'normal', textLayout: 'lr/static', scope: 'desktop'},
          { title: '翻页', pageLayout: 'normal', textLayout: 'lr/auto', scope: 'desktop'},
          { title: '对页', pageLayout: 'folio', scope: 'desktop'},
          { title: '点击翻页', pageLayout: 'normal', textLayout: 'lr/static', scope: 'mobile'},
          { title: '平滑翻页', pageLayout: 'slide', textLayout: 'lr/auto', scope: 'mobile'},
        ],
        background: {
          list: [
            { title: '默认', value: ['#676A7B', '#FFF', 'reader_bg'] },
          ],
          index: 0,
        },
      })
      reader.emitter.on('updateURL', arg => {
        if (typeof arg.chapterRid == undefined) {
          return
        }
        const toPath = decodeURIComponent(this.$route.fullPath)
        let finalPath, chapterId
        if (this.$route.query.chapter_id === undefined) {
          chapterId = arg.chapterRid
          finalPath = toPath.replace('index=root', `index=root ${chapterId}`)
          finalPath = `${finalPath}&chapter_id=${chapterId}`
        } else {
          chapterId = this.$route.query.chapter_id
          finalPath = toPath.replace(
            new RegExp('\\b' + chapterId + '\\b', 'g'),
            arg.chapterRid
          )
        }
        this.preChapterId = chapterId
        this.curChapterId = arg.chapterRid
        this.$router.replace(finalPath)
      })

      reader.extraParams = {
        version: 'release',
        content_version: 'release',
        access_code: this.access_code,
        product_id: this.query.product_id,
        user_id: this.$user && this.$user.id,
        release_id: this.query.product_id,
      }
      setTimeout(() => {
        // 放这里有点不科学
        reader.mount(this.$refs.root, {
          bookId: this.query.book_id,
          chapterRid: chapterRid || this.query.chapter_id || '',
          chapterId: this.query.chapter_id,
          // chapterId: '8c50ebf580c240ec967a6ebcaf6666001661819',
          range: JSON.parse(this.query.range || null),
        })
      }, 30)
    },
    getUserId() {
      if (sessionStorage.userInfo) {
        const userInfo = JSON.parse(sessionStorage.userInfo)
        return (userInfo && userInfo.id) || ''
      }
      return ''
    },
    getThemeBookDetail() {
      //获取主题的所有内容
      bookinfoServices
        .getThemeBookDetail({ id: this.query })
        .then(res => (this.all = res.data))
    },
    declareOne(id, type, data) {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      // let data = res.data
      eventOpts = {
        event_class: 'PDAMBook',
        event_target: id,
        event_type: type,
        event_source: 'WEB', //默认为WEB
        event_operator: this.$user && this.$user.id,
      }
      addData = {
        data: [
          {
            res_id: data.id,
            res_type: data.type_name,
            res_name: data.books_info.name,
            res_cover: data.books_info.img_src,
            res_exp: data.books_info.abs,
            res_author: data.books_info.author,
            res_lables: data.books_info.tag,
            res_attr: data.books_info.attributes,
            res_money: data.audio_price,
          },
        ],
      }
      dbiServices.declare(eventOpts, addData, cb)
    },
    async getAccessCodes(data) {
      if (this.query.from === 'theme') {
        this.access_code = sessionStorage.getItem('access_code')
      } else {
        return await bookinfoServices.getAccessCode(data).then(res => {
          this.access_code = res.data
        })
      }
    },
    closeNav() {
      this.isNav = false
    },
    openNav() {
      this.isNav = true
    },
    getInfo() {
      return bookinfoServices.info({ id: this.query.book_id })
    },
  },
}
</script>

<template lang="pug">
.div
  //- Head(:name="info.name" v-show="false" )
  .root(ref="root")
</template>

<style lang="stylus" scoped>
.root
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  width 100%
  user-select none
</style>
