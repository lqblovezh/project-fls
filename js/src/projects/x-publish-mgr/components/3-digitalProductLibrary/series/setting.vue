<script>
import formSerialize from 'form-serialize'
import * as myServices from 'services/x-publish/series'
export default {
  props: ['type', 'detailData', 'detailDialog', 'settingDialog'],
  created() {
    this.getList()
  },
  data() {
    return {
      addSeriesDialog: false, //新增类别-栏目弹框
      addColumnDialog: false, //新增栏目弹框
      list: null, //主数据
      list1: null, //
      page: null,
      dialogOpen: false, //
      currSeries: {}, //
      currentType: this.type,
    }
  },
  watch: {
    type() {
      this.getList()
    },
  },
  methods: {
    async getList() {
      await myServices
        .seriesList({
          type: '1',
        })
        .then(res => {
          this.list = res.data
        })
      await myServices
        .seriesList({
          type: '2',
        })
        .then(res => {
          this.list1 = res.data
        })
    },
    //删除单条
    async delChoosen(id) {
      if (id) {
        this.$confirm('是否删除?')
          .then(res => {
            myServices.delSeries({ id }).then(res => {
              this.getList()
            })
          })
          .catch(res => {
            // 取消事件
          })
      }
    },
    update(item) {
      this.dialogOpen = true
      this.currSeries = item
    },
    saveSeries() {
      var flag = this.$refs.dateSeries.valiAll()
      if (!flag) {
        return
      }
      this.addSeriesDialog = false
      myServices
        .saveSeries({
          ...this.currSeries,
          type: this.currentType,
        })
        .then(res => {
          this.getList()
          this.dialogOpen = false
        })
    },
    show(item) {
      this.currSeries = item || {}
      this.dialogOpen = true
    },
    handleClick(tab, event) {
      this.currentType = tab.name
    },
    async uploadFile(e) {
      let file = e.target.files[0]
      if (!file) return
      // 1m
      if (file.size > 1024 * 1024) {
        console.log(file.size)
        this.$message.error('图片过大, 请上传小于1m的图片')
        return
      }
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let res = await this.$upload(file)
      this.currSeries.img_src = res.data.url
      this.currSeries.img = res.data.path
      loading.close()
    },
  },
  computed: {
    title() {
      return this.currentType == '1' ? '类别' : '栏目'
    },
  },
}
</script>

<template lang="pug">
.div
	el-tabs(:value="type" @tab-click="handleClick")
		//- 类别设置
		el-tab-pane( label="类别设置" name="1")
			.div
				fieldset#detailSearchForm
					table.table(ref="table")
						thead
							tr()
								th 类别名称
								th 类别编号
								th 操作
						tbody()
							tr(v-for="item in list")
								td {{item.name}}
								td {{item.code}}
								td
									.icon.icon-delete(title="删除" @click="delChoosen(item.id)")
									.icon.el-icon-edit(title="修改" @click="update(item)")
		//- 栏目设置
		el-tab-pane( label="栏目设置" name="2")
			.div
				fieldset
					table.table(ref="table")
						thead
							tr
								th() 栏目名称
								th() 栏目编号
								th() 操作
						tbody()
							tr(v-for="item in list1")
								td() {{item.name}}
								td {{item.code}}
								td
									.icon.icon-delete(title="删除" @click="delChoosen(item.id)")
									.icon.el-icon-edit(title="修改" @click="show(item)")
		.btns
			el-button(type="primary" plain @click="show()") 新增
		el-dialog(
			:title="title"
			:visible.sync="dialogOpen"
			v-if="dialogOpen"
			width="500px"
			append-to-body
		)
			.formWrap
				VaForm(ref="dateSeries")
					form#dateSeries
						.group
							input.form-control(v-va="{ type:'required' }" v-model="currSeries.name" placeholder="名称")
						.group
							input.form-control(v-va="{ type:'required' }" v-model="currSeries.code" placeholder="编号")
						.group
							input.hide(type="file" @change="uploadFile($event)" :ref="currSeries.code" accept="image/jpeg,image/jpg,image/png" )
							el-button( type="primary" size="small" @click="$refs[currSeries.code].click() ") 上传封面
							br
							img.mh200(:src="currSeries.img_src")
						.group
							input.form-control( v-model="currSeries.abs" placeholder="简介")
			span.dialog-footer( slot="footer" class="")
				el-button( type="info"  @click="dialogOpen = false" ) 取消
				el-button( type="primary" @click="saveSeries") 保存

</template>

<style lang="stylus" scoped>
.el-icon-edit
  color #44c3aa
.btns
  text-align center
  margin 20px
</style>
