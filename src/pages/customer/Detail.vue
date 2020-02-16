<template>
    <div class="customer_details">
        <h2>详情页面</h2>
        <el-button type="primary" size="small" @click="backHandler">返回</el-button>
    </div>
</template>

<script>
export default {
    data(){
        return{
            
        } 
    },
    methods:{
            backHandler(){
                //this.$router.push('/customer/customer') 
                //等同于下面
                this.$router.go(-1);
            }
        }
}
</script>

<style scoped>

</style>