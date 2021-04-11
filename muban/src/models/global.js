import { useState, useCallback } from 'react';
import hashUtils from 'hash.js';
import globalApi from '../services/global';
import { getTenantId, setToken, getToken } from '../utils/localStorage';

export default function Global() {
  const [user, setUser] = useState(null);

  /**
   * 登录
   * @type {(...args: any[]) => any}
   */
  const login = useCallback((userName, password) => {
    const encodedPwd = hashUtils.sha256().update(password).digest('hex');
    const tenantId = getTenantId();
    globalApi.login(tenantId, userName, encodedPwd).then(({ ok, data }) => {
      if (ok) {
        setToken(data);
        getUserDetail(data);
      }
    });
  }, []);

  /**
   * 获取用户详情
   * @type {function(*): void}
   */
  const getUserDetail = useCallback((token) => {
    setUser({
      userId: 'USERXXXXXXXXXXXXXXXXX1',
      userName: 'admin',
      resources: ['a', 'b'],
    });
  }, []);

  return {
    user,
    login,
    getUserDetail,
  };
}
