<script>
import * as services from 'services/x-publish/video'
import * as homeServices from 'services/x-read/home'
import { Details, itemsMixins } from './items'

export default {
  components: { ...Details },
  mixins: [itemsMixins],
  props: {},
  created() {
    this.type = this.$route.query.type
    // this.getList()
  },
	mounted() {
		this.getList()
	},
  data() {
    return {
      list: [],
      type: 3, // type 是3
      testtype: 1, // type 是3
      page: {
        pageOffset: 6, // 初始定义每页多少条
      },
    }
  },
  computed: {
    currDetail() {
      let t
      if (this.type == 4||this.type==6||this.type==7) {
        t = 1 // 列表模版
      } else {
        t = this.type
      }
      return 'Detail' + t
    },
  },
  methods: {
    getList(pageStart = 0,id=this.$route.query.id) {
			// debugger
      let params = {
        pageStart,
        pageOffset: this.page.pageOffset,
        ...this.$route.query,
				id,
      }
      return homeServices.columnList({...params,type:this.type}).then(res => {
        if (res.data.length == 0) {
          return true //返回给调用者处理, 通常为隐藏下拉旋转按钮
        }
				// debugger
        if (true) {
          // 可能不同模版有不同的模式, 有的是列表, 有的不是列表
          this.list.push(...res.data)
					console.log(this.list);
        }
      })
    },
    refresh() {},
    loadMore(cb) {
      this.getList(this.list.length).then(res => {
        cb && cb(res)
      })
    },
  },
	beforeRouteUpdate(to,from,next){
		if(to.query.id!=from.query.id){
			this.getList(null,to.query.id)
			next()
		}
	},
}
</script>

<template lang="pug">
  div
    Head(:name="$route.query.name")
    div(v-if="list && list.length")
      component(:is="currDetail" :list="list"
        @itemClickHandler="itemClickHandler" :type="type"
        @loadMore="loadMore" @refresh="refresh")
</template>
<style lang="stylus" scoped>
</style>
