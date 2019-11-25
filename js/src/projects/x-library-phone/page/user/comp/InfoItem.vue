<script>
export default {
  props: {
    src:{
      type: String
    },
    // 标签名
    k: {
      type: String,
      required: true
    },
    // 是否是图片
    isImg: {
      type: Boolean,
      default: false
    },
    // 值
    val: {
      type: String,
    },
    // 是否是需要跳转的item
    path: {
      type: String
    },
    type: {},
    // 是否可编辑
    editable: {
      type: Boolean,
      default: false
    },
    // 绑定的属性名称
    attr: {}
  },
  data () {
    return {
      isFocus: false,
      clone_val: ''
    }
  },
  methods: {
    callSomething () {
      if (this.k === '性别') {
        this.$emit('select')
      }
      if (this.k === '年龄') {
        this.$emit('selectDate')
      }
      if (this.path) {
        this.$go(this.path)
      }
    },
    edit () {
      if (this.editable) {
        this.isFocus = true
        this.clone_val = this.val
        this.$nextTick(() => {
          this.$refs.item.focus()
        })
      }
    },
    updateInfo () {
      this.isFocus = false
      console.log(this.attr, 'attr')
      this.$emit('updateInfo', {
        attr: this.attr,
        value: this.clone_val
      })
    }
  }
}
</script>
<template lang="pug">
.info-item.flex-between-center(:class="{ptb15: isImg}")
  .info-item__left {{k}}
  .info-item__right.flex-between-center(@click="callSomething")
    img(class="qq_Img" v-if="src" :src="src") 
    .info-item__val.c_gray1.f14.mr15(v-if="!isImg && !isFocus" :class="{dcolor: val}" @click="edit") {{val||'暂未填写'}}
    .info-item__text.mr15(v-else-if="isFocus")
      input(type="text" ref="item" @blur="updateInfo" v-model="clone_val")
    .info-item__img.mr15(v-else-if="isImg")
      slot
    .icon-more(v-show="type ==='icon'")
</template>
<style lang="stylus">
.info-item
  height 50px
  border-bottom 1px solid #F4F4F4
  &.ptb15
    padding 15px 0
  >.info-item__left
    color #373944
  >.info-item__right
    >.dcolor
      color #676A7B
    >.mr25
      margin 25px
  .qq_Img{
    width 50px
    border-radius 50%
    margin-right 10px
  }
</style>