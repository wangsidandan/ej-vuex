<template>
    <!-- class不影响数据 -->
  <div class="customer">
      <div v-loading="loading">
       <!-- 按钮 -->
        <div class="btn">
            <el-button @click="toAddHandler" type="primary" size="small">添加</el-button>
            <el-button @click="" type="primary" size="small">批量删除</el-button>
        </div>
       <!-- /按钮 -->
        <!-- 表单数据 -->
        <el-table :data="customers" border style="width: 100%">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="id" label="编号" width="120"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="telephone" label="手机"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toEditHandler(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="toDeleteHandler(scope.row.id)">删除</el-button>
              <el-button @click="toDetailsHandler(scope.row.id)" type="text" size="small">详情</el-button>
            </template>
        </el-table-column>
    </el-table>
        <!-- /表单数据 -->
      </div>
      <!-- 添加/编辑模态框 -->
        <el-dialog title="添加顾客信息" :visible.sync="visible">
          <el-form :model="form">
            <el-form-item label="姓名" label-width="100px">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="100px">
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
            form:{}
        }
    },
    //表格动态数据的定义
    computed:{
      //此处必须写命名空间 sotre中的namespace=true
        ...mapState("customer",["customers","loading","visible"])

        //customers:function(){
           // return this.$store.state.customers;
        //}
       // ...mapGetters("customer",["customerSize"]) //过滤效果，处理数据
    },
    created(){
        //映射机制
        this.findAllCustomers();
    },
    methods:{
        ...mapActions("customer",["findAllCustomers","saveOrUpdateCustomer","deleteCustomerById"]),
        ...mapMutations("customer",["showModal","closeModal"]),
        //普通方法
        toDetailsHandler(customer){
            
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
         toAddHandler(){
            this.form={},
            this.showModal();
        },
        toEditHandler(customer){
          this.form=customer;
          this.showModal();
        },
        submitHandler(){
				//表单验证
				//提交表单
				//this.form={};提交了空信息 在模态框清除遗留信息
				this.saveOrUpdateCustomer(this.form)
          .then((response)=>{
            //alert(response.data);
            this.$message({
              type:"success",
              message:response.data
              })
          });
			},

    }
};
</script>

<style scoped>
    
</style>