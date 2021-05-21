# 五层模型

## 物理层

+ 物理层主要作用是定义物理设备如何传输数据（电脑硬件、网卡、网线、光缆）

## 数据链路层

+ 数据链路层在通信的实体间建立数据链路连接

## 网络层

+ 网络层为数据在结点之间传输创建逻辑链路

## 传输层

+ 面向连接的传输协议（TCP）：数据传输之前必须先建立连接,数据传输完成之后,必须释放连接。仅支持单播传输：每条传输连接只能有两个端点，只能进行点对点的连接，不支持多播和广播的传输方式,UDP是支持的。（向用户提供可靠的端到端服务）

+ 传输层向高层屏蔽了下层数据通信的细节

## 应用层

+ 为应用软件提供了很多服务
+ 构建与TCP协议之上
+ 屏蔽网络传输相关细节

# HTTP协议发展历史

+ HTTP/0.9
  + 只有一个命令GET
  + 没有HEADER等描述数据的信息
  + 服务器发送完毕。就关闭TCP连接（**同一个TCP连接可以发送多个http连接** http1.1实现保持长连接）

+ HTTP/1.0
  + 增加了很多命令
  + 增加status code和header
  + 多字符集支持、多部份发送、权限、缓存等
+ HTTP/1.1
  + 持久连接
  + pipeline(管道)
  + 增加host和其他一些命令
+ HTTP2
  + 所有数据以二进制传输
  + 用一个连接里面发送多个请求不再需要按照顺序来
  + 头信息压缩以及推送等提高效率的功能

# 三次握手

+ http不存在连接的概念只有请求和响应，请求和响应都是数据包，他们之间需要通过一个传输的通道（TCP connection）

+ 三次握手为了规避网络传输中延时导致的服务器开销的问题

# URI-URL-URN

+ URI
  + Uniform Resource Identifier  统一资源标识符
  + 用来唯一标识互联网上的信息资源
  + 包括了URL和URN
+ URL
  + Uniform Resource Locator 统一资源定位器
  + http://user:pass@host.com:80/path?query=string#hash
  + `http://`定义以什么样的协议去访问 (http://  https://  ftp://)
  + `user:pass` 特定的身份用户认证（现在基本不用）
  + `host` ip、域名，定位服务器在互联网的位置
  + `：80`端口
  + `/path`:路由
  + `?query=string`搜索传参
  + `#hash`截取文档的某个片段 、锚点的定位工具
+ URN
  + 永久统一资源定位符
  + 在资源移动之后还能被找到
  + 目前还没有非常成熟的使用方案

# curl 

+ curl 是常用的命令行工具，用来请求 Web 服务器。它的名字就是客户端（client）的 URL 工具的意思。

  它的功能非常强大，命令行参数多达几十种。如果熟练的话，完全可以取代 Postman 这一类的图形界面工具。

+ [curl 的用法指南]: http://www.ruanyifeng.com/blog/2019/09/curl-reference.html

  

# CORS 预请求 (Request Method:OPTIONS)

+ 跨域时默认允许的方法：
  + GET
  + HEAD
  + POST
+ 允许Content-Type
  + text/plain
  + multipart/form-data
  + application/x-www-form-urlencoded
  + ......

+ 其他限制
  + 请求头限制
  + XMLHttpRequestUpload对象均没有注册任何事件监听器
  + 请求中没有使用ReadableStream对象

```javascript
'Access-Control-Allow-Origin': 'http://127.0.0.1:8888',
'Access-Control-Allow-Headers': 'X-Test-Cors',
'Access-Control-Allow-Methods': 'POST, PUT, DELETE',
'Access-Control-Max-Age': '1000'
```

# 缓存Cache-Contro

+ 可缓存性
  + public
    + http请求返回的过程中，返回的内容经过的路径（代理服务器、客户端浏览器），对返回内容缓存
  + private 
    + 只有发起请求的浏览器可以进行缓存
  + no-cache
    + 可以在本地进行缓存，可以在代理服务器进行缓存，**但发起请求都要去服务器验证**，如果服务器返回的请求告诉你可以使用本地缓存，然后才可以使用本地缓存
+ 到期
  + max-age=\< seconds \>
    + 缓存到期时间
  + s-maxage=\< seconds \>
    + 代替max-age=\< seconds \> 只有在代理服务器中生效
  + max-stale=\< seconds \>
    + 发起请求的一方主动带的Header,当缓存到期后，在max-stale时间内仍可使用过期的缓存
    + 在浏览器中用不到（浏览器不会主动设置这个Header）
+ 重新验证
  + must-revalidate
    + max-age过期后要从服务端重新发起请求获取数据，再来验证内容是否真的过期了，不能直接使用本地的缓存
  + proxy-revalidate
    + 只在代理服务器中生效，与must-revalidate相同
+ 其他
  + no-store
    + 本地和代理都不可以存缓存，都要去服务器端拿新的body
  + no-transform
    + 主要用在代理服务器（告诉代理服务器不要随便改变返回的内容，如压缩，格式转换）

### 缓存与hash码

当缓存时间过长，静态资源（js,css,html）发生改变时，浏览器仍然读取的是缓存的内容，这时需要给静态文件名加上hash码。当文件发生改变时，文件名发生改变，访问的文件路径发生改变，浏览器则会获取新的静态文件