import { isRestElement } from "babel-types";

export default {
  state:{
    listenReads:{
      data:[],
      page:{
        pageNum:1,
      }
    },
    bannerList:null,
    buttonList:null,
    recomList:null,
    column:null,
    columnList:{
      page:{},
      data:[],
    }, //包含page信息
    cityList:null ,  // 
    
    bookCircleList:{ // 书圈列表
      page:{},
      data:[],
    },
    bookClassificationId:'',// 用于判断页面类型是否发生变化
    citycolumn:null ,  // 首页书城子集分类
    categoryList:{} ,  // 首页书城分类下书列表
    keyWords:'123',  //首页搜索参数传递
  },
  mutations:{
    setBookCircleList(state ,res ){
      state.bookCircleList = res 
    },

    setListenReads(state,res){
      state.data = state.data.concat(res.data)
      state.page = res.page
    },
    setBannerList(state , res){
      state.bannerList = res.data ;
    },
    setButtonList(state , res){
      state.buttonList = res.data;
    },
    setRecomList(state , res){
      state.recomList = res.data 
    },
    setColumn(state , res){
      state.column = res.data 
    },
    setColumnList(state , res){
      if(res.data.length == 0) return 
      const {data ,page } = res
      if(res.clean){
        state.columnList = {data ,page }
        return 
      }

      // state.columnList.data.concat(data)//此方法不会更改现有数组，而是返回一个新数组。
      state.columnList.data.push(...data)
      state.page = page
    },

    setCityList(state , res){
      state.cityList = res.data
    },

    setBookClassificationId(state , data){
      state.bookClassificationId = data
    },
    setCitycolumn(state , res){
      state.citycolumn = res.data
    },
    setCityCategoryList(state , res={} , clean){
      const {data ,page } = res
      state.categoryList = {data ,page }
    },
    setUserInput(state,data){
       state.keyWords = data;
    }
  },
  actions:{},
  getters:{},
}