<script>
export default {
    data () {
        return{
            book_id:null,
            msgData:'',
        }
    },
    props: {
        itemFaData: {},
        value: {}
    },
    methods: {
        hide () {
            this.book_id = this.$parent.book_id
            this.$emit('input', false)
            let data = { 
                ...this.itemFaData,
                userText: this.msgData,
            }
            let extraParams = {}
            this.$readerService.modify_label(data,extraParams)
            .then(res => {
                console.log(res)
                this.$emit('loadMoreNote') // getlist
            })
            .catch(err => {
                console.log(err)
                this.$emit('loadMoreNote') // getlist
            })
        },
        off () {
            this.$emit('input', false)
        }
    }
}
</script>
<template lang="pug">
.mask(v-show="value")
    .dialog
        textarea(placeholder="轻松记录您的所想，所感" v-model="msgData")
        p
        input.btn.commit.classBtn(type="button" value="保存" @click.prevent="hide")
        p
        input.btn.off(type="button" value="取消" @click.prevent="off")
</template>
<style lang="stylus">
.mask
    width 100%
    height 1000px
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    background-color rgba(0,0,0,.5)
    z-index 100
.dialog
    width 300px
    height 100%
    margin 20% auto
textarea
    width: 100%
    height: 10%
    background-color #fff
.btn
    width 100%
    margin 0 auto
.commit
    border 0 
    background-color #508AE8
    color #ffffff
.off
    border 0 
    background-color #fff
.classBtn
    background radial-gradient(#f6d27e, #b1936a)
</style>

