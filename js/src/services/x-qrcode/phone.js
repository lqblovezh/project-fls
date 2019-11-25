import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
let path = pathToRegexp.compile('/api/get_resource/:id');

export function get_resource({id}){
 return request_get(`/api/get_resource/${id}`)
}

export function get_resource_content({id}){
	return request_get(`/api/get_content/${id}`)
}
/**
 * 章节列表
 * @param {Object} data 
 * @param {String} data.book_id 图书id
 * @param {String} data.resource_info_id 资源详情id
 */
export function get_chapters(data){
	return request_get('/api/get_chapters',data)
}
/**
 * 获取详情
 * @param {Object} data
 * @param {String} data.id 
 */
export function get_content({id}){
	return request_get(`/api/get_content/${id}`)
}
/**
 * 参加投票
 * @param {Object} data
 * @param {String} data.app_id 应用id
 * @param {String} data.qrcode_product_id 二维码产品id
 * @param {String} data.answer 用户填写答案
 * @param {String} data.type vote(投票) questionnaire(问卷调查)question_and_a(问题)
 */
export function vote(data){
	return request_post('/api/home/vote',data)
}
/**
 * 参加投票
 * @param {Object} data
 * @param {String} data.app_id 应用id
 * @param {String} data.qrcode_product_id 二维码产品id
 * @param {Array} data.questionnaire_answer 用户填写答案
 * @param {String} data.questionnaire_answer_id 问答题目id
 * @param {String} data.answer 答案
 * @param {String} data.type vote(投票) questionnaire(问卷调查)question_and_a(问题)
 */
export function questionnaire(data){
	return request_post('/api/home/questionnaire',data)
}

/**
 * 参加抽奖
 * @param {Object} data
 * @param {String} data.id 抽奖应用id
 * @param {String} data.qrcode_product_id 二维码产品id
 * @param {String} data.phone 电话
 * @param {String} data.award_id 中奖Id
 */
export function lottery(data){
	return request_post('/api/home/lottery',data)
}

/**
 * 获取资源详情
 * @param {Object} data
 * @param {String} data.id 资源id
 */
export function get_home_resource(data){
	return request_get('/api/home/get_resource',data)
}

/**
 * 书圈列表
 */
export function circle_list(data={}){
	return request_get('/api/home/circle/list',data)
}
/**
 * 主题列表
 * @param {Object} data 
 * @param {String} data.cicle_id 主题列表
 */
export function circle_theme_list(data){
	return request_get('/api/home/circle/themet/list',data)
}
/**
 * 书圈主题详情
 * @param {Object} data
 * @param {String} data.theme_id 主题详情
 */
export function circle_theme_info(data){
	return request_get('/api/home/circle/theme_info',data)
}
/**
 * 添加书圈主题
 * @param {Object} data
 * @param {String} data.circle_id
 * @param {String} data.abs 描述
 * @param {Array} data.img
 */
export function circle_theme_add(data){
	return request_post('/api/home/circle/theme',data)
}
/**
 * 加入书圈
 * @param {Object} data 
 * @param {String} data.cicle_id 
 */
export function circle_join(data){
	return request_post('/api/home/circle/join',data)
}
/**
 * 书圈详情
 * @param {Object} data 
 * @param {String} data.cicle_id 主题详情
 */
export function circle_info(data){
	return request_get('/api/home/circle/info',data)
}
/**
 * 获取分类详情
 */
export function get_category({id}){
	return request_get(`/api/home/get_category/${id}`)
}
export function get_category_list(data){
	return request_get(`/api/home/get_category_list`,data)
}
/**
 * 获取应用详情
 * @param {Object} data
 * @param {String} data.id
 */
export function get_app_info(data){
	return request_get("/api/home/get_app_info",data)
}
/**
 * 我的优惠券
 */
export function my_coupons(){
	return request_get('/api/home/my_coupons')
}
/**
 * 订单列表
 * @param {Object} data
 * @param {String} data.pay_status 'already_paid','not_pay'
 */
export function order_list(data){
	return request_get('/api/order/user/list',data)
}
/**
 * 订单详情
 */
export function orderDetail({id}){
	return request_get(`/api/order/info/${id}`)
}
/**
 * 添加订单
 * @param {Object} data 
 * @param {String} data.pay_type 'alipay', 'wechat'
 * @param {String} data.goods 资源Id
 * @param {String} coupon 用户拥有的优惠券id 不是优惠券id
 * @param {String} rf_url 支付完成跳转地址
 */
export function createOrder(data){
	return request_post('/api/order/add',data)
}
/**
 * 订单支付
 * @param {Object} data
 * @param {String} data.order_id
 * @param {String} data.rf_url
 */
export function pay_money(data){
	return request_post('/api/order/pay',data)
}
/**
 * 删除订单
 * @param {Object} data
 * @param {String} data.order_id
 */
export function cancel(data){
	return request_post('/api/order/cancel',data)
}
/**
 * 用户资源列表
 */
export function resource_list(){
	return request_get('/api/resource/list')
}
/**
 * 书圈点赞
 */
export function circle_praise(data){
	return request_post('/api/home/circle/praise',data)
}
/**
 * 评论列表
 * @param {string} theme_id
 */
export function comment_list(data){
	return request_get('/api/home/circle/comment/list',data)
}
/**
 * 评论
 * @param {String} pid 当前评论的id传入
 * @param {String} content 
 * @param {String} circle_theme_id 
 */
export function comment(data){
	return request_post('/api/home/circle/comment',data)
}
/**
 * 记录停留时间
 * @param {Data} data
 * @param {String} data.scan_id
 * @param {String} data.duration
 */
export function duration(data){
	return request_post('/api/statistics/duration',data)
}

/**
 * 试卷列表
 * @param {Object} data
 * @param {String} data.product_id
 * @param {String} data.resource_id
 */
export function getResource(data){
	return request_get('/api/get_practice',data)
}
/**
 * 回答试卷
 * @param {Object} data
 * @param {String} data.product_id 产品id
 * @param {String} data.resource_id 资源id
 * @param {Array} data.answer
 * @param {String} data.answer[0].user_answer_id 修改时 返回的用户答题id
 * @param {String} data.answer[0].id 习题id
 * @param {String} data.answer[0].answer 答案
 */
export function answer_paper(data){
	return request_post('/api/home/answer_paper',data)
}
/**
 * 试卷再做一次
 */
export function reset_paper({id,...data}){
	return request_delete(`/api/home/reset_paper/${id}`,data)
}