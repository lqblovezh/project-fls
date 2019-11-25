<script>
import {publicMixin,circleMixin} from '@/util/mixins'
import formSerialize from "form-serialize"
import * as services from 'services/x-read/circleBook'


export default {
  mixins: [publicMixin,circleMixin],
  data () {
    return {
      type:{
        value: '',
        list: [
          {name:'所有',id:''},
          {name:'已开启',id:'2'},
          {name:'已屏蔽',id:'3'},
          {name:'未开启',id:'1'},
        ],
      },
      services,
    }
  },
  methods: {
    lookTheme(id) {//查看主题
      this.$router.push({
        path: '/wms/bookManage/theme',
        query: {
          id,
        }
      })
    },
  }
}
</script>


<template lang="pug">
.clearfix
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .serachWrap
            .title
            form#mainForm
              span.group-inline
                el-input(placeholder="输入名称搜索" name="name" clearable v-model="searchQuery.name")
              span.group-inline
                el-input(placeholder="输入作者搜索" name="author" clearable v-model="searchQuery.author")
              span.group-inline
                el-input(placeholder="输入图书搜索" name="book_name" clearable v-model="searchQuery.book_name")
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']")
              span.group-inline
                el-select(v-if="type.list" v-model="type.value" name="status" placeholder="选择状态搜索" clearable)
                  el-option(
                    v-for="item in type.list"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  )
              span.group-inline.right
                el-button(size="mediu" type="primary"   icon="el-icon-search"  @click="seareHandeler" plain ) 搜索
          .tableWrap
            .tableTop
              .title
                span(v-if="page") 全部 <span style="color:#47A696;">({{page.total}})</span>
                .btns
                  el-button(size="mini" type="primary"  @click="modify('2')" plain ) 开启
                  el-button(size="mini" type="primary" @click="modify('3')"  plain ) 锁定
                  el-button(size="mini" type="primary"  @click="modify('2')" plain) 解锁
            table.table
              thead
                tr
                  th
                    input(type="checkbox" @click="selcetAll")
                    span 书圈名称
                  th 著作者
                  th(width=70) 成员数量
                  th 创建时间
                  th(width=70) 主题数
                  th 所属图书
                  th(width=70) 状态
                  th(width=100) 操作
              tbody(v-if="list" ref="mainBody")
                tr(v-for="item in list")
                  th(:class="{height:item.img}")
                    input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
                    img.cover-photo(:src="item.img")
                    span.bookName.ellipsis(:title="item.name") {{item.name}}
                  th(:title="item.author") {{item.author}}
                  th {{item.member}}
                  th {{item.create_time}}
                  th {{item.theme_number}}
                  th(:title="item.book_name") {{item.book_name}}
                  th {{item.type_name}}
                  th
                    .btns
                      Icon(type='icon-wms_auth' v-if="item.status == '1' " title="开启" @click="modify('2',[item.id])")
                      Icon(type='icon-pass' v-if="item.status != '1'&&item.status == '2'" title="锁定" @click="modify('3',[item.id])")
                      Icon(type='icon-reject' v-if="item.status != '1'&&item.status == '3'" title="解锁" @click="modify('2',[item.id])")
                      Icon(type='icon-preview' title="查看主题" @click="lookTheme(item.id)")
                      Icon(type='icon-delete' title="删除" @click="del(item.id)")
          .pageWrap(v-if="page")
            el-pagination(
              :small="false"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.num"
              :page-sizes="[10, 50, 100]"
              :page-size="page.offset"
              layout="total, sizes,prev, pager, next, jumper"
              :total="page.total")
</template>


<style lang="stylus" scoped>
.btns
  >>>.icon-wms_auth:before
    color #44c3aa
.cover-photo
  max-width 47px
  max-height 59px
.bookName
  width calc(100% - 70px)
  display inline-block
.height
  line-height 59px
</style>
