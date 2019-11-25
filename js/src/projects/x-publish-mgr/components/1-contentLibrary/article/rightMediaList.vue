<script>
import Reader from '@/components/common/Reader'

export default {
  components:{Reader},
  props:['type', 'list' , 'page'],
  data(){
    return {
      readerDialog:false, //阅读器dialog
      readerId:"", //
    }
  },
  methods:{
    handleCurrentChange(page){
      var val = this.$refs.query.value
      var data = {page, query:{name:val}}
      console.log('data',data)
      this.$emit("pageChange",data )
    },
    handleSizeChange(){},
    insertImg(){

    },
    openReader(item){ // 打开阅读器
      console.log("打开")
      this.readerId = item.id ;
      this.readerDialog = true
    },
  }
}
</script>

<template lang="pug">
.div
  .dialogs
    Reader(
      :readerDialog.sync="readerDialog"
      :readerId="readerId"
      version="draft"
      v-if="readerDialog"
    )
  .index(v-if="list")
    .serchWrap
      input.form-control( placeholder="输入搜索名称"  ref="query")
      el-button( @click="handleCurrentChange(1)" type="primary" size="small") 搜索
    .listWrap
      .imgWrap(   v-if="type != 'queryBook'" @click="$emit('insertImg', item)" v-for="item in list")
        span.name {{item.name}}
        img(:src="item.img_src"
          v-if="type != 'queryImg'"  )
        img(:src="item.preview_path"
          v-if="type == 'queryImg'"  )
      .imgWrap.book.left( v-if="type == 'queryBook'" v-for="item in list")
        .cover
          .insert(@click="$emit('insertImg', item)") 插入书籍
          .open(@click="openReader(item)") 打开书籍
        span.name {{item.name}}
        img(:src="item.img_src" )
    .pageWrap
      el-pagination(small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="prev, pager, next, jumper"
        :current-page="page.num"
        :page-size="page.offset"
        :total="page.total" )


</template>

<style lang="stylus" scoped>
  .tabsWrap
    width 420px
    .serchWrap
      text-align left
      line-height 35px
      input
        margin-left 10px
        width 302px
    .listWrap
      margin-top 25px
      text-align left
      .imgWrap
        display inline-block
        width 45%
        text-align center
        margin 5px
        margin-left 10px
        // padding-left 5px
        .name
          display block
          margin 2px
          font-size 13px
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          height 20px
          line-height 20px
        &.book
          min-height 100px
          position relative
          cursor pointer
          text-align center
          &:hover
            .cover
              text-align center
              display block
          .cover
            display none
            position absolute
            top 0
            right 0
            left 0
            bottom  0
            background rgba(0,0,0,0.8)
            z-index 10
            color #fff
            line-height 60px
            .insert
              height 50%
            .open
              height 50%
              border-top 1px solid #fff
              box-sizing border-box
        img
          transition: all 0.2s ease-in-out;
          // width 100%
          cursor pointer
          height 100px
          max-width 100%
          &:hover
            box-shadow: 0px 4px 8px 0px rgba(4, 0, 0, 0.25);
            transform: translateY(-4px);
            transition: all 0.2s ease-in-out;

</style>
