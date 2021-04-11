/*
 * @Author: zhouqian
 * @Date: 2021-01-21 11:09:37
 * @LastEditors: zhouqian
 * @LastEditTime: 2021-02-26 10:29:45
 * @Description: file content
 */
// 不同环境的配置, 根据环境变量(ACTIVE_PROFILE)导出不同的配置
// 相同的配置
const common = {
  channelId: 3,
  tenantCode: 'ceb_province_hn',
};
// 本地环境
const dev = {
  imgURL: 'http://dev.tcmkt.cn/static',
  baseURL: 'http://localhost:20010',
};

// 测试环境
const pre = {
  ...dev,
  imgURL: 'http://dev.tcmkt.cn',
  baseURL: 'http://dev.tcmkt.cn/static',
};

// 生产环境
const prod = {
  imgURL: 'https://tcmkt.cn',
  baseURL: 'https://tcmkt.cn/h5',
};

const setting = {
  dev,
  pre,
  prod,
};

// eslint-disable-next-line
export default {
  ...common,
  ...setting[ACTIVE_PROFILE],
};
