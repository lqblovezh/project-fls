<script>
import { mapMutations } from 'vuex'
import { getTask } from 'services/common'
import InfoItem from './comp/InfoItem'
export default {
  data () {
    return {
      sheetVisible: false,
      actions: [{name: '男',method: this.changeSex}, {name: '女',method: this.changeSex}, {name: '保密', method: this.changeSex}],
      info: {}, // 拷贝用户信息，避免更改数据同步更改了vuex中数据
      birthDate: new Date(),
      startDate: new Date('1900'),
      endDate: new Date(),
      canUpdateAttrs: ['sex', 'date_of_birth', 'email', 'duties', 'nick_name', 'phone', 'address']
    }
  },
  components: {
    InfoItem
  },
  mounted() {
    this.info = JSON.parse(JSON.stringify(this.$user))
        console.log(this.info)
  },
  methods: {
    ...mapMutations(['SET_USER']),
    isEmptyObj (o) {
      for (let i in o) {
        return false
      }
      return true
    },
    showActionSheet () {
      this.sheetVisible = true
    },
    changeSex (o) {
      this.$set(this.info, 'sex', o.name)
    },
    selectImg () {
      // console.log('image')
      this.$refs.pic.click()
    },
    selectDate () {
      // console.log('selectDate')
      this.$refs.picker.open()
    },
    previewImg (evt) {
      let file = evt.target.files[0]
      let url = URL.createObjectURL(file)
      this.$set(this.info, 'picture_absolute', url)
    },
    handleConfirm () {
      let d = this.birthDate
      if (d) {
        this.$set(this.info, 'date_of_birth', d.toLocaleDateString().replace(/\//g, '-'))
      }
    },
    updateInfo(opt) {
      const {
        attr,
        value
      } = opt
      this.$set(this.info, attr, value)
    },
    async save () {
      const update_data = {}
      const pic = this.$refs.pic.files[0]
      try {
        if (pic) {
          await getTask(pic).then(res => {
            update_data.picture = res.data.path
          })
        }
      } catch(e) {
        throw new Error('图片更新失败')
      }
      // 遍历可修改的属性列表，将修改过的值传入update_data对象中
      for (let i in this.canUpdateAttrs) {
        const attr = this.canUpdateAttrs[i]
        if (this.$user[attr] !== this.info[attr]) {
          update_data[attr] = this.info[attr]
        }
      }
      console.log(update_data)
      !this.isEmptyObj(update_data) && this.sendDate(update_data)
    },
    async sendDate (content) {
      try {
        let res = await this.$service.user.changeUserInfo(content)
        this.SET_USER(res.data)
        this.$Toast({
          message: '修改成功',
          iconClass: 'icon-success'
        })
      } catch(e) {
        // throw new Error('数据更新失败')
        this.$Toast({
          message: '数据修改失败',
          iconClass: 'icon-failed'
        })
      }
    }
  },
  filters: {
    format (val) {
      return val && val.replace(/^(\d{3})\d{4}(\d{4})$/, "$1****$2")
    },
    forage(val) {
      if(val == null) {
        val = ''
      }
      let nowDay = new Date()
      let Year = nowDay.getFullYear()
      let userDay = val.substring(0,4)
      // 2015-1-1
      let a = parseInt(Year)
      let b = parseInt(userDay)
      let c = String(a-b)
      return c

      // 手机不兼容

      // let data =  new Date()
      // let y = data.getFullYear()
      // // 2019
      // let for_age = new Date(val.replace(/-/,"/")) 
      // let for_age1 = for_age.getFullYear()
      // let age = String(y - for_age1)
      // return age
    }
  },
  computed: {
    wx_Info(){
      if(this.info.third_weixin){
        if(!this.info.third_weixin.nickname){
          return '未绑定'
        }else{
          return this.info.third_weixin.nickname
        }
      }else{
        return '未绑定'
      }
    },
    qq_Info(){
      if(this.info.third_qq){
        if(!this.info.third_qq.nickname){
          return '未绑定'
        }else{
          return this.info.third_qq.nickname
        }
      }else{
        return '未绑定'
      }
        },
    phone_Info(){
      if(!this.info.phone){
        return '未绑定'
      }else{
        return this.info.phone
      }
    },
    img_Info() {
      if(this.info.third_qq){
        if(this.info.third_qq.headimgurl){
          return this.info.third_qq.headimgurl
        }else{
          return
        }
      }else{
        return
      }
    }
  },
}
</script>
<template lang="pug">
.page-info
  Head(type="dark" name="个人资料")
  .info-list.f15
    .info-line
    .info-title 个人信息
    .info-panel
      InfoItem(k="头像" isImg type="icon")
        img(:src="info.picture_absolute" @click="selectImg" v-if="info.picture_absolute")
        .icon.icon-three-avatar(v-else @click="selectImg")
      InfoItem(k="账户" :val="info.name")
      InfoItem(k="昵称" editable attr="nick_name" :val="info.nick_name" type="icon" @updateInfo="updateInfo")
      InfoItem(k="性别" :val="info.sex" type="icon" @select="showActionSheet")
      InfoItem(k="年龄" :val="info.date_of_birth|forage" @selectDate="selectDate" type="icon")
      InfoItem(k="地区" editable attr="address" :val="info.address" @updateInfo="updateInfo" type="icon")
      InfoItem(k="职业" editable attr="duties" :val="info.duties" @updateInfo="updateInfo" type="icon")
      InfoItem(k="联系邮箱" editable attr="email" :val="info.email" @updateInfo="updateInfo" type="icon")
      InfoItem(k="个人介绍" val=" " path="/user-intro" type="icon")
    .info-line
    .info-title.flex
      .info-title__left 账号绑定
      .info-title__right.f12 未绑定手机号其他方式下的记录不可迁移
    .info-panel
      InfoItem(k="手机绑定" :val="phone_Info|format" isPhone attr="phone" type="false" @updateInfo="updateInfo")
      InfoItem(k="微信绑定" :val="wx_Info" type="false")
      InfoItem(k="QQ绑定" :src="img_Info" :val="qq_Info" type="false")
    button.linear-btn.btn-reset.f16.c_f(@click="save" v-show="true") 保存
  input.hide(type="file" ref="pic" @change="previewImg($event)" accept="image/*")
  mt-actionsheet(:actions="actions" v-model="sheetVisible")
  mt-datetime-picker(ref="picker" type="date" v-model="birthDate" @confirm="handleConfirm" :startDate="startDate" :endDate="endDate")
</template>
<style lang="stylus">
.info-list
  margin-bottom 15px
  padding 0 15px
  >.info-title
    position relative
    align-items center
    justify-content space-between
    padding 15px 0 15px 12px
    border-bottom 1px solid #F4F4F4
    font-weight bold
    >.info-title__right
      font-weight normal
      color #A6AAC1
    &:before
      position absolute
      content ''
      display inline-block
      left 0
      width 4px
      height 20px
      border-radius 2px
      background linear-gradient(to right, #F6D27E, #B1936A)
  img
    width 50px
    height 50px
    border-radius 5px
  .icon
    width 50px
    height 50px
    border-radius 5px
  // >.info-panel
  //   box-shadow 0 0 2px #CCC
  >button
    height 0.8rem
    line-height 0.8rem
    width 100%
    border-radius 5px
.info-line
  margin-left -15px
  margin-right -15px
  height 13px
  background-color rgb(251, 251, 251)
</style>