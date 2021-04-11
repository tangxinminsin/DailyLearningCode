import constants from '../constants';

export function setToken(token) {
  if (token) {
    window.localStorage.setItem(constants.KEY.LOCAL_STORAGE.TOKEN, token);
  }
}

export function getToken() {
  return window.localStorage.getItem(constants.KEY.LOCAL_STORAGE.TOKEN);
}

export function removeToken() {
  window.localStorage.removeItem(constants.KEY.LOCAL_STORAGE.TOKEN);
}

export function setTenantId(tenantId) {
  window.localStorage.setItem(constants.KEY.LOCAL_STORAGE.TENANT_ID, tenantId);
}

export function removeTenantId() {
  window.localStorage.removeItem(constants.KEY.LOCAL_STORAGE.TENANT_ID);
}

export function getTenantId() {
  window.localStorage.getItem(constants.KEY.LOCAL_STORAGE.TENANT_ID);
}

export default {
  setToken,
  getToken,
  removeToken,
  setTenantId,
  removeTenantId,
  getTenantId,
};
