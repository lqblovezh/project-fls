
/**
 *
 * @param {*} refName 默认ids
 * @param {Object} data 过滤的数据
 * @param {String} name 需要过滤的名字
 * @param {String} value 需要过滤的值
 * @param {String} error 过滤时的弹出信息
 */
export function getChecked({
  isShowMessage=true,
  refName='ids',
  data,
  name,
  value,
  error,
}={}) {
  let ids = []
  let names = this.$refs[refName];  //这里的this指向调用该方法的组件
  if (!names) {
    throw new Error("没有该refName:" + refName)
  }
  for(let item of names){
    if (item.checked) {
      if(data&&name&&value){
        let index = data.findIndex(v => v[name] == value&&v.id == item.value)
        if(index>-1){
          if(error){
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
    if(isShowMessage){
      this.$message.error('请先选中')
      return false
    }else{
      return []
    }
  }
}

export function checkAll(e , refName='ids' ,flag){
  let names = this.$refs[refName];  //这里的this指向调用该方法的组件
  changeCheck(names , e.target.checked )
}
export function unCheck(refName='ids' ,flag = false){
  let names = this.$refs[refName] || [];  //这里的this指向调用该方法的组件
  changeCheck(names, flag )
}

export function changeCheck(names,flag = false){
  if (!names) {
    throw new Error("没有该refName:" + refName)
  }
  names.forEach(item => {
    item.checked = flag
  })
}

