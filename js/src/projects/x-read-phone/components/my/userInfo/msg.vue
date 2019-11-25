<script>
import * as servers from 'services/x-read/message';
export default {
		data() {
				return {
						page: 1,
						pageSize: 10,
						list: []
				}
		},
		methods: {
				getList(){
          servers.getList().then((res)=>{
							servers.getList({pageStart:this.pageSize*(this.page-1),pageOffset:this.pageSize}).then((res)=>{
										this.list=[...this.list,...res.data];
										if (this.list.length < this.pageSize || res.data.length<=0) {
                        /* 所有数据加载完毕 */
                        this.$refs.infinitescroll.$emit('ydui.infinitescroll.loadedDone');
                        return;
										}
										/* 单次请求数据完毕 */
                    this.$refs.infinitescroll.$emit('ydui.infinitescroll.finishLoad');
										this.page++;
                })
					})
        },

		},
		created(){
			 this.getList();
		}
}
</script>

<template lang='pug'>
    .box
        Head(name="我的消息" hide="true")
        div.zw
        div.main
            yd-infinitescroll(:callback="getList" ref="infinitescroll")
              div(slot='list')
                .list(v-for='item,index in list')
                  .title
                    span.b(v-text='item.title')
                    span.time(v-text='item.update_time')
                  .txt(v-text='item.contents')
</template>


<style lang='stylus' scoped>
   .box
      height 100vh
      overflow scroll
   .zw
     border-bottom 0.22rem solid #e5eef2
   .goBack
       width 0.35rem
       margin-left 0.1rem
  .main
     .list
       font-size 0.28rem
       padding 0 0.35rem
       .title
         overflow hidden
         padding  0.4rem 0 0.2rem 0
         .b
            font-weight  700
            color #333
            max-width 60%
            display inline-block
         .time
            float  right
            color #666
            font-size 0.26rem
       .txt
            color #777
            line-height 0.5rem
            text-align justify
            border-bottom 1px solid #eee
  ::-webkit-scrollbar
    width:0px
</style>
