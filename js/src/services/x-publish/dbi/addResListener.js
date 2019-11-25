import {
  origin,
  cb,
  getUserId,
  event_terminal,
  event_terminal_verison,
} from './locals';

/**
 * 资源添加事件
 * @param {Object} data
 * @param {String} data.res_id  资源ID
 * @param {String} data.res_type 资源类型，如：图片
 * @param {String} data.res_name  资源名称
 * @param {String} data.res_exp  资源简介
 * @param {String} data.res_author  作者名称
 * @param {Array} data.res_author_id  作者ID集合
 * @param {Array} data.res_tree  资源分类ID集合
 * @param {Array} data.res_lables  资源标签集合
 * @param {Array} data.res_attr  附加属性集合
 */
export default function ({
  res_id,
  res_type,
  res_name,
  res_exp,
  res_author = '佚名',
  res_author_id = [],
  res_tree = [],
  res_lables = [],
  res_attr = [],
  user_id = '',
}) {
  if (!window.DBI) {
    return
  }

  user_id = user_id || getUserId()

  const evt = new DBI.createEvent({
    event_class: 'Resources',
    event_data: {
      Resources: [{
        res_id,
        res_type,
        res_name,
        res_exp,
        res_author,
        res_author_id,
        res_tree,
        res_lables,
        res_attr,
        user_id,
        res_total_play: 0,
        res_total_order: 0,
      }]
    },
    event_target: '',
    event_type: '创建',
    event_source: 'WEB',
    event_sources: origin,
    event_operator: user_id,
    event_temporary: '',
    event_system: '',
    event_system_verison: '',
    event_terminal,
    event_terminal_verison,
  })

  DBI.declare(evt, cb)
}
