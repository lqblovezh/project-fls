export const mediaMixin = {
  props: ['list', 'data', 'totalPrice', 'checkedItems', 'checkedItemsObj', 'currObj'],
  methods: {
    isBuyOrFree(item) {
      return item.isBuy || item.price * 1 == 0
    },
  },
}
