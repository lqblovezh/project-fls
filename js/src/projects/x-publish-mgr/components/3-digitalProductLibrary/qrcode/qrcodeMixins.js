import proType from './qrcodeType'
import * as services from 'services/x-publish/qrcode'
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import GroupList from '@/components/common/GroupList'
import Dispense from '@/components/common/Dispense'
import Detail from './detail'
import status from '@/util/status'

export const qrcodeMixins = {
  components: {
    Menu,
    Top,
    GroupList,
    Dispense,
    Detail,
  },
  data() {
    return {
      services,
      list: null, //主数据
      page: null,
      groupList: null, // 组列表
      detailDialog: false, // 详情框
      detailDialogType: 'info', //详情tabs类型
      detailData: null, //详情数据 ,  包含id等基本信息, 更多的在详情里面查
      publishDialog: false, //发布dialog
      moveToOtherDiaolog: false, // 移动分组dialog
      proType,
      status,
    }
  },
  methods: {
    getList(
      pageNum = (this.page && this.page.num) || 1,
      pageOffset = (this.page && this.page.offset) || 10,
      query = null
    ) {
      this.services
        .getList({
          pageNum,
          pageOffset,
          group_id: this.currGroup,
          product_type: this.product_type,
          ...query,
        })
        .then(res => {
          this.list = res.data
          this.page = res.page
        })
    },
    // 新建
    addSeries(value, type) {
      this.detailDialog = true
      this.detailData = {}
      this.metadata = null
    },
    delGroup(id) {
      // 删除分组
      // log("删除分组", id)
      this.services
        .deleteGroup({
          id,
        })
        .then(res => {
          if (id === this.currGroup) {
            this.$router.push({
              path: this.$route.path,
              query: {
                id: 'non',
              },
            })
          }
          this.getGroupList() // 重新查询分组
        })
    },
    //加急审核
    urgentDigital() {
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
    saveOk(data) {
      if (!this.detailData.id) {
        this.detailData = data
      }
      this.getList()
      this.getGroupList()
    },
    //打开分发
    opnePublishDialog(item) {
      this.detailData = item
      this.publishDialog = true
    },
  },
}
