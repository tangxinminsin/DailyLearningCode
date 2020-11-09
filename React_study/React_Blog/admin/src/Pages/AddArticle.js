import React, { useState, useEffect } from 'react';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import '../static/css/AddArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import servePath from '../config/apiUrl';

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {
  useEffect(() => {
    getTypeInfo()
    //获得文章ID
    let tmpId = props.match.params.id
    if (tmpId) {
      setArticleId(tmpId)
      getArticleById(tmpId)
    }
  }, [])

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  // const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState('选择类别') //选择的文章类别

  marked.setOptions({
    renderer: marked.Renderer(),// 渲染方式
    gfm: true, // 启动类是GitHub Markdown样式
    pedantic: false, // 容错（当语法不是markdown时会重新渲染） ，true则是完全不容错
    sanitize: false, // 忽略html标签
    tables: true, // 输出表格样式要与“gfm”一同开启
    breaks: false,// github 换行符 要与“gfm”一同开启
    smartLists: true, // 自动渲染列表
    smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
    //  代码高亮
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }
  // 获取文章类别
  const getTypeInfo = () => {
    axios({
      method: 'get',
      url: servePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === "没有登录") {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }
      }
    )



  }
  // 选择类别id
  const selectTypeHandler = (value) => {
    setSelectType(value)
  }
  // 分类框宽度
  const linkStyle = { width: '105px' }

  const gettypeinfo = (id) => {

    return id
  }

  // 文章内容保存方法
  const saveArticle = () => {
    // markedContent()  //先进行转换

    if (!selectedType || selectedType === "选择类别") {
      message.error("必须选择文章类别")
      return false
    } else if (!articleTitle) {
      message.error('文章标题不能为空')
      return false
    } else if (!articleContent) {
      message.error('文章内容不能为空')
      return false
    } else if (!introducemd) {
      message.error('简介不能为空')
      return false
    } else if (!showDate) {
      message.error('发布日期不能为空')
      return false
    }

    const dataProps = {} //传递到接口的参数
    console.log(selectedType)
    dataProps.type_id = selectedType
    dataProps.title = articleTitle
    dataProps.article_content = articleContent
    dataProps.introduce = introducemd
    // 获取当前时间
    const myDate = new Date();
    const h = myDate.getHours(); //获取系统时，
    const m = myDate.getMinutes(); //分
    const s = myDate.getSeconds(); //秒
    dataProps.addtime = showDate + " " + h + ":" + m + ":" + s


    if (articleId == 0) {
      console.log('articleId=:' + articleId)
      dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
      axios({
        method: 'post',
        url: servePath.addArticle,
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          console.log(res.data.insertId)
          setArticleId(res.data.insertId)
          if (res.data.insertSuccess) {
            message.success('文章添加成功')
          } else {
            message.error('文章添加失败');
          }

        }
      )
    } else {
      dataProps.id = articleId
      axios({
        method: 'post',
        url: servePath.updataArticle,
        header: { 'Access-Control-Allow-Origin': '*' },
        data: dataProps,
        withCredentials: true
      }).then(
        res => {
          if (res.data.updataSuccess) {
            message.success('文章修改成功')
          } else {
            message.error('文章修改失败')
          }
        }
      )
    }

  }
  // 根据id获取文章类容修改文章
  const getArticleById = (id) => {
    axios(servePath.revampArticle + id, {
      withCredentials: true,
      header: { 'Access-Control-Allow-Origin': '*' }
    }).then(
      res => {
        // console.log(res.data.data[0])

        // let datetime = res.data.data[0].addtime.split(' ')
        // datetime = datetime[0].replace(" ","")

        setArticleTitle(res.data.data[0].title)
        setArticleContent(res.data.data[0].article_content)
        let html = marked(res.data.data[0].article_content)
        setMarkdownContent(html)
        setIntroducemd(res.data.data[0].introduce)
        let tmpInt = marked(res.data.data[0].introduce)
        setIntroducehtml(tmpInt)
        // setShowDate(datetime)
        // setSelectType(res.data.data[0].typeId)
    
        
        
      }
    )
  }

  return (
    <div>
      <Row gutter={5}>
        {/* 第一列 */}
        <Col span={18}>
          {/* 第一列下的第一行 */}
          <Row gutter={10} >
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large"
                value={articleTitle}
                onChange={(e) => { setArticleTitle(e.target.value) }}
              />
            </Col>

            <Col span={4}>

              <Select defaultValue={selectedType} size="large" onChange={selectTypeHandler} style={linkStyle}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
              </Select>
            </Col>
          </Row>
          <br />
          {/* 第一列下的第二行 */}
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={changeContent}
                onPressEnter={changeContent}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              >
              </div>

            </Col>
          </Row>
        </Col>
        {/* 第二列 */}
        <Col span={6}>
          {/* 第二列第一行 */}
          <Row>
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
              <br />
            </Col>

            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
              />
              <br /><br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: "文章介绍：" + introducehtml }}
              >
              </div>
            </Col>

            <Col span={24}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large"
                  onChange={(data, dataString) => { setShowDate(dataString) }}
                />
              </div>
              {/* <div className="date-select">
                <DatePicker
                  placeholder="修改日期"
                  size="large"
                  onChange={(data, dataString) => { setUpdateDate(dataString) }}
                />
              </div> */}
            </Col>
          </Row>

        </Col>
      </Row>
    </div>
  )
}
export default AddArticle