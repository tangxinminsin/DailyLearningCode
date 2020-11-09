import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import apiUrl from '../config/apiUrl'
import '../styles/pages/index.css'


const  Home=(list)=> {
  const [mylist, setMylist] = useState(list.data)
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return (
    <>
      <Head>
        <title>小熊猫博客</title>
      </Head>
      {/* 头部 */}
      <Header />
      {/* 内容 */}
      <Row className='comm-main' type='flex' justify='center'>
        {/* 左侧内容 */}
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <List
              header={<div>最新博客</div>}
              itemLayout='vertical'
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className='list-title'>
                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className='list-icon'>
                    <span><Icon type='calendar' />{item.addtime}</span>
                    <span><Icon type='folder' />{item.typeName}</span>
                    <span><Icon type='fire' />{item.view_count}</span>
                  </div>
                  <div 
                  className='list-context'
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  ></div>
                </List.Item>
              )}
            />
          </div>
        </Col>
        {/* 右侧介绍 */}
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      {/* 底部 */}
      <Footer />
    </>
  )

}

Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(apiUrl.getArticleList).then(
      (res) => {
        console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}

export default Home