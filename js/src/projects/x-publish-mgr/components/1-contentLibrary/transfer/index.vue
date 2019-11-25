<script>
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import * as services from 'services/x-publish/transfer'
import {main} from '@/util/mixins'

export default {
  mixins: [main],
  components: {Menu, Top},
  data() {
    return {
      services,
      list: null, // 任务列表
      options: {
        value: '全部',
        list: [{label: 0, value: '全部'}, {label: 1, value: '未开始'}, {label: 2, value: '进行中'}, {label: 3, value: '已完成'}, {label: 4, value: '失败'}]
      },
      type: {
        'success': '成功',
        'failed': '失败',
        'sleep': '进行中',
        'default': '未开始'
      },
      page: null, // 当前页面分页信息
      delay: 10000, // 轮询间隔时间
      timer: null, // 定时器
      name: 'export',
      status: -1 //-1 全部 0 未开始 1 进行中 2 已完成 3 失败
    }
  },
  methods: {
    // 查询任务列表
    getList( pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10, query=null) {
      log('getList')
      query = this.status < 0?{name: this.name}:{name: this.name, status: this.status}
      if (this.timer) {
        clearTimeout(this.timer)
      }
      services.getList({ pageNum, pageOffset, ...query}).then(res => {
        this.list = res.data
        this.page = res.page
        this.getTaskProgress()
      })

    },
    // 根据不同状态查询任务列表
    selectChange(val) {
      for (let ele of this.options.list) {
        if (ele.value == val) {
          this.page = null
          this.status = ele.label - 1
          this.getList()
        }
      }
    },
    // 查询导入导出列表
    getTasks(val) {
      if (this.name === val){
        return
      }
      this.page = null
      this.name = val
      this.getList()
    },
    // 轮询任务列表，更新任务进度
    getTaskProgress() {
      const that = this
      that.timer = setTimeout(that.getList, that.delay)
      log(`timer start: ${that.timer}`)
    },
    // 删除任务
    delTask(id) {
      services.delTask({id: id }).then(res => this.getList())
    }
  },
  destroyed() {
    if (this.timer) {
      clearTimeout(this.timer)
      log(`clear timer: ${this.timer}`)
    }
  },
  filters: {
    // 格式化压缩包大小值为'xxMB'形式
    formatSize: function(val) {
      if (typeof val === 'undefined') {
        return `0MB`
      }
      return `${(val/1024/1024).toFixed(2)}MB`
    }
  }
}
</script>
<template lang="pug">
.indexs.clearfix
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/contentLibrary/transfer")
  .mainRight
    .contentWrap
      .maindata
        .groupList
          .btns
            .el-button(:class="{'btn-active': name=='import'}" size="mini" type="primary" @click="getTasks('import')" plain) 导入列表
            .el-button(:class="{'btn-active': name=='export'}" size="mini" type="primary" @click="getTasks('export')" plain) 导出列表
        .tableWrap
          .tableTop
            .title.vel-line
              span 状态
              span.group-inline
                el-select(v-model="options.value" name="type" @change="selectChange")
                  el-option(
                    v-for="item in options.list"
                    :key="item.label"
                    :value="item.value")
          table.table.aProgress
            thead
              tr
                th 名称
                th.time 任务创建时间
                th 进度
                th 状态
                th 类型
                th 文件大小
                th.operate 操作
            tbody(v-if="list")
              tr(
                v-for="item in list"
                :data-id="item._id"
              )
                th {{item.info.res_total}}
                th
                  .th-name {{item.create_time}}

                th(v-if="item.status == 'success'")
                  el-progress.tProgress(:percentage="parseInt(100)" status="success")
                th(v-else-if="item.status == 'failed'")
                  el-progress.tProgress(:percentage="parseInt(0)" status="exception")
                th(v-else-if="item.status == 'sleep'&&typeof item.info.speed != 'undefined'")
                  el-progress.tProgress(:percentage="item.info.speed <= 100?parseInt(item.info.speed):parseInt(0)" )
                th(v-else)
                  el-progress.tProgress(:percentage="parseInt(0)")

                th(v-if="item.status == 'failed'&&name=='import'") {{type[item.status]}}({{item.info.speed}})
                th(v-else-if="name=='import'") {{type[item.status]}}({{item.info.data}})
                th(v-else) {{type[item.status]}}

                th(v-if="item.type=='export'") 导出
                th(v-else) 导入

                th {{item.info.zip_size|formatSize}}
                th
                  .btns
                    a.download-btn(:href="item.info.url_zip" download="files" v-if="item.status == 'success'&&item.type == 'export'")
                      span 下载
                    el-button(size="mini" type="primary" @click="delTask(item.id)") 删除
        .pageWrap(v-if="page")
          el-pagination( :small="false" background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.num"
          :page-sizes="[10, 50, 100]"
          :page-size="page.offset"
          layout="total,sizes ,prev, pager, next, jumper"
          :total="page.total")
</template>
<style lang="stylus" scoped>
.btn-active
  background-color #60cff3
  color #fff
.groupList
  margin: 20px 0
.group-inline
  width: 150px
  vertical-align: middle
.download-btn
  display: inline-block
  line-height: 1
  margin-right: 10px
  padding: 7px 15px
  border-radius: 3px
  color: #44c3aa
  border:1px solid #44c3aa
  font-size: 12px
</style>
