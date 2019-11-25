<script>
import * as services from 'services/x-read/findSetting'
import * as commonServices from 'services/x-read/common'
import { circleMixin,publicMixin } from "@/util/mixins"
import Resource from '@/components/common/Resource'
import  {mapMutations , mapState} from 'vuex'

export default {
  components: { Resource },
  mixins: [publicMixin,circleMixin],
  data() {
    return {
      detailAddDialog: false,
      constitute: [], //详情
      services,
    }
  },
  methods: {
    addSelection(addDate) {//添加选中
      log(addDate)
      // if((addDate.length+this.list.length)>5) {
      //   return this.$message.error('总条数不能大于5')
      // }
      services.save({id:addDate}).then(res => {
        this.getList()
        this.detailAddDialog = false
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
  },
}
</script>

<template lang="pug">
  .clearfix
    .mainRight
      .contentWrap
        .contentLeft
          .maindata
            .tableWrap(style="position:relative;top:20px;")
              .tableTop
                .title
                  el-button(size="mini" type="primary" icon="el-icon-plus" @click="detailAddDialog = true") 新增
              table.table
                thead
                  tr
                    th 名称
                    th 类型
                    th(width=100) 操作
                tbody(v-if="list" ref="mainBody")
                  tr(v-for="item in list")
                    th {{item.books_info?item.books_info.name:''}}
                    th {{item.type_name}}
                    th
                      Icon(type='icon-delete' title="删除" @click="del(item.discover_id)")
    //- 选择已上架资源
    Resource(:detailAddDialog.sync="detailAddDialog" v-if="detailAddDialog" :curSoucesList="list" @select="addSelection")
              
</template>


<style lang="stylus" scoped>
  .settingsNavTab 
    color #333
  ul 
    background rgba(242, 242, 242, 1)
    line-height 50px
    overflow hidden
    text-align center
    font-size 13px
    min-width 660px
    font-family '微软雅黑'
    li 
      float left
      width 218px
      margin-right 2px
      transition 0.3s
    li.active 
      background rgba(215, 215, 215, 1)
    li:hover 
      background rgba(215, 215, 215, 1)
      cursor pointer
</style>
