<script>
import {recursionTree} from '@/util/math.js'
import formSerialize from 'form-serialize'
import * as services from "services/x-publish/video"
import UploadProgress from '@/components/common/UploadProgress'
import {detailVideo,getIconStyle} from '@/util/mixins'

export default {
  mixins: [detailVideo,getIconStyle],
  props:['type' , 'detailData' , 'detailDialog' , 'currGroup' , 'detailBack'],
  components:{UploadProgress },
  created(){
    if(this.detailData.id){
      log("查询元数据, 目录 , 数据本地化")
      services.detailVideo({id:this.detailData.id}).then(res=>{
        log(111,res)
        this.detailDataOwn = res.data
        this.detailDataOwn.previewDownload = this.parseVedio(this.detailDataOwn.preview)+".mp4"
        this.metadata = res.data.attributes
      })
      if(this.currGroup != 'non'){//当前分组id
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

    stopDefault(ev){
        ev = ev  || event;
        ev.preventDefault();
    },
    parseVedio(value){
      let arr =  value.split("/")
      return arr[arr.length-1].split(".")[0]
    },
    submitMetadata(){ // 提交元数据
      var flag = true
      for(var i= 0 ; i< this.metadata.length ; i++){
        if(this.metadata[i].key.trim()==="" || this.metadata[i].value.trim() ===""  ){
          flag = false ;
        }
      }
      if(!flag){
        this.$message.error("扩展属性不能为空!")
        return
      }
      if(this.detailDataOwn.id){ //修改
        myServices.modifyVideo({
          id:this.detailDataOwn.id ,
          attributes:this.metadata ,
        })
      }else{//新增
        myServices.addVideo({
          attributes:this.metadata ,
        })
      }
      this.$emit('detailBack')
    },


    async confirmUploadFile(){ //确定上传视频

    },

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
      //- LibraryDetail(:detailDataOwn="detailDataOwn" @submit="submit"  @back=" $emit('update:detailDialog', false)"  )
      //- 这个做备用
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
