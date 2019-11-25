import formSerialize from "form-serialize"
const publicMixin = {
  async mounted () {
    log(`typeof this.getList: ${typeof this.getList}`)
    if (this.getList !== 'undefined') {
      await this.getList()
    }
  },
  methods: {
    handleNavClick (tab) { // 头部切换
      this.$router.push({
        path: `${this.path}/${tab.name}`
      })
    },
    seareHandeler () { // 搜索
      this.query = formSerialize(document.querySelector("#mainForm"), { hash: true })
      this.getList(1, 10, this.query)
    },
    handleSizeChange (val) { // 处理size变化
      this.page.offset = val
      this.getList(1, val, this.query)
    },
    handleCurrentChange (val) { // 处理页码变化
      this.page.num = val
      this.getList(val, this.page.offset, this.query)
    },
    selcetAll (e) { // 全选
      Array.from(document.querySelectorAll("[name='checkbox']")).forEach(item => {
        item.checked = e.target.checked
      })
    },
    handleClose () { // 关闭模态框时初始化form
      this.$refs.detailDialog.resetFields()
      this.detailVisible = false
    },
  }
}
export { publicMixin }
