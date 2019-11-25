import {request_post,request_get,request_put,request_delete} from 'services/common/request';

/**
 * 开始入库
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.path - 上传后的转档文件路径(上传接口获取)
 */
export function startStorage(data = {}) {
    return request_post(restUrl_publish+'/api/xswitch/tasks',data).then(res => {
        if (res.status) {
            data.task_id = res.data.task_id;
            return request_post('/xswitch/datas',data);
        } else {
            throw new Error(res.messages);
        }
    }).catch(err => {
        throw new Error('任务ID获取失败');
    })
}

