<script>
export default {
  props: {
    currentPage: {
      // 和element-ui 的对应
      type: Number,
    },
    pageSize: {
      type: Number,
    },
    total: {
      type: Number,
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 20, 50, 100]
      },
    },
  },
  name: 'pages',
  data() {
    return {}
  },
  methods: {
    handleSizeChange(s) {
      this.$emit('sizechange', s)
    },
    handleCurrentChange(p) {
      this.$emit('currentChange', p)
    },
  },
}
</script>


<template >
  <el-pagination
    @size-change="handleSizeChange"
    background
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="sizes, prev, pager, next, total, jumper"
    :total="total"
  ></el-pagination>
</template>

<style lang="stylus" scoped></style>
