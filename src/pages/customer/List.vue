<template>
    <!-- class不影响数据 -->
  <div class="customer">
      <div v-loading="loading">
    <el-table :data="customers" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="120"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="telephone" label="手机"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button @click="toDetailsHandler(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  </div>
</template>

<script>
//必须导入模块
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
    data(){
        return{

        }
    },
    //表格动态数据的定义
    computed:{
        ...mapState("customer",["customers","loading"])
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
        ...mapActions("customer",["findAllCustomers"]),
        //普通方法
        toDetailsHandler(customer){
            
        }
    }
};
</script>

<style scoped>
    
</style>