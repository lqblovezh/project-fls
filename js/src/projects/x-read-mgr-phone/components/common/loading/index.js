import vue from 'vue'

import LoadingComponent from './loading'
import Confirm from './Confirm'
import { Toast } from 'mint-ui';
import DatePick from './DatePick'
import Vue from 'vue';

const LoadingConstructor = vue.extend(LoadingComponent )
const ConfirmConstructor = vue.extend(Confirm )
const DatePickConstructor = vue.extend(DatePick )


//Toast 
Vue.prototype.$Toast = function(message='' , duration=2000 , position="middle"){
  Toast({
    message,
    position,
    duration
  });
}

//datePick
const datePick = new DatePickConstructor({
  el:document.createElement('div'),
  data(){
    return {

    }
  }
})
document.body.appendChild(datePick.$el)

Vue.prototype.$openDatePick = function ({startDate=null , endDate=null} = {}){
  datePick.startDate = startDate 
  datePick.endDate = endDate 
  return datePick.open()
} 




// loading
const loadingDom = new LoadingConstructor({
  el:document.createElement('div'),
  data(){
    return  {
      show:false

    }
  }
})
document.body.appendChild(loadingDom.$el)
function showLoading(){
  loadingDom.show = true  
}
function closeLoading(){
  loadingDom.show = false
}
vue.prototype.$showLoading = showLoading
vue.prototype.$closeLoading = closeLoading


// confirm
const confirmDom = new ConfirmConstructor({
  el:document.createElement('div'),
  data(){
    return  {
      show:false
    }
  }
})
document.body.appendChild(confirmDom.$el)
vue.prototype.$confirm = function(text){
  confirmDom.show = true 
  confirmDom.text = text 
  return confirmDom.wait()
}


