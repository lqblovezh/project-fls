//共用方法
import formSerialize from "form-serialize"
const main = {
  data(){
    return {
      tableData:null,
      total:0,
      page:{
        pageOffset:10,
        pageNum:1,
      },
      
    }
  },
  created(){
    this.getList()
  },
  methods: {
    seareHandeler() {
      //搜索
      this.page.pageNum = 1 ;
      this.getList({...this.query})
    },
    getList(obj){
        this.service.getList({...obj,...this.page}).then(res=>{
          if(res && res.status){
            log(res.data)
            this.total = res.page.total
            this.tableData= res.data
          }
        }) 
    },
    handleSizeChange(val) {//处理size变化
      this.page.pageOffset = val ;
      this.getList({...this.page,...this.query})
    },
    handleCurrentChange(val) {//处理页码变化 
      this.page.pageNum = val;
      this.getList({...this.page,...this.query})
    },
    handleClose() {//关闭模态框时初始化form
      this.$refs.detailDialog.resetFields()
      this.detailVisible = false
    },
    del(ids){
       this.service.del({id:ids})
    },
    save(data){
      if(!data){
        data = this.info;
      }
      this.service.save(data).then(res=>{
         log(res)
         if(res.status){
           this.getList(this.query);
           this.$refs.child.dialogVisible= false
         }
      });
    }
  }
}
export { main }
