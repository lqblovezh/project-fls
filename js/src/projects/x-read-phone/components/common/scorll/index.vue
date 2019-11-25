<script>
import '@/assets/js/minirefresh'

export default {
  props: {
    top: {
      type: String,
      default: '0.9', //距离顶部多少rem
    },
    bottom: {
      type: String,
      default: '0', // 距离底部多少rem
    },
  },
  mounted() {
    //特别注意 Scroll 一定要在得到数据后再实例化,slot里面的 list.length > 0

    setTimeout(() => {
      this.initMiniRefresh()
    }, 20)
  },
  computed: {
    styleObj() {
      // 高度
      return {
        top: this.top + 'rem',
        bottom: this.bottom + 'rem',
      }
    },
  },
  methods: {
    initMiniRefresh() {
      var self = this
      var miniRefresh = new MiniRefresh({
        container: self.$refs.minirefresh,
        isScrollBar: false,
        isLockX: false, // 是否锁定左右滑动 ,默认true,
        down: {
          isAuto: false,
          isLock: true, // 不使用下拉, 因为很多地方都有自己的下拉
          isAutoResetUpLoading: true,
          dampRateBegin: 0.3,
          offset: 50,
          callback: () => {
            // 下拉事件

            // self.getList().then(_ => {
            miniRefresh.endDownLoading(true) //
            // });
            // self.$emit('refresh', miniRefresh)
            this.$emit('refresh', miniRefresh.endDownLoading.bind(miniRefresh))
          },
        },
        up: {
          isAuto: false,
          loadFull: {
            isEnable: false, //是否开启自动加载满屏，开启后，如果当前页面数据没有满屏，并且可以加载更多，就会自动触发上拉加载
          },
          callback: () => {
            // 得到数据后调用以下方法
            // miniRefresh.endUpLoading(true); // 返回的data[] 长度0 , 表示没有更多数据了, 底部显示没有数据
            // miniRefresh.endUpLoading(false); //返回的data不是[] ,  表示还有更多数据, 可以继续下拉得到

            // self.$emit('loadMore', miniRefresh)
            this.$emit('loadMore', miniRefresh.endUpLoading.bind(miniRefresh))

            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            // self.getList().then(res=>{
            // miniRefresh.endUpLoading(true);
            // });
          },
        },
      })
    },
  },
}
</script>

<template lang="pug">
.div
  .minirefresh-wrap( ref="minirefresh"  :style="styleObj")
    .minirefresh-scroll
      //- 必须包裹在一个元素里面
      div 
        slot 

</template>

<style lang="stylus" scoped>
.minirefresh-wrap
  top 0.9rem
</style>



