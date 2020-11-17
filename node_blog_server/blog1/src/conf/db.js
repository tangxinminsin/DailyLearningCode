// 获取环境参数
const env = process.env.NODE_ENV

// 配置
const MYSQL_CONF

if (env === 'dev') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'txm990216',
    port: '3306',
    database: 'myblog'
  }
}

if (env === 'production') {
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: 'txm990216',
    port: '3306',
    database: 'myblog'
  }
}

module.exports = {
  MYSQL_CONF
}