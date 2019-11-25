<script>
import * as commonServices from 'services/x-publish/common'
import * as services from 'services/system/user'
import List from './list'
import { setTimeout } from 'timers'
export default {
  components: { List },
  props: ['isVis', 'detail'],
  created() {
    this.localVis = this.isVis // 更新组件的localVis
    if (this.detail) {
      this.data = this.detail
    }
    // 需要在data init后
    this.initAuthority()
  },
  data() {
    return {
      data: {
        type: [], // 需要保持初次结构
        accessed_publishers: [],
      },
      authority: {
        publish: '',
        read: '',
        data: '',
        teach: '',
      },
      localVis: false, // 实际上组件的显式与否, 取决于这个值, 而不是isVis,
      isShow: false,
      show: false,
    }
  },
  methods: {
    addLicensePic() {},
    addApp() {
      this.isShow = true
    },
    delApp(index, item) {
      if (this.detail) {
        this.$confirm('是否删除?').then(res => {
          services
            .revoke({ manager_id: this.detail.manager_id, app_id: item.id })
            .then(
              _ => {
                this.$emit('refurbish')
              },
              err => {
                this.data.accessed_publishers.splice(index, 1)
              }
            )
        })
        this.data = this.detail
      } else {
        this.data.accessed_publishers.splice(index, 1)
      }
    },
    initAuthority() {
      // this.data.type.forEach(item => {
      //   this.authority[item] = true
      // })
    },
    authorize(key) {
      this.authority[key] = !this.authority[key]
      // 在提交的时候组织type属性
      return
    },
    save() {
      services.save(this.data).then(
        res => {
          if (this.data.accessed_publishers) {
            this.data.accessed_publishers.forEach(el => {
              let d = {
                manager_id: res.data.id,
                app_id: el.id,
              }
              el.isChecked ? services.authorize(d) : null
            })
          }
          setTimeout(_ => {
            this.$emit('save', true)
          }, 100)
        },
        ({ payload }) => {
          if (payload) {
            for (let key in payload.errors) {
              this.$message.error(payload.errors[key])
              break
            }
          }
          // this.$message.error(err.message)
        }
      )
    },
    interim(data) {
      let ids = []
      this.data.accessed_publishers.forEach(e => {
        ids.push(e.id)
      })
      data.forEach(el => {
        if (!ids.includes(el.id)) {
          this.data.accessed_publishers.push(el)
        }
      })
    },
  },
  watch: {
    isVis() {
      this.localVis = this.isVis
    },
    detail() {
      this.data = this.detail
    },
  },
}
</script>

<template lang="pug">
  div() 
    //- .sync 不能再向上传递  等价于v-on:update:title="doc.title = $event"
    //- 因此通过方法上传, 把本地localVis赋值给外部isVis
    List(:isShow.sync="isShow" :detail = "data" @refurbish="$emit('refurbish')" @updata="interim" @isOpen="isShow=false")
    el-dialog(
      :visible.sync="localVis"
      width="1200px"
      @closed="$emit('update:isVis',localVis)")
      .content(v-if="data") 
        .base.fix
          .tname 基本信息 
          .form-group 
            label 账户
            input.form-control(v-model="data.name" placeholder ="必填") 
          .form-group 
            label 联系人
            input.form-control(v-model="data.nick_name")  
          .form-group 
            label 联系方式
            input.form-control(v-model="data.phone")   
          .form-group 
            label 联系邮箱
            input.form-control(v-model="data.email")    
          //.right 
            span.pname 营业执照 :
            Btn(@click="$refs.picFile.click()") 选择文件
              input.hide(@change="picChangeHandler" type="file" ref="picFile" :accept="$config.imgAccept")
            br
            img(:src="data.license_src" )
        .base.sys 
          .tname 拥有出版社
          span.sys-list-name 出版社列表  
          .xlist
            .item(v-for="(i, index) in data.accessed_publishers" v-if="data.accessed_publishers")  
              .form-group 
                label 出版社名称
                input.form-control(v-model="i.name" readonly="readonly")         
              //.form-group 
                label.url x-read前端地址
                input.form-control(v-model="i.read_front_uri")    
              span.icon.icon-delete(@click="delApp(index , i)")
            .fix 
              .add-btn
                Btn(@click="addApp") 新增  
        .bottom 
          el-button(type="primary" @click="save") 保存        

</template>

<style lang="stylus" scoped>
.right
  transform translateX(-50%)
  margin-left 20%
  width 400px
  float right
  margin-top -188px
  >img
    max-width 400px
    margin-top 15px
.content
  input
    width 250px
.authority
  .au-list
    height 35px
    line-height 35px
    display inline-block
    .item
      display inline-block
      margin-right 25px
      .au-name
        display inline-block
        margin-right 10px
.tname
  font-size 16px
  padding 15px 0
  border-bottom 1px solid #e3e6ec
.sys
  margin-top 20px
.bottom
  margin 25px
  padding-bottom 25px
  text-align center
.xlist
  .add-btn
    margin-top 10px
    margin-left 96px
  .item
    vertical-align middle
    .icon-delete
      transform translateY(25px)
    .form-group
      label.url
        width 120px
      display inline-block
      margin-right 20px
      input
        width 300px
.sys-list-name
  margin-top 15px
  display inline-block
</style>
