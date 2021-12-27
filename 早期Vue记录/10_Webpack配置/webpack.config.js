// webpack的配置文件


//module.exports  node的命令行 输出模板

module.exports={
    entry:__dirname+'/src/main.js',  //入口文件
    output:{
        path:__dirname+'/dist',
        filename:'bundle.js'
    },
    //打包css
    module:{
        rules:[
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            },
            {
                test:/\.(jpg|jpeg|png|gif)$/,
                loader:'file-loader',
                options:{
                    outputPath:'assets/'
                }
            }
        ]
    },
    //使用编译版本进行打包
    	resolve: {
    	    alias: {
    	        "vue": "vue/dist/vue.esm.js"
    	    }
    	}
}