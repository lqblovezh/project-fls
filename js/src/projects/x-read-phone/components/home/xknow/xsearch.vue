<script>
export default {
  props: ['choose', 'list'],
  created() { },
  computed: {
    listObj() {
      let obj = {}
      this.choose.forEach(i => {
        obj[i.id] = i
      })
      return obj
    },

  },
  methods: {
    isTure(i) {
      // return  true
      // 10abce3b-2eb0-495f-b7a7-e975ef1c1915
      return this.listObj[i.id] ? true : false
    },
    check(e, i) {
      // 先判断是否有

      let node = e.target
      if (node.className.indexOf('true') != -1) {
        // node.classList.remove('true')
        this.$emit('moveItem', i)
      } else {
        // node.classList.add('true');
        this.$emit('addItem', i)
      }
    }
  },
}
</script>

<template lang="pug">
.div() 
  .know(v-for="(konws,index) in list") 
    .title 
      .name {{konws.name}}
      .down(@click="$set(konws, 'fold' , !konws.fold )" :class="{fold:konws.fold}")
    .ls(v-if="!konws.fold" ) 
      .item-know(v-for="(item,index) in konws.nowledge_info" :class="{true:isTure(item) }"   @click="check($event,item)") {{item.name}}
</template>

<style lang="stylus" scoped>
.item-know
  height 0.55rem
  background #f6f6f6
  color #555555
  display inline-block
  padding 0.15rem 0.35rem
  border-radius 0.08rem
  margin-right 0.15rem
  margin-top 0.2rem
  font-size 0.26rem
  &.true
    background rgba(20, 175, 255, 0.1)
    color #14afff
.know
  padding 0.3rem
  .ls
    margin-top 5px
  .title
    font-size 0.3rem
    display flex
    justify-content space-between
    height 0.4rem
    align-items center
    .choose
      width 5rem
      .name
        color #333
    .down
      width 0.4rem
      height 100%
      background url('./img/open-true.png') no-repeat right center
      background-size 0.2rem 0.15rem
      &.fold 
        background url('./img/open.png') no-repeat right center
        background-size 0.15rem 0.2rem
        
</style>
