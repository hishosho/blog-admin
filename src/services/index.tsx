import axios from 'axios'
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const result = (success: boolean, data: any, response: any) => {
  return {
    success: success,
    data,
    response
  }
}

// axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials = true

axios.interceptors.request.use((opt: any): any => {
  const headers = opt.headers || {}
  const data = opt.data || {}
  const options = {
    timeout: 30000,
    withCredentials: true,
    ...opt,
    headers: {
      ...headers,
    },
    data
  }
  return options
})

axios.interceptors.response.use(
  (res: any) => {
    return result(res.data.code, res.data.code ? res.data.data : res.data.message, res)
  },
  (err) => {
    if (err.response && err.response.status === 403) {
      history.push('/login')
      // window.location.href='http://127.0.0.1:9000/login/'
      return result(false, {}, err)
    }
    if (err.response && err.response.status === 404) {
      return result(false, {}, err)
    }
    const errMsg = err.message || '请求失败'
    return result(false, errMsg, err)
  }
)

export default axios
