/*
* 系统管理-菜单
* */
import {request_get} from 'services/common/request';
/**
 * 获取菜单权限
 * @return {Promise}
 */
export function menu() {
    return request_get(restUrl_publish+'/api/menus/access')
}
