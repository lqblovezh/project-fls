<script>
import * as services from 'services/x-read/member';
import * as roles from 'services/x-read/role';
import {saveMemberData} from 'services/common/member'
import {publicMixin} from '@/util/mixins'

export default {
  mixins: [publicMixin],
  data() {
    return {
      services,
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
      nameList:[],
      infoData:null,
      backMsg:'',
      stateValue:'',
      value:'',
      userInfo:{},
      checked:false,
      where:{pageOffset:10,pageStart:0,name:'',phone:'',lock_status:'',time_start:'',time_end:''},
      dialogVisible:false,
      activeName: 'first'
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
    lock(id){
      services.lock({id}).then(res=>{
        this.getList(this.where);
      })
		},
		unlock(id){
			services.Unlock({id}).then(res=>{
				this.getList(this.where);
		  })
		},
    addsend(forName){
      this.$refs[forName].validate((valid)=>{
        if(valid){
          saveMemberData(this.infoAdd).then(res=>{
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
          this.infoData = res.data;
          this.infoData.roles=this.infoData.positions
          this.infoData.reset_pwd = false;
          this.dialogVisible = true;
          log(this.infoData)
				})
		},
		backMsgSend(){
				saveMemberData({feedback_id:this.infoData.data.id,content:this.backMsg}).then(res=>{
					this.$message.success('回复成功');
					this.backMsg='';
					this.detail(this.infoData.data.id);
				})
		},
		save(data){
      if(this.checked){
        this.infoData.reset_pass = 1;
      }
      if(!this.infoData.roles.length){//处理空数据不能保存的问题
        this.infoData.roles = this.domList(this.roleList)
      }
      saveMemberData(this.infoData).then(res=>{
        this.dialogVisible= false;
        this.$message.success('设置成功！！')
      })
    },
    domList(arry) {
      let json = {}
      arry.forEach(item => {
        json[item.id] = 0
      })
      return json
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
              el-input(placeholder="输入用户名搜索"  v-model='where.name' name="name" clearable)
            span.group-inline
              el-input(placeholder="输入手机号搜索"  v-model='where.phone' name="phone" clearable)
            span.group-inline
              TimePick(:inputsName="['start_time','end_time']")
            span.group-inline
              select.form-control.width-small(name="lock_status")
                option(value="") 所有
                option(value="normal") 正常
                option(value="locked") 冻结
            span.group-inline.right
                el-button(type="primary" plain @click='search' icon="el-icon-search") 搜索
                el-button(type="primary" plain @click="educe()") 导出查询
    .content
        table.list
            thead
                tr
                  th(width=40) 序号
                  th(width=165) 用户名
                  th(width=150) 绑定手机号
                  th 支付订单数
                  th 累计消费金额
                  th 分销次数
                  th 分销总金额
                  th 累计奖励金额
                  th 累计提现金额
                  th 用户积分
                  th(width=200) 最近登录时间
                  th 用户状态
                  th 操作
            tbody
               tr(v-for="(item,index) in list")
                  td
                    span {{index+1}}
                    input(ref="ids" type="hidden" :value="item.id")
                  td {{item.name}}
                  td {{item.phone}}
                  td {{item.order_paid_count||'0.00'}}
                  td {{item.order_paid_money||'0.00'}}
                  td {{item.distribute_paid_count||'0.00'}}
                  td {{item.distribute_paid_money||'0.00'}}
                  td {{item.distribute_reward_money||'0.00'}}
                  td {{item.distribute_cashed_money||'0.00'}}
                  td {{item.credits||'0'}}
                  td {{item.last_login_time}}
                  td {{item.lock_status=='locked'?'冻结':'正常'}}
                  td
                    //el-button( size='small' type="success" plain @click='lock(item.id)' v-if="item.lock_status!='locked'") 冻结
                    //el-button( size='small' type="info" plain @click='unlock(item.id)' v-else ) 解冻
                    el-button( size='small' type="primary" plain @click='detail(item.id)') 详情
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
    el-dialog( width="1055px" :visible.sync="dialogVisible")
      el-tabs(v-model="activeName" type="card" )
          el-tab-pane(label="详情" name="first")
              .userInfo(v-if='infoData')
                  .head
                    img(:src="infoData.picture_absolute" v-if="infoData.picture_absolute")
                    .info
                      .item
                        span 用户名:
                        el-input.width(v-model="infoData.name.substr(0,12)" size="small" disabled)
                      .item
                        span 昵称:
                        el-input.width(v-model="infoData.nick_name" size="small" disabled)
                      .item(class="other")
                        span 性别： {{infoData.sex}}
                      .item(class="other")
                        span 出生日期:
                        el-input.width(v-model="infoData.date_of_birth" size="small" type="date" disabled )
                      .item(class="other")
                        span 绑定手机号:
                        el-input.width(v-model="infoData.phone" size="small" disabled)
                      .item(class="other")
                        span 联系邮箱:
                        el-input.width(v-model="infoData.email" size="small" disabled)
                      .item(class="other w ")
                        span 角色权限:
                        .auth
                          span(v-for="vo,index in infoData.roles" class="roles" :key="index" :label="vo.name") {{vo.name}}
                  .saleInfo(class="other w sale")
                    span 消费金额： {{infoData.order_paid_money||'0.00'}}
                    span 支付订单数： {{infoData.order_paid_count||'0.00'}}
                    span 分销次数： {{infoData.distribute_paid_count||'0.00'}}
                    span 分销总金额： {{infoData.distribute_paid_money||'0.00'}}
                    span 累计奖励金额： {{infoData.distribute_reward_money||'0.00'}}
                    span 累计提现金额： {{infoData.distribute_cashed_money||'0.00'}}
                    span 用户积分： {{infoData.credits||'0'}}
                  .title 已购产品
                  .imgList(v-if="infoData.bought_goods.length")
                    .item(v-for="vo in infoData.bought_goods")
                      .img(:style="{backgroundImage:`url(${vo.img_src})`}")
                      .goodsname
                        span {{vo.name}}
                  .noInfo(v-else) 暂无数据
      span(slot="footer" class="dialog-footer")
            el-button( @click="dialogVisible = false" size="small") 关闭
            el-button(type="primary" @click="save" size="small") 保存

</template>
<style lang="stylus" scoped>
.box
    background #ececec
    padding 0 15px
    min-height 650px
    min-width 1660px
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
        line-height 30px
        margin-bottom 50px
        thead
          background #ececec
          tr
            background #ececec
            th
              text-align  center
              padding 18px 10px
        tbody
            tr
              &:nth-child(2n)
                background #eee
              td
                padding 10px
                text-align center
                vertical-align: middle
    .page
        text-align center
        padding-bottom 50px
.userInfo
  .head
    display flex
    img
      max-width 130px
      max-height 130px
    .info
      display flex
      flex-wrap wrap
      .item
        display flex
        margin:0 10px
        span
          line-height 30px
          display inline-block
        .width
          width 150px
          margin 0 10px
        .auth
          margin 0 10px
  .saleInfo
    margin 20px 0
    span
      padding 15px
  .title
     border-bottom 1px solid #999
     margin 30px 0 0 0
  .imgList
    margin-bottom 20px
    height 200px
    .item
      float left
      width 150px
      text-align center
      margin-right 5px
      .img
        height 190px
        margin-bottom 10px
        background no-repeat
        background-size 100%
  .noInfo
    padding 20px 0
    color #999
    text-align center
</style>
