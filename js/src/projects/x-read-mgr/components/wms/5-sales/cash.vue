<script>
import * as services from "services/x-read/distribution"
import formSerialize from 'form-serialize'
import { publicMixin } from "@/util/mixins"

export default {
  mixins: [publicMixin],
  data() {
    return {
      pickerOptions: {},
      ctimePick: "",
      list: [],
      currentPage: 1,
      page: "",
      multipleSelection: [],
      status: [
        { txt: "未结算", value: "0" },
        { txt: "已结算", value: "1" },
        { txt: "驳回兑付", value: "2" }
      ],
      infoData: null,
      backMsg: "",
      stateValue: "",
      value: "",
      where: {
        pageOffset: 10,
        pageStart: 0,
        order: "",
        user_name: "",
        phone: "",
        status: ""
      },
      dialogVisible: false,
      activeName2: "first"
    };
  },
  methods: {
    getList(where) {
      services.cashList(where).then(res => {
        log(res);
        this.list = res.data;
        this.page = res.page;
      });
    },
    addInfo() {
      this.dialogVisible = true;
    },
    del(id) {
      services.del({ id }).then(_ => {
        this.getList(this.where);
      });
    },
    addsend(forName) {
      this.$refs[forName].validate(valid => {
        if (valid) {
          services.save(this.infoAdd).then(_ => {
            this.getList(this.where);
          });
          this.dialogVisible = false;
          this.infoAdd = { contents: "", title: "", type: "" };
        } else {
          alert("error submit!!");
          return false;
        }
      });
    },
    search() {
      log(this.where);
      this.getList(this.where);
    },
    handleSizeChange(val) {
      this.where.pageOffset = val;
      this.getList(this.where);
    },
    handleCurrentChange(val) {
      this.where.pageStart = (val - 1) * this.where.pageOffset;
      this.getList(this.where);
    },
    handleClick() {},
    detail(id) {
      services.cashDetail({ id: id }).then(res => {
        log(res);
        this.infoData = res.data;
        this.dialogVisible = true;
      });
    },
    backMsgSend() {
      services
        .save({ feedback_id: this.infoData.data.id, content: this.backMsg })
        .then(_ => {
          this.$message.success("回复成功");
          this.backMsg = "";
          this.detail(this.infoData.data.id);
        });
    },
    payback(id, status) {
      services
        .cashUpdata({ id: id, status })
        .then(res => {
          this.$message.success("结算状态修改成功");
          this.getList(this.where);
        })
        .catch(_ => {
          this.$message.error("结算状态修改失败");
        });
    },
    settlement(id) {
      let ids = []
      if (id) { 
        ids.push(id)
      } else {
        ids = this.$getChecked();
        if (!ids) {
          return
        }
      }
      services.settlement({id:ids}).then(res => {
        this.getList()
      })
    },
    educes() {
      let ids = this.$getChecked({isShowMessage:false})
      let query = formSerialize(document.querySelector("#mainForm"), { hash: true })
      services.educes({id:ids,...query}).then(res => {
        window.location.href = res.data.url
      })
    }
  },
  created() {
    this.getList(this.where);
  },
  watch: {
    ctimePick() {
      this.where.time_start = this.ctimePick[0];
      this.where.time_end = this.ctimePick[1];
    }
  }
};
</script>


<template lang="pug">
.box 
    .top.serachWrap
        form#mainForm
            span.group-inline
                el-input(placeholder="输入单号搜索"  v-model='where.order' name="order" clearable)
            span.group-inline
                el-input(placeholder="输入用户搜索"  v-model='where.user_name' name="user_name" clearable)
            span.group-inline
                el-input(placeholder="输入手机号搜索"  v-model='where.phone' name="phone" clearable)
            span.group-inline
                TimePick(:inputsName="['start_time','end_time']" :placeholder="['创建起始时间','创建结束时间']")
            span.group-inline
                el-select(v-model="where.status" placeholder='选择状态搜索')
                    el-option(v-for="item in status"   :label="item.txt" :value="item.value" :key='item.txt')
            span.group-inline.right
                el-button(type="primary" plain @click='search' icon="el-icon-search") 搜索
                el-button(type="primary" plain @click="educes()") 导出查询
                el-button(type="primary" plain @click='settlement()') 批量结算
    .content 
        table.list
            thead
                tr 
                    td  
                       input(type='checkbox' @click='$checkAll($event)')  
                    td(width="155") 兑现单号 
                    td  用户名
                    td  绑定手机号
                    td  提交时间
                    td  兑现金额
                    td  手续费
                    td  应付金额
                    td  承兑方式
                    td  状态
                    td  操作
            tbody 
                tr(v-for="(item,index) in list")
                   td 
                      input(type='checkbox' ref="ids" :value="item.id")
                   td {{item.id}}
                   td {{item.distributor_info.distributor_nick}}
                   td {{item.distributor_info.distributor_phone}}
                   td {{item.create_time}}
                   td {{item.money}}
                   td {{item.service_money}}
                   td {{item.reward_money}}
                   td {{item.pay_name}}
                   td {{item.pay_status}}
                   td 
                      el-button( size='medium' type="primary" plain @click='detail(item.id)') 详情
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
    el-dialog.dialog( width="60%" :visible.sync="dialogVisible" v-if="dialogVisible")
      .header(slot="title")
        el-tabs(value="detail")
          el-tab-pane(label="详情" name="detail")
      .part
        .lside 单号信息
        .rside
            p 订单编号： {{infoData.id}}
            p 兑付用户： {{infoData.user_nick}}
            p 绑定手机号： {{infoData.phone}}
      .part
        .lside 兑换金额来源
        .rside 
          el-table(:data='infoData.info' border show-summary style='width:100%' )
            el-table-column(prop='order_id' label='订单单号' width='150')
            el-table-column(prop='user_id' label='用户名' width='160')
            el-table-column(prop='pay_time',label='支付时间'  width='160')
            el-table-column(prop='money',label = '订单金额')
            el-table-column(prop='distribute_money',label = '分销金额')
            el-table-column(prop='reward_money',label = '奖励金额')
      .part
        .lside 承兑信息
        .rside
          p 兑现金额： {{infoData.money}}
          p 承兑方式： {{infoData.pay_name}}
          p 开户所在行： {{infoData.pay_info.Bank}}
          p 银行卡号： {{infoData.pay_info.account}}
          p 持卡人姓名： {{infoData.pay_info.name}}
      .other
        el-button(type='primary' size="small" @click="payback(infoData.id,1)") 已结算
        el-button(type='danger' size="small" @click="payback(infoData.id,2)") 驳回兑付       
      span(slot="footer" class="dialog-footer")
        el-button(type="info" @click="dialogVisible = false") 关闭
        el-button(type="primary" @click="dialogVisible = false") 确定

</template>


<style lang="stylus" scoped>
.rside,.lside
  line-height 40px
.box {
    background: #ececec;
    padding: 0 15px;
    min-height: 650px;
    min-width: 1660px;

    .top {
        padding: 15px;
        background: #fff;
        margin-bottom: 20px;

        .group-inline {
            margin: 0 4px;
        }

        .form-control {
            width: 100%;
            height: 40px;
        }
    }

    .list {
        border: 15px solid #fff;
        background: #fff;
        width: 100%;
        line-height: 30px;
        font-size: 14px;
        margin-bottom: 50px;

        thead {
            background: #ececec;

            tr {
                background: #ececec;

                td {
                    padding: 10px 10px;
                    text-align: center;
                }
            }
        }

        tbody {
            tr {
                transition: 0.1s;

                &:nth-child(2n) {
                    background: #eee;
                }

                td {
                    line-height: 25px;
                    padding: 10px;
                    text-align: center;
                    vertical-align: middle;
                }
            }
        }
    }

    .page {
        text-align: center;
        padding-bottom: 50px;
    }

    .other {
        border-radius: 5px;
        text-align: center;
        padding: 20px 0;
    }
}
</style>
