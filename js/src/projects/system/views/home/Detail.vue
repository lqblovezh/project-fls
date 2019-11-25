<script>
import * as commonServices from 'services/x-publish/common'
import { getTask } from 'services/system/home'
import * as services from 'services/system/press'

export default {
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
        apps: [],
      },
      allowType: [],
      authority: {
        publish: '',
        read: '',
        data: '',
        teach: '',
      },
      localVis: false, // 实际上组件的显式与否, 取决于这个值, 而不是isVis
    }
  },
  methods: {
    addLicensePic() {},
    picChangeHandler(e) {
      const file = e.target.files[0]
      if (file) {
        let loading = this.$loading()
        getTask(file).then(res => {
          this.data.license = res.data.path
          this.$set(this.data, 'license_src', res.data.url)
          loading.close()
        })
      }
    },
    addApp() {
      services.getAllowedType({ id: this.data.id }).then(res => {
        this.allowType = res.data
      })
      this.data.apps.push({
        name: '',
        read_front_uri: '',
      })
    },
    delApp(index, item) {
      console.log(item)
      this.$confirm('是否删除?').then(res => {
        if (item.id) {
          services.delFlat(item).then(res => {
            this.data.apps.splice(index, 1)
          })
        } else {
          this.data.apps.splice(index, 1)
        }
      })
    },
    initAuthority() {
      if (this.data.type) {
        this.data.type.forEach(item => {
          this.authority[item] = true
        })
      }
    },
    authorize(key) {
      this.authority[key] = !this.authority[key]
      // 在提交的时候组织type属性
      return
    },
    save() {
      //this.resolveAuthority()
      // 错误处理已经在service实现弹出操作, 若非特殊的错误, 不进行进一步处理
      services.save(this.data).then(
        res => {
          if (res && res.status) {
            log(res.data)
            this.data = res.data
            this.$message.success('保存成功')
          } else {
            this.$message.error(err.message)
          }
          //this.$emit('save', true)
        },
        err => {
          this.$message.error(err.message)
        }
      )
    },
    addFlat(info) {
      let loading = this.$loading({
        text: '正在新增初始化...',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      info.publisher_id = this.data.id
      services.addFlat(info).then(
        res => {
          if (res && res.status) {
            this.$message.success('新增平台成功')
            loading.close()
          } else {
            this.$message.error(err.message)
            loading.close()
          }
        },
        err => {
          this.$message.error(err.message)
          loading.close()
        }
      )
    },
    handleClose() {
      this.$emit('save', true)
    },
  },
  watch: {
    isVis() {
      this.localVis = this.isVis
    },
  },
}
</script>

<template lang="pug">
  div()
    //- .sync 不能再向上传递  等价于v-on:update:title="doc.title = $event"
    //- 因此通过方法上传, 把本地localVis赋值给外部isVis
    el-dialog(
      :visible.sync="localVis"
      width="1200px"
      top="50px"
      :before-close="handleClose")
      .content(v-if="data")
        .base.fix
          .tname 基本信息
          .form-group
            label 出版社名称 
            input.form-control(v-model="data.name" placeholder="必填")
          .form-group
            label 出版社地址
            input.form-control(v-model="data.address")
          .form-group
            label 二级域名
            input.form-control(v-model="data.subdomain" v-if="data.id")
            input.form-control(v-model="data.subdomain" v-else )
          .form-group
            label 联系方式
            input.form-control(v-model="data.phone")
          .form-group
            label 联系邮箱
            input.form-control(v-model="data.email")
          .form-group
            label 联系人
            input.form-control(v-model="data.liaisons")
          .right
            span.pname 营业执照 :
            Btn(@click="$refs.picFile.click()") 选择文件
              input.hide(@change="picChangeHandler" type="file" ref="picFile" :accept="$config.imgAccept")
            br
            img(:src="data.license_thumb" )
          .bottom
            el-button(type="primary" @click="save" size="small") 保存
        .base.sys(v-show="data.id")
          .tname 系统信息
          span.sys-list-name 系统列表
          .xlist
            .item(v-for="(i, index) in data.apps" v-if="data.apps")
              .form-group
                label.url(:style="{'color':i.is_test?'#f56c6c':''}") 平台名称
                input.form-control(v-model="i.name")
              .form-group
                label.url 平台标识
                input.form-control(v-model="i.identifier")
              .form-group
                label.url 平台类型 
                el-select(v-model="i.type")
                  el-option(v-for="vo in allowType" :key="vo.key" :label="vo.value" :value="vo.key")
                el-button(type="primary"  @click="addFlat(i)") 保存
                el-button(type="danger"  @click="delApp(index , i)") 删除
              //span.icon.icon-delete()
          //.form-group
            label 系统账号
            input.form-control(v-model="data.manager_name")
          //.form-group
            label 系统密码
            input.form-control(v-model="data.manager_pass")
            label 默认123456
            Btn(@click="data.manager_pass = null") 重置
          .authority
            //.form-group
              label 权限系统
              .au-list
                .item(v-for="(flag, key) in authority")
                  .au-name {{'x-'+key}}
                  .au-name {{flag ? '已授权' : '未授权'}}
                  el-button(@click="authorize(key)"
                    plain type="primary"
                    size="small") {{flag ? '取消授权' : '授权'}}
          .bottom
            Btn(@click="addApp") 新增

</template>

<style lang="stylus" scoped>
.right
  transform translateX(-50%)
  margin-left 20%
  width 400px
  float right
  margin-top -278px
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
      display inline-block
      margin-right 20px
      label.url
        width 60px
      input
        width 180px
        margin-right 20px
.sys-list-name
  margin-top 15px
  display inline-block
</style>
