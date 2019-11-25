<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      booleanList: [
        { value: 'and', name: '并且' },
        { value: 'but', name: '不含' },
        { value: 'or', name: '或者' },
      ],
      cateChildList: {},
      form: {
        key: {
          type: 'name', // 'text'
          value: '',
        },
        appendKeys: [],
        appendKeysType: 'and', // but or
      },
    }
  },
  computed: {
    isAppend() {
      return this.form.appendKeys.length
    },
  },
  methods: {
    addKey() {
      if (this.form.appendKeys.length > 3) {
        return
      }
      this.form.appendKeys.push({
        name: 'name',
        value: '',
      })
    },
    goSearch() {
      if (!this.form.key.value) {
        this.$Toast(`请输入书名`)
        return
      }
      const { key, appendKeys, appendKeysType } = this.form
      let d = {}
      d[key['type']] = key['value']
      let data = {
        formData: JSON.stringify({
          ...d,
          where_all: appendKeys,
          where_type: appendKeysType,
        }),
      }
      this.$go('/search-simple', data)
    },
  },
}
</script>

<template lang="pug">
  .comp-search-advanced
    Head(name="数据库检索" type="dark")
    .wrapper 
      .main 
        .comp-adv-input(:class="!isAppend ? 'inp-group' :'' ")
          .ib.select
            select(v-model="form.key.type")
              option.opt(value="name") 书名
              option.opt(value="abs") 简介
              option.opt(value="text") 内容详情
              option.opt(value="author") 作者
          .ib.inp
            input(v-model="form.key.value")
        .check.vm-all(  v-if="form.appendKeys.length")
          .ib.f12(
            v-for="item in booleanList"
            @click="form.appendKeysType = item.value"
          )
            Checked(:checked="form.appendKeysType === item.value")
            span.txt {{item.name}}
        .inp-add.inp-group(v-if="form.appendKeys.length")
          .new-inp(v-for="item in form.appendKeys")
            .comp-adv-input
              .ib.select
                select(v-model="item.name")
                  option.opt(value="name") 书名
                  option.opt(value="abs") 简介
                  option.opt(value="text") 内容详情
                  option.opt(value="author") 作者
              .ib.inp
                input(v-model="item.value")
        .btn.tc.add_btn
          .embtn.f16.btn-search-add(@click="addKey") + 新增检索词
        .tc.isSimple
          .btn-pay-read(@click="goSearch") 数据库检索


</template>
<style lang="stylus">
.isSimple
  position absolute
  left 0
  right 0
  bottom 1rem
.inp-group
  margin-bottom 20px
  >.new-inp
    margin-bottom 20px
.simpleBtn
  position absolute
  left 0
  right 0
  bottom 1rem
.comp-search-advanced
  >.wrapper
    padding 15px
    >.main
      padding 15px
      background #FFFFFF
      box-shadow 0 2px 6px 2px rgba(132, 136, 153, 0.1)
      border-radius 4px
      >.check
        line-height 50px
        display flex
        align-items center
        justify-content space-around
        >.ib
          >.txt
            margin-left 20px
      >.add_btn
        padding-bottom 20px
      >.inp-other
        margin-top 20px
    >.go-detail
      margin 30px 0
      >.cbtn
        font-size 0.3rem
</style>
