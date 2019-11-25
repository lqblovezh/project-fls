<script>
import {publicMixin, circleMixin} from '@/util/mixins'
import formSerialize from "form-serialize"
import * as services from 'services/x-read/circleComment'


export default {
  mixins: [publicMixin,circleMixin],
  data () {
    return {
      type:{
        value: '',
        list: [
          {name:'所有',id:''},
          {name:'屏蔽',id:'1'},
          {name:'禁言',id:'2'},
        ],
      },
      services,
    }
  },
  methods: {
  }
}
</script>


<template lang="pug">
.clearfix
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
              span.group-inline
                input.form-control( placeholder="输入用户搜索" name="user_name")
              span.group-inline
                input.form-control( placeholder="输入关键字搜索" name="value")
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
                  el-button(size="mini" type="primary"  @click="modify('1')" plain ) 屏蔽
                  el-button(size="mini" type="primary" @click="modify('2')"  plain ) 禁言
                  el-button(size="mini" type="primary"  @click="modify('4')" plain) 恢复
            table.table
              thead
                tr
                  th.table-check
                    input(type="checkbox" @click="selcetAll")
                  th 评论者
                  th 附件
                  th 回复对象
                  th 评论内容
                  th 发布时间
                  th 点赞数
                  th(width=80) 操作
              tbody(v-if="list" ref="mainBody")
                tr(v-for="item in list")
                  td(:class="{height:item.img}")
                    input(type="checkbox" :value="item.id" name="ids" ref="ids"  )
                  td
                    Icon(type='icon-comment' v-if='item.status == "2"' title="评论正常")
                    Icon(type='icon-an-excuse' v-if='item.status == "1"' title="评论禁言")
                    Icon(type='icon-un-comment' v-if='item.status == "3"' title="评论屏蔽")
                    img.cover-photo(:src="item.img_src")
                    span.bookName.ellipsis {{item.nick_name}}
                  td
                    Icon(type='icon-link' title="附件" @click="enclosure(item)" v-if="item.img_src&&item.img_src.length")
                    span(v-else) -
                  td {{item.user_object}}
                  td {{item.value}}
                  td {{item.create_time}}
                  td {{item.info_good_num}}
                  td
                    .btns
                      Icon(type='icon-know' :class="{isClose:item.status}" title="屏蔽" @click="modify('1',[item.id])")
                      Icon(type='icon-pass' title="禁言" @click="modify('2',[item.id])")
                      Icon(type='icon-delete' title="删除" @click="del([item.id])")
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
</style>




