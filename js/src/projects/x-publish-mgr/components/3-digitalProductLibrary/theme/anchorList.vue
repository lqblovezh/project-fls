<script>
import formSerialize from "form-serialize"
import VaForm from "@/components/common/VaForm"
import * as nowledgServices from "services/x-publish/nowledges"

export default {
  components: { VaForm },
  props: ["type", "bookInfo", 'themeId', 'currknowledgeId','detailData'],
  async created() {
    this.getList();
  },
  data() {
    return {
      list: null,
      page: null,
      query: null,
      obj: {},
    };
  },
  computed: {},
  methods: {
    getList(pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10, query) {
      return nowledgServices.NowledgesList({
          pageNum,
          pageOffset,
          ...query,
          id: this.type == '章节锚点' ? this.bookInfo.value : this.themeId,
          type: this.type,
        })
        .then(res => {
          this.list = res.data
          this.page = res.page
        });
    },
    checkedAll(e) { //全选
      if (e.target.checked) {
        this.list.forEach(item => {
          this.obj[item.id] = item;
        });
      } else {
        this.list.forEach(item => {
          this.obj[item.id] = null;
        });
      }
      this.$refs.ids.forEach(item => {
        item.checked = e.target.checked;
      });

      log(this.obj);
    },
    choose(e, item) {//单选
      if (e.target.checked) {
        this.obj[item.id] = item;
      } else {
        this.obj[item.id] = null;
      }
    },
    addAnchorCommit() { //添加选中
      var arr = [];
      for (const key in this.obj) {
        if (this.obj.hasOwnProperty(key)) {
          if (this.obj[key]) {
            arr.push(this.obj[key]);
          }
        }
      }
      nowledgServices.addAnchor({
        n_id: this.currknowledgeId,
        b_id: this.type=='章节锚点'?arr.map(item => item.id):'',
        c_id: this.type=='章节锚点'?[this.bookInfo.value]:arr.map(item => item.id),
        type: this.type,
        name: arr.map(item => item.chapter_name||item.name),
        ptype: this.detailData.type_number,
        pid:this.detailData.id
      }).then(res => {
        this.$message.success('添加成功')
        this.$emit('anchorListCancle')
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    handleSizeChange(size) {// size变化回调
      this.getList(1, size)
    },
    handleCurrentChange(page) {// 点击分页回调,
      this.getList(page, this.page.offset)
    },
    seareHandeler() {//搜索
      this.query = formSerialize(this.$refs.mainForm, {
        hash: true
      });
      log(this.query)
      this.getList(1, 10, this.query);
    },
  },
  filters: {
    formatHolder(type) {
      return type.substr(0, 2) + "名称";
    }
  }
};
</script>

<template lang="pug">
.div
  .serachWrapd
    .title
    form(ref="mainForm")
      span.group-inline
        el-select(
            v-if="bookInfo&&type=='章节锚点'"
            v-model="bookInfo.value"
            placeholder="选择所属书籍"
            size="small"
            clearable
          )
            el-option(
              v-for="item in bookInfo.list"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            )
      span.group-inline
        input.form-control( :placeholder="type|formatHolder"  name="name")
      span.group-inline.btn
        el-button(@click="seareHandeler" type="primary" size="small" icon="el-icon-search" plain ) 搜索
        el-button(@click="addAnchorCommit" type="primary" plain size="small") 添加选中
  .tableWrap(   )
    table.table
      thead
        tr
          th 全选
            input(type="checkbox"   @click="checkedAll")
          th 名称
          //- th 所属书籍
          th 创建时间
      tbody( )
        tr(v-for="item in list")
          th
            input(type="checkbox" :checked="obj[item.id] ? true:false " ref="ids"  @click="choose($event,item)"   :value="item.id"  name="ids"  )
          th {{item.chapter_name||item.name}}
          //- th {{item.name}}
          th {{item.create_time}}
    .pageWrap(v-if="page")
      el-pagination( :small="false" background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.num"
        :page-sizes="[10, 50, 100]"
        :page-size="page.offset"
        layout="total, sizes,prev, pager, next, jumper"
        :total="page.total")

  .btns
    el-button( type="info" @click="$emit('anchorListCancle')") 取消
    el-button( type="primary" @click="addAnchorCommit") 确定
</template>


<style lang="stylus" scoped>
.serachWrapd
  input
    width 400px
  .btn
    float right
.btns
  text-align right
</style>


