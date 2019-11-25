import Item1 from './Item1.vue'
import Item2 from './Item2.vue'
import Item3 from './Item3.vue'
import Item4 from './Item4.vue'
import Item5 from './Item5.vue'
import Item6 from './Item6.jyz.vue'
import Item7 from './Item7.jyz.vue'

import Detail1 from './Detail1'
import Detail2 from './Detail2'
import Detail3 from './Detail3'
//items4 用 用Detail1 模版
import Detail5 from './Detail5'
export const items = {
  Item1,
  Item2,
  Item3,
  Item4,
  Item5,
	Item6,
	Item7,
}

export const Details = {
  Detail1,
  Detail2,
  Detail3,
  Detail5,
}

export const itemsMixins = {
  methods: {
    itemClickHandler(item, from) {
      console.log(item)
			// debugger
      let type = 'Read'
      // return
      if (item.type == 2) {
        this.$go('/home/themeDetail', { id: item.b_id })
      }else if(from==6||from==7){
				this.$router.push({path:'/listJyz' , query:{id:item.id , name:item.name,tmp:item.tmp , type:1}})
      }else{
				this.$go('/bookDetail', { id: item.b_id, inType: type })
			}
    },
  },
}

// touchMove: e => {
//   // console.log(mySwiper.activeIndex)
//   // console.dir(e)
//   // console.dir(e.targetTouches[0].pageX)
//   // 当前active 的slide 减小
//   // 根据方向, 鼠标左滑,  next-slide 变大
//   // 右滑动, 上一个变大
//   if (!lastPageX) {
//     lastPageX = e.targetTouches[0].pageX
//     lastMoveX = 0
//     return
//   } else {
//     moveX = e.targetTouches[0].pageX - lastPageX
//     lastPageX = e.targetTouches[0].pageX
//     lastMoveX = moveX + lastMoveX
//     console.log('moveX  ' + moveX)
//     console.log('lastMoveX  ' + lastMoveX)
//     let scale = Math.abs(lastMoveX) / 200
//     let activeNode = document.querySelector('.swiper-slide-active .img')
//     let prevNode = document.querySelector('.swiper-slide-prev .img')
//     let nextNode = document.querySelector('.swiper-slide-next .img')
//     let startScale
//     if (lastMoveX < 0) {
//       if (!activeNode.style.transform) {
//         startScale = 1
//       } else {
//         // console.log('activeNode.style.transform'+activeNode.style.transform)
//         startScale = activeNode.style.transform.match(/[^\(\)]+(?=\))/g)[0] * 1
//       }
//       // console.log('startScale  xxxxxxxxxx ', startScale )
//       // console.log('moveXxxxxxxxxxxxxx   ', moveX / 200)
//       // console.log('startScale totakl  ', startScale + moveX / 200)
//       // activeNode.style.transform = `scale(${startScale + moveX / 200})`

//       // if (!activeNode.style.transform) {
//       //   startScale = 1
//       // } else {
//       //   startScale =
//       // }
//       // activeNode.style.transform = `scale(${scale})`
//     }
// }
// },
// touchEnd: e => {
//   lastPageX = 0
//   moveX = 0
//   lastMoveX = 0
// },
// progress: p => {
//   // 当mySwiper.progress 变化的时候触发, 数值是当前0 => 当前swiper的 值 之间变化
//   // p  0 => 1 变化, 最后一个slide 为1
//   // 似乎最开始还不能获得mySwiper
//   if (mySwiper) {
//     // console.log(mySwiper.slides[0].progress, 'xxxxxxxxxxxxxx')
//     // 在progress 中无法正确获得当前
//     setTimeout(() => {
//       // console.log(mySwiper.slides[mySwiper.activeIndex].progress)
//       console.log('progress', p)
//     }, 0)
//   }
// },
