<script>
export default {
  props: {
    value: {},
    allChecked: {}
  },
}
</script>
<template lang="pug">
footer.manage.footer-fixed.f16(v-show="value")
  .footer-manage.flex-between-center
    .footer-select.c_f_bg.flex
      .item-checkbox
        input(type="checkbox" @click="$emit('selectAll')" :checked="allChecked")
      span.f14 全选
    button.c_f.linear-btn.btn-reset 清理
    button.c_f.btn-error.btn-reset(@click="$emit('del')") 删除
</template>
<style lang="stylus"></style>