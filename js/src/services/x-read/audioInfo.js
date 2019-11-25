import {request_post,request_get,request_put,request_delete} from 'services/common/request'

/**
 * 获取播放列表
 * @return {Promise}
 */
export function getAudioList() {
	return request_get('/api/audio_product/play')
}

/**
 * 添加音频播放列表
 * @return {Promise}
 * @param {Object} data
 */
 export function addAudioList(data = {}) {
	 return request_post('/api/audio_product/play', {data})
 }
