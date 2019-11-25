import * as common from 'services/common'

export function isFileBig(e, size = 1) {
  let file = e.target.files[0]
  if (!file) return
  if (file.size > 1024 * 1024 * size) {
    console.log(file.size)
    this.$message.error('图片过大, 请上传小于1m的图片')
    return
  }
  return file
}
export async function globalUpdateFile(file) {
  console.log('globalUpdateFile', this)
  let loading = this.$loading({
    text: '正在上传',
    background: 'rgba(0, 0, 0, 0.8)',
  })
  let res
  try {
    res = await common.getTask(file)
  } catch (error) {
    loading.close()
    return {}
  }
  loading.close()
  return res.data
}

export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return fmt
}