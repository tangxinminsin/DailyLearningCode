import request from '../request';

/**
 * 登录
 * @param tenantId 租户ID
 * @param userName 用户名
 * @param password 密码
 */
export function login(tenantId, userName, password) {
  return request.post('/api/user/login', { tenantId, userName, password });
}

export default { login };
