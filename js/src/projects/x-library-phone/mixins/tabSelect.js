import { mapState, mapMutations, mapActions } from 'vuex'
module.exports = {
  data () {
    return {
      isFilter: false,
      params: {},
    }
  },
  computed: {
    ...mapState('search', {
      cates: state => state.cates,
      cateSecond: state => state.cateSecond,
      filterList: state => state.filterList
    })
  },
  methods: {
    ...mapMutations('search', ['SET_LIST']),
    ...mapActions('search', ['initTab', 'updateSecondTabs', 'getFilterKeysById']),
    async initPage () {
      console.log('init page')
      this.initTab()
    },
    /**
     * 点击一级列表
     * @return {[String]}      返回二级列表下的第一项的id
     */
    async getIdOfUpdateTab (item) {
      this.toggleSelectItem(this.cates, item)
      try {
        return await this.updateSecondTabs(item.id)
      } catch(e) {
        console.warn(e.toString())
      }
    },
    resetState () {
      this.isFilter = false
      this.params = {}
      this.SET_LIST([])
    },
    toggleSelectItem (list, cur) {
      const selectItem = list.filter(item => item.checked)[0]
      this.$set(selectItem, 'checked', false)
      this.$set(cur, 'checked', true)
    },
    setFilterParams (params) {
      this.isFilter = false
      this.params = params
      this.SET_LIST([])
    }
  }
}