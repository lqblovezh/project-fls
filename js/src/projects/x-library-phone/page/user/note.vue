<script>
import MultiNav from './comp/MultiNav'
import NoteItem from './comp/noteItem'
import Footer from './comp/Footer'
import { select } from './mixin.js'
import { MessageBox } from 'mint-ui';
import MessageDialog from './comp/MessageDialog'
export default {
  mixins: [select],
  data () {
    return {
      //item
      itemList: [],
      book_id: null,
      dialogState: false,
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
      ],
      page: {
        pageStart: 0,
        pageOffset: 10
      },
    }
  },
  components: {
    MultiNav,
    NoteItem,
    Footer,
    MessageDialog
  },
  mounted () {
    this.list=[]
    this.getList()
  },
  methods: {
    async getList (cb = () => {}) {
      try {
        const item = this.tabs.filter(tab => tab.checked)[0]
        const res = await this.$service.info.getNotes({
          data_base_type: item.keyId,
          ...this.page
        })
        this.list = [...JSON.parse(JSON.stringify(this.list)), ...res.data]
        this.page.pageStart = this.list.length
        // cb(this.list.length === res.page.total)
      } catch(e) {
        this.$Toast('获取数据失败')
      }
    },
    itemClickHandler (idx) {
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
    initState() {
      this.page.pageStart = 0
      this.list = []
      this.allChecked = false
      this.manage = false
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
     updateNote(item) {
       this.itemList = item
      //传book_id
      this.book_id = item.book_id
      this.dialogState = true
      //笔记内容
      this.$refs.nodeChild.msgData = this.itemList.comm_text
      console.log(this.itemList)
    },
    loadMoreNote() {
      this.list=[]
      this.getList()
    }
  }
}
</script>
<template lang="pug">
.page-note
  Head(type="dark" name="我的笔记")
  .icon-note-bg.bg-user
    .tr.mr20(v-if="!manage")
      button.icon-br-manage-btn.btn-reset(@click="manage = !manage")
    .tr.mr20(v-else)
      button.icon-br-complete-btn.btn-reset(@click="manage = !manage")
  MessageDialog(v-model="dialogState" @loadMoreNote="loadMoreNote" ref="nodeChild" :itemFaData="itemList" )
  MultiNav(
    @itemClickHandler="itemClickHandler"
    top="90px"
    :list="tabs"
    )
  Scroll(
    top="248px"
    @loadMore="getList"
  )
    NoteItem( v-for="(item, index) in list"
      :item="item"
      :idx="index"
      :key="index"
      v-model="manage"
      @selectItem="selectItem"
      @updateNote="updateNote"
      ref="noteItem"
    )
  Footer(v-model="manage" :allChecked="allChecked" @selectAll="selectAll" @del="del")
</template>
<style lang="stylus">
.page-note
  .icon-note-bg
    >.tr
      &:nth-of-type(1)
        padding-top 20px
      &:nth-of-type(2)
        padding-top 5px
      button
        background-color transparent
</style>
