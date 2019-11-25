<script>
import { mapState } from 'vuex'
import AdvInput from './comp/AdvInput'
import SpecialLine from './comp/SpecialLine'
export default {
  components: { AdvInput, SpecialLine },
  data() {
    return {
      payList: [
        {
          value: 'all',
          name: '全部内容',
        },
        {
          value: 'free',
          name: '免费内容',
        },
        {
          value: 'pay',
          name: '付费内容',
        },
      ],
      booleanList: [
        {
          value: 'and',
          name: '并且',
        },
        {
          value: 'but',
          name: '不含',
        },
        {
          value: 'or',
          name: '或者',
        },
      ],
      cateChildList: {},

      form: {
        key: {
          type: 'title', // 'text' // '副标题'
          value: '',
        },
        appendKeys: [
          // {
          //   type: 'title', // 'text'
          //   value: '',
          // },
        ],
        appendKeysType: 'and', // but or
        keyword: {
          type: 'author', // unit
          value: '',
        },
        category: {
          cateId: '',
          childId: '',
        },
        time: {
          time_start: '',
          time_end: '',
        },
        sources: '',
        price: 'all', //  pay free
      },
    }
  },
  computed: {
    ...mapState({
      column: state => state.category.column,
    }),
    cateChild() {
      if (!this.form.category) return

      return this.cateChildList[this.form.category.cateId]
    },
    isAppend() {
      return this.form.appendKeys.length
    },
    placeholder(){
      console.log(this.form);
      if(this.form.key.type=='title'){
        return '请输入标题、副标题、案号'
      }else{
        return ''
      }

    }
  },
  watch: {
    'form.category.cateId': function(cateId) {
      console.log(cateId)
      if (this.cateChildList[cateId]) {
        return
      } else {
        this.$service.category
          .getCategory({
            type: 'column',
            pid: cateId,
          })
          .then(res => {
            console.log(cateId, res.data)
            this.$set(this.cateChildList, cateId, res.data)
          })
      }
    },
  },
  mounted() {
    this.$store.dispatch('category/getCategory', {
      type: 'column',
      pid: 'root',
    })
  },
  methods: {
    chooseTime(type) {
      let limitTime =
        type === 'start' ? this.form.time.time_end : this.form.time.time_start

      // console.log(object);
      this.$openTime({ type, limitTime }).then(res => {
        // console.log(res)
        this.form.time['time_' + type] = res
      })
    },
    addKey() {
      this.form.appendKeys.push({
        type: 'title',
        value: '',
      })
    },
    goSearch() {
      // 因为后台要formdata对象, 不要json,
      // 但是复杂表单当成参数放在url上有问题,
      // 因此序列化表单, 然后放进url上, 再另一个页面反序列化后传给后台
      // this.$service.search.advSearch({ data: this.form })
      if (!this.form.key.value && !this.form.keyword.value  && !this.form.time.time_end && !this.form.time.time_start && !this.form.sources) {
        this.$Toast(`请输入关键字进行检索`)
        return
      }
      let data = {
        formData: JSON.stringify(this.form),
        list_type: 'advance_form',
      }

      this.$go('/normal-list', { pid: this.form.category.cateId, cid: this.form.category.childId, ...data})
    },
  },
}
</script>


<template lang="pug">
  .comp-search-advanced
    Head(name="精确匹配关键词检索")
    .wrapper 
      .main 
        .comp-adv-input(:class="!isAppend ? 'inp-group' :'' ")
          .ib.select
            select(v-model="form.key.type")
              option.opt(value="title") 标题
              option.opt(value="text") 正文
              // option.opt(value="副标题") 副标题
          .ib.inp
            input(v-model="form.key.value" :placeholder="placeholder")
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
                select(v-model="item.type")
                  option.opt(value="title") 标题
                  option.opt(value="text") 正文
                  // option.opt(value="副标题") 副标题
              .ib.inp
                input(v-model="item.value" :placeholder="placeholder")
        .btn.tc.add_btn
          .embtn.f16.btn-search-add(@click="addKey") + 新增检索词
        SpecialLine
        .inp-other.inp-group 
          .new-inp
            .comp-adv-input
                .ib.select
                  select(v-model="form.keyword.type")
                    option.opt(value="author") 作者
                    option.opt(value="unit") 发布单位
                .ib.inp
                  input(placeholder="" v-model="form.keyword.value")
          .new-inp
            .comp-adv-input
                .text(v-width="'内容品类'") 
                .ib.select
                  select( v-model="form.category.cateId")
                    option.opt(value="") 不限
                    option.opt(
                      :key="cate.id"
                      v-for="cate in column"
                      :value="cate.id"
                    ) {{cate.name}}
                .ib.select
                  select(v-if="form.category.cateId" v-model="form.category.childId") 
                    option.opt(value="") 不限
                    option.opt(
                      v-for="cate in cateChild"
                      :key="cate.id"
                      :value="cate.id"
                    ) {{cate.name}}
          .new-inp
            .comp-adv-input
                .text(v-width="'公布时间'")
                .ib.inp
                  input(placeholder="开始时间" 
                    readonly 
                    v-model="form.time.time_start"
                    @focus="chooseTime('start')")
                .text.tc(v-width="' 至 '")
                .ib.inp
                  input(placeholder="结束时间" 
                    readonly  
                    v-model="form.time.time_end"
                    @focus="chooseTime('end')" )
          .new-inp
            .comp-adv-input
                .text(v-width="'内容来源'")
                .ib.inp
                  input(placeholder="书名或套系名称 卷册号" 
                    v-model="form.sources"
                  )
        .check.vm-all
          .ib.f12.target(
            v-for="item in payList"
            @click="form.price = item.value"
          )
            Checked(:checked="form.price === item.value")
            span.txt {{item.name}}
        .tc
          .btn-pay-read(@click="goSearch") 开始检索
      .go-detail.tc
        .cbtn.red(@click="$go('/search-exact')") 进入精确匹配刑事法构成要素的关键词检索 


</template>
<style lang="stylus">
.select
  >select
    -webkit-appearance none  
    background url('../../common/img/selectIcon.png')no-repeat right !important
.inp-group
  margin-bottom 20px
  >.new-inp
    margin-bottom 20px
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
input 
  outline none
  background-color rgb(244,244,244)!important
  border-top 0px
input::-webkit-input-placeholder 
  font-size 12px
</style>
