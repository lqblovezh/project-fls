import {
  origin,
  cb,
  getUserId,
  event_terminal,
  event_terminal_verison,
} from './locals';
/**
 * 用户注册事件
 * @param {object} data
 * @param {string} data.user_id   用户ID
 * @param {string} data.user_nick_name  用户昵称
 * @param {string} data.user_phone  用户手机号
 * @param {string} data.user_name  用户名(登录名)
 * @param {string} data.user_picture  用户头像（path）
 * @param {string} data.user_picture_absolute  用户头像（url）
 * @param {string} data.user_sex   用户性别
 * @param {email} data.user_email  用户邮件地址
 * @param {string} data.user_date_of_birth  出生日期
 * @param {string} data.user_address  用户详细地址
 * @param {string} data.user_city    用户所在城市
*/
export default function({
	user_id,
	user_name,
	user_nick_name,
	user_phone,	
	user_picture,
	user_picture_absolute,
	user_email,
	user_sex,
	user_date_of_birth,
	user_address,
}){
	if (!window.DBI) {
		return
	}
	user_id=user_id||getUserId()

	const evt=new DBI.createEvent({
		event_class:'user',
		event_data:{
			User:[{
				user_id,
				user_nick_name,
				user_name,
				user_sex,
				user_email,
				user_phone,
				user_picture,
				user_picture_absolute,
				user_address,
				user_city,
				user_date_of_birth,
			}]
		},
		event_target:'',
		event_type:'注册',
		event_source:'WEB',
		event_sources:origin,
		event_operator:user_id,      
		event_temporary:'',
		event_system:'',
		event_system_version:'',
		event_terminal,
		event_terminal_version,
	})
	DBI.declare(event,cb);
}

