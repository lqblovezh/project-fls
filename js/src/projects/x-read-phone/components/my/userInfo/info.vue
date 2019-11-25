<script>
import { mapMutations, mapState } from 'vuex'
import { getTask } from 'services/common'
import * as commonServices from 'services/common/member'
import * as services from 'services/x-read/userCenter'
import { DatetimePicker } from 'mint-ui'
import dayjs from 'dayjs'
export default {
  components: { DatetimePicker },
  created() {
    this.init()
  },
  data() {
    return {
      userInfo: null,
      pickerVisible: new Date(),
    }
  },
  computed: {
    // ...mapState({
    //     userInfo: state =>state.userInfo
    // })
  },
  methods: {
    ...mapMutations(['setUserInfo']),
    init() {
      this.userInfo = this.$getUserInfo()
			log('userInfo',this.userInfo)
    },
    previewImg(e) {
      //预览图
      let node = e.target
      let file = node.files[0]
			let url = URL.createObjectURL(file)
			this.$set(this.userInfo,'picture_absolute', url)
    },
    async update() {
      const pic = this.$refs.pic.files[0]
      try {
        if (pic) {
          await getTask(pic).then(res => {
            this.userInfo.picture = res.data.path
          })
        }
      } catch (a) {
        throw new Error('图片更新失败')
      }
      services
        .userInfo(this.userInfo)
        .then(res => {
          console.log('ddddddddddddddddddddddddd');
          // 这个接口没有.user
          this.setUserInfo(res.data)
          if (res.status) {
            this.$Toast({
              message: '修改成功!',
            })
          }
          sessionStorage.userInfo = JSON.stringify(res.data)
        })
        .catch(err => {
          this.$Toast({
            message: err.message,
          })
        })
    },
    openDatePicker() {
      this.$refs.picker.open()
    },
    dateConfirm(val) {
      let t = dayjs(val).format('YYYY-MM-DD')
      this.userInfo.date_of_birth = t
    },
  },
}
</script>

<template lang="pug">
.box(v-if="userInfo")
    Head(name="个人资料" hide="true")
    .ls
        .item(arrow @click="$refs.pic.click()" )
            .c6(slot="left") 头像
            .c9(slot="right")
                img.tx( :src='userInfo.picture_absolute')
                input(type='file' v-show='false' ref='pic'  @change="previewImg($event)")
        .item(arrow)
            .c6(slot="left") 用户名
            input.c9(v-model="userInfo.nick_name")
        .item(arrow)
            .c6(slot="left") 真实姓名
            input.c9(v-model="userInfo.name")
        .item(arrow)
            .c6(slot="left") 性别
            .c9
                select(v-model="userInfo.sex")
                    option(value="男") 男
                    option(value="女") 女
                    option(value="保密") 保密
        .item(arrow)
            .c6(slot="left") 出生日期
            .c9(v-text="userInfo.date_of_birth" @click="openDatePicker")
        DatetimePicker(
          @confirm="dateConfirm"
          :startDate="new Date('1920-01-01')"
          :endDate="new Date()"
          ref="picker"
          v-model="pickerVisible"
          type="date"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日")
        .item(arrow)
            .c6(slot="left") 联系手机
            input.c9(v-model="userInfo.phone")
        .item(arrow)
            .c6(slot="left") 联系邮箱
            input.c9(v-model="userInfo.email")
    yd-button.bottom(size="large" type="hollow"
      style='border-color:#eee;'
      color='#3cb4ff' @click.native="update") 确认
</template>

<style lang="stylus" scoped>
.box
  height 100vh
  overflow scroll
.ls
  padding 0 0.3rem
  .item
    display flex
    justify-content space-around
    padding-right 0.5rem
    padding-left 0.3rem
    align-items center
    border-bottom 1px solid #e8e8e8
    &::after
      content '  '
      display block
      position absolute
      width 7px
      height 1.2rem
      background url('./img/icon_go.png') no-repeat center
      background-size 7px 12px
      right 15px
    >div
      height 1rem
      line-height 1rem
    .c6
      color #666
      font-size 0.3rem
      width 100px
      flex none
    .c9
      text-align right
      flex auto
      width 150px
    input
      outline none
      border none
      height 30px
      vertical-align middle
      &:focus
        outline auto
    select
      outline none
      border none
      width 50px
      flex none
      >option
        text-align right
.tx
  width 0.6rem
  height 0.6rem
  border 1px solid #e8e8e8
  border-radius 5rem
  vertical-align middle
.bottom
  position fixed
  bottom 0
</style>
