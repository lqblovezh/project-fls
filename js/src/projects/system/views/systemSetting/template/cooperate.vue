<script>
import * as services from 'services/system/cooperate'
import {main} from '@/util/dy'
import {
  getTask
} from 'services/system/home'
export default {
  mixins: [main],
  data() {
    return {
      type:'demo',
      dialogVisible:false,
      total:0,
      tableData:[],
      services,
      ids:[],
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      services.getList().then(res=>{
        this.tableData = res.data
        this.total = res.page.total
      })
    },
    audit(id,passed){
      services.audit({
        id,
        passed
      }).then(res=>{
        this.$message.success("操作成功")
        this.getList(this.page)
      })
    }
  }
}
</script>

<template lang="pug">
div
  el-table(ref="table"
          stripe
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"      
          )

    el-table-column(prop="user_name" label="用户名称")
    el-table-column(prop="phone"  label="电话号码")
    el-table-column(prop="publisher_name" label="出版社名称")
    el-table-column( label="审核状态")
      template(slot-scope="scope")
        span {{['未审核','已通过','已驳回'][scope.row.status]}}
    el-table-column( prop="create_time" label="申请时间" width="200")
    el-table-column( label="操作")
      template(slot-scope="scope")
        el-button(type="primary" size="small" @click="audit(scope.row.id,1)") 通过
        el-button(type="danger" size="small" @click="audit(scope.row.id,0)") 驳回
  .page
    el-pagination(
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10,50,100]"
      :page-size="10"
      background
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      )
</template>

<style lang="stylus" scoped>
.page 
  text-align center
</style>
