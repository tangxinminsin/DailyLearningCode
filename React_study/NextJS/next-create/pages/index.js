//index.js
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'



const Home = () => {
  function sin() {
    // Router.push('/Page3?name=sin')
    Router.push({
      pathname: '/Page3',
      query: {
        name: "sin"
      }
    })
  }
  return (
    <div>
      <div>我是首页</div>
      <div><Link href='/Page1'><a>去页面Page1</a></Link></div>
      <div><Link href='/Page2'><a>去页面Page2</a></Link></div>
      <div>
        <button onClick={() => { Router.push('/Page2') }}>去Page2页面</button>
        <hr />
        <div>
          <div>传参</div>
          <Link href="/Page3?name=sin"><a>选择sin</a></Link><br />
          <Link href={{ pathname: "/Page3", query: { name: "cos" } }}><a>选择cos</a></Link><br />
          <button onClick={sin}>去找sin</button>
        </div>
      </div>
      <hr />

    </div>


  )

}

export default Home