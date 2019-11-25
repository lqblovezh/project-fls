<script>
import formSerialize from 'form-serialize'
import Demo from './template/demo'
import About from './template/about'
import Cooperate from './template/cooperate'
import * as services from 'services/system/production'
import { getTask } from 'services/system/home'

export default {
  components: { Demo, About, Cooperate },
  data() {
    return {
      tabs: [],
      tableData: [],
      currentIndex: '',
      shop_type: 0,
      ids: [],
      page: {
        pageNum: 1,
        pageOffset: 10,
      },
      form: {
        id: '',
        name: '',
        abs: '',
        img_src: '',
      },
      dialogVisible: false,
      imageCropperDialog: false,
      autoCrop: {
        read: [292, 400],
        magazine: [292, 400],
        teach: [310, 188],
        library: [260, 350],
      },
      imgFile: null,
    }
  },
  created() {
    this.getType()
  },
  computed: {
    ratio() {
      let type = this.form.work_type
      let current = this.autoCrop[type]
      return Number((current[0] / current[1]).toFixed(2))
    },
    autoCropWidth() {
      let type = this.form.work_type
      let current = this.autoCrop[type]
      return current[0]
    },
    autoCropHeight() {
      let type = this.form.work_type
      let current = this.autoCrop[type]
      return current[1]
    },
  },
  methods: {
    getType() {
      services.getType().then(res => {
        this.tabs = res.data
        console.log(this.tabs, 111111)
        this.getList()
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    shelf(id) {
      services.shelf({ id, index_type: 1 }).then(res => {
        this.getList()
      })
    },
    async modify(file) {
      // const file1 = this.$refs[file[0]].files[0]
      // if (file1) {
      //   await getTask(file1).then(res => {
      //     this.form.img = res.data.path
      //   })
      // }
      services.shelf({ id: this.form.publisher_id, ...this.form }).then(res => {
        this.dialogVisible = false
        this.getList()
      })
    },
    open(data) {
      this.form = { ...data }
      console.log(this.form)
      this.dialogVisible = true
    },
    upload(e, dom) {
      let node = e.target
      let file = node.files[0]
      this.imgFile = URL.createObjectURL(file)
      this.$ImageSize({ file: file, ratio: this.ratio, interval: 0.05 }).then(
        async res => {
          const { url, path } = await this.$globalUpdateFile(file)
          this.$set(this.form, 'img', path)
          this.$set(this.form, 'img_src', url)
        },
        err => {
          if (err.status == 201) {
            this.imageCropperDialog = true
            return
          }
          this.$message.error(err.message)
        }
      )
    },
    getList(query) {
      let page = JSON.parse(JSON.stringify(this.page))
      services
        .getList({
          type: this.currentIndex,
          shop_type: this.shop_type,
          ...page,
          ...query,
        })
        .then(res => {
          this.tableData = res.data
          this.page.total = res.page.total
          this.page.pageNum = res.page.num
        })
    },
    change(index) {
      this.currentIndex = index
    },
    seareHandeler() {
      // 搜索
      this.query = formSerialize(document.querySelector('#mainForm'), {
        hash: true,
      })
      this.getList(this.query)
    },
    handleSelectionChange(val) {
      this.ids = val.map(el => el.id)
    },
    async delChoosen(id) {
      this.$confirm('是否删除?')
        .then(res => {
          ;(services.del ? services.del : this.del)({ id }).then(res => {
            this.getList()
          })
        })
        .catch(res => {})
    },
    currentChange(page) {
      this.page.pageNum = page
      this.getList()
    },
    detail(item) {
      this.currentItem = item
    },
    sort(id, status) {
      services
        .sort({
          type: this.currentIndex,
          shop_type: this.shop_type,
          id,
          status,
        })
        .then(() => {
          this.getList()
          this.$message.success('移动成功')
        })
        .catch(err => {
          this.$message.error('移动失败')
        })
    },
    async preview(data) {
      this.imgFiles = data
      this.imgFiles.name = 'img'
      const { url, path } = await this.$globalUpdateFile(this.imgFiles)
      this.$set(this.form, 'img', path)
      this.$set(this.form, 'img_src', url)
      this.imageCropperDialog = false
    },
  },
  watch: {
    currentIndex() {
      this.getList()
    },
    shop_type() {
      this.getList()
    },
  },
}
</script>

<template lang="pug">
.content()
  ImageCropper(
    v-if="imageCropperDialog"
    ref="imageCropper"
    :imageCropperDialog.sync="imageCropperDialog"
    :imgFile="imgFile"
    :autoCropWidth="autoCropWidth"
    :autoCropHeight="autoCropHeight"
    @preview="preview"
  )
  el-dialog(:visible.sync="dialogVisible" width="800px" :before-close="handleClose")
    .detailBox
      .part
        .img
          img(:src="form.img_src" ref="img1")
        input.hide(type="file" @change="upload($event,'img1')" ref="updateImg1" accept="image/*")
        el-button(type="primary" size="small" @click="$refs.updateImg1.click()" plain) 选择图片
      el-input.name(placeholder="名称" v-model="form.name")
      el-input.url(placeholder="简介" v-model="form.abs")
    .footer(slot="footer" class="dialog-footer")
      el-button.right(type="primary" @click="modify(['updateImg1'])" size="small") 确定
  .tabs
    //- el-button(:type="currentIndex==index?'primary':'info'" @click="change(index)" :key="item.name" v-for="(item,index) in tabs") {{item.name}}
    el-radio-group(v-model="shop_type")
      el-radio(:label="0") 全部
      el-radio(:label="1") 整库
      el-radio(:label="2") 详情
    el-select(v-model="currentIndex" placeholder="分类选择" clearable)
      el-option(
        v-for="item in tabs"
        :key="item.type"
        :label="item.name"
        :value="item.type"
      )
  .box
    form#mainForm
      span.group-inline
        input.form-control(name="name" placeholder="名称")
      span.group-inline
        input.form-control(name="press_name" placeholder="出版社")
      span.group-inline
        el-button.right(type="primary" size="small" icon="el-icon-search" @click="seareHandeler" plain) 搜索
    el-table(ref="table"
      stripe
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"  
      @selection-change="handleSelectionChange"
    )
      el-table-column(type="selection" width="55" fixed)
      el-table-column( prop="name" label="名称" )
      el-table-column( prop="work_name" label="出版社")
      el-table-column( prop="user_name" label="用户账户")
      el-table-column( prop="file_code" label="状态")
        template(slot-scope="{row}")
          span {{row.index_type=='yes'?'已上架':'未上架'}}
      el-table-column( label="操作" width=400)
        template(slot-scope="{row}")
          el-button(type="primary" size="mini" @click="open(row)" v-if="row.type=='yes'&&row.index_type!='yes'") 修改
          el-button(type="primary" size="mini" @click="sort(row.publisher_id,'up')") 上移
          el-button(type="primary" size="mini" @click="sort(row.publisher_id,'down')") 下移
          el-button(type="primary" size="mini" @click="shelf(row.publisher_id)" v-if="row.type=='yes'&&row.index_type!='yes'") 上架
          el-button(type="primary" size="mini" @click="shelf(row.publisher_id)" v-if="row.type=='yes'&&row.index_type=='yes'") 下架
          el-button(type="danger" size="mini" @click="delChoosen([row.publisher_id])") 删除
    .pages(v-if="page.total") 
        Pages(
          :currentPage="page.num"
          :total="page.total"
          :pageSize="page.pageOffset" 
          :pageSizes="[10, 20, 50, 100]"
          @currentChange="currentChange"
        )
</template>

<style lang="stylus" scoped>
.el-select
  margin-left 20px
.name, .url
  position relative
  top 79px
  display inline-block
  height 50px
.name
  flex 0 0 200px
.detailBox
  display flex
  .part
    flex 0 0 250px
    text-align center
    margin-bottom 20px
    .img
      height 150px
      background #e8e8e8
      margin 20px
      text-align center
      img
        width 100%
        height 100%
        object-fit contain
.group-inline
  margin-right 20px
  .right
    float right
.content
  padding 15px
  min-width 1000px
  .tabs
    background #fff
    line-height 80px
    border-radius 5px
    padding 0 20px
    box-sizing border-box
  .box
    background #fff
    margin-top 20px
    border-radius 5px
    padding 20px
    box-sizing border-box
    .pages
      text-align center
      margin 20px 0
</style>

