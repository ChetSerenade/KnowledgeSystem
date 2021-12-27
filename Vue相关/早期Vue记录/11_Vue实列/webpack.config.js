//webpack 配置文件 用于打包

module.exports={
	entry:__dirname+'/src/main.js',
	output:{
		path:__dirname+'/public',
		filename:'bundle.js'
	},
	resolve:{
		alias:{
			"vue":"vue/dist/vue.esm.js"
		}
	}
}