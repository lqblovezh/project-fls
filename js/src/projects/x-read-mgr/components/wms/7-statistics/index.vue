<script>
import echarts from "echarts";
import * as services from "services/x-read/statistics";
import { publicMixin } from "@/util/mixins";

export default {
  mixins: [publicMixin],
  data() {
    return {
      services,
      pickerOptions: {},
      ctimePick: "",
      list: [],
      currentPage: 1,
      page: "",
      reset: null,
      option: {
        tooltip: {
          trigger: "axis",
          axisPointer: {}
        },
        toolbox: {
          feature: {}
        },
        legend: {},
        xAxis: [
          {
            type: "category"
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "浏览量",
            min: 0,
            // max: 25,
            position: "left",
            axisLabel: {
              formatter: "{value}"
            }
          }
        ],
        series: []
      },
      multipleSelection: [],
      status: [
        { name: "昨天", value: "1" },
        { name: "3日内", value: "3" },
        { name: "7日内", value: "7" },
        { name: "30日内", value: "30" },
        { name: "60日内", value: "60" }
      ],
      roleList: [
        { name: "融合发布库产品", value: "4" },
        { name: "主题产品", value: "2" },
        { name: "视读产品", value: "5" },
        { name: "听读产品", value: "6" },
        { name: "课件产品", value: "3" }
      ], //内容属性
      infoData: null,
      backMsg: "",
      stateValue: "",
      setBook: "",
      book_id: [],
      scantotal: "该时段内浏览量共 0 次",
      selectBook: "",
      bookdata: "",
      book_name: [],
      img_src: [],
      time: [
        { txt: "最近7天", value: 6 },
        { txt: "最近15天", value: 14 },
        { txt: "最近30天", value: 29 },
        { txt: "最近60天", value: 59 }
      ],
      timeValue: "最近7天",
      where: {
        pageOffset: 10,
        pageStart: 0,
        tag: "",
        book_name: "",
        time: "",
        type: "",
        start_time: "",
        end_time: ""
      },
      dialogVisible: false,
      activeName2: "first"
    };
  },
  methods: {
    getList(where) {
      services.getList(where).then(res => {
        this.list = res.data;
        this.page = res.page;
        log(res.data);
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
    seeSelectData() {
      let arr = [];
      let books = [];
      let imgs = [];
      Array.from(document.querySelectorAll("input[type=checkbox]")).map(
        value => {
          if (value.checked) {
            arr.push(value.value);
            books.push(value.getAttribute("book_name"));
            imgs.push(value.getAttribute("img_src"));
          }
        }
      );
      if (arr.length == 0) {
        this.$message({
          message: "请先选择然后查看",
          type: "warning"
        });
      } else {
        this.detail({ book_id: arr, book_name: books, img_src: imgs });
      }
      log(imgs);
    },
    detail({ book_id, book_name, img_src }) {
      log(img_src);
      this.book_id = book_id;
      this.book_name = book_name;
      this.img_src = img_src;
      this.getChartsData({ type: "browse", txt: "浏览次数" });
      this.dialogVisible = true;
    },
    getChartsData(data, book_name = []) {
      if (!this.where.start_time) {
        data.time = isNaN(this.timeValue)
          ? this.time[0]["value"]
          : this.timeValue;
      } else {
        data.start_time = this.where.start_time;
        data.end_time = this.where.end_time;
      }
      services.detail({ id: this.book_id, ...data }).then(res => {
        let num = 0;
        this.option.xAxis[0]["data"] = [];
        let series = [];
        let legendData = [];
        res.data.forEach((value, index) => {
          series[index] = {
            type: "line",
            name: this.book_name[index],
            data: []
          };
          value.forEach(el => {
            index == 0 ? this.option.xAxis[0]["data"].push(el.date) : null;
            series[index]["data"].push(el.value);
            num += parseFloat(el.value);
          });
        });
        this.option.legend.data = this.book_name;
        this.option.series = series;
        if (data.txt == "销售金额") {
          this.option.yAxis[0]["name"] = "元";
          this.scantotal = `这段时间段内总销售额为 ${num}元`;
        } else {
          this.option.yAxis[0]["name"] = "次";
          this.scantotal = `这段时间段内总浏览次数为 ${num} 次`;
        }
        log(this.option.legend.data);
        this.initial();
      });
    },
    change() {
      this.getChartsData({ type: "browse", txt: "浏览数" }, "");
    },
    initial() {
      setTimeout(() => {
        this.myChart = echarts.init(document.querySelector("#myChart"));
        this.myChart.setOption(this.option);
      }, 200);
    },
    resetOption() {
      this.myChart.dispose();
    }
  },
  created() {
    this.reset = this.option;
    this.getList(this.where);
  },
  watch: {
    ctimePick() {
      this.where.start_time = this.ctimePick[0];
      this.where.end_time = this.ctimePick[1];
    }
  }
};
</script>
<template lang="pug">
.box 
  .top.serachWrap
    form#mainForm
      span.group-inline
        el-input(placeholder="输入名称搜索"  v-model='where.book_name' name="book_name" clearable)
      span.group-inline
        el-input(placeholder="输入标签搜索"  v-model='where.tag' name="tag" clearable)   
      span.group-inline
        TimePick(:inputsName="['start_time','end_time']")
      span.group-inline
        el-select(v-model="where.type" placeholder='选择类型搜索' clearable)
          el-option(v-for="item in roleList" :label="item.name" :value="item.value" :key='item.value')
      span.group-inline
        el-select(v-model="where.time" placeholder='统计所有' clearable)
          el-option(v-for="item in status"   :label="item.name" :value="item.value" :key='item.value')
      span.group-inline.right
        el-button(type="primary" plain @click='search' icon="el-icon-search") 搜索
        el-button(type="primary" plain @click="educe()") 导出查询
  .content
    .tableTop
      .title.vel-line
        span 全部 <span v-if="page" class="totalNum">({{page.total}})</span> 
        .btns
          el-button(type="primary" size="small" plain @click="seeSelectData") 合并查看数据
    table.table
      thead
        tr
          th(width=40) 
            input(type="checkbox" @click='$checkAll($event)')
          th  名称
          th  产品类型
          th  标签
          th(width=150)  上架时间
          th  浏览次数
          th  分享次数
          th  销售次数
          th  销售金额
          th  分销数
          th(width=150)  最近成交
          th  操作
      tbody
        tr(v-for="(item,index) in list")
          td 
            input(type="checkbox" :value="item.id" name="ids" ref="ids" :book_name="item.book_name" :img_src="item.img_src" )
          td {{item.book_name}}
          td {{item.type_name}}
          td {{item.tag}}
          td {{item.the_shelf_create_time}}
          td {{item.browse_value}}
          td {{item.share_value}}
          td {{item.sale_value}}
          td {{item.sale_money}}
          td {{item.bution_value}}
          td {{item.the_shelf_create_time}}
          td
            el-button( size='medium' type="primary" plain @click="detail({book_id:[item.book_id],book_name:[item.book_name],img_src:[item.img_src]})") 详情
    .pageWrap(v-if="page")
      el-pagination(@size-change="handleSizeChange"
                    @current-change="handleCurrentChange" 
                    background
                    :current-page="currentPage" 
                    :page-sizes="[10, 50,100]"
                    :page-size="10" 
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="page.total"
                    )
    el-dialog.dialog( width="1155px" :visible.sync="dialogVisible" @close="resetOption")
      .header(slot="title")
        el-tabs(value="detail")
          el-tab-pane(label="趋势图" name="detail")
      .part
        .lside
          .group
            .imgList(v-for="(img,i) in img_src"  :style="{backgroundImage:'url('+img+')',margin:i*2+'px'  }" )
          ul.txt
            li(v-for="name in book_name ")  {{name}}
        .rside
          el-button-group
            el-button(@click="getChartsData({type:'browse',txt:'浏览数'})") 浏览数
            el-button(@click="getChartsData({type:'share',txt:'分享数'})") 分享数
            el-button(@click="getChartsData({type:'sale',txt:'销售次数'})") 销售次数
            el-button(@click="getChartsData({type:'sale',txt:'销售金额'})") 销售金额
            el-button(@click="getChartsData({type:'sale',txt:'分销数'})") 分销数
            span(style='line-height:40px;margin-left:10px')  {{scantotal}}
            div(style='margin-top:20px')
              span(style='line-height:40px;margin:0 10px;') 按时段
              el-select(v-model="timeValue" placeholder='统计所有' @change='change')
                el-option(v-for="item in time"   :label="item.txt" :value="item.value" :key='item.txt')
              span(style='line-height:40px;margin:0 20px;') 自定义
                el-date-picker(v-model="ctimePick" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"  @change='change')
        .part
          .echarts(style="width: 1000px;height:400px;" id='myChart')
      span(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="dialogVisible = false") 关闭
        
</template>
<style lang="stylus" scoped>
body
  .tableTop
    margin 0
.box {
  background: #ececec;
  padding: 0 15px;
  min-height: 650px;
  min-width: 1500px;

  .top {
    padding-top: 15px;
    background: #fff;
    margin-bottom: 20px;
    .group-inline {
      margin-bottom 20px
      .form-control {
        width: 100%;
        height: 40px;
      }
    }
  }
}

.content {
  background: #fff;
  padding: 0 20px;
  .concatData {
    text-align: right;
    padding-top: 15px;
  }

  .list {
    border: 15px solid #fff;
    width: 100%;
    line-height: 50px;
    margin-bottom: 50px;

    thead {
      background: #ececec;

      tr {
        background: #ececec;

        td {
          padding: 10px 10px;
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
}

.dialog {
  .part {
    min-width: 1000px;
    border-bottom: 1px dashed #e8e8e8;
    overflow: hidden;
    padding: 10px 0;

    .lside {
      float: left;
      padding: 0 0px 0 30px;
      width: 300px;
      overflow: hidden;
      line-height: 40px;

      .icon {
        max-width: 80px;
        max-height: 120px;
      }

      .group {
        width: 40%;
        height: 100px;
        float: left;

        .imgList {
          margin: 0;
          padding: 0;
          height: 100px;
          width: 100px;
          background-size: 100%;
          background-repeat: no-repeat;
          background-color: #fff;
          position: absolute;
        }
      }

      .txt {
        width: 50%;
        float: left;
        color: #666;
        line-height: 20px;
      }

      h3 {
        font-size: 16px;
        font-weight: bold;
      }
    }

    .rside {
      float: left;
    }
  }
}
</style>
