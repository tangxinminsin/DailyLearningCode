## CentOS 7.3  安装Nginx

+ 编辑

  + vim /etc/yum.repos.d/nginx.repo

+ ```shell
  [nginx-stable]
  name=nginx stable repo
  # 7 为centos版本
  baseurl=http://nginx.org/packages/centos/7/$basearch/
  gpgcheck=1
  enabled=1
  gpgkey=https://nginx.org/keys/nginx_signing.key
  module_hotfixes=true
  ```
  
+ 安装

  + yum install nginx（最新稳定版）
  + yum install nginx-1.16.1（指定版本）

+ 查看版本

  + nginx -V

+ 列出nginx目录列表
  + rpm  -ql nginx

## 文件目录

```shell
// 配置文件 

// Nginx日志轮转，用于logrotate服务日志切割
/etc/logrotate.d/nginx

// Nginx主配置文件
/etc/nginx
/etc/nginx/nginx.conf
/etc/nginx/conf.d
/etc/nginx/conf.d/default.conf

// cgi配置相关、fastcg配置
/etc/nginx/fastcgi_params
/etc/nginx/scgi_params
/etc/nginx/uwsgi_params

// 编码转换映射文件（当前1.20.1没有这几个文件）
/etc/nginx/koi-utf
/etc/nginx/koi-win
/etc/nginx/win-utf

// 设置http协议的Content-Type与扩展名对应关系
/etc/nginx/mime.types

// Nginx模块目录
/etc/nginx/modules
/usr/lib64/nginx/modules

// 用于配置出系统守护进程管理器管理方式
/usr/lib/systemd/system/nginx-debug.service
/usr/lib/systemd/system/nginx.service

//Nginx服务的启动管理的终端命令
/usr/sbin/nginx
/usr/sbin/nginx-debug

// Nginx的手册和帮助文件
/usr/share/doc/nginx-1.20.1
/usr/share/doc/nginx-1.20.1/COPYRIGHT
/usr/share/man/man8/nginx.8.gz

// 缓存和日志目录
/var/cache/nginx
/var/log/nginx

/usr/lib/.build-id
/usr/lib/.build-id/1d
/usr/lib/.build-id/1d/3ae6e2bbd9ecc1b968a5b9272ba0f431827ac1
/usr/lib/.build-id/e8
/usr/lib/.build-id/e8/4bc53181babc7ef9cb59c1239522ffe45d375b
/usr/lib64/nginx
/usr/libexec/initscripts/legacy-actions/nginx
/usr/libexec/initscripts/legacy-actions/nginx/check-reload
/usr/libexec/initscripts/legacy-actions/nginx/upgrade
/usr/share/nginx
/usr/share/nginx/html
/usr/share/nginx/html/50x.html
/usr/share/nginx/html/index.html


```



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

## 访问权限/请求限制

### 访问权限

+ 基础

  ```nginx
   location / {
          deny   123.9.51.42;// 禁止访问
          allow  45.76.202.231;// 允许访问
      }
  ```

+ 优先级（**同一个块下的两个权限指令，先出现的设置会覆盖后出现的设置**）

  ```nginx
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

  ```nginx
  location =/static{
        allow  all;// 允许访问
      }
  location =/admin{
        deny  all;// 禁止访问
      }
  ```

+ 正则匹配（用于文件）

  ~ +正则表达式，正则匹配以js结尾的文件

  ```nginx
  location  ~\.js${
        deny  all;// 允许访问
      }
  ```

### 请求限制

+ 连接频率限制-limit-conn-module

  ```nginx
  Syntax:limit_conn_zone key zone=name:size;
  Default:——;
  Content:http; 
  ```

  ```nginx
  Syntax:limit_conn zone number;//结合上面定义的zone,number:并发数
  Default:——;
  Content:http,server,location; 
  ```

+ 请求频率限制-limit-req-module

  ```nginx
  Syntax:limit_req_zone key zone=name:size rate=rate;
  Default:——;
  Content:http; 
  ```

  ```nginx
  Syntax:limit_req zone=name [burst=number][nodelay];
  Default:——;
  Content:http,server,location; 
  ```

+ 示例

  ```nginx
  limit_conn_log_level error;  #定义当服务器由于limint被限制或缓存时，配置写入日志。延迟的记录比拒绝的记录低一个级别。例子：limit_req_log_level notice延迟的的基本是info。
  limit_conn_status 589;  #当客户端配置得并发数超过了nginx限制的数量后会返回的状态值
  limit_conn_zone $binary_remote_addr zone=one:10m;
  limit_conn_zone $server_name zone=perserver:10m;
  limit_req_zone $binary_remote_addr zone=allips:100m rate=20r/s;
  
  
  server {
          listen   8888;
          access_log  /var/log/nginx/example_http.log;
          location /status {
                  stub_status on;
                  access_log off;
                  allow 127.0.0.1;
                  allow 10.0.17.27;
                  allow 10.0.1.142;
                  deny all;
          }
          location / {
          limit_conn one 5;  #限制每个用户连接到服务器的数量
          limit_conn perserver 2000;#限制连接到服务器的总数
          limit_req zone=allips burst=200 nodelay;
                  proxy_http_version 1.1;
                  proxy_set_header Connection "";
                  proxy_pass http://test;
                  #Proxy Settings
                  proxy_redirect     off;
                  proxy_set_header   Host             $host;
                  proxy_set_header   X-Real-IP        $remote_addr;
                  #proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
                  proxy_set_header   X-Forwarded-For  $http_x_forwarded_for;
                  proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
                  proxy_ignore_client_abort  on;
                  proxy_max_temp_file_size 0;
                  proxy_connect_timeout      90;
                  proxy_send_timeout         90;
                  proxy_read_timeout         90;
                  proxy_buffer_size          4k;
                  proxy_buffers              4 32k;
                  proxy_busy_buffers_size    64k;
                  proxy_temp_file_write_size 64k;
          }
  }
  
  $binary_remote_addr:远程的访问地址，此处以二进制的形式记录
  zone:=one:10m :设置一个名字为one,大小为10M的缓存空间
  rate=10r/s: 限制访问速率，此处设置为每秒接受10个请求（nging里是按ms及时的，此处为s）
  zone=one:指定使用名字为one的这个缓存空间，若没有设置burst参数，结合上文，此处的配置表示为每秒接受请求10个
  burst=5:因为我们的流量并不是向漏桶一样每时每刻都是匀速的，所以为了避免某一时刻出现大规模的流量出现，所以我们添加burst参数，此处配置表示为，设置一个大小为5的缓冲区，当有大量请求（爆发）过来时，访问超过了上面的限制可以先放到缓冲区内。
  nodelay:一般是和burst一起使用的，如果设置了nodelay，当访问超过了频次而且缓冲区也满的情况下会直接返回503，如果设置了，则所有大的请求会等待排队。
  ```

  

## 设置虚拟主机

配置虚拟主机可以基于端口号、基于IP和基于域名

### 基于端口号配置虚拟主机

新增配置文件

```nginx
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
  - 功能性：反向代理的主要用途是为多个服务器提供负债均衡、缓存等功能。负载均衡就是一个网站的内容被部署在若干服务器上，可以把这些机子看成一个集群，那求“均匀地”分配到这个集群中所有的服务器上，从而实现服务器压力的平均分配，也叫负载均衡。

+ 通过访问www.xxx.com反向代理到hhh.com这个网站

```nginx
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

```nginx
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

  ```nginx
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

## 编译参数

```shell
 // 基础目录/路径
 --prefix=/etc/nginx 
 --sbin-path=/usr/sbin/nginx 
 --modules-path=/usr/lib64/nginx/modules 
 --conf-path=/etc/nginx/nginx.conf 
 --error-log-path=/var/log/nginx/error.log 
 --http-log-path=/var/log/nginx/access.log 
 --pid-path=/var/run/nginx.pid 
 --lock-path=/var/run/nginx.lock 
 // 执行对应模块时，Nginx所保留的临时性文件
 --http-client-body-temp-path=/var/cache/nginx/client_temp 
 --http-proxy-temp-path=/var/cache/nginx/proxy_temp 
 --http-fastcgi-temp-path=/var/cache/nginx/fastcgi_temp 
 --http-uwsgi-temp-path=/var/cache/nginx/uwsgi_temp 
 --http-scgi-temp-path=/var/cache/nginx/scgi_temp 
 // 设定Nginx进程启动的用户和组用户
 --user=nginx 
 --group=nginx 

 --with-compat 
 --with-file-aio 
 --with-threads 
 --with-http_addition_module 
 --with-http_auth_request_module 
 --with-http_dav_module 
 -with-http_flv_module 
 --with-http_gunzip_module 
 --with-http_gzip_static_module 
 --with-http_mp4_module 
 --with-http_random_index_module // 目录中选择一个随机主页
 --with-http_realip_module 
 --with-http_secure_link_module 
 --with-http_slice_module 
 --with-http_ssl_module 
 --with-http_stub_status_module // Nginx的客户端状态
 --with-http_sub_module // HTTP内容替换
 --with-http_v2_module 
 --with-mail 
 --with-mail_ssl_module 
 --with-stream 
 --with-stream_realip_module 
 -with-stream_ssl_module 
 --with-stream_ssl_preread_module 
 // 设置额外的参数将被添加到CFLAGS(cflags)变量
 --with-cc-opt='-O2 -g -pipe -Wall -Werror=format-security -Wp,-D_FORTIFY_SOURCE=2 -Wp,-D_GLIBCXX_ASSERTIONS -fexceptions -fstack-protector-strong -grecord-gcc-switches -specs=/usr/lib/rpm/redhat/redhat-hardened-cc1 -specs=/usr/lib/rpm/redhat/redhat-annobin-cc1 -m64 -mtune=generic -fasynchronous-unwind-tables -fstack-clash-protection -fcf-protection -fPIC' 
 // 设置附加的参数，链接系统库
 --with-ld-opt='-Wl,-z,relro -Wl,-z,now -pie'
```

## Nginx配置项

+ nginx.conf

```nginx

user  nginx;    #设置nginx服务的系统使用用户
worker_processes  auto;     #工作进程数（最好和cpu个数保持一致）

error_log  /var/log/nginx/error.log notice;      #nginx的错误日志 错误日志级别有debug | info | notice | warn | error | crit | alert | emerg
pid        /var/run/nginx.pid;     #nginx服务启动时候的pid

#事件模块
events {
    worker_connections  1024; #每个进程的最大连接数
        #use    auto;  #工作进程数
}


http {
    include       /etc/nginx/mime.types; 
    default_type  application/octet-stream;

    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    keepalive_timeout  65;

    #gzip  on;

    include /etc/nginx/conf.d/*.conf; //子配置项，包含server
}

```

+ server

```nginx
server {
    listen       8082;
    server_name  106.15.251.24;

    #access_log  /var/log/nginx/host.access.log  main;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
    }

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ \.php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .ht access files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /\.ht {
    #    deny  all;
    #}
}


```

## Nginx 模块

nginx -V 打印官方已经开启的模块

### --with-http_stub_status_module

+ Nginx的客户端状态，用于监控nginx连接信息

+ 配置语法

  ```nginx
  Syntax:stub_status;
  Default:——;
  Content:server,location; // 可以在server下也可以在location下
  ```

+ default.conf

  ```nginx
     location /stub_status {
       	stub_status;
     }
  ```

+ 重启

  + nginx -t -c /etc/nginx/nginx.conf
  + nginx -s reload -c /etc/nginx/nginx.conf

+ 打开浏览器输入地址：http://106.15.251.24:8082/stub_status

  ```
  Active connections: 1 
  server accepts handled requests
   9 9 7 
  Reading: 0 Writing: 1 Waiting: 0 
  ```

### --with-http_random_index_module 

+  目录中选择一个随机主页

+ 配置语法

  ```nginx
  Syntax:random_index on|off;
  Default:random_index off;
  Content:location; // 只可以在location下配置
  ```

### --with-http_sub_module

+ HTTP内容替换

+ 配置语法

  ```nginx
  Syntax:sub_filter string(要替换的内容) replacement(替换后的内容);
  Default:——;
  Content:http,server,location; 
  ```

  ```nginx
  Syntax:sub_filter_last_modified on|off; // 校验服务端内容是否发生了变更（用于缓存）
  Default:sub_filter_last_modified off;
  Content:http,server,location; 
  ```

  ```nginx
  Syntax:sub_filter_once on|off; // sub_filter一起使用关闭后可将所有“string”替换
  Default:sub_filter_once on;
  Content:http,server,location; 
  ```

  

## 常用命令

+ 打印文件内容
  + tail -f /var/log/nginx/error.log
+ 检查配置文件
  + nginx -t -c /etc/nginx/nginx.conf
    + -t 检查配置文件
    + -c 配置文件路径检查

## ab压力测试

+ 安装

  yum -y install httpd-tools

+ 参数

  ```nginx
  -A：指定连接服务器的基本的认证凭据；
  -c：指定一次向服务器发出请求数；
  -C：添加cookie；
  -g：将测试结果输出为“gnuolot”文件；
  -h：显示帮助信息；
  -H：为请求追加一个额外的头；
  -i：使用“head”请求方式；
  -k：激活HTTP中的“keepAlive”特性；
  -n：指定测试会话使用的请求数；
  -p：指定包含数据的文件；
  -q：不显示进度百分比；
  -T：使用POST数据时，设置内容类型头；
  -v：设置详细模式等级；
  -w：以HTML表格方式打印结果；
  -x：以表格方式输出时，设置表格的属性；
  -X：使用指定的代理服务器发送请求；
  -y：以表格方式输出时，设置表格属性。
  ```

+ 示例

  ab -n 50 -c 20 http://106.15.251.24:8083/3.html

