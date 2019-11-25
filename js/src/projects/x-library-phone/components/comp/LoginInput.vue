<script>
import { valiInp } from '@/common/js/directive'
const timeLong = 61
export default {
  props: {
    data: {},
    name: {},
  },
  mounted() {
    // this.$refs.inp.addEventListener('blur', this.blurHandler)
  },
  beforeDestroy() {
    // 因为组件会
    //console.log('remove')
    // this.$refs.inp.removeEventListener('blur')
  },
  data() {
    return {
      time: 0,
    }
  },
  computed: {
    showVal() {
      if (this.time === 0) {
        return '发送短信'
      } else {
        return timeLong - this.time
      }
    },
  },
  methods: {
    blurHandler(e) {
      if (!this.data.rules) return
      const inpVal = e.target.value
      valiInp(inpVal, this.data)
    },
    focusHandler() {
      // this.data.isError = false
    },
    vali() {
      // console.dir(this.$refs.inp)
      valiInp(this.$refs.inp.value, this.data)
    },
    wait() {
      if (this.time !== 0) return
      this.time++
      let timer = setInterval(() => {
        if (this.time < timeLong) {
          this.time++
        } else {
          this.time = 0
          clearInterval(timer)
        }
      }, 1000)
    },
    getPhoneCode() {
      if (this.time !== 0) return
      // this.wait()
      this.$emit('phoneClickHander')
    },
  },
}
</script>


<template lang="pug">
  .comp-login-input.f14.vm-all
    //- .ib {{data.cname}} ：
    //-  弃用 v-vali="data"  
    .icon {{data.cname}}
    input.bd_e.f16(
      @focus="focusHandler"
      @blur="blurHandler"
      :id="data.id"
      :class="{code: (data.isCode || data.isPhoneCode) }"
      :type="data.type" 
      :name="name" 
      ref="inp"
      :placeholder="data.placeholder"
      autocomplete='new-password'
      v-model="data.value")
    .ib.right-code(v-if="data.isPhoneCode || data.isCode")  
      .inp_btn.btn_login_inp(
        :class="{grey:time !== 0}"
        @click="getPhoneCode"
        v-if="data.isPhoneCode") {{showVal}} 
      img.img(
        v-if="data.isCode"
        @click="$emit('imgClickHander')"
        :src="data.img_src")
    //- .ib
      span.c_error(v-if="data.isError") {{data.display}}
</template>
<style lang="stylus">
.comp-login-input
  line-height 45px
  margin-bottom 25px
  height 45px
  display flex
  align-items center
  position relative
  color #fff
  border-radius 22.5px
  border 1px solid #B6ACA4
  background rgba(255, 255, 255, 0.4)
  >.icon
    width 1.5rem
    flex 0 0 auto
    text-align center
  >input
    height 100%
    width 5rem
    border none
    outline none
    color #fff
    background rgba(255, 255, 255, 0)
    &.code
      width 3rem
  >.right-code
    padding-left 20px
    flex 0 0 auto
    border-radius 0px 22.5px 22.5px 0px
    >.inp_btn, >.img
      position absolute
      right 0
      top 0
      bottom 0
      line-height 45px
    >.img
      border-radius 0px 22.5px 22.5px 0px
      width 100px
      height 45px
    >.btn_login_inp
      right 0
</style>
