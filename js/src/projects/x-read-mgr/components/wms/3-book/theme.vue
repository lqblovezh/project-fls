<script>
import {publicMixin, circleMixin} from '@/util/mixins'
import formSerialize from "form-serialize"
import MemberList from './MemberList'
import * as services from 'services/x-read/circleTheme'


export default {
  components: {MemberList},
  mixins: [publicMixin, circleMixin],
  data () {
    return {
      services,
      themeName: null,
    }
  },
  created () {
    if(this.$route.query.id){
      this.getInfo()
    }
  },
  methods: {
    lookComment(id) {//查看评论
      this.$router.push({
        path: '/wms/bookManage/comment',
        query: {
          id,
          pid: this.$route.query.id
        }
      })
    },
    getInfo(){//获取主题信息
      services.info({id:this.$route.query.id}).then(res => {
        this.themeName = res.data.name
      })
    },
    essence(essence_type,id) {
      services.essence({essence_type,id}).then(res => {
        this.getList()
      })
    }
  }
}
</script>


<template lang="pug">
.index.clearfix
  .myDialogWrap(v-if="detailImgDialog")
    .content
      span.imgWrap
        a(v-for="href in previewDate" :href="href" target='_black') 查看
        span.closeBtn(@click="detailImgDialog = false")
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .serachWrap
            .title
            form#mainForm
              span.group-inline
                el-button(size="small" type="primary" icon="el-icon-back" @click="$router.back()" plain ) 返回
              span.group-inline | {{themeName}}
          .tableWrap
            .tableTop
              .title
                span(v-if="page") {{themeName}} 共有<span style="color:#47A696;">{{page.total}}</span>个主题
                .btns
                  el-button(size="mini" type="primary"  @click="modify('3')" plain ) 屏蔽
                  el-button(size="mini" type="primary"  @click="modify('1')" plain ) 结束
                  el-button(size="mini" type="primary"  @click="del()" plain) 删除
            table.table
              thead
                tr
                  th
                    input(type="checkbox" @click="selcetAll")
                    span 题主
                  th 附件
                  th 主题内容
                  th 发表时间
                  th 评论数
                  th(width=150) 操作
              tbody(v-if="list" ref="mainBody")
                tr(v-for="item in list")
                  th(:class="{height:item.img}")
                    input(type="checkbox" :value="item.id" name="ids" ref="ids")
                    Icon(type='icon-essence' v-if='item.essence_type == "true"' title="精华")
                    Icon(type='icon-un-essence' v-if='item.essence_type == "false"' title="非精华")
                    Icon(type='icon-comment' v-if='item.status == "2"' title="评论正常")
                    Icon(type='icon-an-excuse' v-if='item.status == "1"' title="评论禁言")
                    Icon(type='icon-un-comment' v-if='item.status == "3"' title="评论屏蔽")
                    span.bookName.ellipsis {{item.nick_name}}
                  th 
                    Icon(type='icon-link' title="附件" @click="enclosure(item)" v-if="item.img_src&&item.img_src.length")
                    span(v-else) -
                  th {{item.value}}
                  th {{item.create_time}}
                  th {{item.theme_number}}
                  th
                    .btns
                      Icon(type='icon-wms_auth' v-if="item.status == '1' " title="开启" @click="modify('2',[item.id])")
                      Icon(type='icon-un-vessence' title="取消精华" v-if='item.essence_type == "true"' @click="essence('false',item.id)")
                      Icon(type='icon-vessence' title="添加精华" v-if='item.essence_type == "false"' @click="essence('true',item.id)")
                      Icon(type='icon-Shield' title="屏蔽" @click="modify('3',[item.id])")
                      Icon(type='icon-end' title="结束" @click="modify('1',[item.id])")
                      Icon(type='icon-preview' title="查看评论" @click="lookComment(item.id)")
                      Icon(type='icon-delete' title="删除" @click="del([item.id])")
          MemberList()
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
  >>> .icon-wms_auth
    color #44c3aa
.cover-photo
  max-width 47px 
  max-height 59px
.bookName
  width calc(100% - 80px)
  display inline-block
.height
  line-height 59px
.imgWrap
  width 200px
  background #fff
  padding 10px 20px
  a
    display block
    padding 10px 0
</style>




