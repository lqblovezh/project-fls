<script>
import MsgItem from './comp/msgItem'
import SysMsgItem from './comp/sysMsgItem'
export default {
  props: {
    value: {},
    list: {
      required: true
    }
  },
  components: {
    MsgItem,
    SysMsgItem
  },
  data () {
    return {}
  },
}
</script>
<template lang="pug">
.page-reply
  div(v-if="value === 'userReply'")
    MsgItem(v-for="(item,index) in list" :item="item" :index="index")
  div(v-else)
    SysMsgItem(v-for="item in list" :item="item")
</template>
<style lang="stylus"></style>