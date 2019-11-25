<script>
import formSerialize from "form-serialize"
import Menu from "@/components/common/Menu"
import Top from "@/components/common/Top"

import * as managerServices from 'services/common/manager'
import {publicMixin} from '@/util/mixins'
import {addBackups, backupAndRestoreList, deleteBackupAndRestore, queryBackupRestore} from 'services/common/db'

export default {
  mixins: [publicMixin],
  data(){
    return{
      path: 'backupAndRestore',
      backupInfoList:[],
      queryInfoList:[]
    }
  },
  methods:{
    startBackup : async function () { //开始备份
      await addBackups()
      await this.getList()
    },
    getList: async function () {
      this.backupInfoList = (await backupAndRestoreList()).data
      console.log(this.backupInfoList);
    },
    deleteBackup(task_id) {   //删除备份
      this.$confirm("确认删除？").then(_ => {
        deleteBackupAndRestore({task_id}).then(res => {
          this.getList()
          this.$message.success('删除成功')
        })
      }).catch(_ => {});
    },
    queryBackupStatus(task_id){
      queryBackupRestore({task_id}).then(res=>{
        this.getList()
        this.queryInfoList=queryBackupRestore().data
      })
    }
  },
  components:{ Menu, Top}
}
</script>

<template lang="pug">
.indexs
  Top(currentPlant='X-PUBLISH')
  Menu(curr="/backupAndRestore")
  .mainRight
    .maindata
      .backup
        .backup_title
          .backup_title_line
          span 数据备份
        .backup_operate
          p 请确保你有足够的存储空间,并确保整个备份过程中系统运行的连续性，点击按钮开始备份
          input(type="button" value="开始备份" @click="startBackup()")
      .tableWrap
        table.table
          thead
            tr
              th 任务ID
              th 状态
              th 完成百分比
              th 任务状态说明
              th 操作
          tbody()
            tr(v-for="item in backupInfoList")
              td {{item.task_id}}
              td {{item.status}}
              td {{item.percent}}
              td {{item.messages}}
              td
                Icon(type="icon-delete" title="删除" plain size="mini" @click="deleteBackup([item.task_id])")
      .backup.restore
        .backup_title
          .backup_title_line
          span 备份还原
        .restore_search
        .backup_operate
          p 还原操作会覆盖现有数据，建议您当前数据先进行备份，整个还原操作过程需要3分钟，请确保系统运行的连续性，不然会造成数据丢失，点击按钮开始还原数据
          input(type="button" value="开始还原")
</template>

<style lang="stylus" scoped>
.mainRight
    background #ECECEC
    width 1703px
    height 1025px
    .maindata
      width 1603px
      height 975px
      padding-top 30px
      margin 0 auto
      background #ffffff
      .backup
        width 100%
        height 163px
        margin-left 18px
        .backup_title
          line-height 48px
          border-bottom 1px solid #ccc
          font-size 14px
          position relative
          .backup_title_line:before
            content ""
            position absolute
            width 3px
            height 20px
            left 0
            top 15px
            background #44c3aa
            z-index 10
          span
            font-size 18px
            color #333
            margin-left 10px
        .backup_operate
          height 114px
          p
            display block
            font-size 16px
            color #333
            padding-top 30px
            letter-spacing 2px
          input
            width 82px
            height 32px
            background #44c3aa
            line-height 32px
            text-align center
            font-size 16px
            color #ffffff
            border none
            border-radius 3px
            margin-top 20px
      .restore
        height 225px
        .restore_search
          margin-top 30px
          div
            width 500px
            height 32px
            .search
              width 430px
              height 30px
              background #ffffff
              border 1px solid #ECECEC
              float left
            .btn
              width 65px
              height 32px
              line-height 32px
              text-align center
              font-size 12px
              color #ffffff
              background #44c3aa
              float left
              border none

</style>
