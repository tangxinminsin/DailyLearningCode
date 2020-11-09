// 随机生成数值
function rand(min,max){
    return Math.floor(Math.random()*(max-min))+min
}

let  vaildatePhoneCode = []
// 判断手机号码是否已经发送验证码
let sendCodeP  = (phone)=>{
    for(var item of vaildatePhoneCode){
        if(phone == item.phone){
            return true
        }
    }
    return false
}
// 判断手机号和验证码是否匹配
let findCodeAndPhone = (phone,verCode)=>{
    for(var item of vaildatePhoneCode){
        if(phone == item.phone && verCode == item.verCode){
            return 'login'
        }
    }
    return 'error'
}
// 模拟验证码发送接口
sendCode = (req,res)=>{
    let phone = req.query.phone;
    //生成随机验证码
    let verCode = rand(1000,9999);

    if(sendCodeP(phone)){
        return res.send({
            'code':400,
            'msg':'已经发送验证码，请稍后再发'
        })
    }

    vaildatePhoneCode.push({
        'phone':phone,
        'verCode':verCode
    })
    console.log(vaildatePhoneCode)


    return res.send({
        'code':200,
        'msg':'发送成功'
    })
}
// 验证码登录接口
verCodePhoneLogin = (req,res)=>{
    let {phone,verCode} = req.query;
    // 该手机号是否发送过验证码
    if(sendCodeP(phone)){
        let status = findCodeAndPhone(phone,verCode)
        if(status === 'login'){
            //登录成功
            res.send({
                'code':200,
                'msg':'登录成功'
            })
        }
        else if(status === 'error'){
            res.send({
                'code':400,
                'msg':'验证码错误，登录失败'
            })
        }
    }
    else{
        res.send({
            'code':400,
            'msg':'未发送验证码'
        })
    }
}
module.exports ={
    sendCode,
    verCodePhoneLogin
}