<template lang="pug">
  el-dialog(:visible.sync="show" width="1200px" @close="$emit('isOpen')" )
    .box
      el-input.keys(size="small" placeholder="出版社名称" v-model="name")
      el-button(type="primary" size="small" @click="search") 搜索
    .table-warp(v-if="list")
      table.table
          thead 
            tr 
              th(width='60') 
                input(type="checkbox" @click="checkAll($event)" :checked="checkAllState") 
              //- th 序号ID
              th 出版社名
              th 简介
              th 创建时间
          tbody 
            tr(v-for="item,index in list" :key="item.id") 
              th 
                input(type="checkbox" ref="inps" :value="item.id" :data-index="index" @click="changeChecked($event,item)" :checked="item.isChecked") 
              th 
                //- .ell 防止文字过多换行
                .ell {{item.name}}
                  span(v-if="item.publisher") ({{item.publisher.name}})
              th 
                .ell {{item.exp}}   
              th 
                .ell {{item.create_time}} 
      .pages(v-if="page.total") 
        //- 参数与element-ui 一致
        //- currentChange 在字符串模板,props不存在大写转小写的情况,虽然vue官方建议事件名用kebab-case风格。
        Pages(:currentPage="page.num" :total="page.total" :pageSize="page.offset" 
          :pageSizes="[page.offset, 20, 50, 100]"
          @currentChange="currentChange"
        )
    .bottom 
      el-button(type="primary" @click="add" size="small") 保存   
</template>
<script>
import { getApps, authorize, revoke } from 'services/system/user'
export default {
  props: ['isShow', 'detail'],
  data() {
    return {
      list: null,
      page: {
        offset: 10, // 每页显示多少条, 必须初始定义,
        total: 6,
        num: 1,
      },
      checkAllState: false,
      name: '',
      show: true,
    }
  },
  created() {
    this.getList()
    this.show = this.isShow
  },
  methods: {
    getList(pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10) {
      getApps({
        pageNum,
        pageOffset,
      }).then(res => {
        this.page = res.page
        this.pageList = res.data
        let arr = this.detail.accessed_publishers.map(e => {
          return e.id
        })
        if (this.detail.accessed_publishers.length == res.data.length) {
          this.checkAllState = true
        }
        this.list = res.data.map(el => {
          if (arr.includes(el.id)) {
            el.isChecked = true
          } else {
            el.isChecked = false
            this.checkAllState = false
          }
          return el
        })
      })
    },
    currentChange(page) {
      this.getList(page)
    },
    async add() {
      // log('ss',this.detail.manager_id)
      let ids = []
      this.list.forEach(e => {
        if (e.isChecked) {
          ids.push(e)
        }
      })
      this.$emit('isOpen')
      this.$emit('updata', ids)
    },
    checkAll(e) {
      this.checkAllState = !this.checkAllState
      this.list.forEach(el => {
        el.isChecked = this.checkAllState
      })
    },
    changeChecked(e, item) {
      item.isChecked = e.target.checked
      if (!e.target.checked) {
        this.checkAllState = false
      }
    },
    search() {
      this.getList({ name: this.name })
    },
  },
  watch: {
    isShow() {
      this.show = this.isShow
      this.getList()
    },
  },
}
</script>

<style lang="stylus" scoped>
.box
  padding 15px
  .keys
    width 220px
    margin-right 20px
.bottom, .pages
  text-align center
  margin 10px 0
.bottom
  padding 20px
</style>

