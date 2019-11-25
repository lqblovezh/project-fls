import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Index = (resolve) => require(['@/components/0-index/Index'],resolve)
const Login = (resolve) =>  require(['@/components/0-index/login'],resolve)
const Upload = (resolve) => require(['@/components/0-index/upload'], resolve)
const DigitalBook = (resolve) =>  require(['@/components/1-contentLibrary/digitalBook'],resolve)
const Article = (resolve) =>  require(['@/components/1-contentLibrary/article'],resolve)
const Editor = (resolve) =>  require(['@/components/1-contentLibrary/article/editor'],resolve)
const Imgs = (resolve) =>  require(['@/components/1-contentLibrary/imgs'],resolve)
const Voices = (resolve) =>  require(['@/components/1-contentLibrary/voices'],resolve)
const Videos = (resolve) =>  require(['@/components/1-contentLibrary/videos'],resolve)
const D3 = (resolve) =>  require(['@/components/1-contentLibrary/3D'],resolve)
const AR = (resolve) => require(['@/components/1-contentLibrary/AR'],resolve)
const VR = (resolve) => require(['@/components/1-contentLibrary/VR'],resolve)
const Panorama = (resolve) => require(['@/components/1-contentLibrary/panorama'],resolve)
const H5 = (resolve) =>  require(['@/components/1-contentLibrary/H5'],resolve)
const Erp = (resolve) =>  require(['@/components/1-contentLibrary/erp'],resolve)
const Transfer = (resolve) => require(['@/components/1-contentLibrary/transfer'],resolve)
const DebrisResource = (resolve) => require(['@/components/1-contentLibrary/debrisResource'],resolve)
const RecombResource = (resolve) => require(['@/components/1-contentLibrary/recombResource'],resolve)
const Question = (resolve) => require(['@/components/1-contentLibrary/question'],resolve)
const Database = (resolve) => require(['@/components/1-contentLibrary/database'],resolve)
const Fan = (resolve) => require(['@/components/2-businessManage/dataRelation/fan'],resolve)
const Yi = (resolve) => require(['@/components/2-businessManage/dataRelation/yi'],resolve)
const Bie = (resolve) => require(['@/components/2-businessManage/dataRelation/bie'],resolve)
const ThirdParty = (resolve) => require(['@/components/2-businessManage/thirdParty/index'],resolve)
const success = (resolve) => require(['@/components/2-businessManage/thirdParty/success'],resolve)
const error = (resolve) => require(['@/components/2-businessManage/thirdParty/error'],resolve)
const PublishCheck = (resolve) => require(['@/components/2-businessManage/publishCheck/index'],resolve)

const ThemeLibary = (resolve) => require(['@/components/3-digitalProductLibrary/theme'],resolve)
const Release = (resolve) => require(['@/components/3-digitalProductLibrary/release'],resolve)
const Book = (resolve) => require(['@/components/3-digitalProductLibrary/book'],resolve)
const PushArticle = (resolve) => require(['@/components/3-digitalProductLibrary/pushArticle'],resolve)
const Polymorph = (resolve) => require(['@/components/3-digitalProductLibrary/polymorph'],resolve)
const Media = (resolve) => require(['@/components/3-digitalProductLibrary/media'],resolve)
const Video = (resolve) => require(['@/components/3-digitalProductLibrary/video'],resolve)
const Audio = (resolve) => require(['@/components/3-digitalProductLibrary/audio'],resolve)
const Course = (resolve) => require(['@/components/3-digitalProductLibrary/course'],resolve)
const Resource = (resolve) => require(['@/components/3-digitalProductLibrary/resource'],resolve)
const PubCourse = (resolve) => require(['@/components/3-digitalProductLibrary/course/pubcourse'],resolve)
const PubResource = (resolve) => require(['@/components/3-digitalProductLibrary/resource/pubresource'],resolve)
const Series = (resolve) => require(['@/components/3-digitalProductLibrary/series'],resolve)
const Articles = (resolve) => require(['@/components/3-digitalProductLibrary/articles'],resolve)
const Qrcode = (resolve) => require(['@/components/3-digitalProductLibrary/qrcode'],resolve)
const QrcodeAudio = (resolve) => require(['@/components/3-digitalProductLibrary/qrcode/audio'],resolve)
const QrcodeVideo = (resolve) => require(['@/components/3-digitalProductLibrary/qrcode/video'],resolve)
const QrcodeArticle = (resolve) => require(['@/components/3-digitalProductLibrary/qrcode/article'],resolve)
const QrcodeBook = (resolve) => require(['@/components/3-digitalProductLibrary/qrcode/book'],resolve)
const QrcodePractice = (resolve) => require(['@/components/3-digitalProductLibrary/qrcode/practice'],resolve)

const Distributed = (resolve) => require(['@/components/4-myDistributed/index'],resolve)

const Manager = (resolve) => require(['@/components/5-system/jurisdiction/manager'],resolve)
const Journal = (resolve) => require(['@/components/5-system/jurisdiction/journal'],resolve)
const Role = (resolve) => require(['@/components/5-system/jurisdiction/role'],resolve)
const BackupAndRestore = (resolve) => require(['@/components/5-system/backupAndRestore/index'],resolve)
const XData = (resolve) => require(['@/components/common/XData'],resolve)

export default new Router({
  routes: [
    {path: '/', redirect: "/Index"},
    {path: '/index', component: Index},
    {path: '/upload', component: Upload},
    {path: '/login', component: Login},
    {path: '/contentLibrary/digitalBook', component: DigitalBook},
    {path: '/contentLibrary/article', component: Article},
    {path: '/contentLibrary/article/editor', component: Editor},
    {path: '/contentLibrary/imgs', component: Imgs},
    {path: '/contentLibrary/H5', component: H5},
    {path: '/contentLibrary/videos', component: Videos},
    {path: '/contentLibrary/erp', component: Erp},
    {path: '/contentLibrary/3D', component: D3},
    {path: '/contentLibrary/AR', component: AR},
    {path: '/contentLibrary/VR', component: VR},
    {path: '/contentLibrary/panorama', component: Panorama},
    {path: '/contentLibrary/Voices', component: Voices},
    {path: '/contentLibrary/Transfer', component: Transfer},
		{path: '/contentLibrary/debrisResource', component: DebrisResource},
		{path: '/contentLibrary/recombResource', component: RecombResource},
		{path: '/contentLibrary/database', component: Database},
		{path: '/contentLibrary/question', component: Question},

    {path: '/dataRelation', component: Fan},
    {path: '/dataRelation/fan', component: Fan},
    {path: '/dataRelation/yi', component: Yi},
    {path: '/dataRelation/bie', component: Bie},
    {path: '/thirdParty', component: ThirdParty},
    {path: '/thirdParty/error', component: error},
    {path: '/thirdParty/success', component: success},
    {path: '/publishCheck', component: PublishCheck},

    {path: '/digitalProductLibrary/themeLibary', component: ThemeLibary},
    {path: '/digitalProductLibrary/release', component: Release},
    {path: '/digitalProductLibrary/book', component: Book},
    {path: '/digitalProductLibrary/pushArticle', component: PushArticle},
    {path: '/digitalProductLibrary/polymorph', component: Polymorph},
    {path: '/digitalProductLibrary/media', component:Media},
    {path: '/digitalProductLibrary/video', component:Video},
    {path: '/digitalProductLibrary/audio', component:Audio},
    {path: '/digitalProductLibrary/course', component:Course},
    {path: '/digitalProductLibrary/resource', component:Resource},
    {path: '/digitalProductLibrary/pubCourse', component:PubCourse},
    {path: '/digitalProductLibrary/pubResource', component:PubResource},
		{path: '/digitalProductLibrary/series', component:Series},
		{path: '/digitalProductLibrary/articles', component:Articles},
		{path: '/digitalProductLibrary/qrcode', component:Qrcode},
		{path: '/digitalProductLibrary/qrcode/audio', component:QrcodeAudio},
		{path: '/digitalProductLibrary/qrcode/video', component:QrcodeVideo},
		{path: '/digitalProductLibrary/qrcode/article', component:QrcodeArticle},
		{path: '/digitalProductLibrary/qrcode/book', component:QrcodeBook},
		{path: '/digitalProductLibrary/qrcode/practice', component:QrcodePractice},

    {path: '/distributed', component: Distributed},
    {path: '/backupAndRestore',component:BackupAndRestore},

    {path: '/jurisdiction', component: Manager},
    {path: '/jurisdiction/manager', component: Manager},
    {path: '/jurisdiction/journal', component: Journal},
    {path: '/jurisdiction/role', component: Role},
    {path: '/XData', component: XData},
  ]
})
