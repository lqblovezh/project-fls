import {UserInfo} from 'services/x-library/index'
import config from 'services/config'


describe('UserInfo',()=>{
	it('#login',async () => {
		 await UserInfo.login().then(res=>{
			 config.token = res.data.token
		 })
	})
})

describe('UserInfo',()=>{
	it('#getList',async () => {
		 await UserInfo.getList()
	})
})
describe('UserInfo',()=>{
	it('#getList',async () => {
		 await UserInfo.getList()
	})
})
describe('UserInfo',()=>{
	it('#getList',async () => {
		 await UserInfo.getList({age:20})
	})
})
describe('UserInfo',()=>{
	it('#getList',async () => {
		 await UserInfo.getList({ age: 21 })
	})
})


