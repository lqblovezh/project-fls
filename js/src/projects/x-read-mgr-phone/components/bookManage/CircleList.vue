<script>
import * as circleBookServices from 'services/x-read/circleBook'
import { mapMutations, mapState } from 'vuex'
import ListItem from './CircleItem'

export default {
  components: { ListItem },
  activated() {
    this.init();
  },
  data() {
    return {
      list: [{ name: 'li' }, { name: 'li' }]
    }
  },
  computed: {
    ...mapState({
      bookCircleList: state => state.home.bookCircleList
    })
  },
  methods: {
    ...mapMutations(['setBookCircleList']),
    init() {
      this.refresh()
    },
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
      this.getList(pageStart, 6).then(res => {
        // miniRefresh.endUpLoading();
        miniRefresh(res) // true 为没有了
      }).catch(err => {
        miniRefresh(true) // true 为没有了
      })
      //upwrap-progress minirefresh-rotate
    },
    refresh() {
      this.getList(0, 6, true)
    },
    addQuan(item) {
      //加入书圈
      circleBookServices.join({ id: item.id }).then(res => { })
    },
    lock(item) {
      // 未开启 => 开启  开启=>锁定  锁定=>开启
      // 锁定
      // 1未开启 2开启 3锁定
      console.log('lock')
      // return
      let status, resStatus, type_name
      if (item.status === 1) {
        status = 2
        type_name = '已开启'
      } else if (item.status === 2) {
        type_name = '已屏蔽'
        status = 3
      } else if (item.status === 3) {
        // 解锁就是开启 , 不管锁定前是未开启还是开启
        type_name = '已开启'
        status = 2
      }
      circleBookServices.modify({ id: item.id, status }).then(res => {
        item.status = status
        item.type_name = type_name
      })
    }
  }
}
</script>

<template lang="pug">
.div
  Head(name="书圈管理")
  .main( v-if="list && list.length > 0")
    Scroll(top='0.9'  @loadMore="loadMore" @refresh="refresh"  isLockX  )
      .ls
        .item( v-for="i in bookCircleList.data" :key="i.id" )
          ListItem(
            @lock="lock"
            @addQuan="addQuan(i) "
            @detail="$go('/bookCircleList/comment', {id:i.id})" :item="i")
          .line-part
</template>

<style lang="stylus" scoped>
</style>
