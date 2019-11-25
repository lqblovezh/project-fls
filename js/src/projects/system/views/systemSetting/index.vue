<script>
import formSerialize from 'form-serialize'
import * as commonServices from "services/x-publish/common"
import * as services from 'services/common/setting'
import {
  debounce
} from 'lodash'
import {
  save,getInfo,del,getTask
} from 'services/system/home'
export default {
  data() {
    return {
      info: {}, //当前平台
      loginInfo:null,
      contact:null,
      outlink:[],
      ewm:[],
    }
  },
  mounted() {
    this.getloginInfo();
  },
  methods: {
    upload(type,index){
      if(type=='ewm'){

        return this.$refs[type+index][0].click();

      }
      this.$refs[type].click();
    },
    getUrl(type,e,i){
      getTask(e.target.files[0]).then(res=>{
        let d;
        if(type=='ewm'){
            d=this['ewm'][i]
        }else{
            d= this.loginInfo[type];
        }
        d.value= res.data.path;
        d.lsUrl = res.data.url;
        this.push(d)
      })
    },
   async getloginInfo() {
      await getInfo().then(res=>{
        this.loginInfo = res.loginInfo;
        this.outlink =  res.outlink;
        this.contact =  res.contact;
        this.ewm = res.ewm;
    })
   },
    add(){
        this.outlink.push({name:'outlink',key:'',value:'',type:1})
    },
    adderm(){
        this.ewm.push({name:'ewm',key:'',value:'',type:2})
    },
    del(index,type){
      if(this[type][index]['id']){
        del({id:this[type][index]['id']})
      }
        this[type].splice(index,1);
    },
    push(data){
      if(data.key && data.value){
        save(data).then(res=>{
          this.$message.success('保存成功');
          this.getloginInfo();
        },err=>{
          this.$message.error('保存失败');
        })

      }
    }
  }

}
</script>

<template lang="pug">
.content(v-if="loginInfo")
  .titleWrap(class="loginSetting")
      .tableTop
        .title.vel-line
          span(class="titleText" ) 登录页设置
  .box
    .part
      .title
        el-input(:value="1" width="300" placeholder="请输入内容"  v-model="loginInfo.title.value" @blur='push(loginInfo.title)')
          template(slot="prepend") 标题：
      .logo
        el-button(@click='upload("ico")' type="primary" size="small") 网站 ICO 上传
        input(type="file" ref="ico" class="hidden" @change="getUrl('ico',$event)")
        br
        img(:src="loginInfo.ico.value" v-if="loginInfo.ico")
      .logo
        el-button(@click='upload("logo")' type="primary" size="small") Logo 上传
        input(type="file" ref="logo" class="hidden" @change="getUrl('logo',$event)")
        br
        img(:src="loginInfo.logo.value" v-if="loginInfo.logo")
      .banner
        el-button(@click='upload("banner")' type="primary" size="small") Banner 上传
        input(type="file" ref="banner" class="hidden" @change="getUrl('banner',$event)")
        br
        img(:src="loginInfo.banner.value" v-if="loginInfo.banner")
      .title
        el-input(:value="1" width="300" placeholder="请输入内容" v-model="contact.phone.value" @blur='push(contact.phone)')
            template(slot="prepend") 电话：
      .title
        el-input(:value="1" width="300" placeholder="请输入内容" v-model="contact.email.value" @blur='push(contact.email)')
            template(slot="prepend") 邮箱：
      .title
        el-input(:value="1" width="300" placeholder="请输入内容" v-model="contact.qq.value" @blur='push(contact.qq)')
            template(slot="prepend") QQ：
    .part.outline
      .info 注：登录页-联系我们
      .group(v-for="item,index in ewm" v-if="ewm.length")
        el-input.link(placeholder="联系我们相关名称" size="small" v-model="item.key" @blur='push(item)')
        img(:src="item.value" style="height:30px;margin:0;margin-right:20px" v-if="!item.lsUrl")
        img(v-else :src="item.lsUrl" style="height:30px;margin:0;margin-right:20px")
        el-button(@click='upload("ewm",index)' type="primary" size="small") 二维码上传
        input(type="file" :ref="'ewm'+index"  class="hidden"  @change="getUrl('ewm',$event,index)")
        el-button(type="danger" size="small" @click="del(index,'ewm')") 删除
      .group.add
        el-button(type="primary" size="small" @click="adderm") 添加
    .part.outline
      .info 注：登录页-外链地址
      .group(v-for="item,index in outlink")
        el-input.link(placeholder="外链名称" size="small" v-model="item.key" @blur='push(item)')
        el-input.link(placeholder="外链地址" size="small" v-model="item.value" @blur='push(item)')
        el-button(type="danger" size="small" @click="del(index,'outlink')" ) 删除
      .group.add
        el-button(type="primary" size="small" @click="add") 添加

</template>

<style lang="stylus" scoped>
.content
  padding 15px
  min-width 1600px
  .titleWrap
    background #fff
    height 46px
    .title
      margin 0 15px
      line-height 46px
      position relative
      border-bottom 1px solid #ccc
    .vel-line:before
      content " "
      position absolute
      width 4px
      height 20px;
      z-index 10
      top 13px
      left 10px
      background #39baa1
    .titleText
      color #333
      margin-left 20px
  .logo,.title,.banner,.label
    margin 15px 0
  .title
    width 400px
  .hidden
    display none
  img
    display block
    max-height 60px
    margin 20px 0
  .banner img
    max-height 150px
.box
  display flex
  margin 15px 0
  .part
    border 1px solid #ccc
    padding 15px
    border-radius 5px
    margin-right 15px
    background #fff
    height 700px
    overflow-x hidden
    overflow-y auto
  .outline
    .group
       min-width 500px
       display flex
       margin-bottom 10px
       .link
        width 200px
        margin-right 10px
    .add
      justify-content center
.footer
  text-align center
.info
  color #aaa
  font-size 12px
  margin-bottom 12px
</style>
