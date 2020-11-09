const mysql = require('mysql')

module.exports={
    //数据库配置
    config:{
        host:'localhost',
        port:'3306',
        user:'root',
        password:'txm990216',
        database:'exapp',
    },
    //连接数据库，使用mysql连接池连接方式
    //连接池对象
    sqlConnect:function(sql,sqlArr,callBack){
        // sql:sql语句
        // sqlArr:sql数组
        var pool =mysql.createPool(this.config)
        pool.getConnection((err,conn)=>{
            console.log('连接中....')
            if(err){
                console.log('连接失败')
                return
            }
            //事件驱动回调
            conn.query(sql,sqlArr,callBack)
            //释放连接
            conn.release()
        })
    }
}