const browserImageSize = require('browser-image-size')
import ImageCropper from 'projects/x-publish-mgr/components/common/ImageCropper'
import Vue from 'vue'

/**
 * @param {Object} data 传入对象
 * @param {String} data.file 过滤时的弹出信息
 * @param {String} data.ratio 长宽比
 * @param {String} data.interval 冗余度
 * @param {String} data.MinWidth 最小宽度
 * @param {String} data.MinHeight 最小高度
 */
export async function ImageSize({
  interval = 0.05,
  ratio = 1.6,
  file = null,
  MinWidth = null,
  MinHeight = null,
} = {}) {
  let resolve, reject
  let promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  browserImageSize(file).then(
    size => {
      if (ratio) {
        const { width, height } = size
        let _ratio = width / height
        let pRtio = ratio - interval > 0 ? (ratio - interval).toFixed(2) : 0
        let nRtio = (ratio + interval).toFixed(2)
        if (pRtio < _ratio && _ratio < nRtio) {
          resolve(size)
        } else {
          reject({
            message: `上传比例错误,宽高比${pRtio}-${nRtio}之间`,
            status: 201,
          })
        }
      }
    },
    err => {
      reject(err)
    }
  )
  return promise
}

/**
 * @param {Object} data 传入对象
 * @param {String} data.file 过滤时的弹出信息
 * @param {String} data.ratio 长宽比
 * @param {String} data.interval 冗余度
 * @param {String} data.MinWidth 最小宽度
 * @param {String} data.MinHeight 最小高度
 */
export async function ImageSizeCropper({
  interval = 0.05,
  file = null,
  autoWidth = 250,
  autoHeight = 150,
} = {}) {
  let resolve, reject
  let promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  browserImageSize(file).then(
    size => {
      let ratio = autoWidth / autoHeight
      if (ratio) {
        const { width, height } = size
        let _ratio = width / height
        let pRtio = ratio - interval > 0 ? (ratio - interval).toFixed(2) : 0
        let nRtio = (ratio + interval).toFixed(2)
        if (pRtio < _ratio && _ratio < nRtio) {
          resolve(size)
        } else {
          let ImageCroppers = Vue.extend(ImageCropper)
          let blobFile = URL.createObjectURL(file)
          let croper = new ImageCroppers({
            propsData: {
              autoCropWidth: autoWidth,
              autoCropHeight: autoHeight,
              imgFile: blobFile,
            },
            methods: {
              colse() {
                croper.imageCropperDialog = false
                document.body.removeChild(croper.$el)
              },
              addSelection() {
                this.$refs.cropper.getCropBlob(data => {
                  data.name = file.name
                  console.log(data, '---blob 数据类型---')
                  croper.imageCropperDialog = false
                  reject(data)
                })
              },
            },
          })
          croper.imageCropperDialog = true
          croper.$mount()
          document.body.appendChild(croper.$el)
          /**
           * 使用方式
           */
          // this.$ImageSizeCropper({
          //   file: file,
          //   autoWidth: 290,
          //   autoHeight: 400,
          // }).then(
          //   res => {
          //     this.previewImgUrl = URL.createObjectURL(file)
          //   },
          //   data => {
          //     this.preview(data)
          //   }
          // )
        }
      }
    },
    err => {
      reject(err)
    }
  )
  return promise
}

export function HtmlDecode(str) {
  if (!str) {
    return ''
  }
  var d = document.createElement('DIV')
  d.innerHTML = str
  var o = d.innerText
  d = null
  return o
}

// export function getChecked(refName, content){
//   if(refName == undefined){
//     throw new Error("获取选中,请先传入ref")
//   }
//   var ids = []
//   var names = content.$refs[refName];
//   if(!names){
//     throw new Error("没有该refName:"+refName)
//   }
//   content.$refs[refName].forEach(item => {
//     if(item.checked){
//       ids.push(item.value)
//     }
//   })
//   if(ids.length > 0 ){
//     return ids
//   }else {
//     this.$message.error("请先选中")
//     return false ;
//   }
// }

/**
 *
 * @param {*} refName 默认ids
 * @param {Object} data 过滤的数据
 * @param {String} name 需要过滤的名字
 * @param {String} value 需要过滤的值
 * @param {String} error 过滤时的弹出信息
 */
export function getChecked({ refName = 'ids', data, name, value, error } = {}) {
  let ids = []
  let names = this.$refs[refName] //这里的this指向调用该方法的组件
  if (!names) {
    throw new Error('没有该refName:' + refName)
  }
  for (let item of names) {
    if (item.checked) {
      if (data && name && value) {
        let index = data.findIndex(v => v[name] == value && v.id == item.value)
        if (index > -1) {
          if (error) {
            this.$message.error(error)
            return false
          }
          break
        }
      }
      ids.push(item.value)
    }
  }
  if (ids.length > 0) {
    return ids
  } else {
    this.$message.error('请先选中')
    return false
  }
}

export function debounce(func, delay) {
  /* 节流函数 */
  let timer = null
  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

export function checkAll(e, refName = 'ids', flag) {
  let names = this.$refs[refName] //这里的this指向调用该方法的组件
  changeCheck(names, e.target.checked)
}
export function unCheck(refName = 'ids', flag = false) {
  let names = this.$refs[refName] || [] //这里的this指向调用该方法的组件
  changeCheck(names, flag)
}

export function changeCheck(names, flag = false) {
  if (!names) {
    throw new Error('没有该refName:' + refName)
  }
  names.forEach(item => {
    item.checked = flag
  })
}

export function addLinks(url, type) {
  return new Promise((res, rej) => {
    addJsFiles(url, type, res, rej)
  })
}

function addJsFiles(URL, FileType, resolve, reject) {
  var oHead = document.getElementsByTagName('HEAD').item(0)
  var addheadfile
  if (FileType == 'js') {
    addheadfile = document.createElement('script')
    addheadfile.type = 'text/javascript'
    addheadfile.src = URL
  } else {
    addheadfile = document.createElement('link')
    addheadfile.type = 'text/css'
    addheadfile.rel = 'stylesheet'
    addheadfile.href = URL
  }
  addheadfile.onload = function() {
    resolve('load success!')
  }
  addheadfile.onerror = function() {
    reject('load error!')
  }
  oHead.appendChild(addheadfile)
}
