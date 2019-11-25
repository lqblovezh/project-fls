<script>
export default {
  props:['name','detailDataOwn']
}
</script>
<template lang="pug">
.group
  .label 类型:
  span.types
    span.shallow-color( v-text="name")
    //- span  序号:
    //-   span.shallow-color {{detailDataOwn.id}}
    span  创建时间:
      span.shallow-color {{detailDataOwn.create_time}}

</template>

<style lang="stylus" scoped>

</style>


