<script>
import * as readerService from "services/common/reader"
import { addAnchor } from "services/x-publish/nowledges"

export default {
  props: {
    readerDialog: {//模态框状态
      type: Boolean,
      default: false
    },
    title: { //模态框标题
      type: String,
      default: "阅读器"
    },
    readerId: {//书籍id
      type: String,
      default: ""
    },
    currId: {//知识点id
      type: String,
      default: ""
    },
    version: { //后台版本
      type: String,
      default: "production"
    },
    markBtn: { //锚点功能
      type: String,
      default: '',
    },
    detailData: Object,
  },
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      var reader = new reader3.Desktop({
        // imagePath: "http://xcloud.kf.gli.cn/pc/", // 内网
        markBtnText: this.markBtn,
        copyEnabled: false,
        services: {
          ...readerService,
          do_mark: this.do_mark,
        },
        labelEnabled: false,
        bookmarkEnabled: false,
        readModeList: [
          { title: '无', pageLayout: 'normal', textLayout: 'lr/static'},
          { title: '分页', pageLayout: 'normal', textLayout: 'lr/auto'},
          // { title: '对页', pageLayout: 'folio'},
        ],
        // searchEnabled: true,
      });
      reader.extraParams = {
        version: this.version,
        content_version: this.version,
        access_code: this.access_code,
      }
      reader.mount(document.getElementById("readerIframe"), {
        bookId: this.readerId
      });
    });
  },
  methods: {
    colse() {
      this.$emit("update:readerDialog", false);
    },
    do_mark({
      // 阅读器选择之后的回调
      bookId,
      rangeJSON,
      selectedText,
      chapterRid,
      chapterName = ""
    }) {
      addAnchor({
        //添加锚点
        name: [chapterName],
        range: rangeJSON,
        point: selectedText,
        n_id: this.currId,
        b_id: [chapterRid],
        c_id: [bookId],
        type: "内容锚点",
        pid: this.detailData.id,
        ptype: this.detailData.type_number
      }).then(res => {
        this.$emit('addAnchorSuccess')
      }).catch(({payload}) => {
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
  }
};
</script>

<template lang="pug">
  div
    el-dialog.restBody(
      :center="false"
      :visible="readerDialog"
      top="50px"
      width="1000px"
      :show-close="false"
      append-to-body
      )
      .header(slot="title")
        <i class="el-icon-close" @click="colse"></i>
        el-tabs(value="reader")
          el-tab-pane(:label="title" name="reader")
      .content(ref="readerIframe")
        #readerIframe
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="colse" type="info" ) 关闭
</template>


<style lang="stylus" scoped>
.btns {
  text-align: right;
}

.el-icon-close {
  position: absolute;
  cursor: pointer;
  float: right;
  display: block;
  width: 20px;
  height: 20px;
  right: 20px;
  z-index: 2;
}

.content
  #readerIframe
    height 70vh
  iframe
    width: 100%;
</style>
