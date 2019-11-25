import service from 'services/x-library/front'

const pageOffset = 20
export default {
  namespaced: true,
  state: () => ({
    page: {
      pageStart: 0,
      pageOffset,
    },
    column: [],
    columnSecond: [],
    columnResource: [],
    columnKeys: [],
    subject: [], //顶部 nav
    subjectList: [],
    subjectDetail: null,
    matchSubjectId: null,
    matchId: '',
    itemDetail: {}, // 详情d
    meta: {},
    subjectDetailList: [],
    resPage: '',
  }),
  mutations: {
    set_column_resource(state, data) {
      state.columnResource = data
    },
  },
  actions: {
    getCategory(ctx, data = {}) {
      return service.category
        .getCategory(data)
        .then(res => {
          ctx.state[data.type] = sortCate(res.data)
        })
        .catch(e => {
          console.warn(`[vuex getCategory]： ${e.toString()}`)
        })
    },
    getColumnPageData(ctx, data) {
      let type = {
        type: 'column',
        pid: 'root',
      }
      return Promise.all([ctx.dispatch('getCategory', type)])
    },
    // column item list
    async getColumnSecondPageData(ctx, query) {
      let type = {
        type: 'column',
        pid: query.id,
      }
      let res = await service.category.getCategory(type)
      let matchId = query.cid || res.data[0].id
      this.$util.unCheckedAll(res.data, matchId)
      ctx.state.columnSecond = res.data
      ctx.state.matchId = matchId
      let arr = [
        ctx.dispatch('getColumnResource', {
          category_id: matchId,
          clean: true,
        }),
      ]
      return Promise.all(arr)
    },
    async getColumnResource({ state }, { clean = false, ...query } = {}) {
      let category_id = query.category_id || state.matchId

      let res = await service.category.getColumnResource({
        ...state.page,
        ...query, // 覆盖 pageStart
        category_id,
      })
      if (clean) {
        state.columnResource = []
      }

      state.columnResource.push(...res.data)
      state.resPage = res.page
      if (state.columnResource.length === res.page.total) {
        return true
      }
    },
    async getColumnKeys(ctx, query) {
      await service.category.getColumnKeys(query).then(res => {
        ctx.state.columnKeys = res.data
      })
    },
    async getItemDetail({ state, dispatch }, query) {
      await service.category.getColumnDetail(query).then(res => {
        state.itemDetail = res.data
        state.meta = res.data.components
      })
    },

    async getSubjectPageData(ctx, data) {
      let type = {
        type: 'subject',
        pid: 'root',
      }
      let res = await service.category.getCategory(type)
      let matchSubjectId = data.id || (res.data[0] && res.data[0].id)
      ctx.state.matchSubjectId = matchSubjectId
      this.$util.unCheckedAll(res.data, matchSubjectId)
      ctx.state.subject = res.data
      await ctx.dispatch('getSubjectList', { id: matchSubjectId, clean: true })
      // return Promise.all([ctx.dispatch('getCategory', type)])
    },
    async getSubjectList({ state, dispatch }, { clean = false, ...data } = {}) {
      let id = data.id || state.matchSubjectId

      let res = await service.category.getSubjectList({
        ...state.page,
        ...data,
        id,
      })
      if (clean) {
        state.subjectList = []
      }
      state.subjectList.push(...res.data)
      state.resPage = res.page

      if (state.subjectList.length === res.page.total) {
        return true
      }
    },
    async getSubjectDetailList(
      { state, dispatch },
      { clean = false, ...data } = {}
    ) {
      let res = await service.category.getSubjectSources({
        ...state.page,
        ...data,
      })
      if (clean) {
        state.subjectDetailList = []
      }

      state.subjectDetailList.push(...res.data)
      state.resPage = res.page

      if (state.subjectDetailList.length === res.page.total) {
        return true
      }
    },
    getSubjectDetailPageData(ctx, data) {
      return Promise.all([
        service.category.getSubjectDetail(data).then(res => {
          return (ctx.state.subjectDetail = res.data)
        }),
      ])
    },
  },
}

function sortCate(cate) {
  let obj = {}
  // let obj2 = {}
  // console.log(cate)
  // findChildByPid(obj2, 'root', cate) // 3ms - 10ms
  findChild(obj, cate) // // 0.3ms - 0.6ms
  return obj.root
}

// 最慢的方法,递归找child , forEach内执行次数 长度*长度
function findChildByPid(data, id, all) {
  data.children = []
  all.forEach(item => {
    // console.count('findChildByPid') // 执行 53130次数
    if (item.pid === id) {
      data.children.push(item)
    }
  })
  data.children.forEach(citem => {
    findChildByPid(citem, citem.id, all)
  })
}

/* 
  找到所有的child 数组, 组成obj
  然后,遍历数据,找到他们自己child
*/
function findChild(data, all) {
  all.forEach(item => {
    if (!data[item.pid]) {
      data[item.pid] = []
    }
    // data[item.pid] 改变了引用,因此child无值
    data[item.pid].push(item)
  })
  buildRelation(data)
}

function buildRelation(data) {
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const arr = data[key]
      arr.forEach(item => {
        item.checked = false
        item.children = data[item.id]
      })
    }
  }
}
