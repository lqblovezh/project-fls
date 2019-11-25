<script>
import formSerialize from 'form-serialize'
import { main } from "@/util/mixins"
import * as services from 'services/x-read/mediaBook'

export default {
  // mixins: [main],
  props:['pustSetDialog','putData'],
  data() {
    return {
      services,
      currentPut: null, // 上架信息
      radio2: '2',
      radio: '1',
      currType: '1',
      currIndex: 'books',
      putDetailData: {}, //上架数据
      twoList: {
        value: '',
        list: [],
      },
      oneList: {
        value: '',
        list: [],
      },
      threeList: {
        value: '',
        list: [],
      },
    };
  },
  created () {
    log(this.putData)
    this.setDate()
  },
  methods: {
    setDate() {
      //上架设置详情
        let data = this.putData.prices
        for(let key in data){
          if(data[key]&&data[key].chapters&&data[key].chapters.length>0){
            this.currIndex = key
            switch (key) {
              case 'books':
                this.currType = '1'
                break;
              case 'pictures':
                this.currType = '2'
                break;
              case 'audios':
                this.currType = '3'
                break;
              case 'videos':
                this.currType = '4'
                break;
              case 'resources':
                this.currType = '5'
                break;
              default:
                this.currType = '1'
                break;
            }
            break
          }
        }
        this.currentPut = this.putData
        this.putDetailData.books_free_ids = this.getFreeids(data.books)//阅读免费章节id
        this.putDetailData.pictures_free_ids = this.getFreeids(data.pictures)//图片免费章节id
        this.putDetailData.audios_free_ids = this.getFreeids(data.audios)//音频免费章节id
        this.putDetailData.videos_free_ids = this.getFreeids(data.videos)//视频免费章节id
        this.putDetailData.resources_free_ids = this.getFreeids(data.resources)//资源免费章节id
        this.putDetailData.books_all_price = data.books&&data.books.price||''//阅读总价格
        this.putDetailData.picture_all_price = data.pictures&&data.pictures.price||''//图片总价格
        this.putDetailData.audio_all_price = data.audios&&data.audios.price||''//音频总价格
        this.putDetailData.video_all_price = data.videos&&data.videos.price||''//视频总价格
        this.putDetailData.resources_all_price = data.resources&&data.resources.price||''//资源总价格
        this.radio2 = this.putData.prices.books&&this.putData.prices.books.price_type?this.putData.prices.books.price_type.toString():1
        this.putDetailData.put_audio = this.putData.put_audio//是否上架到听读(不传默认为0)
        this.putDetailData.put_video = this.putData.put_video//是否上架的视读(不传默认为0)
        this.oneList.list = this.putData.book_store.cate_list//书城一级列表
        this.oneList.value = this.getValue(this.oneList.list)
        this.twoList.list = this.getTwoList(this.putData.book_store.cate_list) //二级列表
        this.twoList.value = this.getValue(this.twoList.list)
        this.threeList.list = this.putData.book_store.head_book //二级列表
        this.threeList.value = this.getValue(this.threeList.list)
    },
    getValue(data) {
      let find = data.find(item => item.is_select)
      if(find){
        return find.id
      }
      return null
    },
    getFreeids(data){
      let array = []
      if(!data||!data.chapters){
        return []
      }
      let datas = data.chapters
      for(let list of datas){
        if(list.price==0){
          array.push(list.id)
        }
      }
      return array
    },
    getTwoList(data) {
      let array = []
      if(!data){
        return []
      }
      for(let list of data){
        if(list.is_select && list.children){
          array=list.children
        }
      }
      return array
    },
    oneChange(val) {
      let child = this.oneList.list.find(item => item.id === val)['children']
      this.twoList.list = child||[]
      this.twoList.value = child.length?child[0].id:''
    },
    noFree(id,e) {//不免费
      let array = this.putDetailData[`${this.currIndex}_free_ids`]
      let indexOf = this.currentPut.prices[this.currIndex].chapters.findIndex(item => item.id === id)
      let index = array.indexOf(id)
      if(index>-1){
        array.splice(index,1)
      }
      let price = this.currentPut.prices[this.currIndex].chapters[indexOf].old_price
      this.currentPut.prices[this.currIndex].chapters[indexOf].price = price>0?price:null
    },
    free(id,e) {//免费
      let array = this.putDetailData[`${this.currIndex}_free_ids`]
      let indexOf = this.currentPut.prices[this.currIndex].chapters.findIndex(item => item.id === id)
      let index = array.indexOf(id)
      if(index>-1){
        array.splice(index,1)
      }
      array.push(id)
      this.currentPut.prices[this.currIndex].chapters[indexOf].price = '0'
    },
    pustSetSave() {
      //上架设置
      let loading = this.$loading({text:"正在上传" , background:"rgba(0, 0, 0, 0.8)"})
      let form = formSerialize(document.getElementById("pustSetForm"), { hash: true })
      log(form,this.threeList.value)
      this.services.putSave({
        ...this.putDetailData,
        book_id: this.currentPut.product_id,
        ...form,
        put_audio:form.put_audio,
        put_video:form.put_video,
        category_id:form.put_category?this.twoList.list.length==0?this.oneList.value:this.twoList.value:'',
        head_book_id:form.put_head_book?this.threeList.value:'',
      }).then(res => {
        loading.close()
        this.$emit('save')
      }).catch(({payload}) => {
        loading.close()
        for(let i in payload.messages){
          this.$message.error(payload.messages[i])
          break
        }
      })
    },
    changeCurrType(index,type) {
      //nav切换
      this.currType = type
      this.currIndex = index
    },
    computePrice() {
      //计算价格
      let all_price = document.querySelector(`.${this.currIndex}_all_price`).value
      log(all_price)
      let form = formSerialize(document.getElementById("pustSetForm"), { hash: true })
      let id = this.putDetailData[`${this.currIndex}_free_ids`]
      if(!all_price) {
        return this.$message.error('请填写价格')
      }
      this.services.computePrice({
        book_id:this.currentPut.product_id,
        type:form.books_type,
        resource_type:this.currType,
        all_price,
        id,
      }).then(res => {
        this.currentPut.prices[this.currIndex] = res.data
      })
    },
    getText(name) {
      switch (this.currIndex) {
        case 'pictures':
          return `图片${name}`
          break;
        case 'audios':
          return `音频${name}`
          break;
        case 'videos':
          return `视频${name}`
          break;
        case 'resources':
          return `资源${name}`
          break;
        case 'books':
        default:
          return `章节${name}`
          break;
      }
    },
    clickChebox(type) {
      this.currentPut[type] = this.currentPut[type]>0?'0':'1'
    },
    handleClose() {
      this.$emit('close')
    }
  }, 
  computed:{
    constitute() {
      let price = this.currentPut.prices[this.currIndex]
      // log(price)
      if(this.currIndex=='books'){
        return price?price.chapters:[]
      }
      return price&&price.chapters||[]
    },
  },
  watch: {
    putData() {
      this.setDate()
    }
  }
};
</script>


<template lang="pug">
.div
  //- 上架设置
  el-dialog(
      title="上架设置"
      :visible="pustSetDialog"
      v-if="pustSetDialog"
      width="1000px"
      top="50px"
      :before-close="handleClose"
    )
    .header(slot="title")
      el-tabs(value="detail")
        el-tab-pane(label="上架设置" name="detail")
      .choiceVersion(v-if="putData.version_list")
        span 版本选择
        | 
        select(@change="$emit('change',$event,putData)")
          option(v-for="items,key in putData.version_list" :value="items" :selected="putData.version_id==key") {{key}}
      .formWrap
        VaForm(ref="pustSetForm")
          form#pustSetForm
            .group.constiuteGroup
              .label 图书构成:
              span.constiute
                span.li(@click="changeCurrType('books','1')" v-if="currentPut.prices.books" :class="{isCurrType: currType == '1' }"  ) 阅读
                span.li(@click="changeCurrType('resources','5')" v-if="currentPut.prices.resources" :class="{isCurrType: currType == '5' }") 资源
                //- span.li(@click="changeCurrType('pictures','2')" v-if="currentPut.prices.pictures" :class="{isCurrType: currType == '2' }") 图片
                span.li(@click="changeCurrType('audios','3')" v-if="currentPut.prices.audios" :class="{isCurrType: currType == '3' }" ) 音频
                span.li(@click="changeCurrType('videos','4')" v-if="currentPut.prices.videos" :class="{isCurrType: currType == '4' }")  视频
              .btns
                el-button(size="mini"  @click="computePrice()" type="primary"  plain  ) 计算价格
              .line
              .headerNav
                .left#all_price
                  span(v-text="getText('合集定价:')")
                  input.form-control(v-show='currIndex=="books"' class="books_all_price" type='text' name="books_all_price" v-model='putDetailData.books_all_price')
                  input.form-control(v-show='currIndex=="resources"' class="resources_all_price" type='text' name="resources_all_price" v-model='putDetailData.resources_all_price')
                  //- input.form-control(v-show='currIndex=="pictures"' class="pictures_all_price" type='text' name="picture_all_price" v-model='putDetailData.picture_all_price')
                  input.form-control(v-show='currIndex=="audios"' class="audios_all_price" type='text' name="audio_all_price" v-model='putDetailData.audio_all_price')
                  input.form-control(v-show='currIndex=="videos"' class="videos_all_price" type='text' name="video_all_price" v-model='putDetailData.video_all_price')
                  span 元
                .right
                  span(v-text="getText('定价策略:')")
                  el-radio(label="1" v-model="radio"  v-if="currIndex != 'books'") 平均定价
                  el-radio(label="1" v-model="radio2" name="books_type" v-if="currIndex == 'books'") 平均定价
                  el-radio(label="2" v-model="radio2" name="books_type" v-if="currIndex == 'books'") 篇幅定价
              .tableBox(v-if="currentPut")
                table.table
                  thead
                    tr
                      th(v-text="getText('名称')")
                      th(v-text="getText('价格')")
                      th 操作
                  tbody
                      tr(v-for="(item,index) in constitute")
                        td(v-if='currIndex == "books"')
                          .th-name {{item.name}}
                        td(v-if='currIndex == "books"')
                          .th-name {{item.price}}
                        td(v-if='currIndex != "books"')
                          .th-name {{item.name}}
                        td(v-if='currIndex != "books"')
                          .th-name {{item.price}}
                        td
                          .th-name
                            el-button(size="mini" v-if="item.price==0" data-type='free' @click="noFree(item.id,$event)" type="primary"  plain  v-text="'已免费'") 已免费
                            el-button(size="mini" v-if="item.price!=0" data-type='nofree' @click="free(item.id,$event)" type="primary"  plain  v-text="getText('免费')")
              .line
            .group.putPlate
              label.label 上架板块:
              .div(v-if="currentPut.prices.audios")
                input(type='checkbox' name='put_audio' ref='put_audio' :checked="currentPut.put_audio>0"  :disabled="currentPut.audios_disabled" value='1' @click="clickChebox('put_audio')")
                span 听读
              .div(v-if="currentPut.prices.videos")
                input(type='checkbox' name='put_video' ref='put_video' :checked="currentPut.put_video>0" :disabled="currentPut.videos_disabled" value='1' @click="clickChebox('put_video')")
                span 视读
              .div
                input(type='checkbox' name='put_category' ref='put_category' :checked="currentPut.put_category>0" value='1' @click="clickChebox('put_category')")
                span 书城分类
                el-select.select(v-if="oneList.list" @change='oneChange($event)' v-model="oneList.value" name="category_id")
                  el-option(
                    v-for='item in oneList.list'
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  )
                el-select.select(v-if="twoList.list.length" v-model="twoList.value" name="category_id")
                  el-option(
                    v-for='item in twoList.list'
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  )
              .div
                input(type='checkbox' name='put_head_book' ref='put_head_book' :checked="currentPut.put_head_book>0" value='1' @click="clickChebox('put_head_book')")
                span 书城头部
                el-select.select(v-if="threeList.list" v-model="threeList.value" name="head_book_id")
                  el-option(
                    v-for='item in threeList.list'
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  )
            .line
            .group.putPlate
              label.label 分销设置:
              .div
                input(type='checkbox' id="fenxiao" name='distribute' ref='distribute' :checked="currentPut.distribute>0" value='1' @click="clickChebox('distribute')")
                label(for="fenxiao") 启用分销
      .dialog-footer.btns( slot="footer" class="")
        el-button(type="info" @click="$emit('close')" ) 取消
        el-button(type="primary" @click="pustSetSave" v-if="putData.status!='1'") 确定
</template>


<style lang="stylus" scoped>
.line
  border-bottom 1px solid #E4E7ED
.choiceVersion
  color #303133
  position absolute
  left 50%
  margin-left -55px
  top 23px
  z-index 2
  text-align center
  select
    position relative
    top -1px
.headerNav
  padding 10px 0
  margin-left 120px
  border-bottom 1px solid #E4E7ED
  >div 
    width 50%
    display inline-block
    &.right
      text-emphasis right 
    >span
      margin-right 20px
.putPlate
  >div
    padding-left 120px
    line-height 50px
.tableBox
  padding 0
  padding-left 120px
  box-sizing border-box
  width 100%
  max-height 40vh
  overflow auto
.form-control {
  width: 170px;
}
.constiute .li
  cursor pointer
.constiuteGroup
  .btns
    float right
.el-radio
  line-height inherit
.isCurrType
  color #44c3aa
.select
  margin-left 20px
</style>




