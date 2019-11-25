<script>
import { del } from 'services/system/mack'
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      list: state => state.personal.list,
      page: state => state.personal.page,
    }),
  },
  mounted() {
    this.getList()
  },
  methods: {
    prevew(url) {
      window.location.href = url
    },
    handleSizeChange(val) {
      //处理size变化
      this.page.pageOffset = val
      this.getList({ ...this.page, ...this.query })
    },
    handleCurrentChange(val) {
      //处理页码变化
      this.page.pageNum = val
      this.getList({ ...this.page, ...this.query })
    },
    getStatus(item) {
      if (item.status == 'success') {
        return '成功'
      } else if (item.status == 'sleep') {
        return item.info.speed + '%'
      } else {
        return '失败'
      }
    },
    del(id) {
      this.$confirm('是否确认退出?')
        .then(_ => {
          del({ id }).then(res => {
            this.getList()
            this.$message.success('删除成功')
          })
        })
        .catch(_ => {})
    },
    ...mapActions('personal', ['getList']),
  },
}
</script>

<template lang="pug">
.container.makeDetail.personal
  .content
    p.typeName 个人作品
    table.table
      thead
        tr
          th 名称
          th 类型
          th(width='160') 制作中
          th(style="text-align:center" ) 操作
      tbody()
        tr(v-for="item in list")
          th {{item.name}}
          th {{item.type_name}}
          th {{getStatus(item)}}
          th
            .btns
              el-popover(
                placement="top-start"
                trigger="hover"
                content=""
              )
                img(:src="item.base_url" ref="reference")
                el-button(size="mini" type="primary" slot="reference" @click="prevew(item.url)" plain ) 预览
              el-button(size="mini" type="primary" @click="del(item.id)" plain ) 删除
    .pageWrap(v-if="page")
      el-pagination(
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="page.total"
      )
</template>

<style lang="stylus" scoped>
.pageWrap
  text-align center
  padding 20px
.personal
  .table
    thead, tbody
      tr
        th
          text-align center
  .typeName
    margin-bottom 40px
.btns
  button
    margin-right 20px
</style> 

