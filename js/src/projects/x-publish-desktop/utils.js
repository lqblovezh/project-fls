function addJsFiles(URL, FileType, resolve, reject) {
  var oHead = document.getElementsByTagName('HEAD').item(0)
  var addheadfile
  if (FileType == 'js') {
    addheadfile = document.createElement('script')
    addheadfile.type = 'text/javascript'
    addheadfile.src = URL
    addheadfile.onload = function() {
      resolve('load success!')
    }
    addheadfile.onerror = function() {
      reject('load error!')
    }
  } else {
    addheadfile = document.createElement('link')
    addheadfile.type = 'text/css'
    addheadfile.rel = 'stylesheet'
    addheadfile.href = URL
    resolve('resolve css immediately')
  }

  oHead.appendChild(addheadfile)
}

export function addLinks(url, type) {
  return new Promise((res, rej) => {
    addJsFiles(url, type, res, rej)
  }).catch(err => {
    console.error('js加载错误!' + err)
  })
}

export function isPhone() {
  return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}
