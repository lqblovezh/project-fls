(function a (){
  var e = document.createElement('img');
  e.className = 'absbox';
  e.src = 'blob:http://192.168.1.165:8000/85d446f7-ac89-485d-9aab-9ad50ac37e3c'
  document.body.appendChild(e);
  var t = 'none' === getComputedStyle(e).display ;
  global.AdBlockEnable = t
  return document.body.removeChild(e) , t
})()
