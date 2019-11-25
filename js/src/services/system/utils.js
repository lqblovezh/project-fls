import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

export function utils() {
  return request_get('/system/api/utils/mysql_sync_config')
}
