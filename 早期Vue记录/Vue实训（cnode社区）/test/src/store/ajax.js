import axios from 'axios';

// 创建axios实例对象
const request = axios.create({
  // 基准地址
  baseURL: 'https://cnodejs.org/api/v1'
})
export default request
