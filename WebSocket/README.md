# WebSocket

## 简介

WebSocket 是一种网路传输协议，可在单个TCP连接上进行**全双工**通讯，位于OSI模型的应用层

特点：

+ TCP连接，与HTTP协议兼容
+ 双向通讯，主动推送（服务端向客户端）
+ 无同源限制，协议标识符ws（加密wss）

## 常用库

+ ws（实现原生协议，特点：通用、性能高、定制性强）
+ socket.io（向下兼容协议、特点：适配性强、性能一般）