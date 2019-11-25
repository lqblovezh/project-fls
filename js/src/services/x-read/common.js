import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import {getList as bookList} from './mediaBook'
import {getList as themeList} from './mediaTheme'
import {getList as audioList} from './audio'
import {getList as videoList} from './video'
import {getList as courseList} from './mediaPPT'

/**
 * 视读版本设置
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {Number} data.type (3课件 6听读 5视读 2 主题 4 电子书)
 */
export function setVersion(data){
    return request_put("/api/course_ware/set_versions",data)
}

/**
 * 获取已上架产品列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type (book->图书 theme->主题 audio->听读 video->视读 course->课件)
 */
export function getMainList ({type,...data}) {
    switch (type) {
        case 'book':
            return bookList(data)
            break;
        case 'theme':
            return themeList(data)
            break;
        case 'audio':
            return audioList(data)
            break;
        case 'video':
            return videoList(data)
            break;
        case 'course':
        default:
            return courseList(data)
            break;
    }
}