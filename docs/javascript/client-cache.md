# 客户端缓存

## Cookie
HTTP Cookie通常也叫做cookie，由于HTTP协议是无状态的，即客户端和服务器之间的网络请求是彼此独立，无法辨别彼此身份，cookie可用于存储状态信息，使客户端和服务器可以辨别身份。

例： 浏览器请求两次，如果没有cookie的情况下，那服务器无法得知这两个请求是来自同一个客户端。

### 创建cookie
cookie除了从服务器响应头设置，浏览器也可以设置cookie

#### 服务器创建
服务端通过设置set-cookie请求头的方式进行设置
```javascript
// 响应头 - Response Headers
HTTP/1.1 200 OK 
content-type: text/plain; charset=utf-8
set-cookie: name=value;path=/;
...
```


#### 浏览器创建
浏览器通过document.cookie进行设置,使用(;)进行分割 
```javascript
document.cookie = `
  name=value;
  path=/;
  max-age=3600;
  Expires=Wed, 21 Oct 2015 07:28:00 GMT`;
```

### 参数列表
**参数名称不区分大小写**
  - name
    - 详情：cookie的唯一标识，不区分大小写
    - 必填：true
  - value
    - 详情：存储在cookie中的值
    - 必填：true
  - domain
    - 详情：cookie有效的域，发送到这个域的所有请求会包含这个cookie，默认值为设置cookie的域
    - 必填：false
  - path
    - 详情：请求的URL包含这个path才会发送cookie到服务器
    - 必填：false
    - 注：
      - ```指定path=/test，www.webtraval.com/test 会发送cookie，而 www.webtraval.com 不会发送```
      - ```指定path=/test，/test路径开头的URL都会匹配，如/test/index，test/home```
  - expires
    - 详情：过期日期，GMT格式，如 Fri, 31 Dec 2021 23:59:59 GMT, 如果设置为过去的时间，则删除cookie。
    - 必填：false
  - max-age
    - 详情:cookie失效时间，单位秒，如果是正数，则在max-age秒后失效。如果是负数，则cookie为临时cookie，关闭浏览器即失效。如果是0，则删除该cookie。默认为负数，即临时cookie。
    - 必填：false
    - 优先级大于expires，即同时设置expires和max-age，max-age生效。
    - 注：当max-age为负数或者不设置max-age和expires时，Expires/Max-Age列(控制台中)取值为Session，即临时/会话cookie，关闭浏览器时清除。
  - secure
    - 详情：安全标识，只在使用SSL安全连接时（HTTPS协议）才会发送cookie到服务器。
    - 必填：false
    - 不需要取值，直接 secure; 即可
  - HttpOnly
    - 详情：是否只能通过客户端的HTTP请求获取cookie，如果设置为true，则JS脚本无法获取，如 document.cookie、XMLHttpRequest、Fetch，默认为true。
    - 必填：false
    - document.cookie无法访问带有 HttpOnly 属性的cookie，所以在客户端无法设置一个带有HttpOnly属性cookie，这类cookie是由服务器设置的。
  - SameSite
    - 详情：SameSite Cookie决定cookie在跨域请求时是否被发送。
    - 必填：false
    - 取值：
      - None：无论是否跨域，浏览器的请求都会携带cookie
      - Strict：跨域时，浏览器的请求不会携带cookie - 可以看成指定了domain
      - Lax：同Strict，但是不同的是：以\<a hef='...' />、\<link rel="prerender" href="..."/>、\<form method="GET" action="...">跳转到url时，取值为Lax可以携带cookie


### 使用限制
不同的浏览器对于cookie的限制不同，通常只要遵守以下限制，就不会碰到问题
  - 不超过300个cookie
  - 每个cookie不超过4096字节(4KB)
  - 每个域不超过20个cookie
  - 每个域不超过81920字节

### 查看cookie
开发者工具 -> Application -> Storage -> Cookies

<img src='/images/check_cookie.png'>

## Web Storage


## IndexDB


## 面试题
::: details 1. 为什么使用IndexDB?
在使用 vuepress-vite Package 时，默认的打包工具会被设置为 '@vuepress/vite' 。 
:::

::: details 1. 为什么使用IndexDB?
在使用 vuepress-vite Package 时，默认的打包工具会被设置为 '@vuepress/vite' 。 
:::