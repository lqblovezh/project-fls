<script>
import * as circleBookServices from 'services/x-read/circleBook'
import { mapMutations, mapState } from 'vuex'
import ListItem from './item'
import { noLoginToast } from '@/utils/util'

export default {
  components: { ListItem },
  created() {
    this.getList(0, 6, true)
  },
  data() {
    return {
      list: [{ name: 'li' }, { name: 'li' }],
    }
  },
  computed: {
    ...mapState({
      bookCircleList: state => state.home.bookCircleList,
    }),
  },
  methods: {
    ...mapMutations(['setBookCircleList']),
    getList(pageStart = 0, pageOffset = 6, isClean = false) {
      return circleBookServices.getList({ pageStart, pageOffset }).then(res => {
        if (res.data.length === 0) {
          return true
        } else {
          if (!isClean) {
            //非清空  累加
            res.data = this.bookCircleList.data.concat(res.data)
          }
          this.setBookCircleList(res)
          return false
        }
      })
    },
    loadMore(miniRefresh) {
      let pageStart = this.bookCircleList.page.start * 1 + this.bookCircleList.page.offset * 1
      this.getList(pageStart, 6)
        .then(res => {
          // miniRefresh.endUpLoading();
          miniRefresh(res) // true 为没有了
        })
        .catch(err => {
          miniRefresh(true) // true 为没有了
        })
      //upwrap-progress minirefresh-rotate
    },
    refresh() {
      this.getList(0, 6, true)
    },
    addQuan(item) {
      //加入书圈
      if (this.$noLoginToast()) return
      circleBookServices
        .join({ id: item.id })
        .then(res => {
          item.user_status = true
          this.$Toast({ message: '加入成功!' })
        })
        .catch(err => {
          this.$Toast({ message: err.message })
        })
    },
    goDetail(i) {
      // 1未开启 2开启 3锁定
      if (i.status == 1) {
        this.$Toast({
          message: '该书圈暂未开启',
        })
        return
      }
      if (i.status == 3) {
        this.$Toast({
          message: '该书圈已锁定, 无法进入',
        })
        return
      }
      this.$go('/bookCircleList/comment', { id: i.id })
    },
  },
}
</script>

<template lang="pug">
.div
  Head(name="书友圈")
  .main( v-if="list && list.length > 0")
    Scroll(top='0.9'  @loadMore="loadMore" @refresh="refresh")
      .ls
        .item( v-for="i in bookCircleList.data "   )
          ListItem(
            @addQuan="addQuan(i) "
            @detail="goDetail(i)"
            :item="i")
          .line-part
</template>

<style lang="stylus" scoped>
</style>
