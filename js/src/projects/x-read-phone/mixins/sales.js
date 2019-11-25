import * as saleServices from 'services/x-read/mySale'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as dbiServices from 'services/x-read/dbi'
import { noLoginToast } from '@/utils/util'
export default {
  data() {
    return {
      // ...
    }
  },
  computed: {
    currObj() {
      //      data.type 类型(1 听读   2 视读  3 电子书　6 主题  7资源)
      // * @param {Number} data.pay_type 支付方式1正常支付,2支付宝,3微信,4...
      let temp = {}
      switch (this.query.type) {
        case 'Video':
          temp = {
            stype: 2,
            ownNumber: 0, // 已拥有的数量
            mediaPrice: this.infoData.video_price,
          }
          break
        case 'Read':
          temp = {
            stype: 3,
            mediaPrice: this.infoData.books_price,
          }
          break
        case 'Audio':
          temp = {
            stype: 1,
            mediaPrice: this.infoData.audio_price,
          }
          break
        case 'Assets':
          temp = {
            stype: 7,
            mediaPrice: this.infoData.picture_price,
          }
          break
        default:
          temp = {}
          break
      }
      let isAllBuyOrFree = temp.mediaPrice * 1 == 0 || this.data.is_all_buy
      return { ...temp, isAllBuyOrFree: this.data.is_all_buy, isAllBuyOrFree }
    },
  },
  methods: {
    getInfo() {
      return bookinfoServices.info(this.query)
    },
    goPay({ content = [], pay_type = 2, ...other } = {}) {
      if (typeof this.like === 'function') {
        this.like()
      }
      const query = {
        goods_id: this.query.id,
        content,
        type: this.currObj.stype,
        pay_type: this.payType.type,
        rf_url: location.href,
        distributor: this.infoData.distributor,
      }
      // console.log(query)
      // return
      saleServices
        .order(query)
        .then(res => {
          location.href = res.data.url
          let data = res.data
          this.declare(res)
        })
        .catch(({ message }) => {
          this.$Toast({ message })
        })
    },
    declare(res) {
      let eventOpts = null
      let addData = null
      let cb = msg => {}
      let data = res.data
      let userId = ''
      try {
        userId = JSON.parse(sessionStorage.userInfo).id
      } catch (error) {}
      eventOpts = {
        event_class: 'Order',
        event_type: '创建',
        event_source: 'WEB', //默认为WEB
        event_operator: data.user_id,
      }
      addData = {
        data: [
          {
            'order_user_id ': data.user_id,
            'order_id ': data.id,
            'order_status ': '创建',
            'order_object_id ': this.query.id,
            'order_object_type ': '产品',
            order_object_name: this.infoData.books_info.name,
            create_time: data.create_time,
          },
        ],
      }
      dbiServices.declare(eventOpts, addData, cb)
    },
  },
}
