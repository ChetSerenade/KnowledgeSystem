// 引入一个包
const path = require('path');
//引入html插件
const HTML = require('html-webpack-plugin')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//webpack 所有的信息都应该卸载module里面
module.exports = {
    //  指定入口文件
    entry: "./src/index.ts",

    // 指定出口文件
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, "dist"),
        // 打包后文件的文件
        filename: "bundle.js",

        // 告诉webapck不使用箭头函数
        environment: {
            arrowFunction: false,
            const:false
        }

    },


    // 指定webpack打包时需要使用的模块
    module: {
        //指定要加载的规划
        rules: [
            {
                //test指定的式规则生效的文件
                test: /\.ts$/,
                //要使用的loader  处理TS转JS 版本转换JS兼容问题
                use: [
                    {
                        loader: "babel-loader",
                        //配置babel
                        options: {
                            // 设置预定义环境
                            // 指定环境插件
                            "presets": [
                                //配置信息
                                [
                                    "@babel/preset-env",
                                    {
                                        // 要兼容的目标
                                        "targets": {
                                            // 兼容到浏览器的版本
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        // 指定core的版本号
                                        "corejs": "3",
                                        // 使用core.js的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    //设置babel
                    'ts-loader'
                ],
                //排除
                exclude: /node_modules/
            },
            //设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss
                    {
                        loader:"postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },

    // 配置webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        new HTML({
            //自定义模板
            template: "./src/index.html"
        })
    ],
    //用来设置引用的模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}

