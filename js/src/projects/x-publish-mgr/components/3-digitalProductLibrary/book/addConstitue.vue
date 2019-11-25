<script>

import formSerialize from 'form-serialize'
import * as services from "services/x-publish/digitalbooks"


export default {
  components: {},
  props:['type' , 'constitute' , 'detailId'], //得到已有的
  created(){
    log(this.type)
    this.getList();
    if(this.constitute){ //转化为键值对形式存储
      var obj = {};
      this.constitute.forEach(item => {
        obj[item.id] = item ;
      })
      this.choosenData = {} ;
      this.hadData = obj ;
      log('has',obj)
    }
  },
  data() {
    return {
      services,
      list:[],
      page:null ,
      // checkedAll:false ,
      book:null ,
      hadData:{},
      choosenData:{} ,
      timePick:null ,
    };
  },
  computed:{
  },
  methods: {
    getList(pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10  , query  ){
      this.services._addBooks({ pageNum , pageOffset , type:this.type , ...query} ).then(res=>{
        this.list = res.data
        this.page = res.page
      })
    },
    checkedAll(e){
      this.$refs.ids.forEach(item => {
        item.checked = e.target.checked ;
        this.list.forEach(item=>{
          if(!this.hadData[item.id]){  // haddata存在, 就不加
            if(e.target.checked){
              this.choosenData[item.id] = item ;
            }else {
              this.choosenData[item.id] = null ;
            }
          }
        })
      })
      log(this.choosenData)
    },
    choose(e , item ){
      if(e.target.checked){
        if(!this.hadData[item.id]){  // haddata存在, 就不加
          this.choosenData[item.id] = item ;
        }
      }else {
        this.choosenData[item.id] = null ;
      }
      log(this.choosenData)
    },
    chooseBook(e , item ){
      if(e.target.checked){
        this.uncheckedAll('ids')
        e.target.checked = true ;
        // if(!this.hadData[item.id]){  // haddata存在, 就不加
        //   this.choosenData[item.id] = item ;
        // }
        this.book = item ;
        //其他input置为false ;
        // 做一二标识, 说明他是图书
      }else {
        this.book = null ;
        // this.choosenData[item.id] = null ;
      }
      log(this.choosenData)
    },
    query(){
      this.getList(1, this.page.offset,  formSerialize(document.querySelector('#detailAddForm') ,{hash:true} )  )
    },
    uncheckedAll(refName){
      this.$refs[refName].forEach(item => item.checked = false)
    },
    addCommit(){ //添加
      var obj = this.getRes();
      log(obj)   // 提交所有的 , 带上类型 , 这里的arr包含了已存在的
      this.$emit('addback',obj)
    },
    getRes(){  //得到过滤后的数组,用于提交
      var arr= [];
      var obj = {};
      // log(this.choosenData)
      for (const key in this.choosenData) {
        if (this.choosenData.hasOwnProperty(key)) {
          if(this.choosenData[key] && this.choosenData[key].type == this.type  ){  //如果值存在 , 并且值的类型为当前类型
            arr.push(this.choosenData[key])
          }
        }
      }

      return {arr , book:this.book }
    },
    handleSizeChange(pageOffset){
      let query = formSerialize(document.querySelector('#detailAddForm') ,{hash:true} )
      this.getList(1, pageOffset, query)
    },
    handleCurrentChange(pageOffset){
      this.getList( pageOffset )
    },
  }
};
</script>

<template lang="pug">
.div
  .serachWrap
    .title
    form#detailAddForm
      span.group-inline
        input.form-control( placeholder="名称"  name="name")
      span.group-inline
        input.form-control( placeholder="标签" name="tag")
      span.group-inline
        TimePick(:inputsName="['start_time','end_time']")

      span.group-inline
        el-button(size="mediu" type="primary" @click="query"   icon="el-icon-search"   plain ) 搜索
  .tableWrap
    table.table
      thead
        tr
          th.table-check
            input(type="checkbox" v-if="type != '1'" @click="checkedAll" )
          th 名称
          th 标签
          th 创建时间
      tbody( )
        tr(v-for="item in list"  )
          th
            input(type="checkbox"  v-if="type != '1'"   :checked="hadData[item.id]"  @click="choose($event,item)"   :value="item.id" ref="ids"  name="ids"  )
            input(type="checkbox" v-if="type == '1'"  :checked="hadData[item.id]"  @click="chooseBook($event,item)"   :value="item.id" ref="ids"  name="ids"  )
          th
            .th-name {{item.name}}
          th
            .th-name {{item.tag}}
          th
            .th-name {{item.create_time}}
    .pageWrap(v-if="page")
      el-pagination( :small="false" background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[10, 50, 100]"
        :page-size="page.offset"
        layout="total, prev, pager, next, jumper"
        :total="page.total")
  .btns
    el-button( @click="$emit('cancleBack')") 取消
    el-button(@click="addCommit" type="primary" ) 确定



</template>


<style lang="stylus" scoped>
.btns
  text-align right
</style>
