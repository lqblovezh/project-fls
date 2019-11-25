<script>
import * as services from 'services/x-read/columnSetting'
import Nav from 'projects/x-read-mgr/components/wms/2-settings/indexSettings'
import Resource from '@/components/common/Resource'
import {
  circleMixin,
  publicMixin
} from "@/util/mixins"

export default {
  mixins: [publicMixin],
  components: {
    Nav,
    Resource
  },
  data() {
    return {
      list: [],
      underList: [{
        name: '模板一',
        value: '2'
      }, {
        name: '模板二',
        value: '1'
      }, {
        name: '模板三',
        value: '3'
      }, {
        name: '模板四',
        value: '4'
      }, {
        name: '模板五',
        value: '5'
      }],
      value: '',
      page: null,
      name: '添加',
      dialogVisible: false,
      detailDialog: false,
      detailAddDialog: false,
      clumnsID: '',
      clumnsTemplate: '',
      addlist: {
        id: '',
        name: '',
        tmp: ''
      },
      infoData: [],
      productList: null,
      detailImgDialog: false,
      previewImg: null,
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      services.getList().then(res => {
        this.list = res.data
      })
    },
    getInfoList() {
      services.getInfoList().then(res => {
        this.infoList = res;
      })
    },
    up(index) {
      //向上移动一位
      services.sort({
        id: this.list[index]['id'],
        status: 'up'
      }).then(res => {
        this.getList();
        this.$message.success('上移成功')
      })
    },
    infoUp(item) {
      //向上移动一位
      services.infoSort({
        id: item.id,
        bid: item.b_id,
        status: 'up'
      }).then(res => {
        this.getInfoList();
        this.$message.success('上移成功')
      })

    },
    infoDown(item) {
      //元素向下移动一位
      services.infoSort({
        id: item.id,
        bid: item.b_id,
        status: 'down'
      }).then(res => {
        this.getInfoList();
        this.$message.success('下移成功')
      })
    },
    down(index) {
      //元素向下移动一位
      services.sort({
        id: this.list[index]['id'],
        status: 'down'
      }).then(res => {
        this.getList();
        this.$message.success('下移成功')
      })
    },
    save() {
      log(this.$refs.modelValue.selectedLabel)
      services.save({ ...this.addlist,
        tmp: this.$refs.modelValue.selectedLabel
      }).then(res => {
        this.getList();
      })
    },
    reset() {
      this.dialogVisible = true;
      this.addlist['name'] = '';
      this.addlist['tmp'] = '';
      this.addlist['id'] = '';
      this.name = '添加'
    },
    update(index) {
      //向后台发送修改请求
      this.dialogVisible = true;
      this.addlist['name'] = this.list[index]['name'];
      this.addlist['tmp'] = this.list[index]['tmp'];
      this.addlist['id'] = this.list[index]['id'];
      this.name = '修改';
      // this.save();
    },
    del(index) {
      this.$confirm('你真的要删除吗？')
        .then(() => {
          services.del({
            id: this.list[index]['id']
          }).then(res => {
            this.getList();
          })
        })
    },
    add() {
      this.dialogVisible = false;
      this.save();
    },
    infoDel(arr) {
      this.$confirm('是否确认删除?').then(() => {
        services.infoDel({
          id: this.clumnsID,
          bid: arr
        }).then(res => {
          this.getInfoList();
        })
      }).catch(() => {})
    },
    opneDetailDialog(index) {
      let clumnsTemplate;
      this.detailDialog = true;
      this.clumnsID = this.list[index]['id'];
      switch (this.list[index]['tmp']) {
        case '主题模板':
          clumnsTemplate = 'theme';
          break;
        default:
          clumnsTemplate = 'book';
          break;
      }
      this.clumnsTemplate = clumnsTemplate;
      this.page = {
        pageOffset: 10,
        pageStart: 0,
        total: 1
      };
      this.page2 = {
        pageOffset: 10,
        pageStart: 0,
        total: 1
      };
      this.getInfoList();
    },
    getInfoList() {
      services.getInfoList({
        id: this.clumnsID,
        ...this.page
      }).then(res => {
        this.infoData = res.data;
        this.page.total = res.page.total
      })
    },
    addInfo_send(arr) {
      services.infoAdd({
        id: this.clumnsID,
        bid: arr
      }).then(res => {
        this.getInfoList();
        this.detailAddDialog = false;
        this.$message.success('添加成功')
      })
    },
    selectAll(e) {
      this.$refs.select.forEach(item => {
        item.checked = e.target.checked
      })
    },
    delAll() {
      let arr = [];
      this.$refs.select.forEach(e => {
        if (e.checked) {
          arr.push(e.value)
        }
      })
      this.infoDel(arr)
    },
    preview(item, index) {
      let type = item.tmp.includes('模板') ? item.type : item.tmp
      let image = type
      if (type == 1) {
        image = 2
      } else if (type == 2) {
        image = 1
      }
      this.previewImg = `./static/images/settings/tmp${image}.png`
      this.detailImgDialog = true
    },
    selectChange(val) {
      log(this.list, val)
    },
    handleSizeChange(val) {
      this.page.pageOffset = val;
      this.getInfoList();
    },
    handleCurrentChange(val) {
      this.page.pageStart = (val - 1) * this.page.pageOffset;
      this.getInfoList();
    },
  },
}
</script>


<template lang="pug">
div
	Nav
	.content
		.myDialogWrap(v-if="detailImgDialog")
			.content
				span.imgWrap
					img(:src="previewImg")
					span.closeBtn(@click="detailImgDialog = false")
		.info
			img(src="../../../../static/images/settings/u2001.png")
			span 系统自动显示前6个栏目，排序7及以上的将会被隐藏。栏目名称限制为6个汉字以内。
		.list(v-for="(item,index) in list")
			div.item
				el-input.txtInput(v-model='item.name')
				span.txt
					a(href='javascript:' @click='update(index)') 修改
				el-select(v-model='item.tmp' value-key='name' @change="selectChange")
					el-option(v-for="item in underList" :key='item.value' :label="item.name" :value='item.value')
				span.txt 排序 : ( {{index+1}} )
				a(href="javascript:void(0)" @click='preview(item,index)') 预览
				img.icon.up(src='../../../../static/images/settings/u1971.png' alt='icon' @click="up(index)")
				img.icon.down(src='../../../../static/images/settings/u1973.png' alt='icon' @click='down(index)')
				img.icon(src='../../../../static/images/settings/u2238.png' alt='icon' @click='del(index)')
				span.icon.el-icon-info(title="详情" @click="opneDetailDialog(index)" type="primary"  plain)
		el-button.add(type="text" @click='reset')
			img(src="../../../../static/images/settings/u2236.png" )
		el-dialog(:title="name" :visible.sync="dialogVisible" width="30%")
			span
				el-form
					el-form-item(label='模块')
						el-input( placeholder='模板名称' v-model='addlist.name')
					el-form-item(label='所属模板')
						el-select(v-model='addlist.tmp' ref='modelValue')
							el-option(v-for="item in underList" :value='item.value' :key='item.value' :label="item.name")
			span(slot="footer" class="dialog-footer")
				el-button(@click="dialogVisible = false") 取消
				el-button(@click="add") {{name}}
		el-dialog(title="详情" :visible.sync="detailDialog" width="960px")
			.title
				el-button(type="danger" size="small" style='float:right' @click="delAll") 删除
				el-button(type='primary' size='small' style='float:right' @click="detailAddDialog = true") 添加
			table.infoData.table
				tr
					td(width='5%')
						input(type='checkbox' @click='selectAll')
					td 书名
					td 作者
					td 价格
					td(width='25%') 创建时间
					td 操作
				tr(v-for='item in infoData' v-if='infoData')
					td
						input(type='checkbox' ref= "select" :value="item.b_id")
					td {{item.books_name}}
					td {{item.author}}
					td {{item.product_price}}
					td  {{item.create_time}}
					td
						span(@click='infoDel(item.b_id)') 删除
						span(@click="")
							img.icon.up(src='../../../../static/images/settings/u1971.png' alt='icon' @click="infoUp(item)")
							img.icon.down(src='../../../../static/images/settings/u1973.png' alt='icon'  @click="infoDown(item)")
				tr(v-if='!infoData.length')
					td.center(colspan='6') 暂无数据
			.pageWrap(v-if="page")
				el-pagination(
					:small="false" background
					@size-change="handleSizeChange"
					@current-change="handleCurrentChange"
					:current-page="page.num"
					:page-sizes="[10, 50, 100]"
					:page-size="page.offset"
					layout="total, sizes,prev, pager, next, jumper"
					:total="page.total"
				)
			//- 选择已上架资源
			Resource(:detailAddDialog.sync="detailAddDialog" v-if="detailAddDialog" :curSoucesList="infoData" @select="addInfo_send")
</template>


<style lang="stylus" scoped>
  .myDialogWrap .content .imgWrap >img
    max-height 80vh
  .el-icon-info
    color #44c3aa
    font-size 20px
  .content
    padding-left 16px
    min-width 1000px
    .info
       color #999999
       font-size 12px
       padding 20px 0
       span
       	 vertical-align sub
       	 padding-left 5px
    .list
      .item
         margin-bottom 10px
         line-height 44px
         .txtInput
            width 200px
         .icon
            margin 7px 0 0 10px
         .icon:hover
            cursor pointer
         .el-icon-more
            border 1px solid #48a2ff
            color #48a2ff
            margin-top 8px
            display inline-block
            line-height 18px
            width 18px
            font-size 13px
            text-align center
            border-radius 20px
         .txt
            font-size 14px
            line-height 44px
            padding 0 24px
      .disable
        color #999
        opacity: 0.6
        a
          color #999
    .infoData
        margin 20px 0 30px 0
        width 100%
        tr
          line-height 35px
          border-bottom 1px solid #eee
          span
            margin-right 10px
          span:hover
            cursor pointer
    .center
      text-align  center
    .up
      transform  rotate(90deg)
    .down
      transform  rotate(-90deg)
</style>
