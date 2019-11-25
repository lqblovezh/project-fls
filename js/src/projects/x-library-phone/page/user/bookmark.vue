<script>
import MultiNav from './comp/MultiNav'
import BookmarkItem from './comp/BookmarkItem'
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
          name: '案例',
          checked: true,
        },
        {
          keyId: 2,
          name: '法规',
          checked: false
        },
        {
          keyId: 3,
          name: '文献',
          checked: false,
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
  computed: {},
  components: {
    MultiNav,
    BookmarkItem,
    Footer
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        const item = this.tabs.filter(tab => tab.checked)[0]
        const res = await this.$service.info.getBookMarkList({
          data_base_type: item.keyId,
          ...this.page,
        })
        this.list = [...JSON.parse(JSON.stringify(this.list)), ...res.data]
        this.page.start = this.list.length
      } catch(e) {
        console.log(e)
        this.$Toast({
          message: '获取数据失败',
        })
      }
    },
    async del () {
      const id = this.getSelectedItemId()
      if (id.length === 0) {
        return
      }
      try {
        await this.$service.info.delNotes({
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
    }
  }
}
</script>
<template lang="pug">
.page-note
  Head(type="dark" name="我的书签")
  .icon-bookmark-bg.bg-user
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
    BookmarkItem(v-for="(item, index) in list"
      :item="item"
      :idx="index"
      :key="index"
      v-model="manage"
      @selectItem="selectItem"
    )
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
</style>