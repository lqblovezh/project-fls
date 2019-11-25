import dayjs from 'dayjs'
import service from 'services/x-library/front'
const pageOffset = 10

export default {
  namespaced: true,
  state: () => ({
    key: {
      // 搜索关键字
      lastName: '',
    },
    page: {
      pageStart: 0,
      pageOffset,
    },
    list: [],
    historyMaxLenght: 5,
    isHistoryVis: true,
    history: [],
    searchHistory: [],
    filterList: [],
    cates: [],
    cateSecond: [],
    hots: [],
    searchId: {
      pid: '',
      cid: '',
    },
    resPage: '',
  }),
  mutations: {
    SET_LIST(state, data) {
      state.list = data
    },
    SET_FILTER_LIST(state, data) {
      state.filterList = data
    },
  },
  actions: {
    async searchData(
      { state, dispatch },
      { isCate = false, isHistory = false, ...data }
    ) {
      // 这个方法写得比较丑
      const { pid, cid } = data
      // 第一次进来, 搜索的需要栏目id, 因此需要先获取栏数据
      if (isCate) {
        let res = await service.category.getCategory({
          type: 'column',
          pid: 'root',
        })
        let matchPid = pid || res.data[0].id
        let second = await service.category.getCategory({
          type: 'column',
          pid: matchPid,
        })
        let matchCid = cid || second.data[0].id

        state.searchId.pid = matchPid
        state.searchId.cid = matchCid
        this.$util.unCheckedAll(res.data, matchPid)
        this.$util.unCheckedAll(second.data, matchCid)

        state.cates = res.data
        state.cateSecond = second.data

        // 如果第一次进来没有pid, 那么就要退出, 有的话,继续查,
        if (!cid || !pid) return
      } else {
        // 非第一次进来, 说明已经有cates, 这里主要处理变色
        if (pid && cid) {
          setItemActive(state.cates, pid)
          setItemActive(state.cateSecond, cid)
          state.searchId = { cid, pid }
        }
      }

      // 热词两次不相同, 才加入(有可能cateid 变化, 但是关键词没变)
      if (state.key.lastName !== data.name) {
        service.search.getHot({ pageStart: 0, pageOffset }).then(res => {
          state.hots = res.data
        })
        dispatch('getHot')
        if (!data.name) return
        dispatch('addSearchHistory', data)
        state.key.lastName = data.name
      }

      // 最终查询
      try {
        if (!data.name) return
        dispatch('searchFinalData', data)
      } catch (error) {}
    },
    async getList(
      { state, dispatch },
      { cate = false, history = false, ...data }
    ) {
      const { pid, cid } = data
      if (cate) {
        await dispatch('initTab', { pid, cid })
        if (!pid || !cid) return
      } else {
        if (pid && cid) {
          // setItemActive(state.cates, pid)
          // console.log(state.cates, pid)
          // setItemActive(state.cateSecond, cid)
          // state.searchId = { cid, pid }
        }
      }
      await dispatch('updateHotwords', data)
      if (data.name) {
        dispatch('searchFinalData', data)
      }
    },
    /**
     * 更新热词
     * @param  {[String]} name             搜索的词语
     * @return {[type]}                  [description]
     */
    async updateHotwords({ state, dispatch }, query) {
      if (query.name && state.key.lastName !== query.name) {
        try {
          const res = await service.search.getHot()
          state.hots = res.data
          dispatch('addSearchHistory', query)
          state.key.lastName = query.name
        } catch (e) {
          console.warn(e.toString())
        }
      }
    },
    async searchFinalData(
      { state, dispatch },
      { clean = false, ...data } = {}
    ) {
      state.isHistoryVis = false

      let res = await service.search.search({
        ...state.page,
        ...data,
      })
      if (clean) {
        state.list = []
      }

      state.list = [...state.list, ...res.data]

      // 判断加入后的数据是否等于总长度, 如果相等, 说明到底部了,
      // 否则返回false , 给Scroll组件 loadMore调用结果
      state.resPage = res.page

      if (state.list.length === res.page.total) {
        return true
      }
    },
    addSearchHistory(ctx, data) {
      let his = ctx.state.searchHistory
      let multiIndex
      // 发送后台热词
      try {
        service.search.addHot(data)
      } catch (error) {}

      his.map((item, index) => {
        if (item.name == data.name) {
          multiIndex = index
        }
      })
      ctx.dispatch('delSearchByIndex', multiIndex)
      data.time = dayjs(new Date()).format('YYYY-MM-DD')
      data.tid = Math.random()
      his.unshift(data)
      if (his.length > 6) {
        his.pop()
      }
      // 热词存本地
      if (global.localStorage) {
        localStorage.searchHistory = JSON.stringify(his)
      }
    },
    delSearchByIndex(ctx, index) {
      if (!index && index !== 0) return
      ctx.state.searchHistory.splice(index, 1)
    },
    /*
     * 初始化一二级导航条，并设置选中状态
     */
    async initTab({ state, dispatch }, payload) {
      const { pid, cid, hot = false } = payload
      const firstTabs = await dispatch('getTabs', 'root')
      state.cates = setItemActive(firstTabs.data, pid)
      const secondTabs = await dispatch('getTabs', pid || firstTabs.data[0].id)
      state.cateSecond = setItemActive(secondTabs.data, cid)
      try {
        if (!hot) {
          return
        }
        const res = await service.search.getHot({
          pageStart: 0,
          pageOffset: 15,
        })
        state.hots = res.data
      } catch (e) {
        console.error(`[initTab]: ${e.toString()}`)
      }
    },
    async getTabs(ctx, pid) {
      try {
        return await service.category.getCategory({
          type: 'column',
          pid,
        })
      } catch (e) {
        console.warn(e.toString())
      }
    },
    /*
     * 更新二级导航条
     */
    async updateSecondTabs({ state, dispatch }, pid) {
      const res = await dispatch('getTabs', pid)
      state.cateSecond = setItemActive(res.data)
      return res.data[0].id
    },
    async getSimpleSearch(
      { commit, state, dispatch },
      { clean = false, ...data } = {}
    ) {
      console.log(data)
      await dispatch('updateHotwords', {
        name: data.keyword || data.name,
      })
      let res = await service.db.search({ ...state.page, ...data })
      if (clean) {
        state.list = []
      }
      state.list = [...state.list, ...res.data]
      state.resPage = res.page
      if (state.list.length === res.page.total) {
        return true
      }
    },
    getHot({ state, dispatch }, { ...data } = {}) {
      service.search
        .getHot(data)
        .then(res => {
          state.hots = res.data
        })
        .catch(res => {
          console.log(res)
        })
    },
  },
}

function setItemActive(list, id) {
  // 列表不存在或者长度为空就返回
  if (!list || list.length === 0) {
    return
  }
  // 查找checked属性设置为true的元素，更改checked属性
  return setItemActiveById(list, id)
}

function setItemActiveById(list, id) {
  if (id) {
    list.forEach(item => {
      item.checked = false
      if (item.id === id) {
        item.checked = true
      }
    })
  } else {
    list[0].checked = true
  }
  return list
}
