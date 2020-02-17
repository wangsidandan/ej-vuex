<template>
  <div class="customer_details">
    <h2>详情页面</h2>
    <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    <!-- {{customer}} -->
        <p><strong>编号:</strong>{{customer.id}}</p>
        <p><strong>姓名:  </strong>{{customer.username}}</p>
        <p><strong>密码:  </strong>{{customer.password}}</p>
         <p><strong>手机:  </strong>{{customer.telephone}}</p>
        <p><strong>性别:  </strong>{{customer.gender}}</p>
        <p><strong>生日:  </strong>{{customer.birthday}}</p>
        <p><strong>状态:  </strong>{{customer.status}}</p>
        <p><strong>招嫖:  </strong>{{customer.photo}}</p>

     <!-- <el-table border style="width: 100%">
          <el-table-column type="selection" width="55" ></el-table-column>
          <el-table-column prop="id" label="编号" width="120"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="password" label="密码"></el-table-column>
          <el-table-column prop="telephone" label="手机"></el-table-column>
          <el-table-column prop="gender" label="性别">{{customer.gender}}</el-table-column>
           <el-table-column prop="birthday" label="生日"></el-table-column>
            <el-table-column prop="status" label="状态"></el-table-column>
            <el-table-column prop="photo" label="照片"></el-table-column>
    </el-table> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
        customer:{}
    };
  },
  created(){
      this.customer=this.$route.query.customer;
  },
  methods: {
    backHandler() {
      //this.$router.push('/customer/customer')
      //等同于下面
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
</style>