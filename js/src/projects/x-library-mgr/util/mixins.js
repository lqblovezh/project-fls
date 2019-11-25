import formSerialize from 'form-serialize'
import { mapMutations, mapState, mapGetters } from 'vuex'
import * as dbiServices from 'services/x-read/dbi'
import { getUserInfo } from 'services/x-publish/common'
import { setVersion } from 'services/x-read/common'

var main = {
  async created() {
    // this.getGroupList() // 获取所有分组
    // // 获取当前路由参数, 保存 //创建的时候切不可转跳路由
    // if(this.$route.query.id){
    //   this.currGroup = this.$route.query.id //设置当前currGroup
    // }
    this.init()
  },
  beforeRouteUpdate(to, from, next) {
    //路由变化的时候,只需要改变currGroup 然后再查询
    this.currGroup = to.query.id
    this.getList(1, 10) // 查询
    this.$unCheck()
    next()
  },
  data() {
    return {
      currGroup: '', //当前组id
      upShelfDiaolog: false, //上架弹出层
      currentShelf: null, //要上架的id
    }
  },
  methods: {
    async init() {
      this.getGroupList()
      this.getList() // currGroup 即使没有query.id, currGroup默认为'none'
    },
    opneDetailDialog(type, id) {
      if (!id) {
        this.detailData = {}
        this.detailDialoaType = type
        this.detailVisible = true
        return
      }
      this.services.detail({ id }).then(res => {
        this.detailData = res.data
        this.detailDialoaType = type
        if (type == 11) {
          this.detailType = res.data.components.type.toString()
        }
        this.detailVisible = true
      })
    },
    query() {
      var query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      this.getList(1, this.page.offset, query)
    },
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {}
    ) {
      query.group_id = this.currGroup
      this.services.getList({ pageNum, pageOffset, ...query }).then(res => {
        this.setList(res.data)
        this.setPage(res.page)
      })
    },
    getGroupList() {
      //查询分组列表
      return (
        this.services.groupList &&
        this.services.groupList().then(res => {
          // this.groupList = res.data  // 传给 group组件
          if (typeof this.setGroupList == 'function') {
            this.setGroupList(res.data)
          }
        })
      )
    },
    groupChange(id) {
      //分组点击事件// 点击后 带参数 转跳路由
      this.$router.push({ path: this.$route.path, query: { id } })
    },
    addGroup(node) {
      // 添加分组回调
      this.services
        .group(formSerialize(node, { hash: true }))
        .then(res => {
          this.getGroupList() // 重新查询分组
        })
        .catch(res => {
          this.$message.error(res)
        })
    },
    updateGroup(node) {
      // 修改分组
      this.services.group(formSerialize(node, { hash: true })).then(res => {
        this.getGroupList() // 重新查询分组
      })
    },
    delGroup(id) {
      // 删除分组
      log('删除分组', id)
      this.services.groupDel({ id }).then(res => {
        if (id === this.currGroup) {
          this.$router.push({ path: this.$route.path, query: { id: 'non' } })
        }
        this.getGroupList() // 重新查询分组
      })
    },
    handleSizeChange(offset) {
      // size变化回调
      this.$unCheck()
      if (typeof this.getList !== 'undefined') {
        this.page.num = 1
        this.getList(1, offset)
      }
    },
    handleCurrentChange(page) {
      // 点击分页回调,
      this.$unCheck()
      if (page === this.page.nun) return
      var query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      }) // 分页带参数
      if (typeof this.getList !== 'undefined') {
        this.getList(page, this.page.offset, query)
      }
    },

    //移动分组dialog
    moveToOther(e) {
      var ids = this.$getChecked()
      if (ids) {
        this.moveIds = ids
        this.moveToOtherDiaolog = true
      } else {
        this.$message.error('请先选中')
      }
    },
    detailBack(data) {
      this.detailDialog = false
      this.getGroupList()
      this.query()
    },
    //移动分组请求
    moveToSubmit(newId) {
      if (this.moveIds) {
        this.services
          .groupMove({
            old_group_id: this.currGroup,
            new_group_id: newId,
            rel_id: this.moveIds,
            id: this.moveIds,
          })
          .then(res => {
            this.moveToOtherDiaolog = false
            this.getList()
            this.getGroupList() // 重新查询分组
          })
      }
    },
    showUpShelf(item, type) {
      if (!item) {
        if (
          !this.$getChecked({
            data: this.list,
            name: 'set',
            value: '0',
            error: '请设置价格后再上架!',
          })
        )
          return
      }
      this.services.getClass({ rel_id: item.product_id, type }).then(res => {
        this.columnList = res.data
        this.currentShelf = item
        this.upShelfDiaolog = true
      })
    },
    upShelf(id) {
      //单个或多个上架
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked({
          data: this.list,
          name: 'set',
          value: '0',
          error: '请设置价格后再上架!',
        })
        if (!ids) return
      }
      this.services
        .put({ id: ids })
        .then(res => {
          this.upShelfDiaolog = false
          this.getList()
          this.declare && this.declare(ids, '上架')
        })
        .catch(({ payload }) => {
          this.$message.error(payload.messages)
          // for(let i in payload.messages){
          //   break
          // }
        })
    },
    downShelf(id) {
      //单个或多个下架
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked({
          data: this.list,
          name: 'status',
          value: '0',
          error: '未上架的不能下架',
        })
        if (!ids) {
          return
        }
      }
      this.services
        .pull({ id: ids })
        .then(res => {
          this.getList()
          this.declare && this.declare(ids, '下架')
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    declare(id, type) {
      console.log(id)
      if (Array.isArray(id)) {
        id.forEach(item => {
          let data = this.getDetailById(item) // let具有块级作用域
          if (data) {
            this.declareOne(item, type, data)
          }
        })
      } else {
        let data = this.getDetailById(id) // let具有块级作用域
        if (data) {
          this.declareOne(id, type, data)
        }
      }
    },
    declareOne(id, type, data) {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      // let data = res.data
      let userId = ''
      try {
        userId = getUserInfo().id
      } catch (error) {
        console.error('JSON.parse(sessionStorage.userInfo)获取错误')
      }
      eventOpts = {
        event_class: 'PDAMBook',
        event_target: id,
        event_type: type,
        event_source: 'WEB', //默认为WEB
        event_operator: userId,
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
    getDetailById(id) {
      return this.list.find(item => item.id === id)
    },
    delChoosen(id) {
      //删除或多个单个
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked()
        if (!ids) {
          return
        }
      }
      this.$confirm('是否删除？')
        .then(_ => {
          this.services
            .del({ id: ids })
            .then(res => {
              this.getList()
              this.getGroupList()
            })
            .catch(({ payload }) => {
              for (let i in payload.messages) {
                this.$message.error(payload.messages[i])
                break
              }
            })
        })
        .catch(_ => {})
    },
    versionChage(e, item) {
      const oldItem = item
      setVersion({ id: e.target.value, type: item.type })
        .then(res => {
          this.$message.success('切换版本成功!')
          let index = this.list.findIndex(v => v.id === item.id)
          this.$set(this.list, index, res.data)
          // this.$set(this.list,index,Object.assign({},oldItem,res.data))
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    putSet(id) {
      //上架设置详情
      this.services.putInfo({ id }).then(res => {
        let isOpen = false
        let data = res.data.prices
        for (let key in data) {
          if (
            data[key] &&
            data[key].chapters &&
            data[key].chapters.length > 0
          ) {
            isOpen = true
            break
          }
        }
        if (!isOpen) {
          return this.$message.error('该书没有内容,请重新发布!')
        }
        this.putDetailData = res.data
        this.pustSetDialog = true
      })
    },
    pustChange(e, item) {
      // log(e.target.value,item)
      this.putSet(e.target.value)
    },
    close() {
      this.pustSetDialog = false
    },
    save() {
      this.pustSetDialog = false
      this.getList()
    },
  },
}

const publicMixin = {
  async created() {
    await this.getList()
  },
  data() {
    return {
      query: null,
      type: {
        value: '',
      },
    }
  },
  methods: {
    handleNavClick(tab) {
      //头部切换
      this.$router.push({
        path: `/wms/${this.path}/${tab.name}`,
      })
    },
    seareHandeler() {
      //搜索
      this.query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      this.getList(1, 10, this.query)
    },
    handleSizeChange(val) {
      //处理size变化
      this.page.num = 1
      this.getList(1, val, this.query)
    },
    handleCurrentChange(val) {
      //处理页码变化
      if (val === this.page.nun) return
      this.getList(val, this.page.offset, this.query)
    },
    selcetAll(e) {
      //全选
      Array.from(document.querySelectorAll("[name='ids']")).forEach(item => {
        item.checked = e.target.checked
      })
    },
    handleClose() {
      //关闭模态框时初始化form
      this.$refs.detailDialog.resetFields()
      this.detailVisible = false
    },
    educe() {
      // 导出列表
      let ids = this.$getChecked({ isShowMessage: false })
      let query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      this.services.educe({ id: ids, ...query }).then(res => {
        window.location.href = res.data.url
      })
    },
  },
}

const circleMixin = {
  data() {
    return {
      page: null,
      detailImgDialog: false,
      previewDate: [],
    }
  },
  computed: {
    ...mapState({
      list: state => state.circle.list,
    }),
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = {}
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          id: this.$route.query.id,
          ...query,
          status: this.type.value,
        })
        .then(res => {
          this.$store.state.circle.list = res.data //设置当前页数据
          this.page = res.page //设置页码
        })
    },
    del(id) {
      //删除或多个单个
      let ids = []
      if (id) {
        ids.push(id)
      } else {
        ids = this.$getChecked()
        if (!ids) {
          return this.$message.error('错误')
        }
      }
      this.$confirm('是否删除？')
        .then(_ => {
          log(this.services)
          this.services
            .del({ id: ids })
            .then(res => {
              this.getList()
            })
            .catch(({ payload }) => {
              for (let i in payload.messages) {
                this.$message.error(payload.messages[i])
                break
              }
            })
        })
        .catch(_ => {})
    },
    modify(status, id = []) {
      if (!id.length) {
        id = this.$getChecked()
      }
      if (!id.length) {
        return
      }
      this.services
        .modify({ status, id, user_book_circle_id: this.$route.query.pid })
        .then(res => {
          this.$message.success('修改成功！')
          this.getList()
        })
    },
    enclosure(item) {
      //附件
      this.previewDate = item.img_src
      this.detailImgDialog = true
    },
  },
}

export { main, publicMixin, circleMixin }
