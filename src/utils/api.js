import axios from "axios"
import { Message } from "element-ui";
 // 封装post请求 
 let base='http://localhost:8081'; 
 export const postRequest=(url,params)=>{ 
    return axios({
        url:`${url}`,
        method:'POST', 
        data:params,
        withCredentials:true
        })
     }
     //响应拦截器
     axios.interceptors.response.use(res=>{//正常
         if(res.status==200&&res.data.code==200){
            //使用Element-ui弹出响应信息
            Message.success({message:res.data.msg});
            return res.data
         }else{
            //使用Element-ui弹出响应信息
            Message.error({message:res.data.msg});
         }
         return message.data;//返回数据
     },error=>{//不正常
         if(error.response.status == 500 ){
            Message.error({message:'服务器被吃了'});
         }else if (error.response.status == 404){
            Message.error({message:"页面找不到了"});
         }else if(error.response.status==401){
            Message.error({message:"权限不足，无法访问"});
         }else{
            Message.error({message:"未知异常，无法访问"});
         }
     })