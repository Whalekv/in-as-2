import axios from 'axios'
import { ElMessage } from 'element-plus'

const key_token = 'TOKEN'
const value_token = 'pat_esdtRCnIeK2KaMF7OJ0RlMWi1xK5cgrCx2rVpWKn3pZiLkfBCK4kgnkfOAkrsvRa'
localStorage.setItem(key_token, value_token)

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://api.coze.cn', // 从环境变量获取API基础URL
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 从localStorage获取token
    const token = localStorage.getItem('TOKEN')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('请求错误：', error)
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 这里可以根据后端的响应结构进行调整
    if (res.code === 0 || res) {
      return res
    } else {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || '请求失败'))
    }
  },
  (error) => {
    console.error('响应错误：', error)
    ElMessage.error(error.message || '网络错误')
    return Promise.reject(error)
  },
)

// 封装请求方法
export const request = {
  get(url, params) {
    return service.get(url, { params })
  },
  post(url, body) {
    return service.post(url, body)
  },
  put(url, data) {
    return service.put(url, data)
  },
  delete(url) {
    return service.delete(url)
  },
}

export { service }
