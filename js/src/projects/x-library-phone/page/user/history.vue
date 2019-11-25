<script>
import MultiNav from './comp/MultiNav'
import HistoryItem from './comp/historyItem'
import BookItem from './comp/BookItem'
import Footer from './comp/Footer'
import { select } from './mixin.js'
export default {
  mixins: [select],
  data () {
    return {
      manage: false,
      tabs: [
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
          name: '文书范文',
          checked: false
        },
      ],
      page: {
        pageStart: 0,
        pageOffset: 10
      },
    }
  },
  components: {
    MultiNav,
    HistoryItem,
    BookItem,
    Footer
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList(cb = () => {}) {
      try {
        const item = this.tabs.filter(tab => tab.checked)[0]
        const res = await this.$service.info.getHistoryList({
          data_base_type: item.keyId,
          ...this.page
        })
        this.list = [...JSON.parse(JSON.stringify(this.list)), ...res.data]
        this.page.pageStart = this.list.length
        // cb(this.list.length === res.data.total)
      } catch(e) {
        console.warn(e)
        this.$Toast('获取数据失败')
      }
    },
    async del () {
      const id = this.getSelectedItemId()
      if (id.length === 0) {
        return
      }
      try {
        await this.$service.info.delHistory({
          id
        })
        this.$Toast('删除成功')
        this.removeItems()
      } catch(e) {
        console.log(e)
        this.$Toast('删除失败')
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
      this.allChecked = false
      this.manage = false
    },
  }
}
</script>
<template lang="pug">
.page-note
  Head(type="dark" name="阅读历史")
  .icon-history-bg.bg-user
    .tr.mr20(v-if="!manage")
      button.icon-br-manage-btn.btn-reset(@click="manage = !manage")
    .tr.mr20(v-else)
      button.icon-br-complete-btn.btn-reset(@click="manage = !manage")
  MultiNav(
  @itemClickHandler="itemClickHandler"
  top="90px"
  :list="tabs"
  )
  .line
  Scroll(
    top="242px"
    @loadMore="getList"
  )
    HistoryItem(v-for="(i, index) in list"
      :item="i"
      :idx="index"
      :key="index"
      v-model="manage"
      type="history"
      @selectItem="selectItem"
      v-if="true"
    )
    BookItem(v-else)
  Footer(v-model="manage" :allChecked="allChecked" @selectAll="selectAll" @del="del")
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