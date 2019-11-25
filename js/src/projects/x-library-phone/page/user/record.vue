<script>
import MultiNav from './comp/MultiNav'
import RecordItem from './comp/RecordItem'

export default {
  // mixins: [page],
  data () {
    return {
      manage: false,
      tabs: [
        {
          keyId: 1,
          name: '案例',
          checked: true
        },
        {
          keyId: 2,
          name: '法规',
          checked: false
        },
        {
          keyId: 3,
          name: '文献',
          checked: false
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
          name: '文书范文',
          checked: false
        },
        {
          keyId: 8,
          name: '课程影音',
          checked: false
        },
      ],
      list: [], // 数据列表
      page: {
        pageStart: 0,
        pageOffset: 10
      },
    }
  },
  components: {
    MultiNav,
    RecordItem
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList (cb = () => {}) {
      try {
        const item = this.tabs.filter(tab => tab.checked)[0]
        const res = await this.$service.order.queryOrderList({
          is_pay: 1,
          data_base_type: item.keyId,
          ...this.page
        })
        this.list = [...this.list, ...res.data]
        this.page.pageStart = this.list.length
        console.log(res)
        // cb(this.list.length === res.page.total)
      } catch(e) {
        const {
          errors,
          message
        } = e.payload
        this.$Toast(errors[0] || message)
      }
    },
    itemClickHandler (idx) {
      // 找出选中的nav，设置选中状态为false
      let index = 0,
          checkedItem = null
      this.tabs.map((item, i) => {
        if (item.checked) {
          checkedItem = item
          index = i
        }
      })
      if (!checkedItem || index === idx) {
        return
      }
      checkedItem.checked = false
      this.tabs[idx].checked = true
      this.initState()
      this.getList()
    },
    initState () {
      this.page.pageStart = 0
      this.list = []
    }
  }
}
</script>
<template lang="pug">
.page-note
  Head(type="dark" name="购买记录")
  .icon-record-bg.bg-user
  MultiNav(
    @itemClickHandler="itemClickHandler"
    top="90px"
    :list="tabs"
    fixLen
  )
  .line
  Scroll(
    top="248px"
    @loadMore="getList"
  )
    RecordItem(
      v-for="i in list"
      :price="i.pay_price"
      :time="i.pay_time"
      :order-info="i.order_info"
      :key="i.id"
    )
</template>
<style lang="stylus">
.page-note
  .bg-user
    >.tr
      &:nth-of-type(1)
        padding-top 20px
      &:nth-of-type(2)
        padding-top 5px
      button
        background-color transparent
  .comp-record
    &:first-child
      margin-top 15px
</style>