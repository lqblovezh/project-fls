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
    listChild: [],
    // 勾选的关键词
    wordList: [],
    citemChecked: {},
  }),
  actions: {
    async searchAdvanceKey(
      { state, dispatch },
      { clean = false, ...query } = {}
    ) {
      if (!query.keyword) return
      let res = await service.search.searchAdvanceKey({
        ...state.page,
        ...query,
      })
      let tempList = state.list
      if (clean) {
        tempList.splice(0, tempList.length)
      }
      tempList.push(...res.data)
    },
    async searchAdvanceChildKey(
      { state, dispatch },
      { clean = false, ...query } = {}
    ) {
      if (!query.id) return
      let res = await service.search.searchAdvanceKey({
        ...state.page,
        ...query,
      })
      // 这种方式不会丢失引用,  方便改动
      let tempList = state.listChild
      if (clean) {
        tempList.splice(0, tempList.length)
      }
      tempList.push(...res.data)
    },
    async getList({ state, dispatch }, { clean = false, ...query } = {}) {
      if (!query.id) return
      let res = await service.search.searchAdvanceKey({
        ...state.page,
        ...query,
      })
      // 这种方式不会丢失引用, 方便改动, 垃圾回收应该会快
      let tempList = state.list
      if (clean) {
        tempList.splice(0, tempList.length)
      }
      tempList.push(...res.data)
      if (tempList.length === res.page.total) {
        return true
      }
    },
  },
}
