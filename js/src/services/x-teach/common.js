import * as request from '../common/request'
import { teacherList as listTeacher } from 'services/x-teach/setting'
import { getList as listCourse } from 'services/x-teach/course'
import { getList as listPodBook } from 'services/x-teach/intearal/books'
import { getList as listResources } from 'services/x-teach/intearal/resources'

export function getList(data = {}) {
  return request.request_get('/api/home/book_circles', data)
}

/**
 * 图书库详情添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type - 1->阅读 2->文章 3->图片 4->音频 5->视频 6->3D内容 7->VR 8->AR  22-> 资源中的关联数据 19 -> 课程中的计划资源 9 —> 碎片资源 20->套系产品
 * @param {String} data.name
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getSourcesList({ type, ...data } = (data = {})) {
  log(type, data)
  switch (type) {
    case 'course':
    case 'class_course':
      return listCourse({ status: 1, ...data })
      break
    case 'teacher':
      return listTeacher(data)
      break
    case 'pod_book':
      return listPodBook({ status: 1, ...data })
      break
    case 'resources':
      return listResources({ status: 1, ...data })
      break
    default:
      return listCourse(data)
      break
  }
}
