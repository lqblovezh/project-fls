<script>
export default {
   data() {
      return {
        navTab:[
          {txt:'书城头部设置',href:'/wms/bookSettings/header',active:'active'},
          {txt:'分类设置',href:'/wms/bookSettings/sort',active:''},
        ]
      };
    },
    methods: {
      //路由跳转
      handleNavClick(index) {
         this.$router.push({ path:this.navTab[index]['href']})
      },
      checkSrc(){
        for(let list of this.navTab){
                if(this.$route.path == list.href){
                     list.active='active'
                }
                else if(this.$route.path == '/wms/bookSettings'){
                     this.navTab[0]['active'] = 'active';
                }
                else{
                     list.active=''
                }
             }
      }
    },
    created(){
       this.checkSrc();
    },
    watch: {
          //监听路由是否改变
          $route(){
             this.checkSrc();
          }
   }
}

</script>

<template lang="pug">
  div
   div.settingsNavTab
     ul
       li(v-for="(item,index) in navTab"  :class="item.active" @click="handleNavClick(index)") {{item.txt}}
   router-view
</template>


<style lang="stylus" scoped>
  .settingsNavTab
     color #333
     ul
       background rgba(242, 242, 242, 1)
       line-height 50px
       overflow hidden
       text-align center
       font-size 13px
       min-width 660px
       font-family:'微软雅黑'
       li
        float left
        width 218px
        margin-right:2px
        transition .3s
       li.active
         background rgba(215, 215, 215, 1)
       li:hover
         background rgba(215, 215, 215, 1)
         cursor:pointer
</style>
