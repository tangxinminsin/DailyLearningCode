import axios from 'axios';
import settings from '../settings';
import constants from '../constants';
import {
  getToken,
  setToken,
  removeToken,
  getTenantId,
} from '../utils/localStorage';
import { Message } from 'antd';

// 文档地址 http://axios-js.com/zh-cn/docs/index.html#axios-create-config
// 创建实例
const { baseURL } = settings;
// 基础配置
const instance = axios.create({
  baseURL,
  timeout: 10000,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken();
    if (token) {
      config.headers = { ...config.headers, Authorization: token };
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    Message.error('网络链接失败');
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const data = response && (response.data || {});
    if (!data.ok) {
      const { code, message } = data.error;
      Message.error(message || '操作失败');
      if (code === 1001 || code === 1002) {
        // 过期或者未登录
        removeToken();
        window.location.reload();
        return;
      }
    }
    // 刷新Token
    const newToken = response.headers[constants.KEY.HEADERS.AUTHORIZATION];
    if (newToken) {
      setToken(newToken);
    }

    return data;
  },
  function (error) {
    // 对响应错误做点什么
    // 非 2xx HTTP错误码处理

    Message.error(
      `网络链接失败 ${error.response ? 'Status:' + error.response.status : ''}`,
    );

    return Promise.reject(error);
  },
);

/**
 * GET
 * @param url 地址
 * @param params 请求参数对象
 * @param config  axios配置（默认不用传, 除非你需要覆盖些什么）
 */
function get(url, params, config) {
  const options = config || {};

  return instance.request({
    ...options,
    url,
    method: 'GET',
    params,
  });
}

// 导出默认实现
const { post, put } = instance;
export default { get, post, put, delete: instance.delete };
