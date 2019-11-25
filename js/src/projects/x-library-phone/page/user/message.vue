<script>
import TabContainer from '@/components/tab/container'
import TabItem from '@/components/tab/item'
import Reply from './reply'
import TextInput from './comp/TextInput'
export default {
  data () {
    return {
      selected: 'userReply', // 消息类型（评论|系统通知）
      list: [], // 消息列表
      page: {
        pageStart: 0,
        pageOffset: 10
      }, // 分页信息
      item: {}, // 需要回复的某一条消息
      isShowReply: false
    }
  },
  components: {
    TabContainer,
    TabItem,
    Reply,
    TextInput
  },
  mounted () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
				let res
				if (this.selected === 'userReply') {
					res = await this.$service.message.getReplyList(this.page)
				} else {
					res = await this.$service.message.getSysList(this.page)
				}
        this.list = [...this.list, ...res.data]
        this.page = Object.assign(JSON.parse(JSON.stringify(this.page)), {
          pageStart: this.list.length,
        })
        // 如果查出来的列表消息不是最新的排在最前面，就需要进行排序处理
        // this.list.length > 1 && this.list.sort((a, b) => {
        //   return Date.parse(b.create_time) - Date.parse(a.create_time)
        // })
      } catch(e) {
        throw new Error('获取列表失败')
      }
    },
    showReply (item) {
      // console.log(item)
      this.item = item
      this.isShowReply = true
    },
    async reply (content) {
      try {
        await this.$service.circle.add({
          type: 2,
          book_circle_comment_id: this.item.book_circle_comment_id,
          book_circle_id: this.item.book_circle_id,
          replay_user_id: this.item.user_id,
          value: content
        })
        this.$Toast({
          message: '回复成功',
          iconClass: 'icon-success'
        })
        this.isShowReply = false
      } catch(e) {
        this.$Toast({
          message: '回复失败',
          iconClass: 'icon-failed'
        })
      }
    }
  },
  watch: {
		// 监听tab切换，在切换tab之后
		// 初始化分页选项，以及重置数据列表
    selected (val, old) {
      this.page = {
				pageStart: 0,
				pageOffset: 10
			}
			this.list = []
      this.getList()
    }
  }
}
</script>
<template lang="pug">
.page-msg
  Head(type="dark" name="消息中心")
  TabContainer(v-model="selected")
    TabItem(text="回复我的" name="userReply")
    TabItem(text="系统通知" name="system")
  .line
  Scroll(
    top="92px"
		bottom="0"
    @loadMore="getList"
  )
    Reply(v-model="selected" :list="list" @showReply="showReply")
  TextInput(v-model="isShowReply" ref="textinput" @reply="reply")
</template>
<style lang="stylus"></style>
