export default {
  methods: {
    isPass() {
      this.valiAll()
      return new Promise((res, rej) => {
        let isPass = true
        let obj = {}
        for (const key in this.valiData) {
          if (this.valiData.hasOwnProperty(key)) {
            const item = this.valiData[key]
            if (item.isError) {
              item.message = item.display
              rej(item)
            }
            obj[key] = item.value
          }
        }
        if (isPass) {
          res(obj)
        }
      })
    },
    valiAll() {
      //console.log(this.$refs)
      for (const key in this.$refs) {
        if (this.$refs.hasOwnProperty(key) && /^inp_/.test(key)) {
          const item = this.$refs[key]
          item[0].vali()
        }
      }
      // this.$refs.inpComp.forEach(item => item.vali())
    },
    getImgCode() {
      return this.$service.signin.codeImage().then(res => {
        //console.log(res)
        this.valiData.code_img.img_src = res.data.code_img
        this.valiData.code_img.code_id_img = res.data.code_id
      })
    },
    // 发短信
    getPhoneCodeHander() {
      console.log('xxxxxxxxxxxxxxxxxx')
      this.$refs.inp_phone[0].vali() // 验证手机号
      if (this.valiData.phone && this.valiData.phone.isError) {
        this.$Toast('手机号码错误!')
        return
      }
      let data = {
        code_id_img: this.valiData.code_img.code_id_img,
        code_val_img: this.valiData.code_img.value,
        phone: this.valiData.phone.value,
        not_check_user_exist: 1,
      }
      this.$service.signin
        .codePhone(data)
        .then(res => {
          //console.log('phoneback', res)
          this.$Toast({
            type: 'success',
            message: '短信发送成功!',
          })
          this.valiData.code_id.value = res.data.code_id
          // 60秒内不再发送
          this.$refs.inp_code_val[0].wait()
        })
        .catch(err => {
          //console.log('错误')
          if (err.message === '图片验证码错误') {
            this.valiData.code_img.isError = true
            this.$Toast('图片验证码错误!')
          } else {
            console.error(err)
            this.$Toast('短信发送失败! 请稍后再试!')
          }
        })
    },
  },
}
