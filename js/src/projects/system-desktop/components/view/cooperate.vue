<script>
import { mapMutations } from 'vuex'
import * as service from 'services/system/cooperate'
export default {
  components: {},
  data() {
    return {
      isActive: true,
      dialogVisible: false,
      state: {
        txt: '获取验证码',
        t: '',
      },
      isSend: false,
      formData: {
        publisher_name: '',
        publisher_subdomain: '',
        liaisons: '',
        user_name: '',
        user_pass: '',
        user_pass_confirmation: '',
        email: '',
        address: '',
        phone: '',
        code_id: '',
        code_val: '',
      },
      code: {
        code_id: '',
        code_val: '',
        code_img: '',
      },
    }
  },
  methods: {
    change(i) {
      this.leftMenu.forEach((el, index) => {
        el.isActive = index == i
      })
    },

    open() {
      if (!/^1[34578]\d{9}$/.test(this.formData.phone)) {
        this.$message.error('请先填入正确的手机号码')
        return
      }
      console.log(this.state)
      if (this.state.t != '') {
        return
      }
      this.dialogVisible = true
      this.code.code_val = ''
      this.getCode()
    },
    getCode() {
      service.getCode().then(res => {
        this.code.code_id = res.data.code_id
        this.code.code_img = res.data.code_img
      })
    },
    getPhoneCode() {
      service
        .msg({
          phone: this.formData.phone,
          code_id_img: this.code.code_id,
          code_val_img: this.code.code_val,
          not_check_user_exist: 1,
        })
        .then(
          res => {
            if (res.data) {
              this.$message.success('验证短信已发送,请注意查收')
              this.formData.code_id = res.data.code_id
              this.dialogVisible = false
            }
            if (this.state.t == '') {
              this.state = { txt: '秒后可重发', t: 60 }
              this.clock()
            }
          },
          err => {
            this.$message.error(err.payload.message)
          }
        )
    },
    clock() {
      setTimeout(_ => {
        --this.state.t
        this.state.t > 0
          ? this.clock()
          : (this.state = { txt: '重新发送', t: '' })
      }, 1000)
    },
    send() {
      service.save(this.formData).then(
        res => {
          this.$go('/home')
          this.setLoginDialog(true)
        },
        ({ payload }) => {
          this.$alert(payload)
        }
      )
    },
    ...mapMutations(['setLoginDialog']),
  },
}
</script>

<template lang="pug">
.demo
  el-dialog(:visible.sync="dialogVisible" width="300px" )
    .title(slot="title") 请输入验证码
    .checkCode
      el-input(placeholder="请填入右侧侧验证码" width="200" v-model="code.code_val")
      img(:src="code.code_img" width="100" @click="getCode")
    .footer(slot="footer" class="dialog-footer")
      el-button(type="primary" style="background:#ffbf33;border:1px solid #ffbf33" @click="getPhoneCode" size="small") 确定
  .dy
    ul.crumbs 
      li X-BOOK云平台
      li /
      li.ops 用户注册
    .content
      .title 用户注册
      form.form(v-if="!isSend")
        .group
          label(for="pwd") 用户名：
          input( id="pwd" v-model="formData.user_name")
        .group
          label(for="rpwd") 密码：
          input( id="rpwd" type="password" v-model="formData.user_pass")
        .group
          label(for="phone") 密码确认：
          input( id="phone" type="password" v-model="formData.user_pass_confirmation")
        .group
          label(for="account") 尊姓大名：
          input( id="account" v-model="formData.liaisons")
        .group
           label(for="linkman") 二级域名：
           input( id="linkman" v-model="formData.publisher_subdomain")
        .group
          label(for="name") 出版社名称：
          input( id="name" v-model="formData.publisher_name")
        //- .group
        //-   label(for="pwd") 邮箱：
        //-   input( v-model="formData.email")
        //- .group
        //-   label(for="pwd") 出版社地址：
        //-   input( v-model="formData.address")
        .group
          label( for="codes") 手机号：
          input( id="codes" v-model="formData.phone" )
        .group
          label(for="code") 验证码：
          input( id="code" v-model="formData.code_val" )
          input.getCode.button(type="button" :value="this.state.t + state.txt" @click="open")
        .group
          label
          input.button(type="button" value="提交" @click="send")
      .success(v-else="isSend")
        h2.title 注册成功
        //- .discribe
        //-   p "我们将在7个工作日内联系你，审核后将你将拥有试用资格，洽谈具体合作事项"
        //-   ul
        //-     li "试用前端地址：审核后将邮件或短信通知您"
        //-     li "试用后台地址：右上角云平台登录"
        //-   p 你可以主动联系我们
          //- ul
          //-   li  联系电话：351354
          //-   li 联系邮箱：www.qq.com

</template>
<style lang="stylus" scoped>
.dy
  width 1200px
  margin 0 auto
  font-size 16px
  margin-bottom 70px
  color #666
.crumbs
  display flex
  line-height 68px
  li
    padding 0 5px
    cursor pointer
  .ops
    color #f7793e
    cursor default
ul
  list-style none
.content
  background #fff
  padding 30px
  border-radius 5px
  >.title
    background url('./img/icon_us.png') no-repeat
    text-indent 30px
    color #f7793e
  .form
    width 447px
    margin 0 auto
    .group
      line-height 60px
      label
        width 100px
        display inline-block
        text-align right
        padding-right 10px
      #code
        width 200px
        margin-right 20px
      .button
        height 42px
        margin-top 1px
        background #f7793e
        color #ffffff
        cursor pointer
        text-indent 0
      .getCode
        width 100px
      input
        height 38px
        width 320px
        border 1px solid #ebebeb
        transition 0.3s
        outline none
        text-indent 8px
        &:hover
          border 1px solid #ccc
        &:focus
          border 1px solid #f7793e
.success
  width 570px
  margin 0 auto
  padding 50px 0
  .title
    line-height 50px
    text-indent 60px
    color #f7793e
    width 180px
    margin 0 auto
    background url('./img/success.png') no-repeat
  .discribe
    p
      padding 20px 0
    ul
      padding 0 20px
      line-height 30px
      li
        list-style-type disc
        font-size 14px
        color #888
.checkCode
  display flex
  img
    cursor pointer
.footer
  text-align center
</style>

