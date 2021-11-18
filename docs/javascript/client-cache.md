# 客户端缓存
随着Web应用程序的发展，在客户端存储信息的需求不断增加，如登陆信息、个人偏好以及其他数据。较早的解决方案为cookie，而如今还有WebStorage以及IndexDB可供选择。

## Cookie
HTTP Cookie通常也叫做cookie，由于HTTP协议是无状态的，即客户端和服务器之间的网络请求是彼此独立，无法辨别彼此身份，cookie可用于存储状态信息，使客户端和服务器可以辨别身份。

cookie虽然可以作为客户端存储，但是容量小、操作不便并且影响性能。因此cookie适合用来存储少量、非私密的信息。客户端存储应该使用WebStorage和IndexDB。

例： 浏览器请求两次，如果没有cookie的情况下，那服务器无法得知这两个请求是来自同一个客户端。而如果浏览器有cookie的话，每次发送请求携带cookie，服务器就可以根据cookie中的信息区分客户端。

### 创建cookie
cookie除了从服务器响应头创建，浏览器也可以创建cookie

#### 服务器创建
服务端通过在响应头添加set-cookie的方式，浏览器接受到后会保存下cookie

```javascript
// 响应头 - Response Headers
HTTP/1.1 200 OK 
content-type: text/plain; charset=utf-8
set-cookie: name=value;path=/;
...

// 服务器和浏览器跨域时, 浏览器不会对服务器返回的cookie进行保存
// 发送请求时需要特别处理一下即可

// Fetch请求添加credentials:'include'， 
fetch('http://webtravel.com/',{
  credentials:'include',
})

// XMLHttpRequest设置withCredentials: true。
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://webtravel.com/', true);
xhr.withCredentials = true;
xhr.send(null);

// 未完待续 - 网络请求
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
控制台 -> Application -> Storage -> Cookies

<img src='/images/check_cookie.png'>

#### 常用库 
通过docoment.cookie的方式虽然可以操作cookie，但是使用还是比较不方便的，可以通过第三方的库对cookie进行操作。
<NpmBadge package="cookie" distTag='0.4.1' />

## Web Storage
Storage（Web Storage）提供了访问特定域名下到会话存储和本地存储到功能，它定义了两个对象：localStorage和sessionStorage,其中localStorage是本地存储，即永久存储（可手动清空），而sessionStorage是会话存储，即会话（浏览器上所有该域名的标签）关闭时清空。

### Storage API
localStorage和sessionStorage都是继承自Storage，拥有相同的API，以下是localStorage使用的代码演示，sessionStorage使用方法完全相同。
```javascript
// storage事件，本页面通过代码设置storage不会触发(控制台修改可以)，监听同域名的其他页面设置storage
// 查看：控制台 -> Application -> Storage -> Local Storage/Session Storage
// 用法：同域名时可以用来在窗口间传递数据
window.addEventListener("storage",function(e){
// key: 修改的键值。当被clear()方法清除之后该属性值为null。（只读）
// newValue: 修改后的新值。当被clear()方法清理后或者该键值对被移除，newValue 的值为 null 。（只读）
// oldValue: 修改前的原值。在设置新键值对时由于没有原始值，该属性值为 null。（只读）
// storageArea: 被操作的storage对象。（只读）
// url: 触发storage事件的URL地址。（只读）
  console.log('StorageEvent', e);
})

// 1. 设置storage
localStorage.setItem('project','webtravel');
// 也可以直接操作localstorage
// localStorage.age=10;
// 2. 通过key获取值
console.log(localStorage.getItem('project'));
// 3. storage的长度
console.log(localStorage.length);
// 4. 通过第x个key
console.log(localStorage.key(0));
// 5. 移除某个key对应的值
// localStorage.removeItem('project');
// delete localStorage.project
// 6. 清空storage
// localStorage.clear();
console.log(localStorage);
```
### 存储对象
Storage存储形式为key-value的形式，需要注意点是value只能够是字符串，因此想使用storage存储对象，则需要利用JSON.stringify()和JSON.parse()，而JSON的使用存在需要注意点地方，可参考[JSON](/javascript/json.html)


```javascript
const info = {
  'title': 'storage'
}
// 使用JSON.stringify 将对象转换成字符串进行存储
localStorage.setItem('info', JSON.stringify(info))

// 使用JSON.parse 将JSON格式的字符串转换成对象
console.log(JSON.parse(localStorage.getItem('info')));
```



## IndexDB


## 面试题
::: details 1. 为什么使用IndexDB?
未完待续
:::
