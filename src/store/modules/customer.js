import request from '@/utils/request'
import {get,post,post_array} from '@/utils/request'

export default{
    namespaced:true,
    state:{
        title:"添加信息",
        visible:false,//控制表单，未来控制模态框
        customers:[], //遍历需要用到的数据，初始化为null,通过突变改变值
        loading:false   
    },
    mutations:{
        showModal(state){
            state.visible=true;
        },
        closeModal(state){
            state.visible=false;
        },
        beginning(state){
            state.loading=true;
        },
        ending(state){
            state.loading=false;
        },
        //need accpeting a param --customers
        refreshCustomers(state,customers){
            console.log("state=>",state);
            state.customers=customers;
        },
        setTitle(state,title){
            state.title=title;
        }
    },
    actions:{
        //asyna  await 异步操作同步化
        //context=({state,commit,dispatch,getters})
        async findAllCustomers({commit}){
            //console.log("context->",context)
            //查询所有顾客信息
            commit("beginning");
            let response= await get("/customer/findAll");
            //将顾客信息设置到state.customers中
            //console.log(response.data); 
            commit("refreshCustomers",response.data);//调用突变中的方法，传实际值
            setTimeout(()=>{
                commit("ending");
            },1000)

        },
        async saveOrUpdateCustomer({dispatch,commit},customer){
            //调用后台编辑接口
            // let response=await request({
            //     method:"post",
            //     url:'/customer/saveOrUpdate',
            //     data:$.param(customer),
            //     headers:{
            //         "Content-Type":"application/x-www-form-urlencoded"
            //     }
            // });
            let response=await post("/customer/saveOrUpdate",customer);

            //关闭模态框
            commit("closeModal");
            //刷新
            dispatch("findAllCustomers");
            //提示成功  react
            return response;

        },
        async deleteCustomerById({dispatch},id){
            //调用后台删除接口
            let response=await get("/customer/deleteById?id="+id);
            //重新调用findAllCustomers刷新页面
            dispatch("findAllCustomers");
            //提示成功，让Vue去做，并且删除后才能提示
            return response;
        },
        async batchDeleteCustomerByIds(context,ids){
            //传递json参数
            let response = await post_array("/customer/batchDelete",{ids});
            context.dispatch("findAllCustomers");
            return response;
        }
    },
    getters:{
        //计算员工数量
        countCustomers(state){
            return state.customers.length;
        },
        //需要为获取器传递参数的写法
        customerStatusFilter(state){
            //回调函数才可获取状态参数
            return function(status){
                return this.customers.filter(item=>item.status===status)
            }
        }
    }
}