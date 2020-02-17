<template>
    <!-- class不影响数据 -->
  <div class="customer">
      <div v-loading="loading">
       <!-- 按钮 -->
        <div class="btn">
            <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
            <el-button @click="tobatchDeleteHandler" type="primary" size="small">批量删除</el-button>
        </div>
       <!-- /按钮 -->
        <!-- 表单数据 -->
        <!-- handleSelectionChange 点击全选按钮，就会自动传参,参数为此行数据 -->
        {{ids}}
        <el-table :data="customers" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" ></el-table-column>
          <el-table-column prop="id" label="编号" width="120"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="telephone" label="手机"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100px">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toEditHandler(scope.row)" class="el-icon-edit"></el-button>
              <el-button type="text" size="small" @click="toDeleteHandler(scope.row)" class="el-icon-delete"></el-button>
              <el-button @click="toDetailsHandler(scope.row)" type="text" size="small" class="el-icon-info"></el-button>
            </template>
        </el-table-column>
    </el-table>
        <!-- /表单数据 -->
        <!-- 分页 -->
            <div class="block">
              <span class="demonstration">完整功能</span>
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="pages"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
              ></el-pagination>
            </div>
          <!-- /分页 -->
      </div>
      <!-- 添加/编辑模态框 -->
      <!-- 模态框关闭的另一种方式 @close="dialogCloseHandler"-->
        <el-dialog :title="title" :visible.sync="visible" @close="dialogCloseHandler">
          <!-- 动态绑定rules，并且添加prop，绑定rules中的规则 ,还要出发校验 ref相当于id-->
          <el-form :model="form" :rules="rules" ref="customerForm">
            <el-form-item label="姓名" label-width="60px"   prop="username">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="60px" prop="telephone">
              <el-input v-model="form.telephone" autocomplete="off"></el-input>
            </el-form-item>
            <!-- <el-form-item label="电话" :label-width="formLabelWidth">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item> -->
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="closeModal">取 消</el-button>
            <el-button type="primary" @click="submitHandler">确 定</el-button>
          </div>
</el-dialog>
      <!-- 添加/编辑模态框 -->
  </div>
</template>

<script>
//必须导入模块
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{
            ids:[],
            form:{},
            //添加规则，并在表单属性关联 
            pages:0,  
            total:5,
            pageBean:{},
            rules:{
              username: [
                { required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 2, max: 4, message: '长度在 2 到 4 个字符', trigger: 'blur' }
              ],
              telephone: [
                { required: true, message: '请输入电话号码', trigger: 'blur' }
                //{ min: 3, max: 5, message: '长度在为11', trigger: 'blur' }
              ]
            },
            currentPage1: 5,
            currentPage2: 5,
            currentPage3: 5,
            currentPage4: 4
        }
    },
    //表格动态数据的定义
    computed:{
      //此处必须写命名空间 sotre中的namespace=true
        ...mapState("customer",["customers","loading","visible","title"])

        //customers:function(){
           // return this.$store.state.customers;
        //}
       // ...mapGetters("customer",["customerSize"]) //过滤效果，处理数据
    },
    created(){
        //映射机制
        this.findAllCustomers().then((res)=>{
          // this.pageBean=res.data;
           console.log("pageBean--------",this.pageBean);
           this.total=res.data.total;
           this.pages=res.data.pages;
        });
    },
    methods:{
        ...mapActions("customer",["findAllCustomers","saveOrUpdateCustomer","deleteCustomerById","batchDeleteCustomerByIds"]),
        ...mapMutations("customer",["showModal","closeModal","setTitle"]),
        //普通方法
        toDetailsHandler(customer){
          //跳转到详情页面  {path:'/customer/detail'} 在路由中配置
          //router是路由器 route 是当前路由 #后面
          console.log("cusotmer",customer);
            this.$router.push({path:'/customer/detail',query:{customer}});
        },
        toDeleteHandler(id){
          this.deleteCustomerById(id).then((response)=>{
           // alert(response.data);
            this.$message({
            type:"success",
            message:response.data
            })
          });
        },
        tobatchDeleteHandler(){
          this.batchDeleteCustomerByIds(this.ids).then((response)=>{
           // alert(response.data);
            this.$message({type:"success",message:response.data});
          });
        },
         toAddHandler(){
            this.form={};
            this.setTitle("添加顾客信息");
            this.showModal();
        },
        toEditHandler(customer){
          this.form=customer;
          this.setTitle("修改信息");
          this.showModal();
        },
        submitHandler(){
        //表单验证 触发校验   注意：需要解决残留信息
          this.$refs.customerForm.validate((valid)=>{
            if(valid){
              this.saveOrUpdateCustomer(this.form)
              .then((response)=>{
              //alert(response.data);
              this.$message({
                type:"success",
                message:response.data
                })
            })
            }else{
              return false;
            }
          })
				//提交表单
				//this.form={};提交了空信息 在模态框清除遗留信息
      },
      dialogCloseHandler(){
        this.$refs.customerForm.clearValidate();
      },
      handleSelectionChange(val){
       // console.log("row",row);  
        this.ids=val.map(item=>item.id); //只要单独映射id
      },
      //分页配置
       handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }

    }
};
</script>

<style scoped>
    
</style>