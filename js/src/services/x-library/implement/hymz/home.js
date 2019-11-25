import { mockSuccess } from '../utils'
import { mock, Random } from 'mockjs'

/**
 * 获取首页信息
 */
export async function getHomeInfo() {
  return mockSuccess(
    mock({
      'Knowledge_points|1-10': [
        {
          id: '@guid',
          keyword: '@csentence(3, 5)',
        },
      ],
      'theme|1-10': [
        {
          id: '@guid',
          img: '@image("300x150",@color())',
          title: '@csentence(3, 5)',
          abs: '@cparagraph(5)',
        },
      ],
      'hote|1-10': [
        {
          id: '@guid',
          img: '@image("160x210",@color())',
          title: '@csentence(3, 5)',
          author: '@cname',
        },
      ],
    })
  )
}
