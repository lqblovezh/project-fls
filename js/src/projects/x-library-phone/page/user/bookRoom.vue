<script>
import TopNav from './comp/TopNav'
import MultiNav from './comp/MultiNav'
import SortNav from './comp/SortNav'
import BookRoomItem from './comp/BookRoomItem'
export default {
  data () {
    return {
      top: 'unafford', // unafford|afford
      columnSecond: [
        {
          keyId: 1,
          checked: true,
          name: '案例'
        },
        {
          keyId: 2,
          name: '法规',
          checked: false
        },
        {
          keyId: 3,
          checked: false,
          name: '文献'
        },
        {
          keyId: 4,
          name: '裁判',
          checked: false
        },
        {
          keyId: 6,
          name: '图书',
          checked: false
        },
        {
          keyId: 7,
          name: '文书范本',
          checked: false
        },
        {
          keyId: 8,
          name: '课程影音',
          checked: false
        },
      ],
      sort: 'default',
      list: [],
      manage: false, // 是否启动管理模式
      items: [],
      selectedItems: [], // 选中的数据项
      page: {
        pageStart: 0,
        pageOffset: 10
      },
      allChecked: false, // 是否全选（默认没有）
      sortType: 'default'
    }
  },
  computed: {
    // 二级导航栏 （案例、法规、文献、裁判）
    checkedItem () {
      return this.columnSecond.filter(item => item.checked)[0] || this.columnSecond[0]
    },
    totalPrice () {
      let sum = 0
      this.list.map(item => {
        if (item.checked) {
          sum += Number(item.price)
        }
      })
      return sum
    },
    lenOfList () {
      return this.list.length
    }
  },
  components: {
    TopNav,
    MultiNav,
    SortNav,
    BookRoomItem
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList (cb = () => {}) {
      try {
        const res = await this.$service.bookShelf.getList({
          is_pay: this.top === 'unafford' ? 0 : 1,
          type: this.checkedItem.keyId,
          ...this.page
        })
        this.list = [...JSON.parse(JSON.stringify(this.list)), ...res.data] // 分页加载更多时，将数据添加到list中
        this.page.pageStart = this.list.length
        // cb(res.page.total === this.list.length)
      } catch(e) {
        console.error(e)
        this.$Toast({
          message: '获取数据失败'
        })
      }
    },
    itemClickHandler (idx) {
      // 找出选中的nav，设置选中状态为false
      let index = 0,
          checkedItem = null
      this.columnSecond.map((item, i) => {
        if (item.checked) {
          checkedItem = item
          index = i
        }
      })
      if (!checkedItem || index === idx) {
        return
      }
      checkedItem.checked = false
      this.columnSecond[idx].checked = true
      this.initState()
      this.getList()
    },
    initState () {
      this.page.pageStart = 0
      this.list = []
      this.allChecked = false
      this.manage = false
    },
    selectAll () {
      this.allChecked ? this.toggleAllSelect(false):this.toggleAllSelect(true)
    },
    toggleAllSelect (status) {
      this.list.map(item => {
        this.$set(item, 'checked', status)
      })
      this.allChecked = status
    },
    selectItem (data) {
      const {
        idx,
        item
      } = data
      item.checked ? this.$set(this.list[idx], 'checked', false) : this.$set(this.list[idx], 'checked', true)
      this.observeList()
    },
    // 每次对checkbox进行选中或取消时
    // 同步检验是否全选
    observeList () {
      this.allChecked = this.list && this.list.every(item => item.checked)
    },
    async del () {
      const id = this.getSelectedItemId()
      if (id.length === 0) {
        return
      }
      try {
        await this.$service.bookShelf.del({
          id
        })
        this.$Toast('删除成功')
        this.removeItems()
      } catch(e) {
        console.log(e)
        this.$Toast('删除失败')
      }
    },
    removeItems () {
      this.list = this.list.filter(item => !item.checked)
    },
    getSelectedItemId () {
      const id = []
      this.list.map(item => {
        if (item.checked) {
          id.push(item.id)
        }
      })
      return id
    },
    createOrder () {
      const checkedItem = this.list.filter(item => item.checked)
      if (checkedItem.length === 0) {
        return
      }
      const obj = {}
      obj[this.$user.id] = checkedItem
      window.localStorage.setItem('cart', JSON.stringify(obj))
      this.$go('/order')
    }
  },
  watch: {
    top (newVal) {
      this.initState()
      this.getList()
    }
  }
}
</script>
<template lang="pug">
.page-bookRoom
  Head(type="dark" name="书房")
  .icon-book-room.bg-user
    .tr.mr20(v-if="!manage && list.length>0")
      button.icon-br-manage-btn(@click="manage = !manage")
    .tr.mr20(v-else-if="list.length>0")
      button.icon-br-complete-btn(@click="manage = !manage")
  TopNav(v-model="top")
  MultiNav(
    @itemClickHandler="itemClickHandler"
    top="90px"
    :list="columnSecond"
  )
  SortNav(v-model="sortType")
  .line
  Scroll(
    top="354px"
    bottom="45px"
    @loadMore="getList"
  )
    BookRoomItem(
      v-for="(item, index) in list"
      :item="item"
      :idx="index"
      :key="index"
      :top="top"
      @selectItem="selectItem"
    )
  footer.manage.f16
    .footer-manage.flex-between-center(v-if="manage && lenOfList>0")
      .footer-select.c_f_bg.flex
        .item-checkbox
          input(type="checkbox" @click="selectAll" v-model="allChecked")
        span.f14 全选
      button.c_f.linear-btn 清理
      button.c_f.btn-error(@click="del") 删除
    .footer-buy.flex.c_f_bg(v-else-if="top ==='unafford' && list.length > 0")
      .footer-select.c_f_bg.flex
        .item-checkbox
          input(type="checkbox" @click="selectAll" v-model="allChecked")
        span.f14 全选
      .footer-text.flex-between-center.f14
        p 合计：
          span.f16 ￥{{ totalPrice }}
      button.c_f.btn-error(@click="createOrder") 立即购买
</template>
<style lang="stylus">
.bg-user
  >.tr
    &:nth-of-type(1)
      padding-top 20px
    &:nth-of-type(2)
      padding-top 5px
    button
      background-color transparent
.page-bookRoom
  p
    margin 0
    padding 0
  button
    margin 0
    padding 0
    outline none
    border none
  .content
    p
      height 100px
  >.line
    height 5px
    background-color #F2F3F3
</style>
