
export function  recursionTree(data ,pidname , pid  ){
  //找到第一级
  var res = data.filter(obj => {
    return obj[pidname] === pid
  })
  res.forEach(obj => {
    obj.children = recursionTree(data , pidname , obj.id )
  })
  return res ;
}

export function getValis(vnodes = [] , res = []){
  vnodes.forEach(item => {
    if( item.data&&  item.data.directives ){
      var node = item.data.directives.filter(d => d.name==="va")[0]
      if(node){
        res.push(item);
      }
    }
    if(item.children){
      getValis(item.children , res)
    }
  });

  return res ;
}

export function formatSize(val) {
  let num = val/1024/1024
  return `${num.toFixed(2)}MB`
}
