import Store from 'store2'
import { getClientToken } from 'services/system/home'
import { detailBooks } from 'services/x-publish/book'
import { fast_task, mountSchedule } from 'services/system/mack'
import parse from 'url-parse'
const servicesConfig = global.config

export const makeMixin = {
  data() {
    return {
      token: {},
      task_id: null,
    }
  },
  methods: {
    async getTaskId() {
      Store.session(this.makeType + '_task_id', '')
      return await fast_task({
        type: this.makeType,
        task_id: this.task_id,
      })
        .then(res => {
          Store.session(this.makeType + '_task_id', res.data.id)
          this.task_id = res.data.id
          return res
        })
        .catch(({ payload }) => {
          this.$message.error(payload.errors[0])
        })
    },
    async getProgress(delay = 1000, callback = () => {}) {
      return await mountSchedule({ id: this.task_id }).then(
        res => {
          const { status } = res.data
          if (status == 'success') {
            this.$message.success('入库成功')
            this.book_id = res.data.info.book_id
            return res
          } else if (status == 'failed') {
            this.$message.error('任务失败')
          } else {
            return new Promise((resolve, reject) => {
              callback(res)
              setTimeout(() => {
                resolve(this.getProgress(undefined, callback))
              }, delay)
            })
          }
        },
        err => {
          this.$message.error(err.message)
        }
      )
    }, //获取进度
    getToken() {
      getClientToken().then(res => {
        this.token = res.data
      })
    },
    getBookDetail(id) {
      detailBooks({
        id: this.book_id || id,
      })
        .then(res => {
          this.detailInfo = res.data
        })
        .catch(err => {
          this.$message.error(err.message)
        })
    },
    xswitchOpen() {
      let domain = parse(servicesConfig.baseUrl, true).host + global.restUrl
      return 'xswitch://url=' + domain + '&token=' + this.token.token
    },
  },
}

export const publickMixin = {
  data() {
    return {
      imageCropperDialog: false,
      imgFile: null,
    }
  },
  methods: {
    async previewImg(e, ratio = 0.73) {
      let node = e.target
      let file = node.files[0]
      this.imgFile = URL.createObjectURL(file)
      this.$ImageSize({ file: file, ratio: ratio, interval: 0.05 }).then(
        async res => {
          const { url, path } = await this.$globalUpdateFile(file)
          this.$set(this.detailInfo, 'img', path)
          this.$set(this.detailInfo, 'img_src', url)
        },
        err => {
          if (err.status == 201) {
            this.imageCropperDialog = true
            return
          }
          this.$message.error(err.message)
        }
      )
      // this.detailInfo.img = path
      // this.detailInfo.img_src = url
      // const { url, path } = await this.$globalUpdateFile(file)
      // this.$set(this.detailInfo, 'img', path)
      // this.$set(this.detailInfo, 'img_src', url)
    },
    valiAll() {
      let flag = this.$refs.detailForm.valiAll()
      if (!flag) {
        return false
      } else {
        if (!this.detailInfo.img) {
          return false
        }
        return true
      }
    },
    async preview(data) {
      this.imgFiles = data
      this.imgFiles.name = 'img'
      const { url, path } = await this.$globalUpdateFile(this.imgFiles)
      this.$set(this.detailInfo, 'img', path)
      this.$set(this.detailInfo, 'img_src', url)
      this.imageCropperDialog = false
    },
  },
}
