// webpack配置文件
module.exports = {
    // 入口文件，__dirname表示当前文件的根目录
    entry: __dirname + '/src/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    // dev-server的配置信息
    devServer: {
        contentBase: __dirname + '/public', // 服务器根目录
        port: 8080, // 服务器端口号
        inline: true // 当源文件发生改变时，自动刷新执行结果
    }
};