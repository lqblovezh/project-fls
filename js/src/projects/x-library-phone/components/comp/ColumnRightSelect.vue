<script>
import { mapState } from 'vuex'
export default {
  props: {
    top: {
      default: '130px',
    },
  },
  data() {
    return {
      show: false,
      price: "",
      timeValue: ''
    }
  },
  computed: {
    ...mapState('filter', {
      list: state => state.list
    }),
    columnList() {
      return this.$reconsitution(this.list, 'root', 0)
    },
  },
  methods: {
    close() {
      this.$refs.root.classList.add('panel-hide')
      this.cancleAllSelected()
      setTimeout(() => {
        this.show = false
        console.log('关闭')
        console.log(this.list)
        console.log(this.columnList)
      }, 300)
    },
    open() {
      console.log(this.columnList);
      this.show = true
    },
    test1() {
      console.log(1)
    },
    test2() {
      // console.log(2)
    },
    confirm () {
      const result = this.getAllSelectedItems()
      // result.time = this.timeValue
      result[this.timeValue] = result.time
      delete result.time
      console.log(result);
      this.$emit('getColumn', {
        filter: result
      })
      this.close()
    },
    // 在隐藏筛选的时候，清空所有已选择的状态
    cancleAllSelected () {
      this.list.forEach(item => this.$set(item, 'checked', false))
    },
    // 获取列表中所有选择项的name值
    getAllSelectedItems () {
      for(let i = 0 ; i<this.columnList.length ; i++){
        if(this.columnList[i].type=='time'){
          this.timeValue = this.columnList[i].value
        }
      }
      return {
        ...this.deepSearch(this.columnList),
        'time': this.getTimeData(this.getSelectTime()),
      }
    },
    // 获取树形组件下的时间组件
    getSelectTime () {
      let timepicker = null
      this.$refs.treeitem.forEach(i => {
        if (i.$refs.timepicker) {
          timepicker = i.$refs.timepicker
        }
      })
      const {
        startTime,
        endTime
      } = timepicker
      return timepicker
    },
    timeFormat (time) {
      let m = time.getMonth()+1
      let d = time.getDate()
      return `${time.getFullYear()}-${m < 10 ? '0'+m : m}-${d < 10 ? '0'+d : d}`
    },
    getTimeData ({startTime, endTime}) {
      let start, end
      if (typeof startTime.txt === 'object') {
        start = this.timeFormat(startTime.txt)
      }
      if (typeof endTime.txt === 'object') {
        end = this.timeFormat(endTime.txt)
      }
      return {
        start,
        end
      }
    },
    deepSearch (list) {
      let obj = {}
      ;(function _deep(l) {
        l.forEach(item => {
          if (item.checked) {
            if (!obj[item.value]) {
              obj[item.value] = []
            }
            obj[item.value].push(item.code)
          }
          item.children && item.children.length && _deep(item.children)
        })
      })(list)
      return obj
    },
    toggle(item) {
      item.level !== 0 && item.type === 'group' && this.$set(item, 'show', !item.show)
    }
  },
  provide() {
    return {
      toggle: this.toggle
    }
  }
}
</script>

<template lang="pug">
  .comp-column-right-select( ref="root" @click="close" v-if="show")
    .content.c_f(@click.stop="test2")
      .wrap
        .section 
          ul.tree-root
            TreeItem(:item="item" v-for="item in columnList" ref="treeitem")
          button.btn-reset.linear-btn.c_f.f18(@click="confirm") 确定
      //- mt-datetime-picker(ref="startTimePicker" type="date" v-model="startTime.default" :startDate="startTime.start" :endDate="startTime.end" @confirm="confirmTime('start')")
      //- mt-datetime-picker(ref="endTimePicker" type="date" v-model="endTime.default" :startDate="endTime.start" :endDate="endTime.end" @confirm="confirmTime('end')")
</template>
<style lang="stylus">
.comp-column-right-select
  position fixed
  z-index 16
  animation panel-show 0.3s ease forwards
  left 0
  right 0
  top 0
  bottom 0
  &.panel-hide
    animation panel-hide 0.3s ease forwards
    >.content
      animation panel-select-hide 0.3s ease forwards
  >.content
    height 100%
    width 6rem
    padding 20px 0
    box-sizing border-box
    float right
    transform translateX(6rem)
    background #373944
    animation panel-select-show 0.3s ease forwards
    >.wrap
      height 100%
      // width 100%
      padding 0 20px
      overflow-y auto
  .section
    .r90
      transition all .3s
      transform rotate(90deg)
    ul
      list-style-type none
    .tree-title
      position relative
      font-weight bold
      padding-left 20px
      &:before
        content ''
        display inline-block
        position absolute
        top 0
        left 0
        height 100%
        width 4px
        border-radius 2px
        background-color #c99c5e
    >ul
      padding 0
      >.tree-list
        margin-bottom 20px
        >.tree-parent
          margin-bottom 10px
          >.tree-parent__left
            position relative
            font-weight bold
            padding-left 20px
            &:before
              content ''
              display inline-block
              position absolute
              top 0
              left 0
              height 100%
              width 4px
              border-radius 2px
              background-color #c99c5e
          >.tree-parent__right
            display none
    >.search-choice
      padding-left 20px
      >.search-date
        margin 15px 0 20px
        .time
          flex 1
          height 30px
          line-height 30px
          border-radius 3px
          color #000
          background-color #FFF
        >span
          margin 0 5px
      >.resource-type
        padding 0 10px
        >button
          padding 0 20px
          height 40px
          line-height 40px
          border-radius 999px
          border 1px solid #FFF
          &.btn-free
            color #73747C
            background-color #FFF!important
          &.btn-pay
            color #FFF
            background-color #CF5449!important
          &:first-child
            background-color #73747C
          &:last-child
            background-color #6E4A45
            border-color #CF5449
    >button
      margin-top 50px
      width 100%
      height 40px
      line-height 40px
      border-radius 999px
</style>
