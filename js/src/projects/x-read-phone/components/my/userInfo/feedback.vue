<script>
import * as servers from 'services/x-read/feedback';
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      content: '',
      show: true,
      list: []
    }
  },
  methods: {
    getList() {
      servers.getList({ pageStart: 0, pageOffset: 1 }).then(res => {
        this.list = res.data;

      })
    },
    save() {
      servers.save({ content: this.content }).then((res) => {
        if (res.status) {
          this.$dialog.toast({
            mes: '反馈成功',
            timeout: 1500,
            icon: 'success'
          });
          this.content = '';
        }

      })

    },
    del(id) {
      servers.del({ id }).then(_ => {
        this.getList();
      })
    }
  },
  created() {
    this.getList();
  }
}
</script>

<template lang='pug'>
    yd-layout
        Head(name="我的反馈" hide="true")
        div.zw
        div.main
            yd-infinitescroll(:callback="getList" ref="infinitescroll")
              div(slot='list')
                .list(v-for='item in list')
                  .backMsg(v-if="item.replies.length>0")
                    div  我: {{item.content}}
                    div.systemMsg
                      div(v-for='vo in item.replies')
                        p.time 于{{vo.create_time}}回复：
                        p {{vo.content}}
                    .del
                      yd-button.del(type="danger" @click.native="del(item.id)") 删除
                .list
                  .title 精灵用心倾听您的建议，如果您在使用产品时遇到问题和功能障碍，或者产品相关意见，欢迎反馈！
                  textarea(v-model='content')
                  button.feenback(@click='save') 提交反馈
        div.tabbar(slot="tabbar")
</template>


<style lang='stylus' scoped>
.zw
  border-bottom 0.22rem solid #e5eef2
.goBack
  width 0.35rem
  margin-left 0.1rem
.main
  .list
    font-size 0.28rem
    padding 0 0.35rem
  .backMsg
    border-bottom 1px dashed #e8e8e8
    line-height 0.4rem
    padding 0.2rem 0
    .systemMsg
      margin 0.2rem 0
      padding 0 0.1rem
      line-height 0.4rem
      border 1px dashed #c4ebfb
      .time
        padding 0.2rem 0
        color #3cb4ff
    .del
      text-align right
  .title
    color #999
    line-height 0.4rem
    overflow hidden
    padding 0.4rem 0 0.2rem 0
  textarea
    border 1px solid #c4ebfb
    margin 0.3rem 0
    width 100%
    padding 0.2rem
    color #3cb4ff
    height 3rem
    line-height 0.4rem
    font-family '微软雅黑'
  .feenback
    background-color #3cb4ff
    color #fff
    width 100%
    line-height 0.86rem
    border none
    outline none
    font-family '微软雅黑'
    border-radius 5px
</style>
