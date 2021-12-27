import axios from 'axios'
//用axios 链接了 接口文档 获取里面的数据
export default axios.create({
    baseURL: 'http://180.76.165.143:8080/MyUser'
})