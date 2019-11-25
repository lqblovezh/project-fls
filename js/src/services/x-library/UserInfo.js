import { decorate } from 'core-decorators';
import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import {cache} from '../common/utils'

class UserInfo{
	
  login(){
		return request_post('/common/api/auth/login/manager',{user_name:'admin',user_pass:123456})
	}
	
	@decorate(cache)
	getList(){
		return request_get('/common/api/user/users/user')
	}
}

export default new UserInfo()

