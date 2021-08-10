## CentOS 7.3  安装Nginx

+ 默认Nginx版本为1.12,升级为1.16.1

+ 编辑

  + vim /etc/yum.repos.d/nginx.repo

+ ```shell
  [nginx-stable]
  name=nginx stable repo
  baseurl=http://nginx.org/packages/centos/7/$basearch/
  gpgcheck=1
  enabled=1
  gpgkey=https://nginx.org/keys/nginx_signing.key
  module_hotfixes=true
  ```

+ 安装

  + yum install nginx-1.16.1

+ 查看版本

  + nginx -V

+ 列出nginx目录列表
  + rpm  -ql nginx

## Nginx-启动、停止、重启、重载

+ 启动

  + 方式一：

    + nginx

    + ```shell
      [root@sin ~]# nginx
      ```

  + 方式二：

    + systemctl start nginx.service

    + ```shell
      [root@sin ~]#systemctl start nginx.service
      [root@sin ~]#ps aux | grep nginx
      root      3485  0.0  0.0  46452   968 ?        Ss   15:12   0:00 nginx: master process /usr/sbin/nginx -c /etc/nginx/nginx.conf
      nginx     3486  0.0  0.0  46860  1856 ?        S    15:12   0:00 nginx: worker process
      root      3489  0.0  0.0 112812   972 pts/0    R+   15:12   0:00 grep --color=auto nginx
      
      ```

      

+ 查看nginx启动情况

  + ps aux | grep nginx

    ```shell
    [root@sin ~]# ps aux | grep nginx
    root      3437  0.0  0.0  46452   976 ?        Ss   15:07   0:00 nginx: master process nginx
    nginx     3438  0.0  0.0  46864  1864 ?        S    15:07   0:00 nginx: worker process
    root      3446  0.0  0.0 112812   968 pts/0    R+   15:07   0:00 grep --color=auto nginx
    ```

+ 停止

  + 方法一：

    + nginx -s quit (从容停止：这种方法较stop相比就比较温和一些了，需要进程完成当前工作后再停止。)

  + 方法二：

    + nginx  -s stop（立即停止：这种方法比较强硬，无论进程是否在工作，都直接停止进程）

  + 方法三：

    + killall nginx

  + 方法四：

    + systemctl stop nginx.service

  + ps aux | grep nginx

    ```shell
    [root@sin ~]# ps aux | grep nginx
    root      3412  0.0  0.0 112812   972 pts/0    R+   15:03   0:00 grep --color=auto nginx
    ```

+ 重启

  + systemctl restart nginx.service

+ 重载（在重新编写或者修改Nginx的配置文件后，都需要作一下重新载入）
  + nginx -s reload

## 访问权限

+ 基础

  ```js
   location / {
          deny   123.9.51.42;// 禁止访问
          allow  45.76.202.231;// 允许访问
      }
  ```

+ 优先级（**同一个块下的两个权限指令，先出现的设置会覆盖后出现的设置**）

  ```js
  location / {
        allow  45.76.202.231;// 允许访问
        deny   all;// 禁止访问
      }
  
  location / {
          deny  all;// 禁止访问 将不再执行下面的allow
          allow  45.76.202.231;// 无法访问
      }
  ```

+ 精确匹配（用于目录）

  ```js
  location =/static{
        allow  all;// 允许访问
      }
  location =/admin{
        deny  all;// 禁止访问
      }
  ```

+ 正则匹配（用于文件）

  ~ +正则表达式，正则匹配以js结尾的文件

  ```js
  location  ~\.js${
        deny  all;// 允许访问
      }
  ```

## 设置虚拟主机

配置虚拟主机可以基于端口号、基于IP和基于域名

### 基于端口号配置虚拟主机

新增配置文件

```js
server{
        listen 8001; //控制端口号不同
        server_name localhost;
        root /usr/share/nginx/html/html8001;
        index index.html;
}
```

## 反向代理

+ 正向代理

  你想访问目标服务器的权限，但是没有权限。这时候代理服务器有权限访问服务器，并且你有访问代理服务器的权限，这时候你就可以通过访问代理服务器，代理服务器访问真实服务器，把内容给你呈现出来

+ 反向代理

  反向代理跟代理正好相反，客户端发送的请求，想要访问server服务器上的内容。发送的内容被发送到代理服务器上，这个代理服务器再把请求发送到自己设置好的内部服务器上，而用户真实想获得的内容就在这些设置好的服务器上。

+ **反向代理的用途和好处**

  - 安全性：正向代理的客户端能够在隐藏自身信息的同时访问任意网站，这个给网络安全代理了极大的威胁。因此，我们必须把服务器保护起来，使用反向代理客户端用户只能通过外来网来访问代理服务器，并且用户并不知道自己访问的真实服务器是那一台，可以很好的提供安全保护。
  - 功能性：反向代理的主要用途是为多个服务器提供负债均衡、缓存等功能。负载均衡就是一个网站的内容被部署在若干服务器上，可以把这些机子看成一个集群，那Nginx可以将接收到的客户端请求“均匀地”分配到这个集群中所有的服务器上，从而实现服务器压力的平均分配，也叫负载均衡。

+ 通过访问www.xxx.com反向代理到hhh.com这个网站

```js
server{
        listen 8001; 
        server_name www.xxx.com;
        location / {
               proxy_pass http://hhh.com;
        }
}
```

+ 其他反向代理命令
  - proxy_set_header :在将客户端请求发送给后端服务器之前，更改来自客户端的请求头信息。
  - proxy_connect_timeout:配置Nginx与后端代理服务器尝试建立连接的超时时间。
  - proxy_read_timeout : 配置Nginx向后端服务器组发出read请求后，等待相应的超时时间。
  - proxy_send_timeout：配置Nginx向后端服务器组发出write请求后，等待相应的超时时间。
  - proxy_redirect :用于修改后端服务器返回的响应头中的Location和Refresh。

## Nginx适配PC或移动设备

 Nginx通过内置变量`$http_user_agent`，可以获取到请求客户端的userAgent，就可以用户目前处于移动端还是PC端，进而展示不同的页面给用户。

```js
server{
     listen 80;
     server_name www.xxx.com;
     location / {
      root /usr/share/nginx/pc;
      if ($http_user_agent ~* '(Android|webOS|iPhone|iPod|BlackBerry)') {
         root /usr/share/nginx/mobile;
      }
      index index.html;
     }
}
```

## Nginx的Gzip压缩配置

+ Gzip是网页的一种网页压缩技术，经过gzip压缩后，页面大小可以变为原来的30%甚至更小。更小的网页会让用户浏览的体验更好，速度更快。gzip网页压缩的实现需要浏览器和服务器的支持。
+ gzip是需要服务器和浏览器同时支持的。当浏览器支持gzip压缩时，会在请求消息中包含Accept-Encoding:gzip,这样Nginx就会向浏览器发送姐过gzip后的内容，同时在相应信息头中加入Content-Encoding:gzip，声明这是gzip后的内容，告知浏览器要先解压后才能解析输出。

+ 简单配置

  ```js
  http {
      gzip on;
      gzip_types text/plain application/javascript text/css;
  }
  ```

+ **gzip的配置项**

  Nginx提供了专门的gzip模块，并且模块中的指令非常丰富。

  - gzip : 该指令用于开启或 关闭gzip模块。
  - gzip_buffers : 设置系统获取几个单位的缓存用于存储gzip的压缩结果数据流。
  - gzip_comp_level : gzip压缩比，压缩级别是1-9，1的压缩级别最低，9的压缩级别最高。压缩级别越高压缩率越大，压缩时间越长。
  - gzip_disable : 可以通过该指令对一些特定的User-Agent不使用压缩功能。
  - gzip_min_length:设置允许压缩的页面最小字节数，页面字节数从相应消息头的Content-length中进行获取。
  - gzip_http_version：识别HTTP协议版本，其值可以是1.1.或1.0.
  - gzip_proxied : 用于设置启用或禁用从代理服务器上收到相应内容gzip压缩。
  - gzip_vary : 用于在响应消息头中添加Vary：Accept-Encoding,使代理服务器根据请求头中的Accept-Encoding识别是否启用gzip压缩。