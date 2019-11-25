<script>
import VaForm from  '@/components/common/VaForm'

import {recursionTree} from '@/util/math.js'
import formSerialize from 'form-serialize'
import * as services from "services/x-publish/AR"
import UploadProgress from '@/components/common/UploadProgress'
import {detailVideo,getIconStyle} from '@/util/mixins'

export default {
  props:['type' , 'detailData' , 'detailDialog' , 'currGroup' , 'detailBack'],
  mixins: [detailVideo,getIconStyle],
  components:{UploadProgress ,VaForm},
  created(){
    if(this.detailData.id){
      log("查询元数据, 目录 , 数据本地化")
      services.detailLibraries({id:this.detailData.id}).then(res=>{
        log(res)
        this.detailDataOwn = res.data
        this.metadata = res.data.attributes || []
      })
      if(this.currGroup != 'non'){
        this.detailDataOwn.group_id = this.currGroup ;
      }
    }else {
       this.metadata= this.detailDataOwn.attributes ;
    }
  },
  data() {
    return {
			services,
      detailDataOwn:{
        img_status:false ,
        attributes:[],
      } ,
      metadata:[  //扩展属性
      ],
      previewImgUrl:null, // 详情图片本地预览
      previewMediaUrl:null , // 媒体文件预览
      previewOtherFileUrl:null, // 详情外链文件预览
      imgUrl:null , // 图片上传后的真实url
      fileMsg:{  // 外链图片信息
        size:"" , // 外链没有size
        format:"",
      },
      mediaFile:null , // 用于记录每次导入的文件信息
      coverFile:null , // 封面文件
      percentage:0 , // 上传百分比
      mediaTypeName:'视频',
      mediaType:'video'
    };
  },
  computed:{
    detailType(){
      if(this.detailDataOwn.img_status){
        return "wailian"
      }
      return  "bendi"
    }
  },
  methods: {

  },
};
</script>

<template lang="pug">
.div
  UploadProgress(:percentage="percentage" v-if="percentage")
  el-button(@click="detailReadOnly=false" class="modifyBtn" v-if="detailReadOnly" type="primary" size='small' plain) 修改
  el-tabs( :value="type" @tab-click="handleClick")
    //- 详情
    el-tab-pane( label="详情" name="xq")
      include ../../common/pug/contentDetail
    //- 扩展属性
    el-tab-pane( label="扩展属性"  name="data" )
      MetaData( :metadata="metadata" @submit="submitDetail" @back="$emit('update:detailDialog', false)" :readOnly="detailReadOnly")


</template>


<style lang="stylus" scoped>
.btns
  text-align right
.fenmian
  height 200px
  margin-left 25px
  .label
    text-align left
.previewImgUrl
  width 250px
.rowWrap
  .left
    width 150px
    min-width 150px
  .right
    width 350px
    margin-left 10px
  .btn
    margin-left 20px
.meta
  .btns
    margin 50px 50px 0 0
.metaadd
  text-align right
  margin 50px 50px
.muluWrap
  .left
    width 300px
    background red
    display inline-block
    overflow auto
  .right
    width calc( 100% - 300px)
    display inline-block
    min-height 500px
.imgSizeWrap
	height 30px
	margin-top 30px
	.imgSize
		display inline-block
		line-height 20px
		margin-left 130px
		font-size 14px
		color #333
</style>
