<script>
import * as services from 'services/system/press'
import Detail from './Detail.vue'
import Detail2 from './Detail2.vue'
export default {
  components: { Detail, Detail2 },
  data() {
    return {
      detailDialog: false, //详情框
      authDialog: false, //权限弹窗
      detail: null, // 考虑到新增的时候, 把逻辑放到组件里面
      authDetail: null,
      authId: '',
      searchData: {
        name: '', // 出版社名称
        liaisons: '', // 联系人
        phone: '', // 电话
        manager_name: '', // 账户
      },
      list: null,
      page: {
        offset: 10, // 每页显示多少条, 必须初始定义,
        total: 6,
        num: 1,
      },
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList(pageNum = 1) {
      const data = {
        pageNum,
        pageOffset: this.page.offset,
        ...this.searchData,
      }
      return services.getList(data).then(res => {
        console.log(res)
        this.list = res.data
        this.page = res.page
      })
    },
    currentChange(page) {
      this.getList(page)
    },
    sizechange(size) {
      this.page.offset = size
      this.getList()
    },
    openDetailDialog() {
      this.detailDialog = true
    },
    getDetail(item) {
      services.detail({ id: item.id }).then(res => {
        this.detail = res.data
        this.detailDialog = true
      })
    },
    add() {
      this.detail = null
      this.detailDialog = true
    },
    forbid(item, key) {
      this.$confirm(`${key}该用户，该用户的系统将处于${key}状态?`).then(res => {
        services.disabled(item).then(_ => {
          // this.getList()
          this.$message.success('操作成功!')
          item.status = !item.status
        })
      })
    },
    buttonClickHandler(e, item) {
      let key = e.target.title
      switch (key) {
        case '禁用':
          this.forbid(item, key)
          break
        case '启用':
          this.forbid(item, key)
          break
        case '删除':
          this.$confirm('删除将删除该用户全部数据,危险操作!').then(res => {
            this.$confirm('再次确认!').then(res => {
              services.del(item).then(
                _ => this.getList(),
                err => {
                  this.$message.error('请先在详情中删除该出版社挂载的平台！！')
                }
              )
            })
          })
          break
        case '详情':
          this.getDetail(item)
          break
        default:
          break
      }
    },
    detailSave(flag) {
      this.detailDialog = false
      this.getList()
    },
    checkAll(e) {
      // 不能在html模版里面直接写. $checkAll函数里面不能获得this
      this.$checkAll(e)
    },
    formatType(t) {
      return t.join(', ')
    },
    auth(item) {
      this.authDialog = true
      this.authId = item.id
    },
  },
}
</script>


<template lang="pug">
div
  .comps
    //- 使用V-if 每次组件虽然重新创建, 但Detai初始化更简单, 减少逻辑
    //- 把dialog放在Detail里面, 保持index简洁
    Detail(
      @save="detailSave"
      v-if="detailDialog" :detail="detail" :isVis.sync="detailDialog" )
    Detail2(
      :id="authId"
      :isVis.sync="authDialog"
      @authClose ="authDialog=false"
      v-if="authDialog"
    )
  .content-wrap
    .content 
      //- 在用户获得焦点的时候,按键才会触发事件
      .search(@keyup.enter="getList()") 
        form( )
          el-input( placeholder="出版社名称" v-model="searchData.name" clearable)
          el-input( placeholder="联系人" v-model="searchData.liaisons" clearable)
          el-input( placeholder="电话" v-model="searchData.phone" clearable)
          //input.form-control( placeholder="账户" v-model="searchData.manager_name")
          //- 此处有坑, 不嗯呢过用.btns 
          .seatch-btns
            el-button( 
              @click="getList()" plain
              icon="el-icon-search" size="medium" type="primary") 搜索
            el-button( 
              @click="add"  
              icon="el-icon-plus" size="medium" type="primary") 新建  
            
      .table-warp(v-if="list")
        table.table
          thead 
            tr 
              th(width='60') 
                input(type="checkbox" @click="checkAll($event)") 
              //- th 序号ID
              th 出版社名称
              th 联系人
              th 电话
              th(width='140') 拥有平台
              th(width='230') 出版社后台地址
              th 状态
              th 操作
          tbody 
            tr(v-for="item in list" :key="item.id") 
              th 
                input(type="checkbox" ref="inps") 
              th 
                //- .ell 防止文字过多换行
                .ell {{item.name}}
              th 
                .el {{item.liaisons}}   
              th 
                .ell {{item.phone}}
              th 
                .ell(v-for="vo in item.apps") 
                  a(:href="item.base_url+vo.base_url" target="_blank" )  {{vo.name}}
              th 
                .ell.url 
                  a(:href="item.base_url+'/admin'" target="_blank" :title="item.base_url+'/admin'")  {{item.base_url}}/admin
              th {{item.status==1?'已审核':'未审核'}}
              th 
                .table-btns(@click="buttonClickHandler($event, item)") 
                  span.icon.icon-detail(title="详情" )
                  span.icon.icon-know(title="权限设置" @click="auth(item)")  
                  //- span.icon.icon-pass( :title="item.status*1 ? '禁用' : '启用' "  ) 
                  span.icon.icon-delete( title="删除") 
                  
        .pages(v-if="page.total") 
          //- 参数与element-ui 一致
          //- currentChange 在字符串模板,props不存在大写转小写的情况,虽然vue官方建议事件名用kebab-case风格。
          Pages(:currentPage="page.num" :total="page.total" :pageSize="page.offset" 
            :pageSizes="[page.offset, 20, 50, 100]"
            @currentChange="currentChange"
            @sizechange="sizechange"
          )
</template>


<style lang="stylus" scoped>
.el-input
  max-width 150px
  display inline-block
  margin-left 20px
.ell
  line-height 25px
  a
    color #666
    text-decoration none
    &:hover
      color #44c3aa
</style>

