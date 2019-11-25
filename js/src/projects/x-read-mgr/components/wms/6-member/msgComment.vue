<script>
import * as services from 'services/x-read/message'
export default {
    data(){
        return {
            pickerOptions: {},
            ctimePick:'',
            stateValue:'',
            page:'',
            type:null,
            where:{pageOffset:10,pageStart:0,title:'',contents:'',type:'',start_time:'',end_time:''},
            currentPage:1,
            infoAdd:{contents:'',title:'',type:''},
            rules:{
               title:[
                   {required: true, message: '消息标题不能为空', trigger: 'blur'},
               ],
               type:[
                   {required: true, message: '消息类型不能为空',trigger: 'change'},
               ],
               contents:[
                   {required: true, message: '消息类型不能为空', trigger: 'blur'},
               ],
            },
            dialogVisible:false,            
            list:[],
        }
    },
    methods:{
       getList(where){
           services.getList(where).then(res=>{
              this.list = res.data;
              this.page = res.page;
           })
       },
       getType(){
          services.getType().then(res=>{
              this.type = res.data;
          })
       },
       addInfo(){
           this.dialogVisible = true;
       },
       del(id){
           this.$confirm('你真的要删除么?').then(_=>{
               services.del({id}).then(_=>{
                    this.getList(this.where);
                })
           })
           
			 },
			 push(id){
          services.push({id}).then((res)=>{
						 this.getList(this.where);
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
           log(this.where)
          this.getList(this.where);
       },
      handleSizeChange(val) {
         this.where.pageOffset = val;
         this.getList(this.where);
      },
      handleCurrentChange(val) {
        this.where.pageStart = (val-1)*this.where.pageOffset;
        this.getList(this.where); 
      }
    },
   created(){
       this.getList(this.where);
       this.getType();
   },
   watch:{
       ctimePick(){
           this.where.start_time = this.ctimePick[0];
           this.where.end_time = this.ctimePick[1];
       }
   }
}
</script>


<template lang="pug">
  .box 
    .top.serachWrap
        form#mainForm
            span.group-inline
                el-input(placeholder="输入标题搜索"  v-model='where.title' name="title" clearable)
            span.group-inline
                el-input(placeholder="输入内容搜索"  v-model='where.contents' name="contents" clearable)
            span.group-inline
                TimePick(:inputsName="['start_time','end_time']" :placeholder="['创建起始时间','创建结束时间']")
            span.group-inline.right
                el-button(type="primary" plain @click='search' icon="el-icon-search") 搜索
                el-button(type="primary" @click="addInfo" icon="el-icon-plus") 新增
    .content 
        table.list
            thead
                tr 
                  td  序号  
                  td  消息类型 
                  td  消息标题
                  td(width='35%' title)  消息内容 
                  td  创建时间
                  td  操作
            tbody 
                tr(v-for="(item,index) in list")
                  td {{index+1}}
                  td {{item.type}}
                  td {{item.title}}
                  td {{item.contents}}
                  td {{item.create_time}}
                  td 
                    el-button( size='medium' type="primary" plain @click='push(item.id)') {{item.push==1?'已推送':'推送'}}
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
    el-dialog(:visible.sync="dialogVisible" width="500px" )
        div 
          el-form(:model="infoAdd" :rules="rules" ref="ruleForm")
            el-form-item(label="消息类型：" prop="type")
                el-select(v-model="infoAdd.type" placeholder='选择类型搜索')
                    el-option(v-for="item in type"   :label="item" :value="item" :key='item')
                //- el-input(placeholder = " plase write something" v-model="infoAdd.type" )
            el-form-item(label="消息标题：" prop="title")
                el-input(placeholder = "plase write something" v-model="infoAdd.title")
            el-form-item(label="消息内容：" prop="contents")
                el-input(type="textarea" :rows="4" placeholder = "plase write something" v-model="infoAdd.contents")
        div(slot="footer" class="dialog-footer")
           el-button(@click='dialogVisible = false' ) 取消
           el-button(@click='addsend("ruleForm")' type='success') 确定
                                
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
        line-height 25px
        margin-bottom 50px
        font-size 14px
        thead 
          background #ececec
          tr 
            background #ececec
            td  
                padding 10px 10px
                text-align  center
        tbody
            tr
                transition 0.1s
                &:nth-child(2n)
                    background #eee
                td  
                    padding 10px
                    text-align center
                    vertical-align middle
    .page
        text-align center;
        padding-bottom 50px
</style>



