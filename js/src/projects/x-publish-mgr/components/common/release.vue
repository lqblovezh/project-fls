<script>
import formSerialize from 'form-serialize'

import * as services from "services/x-publish/book"

export default {
  props:['ids'],
  data(){
    return {
      currType:'EPUB',  //主数据
      types:{},
      task_id:'2fcb4bb0117349718b14aab58265e440',
      progress:null,
    }
  },
  methods:{
    confirm(){
      log(this.progress)
      if(this.progress&&this.progress!='100%'){
        this.$message.error("发布中")
        return
      }
      this.$emit("releaseBack",this.currType);
      services.fabu({id:this.ids,type:this.getTypes2Arr()}).then(res=>{
        log('发布结果',res)
        this.task_id = res.data.task_id;
        this.progress = '0%'
        this.getProgress(this.task_id);
      }).catch(err => {
        this.$message.error('发布失败!',err)
      })
      // log("发布中")
    },
    getProgress(task_id){
      log("获取进度")
      // services.getProgress(task_id).then(res=>{
      //   log('进度',res)
      // }).catch(err=>{
      //   this.$message.error("获取发布进度失败!")
      // });
      this.intervalid = setInterval(()=>{
        services.getProgress(task_id).then(res=>{
          log('进度',res.data)
          this.progress = res.data.chunk + '%';
          if(res.data.chunk == 100){
            this.$message.success('发布成功!')
            this.$emit('cancle')
            clearInterval(this.intervalid)
          }
        }).catch(err=>{
          this.$message.error("获取发布进度失败!")
          clearInterval(this.intervalid)
        });
      },3000)
      // setTimeout(() => {
      //   clearInterval(this.intervalid)
      // }, 10000);
    },
    changeType(type){
      if(this.progress){
        return
      }
      this.$set(this.types , type , !this.types[type] )
      // this.types[type] = !this.types[type]
      // log(type,this.types[type])
    },
    getTypes2Arr(){
      var types = [] ;
      for (const key in this.types) {
        if (this.types.hasOwnProperty(key)) {
          const element = this.types[key];
          if(element){
            types.push(key.toLowerCase())
          }
        }
      }
      return types;
    },
  },
  destroyed(){
    clearInterval(this.intervalid)
  }

}
</script>

<template lang="pug">
.div
  .top 选择要发布的格式
  ul.typesWrap
    li.li
      .type( @click="changeType('EPUB')"  :class="{active: types['EPUB'] == true } " )
        span EPUB
        .progress( v-if="types['EPUB'] == true && progress")
          span 发布中
          span {{progress}}
      .tip 适用于
      .releaseList
        .dd
        .qq
        .zhangyue
    li.li
      .type( @click="changeType('MOBI')"  :class="{active: types['MOBI'] == true }" )
        span MOBI
        .progress( v-if="types['MOBI'] == true && progress")
          span 发布中
          span {{progress}}
      .tip 适用于
      .releaseList
        .amazon
    li.li
      .type( @click="changeType('PDF')"  :class="{active:  types['PDF']}" )
        span PDF
        .progress( v-if="types['PDF'] == true && progress")
          span 发布中
          span {{progress}}
      .tip 适用于
      .releaseList
        .qq
        .zhangyue
        .amazon
    li.li
      .type( @click="changeType('WORD')"  :class="{active:  types['WORD']}" )
        span  WORD
        .progress( v-if="types['WORD'] == true && progress")
          span 发布中
          span {{progress}}
      .tip 适用于
      .releaseList
        .qq
        .zhangyue
    li.li
      .type( @click="changeType('HTML')"  :class="{active:  types['HTML']}" )
        span HTML
        .progress( v-if="types['HTML'] == true && progress")
          span 发布中
          span {{progress}}
      .tip 适用于
      .releaseList
        .amazon
        .qq
        .zhangyue
  .btns
    el-button( @click="$emit('cancle')" type="info" ) 返回
    el-button( @click="confirm" type="primary" ) 确定

</template>


<style lang="stylus" scoped >
.btns
  text-align right
.releaseList
  >div
    height 50px
    margin 20px 0
  .dd
    background url('../../assets/dd.png') no-repeat
  .amazon
    background url('../../assets/amazon.png') no-repeat
  .qq
    background url('../../assets/qq.png') no-repeat
  .zhangyue
    background url('../../assets/zhangyue.png') no-repeat
.top
  margin 0 0 30px 30px
.typesWrap
  .li
    display inline-block
    margin 0 35px
    .type
      width 118px
      height 160px
      background #e9edf5
      border 1px solid #e3e3e3
      line-height 160px
      font-size 28px
      color #cad1e0
      text-align center
      cursor pointer
      position relative
      &.active
        border 1px solid #f10215
        color #f10215
      .progress
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        background rgba(0,0,0,0.7)
        font-size 14px
        color #fff
    .tip
      font-size 14px
      color #999999
      margin 15px 0
</style>
