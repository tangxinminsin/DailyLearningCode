import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Icon, Button, Spin, message } from 'antd';
import '../static/css/login.css'
import '../static/js/login.js'
import axios from 'axios'
import servePath from '../config/apiUrl';

function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const checkLogin = ()=>{
        setIsLoading(true)
        if(!userName){
            message.error('用户名不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }else if(!password){
            message.error('密码不能为空')
            setTimeout(()=>{
                setIsLoading(false)
            },500)
            return false
        }
        const dataProps = {
            'userName':userName,
            'password':password
        }

        axios({
            method:'post',
            url:servePath.checkLogin,
            data:dataProps,
            withCredentials:true
        }).then(
            res =>{
                setIsLoading(false)
                console.log(res.data.data)
                if(res.data.data==="登录成功"){
                    localStorage.setItem('openId',res.data.openId)
                    props.history.push('/index')
                }
                else{
                    message.error('用户名密码错误')
                    // setTimeout(()=>{
                    //     setIsLoading(false)
                    // },500)
                }
            }
        )
    }
    return (
        <div className='login-div'>
            <Spin tip="Loading..." spinning={isLoading}> 
                <Card title='小熊猫博客' bordered={true} style={{width:400}}>
                    <Input
                    id='userName'
                    size='large'
                    placeholder="用户名"
                    prefix={<Icon type='user' style={{color:'rgba(0,0,0,.25)'}}/>}
                    onChange={(e)=>{setUserName(e.target.value)}}
                    value={userName}
                    />
                     <br/><br/>
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="密码"
                        prefix={<Icon type="key" style={{color:'rgba(0,0,0,.25)'}} />}
                        onChange={(e)=>{setPassword(e.target.value)}}
                        value={password}
                    />     
                    <br/><br/>
                    <Button 
                    type="primary"
                     size="large" 
                     block 
                     onClick={checkLogin} 
                     > 登录 </Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login