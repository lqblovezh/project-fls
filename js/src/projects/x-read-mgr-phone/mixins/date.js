import dayjs from 'dayjs'


export default {
  created() {
    this.initTime() // 初始化时间一次
  },
  data() {
    return {
      timeDuring:2, // 默认两月
      time: {
        start_time:null,
        end_time:null,
      },
    }
  },
  computed: {
    searchParams() {
      
      if (this.navList[this.currIndex].num) {
        return {
          time: this.navList[this.currIndex].num,
        }
      }
      let {
        start_time,
        end_time
      } = this.time
      start_time = start_time + " 00:00:00"
      end_time = end_time + " 23:59:59"
      return { //如果不存在时间, 则启动自定义时间
        start_time,
        end_time,
      }
    },
  },
  methods: {
    initTime() {
      // 默认两个月
      this.time.start_time = dayjs().subtract(2 , 'months').format('YYYY-MM-DD')
      this.time.end_time = dayjs().format('YYYY-MM-DD')
    },
    openStartTime() {
      this.$openDatePick().then(res => {
        let day = dayjs(res)
        this.time.start_time = day.format("YYYY-MM-DD")
        if (!day.isBefore(dayjs(this.time.end_time))) { // 起始时间不在结束时间之前 , 那么修改结束时间为起始时间
          this.time.end_time = day.format("YYYY-MM-DD")
        }
      })
    },
    openEndTime() {
      // 限制开始时间和结束时间
      // 开始时间是starttime 结束时间是往后延迟2月或者当前时间, 谁靠前
      let startDate, endDate;
      startDate = new Date(this.time.start_time) // 不能在起始时间之前

      endDate = this.timeDuring ? dayjs(startDate).add(this.timeDuring, 'months') : dayjs() // 限制为当前时间
      if (!endDate.isBefore(dayjs())) { // 如果+2月后的时间不在当前时间之前, 则endDate设置为当前时间
        endDate = new Date()
      } else {
        endDate = new Date(endDate.format('YYYY-MM-DD'))
      }

      this.$openDatePick({
        startDate,
        endDate
      }).then(res => {
        this.time.end_time = dayjs(res).format("YYYY-MM-DD")
      })

    },
    timePickConfirm() {
      log(1)
      let start = dayjs(this.time.start_time);
      let end = dayjs(this.time.end_time);
      if(this.timeDuring){
        if (start.add(this.timeDuring, 'month').isBefore(end)) { // 起始时间+2 月, 不能超过结束时间
          this.$alert(`时间段必须在${this.timeDuring}个月内!`)
          return
        }
      }
      // end不能在start前面, 在start选择的时候就处理了, 这里可以不用再判断
      this.refresh()
    }
  },
  destroyed() {},
}
