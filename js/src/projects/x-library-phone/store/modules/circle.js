import service from 'services/x-library/front'

const pageOffset = 20
export default {
  namespaced: true,
  state: () => ({
    page: {
      pageStart: 0,
      pageOffset,
    },
    list: [],
    person_list: [],
    detail: null,
    detailList: [],
    commentDetail: {}, //作为临时存放
    commentList: [],
  }),
  actions: {
    getListPageData(ctx, data = {}) {
      // 服务端和客户端会渲染两次,导致数据污染, 因此刷新后第一次请求, 始终为重新赋值
      return ctx.dispatch('getList', { ...data, clean: true })
    },
    // 分页逻辑最终版
    async getList({ state }, { clean = false, ...page } = {}) {
      let res = await service.circle.getList({ ...state.page, ...page })
      // 放在获取数据之前, 就会因为服务端和客户端数据不一致, 
      // 服务端渲染 得到的是包含数据的list
      // 客户端会走一遍 = [] , 然后填充数据, 页面会转[], 再有数据
      // 就会检查到[] 与 服务端包含数据的list不一致
      if (clean) {
        state.list = []
      }
      state.list = [...state.list, ...res.data]

      // 判断加入后的数据是否等于总长度, 如果相等, 说明到底部了,
      // 否则返回false , 给Scroll组件 loadMore调用结果
      if (state.list.length === res.page.total) {
        return true
      }
    },
    getCircleDetailPageData({ dispatch }, query = {}) {
      return Promise.all([
        dispatch('getCircleDetail', query),
        dispatch('getDetailList', query),
      ])
    },
    getCircleDetail({ dispatch, state }, query = {}) {
      service.circle.detail(query).then(res => {
        console.log(res)
        state.detail = res.data
      })
    },
    async getDetailList({ dispatch, state }, { clean = false, ...query } = {}) {
      let res = await service.circle.comments({ ...state.page, ...query })
      if (clean) {
        state.detailList = []
      }
      state.detailList = [...state.detailList, ...res.data]

      // 判断加入后的数据是否等于总长度, 如果相等, 说明到底部了,
      // 否则返回false , 给Scroll组件 loadMore调用结果
      if (state.detailList.length === res.page.total) {
        return true
      }
    },

    async getCommentList(
      { dispatch, state },
      { clean = false, ...query } = {}
    ) {
      let res = await service.circle.commentDetail({ ...state.page, ...query })
      if (clean) {
        state.commentList = []
      }
      state.commentList.push(...res.data)
      // 判断加入后的数据是否等于总长度, 如果相等, 说明到底部了,
      // 否则返回false , 给Scroll组件 loadMore调用结果
      if (state.commentList.length >= res.page.total) {
        return true
      }
    },

    async getCirclePerson ({ state }, {
      clean = false,
      pageOffset = 20,
      ...query
    }) {
      try {
        if (clean) {
          state.person_list = []
        }
        const res = await service.circle.getCirclePerson({ pageOffset, ...query })
        state.person_list = [...state.person_list, ...res.data]
        if (state.person_list.length === res.page.total) {
          return true
        }
      } catch(e) {
        console.error(`[vuex getCirclePerson]：${e.toString()}`)
      }
    }
  },
}
