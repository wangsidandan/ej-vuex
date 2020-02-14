import request from '@/utils/request'
import {post,post_array} from '@/utils/request'

export default{
    namespaced:true,
    //状态
    state:{
        customers:[],
        loading:false,
    },
    //获取器  过滤效果
    getters:{

    },
    //突变 改变状态中的值
    mutations:{
        beginLoading(state){
            state.loading=true; //正在加载中
        },
        endLoading(state){
            state.loading=false; //加载完成
        },
        refreshCustomers(state,customers){
            state.customers=customers; //更新action查回来的数据
        }
    },
    //异步操作
    actions:{
        async findAllCustomers({dispatch,commit}){
            //开始加载
            commit("beginLoading"); //调用突变中开始加载方法
            //1.ajax查询
            let response=await request.get("/customer/findAll");//异步请求，调用request中的自定义函数，返回承诺对象
            console.log(response.data);
            //2.通过突变将查询结果 赋值改state中的customers
            commit("refreshCustomers",response.data);   //调用突变的方法更新数据
            //结束加载,为了测试，延迟
            setTimeout(()=>{
                commit("endLoading"); //调用突变中的结束加载方法
            },2000)
        }
    }
}