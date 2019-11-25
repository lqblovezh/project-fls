<script>
import * as bookshelfServices from 'services/x-read/bookShelf'
import { mapState, mapMutations } from 'vuex'

export default {
  created() {
    this.init()
  },
  data() {
    return {
      selectType: '0', //1 已购买   0未购买
      operType: 'manage', // manage  delete
      typeList: [
        { name: '书籍', type: 3, typeName: 'Read' },
        // { name: '听读', type: 1, typeName: 'Audio' },
        // { name: '视读', type: 2, typeName: 'Video' },
        { name: '课件', type: 8, typeName: 'kejian' },
        { name: '主题', type: 6, typeName: 'Theme' },
      ],
      currIndex: 0,
      list: [],
      isEdit: false,
      isBottomShow: false, // 控制底部
    }
  },
  computed: {
    ...mapState([
      {
        isFooterShow: state => state.isFooterShow,
      },
    ]),
    showList() {
      // 予以废弃
      // 三个元素划分一个数组,当作书架一行,  num为一行显示几个
      function transData(list, num) {
        let col = Math.ceil(list.length / num) //向上取整
        let arr = []
        list.forEach((i, index) => {
          let rowIndex = Math.floor(index / num)
          if (index % num === 0) {
            // 这时候要新增一行
            arr[rowIndex] = []
          }
          arr[rowIndex].push(i)
        })
        return arr
      }

      let arr = transData(this.list, 3)
      return arr
    },
  },
  methods: {
    ...mapMutations(['changeFooterStatus']),
    init() {
      this.getList()
    },
    getList() {
      let type = this.typeList[this.currIndex].type
      let is_pay = this.selectType
      bookshelfServices.getList({ type, is_pay }).then(res => {
        this.list = res.data
      })
    },
    changeIndex(index) {
      this.currIndex = index
      this.getList()
    },
    changeSelectType(type) {
      this.selectType = type
      this.getList()
    },
    itemClick(i) {
      dir(i)
      if (this.operType === 'delete') {
        if (i.checked) {
          this.$set(i, 'checked', false)
        } else {
          this.$set(i, 'checked', true)
        }
      } else {
        // 跳书
        let typeName = this.typeList[this.currIndex].typeName
        switch (typeName) {
          case 'Theme':
            this.$go('/home/themeDetail', { id: i.book_id })
            break
          case 'Read':
            this.$go('/bookDetail', { id: i.book_id, inType: typeName })
            break
          case 'kejian':
            this.$go('/home/Course', { id: i.book_id })
            break
          default:
            break
        }
      }
    },
    showConfirm() {
      // 判断有几本选中
      let arr = []
      this.list.forEach(i => {
        if (i.checked) {
          arr.push(i.id)
        }
      })
      if (arr.length === 0) {
        alert('请选中')
        return
      }

      this.$confirm('是否删除?')
        .then(res => {
          bookshelfServices.del({ id: arr }).then(res => {
            this.init()
            this.isBottomShow = false
            this.changeFooterStatus(true)
            this.operType = 'manage'
          })
        })
        .catch(err => {})
    },
    manage(type) {
      this.operType = type
      if (type === 'delete') {
        this.isBottomShow = true
        this.changeFooterStatus(false)
      } else if (type === 'manage') {
        this.isBottomShow = false
        this.changeFooterStatus(true)
      }
    },
  },
}
</script>

<template lang="pug">
.book
  .top
    .left( :class="{active:selectType === '0'}"  @click=" changeSelectType('0')  ") 全部
    .right( :class="{active:selectType === '1'}"  @click="changeSelectType('1') ")  已购买
  .content
    .navs
      .ls
        .item( :class="{true:index === currIndex}"  v-for="(i, index) in typeList" @click="changeIndex(index)") {{i.name}}
      .oper
        .item.manage(@click=" manage('delete')  "  v-show="operType === 'manage' ") 管理
        .item.del(@click=" manage('manage')   "  v-show="operType === 'delete' ")  删除
    .books(v-if="list.length")
      //- .ls
        .row(v-for="row in list")
          .item-wrap
            .item(v-for="i in row" :key="i.id")
              .img(@click="itemClick(i)")
                .check(:class="{true:i.checked}" v-show="operType === 'delete' " )
                img.picbook(:src="i.img_src")
              .name.ell {{i.name}}
          .line-shadow
      .ls.ls-my
        .item(v-for="i in list" :key="i.id")
          .img(@click="itemClick(i)")
            .check(:class="{true:i.checked}" v-show="operType === 'delete' " )
            img.picbook(:src="i.img_src")
          .name.ell {{i.name}}

          // .line
  .bottom(v-show="isBottomShow")
    .line-single
    .wrap
      .left(@click="showConfirm")  删除
      .right(@click=" manage('manage')") 取消
        // button(@click="showConfirm") 测试
</template>

<style lang="stylus" scoped>
.book
  font-size 0.3rem
.bottom
  position fixed
  bottom 0
  z-index 9000000000000
  left 0
  right 0
  text-align center
  background #fff
  .wrap
    display flex
    height 1rem
    line-height 0.98rem
    >div
      flex auto
    .left
      color #ff5959
.books
  position fixed
  top 1.8rem
  left 0
  right 0
  z-index 2
  bottom 0.9rem
  padding-bottom 0.6rem
  overflow-y scroll
  background #faf8f6
  .ls
    .row
      height 4rem
      .line-shadow
        background #eaeaea
        height 0.27rem
      .line
        background #fff
        height 0.2rem
      .item-wrap
        display flex
.ls
  .item
    width 33.33333%
    text-align center
    position relative
    display inline-block
    .img
      text-align center
      position relative
      >img
        border-radius 0.08rem
      .check
        width 20px
        height 20px
        position absolute
        right 0.1rem
        top 0.3rem
        background url('./img/checked.png') no-repeat
        background-size 20px
        &.true
          background url('./img/checked-true.png') no-repeat
          background-size 20px
      .picbook
        width 1.92rem
        height 2.65rem
        margin-top 0.45rem
    .name
      height 0.7rem
      line-height 0.7rem
      font-size 13px
.content
  .navs
    height 0.88rem
    display flex
    .ls
      overflow scroll
      display flex
      height 100%
      width 6rem
      flex none
      line-height 0.88rem
      text-align center
      .item
        width 1.2rem
        flex none
        &.true
          color #14afff
    .oper
      height 100%
      line-height 0.9rem
      .item
        padding-left 0.6rem
        &.manage
          background url('./img/tool.png') no-repeat 0.2rem center
          background-size 0.3rem
        &.del
          background url('./img/del.png') no-repeat 0.2rem center
          background-size 0.24rem 0.3rem
          color #ff5959
.top
  display flex
  height 0.9rem
  line-height 0.9rem
  color #333
  box-shadow -2px 1px 7px 0px rgba(0, 0, 0, 0.04)
  >div
    width 50%
    text-align center
    &.active
      color #14afff
      border-bottom 2px solid #14afff
</style>
