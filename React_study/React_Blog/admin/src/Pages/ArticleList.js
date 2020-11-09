import React, { useState, useEffect } from 'react'
import '../static/css/ArticleList.css'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
const { confirm } = Modal

function ArticleList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getResArticleList()
    }, [])
    // 获取文章列表
    const getResArticleList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            header: { 'Access-Control-Allow-Origin': '*' },
            withCredentials: true
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }
    // 删除文章
    const deleteArticle = (id, title) => {
        confirm({
            title: `${title}——确定要删除这篇博客文章吗?`,
            content: '如果你点击OK按钮，文章将会永远被删除，无法恢复。',
            onOk() {
                axios(servicePath.deleteArticle + id, { withCredentials: true }).then(
                    res => {
                        message.success('文章删除成功')
                        getResArticleList()
                    }
                )
            },
            onCancel() {
                message.success('取消删除')
            },
            okText: "确认",
            cancelText: "取消"
        });
    }

    //修改文章
    const updateArticle = (id) => {

        props.history.push('/index/add/' + id)

    }

    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>

                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addtime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>

                            <Col span={4}>
                                <Button type="primary"  onClick={()=>{updateArticle(item.id)}}>修改</Button>&nbsp;

                         <Button onClick={() => { deleteArticle(item.id, item.title) }} >删除 </Button>
                            </Col>
                        </Row>

                    </List.Item>
                )}
            />

        </div>
    )
}

export default ArticleList