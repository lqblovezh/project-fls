<script>
import * as services from 'services/system/press'
import *　as user from 'services/system/user'
import Detail from './Detail.vue'
export default {
  components: { Detail },
  data() {
    return {
      detailDialog: false, //详情框
      detail: null, // 考虑到新增的时候, 把逻辑放到组件里面
      searchData: {
        name: '', // 出版社名称
        nick_name: '', // 联系人
        phone: '', // 电话
        email:'', //邮箱
        time_start:'',
        time_end:'',
      },
      list: null,
      page: {
        offset: 10, // 每页显示多少条, 必须初始定义,
        total: 6,
        num: 1,
      },
      active:null,
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
      return user.getList(data).then(res => {
       // log(res,444)
        this.list = res.data
        this.page = res.page
      })
    },
    currentChange(page) {
      this.getList(page)
    },
    openDetailDialog() {
      this.detailDialog = true
    },
    getDetail() {
      user.detail({ id: this.active }).then(res => {
        this.detail = res.data
        if(!res.data){
          this.detail.manager_id = ''
        }else{
          this.detail.manager_id = this.active
        }
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
          this.$confirm('危险操作,删除后无法恢复!,是否真的要删除？').then(res => {
            this.$confirm('再次确认!').then(res => {
              user.del({id:[item.id]}).then(_ => this.getList(),err=>{
                 this.$message.error('关联有出版社,无法删除...');
              })
            })
          })
          break
        case '详情':
          this.active = item.id;
          this.getDetail()
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
      v-if="detailDialog" :detail="detail" :isVis.sync="detailDialog"  @refurbish="getDetail()" )
  .content-wrap
    .content 
      //- 在用户获得焦点的时候,按键才会触发事件
      .search(@keyup.enter="getList()") 
        form( )
          el-input( placeholder="电话" v-model="searchData.phone" clearable)
          el-input( placeholder="联系人" v-model="searchData.nick_name" clearable)
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
              th 账户
              th 电话
              th 创建时间
              th 联系人
              th 拥有出版社
              th 操作
          tbody 
            tr(v-for="item in list" :key="item.id") 
              th 
                input(type="checkbox" ref="inps") 
              th 
                //- .ell 防止文字过多换行
                .ell(:title="item.name") {{item.name}}   
              th 
                .ell(:title="item.phone") {{item.phone}}   
              th 
                .ell {{item.create_time.substr(0,10)}}   
              th 
                .ell(:title="item.nick_name") {{item.nick_name}} 
              th
                .ell(v-for="vo in item.accessed_publishers" :title="vo.name")  {{vo.name}} 
              th 
                .table-btns(@click="buttonClickHandler($event, item)") 
                  //span.icon.icon-pass( :title="item.status*1 ? '禁用' : '启用' "  ) 
                  span.icon.icon-delete( title="删除"  ) 
                  span.icon.icon-detail( title="详情" ) 
        .pages(v-if="page.total") 
          //- 参数与element-ui 一致
          //- currentChange 在字符串模板,props不存在大写转小写的情况,虽然vue官方建议事件名用kebab-case风格。
          Pages(:currentPage="page.num" :total="page.total" :pageSize="page.offset" 
            :pageSizes="[page.offset, 20, 50, 100]"
            @currentChange="currentChange"
          )     
</template>


<style lang="stylus" scoped>
.el-input
  max-width 150px
  display inline-block
  margin-left 20px
</style>


