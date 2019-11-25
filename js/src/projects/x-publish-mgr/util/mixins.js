import formSerialize from 'form-serialize'
import { fileExport, groupsDelete } from 'services/x-publish/common'
import * as pushServices from 'services/x-publish/dispense'
import { getTask, commonPreviewCode, getDefaultCover } from 'services/common'

var main = {
  async mounted() {
    this.getGroupList() // 获取所有分组
    // 获取当前路由参数, 保存 //创建的时候切不可转跳路由
    if (this.$route.query.id) {
      this.currGroup = this.$route.query.id //设置当前currGroup
    }
    if (typeof this.getList == 'function') {
      this.getList() // currGroup 默认为''
    }
  },
  beforeRouteUpdate(to, from, next) {
    //路由变化的时候,只需要改变currGroup 然后再查询
    this.currGroup = to.query.id
    var query = formSerialize(document.querySelector('#mainForm'), {
      hash: true,
    })
    if (typeof this.getList !== 'undefined') {
      this.getList(1, this.page.offset, query) // 查询
    }
    this.uncheckedAll() // 异步的, 这个会先执行
    next()
  },
  data() {
    return {
      currGroup: '', //当前组id
      examineDialog: false,
      currExamineID: null,
      readOnly: false,
      linkDialogObj: {
        img_src: '',
      },
      oldBlob: null,
      showByImage: false,
    }
  },
  methods: {
    query() {
      var query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      if (this.getList !== 'undefined') {
        this.getList(1, this.page.offset, query)
      }
    },
    getGroupList() {
      //查询分组列表
      if (typeof this.services.listGroup === 'function') {
        this.services
          .listGroup({ product_type: this.product_type })
          .then(res => {
            this.groupList = res.data // 传给 group组件
          })
      }
    },
    groupChange(id) {
      //分组点击事件// 点击后 带参数 转跳路由
      this.$router.push({ path: this.$route.path, query: { id } })
    },
    addGroup(node) {
      // 添加分组回调
      this.services
        .addGroup({
          ...formSerialize(node, { hash: true }),
          product_type: this.product_type,
        })
        .then(res => {
          this.getGroupList() // 重新查询分组
        })
    },
    updateGroup(node) {
      // 修改分组
      log(formSerialize(node, { hash: true }))
      this.services
        .modifyGroup(formSerialize(node, { hash: true }))
        .then(res => {
          this.getGroupList() // 重新查询分组
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    uncheckedAll() {
      //取消选中
      var ids = this.$refs.ids || [] // 实际上这是爱
      ids.forEach(item => (item.checked = false))
      var node = document.querySelector('.allBtn input ')
      if (node) {
        node.checked = false
      }
    },
    // 导入按钮，显示上传框
    importSomething() {
      this.$refs.upload.init()
      this.uploadDialog = true
    },
    importFiles(data) {
      if (this.services.putin) {
        this.services
          .putin(data)
          .then(res => {
            if (typeof this.getList == 'function') {
              setTimeout(() => {
                this.uploadDialog = false
                this.$message.success('导入成功')
                this.getList()
              }, 2000)
            }
          })
          .catch(res => {
            this.$message.error('导入失败')
          })
      }
    },
    //导出
    exportSomething() {
      //默认的事件对象
      var query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      var ids = this.getChecked()
      if (!ids) {
        return
      } else {
        query.id = ids
        this.services
          .educe(query)
          .then(res => {
            // this.fileExport(res.data.id)
            this.$message.success(
              "任务创建成功，请前往'导入导出列表'页查看进度！"
            )
          })
          .catch(res => {
            this.$message.error('导出失败!')
          })
      }
    },
    //全部导出
    exportSomething2() {
      //默认的事件对象
      var query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      var ids = this.getChecked2()
      if (ids) {
        query.id = ids
        this.services
          .educe(query)
          .then(res => {
            // this.fileExport(res.data.id)
            this.$message.success(
              "任务创建成功，请前往'导入导出列表'页查看进度！"
            )
          })
          .catch(res => {
            this.$message.error('导出失败!')
          })
      }
      this.services
        .educe(query)
        .then(res => {
          // this.$message.success("任务创建成功，请前往'导入导出列表'页查看进度！")
          this.$message.success(
            "任务创建成功，请前往'导入导出列表'页查看进度！"
          )
        })
        .catch(res => {
          this.$message.error('导出失败!')
        })
    },
    fileExport(id, num = 1) {
      fileExport({ id })
        .then(res => {
          const { zip_status, url } = res.data
          log(zip_status, url)
          if (num > 100) return log('请求次数太多,暂停循环')
          if (zip_status) {
            this.fileExport(id, num + 1)
          } else {
            location.href = url
          }
        })
        .catch(res => {
          this.$message.error('导出失败!')
        })
    },
    delGroup(id) {
      // 删除分组
      log('删除分组', id)
      // this.services.deleteGroup({id:[id] }).then(res=>{
      groupsDelete({ id: [id] }).then(res => {
        if (id === this.currGroup) {
          this.$router.push({ path: this.$route.path, query: { id: 'non' } })
        }
        this.getGroupList() // 重新查询分组
      })
    },
    handleSizeChange(offset) {
      // size变化回调
      this.uncheckedAll()
      if (typeof this.getList !== 'undefined') {
        this.page.num = 1
        this.getList(1, offset)
      }
    },
    handleCurrentChange(page) {
      // 点击分页回调,
      this.uncheckedAll()
      if (page === this.page.nun) return
      var query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      }) // 分页带参数
      if (typeof this.getList !== 'undefined') {
        this.getList(page, this.page.offset, query)
      }
    },
    //全选
    checkAll(e) {
      var node = e.target
      var nodes = Array.from(document.querySelectorAll('input[name="ids"]'))
      nodes.forEach((item, index) => {
        item.checked = node.checked
      })
    },
    //移动分组dialog
    moveToOther(e) {
      // if(!this.currGroup){
      //   this.$message.error("不能从全部分组中移动,请先选择一个具体的分组!")
      //   return
      // }
      var ids = this.getChecked()
      this.moveIds = ids
      if (ids) {
        this.moveToOtherDiaolog = true
      }
    },
    detailBack(isNew) {
      this.detailDialog = false
      if (typeof isNew != 'undefined' && isNew) {
        this.$refs.child_msg.showMsgDialog()
      }
      this.getGroupList()
      this.query()
    },
    //移动分组请求
    moveToSubmit(e) {
      if (this.moveIds) {
        var query = {
          id: this.currGroup,
          toId: this.$refs.moveToId.value,
          moveIds: this.moveIds,
        }
        this.services
          .moveGroup({
            old_group_id: this.currGroup,
            new_group_id: this.$refs.moveToId.value,
            id: this.moveIds,
          })
          .then(res => {
            this.moveToOtherDiaolog = false
            if (typeof this.getList !== 'undefined') {
              this.getList()
            }
            this.getGroupList() // 重新查询分组
          })
      }
    },
    //复制链接
    copyLink(name) {
      try {
        var t = document.querySelector('#' + name).select()
        document.execCommand('copy')
        this.$message.success('复制成功!')
      } catch (e) {
        this.$message.error('请使用ctrl+c 实现复制')
      }
    },
    //获取选中
    getChecked() {
      var ids = []
      var nodes = Array.from(
        document.querySelectorAll('input[name="ids"]:checked')
      )
      nodes.forEach(item => {
        ids.push(item.value)
      })
      if (!nodes.length) {
        this.$message.error('请先选中!')
        return false
      }
      return ids
    },
    getChecked2() {
      var ids = []
      var nodes = Array.from(
        document.querySelectorAll('input[name="ids"]:checked')
      )
      nodes.forEach(item => {
        ids.push(item.value)
      })
      if (!nodes.length) {
        return false
      }
      return ids
    },
    //打开链接
    opneImgLinkDialog(item) {
      this.imgLinkDialog = true
      commonPreviewCode({ entity_type: item.type, entity: item })
        .then(res => {
          log(res)
          this.linkDialogObj.img_src = res.data.qr_url
          this.linkDialogObj.link = res.data.preview_url
        })
        .catch(err => {
          throw err
          // log(err)
        })
    },
    //删除选中
    async delChoosen(id) {
      let ids = []
      if (!id) {
        let nodes = Array.from(
          document.querySelectorAll('input[name="ids"]:checked')
        )
        nodes.forEach(item => {
          ids.push(item.value)
        })
        if (!nodes.length) {
          this.$message.error('请先选中!')
          return
        }
      } else {
        ids.push(id)
      }
      if (ids.length > 0) {
        this.$confirm('是否删除?')
          .then(res => {
            // let service = this.services.del ? this.services.del : this.del
            ;(this.services.del ? this.services.del : this.del)({
              id: ids,
            }).then(res => {
              let query = formSerialize(document.querySelector('#mainForm'), {
                hash: true,
              }) // 分页带参数
              let { total, start, num } = this.page // 处理删除最后一页数据返回上页数据
              if (total - ids.length == start) {
                this.page.num = !start ? 1 : num - 1
              }
              if (typeof this.getList !== 'undefined') {
                this.getList(this.page.num, this.page.offset, query)
              }
              this.$message.error('删除成功!')
              this.getGroupList()
            })
          })
          .catch(res => {
            // 取消事件
          })
      }
    },
    dispenseOk() {
      this.getList()
      this.publishDialog = false
    },
    audits(id) {
      let ids = []
      if (!id) {
        ids = this.$getChecked({
          data: this.list,
          name: 'audits_status',
          value: '1',
          error: '批量审核不可以包含待审核的产品!',
        })
        if (!ids) return
      } else {
        ids.push(id)
      }
      this.currExamineID = ids
      this.examineDialog = true
    },
    auditsPass(id) {
      // 直接发布,不需要创建版本
      let ids = []
      if (!id) {
        ids = this.$getChecked({
          data: this.list,
          name: 'audits_status',
          value: '1',
          error: '批量审核不可以包含待审核的产品!',
        })
        if (!ids) return
      } else {
        ids.push(id)
      }
      this.saveExamine('创建新版本', ids)
    },
    getColor(type) {
      switch (type) {
        case '未审核':
          return 'notPush'
          break
        case '已通过':
          return 'pushed'
          break
        case '待审核':
          return 'pushing'
          break
        case '未通过':
          return 'noPush'
          break
        default:
          break
      }
    },
    //详情
    opneDetailDialog(type, item) {
      this.readOnly = item && item.audits_status == 1 ? true : false
      this.detailData = item || {}
      this.detailDialoaType = type
      this.resourceDate = null
      this.detailType = item && item.type
      this.detailDialog = true
    },
    saveExamine(purpose, id) {
      this.services.audits({ id: id || this.currExamineID, purpose }).then(
        res => {
          this.examineDialog = false
          this.getList()
          this.$message.success('提交审核成功')
        },
        ({ payload }) => {
          if (payload) {
            for (let i in payload.errors) {
              this.$message.error(payload.errors[i])
              break
            }
          }
        }
      )
    },
    //打开发布
    opnePublishDialog(item) {
      this.detailData = item
      this.publishDialog = true
    },
    urgentDigital() {
      //加急审核
      var ids = this.getChecked()
      for (var i = 0, len = ids.length; i < len; i++) {
        for (var j = 0, jlen = this.list.length; j < jlen; j++) {
          if (this.list[j].id == ids[i]) {
            //当前选项
            if (this.list[j].audits_status != 1) {
              this.$message.error('只能勾选待审核数据')
              return
            }
          }
        }
      }
      if (ids) {
        this.services
          .urgentDigital({
            id: ids,
          })
          .then(res => this.$message.success('已提交加急审核'))
      }
    },
  },
}
var detailVideo = {
  data() {
    return {
      isDefaultCover: false,
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    addMetadata() {
      //新增扩展属性
      this.metadata.push({ key: '', value: '' })
    },
    delMetadata(index) {
      //删除扩展属性
      this.metadata.splice(index, 1)
    },
    previewImg(e) {
      // 上传封面预览
      var node = e.target
      this.coverFile = node.files[0]
      this.$ImageSizeCropper({
        file: this.coverFile,
        autoWidth: 500,
        autoHeight: 280,
      }).then(
        res => {
          this.previewImgUrl = URL.createObjectURL(this.coverFile)
        },
        data => {
          this.oldBlob = data
          this.previewImgUrl = URL.createObjectURL(data)
        }
      )
      // this.previewImgUrl = URL.createObjectURL(this.coverFile)
    },
    otherFile() {
      //外链文件
      var url = this.$refs.otherImgInput.value
      if (!url) return
      //http://video19.ifeng.com/video09/2018/03/26/23436927-102-8987624-101226.mp4
      var urlt = url.split('?')[0]
      var format = urlt.substr(url.lastIndexOf('.') + 1)
      this.previewOtherFileUrl = url
      this.fileMsg.format = format
    },
    previewMedia(e) {
      //上传预览视频
      var node = e.target
      var file = node.files[0]
      this.mediaFile = file
      if (file && file.size > 3000 * 1024 * 1024 * 1024) {
        this.$message.errot('文件过大!请小于3G')
        return
      }
      this.detailDataOwn.size = file.size
      this.detailDataOwn.format = file.name.substr(
        file.name.lastIndexOf('.') + 1
      )
      this.previewMediaUrl = URL.createObjectURL(file)
      setTimeout(() => {
        let media = this.$refs.media
        this.detailDataOwn.length = media.duration
        log(media.duration)
      }, 1000)
    },
    hasFile() {
      if (this.detailDataOwn.img_status) {
        //
      } else {
        // 本地文件形式
      }
    },
    setDefaultCover() {
      log('设置默认封面')
      getDefaultCover().then(res => {
        // this.detailDataOwn.img = res.data ;
        this.previewImgUrl = res.data.url
        this.$set(this.detailDataOwn, 'img', res.data.path)
        // log(res);
        this.isDefaultCover = true
      })
    },
    async submitDetail(formName) {
      //详情提交
      log('提交')
      var flag = this.$refs.detailFormVali.valiAll()
      if (!flag) return //log("验证失败")
      var fileMsg = null
      try {
        if (this.detailType === 'wailian') {
          //如果是外链
          var loading = this.$loading({
            text: '正在上传',
            background: 'rgba(0, 0, 0, 0.8)',
          })
          var url = this.previewOtherFileUrl
          this.detailDataOwn.preview = url
          fileMsg = this.fileMsg
          if (this.coverFile) {
            if (this.oldBlob) {
              this.coverFile = this.oldBlob
            }
            await getTask(this.coverFile)
              .then(res => {
                //都需要上传封面图文件
                this.detailDataOwn.img = res.data.path
              })
              .catch(res => {
                this.$message.error('图片上传失败!')
                return
              })
          } else if (!this.isDefaultCover) {
            //无改变重置封面
            this.detailDataOwn.img = null
          }
          var data = {
            ...this.detailDataOwn,
            ...fileMsg,
          }
          if (this.detailDataOwn.id) {
            await this.services.modify(data).then(res => {
              this.$emit('detailBack')
            })
          } else {
            await this.services.add(data).then(res => {
              this.$emit('detailBack')
            })
          }
          this.$nextTick(res => {
            loading.close()
          })
        } else {
          // 如果是上传
          // 先上传文件, 得到返回结果后 ,  再提交整个表单
          log('本地')
          try {
            if (this.mediaFile) {
              await getTask(
                this.mediaFile,
                { is_chunk: true, size: 1024 * 1024 },
                num => {
                  this.percentage = num
                }
              ).then(res => {
                this.detailDataOwn.preview = res.data.path
              })
            } else if (this.detailDataOwn.preview) {
              // 说明是详情进来,具有preview属性
              this.detailDataOwn.preview = null
            } else {
              this.$message.error('请导入文件!')
              return
            }
            if (this.coverFile) {
              if (this.oldBlob) {
                this.coverFile = this.oldBlob
              }
              await getTask(this.coverFile).then(res => {
                //都需要上传封面图文件
                this.detailDataOwn.img = res.data.path
              })
            } else if (!this.isDefaultCover) {
              //无改变重置封面
              this.detailDataOwn.img = null
            }
          } catch (e) {
            this.$message.error('媒体文件上传失败!')
            this.percentage = 0
            return
          }
          log('this.detailDataOwn', this.detailDataOwn)
          if (this.detailDataOwn.id) {
            log('==== 详情 ====')
            await this.services.modify(this.detailDataOwn).then(res => {
              this.$emit('detailBack')
            })
          } else {
            await this.services.add(this.detailDataOwn).then(res => {
              this.$emit('detailBack')
            })
          }
          // this.$emit('update:detailDialog', false)
          this.percentage = 0
        }
      } catch ({ payload }) {
        if (payload) {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        }
      }
    },
  },
}

const getIconStyle = {
  created() {
    if (this.detailData && this.detailData.id) {
      this.detailReadOnly = true
    }
  },
  data() {
    return {
      detailReadOnly: false,
    }
  },
  methods: {
    getStyle(type) {
      if (type == 'xRead') {
        return 'xRead'
      } else if (type == 'weChat') {
        return 'weChat'
      } else if (type == 'sina') {
        return 'sina'
      } else if (type == 'eCommerce') {
        return 'eCommerce'
      } else if (type == 'xTeach') {
        return 'xTeach'
      } else if (type == 'xLibrary') {
        return 'xLibrary'
      } else if (type == 'xQrcode') {
        return 'xQrcode'
      }
    },
    showDetail(item, type, value) {
      //显示详情模态框
      if (item.type == 2) {
        this.$router.push({
          path: '/contentLibrary/article/editor',
          query: {
            articleId: item.entity_id || item.foreign_id,
            from: 'push',
            hide: 'true',
            index: this.$route.path,
          },
        })
        return
      }
      this.item = item
      const { id, summary, type_name, product_id, products_id } = item
      this.detailValue = value || 'info'
      this.detailData.id = id
      pushServices
        .getDetail({ id: product_id || products_id, type_name })
        .then(res => {
          this.detailData = res.data || {}
          this.productType = item.type
          this.detailType = item.type || summary
          this.detailVisible = true
        })
        .catch(({ payload }) => {
          for (let i in payload.messages) {
            this.$message.error(payload.messages[i])
            break
          }
        })
    },
    previewCropper(data) {
      this.previewImgUrl = URL.createObjectURL(data)
      this.oldBlob = data
    },
  },
}

const publicMixin = {
  async created() {
    if (this.getList !== 'undefined') {
      await this.getList()
    }
  },
  methods: {
    handleNavClick(tab) {
      //头部切换
      this.$router.push({
        path: `/${this.path}/${tab.name}`,
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
      if (val === this.page.num) return
      this.getList(val, this.page.offset, this.query)
    },
    selcetAll(e) {
      //全选
      Array.from(document.querySelectorAll("[name='checkbox']")).forEach(
        item => {
          item.checked = e.target.checked
        }
      )
    },
    handleClose() {
      //关闭模态框时初始化form
      this.$refs.detailDialog.resetFields()
      this.detailVisible = false
    },
  },
}

export { main, detailVideo, publicMixin, getIconStyle }
