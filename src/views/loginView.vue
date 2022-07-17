<template>
  <div id="login_continer">
    <section class="section_background">
    <div class="section_background_sr">
        <input id="username" type="text" name="username"  v-model="username"/>
        <input id="password" type="password" name="password" v-model="password"/>
        <!-- 验证码 -->
        <div class="code-container"> 
             <input type="text" id="code" placeholder="请输入验证码" v-model="code" />
             <img :src="codeImg" width="190px" @click="codeClick"> 
        </div>

        <a class="wj">忘记密码</a>
        <input id="login_sumbit" type="submit" @click="login_click" value="登录"/>
    </div>
    <div class="wjmm">
        还没有账号？
        <a href="./regist.html">马上注册</a>
    </div>
</section>
  </div>
</template>

<script>
import axios from 'axios' //引入axios
    export default {
        data(){
            return{
                username:"linlin",
                password:"123456",
                code:"",
                codeImg:'/codeImg?date'+new Date(),
            }//请求后端生成图片
        }, 
        methods:{
             codeClick(){
                this.codeImg='/codeImg?date'+new Date();
            },
            login_click(){
                // alert('1111');
                //向后端发送/login请求，并携带username和password
                this.postRequest("/login",{
                    username:this.username,
                    password:this.password,
                    code:this.code
                }).then((res)=>{
                    // this.$message.success(res.data);
                   if(res.code==200){
                    console.log(res.data);
                    sessionStorage.setItem('user',JSON.stringify(res.data));
                     this.$router.replace('/home');//通过路由跳转到homeview
                   }
                    
                }).catch((error)=>{
                    // this.$message.error("失败");
                    //  alert("失败");
                });

                // axios({
                //     url:'http://localhost:8081/login',//后端请求
                //     //将username和password引入进去
                //     data:{
                //         username:this.username,
                //         password:this.password,
                       
                //         },
                //          method:'POST'
                // }).then(res=>{
                //     alert('请求成功');
                // }).catch(error=>{
                //     alert('请求失败');
                // })
            },
           
        },
    };
</script>

<style lang="scss">
    #login_continer{
        .section_background {
            width: 100vw;
            height: 100vh;
            background-image: url('@/assets/background_login.jpg');
            background-size: cover;
        }

        .section_background_sr {
            width: 500px;
            height: 400px;
            background-color: white;
            position: absolute;
            top: 40%;
            left: 40%;
            transform: translate(-50%, -50%);
            border-radius: 0.625rem;
            /*内盒子定位 */
            display: flex;
            display: -webkit-flex; /*需要webkit内核*/
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        .section_background_sr>#username, .section_background_sr>#password {
            width: 390px;
            height: 48px;
            border-radius: 0.3125rem;
            border: 1px solid #C0C0C0;
            margin-bottom: 15px;
            font-size: 18px;
            padding-left: 10px;
            color: Gray;
            outline-style: none;
        }

        .section_background_sr>.wj {
            color: #FFA500;
            font-weight: 700;
            margin-left: 330px;
            cursor: pointer;
            /*双击不选中*/
            // -webkit-user-select: none;
            // -moz-user-select: none;
            // -ms-user-select: none;
            user-select: none;
            margin-bottom: 15px;
        }

        .section_background_sr>#login_sumbit{
            width: 400px;
            height: 48px;
            border-radius: 0.3125rem;
            background-color: #FFA500;
            border: white 0rem;
            margin-bottom: 15px;
            cursor: pointer;
            font-size: 20px;
            color: white;
            font-weight: 900;
        }

        .wjmm {
            background-color: rgba(0, 0, 0, .4);
            width: 180px;
            height: 30px;
            display: flex;
            display: -webkit-flex;
            justify-content: center;
            align-items: center;
            color: white;
            border-radius: 50px;
            font-size: 15px;

            // -webkit-user-select: none;
            // -moz-user-select: none;
            // -ms-user-select: none;
            user-select: none;
            margin-bottom: 15px;

            position: absolute;
            top: 65%;
            left: 40%;
            transform: translate(-50%, -50%);
            border-radius: 0.625rem;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, .4);
        }

        .wjmm > a {
            color: #FFA500;
            outline: none;
            text-decoration: none;
        }
        .error_msg{
            width:400px;
            height: 24px;
            color: red;
            margin-bottom: 20px;
            font-size: 15px;
        }
        .code-container{ 
            width:390px; 
            height: 48px; 
            display: flex; 
            margin-bottom: 15px; 
            justify-content: flex-start; 
            align-content: center; }
        #code {
             width: 200px; 
             height: 48px; 
             border-radius: 0.3125rem; 
             border: 1px solid #c0c0c0; 
             font-size: 18px;
             padding-left: 10px; 
             color: Gray; 
             outline-style: none; }
    }
</style>
