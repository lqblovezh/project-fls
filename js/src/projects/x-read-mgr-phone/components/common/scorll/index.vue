<script>
import '@/assets/js/minirefresh'

export default {
  props: {
    top: {
      type: String,
      default: '0.9' //距离顶部多少rem
    },
    bottom: {
      type: String,
      default: '0' // 距离底部多少rem
    },
    isLockX: {
      type: String,
      default: ''
    }
  },
  mounted() {
    //特别注意 Scroll 一定要在得到数据后再实例化,slot里面的 list.length > 0
    setTimeout(() => {
      this.initMiniRefresh()
    }, 20)
  },
  computed: {
    styleObj() {
      return {
        top: this.top + 'rem',
        bottom: this.bottom + 'rem'
      }
    }
  },
  methods: {
    initMiniRefresh() {
      // console.log('init')// 参数的this,不指向创建的对象, 函数体的this才是
      var miniRefresh = new MiniRefresh({
        container: this.$refs.minirefresh,
        isScrollBar: false,
        isLockX: false,// 是否锁定左右滑动 ,默认true, 
        down: {
          isAuto: false,
          isAutoResetUpLoading: true,
          dampRateBegin: 0.3,
          offset: 50,
          callback: () => {
            // 下拉事件
            log('下啦')
            // self.getList().then(_ => {
            //   log("lalla")
            miniRefresh.endDownLoading(true) //
            // });
            this.$emit('refresh', miniRefresh)
          }
        },
        up: {
          isAuto: false,
          loadFull: {
            isEnable: false
          },
          callback: () => {
            // 得到数据后调用以下方法
            // miniRefresh.endUpLoading(true); // 返回的data[] 长度0 , 表示没有更多数据了, 底部显示没有数据
            // miniRefresh.endUpLoading(false); //返回的data不是[] ,  表示还有更多数据, 可以继续下拉得到

            // 绑定函数的this指向
            // log('this',miniRefresh.endUpLoading.bind(miniRefresh))
            // 是应该这样去设计,把这个方法暴露出去, 绑定this, 而不是返回对象出去,好用得多
            this.$emit('loadMore', miniRefresh.endUpLoading.bind(miniRefresh))
            // log('上啦,加载更多') // 加载更多
            // 上拉事件
            // 注意，由于默认情况是开启满屏自动加载的，所以请求失败时，请务必endUpLoading(true)，防止无限请求
            // self.getList().then(res=>{
            // miniRefresh.endUpLoading(true);
            // });
          }
        }
      })
    }
  }
}
</script>

<template lang="pug">
.div
  .minirefresh-wrap( ref="minirefresh" :style="styleObj" )
    .minirefresh-scroll
      slot 

</template>

<style lang="stylus" scoped>
.minirefresh-wrap
  top 0.9rem
</style>



