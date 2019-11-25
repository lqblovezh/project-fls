<script>
import * as services from 'services/x-read/indexSetting'
import {
  getTask
} from 'services/common'
import Nav from 'projects/x-read-mgr/components/wms/2-settings/indexSettings'
export default {
  components: {
    Nav
  },
  data() {
    return {
      dataList: {},
      dialogImageUrl: '',
      dialogVisible: false,
      index: '',
      info: {
        id: '',
        src: '',
        banner: '',
      }
    };
  },
  methods: {
    previewImg(e) {
      //预览图
      let node = e.target
      let file = node.files[0]
      this.dialogImageUrl = URL.createObjectURL(file)
    },
    async add() {
      const banner = this.$refs.banner.files[0]
      let loading = this.$loading({
        text: "正在上传",
        background: "rgba(0, 0, 0, 0.8)"
      })
      try {
        if (banner) {
          console.log(banner);
          await getTask(banner).then(res => {
            this.info.banner = res.data.path;
          })
        }
        setTimeout(() => {
          loading.close()
        }, 500)
      } catch (a) {
        loading.close()
      }
      this.dialogVisible = false;
      services.save(this.info).then(res => {
        this.getList();
      })
    },
    del(index, del_id) {
      this.$confirm('你真的要删除吗？')
        .then(_ => {
          services.del({
            id: del_id
          })
          this.dataList.splice(index, 1);
        })
        .catch(_ => {});
    },
    update(index) {
      //修改
      this.dialogVisible = true;
      this.index = index;
      this.info.src = this.dataList[index]['src'];
      this.info.banner = this.dataList[index]['banner']
      this.dialogImageUrl = this.dataList[index]['img_src']
      this.info.id = this.dataList[index]['id']
    },
    reset() {
      //初始化数据
      this.dialogVisible = true;
      this.index = '';
      this.info.src = '';
      this.info.banner = '';
      this.dialogImageUrl = '';
      this.info.id = '';
    },
    up(index) {
      //向上移动一位
      services.sort({
        id: this.dataList[index]['id'],
        status: 'up'
      }).then(res => {
        this.getList();
        this.$message.success('上移成功')
      })

    },
    down(index) {
      //元素向下移动一位
      services.sort({
        id: this.dataList[index]['id'],
        status: 'down'
      }).then(res => {
        this.getList();
        this.$message.success('下移成功')
      })
    },
    getList() {
      services.getList().then(res => {
        this.dataList = res.data
      })
    },
  },
  created: function() {
    this.getList()
  }

}
</script>


<template lang="pug">
div
	Nav
	.content
		.info
			img(src="../../../../static/images/settings/u2001.png")
			span 最多支持10张banner图片，当图片数量仅为一张时，banner为静态图片无轮播功能。
		.list(v-for="(item,index) in dataList")
			.leftSide
				img.thumb(:src="item.img_src")
			.rightSide
				el-form(:inline="true" class="")
					.operation
						span 排序:( {{index+1}} )
						img.icon.up(src='../../../../static/images/settings/u1971.png' alt='icon' @click="up(index)")
						img.icon.down(src='../../../../static/images/settings/u1973.png' alt='icon'  @click="down(index)")
						div.form-item
							el-form-item(label="关联:")
								el-input(placeholder="请输入新的URL地址" :value="item.src")
							el-form-item
								el-button(type='info' @click='update(index)') 修改
						el-button(type='danger' @click='del(index,item.id)') 删除
		div.add
			el-button(type='primary' @click='reset')  添加图片
			span.info  (Banner仅支持jpg、png格式，推荐比例：1125*560 px)
		el-dialog(title="添加图片" width="30%" :visible.sync="dialogVisible")
			el-form(ref='form')
				el-form-item(label= '关联地址')
					el-input(v-model='info.src' placeholder="请输入关联URL地址 eg:http://www.baidu.com/x-book.html")
				el-form-item()
					div
						img.previewImgUrl(:src="dialogImageUrl"  alt="暂无图片" style='max-width:200px' v-if='dialogImageUrl')
						el-button(size="mini" type="primary" style="margin-left:20px" @click="$refs.banner.click()" plain) 上传Banner图
						input.hide(type="file"  ref="banner" accept="image/jpeg,image/jpg,image/png" @change="previewImg($event)")
						input.hide(name="img" type="text" :value="info.img")
					p.imgSize
						span.bannerSize 建议最大宽度：200px

			span(slot='footer' class='dialg-footer')
				el-button(@click='dialogVisible = false') 取消
				el-button(type='primary' @click="add") 确定
</template>


<style lang="stylus" scoped>
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
       padding-bottom 10px
       height 145px
       .leftSide,.rightSide
         float left
       .thumb
         width 284px
         max-height 140px
       .operation
         padding 50px 0px 0px 17px
         line-height 40px
         .icon
           transform  rotate(-90deg)
           margin 7px 0 0 10px
         .up
           transform  rotate(90deg)
         .icon:hover
           cursor:pointer
         .form-item
           display inline-block
           margin-left 20px
     .add .info
         line-height 60px
		 .imgSize .bannerSize
	 		display inline-block
			font-size 14px
			color #333


</style>
