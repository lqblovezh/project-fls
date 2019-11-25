<script>
import JyzItem from './comp/JyzItem'
import Adv from './comp/Adv'
import VideoItem from './comp/VideoItem'
import AudioItem from './comp/AudioItem'
import * as services from 'services/x-read/jyzTemp'

// jyzTemp
export default {
  components: { JyzItem, Adv, VideoItem, AudioItem },
}
</script>


<template lang="pug">
  .page-temp-jyz 
    Head(name="第十四届金圆桌" :isSearch="false" color="o")
    .wrap 
      VideoItem
      .line-part 
      Adv(src="https://pic.36krcnd.com/201811/19141549/vxbq6qty9tbcr13x!heading")
      .section.activity
        JyzBox(name="活动资讯" icon="icon-book-og")
        .item.bd_line(v-for="item in 3") 
          JyzItem(
            time="1011-11-11"
          )
      .line-part
      .section.audio 
        JyzBox(name="音频"  icon="icon-video-og")
        AudioItem
      .line-part 
      .section.pic
        JyzBox(name="图片直播" icon="icon-pic-og")
        .ls-flex-img
          .item.ib(v-for="item in 3") 
            JyzItem(type="pic" 
              imgSrc="https://pic.36krcnd.com/201811/19141549/vxbq6qty9tbcr13x!heading"
            )
      .line-part 
      Adv(src="https://pic.36krcnd.com/201811/19141549/vxbq6qty9tbcr13x!heading")
      .section.pic
        JyzBox(name="专题文章" icon="icon-book-og" )
        .ls-flex-img
          .item.ib(v-for="item in 3") 
            JyzItem(type="pic" 
              picNmae="如果选项中有 props，那么就开始正式的规范化工作，首先声明了四个变量："
              imgSrc="https://pic.36krcnd.com/201811/19141549/vxbq6qty9tbcr13x!heading"
            )
      .line-part 
      .section.pic
        JyzBox(name="专家文章" icon="icon-book-og")
        .ls
          .item.ib(v-for="item in 3") 
            JyzItem(
              time="2018-10-16"
              des="在package.json的scripts字段中，我们加入一个postinstall钩子，它会在我们执行npm install后把pre-commit钩子挂载在Git上："
            )
      Adv(src="https://pic.36krcnd.com/201811/19141549/vxbq6qty9tbcr13x!heading")



</template>


<style lang="stylus">
.page-temp-jyz
  >.wrap
    >.section
      cursor pointer
      padding 0 15px
      >.ls
        >.item
          &:last-child
            border none
      &.pic
        >.ls-flex-img
          width 100%
</style>
