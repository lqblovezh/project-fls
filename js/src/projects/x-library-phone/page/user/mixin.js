
const select = {
  data () {
    return {
      page: {
        pageStart: 0,
        pageOffset: 10
      },
      list: [], // 数据项
      selectedItems: [], // 选中的数据项
      allChecked: false, // 是否全选（默认没有）
    }
  },
  methods: {
    initState () {
      this.page.pageStart = 0
      this.list = []
      this.allChecked = false
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
    selectAll () {
      this.allChecked ? this.toggleAllSelect(false):this.toggleAllSelect(true)
    },
    toggleAllSelect (status) {
      this.list.map(item => {
        this.$set(item, 'checked', status)
      })
      this.allChecked = status
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
    }
  }
}

module.exports = { select }