/*!
 * {
 *   "buildtime": "2019-06-17 15:13:29",
 *   "workspace": "F:\\project\\x-book4\\js",
 *   "username": "Administrator",
 *   "hostname": "PC201608171616",
 *   "platform": "win32",
 *   "git": {
 *     "branch": "master",
 *     "hash": "ecb058dd8",
 *     "message": [
 *       "commit ecb058dd8be16255580b36968fc3831fa41d5989",
 *       "Author: YangZai <552396385@qq.com>",
 *       "Date:   Mon Jun 17 15:12:32 2019 +0800",
 *       "    'xxxxx'"
 *     ],
 *     "user": "YangZai",
 *     "email": "552396385@qq.com",
 *     "remote": [
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (fetch)",
 *       "origin http://gitlab.kf.gli.cn/xcloud/x-book4.git (push)"
 *     ]
 *   }
 * }
 */
(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1011:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"page-course-step"},[a("div",{staticClass:"teacher"},[a("TeacherCard",{attrs:{imgUrl:t.detail.teach_user.picture_absolute,name:t.detail.teach_user.nick_name,education:t.detail.teach_user.education,title:"",job:t.detail.teach_user.duties,abstract:t.detail.teach_user.summary,email:t.detail.teach_user.email}})],1),a("div",{staticClass:"course"},[a("div",{staticClass:"name c_3 f18"},[t._v("相关课程 ")]),a("div",{staticClass:"normal_ls_item_4"},t._l(t.list,function(e){return a("div",{key:e.id,staticClass:"item",on:{click:function(a){return t.go(e)}}},[a("CourseCard",{attrs:{name:e.course_name,des:e.des,tag:"",teacher:!1,num:!1,price:e.price||"免费",imgUrl:e.img}})],1)}),0)]),a("div",{staticClass:"page"},[a("PageMy",{attrs:{total:t.page.total,pageOffset:t.page.pageOffset,pageNum:t.page.pageNum},on:{currentChange:t.pageChangeHandler}})],1)])},n=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return n})},1044:function(t,e,a){"use strict";var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"comp-user-teacher-card"},[a("div",{staticClass:"wrap fix"},[a("div",{staticClass:"img c_e0_bg fl"},[a("img",{staticClass:"vm",attrs:{src:t.imgUrl}})]),a("div",{staticClass:"msg"},[a("div",{staticClass:"name c_theme f18"},[t._v(t._s(t.name))]),a("div",{staticClass:"p"},[a("span",[t._v("学历：")]),a("span",[t._v(t._s(t.education)+"  ")])]),a("div",{staticClass:"p"},[a("span",[t._v("职称：")]),a("span",[t._v(t._s(t.title)+"  ")])]),a("div",{staticClass:"p"},[a("span",[t._v("职务：")]),a("span",[t._v(t._s(t.job)+"  ")])]),a("div",{staticClass:"p"},[a("span",[t._v("简介：")]),a("span",[t._v(t._s(t.abstract)+"  ")])]),a("div",{staticClass:"p"},[a("span",[t._v("邮箱：")]),a("span",[t._v(t._s(t.email)+"  ")])])])])])},n=[];a.d(e,"a",function(){return s}),a.d(e,"b",function(){return n})},426:function(t,e,a){"use strict";a.r(e);var s=a(1011),n=a(614);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a(945);var r=a(0),u=Object(r.a)(n.default,s.a,s.b,!1,null,null,null);e.default=u.exports},614:function(t,e,a){"use strict";a.r(e);var s=a(615),n=a.n(s);for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);e.default=n.a},615:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s,n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(t[s]=a[s])}return t},i=a(943),r=(s=i)&&s.__esModule?s:{default:s},u=a(22);e.default={components:{TeacherCard:r.default},computed:n({},(0,u.mapState)({detail:function(t){return t.course.courseDetail}})),mounted:function(){this.getList()},data:function(){return{list:[],page:{pageNum:1,pageOffset:12,total:1}}},methods:{go:function(t){this.$go("/course/detail",{id:t.id})},getList:function(){var t=this;return this.$service.teacher.getCourseByTid(n({id:this.detail.teach_user.id},this.page)).then(function(e){t.list=e.data,e.page.total=e.page.total,e.page.pageNum=e.page.num})},pageChangeHandler:function(t){this.page.pageNum=t,this.getList()}}}},616:function(t,e,a){"use strict";a.r(e);var s=a(617),n=a.n(s);for(var i in s)"default"!==i&&function(t){a.d(e,t,function(){return s[t]})}(i);e.default=n.a},617:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{imgUrl:{default:""},title:{default:""},name:{default:""},job:{default:""},education:{default:""},abstract:{default:""},email:{default:""}}}},618:function(t,e,a){},619:function(t,e,a){},943:function(t,e,a){"use strict";a.r(e);var s=a(1044),n=a(616);for(var i in n)"default"!==i&&function(t){a.d(e,t,function(){return n[t]})}(i);a(944);var r=a(0),u=Object(r.a)(n.default,s.a,s.b,!1,null,null,null);e.default=u.exports},944:function(t,e,a){"use strict";var s=a(618);a.n(s).a},945:function(t,e,a){"use strict";var s=a(619);a.n(s).a}}]);