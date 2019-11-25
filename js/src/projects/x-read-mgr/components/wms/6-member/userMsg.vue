<script>
import * as services from 'services/x-read/feedback'
export default {
  data() {
    return {
      pickerOptions: {},
      ctimePick:'',
      list:[] ,
      currentPage:1,
      page:'',
      multipleSelection: [],
      status:[
        {txt:'已回复',value:'replied'},
        {txt:'未回复',value:'noreplied'},
      ],
      infoData:null,
      backMsg:'',
      stateValue:'',
      value:'',
      where:{pageOffset:10,pageStart:0,user_name:'',user_phone:'',status:'',time_start:'',time_end:''},
      dialogVisible:false,
      activeName2: 'first'
    };
  },
  methods:{
    getList(where){
           services.getList(where).then(res=>{
              this.list = res.data;
              this.page = res.page;
           })
       },
       addInfo(){
           this.dialogVisible = true;
       },
       del(id){
           this.$confirm('真的要删除吗?').then(_=>{
               services.del({id}).then(_=>{
                    this.getList(this.where);
                })
           })
       },
       addsend(forName){
           this.$refs[forName].validate((valid)=>{
                if(valid){
                    services.save(this.infoAdd).then(_=>{
                       this.getList(this.where);
                    })
                    this.dialogVisible = false;
                    this.infoAdd={contents:'',title:'',type:''};
                }else{
                    alert('error submit!!')
                    return false;
                }
           })
           
       },
       search(){
        //   log(this.where)
          this.getList(this.where);
       },
      handleSizeChange(val) {
        this.where.pageOffset = val;
        this.getList(this.where);
      },
      handleCurrentChange(val) {
        this.where.pageStart = (val-1)*this.where.pageOffset;
        this.getList(this.where); 
      },
      handleClick(){
             
      },
      detail(id){
         services.detail({id:id}).then(res=>{
            this.infoData = res;
            this.dialogVisible = true;
         })
      },
      backMsgSend(){
          services.save({feedback_id:this.infoData.data.id,content:this.backMsg}).then(_=>{
             this.$message.success('回复成功');
             this.backMsg='';
             this.detail(this.infoData.data.id);
          })
          
      }
    },
   created(){
       this.getList(this.where);
   },
   watch:{
       ctimePick(){
           this.where.time_start = this.ctimePick[0];
           this.where.time_end = this.ctimePick[1];
       }
   }
}
</script>


<template lang="pug">
 .box 
    .top.serachWrap
        form#mainForm
            span.group-inline
                el-input(placeholder="输入用户名搜索"  v-model='where.user_name' name="user_name" clearable)
            span.group-inline
                el-input(placeholder="输入手机号搜索"  v-model='where.user_phone' name="user_phone" clearable)
            span.group-inline
                TimePick(:inputsName="['start_time','end_time']" :placeholder="['创建起始时间','创建结束时间']")
            span.group-inline
                el-select(v-model="where.status" placeholder='按是否回复搜索')
                    el-option(v-for="item in status"   :label="item.txt" :value="item.value" :key='item.txt')
            span.group-inline.right
                el-button(type="primary" plain @click='search' icon="el-icon-search") 搜索
    .content 
        table.list
            thead
                tr 
                    td  序号  
                    td  用户名 
                    td  帮定手机号
                    td  消息内容 
                    td  创建时间
                    td  状态
                    td  操作
            tbody 
                tr(v-for="(item,index) in list" )
                   td {{index+1}}
                   td {{item.user?item.user.name:''}}
                   td {{item.user?item.user.phone:''}}
                   td {{item.content}}
                   td {{item.create_time}}
                   td(v-if='item.replies.length') 已回复
                   td(v-else) 未回复
                   td 
                      el-button( size='medium' type="primary" plain @click='detail(item.id)') 详情
                      el-button( size='medium' type="danger" plain @click='del(item.id)') 删除
        .page
            el-pagination(@size-change="handleSizeChange" 
                          @current-change="handleCurrentChange" 
                          background
                          :current-page="currentPage" 
                          :page-sizes="[10, 50,100]"
                          :page-size="10" 
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page.total"
                          )
    template(v-if="infoData")     
      el-dialog( width="60%" :visible.sync="dialogVisible")
        el-tabs(v-model="activeName2" type="card" @tab-click="handleClick")
          el-tab-pane(label="详情" name="first")
            div.userInfo
              img.tx(src='infoData.data.user.picture_absolute' alt='暂无头像' v-if="infoData.data.user.picture_absolute")
              img.tx(src='../../../static/images/member/u6268.png' alt='默认头像' v-else="infoData.data.user.picture_absolute")
            dl
              dd {{infoData.data.user.name}} {{infoData.data.create_time}}
              dt.mainMsg {{infoData.data.content}}
            .backInfo
              dl.item(v-for='msg in infoData.data.replies' v-if='infoData.data.replies.length')
                  dd 于 {{msg.create_time}} 回复：
                  dt
                    pre {{msg.content}}
            .title 系统回复
            el-input(type="textarea" placeholder='请输入回复内容' :rows="8" v-model='backMsg')

        span(slot="footer" class="dialog-footer")
                el-button(@click="dialogVisible = false") 取消
                el-button(type="primary" @click="backMsgSend") 确定

</template>


<style lang="stylus" scoped>
.box 
    background #ececec
    padding 0 15px
    min-height 650px
    min-width 1500px
    .top
        margin-bottom 20px
        .group-inline
            .form-control
               width 100%
               height 40px
    .list
        border 15px solid #fff
        background #fff
        width 100%
        line-height 50px
        margin-bottom 50px
        thead 
          background #ececec
          tr 
            background #ececec
            td  
                padding 10px 10px
                text-align center
        tbody
            tr
                transition 0.1s
                &:nth-child(2n)
                    background #eee
                td  
                    padding 10px
                    text-align center
    .page
        text-align center;
        padding-bottom 50px
  .userInfo
     .tx
        float left
        padding 0 20px 0 0
      dd
        margin 10px 0
  .mainMsg
     min-height 50px
  .backInfo
    max-height 300px
    width 100%
    overflow-y scroll
    &::-webkit-scrollbar-thumb
      background-color rgba(0,150,136,0.8);  
      height 50px;  
      outline-offset -2px;  
      outline 2px solid #fff;  
      -webkit-border-radius 4px;  
      border 1px solid #fff;
    /*---滚动条大小--*/ 
    &::-webkit-scrollbar  
      width 4px  
      height 8px
    /*---滚动框背景样式--*/ 
    &::-webkit-scrollbar-track-piece{  
      background-color:#e8e8e8;  
      border none
    } 
  .item
      border 1px dashed #e8e8e8
      padding 10px
      overflow hidden
      margin 10px 0
      position relative
      // .left 
      //    float left 
      //    width 80%
      // .right
      //    width 10%
      //    position absolute
      //    right 0
      //    bottom 10px
  dd 
      margin-bottom 10px
      color #44c3aa
  .backMsgdel
      float right
  .title
     border-bottom 1px dashed #999
     line-height 40px
     margin 20px 0
body .el-tabs__item.is-active
     border 1px solid red  !important 
</style>
