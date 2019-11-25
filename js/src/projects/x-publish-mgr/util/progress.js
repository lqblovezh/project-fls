import UploadProgress from 'projects/x-publish-mgr/components/common/UploadProgress'
export default {
  install(Vue , opts){
    var Progress = Vue.extend(UploadProgress)
    Progress.prototype.close= function(){
      this.percentage = 0 ;
    }
    var p = new Progress({}) //
    Vue.prototype.$progress = function(){
      p.percentage = 1; //始终显示上传
      p.$mount()
      document.body.appendChild(p.$el)  // 挂载组件, 组件的取消挂载在组件内部用 if判断了
      return p ;
    }
  }
}




