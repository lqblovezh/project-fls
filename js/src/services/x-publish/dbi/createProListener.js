import {
  origin,
  cb,
  getUserId,
  event_terminal,
  event_terminal_verison,
} from './locals';

/**
  *产品创建事件
  * @param {Object} data
  * @param {String} data.res_id  书籍序号
  * @param {String} data.res_type  书籍类型
  * @param {String} data.res_name  书籍名称
  * @param {String} data.res_cover   书籍封面
  * @param {String} data.res_covers  书籍封面图集
  * @param {String} data.res_exp  书籍简介
  * @param {String} data.res_author  作者名称——文字版
  * @param {String} data.res_author_id  作者序号集
  * @param {String} data.res_Interpreter 译者——文字版
  * @param {String} data.res_Interpreter_id 译者序号集
  * @param {String} data.res_lables  书籍标签集合
  * @param {String} data.res_currency 价格币种
  * @param {Double} data.res_money 销售价
  * @param {String} data.res_isbn  ISBN
  * @param {String} data.res_isbn_ext ISBN扩展码
  * @param {String} data.res_publication 出版日期
*/

export default function({
  res_id,
  res_type,
  res_name,
  res_cover,
  res_covers,
  res_exp,
  res_author,
  res_author_id,
  res_Interpreter,
  res_Interpreter_id,
  res_lables,
  res_money,
  res_isbn,
  res_isbn_ext,
  user_id='',
}) {
  if (!window.DBI) {
    return
  }

  user_id = user_id || getUserId()

  const evt=new DBI.createEvent({
    event_class:'PDAMBook',
    event_data:{
      Resources:[{
        res_id,
        res_type,
        res_name,
        res_cover,
        res_covers,
        res_exp,
        res_author,
        res_author_id,
        res_Interpreter,
        res_Interpreter_id,
        res_lables,
        res_money,
        res_isbn,
        res_isbn_ext,
      }]
    },
    event_target: res_id,
    event_type:'创建',
    event_source:'WEB',
    event_sources:origin,
    event_operator:user_id,
    event_temporary:'',
    event_system:'',
    event_system_verison:'',
    event_terminal,
    event_terminal_verison,
  })
  DBI.declare(evt,cb)
}
