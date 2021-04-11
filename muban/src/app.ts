export async function getInitialState() {
  return {
    user: {
      id: 1,
      username: 'admin',
      permission: ['home', 'goods'],
    },
  };
}
