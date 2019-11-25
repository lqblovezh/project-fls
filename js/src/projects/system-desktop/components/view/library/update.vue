<script>
import { makeMixin } from '@/utils/mixins'
import { fastLibrary } from 'services/x-publish/book'
import Store from 'store2'
import { close } from 'fs'

export default {
  mixins: [makeMixin],
  data() {
    return {
      makeType: 'library',
      book_id: '',
      detailInfo: {
        img_src: '',
        img: '',
      },
      list: [
        {
          file: '',
        },
      ],
    }
  },
  created() {
    this.task_id = Store.session(this.makeType + '_task_id')
    this.getTaskId()
  },
  mounted() {},
  methods: {
    // async getTask() {
    //   this.getToken()
    //   this.getTaskId(this.task_id)
    // },
    add() {
      this.list.push({
        file_name: 'file',
        file_img: '',
        file_preview: '',
      })
    },
    async previewFile(e) {
      let node = e.target
      let file = node.files[0]
      const { url, name, path } = await this.$globalUpdateFile(file)
      this.$set(this.currentItem, 'tmp', path)
      this.uploadFile()
      this.$set(this.currentItem, 'preview_name', name)
      this.$refs.updateFile.setAttribute('type', 'text')
      this.$refs.updateFile.setAttribute('type', 'file')
    },
    del(index) {
      if (this.list <= 1) {
        return this.$message.warning('文件数不能少于1')
      }
      this.$confirm('是否删除?')
        .then(res => {
          this.list.splice(index, 1)
        })
        .catch(res => {
          // 取消事件
        })
    },
    choice(item, type, file) {
      this.currentItem = item
      this.$refs.updateFile.setAttribute('accept', file || '.zip')
      this.$refs.updateFile.click()
    },
    async uploadFile() {
      let progress = this.$progress()
      await fastLibrary({
        tmp: this.currentItem.tmp,
        task_id: this.task_id,
      })
        .then(res => {
          this.getProgress(0, res => {
            if (parseInt(res.data.info.speed) != 100) {
              progress.percentage = parseInt(res.data.info.speed || 1)
            }
          }).then(
            res => {
              const { info } = res.data
              if (typeof info.book_id == 'string') {
                this.currentItem.book_id = info.book_id
              } else {
                this.currentItem.book_id = info.book_id.pop()
              }
              progress.close()
            },
            err => {
              progress.close()
            }
          )
        })
        .catch(err => {
          progress.close()
        })
    },
  },
}
</script>

<template lang="pug">
.info
  p.title 上传数据（必填）
  VaForm(ref="detailForm")
    form.detailForm
      .switch
        .div
          img(src="../img/X-SWitch.png")
        .div
          el-button(type="text" @click="openXswitch()") x-switch转档工具下载
      .group(v-for='item,index in list' :key="index")
        .label 上传文件
        el-input.small(size='small' v-model='item.preview_name' disabled)
        el-button(type="primary" size="small" @click="choice(item)" :disabled="!task_id") 浏览
        el-button(type="danger" icon="el-icon-delete" size="small" @click="del(index)") 删除
      .btns
        input.hide(type="file" @change="previewFile($event)" ref="updateFile" accept=".zip")
        el-button(type="primary" icon="el-icon-plus" size="mini" @click="add") 新增
</template>

<style lang="stylus" scoped>
.detailForm
  text-align center
</style>
