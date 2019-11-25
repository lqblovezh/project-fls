import {
  request_post,
  request_get,
  request_put,
  request_delete,
  request_file
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'
import {getTask} from "services/common";
/**
 * 获取默认音频信息
 * @param {Object} data
 */
export function getDefaultInfo(data = {}) {
  return request_get('/api/audio_product/default_audio', data)
}

/**
 * 新建默认音频
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.preview
 * @param {String} data.img
 */
export async function resetDefaultAudio([
  mediaFile,
  coverFile,
], [
  preview,
  img,
]) {
	if (mediaFile) {
		preview = (await getTask(mediaFile, {
			is_chunk: true,
			size: 1024 * 1024
	  })).data.path
	}
	if(coverFile){
		img=(await getTask(coverFile, {
			is_chunk: true,
			size: 1024 * 1024
	  })).data.path
	}
  // console.log(preview);
  // console.log(img);
  return request_post('/api/audio_product', {
    preview,
    img,
  })
}
