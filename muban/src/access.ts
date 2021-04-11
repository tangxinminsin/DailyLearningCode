export default function (initialState) {
  // 来自 src/app.js
  const { user } = initialState;

  let permission = {};
  if (user && user.permission) {
    permission = user.permission.reduce((res, item) => {
      res[item] = true;
      return res;
    }, {});
  }

  return permission;
}
