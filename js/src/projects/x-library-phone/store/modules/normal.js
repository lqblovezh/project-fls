import service from 'services/x-library/front'

const pageOffset = 20

const typeConfig = {
  keyword: service.find.getLinks,
  advance_keyword: service.search.exactWords,
  advance_form: ({ formData, ...data } = {}) => {
    let form_query = JSON.parse(formData)
    return service.search.advSearch({ ...form_query, ...data })
  },
}

export default {
  namespaced: true,
  state: () => ({
    page: {
      pageStart: 0,
      pageOffset,
    },
    list: [],
    law_list: [],
    resPage: '',
    cates: [],
    cateSecond: [],
    ids: {}
  }),
  mutations: {},
  actions: {
    async init({ dispatch }, params) {
      const { isKey, pid, cid } = params
      await dispatch('initTabs', {pid, cid})
      await dispatch('getList', { category_id: cid, ...params})
    },
    // 分页逻辑最终版
    async getList(
      { state },
      { clean = false, list_type = 'keyword', category_id, ...query } = {}
    ) {
      query.category_id = category_id || (state.cateSecond.length && state.cateSecond[0].id) || ''
      let res = await typeConfig[list_type]({ ...state.page, ...query })

      if (clean) {
        state.list = []
      }
      if (res.data) {
        state.list = [...state.list, ...res.data]
      }
      // 判断加入后的数据是否等于总长度, 如果相等, 说明到底部了,
      // 否则返回false , 给Scroll组件 loadMore调用结果
      state.resPage = res.page

      if (state.list.length === res.page.total) {
        return true
      }
    },
    async getLawList ({ state, dispatch }, query) {
      const {
        laws
      } = query
      try {
        const res = await service.find.getLinks({ laws })
        state.law_list = res.data || []
      } catch(e) {
        console.error(`[vuex getLawList]：${e.toString()}`)
      }
    },
    async initTabs({ state, dispatch }, { pid, cid }) {
      const firstTabs = await dispatch('getTabs', 'root')
      checkedOne(firstTabs.data, pid)
      state.cates = firstTabs.data
      await dispatch('getSecond', { pid: pid || firstTabs.data[0].id, cid })
    },
    async getTabs ({state}, pid) {
      try {
        return await service.category.getCategory({ type: 'column', pid })
      } catch(e) {
        console.warn(e.toString())
      }
    },
    // 获取二级导航
    async getSecond({ state, dispatch }, { pid, cid }) {
      const secondTabs = await dispatch('getTabs', pid)
      checkedOne(secondTabs.data, cid)
      state.cateSecond = secondTabs.data
    }
  },
}
function checkedOne(list, id) {
  if (!list || list.length === 0) return
  if (id) {
    list.forEach(i => {
      i.checked = false
      if (i.id === id) {
        i.checked = true
      }
    })
  } else {
    list[0].checked = true
  }
  return list
}

function isEmptyObj(o) {
  for (let i in o) {
    return false
  }
  return true
}