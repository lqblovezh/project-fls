<script>
import GliMenu from 'projects/common/menu'
import GliMenuTop from 'projects/common/menu/Menu'
import GliMenuItem from 'projects/common/menu/MenuItem'
import urljoin from 'url-join'
import {menu} from 'services/common/menu'
import { platInfo} from 'services/x-publish/common'
import { addFavicon } from 'projects/common/util'
import parse from 'url-parse'

export default {
  components: { GliMenu, GliMenuTop, GliMenuItem },
  created() {
		menu().then(res=>{
			this.showMenu = res.data
			this.$store.state.mune = res.data
			for(let item of this.list){
				for(let vo of item.items){
          if(res.data[vo.name]){
            vo.status = res.data[vo.name].status
            if(vo.status){
              this.$router.push({path:res.data[vo.name].index})
              item.status = true
					  }
          }
				}
      }
      let rout_key = this.$route.path
      if ('/' != baseUrl) {
        rout_key = rout_key.replace(baseUrl, '')
      }
      if (!this.showMenu[rout_key]['status']) {
				if (
					this.$config.plantInfo.publisher &&
          this.$config.plantInfo.publisher.apps &&
          this.$config.plantInfo.publisher.apps[0]
        ) {
          this.$store.state.url =
            this.$config.plantInfo.publisher.apps[0]['base_url'] + '/admin'
          this.$router.push({ path: (baseUrl=='/common/admin'?baseUrl:'')+'/app/error'})
        } else {
          history.back()
        }
      }
		})
	},
  data() {
    return {
			showMenu:{},
      list: [
        /*{
        txt: '首页',
        items: [
          {
            iconClass: 'icon-menu-home',
            txt: '出版社列表',
            index: urljoin(baseUrl, '/app/home')
          },
        ]
      },*/
       {
				txt: '系统设置',
				status:false,
        items: [
          { iconClass: 'icon-2', txt: '系统配置', index: urljoin(baseUrl, '/app/systemSetting'),name:'/app/systemSetting',status:true },
          { iconClass: 'icon-1', txt: '应用配置', index: urljoin(baseUrl, '/app/application'),name:'/app/systemManage/application',status:true},
          ]},
        {
				txt: '用户管理',
				status:false,
        items: [
					{ iconClass: 'icon-4', txt: '会员列表', index: urljoin(baseUrl, '/app/memberlist'),name:'/app/systemManage/manager',status:true },
					{ iconClass: 'icon-1', txt: '管理员管理', index: urljoin(baseUrl, '/app/systemManage/manager'),name:'/app/systemManage/manager',status:true},
          ]},
      ],
      isCollapse: false,
    }
  },
  methods: {
    menuItemClickHandler() { },
    menuFoldHandler(fold) {
      this.$emit('collspan', !fold)
		}
	},
	watch:{
		$route(to,from){
			let obj = this.showMenu[to.path.replace(baseUrl,'')]
			if(obj && !obj.status){
				this.$confirm('你没有权限访问此页面?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           history.back()
        }).catch(() => {
          history.back()        
        });
			}
  	}
	}
}
</script>
<template>
  <div>
    <GliMenu @itemClickHandler="menuItemClickHandler"
      @foldHandler="menuFoldHandler"
      :menuRecreate="false"
      topPx="50px"
      :keepOneOpen="true"
      :default-active="$route.path"
      :router="true"
      :collapse="isCollapse"
      background-color="#333744"
      text-color="#fff"
      active-text-color="#44c3aa">

      <GliMenuTop v-for="top in list"
        v-show="top.status"
        :txt="top.txt"
        :key="top.txt">
        <GliMenuItem v-for="item in top.items"
          v-show="item.status"
          :iconClass="item.iconClass"
          :txt="item.txt"
          :index="item.index"
          :key="item.index">

        </GliMenuItem>

      </GliMenuTop>

    </GliMenu>
  </div>
</template>


<style lang="stylus" scoped>
</style>
