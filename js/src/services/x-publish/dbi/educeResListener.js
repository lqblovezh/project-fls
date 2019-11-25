import {
  origin,
  cb,
  getUserId,
  event_terminal,
  event_terminal_verison,
} from './locals';

/**
* 资源导出事件
* @param {object} data
* @param {object} data.res_url //资源导出地址
*/

export default function({
  res_url,
  user_id='',
}){
	if (!window.DBI) {
		return
  }
  user_id = user_id || getUserId()
	DBI.declare({
	event_class:'Resources',
	event_data:{
		Resources:[{
			res_url,
		}]
	},
	event_target:'',
	event_type:'导出',
	event_source:'Web',
	event_sources:origin,
	event_operator:user_id,
	event_temporary:'',
	event_system:'',
	event_system_version:'',
	event_terminal,
	event_terminal_verison,
},cb)

}

