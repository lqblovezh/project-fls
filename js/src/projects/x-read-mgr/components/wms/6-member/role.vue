<script>
import * as services from 'services/x-read/role';
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
        {txt:'所有',value:''},
        {txt:'正常',value:'normal'},
        {txt:'冻结',value:'locked'},
      ],
      imgListSrc:[{src:'../../../static/images/member/u6294.png'},{src:'../../../static/images/member/u6302.png'},{src:'/static/images/member/u6306.png'},{src:'/static/images/member/u6312.png'},{src:'/static/images/member/u6314.png'}],
      infoData:null,
      backMsg:'',
      stateValue:'',
      value:'',
      userInfo:{},
      form:{name:'',exp:'',id:''},
      rules:{
         name:[
           { required: true, message: '请输入用户种类', trigger: 'blur' }
         ],
         exp:[
           { required: true, message: '请输入种类描述', trigger: 'blur' }
         ]
      },
      where:{name:''},
      dialogVisible:false,
      activeName: 'first'
    };
  },
  methods:{
    getList(where){
            services.getList(where).then(res=>{
              this.list = res.data;
              log(res)
              this.page = res.page;
           })
       },
    addInfo(){
       this.dialogVisible = true;
    },
    addSend(forName){
      log(this.$refs[forName],forName);
      this.$refs[forName].validate((valid)=>{
        if(valid){
          log(this.form)
          services.save(this.form).then(_=>{
            this.getList();
        })
        this.dialogVisible = false;
        this.form={name:'',exp:''};
				}else{
						alert('error submit!!')
						return false;
				}
		  })
           
    },
    del(id){
      log(id)
           this.$confirm('真的要删除吗?').then(_=>{
               services.del({id}).then(_=>{
                    this.getList();
                })
           })
       },
    search(){
      log(this.where)
      this.getList(this.where);
    },
		handleClick(){
						
		},
		detail(id){
				services.detail({id:id}).then(res=>{
					this.form = res.data;
					this.dialogVisible = true;
				})
		},
	},
	created(){
		this.getList(this.where);
	},
}
</script>


<template lang="pug">
.box 
    .top.serachWrap
        form#mainForm
            span.group-inline
              el-input(placeholder="输入用户种类搜索"  v-model='where.name' name="name" clearable)
            span.group-inline.right
              el-button(type="primary" icon="el-icon-search" plain @click='search') 搜索
              el-button(type="primary" icon="el-icon-plus" @click='addInfo') 新增
    .content 
        table.list
            thead
                tr
                  th(width=40) 序号
                  th 用户种类
                  th 种类描述
                  th 操作
            tbody 
               tr(v-for="(item,index) in list")
                  td {{index+1}}
                  td {{item.name}}
                  td {{item.exp}}
                  td 
                    span.icon.icon-detail(type="primary" title="详情" plain size="mini" @click="detail(item.id)") 
                    span.icon.icon-delete(type="primary" title="删除" plain size="mini" @click="del(item.id)")
    el-dialog( width="600px" :visible.sync="dialogVisible")
      .header(slot="title")
        el-tabs(value="detail")
          el-tab-pane(label="详情" name="detail")
      el-form(:model="form" :rules="rules" ref="form" label-width='80px')
        el-form-item(label="用户种类" prop='name' style='width:400px;margin-top:10px') 
          el-input(v-model="form.name" )
        el-form-item(label="种类描述" prop='exp')
          el-input(v-model="form.exp" type="textarea" :rows='4')
      span(slot="footer" class="dialog-footer")
        el-button(@click="dialogVisible = false" type="" size='small' ) 取消
        el-button(@click="addSend('form')" type="primary" size='small' ) 新增
</template>


<style lang="stylus" scoped>
.box 
    background #ececec
    padding 0 15px
    min-height 650px
    min-width 860px
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
      dd
        float left
        width 25%
        line-height 95px
        .small
           display inline-block
           transform scale(0.95)
           color #999
           font-size 12px 
        .photo 
            width 85px
            height 85px
            border-radius 95px
            margin-left 10px
  .title
     border-bottom 1px solid #999
     margin-bottom 20px
  .imgList
    margin-bottom 20px
    border-bottom 1px solid #999
      img
        margin:0 15px
</style>
