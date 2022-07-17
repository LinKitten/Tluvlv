const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true
})
module.exports={
    devServer:{//这里开始写
        host:'localhost',//前端地址
        port:8080,//前端端口
        proxy:{//代理对象
            '/':{//代理对象的初始地址。
                ws:false,//是否需要代理websocket.需要配置
                target:'http://localhost:8081',//后端地址
                changeOrigin:true,//是否跨域
                // pathRewrite:{//将前端api重写为'/'
                //     '/api':'/'
                // }
            }
        }
  
    }
  }