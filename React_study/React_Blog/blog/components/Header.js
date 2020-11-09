import React,{useState,useEffect} from 'react'
import '../styles/components/header.css'
import { Row, Col, Menu,Icon } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Item from 'antd/lib/list/Item'

const Header = () => {
    const [navAarry,setNavArray] = useState([])
    useEffect(()=>{
        const fetchData = async ()=>{
            const result = await axios(servicePath.getTypeInfo).then(
                (res)=>{
                    return res.data.data
                }
            )
            setNavArray(result)
        }
        fetchData()
    },[])
    //跳转到列表页
  const handleClick = (e)=>{
    if(e.key==0){
        Router.push('/')
    }else{
        Router.push('/list?id='+e.key)
    }


}
    return (
        <div className='header'>
            <Row type="flex" justify="center">
                <Col xs={24} sm={24} md={10} lg={12} xl={10}>
                    <span className="header-logo">小熊猫</span>
                    <span className="header-text">记录前端学习</span>
                </Col>
                <Col className="memu-div" xs={0} sm={0} md={14} lg={12} xl={8}>
                    <Menu mode="horizontal" onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                        博客首页
                    </Menu.Item>
                    {
                        navAarry.map((item)=>{
                            return(
                                <Menu.Item key={item.id}>
                                <Icon type={item.icon} />
                                {item.typeName}
                                </Menu.Item>
                            )
                        })
                    }
                    </Menu>
                </Col>
            </Row>
        </div>
    )
}

export default Header