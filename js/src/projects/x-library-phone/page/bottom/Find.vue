<script>
import { mapState } from 'vuex'
import Swiper from 'swiper/dist/js/swiper.min.js'
import FindItem from './comp/FindItem'
import FindItemChi from './comp/FindItem_chi'
export default {
  asyncData({ store, route }) {
    return store.dispatch('home/getFind')
  },
  components: { FindItem , FindItemChi},
  computed: {
    ...mapState({
      list: state => state.home.findList,
    }),
  },
  async mounted() {
    //
    await this.dataPromise
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      setTimeout(() => {
        this._mySwiper = new Swiper('#find-swiper', {
          loop: false, // 循环模式选项
          slidesPerView: 1, //// 设置slider容器能够同时显示的slides数量
          spaceBetween: 30,
          autoplay: false, //等同于以下设置
        })
      }, 0)
    },
    async changeList() {
      await this.$store.dispatch('home/getFind')
      this.initSwiper()
    },
    itemClickHander(item) {
      let IsbookInfo = item.book_info
      if (!IsbookInfo) {
        location.href = item.link
      } else {
        if(item.book_info.type==6||item.book_info.type==8){
          this.$go('/column-bookproduct', {
            id: item.book_id,
            name: item.name,
          })
        }else{
           this.$go('/column-detail', {
            id: item.book_id,
            name: item.name,
          })
        }
      }
    },
  },
}
</script>

<template lang="pug">
  .page-find
    .wrapper 
      .main 
        //- .btn 
          .btn-column.f14(@click="changeList") 换一批
        #find-swiper.swiper-container
          .swiper-wrapper
            .swiper-slide(
              v-for="item in list" 
              :key="item.id"
              @click.stop="itemClickHander(item)"
            )
              .main 
                .content
                  FindItem(
                    :item='item'
                    :name="item.name"
                    :img="item.img_src"
                    :time="item.create_time"
                    @click.native.stop="itemClickHander(item)"
                  )
                  .children
                    .ls
                      FindItemChi( 
                        v-for="citem in item.childrens" 
                        :key="citem.id"
                        :img="citem.img_src"
                        :name="citem.name"
                        :time="citem.create_time"
                        @click.native.stop="itemClickHander(citem)"
                        :item='citem'
                      )

</template>
<style lang="stylus">
#find-swiper
  >.swiper-wrapper
    padding-bottom 100px
    padding-top 0px
    >.swiper-slide
      >.main
        >.content
          >.children
            margin-top 20px
.page-find
  >.wrapper
    margin-bottom 70px
    >.main
      >.btn
        >.btn-column
          position absolute
          right 15px
          top 10px
          z-index 20
</style>
