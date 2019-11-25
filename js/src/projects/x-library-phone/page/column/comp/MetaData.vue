<script>
export default {
  props: {
    meta: {},
    type: {
      default: '权威案例',
    },
  },
  data() {
    return {
      resolvedMeta: [],
    }
  },
  created() {
    let key = this.meta.base_type || this.meta.type
    let meta
    switch (key) {
      case 1: // 权威
        meta = [
          {
            name: '案例出处',
            value: this.meta.出处,
          },
          {
            name: '发布时间',
            value: this.meta['发布时间'],
          },
          {
            name: '发布单位',
            value: this.meta.发布单位,
          },
        ]
        break
      case 2: // 法规
        meta = [
          { name: '发布机构', value: this.meta.发布单位 },
          { name: '发布字号', value: this.meta.发文字号 },
          { name: '公布日期', value: this.meta.发布日期 },
          { name: '实施日期', value: this.meta.实施日期 },
          { name: '修改日期', value: this.meta.修改日期 },
          { name: '失效日期', value: this.meta.失效日期 },
          { name: '修改/失效依据', value: this.meta['修改/失效依据'] },
          { name: '效力级别', value: this.meta.效力级别 },
          { name: '效力状态', value: this.meta.效力状态 },
        ]
        break
      case 3: // 文献
        meta = [
          { name: '作者', value: this.meta.作者 },
          { name: '其他作者', value: this.meta.其他作者 },
          { name: '文献出处', value: this.meta.文献出处 },
          { name: '析自文献作者', value: this.meta.析自文献作者 },
          { name: '发表时间', value: this.meta.发表时间 },
        ]
        break
      case 4: // 裁判库
        meta = [
          { name: '裁判出处', value: this.meta.裁判出处 },
          { name: '审判法院', value: this.meta.审判法院 },
          { name: '案例编号', value: this.meta.案例编号 },
          { name: '判决时间', value: this.meta.判决时间 },
          { name: '案由', value: this.meta.案由 },
          { name: '审理程序', value: this.meta.审理程序 },
        ]
        break
      case 7: // 裁判库
        meta = [
          { name: '作者', value: this.meta.作者 },
          { name: '资源出处', value: this.meta.资源出处 },
          { name: '发表时间', value: this.meta.发表时间 },
          // { name: '资源大小', value: this.meta.资源大小 },
        ]
        break
      case 8: // 课程影音
        meta = [
          { name: '专业类别', value: this.meta.专业类别 },
          { name: '内容原作者', value: this.meta.内容原作者 },
          { name: '出版时间', value: this.meta.出版时间 },
          { name: '案件类别', value: this.meta.案件类别 },
        ]
        break
    }
    this.resolvedMeta = meta
  },
  filters: {
    Time(v) {
      let r = v && v.match(/\d{4}-\d{1,2}-\d{1,2}/g)
      return r && r.length ? r[0] : v
    },
  },
}
</script>

<template lang="pug">
  .comp-meta-data.f12
    .type
      div(v-for="item in resolvedMeta")
        span.c_4 {{item.name}} : 
        span.c_7 {{item.value | Time}}
</template>
<style lang="stylus">
.comp-meta-data
  display inline-block
</style>
