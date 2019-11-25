import JyzBox from './comps/JyzBox'
import Footer from '@/components/common/footer'
import Head from '@/components/common/head'
import Scroll from '@/components/common/scorll'
import Nodata from '@/components/common/Nodata'
import IconZan from '@/components/common/icons/Zan'
import NormalItem from '@/components/common/normalItem'
import NormalThemeItem from '@/components/common/normalItem/theme'
import TemplateItem from '@/components/common/templateItem'
import ContentTitle from '@/components/home/index/contentTitle'
import ResultSection from '@/components/home/xknow/resultSection'
import ImgList from '@/components/home/index/imgList'
import LoginReg from '@/components/my/loginReg'
import Star from '@/components/common/star'

const comps = {
  JyzBox,
  Footer,
  Head,
  Scroll,
  Nodata,
  IconZan,
  NormalItem,
  NormalThemeItem,
  TemplateItem,
  ContentTitle,
  ResultSection,
  ImgList,
  LoginReg,
  Star,
}

export default function installComps(Vue) {
  for (const key in comps) {
    Vue.component(key, comps[key])
  }
}
