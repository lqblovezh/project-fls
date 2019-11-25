<script>
import * as servers from 'services/x-read/bookMark';
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
      list: []
    }
  },
  methods: {
    getList() {
      let userInfo = JSON.parse(sessionStorage.userInfo);
      servers.getList({ user_id: userInfo.id }).then((res) => {

        this.list = [...this.list, ...res.data];
        if (this.list.length < this.pageSize || res.data.length <= 0) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
          return;
        }
        /* 单次请求数据完毕 */
        this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
        this.page++;
      })
    },
    del(id) {
      this.$confirm('是否删除?').then(_ => {
        servers.del({ id }).then(_ => {
          this.$dialog.toast({ mes: '该书签已删除' });
          this.list = [],
            this.getList();
        })
      })
    }
  },
  created() {
    this.getList();
  }
}
</script>

<template lang='pug'>
    .box
        Head(name="我的书签" hide="true")
        div.zw
        div.main
            yd-infinitescroll(:callback="getList" ref="infinitescroll")
              div(slot='list')
                .list(v-for='item,index in list')
                  .title
                     p
                      span {{item.chapter_name}}
                      span.percent
                      span.del(@click='del(item.id)')
                        img(src='./img/del.png')
                        i 删除
                  .txt {{item.chapter_value}}
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
    .title
      padding 0.35rem 0
      p
        padding 0 0.35rem
        color #333
        font-weight 700
        border-left 0.06rem solid #72cfff
        span
          word-spacing 0.2rem
        .percent
          color #72cfff
        .del
          float right
          color #ff6f6f
          img
            width 0.3rem
            margin-right 0.1rem
    .txt
      padding 0 0.35rem 0.3rem 0.35rem
      line-height 0.5rem
      text-indent 1em
      color #777
      text-align justify
      border-bottom 1px solid #eee
</style>
