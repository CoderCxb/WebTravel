# JSON
JSON是一种轻量级数据格式，可以方便地表示复杂的数据结构。ES5中定义了JSON对象，JSON.stringify()用于将Javascript对象序列化成JSON字符串，JSON.parse()将JSON字符串解析成Javascript对象。

## 语法

### 支持数据类型
  - 基本数据类型： 字符串（string）、数值（number）、布尔值（boolean）和null，不支持undefined、BigInt、Symbol
  - 引用数据类型：对象、数组

### 特点
  - JSON没有分号
  - JSON不存在变量声明
  - 字符串必须使用双引号("")，包括属性名。
  - 对象和数组的最后一个属性后不能有逗号(,)
  
## 序列化与解析

### toJSON
toJSON的返回值决定对象序列化时的value，默认情况下就是对象本身，但是可以手动修改对象的toJSON方法
```javascript
let obj = {};
console.log(JSON.stringify(obj)); // {}

// 定义了toJSON方法以后，序列化时将会序列化toJSON的返回值
obj.toJSON = () => ({ title : 'toJSON' });
console.log(JSON.stringify(obj)); // {"title":"toJSON"}
```

### JSON.stringify

JSON.stringify用于将Javascript的值序列化成JSON字符串，接收以下三个参数。

#### 参数列表
  - value: 将要序列化成JSON字符串的值
  - replacer(可选): 序列化规则
    - 数组: 只有数组中的属性名会被序列化到JSON字符串
    - 函数: 被序列化的属性都会经过函数的转换处理
    - null或者不提供: 所有属性都会被序列化
  - space(可选): 控制缩进
    - 数字: 缩进的空格数，上限为10，小于1时，代表没有空格
    - 字符串: 该字符串代替空格作为缩进,字符串长度>10时，截取前10个字符
    - null或者不提供: 没有空格


#### 演示
```javascript
// 基本数据类型演示
console.log(JSON.stringify(0001024));      // 1024,JSON会去除前导0
console.log(JSON.stringify('1024'));       // "1024"
console.log(JSON.stringify(null));         // null
console.log(JSON.stringify(true));         // true

// 基本数据类型的包装对象会被转换成原始值再序列化
console.log(JSON.stringify(new String('1024'))); // "1024"

// NaN和Infinity会被转换成null
console.log(JSON.stringify(NaN));
console.log(JSON.stringify(Infinity));

// undefined、函数、symbol 在数组中序列化时，转换成null
console.log(JSON.stringify([1024, undefined, function(){}, Symbol('')])); // [1024,null,null,null]

// undefined、函数、symbol 在对象中直接被忽略
console.log(JSON.stringify({u:undefined,f :function(){},s:Symbol('')})); // {}

// 单独转换undefined和函数或者不传值(等价于传递undefined)时,返回undefined
console.log(JSON.stringify()); // undefined
console.log(JSON.stringify(undefined)); // undefined
console.log(JSON.stringify(function(){})); // undefined

// Date对象内置了toJSON()将其转换成字符串,同Date.toISOString()，因此等价于字符串
console.log(JSON.stringify(new Date())); // "2021-11-18T09:34:40.202Z"

// JSON.stringify只能序列化对象自身的可枚举属性，无法序列化不可枚举属性
const obj = {}
Object.defineProperty(obj,'hideKey',{
  value:'hideValue',
  enumerable: false, // 默认就是false,改为true就可以枚举并序列化
})
// 原型对象不可枚举
Object.setPrototypeOf(obj, { sourceKey: 'sourceValue'}); // 给obj设置原型对象
console.log(obj.sourceKey);       // sourceValue
console.log(obj.hideKey);         // hideValue
console.log(JSON.stringify(obj)); // {}

// 正则表达式等价于普通对象,其本身是没有属性的,无法序列化其原型上的方法和属性
console.log(typeof /zzbds/); // object
console.log(JSON.stringify(/zzbds/)); // {}

// 循环引用的对象序列化会报错
const o1 = {};
const o2 = { o1 };
o1.o2 = o2;  // 此时o1和o2互相引用
console.log(JSON.stringify(o1)); // TypeError: Converting circular structure to JSON

// 序列化BigInt类型的值会报错
console.log(JSON.stringify(1024n)); // TypeError: Do not know how to serialize a BigInt

// Javascript对象
const info = {
  project: 'Web Travel',
  type: 'JSON',
  author: 'ME',
}

// replacer - 数组,序列化后保留该数组中的属性
console.log(JSON.stringify(info,['project', 'type']));

// replacer - 函数较于数组更加灵活，以下实现和数组一样的功能
// replacer的返回值如果是基本数据类型，则序列化后直接加入JSON字符串
// 如果返回值时引用数据类型，返回递归对每个属性执行replacer函数
console.log(JSON.stringify(info,(key,value)=>{
  const saveArr = ['project', 'type'];
  // 接收最外层对象时,key是空字符串''
  if(key === '') return value;
  // 如果key在数组中，则返回value
  if(saveArr.includes(key)) return value;
}));
// 以上两个log打印结果都是  // {"project":"Web Travel","type":"JSON"}


// 以上的JSON.stringify没有space,因此非常紧凑
// 以下是传入space的用法,replacer传入null,序列化所有属性
// 也可以传入字符串,此处就不演示了,有兴趣可以尝试一下
console.log(JSON.stringify(info,null,2));
// {
//   "project": "Web Travel",
//   "type": "JSON",
//   "author": "ME"
// }
```


### JSON.parse

JSON.parse用于将JSON字符串转换为JavaScript的值，接收两个参数

#### 参数列表
  - value: 将要解析的JSON字符串
  - reviver(可选): 解析规则，用来修改解析生成的原始值，接收**符合JSON规则的字符串**

#### 演示
```javascript

const JsonStr = '{"project":"Web Travel","type":"JSON"}';
// 解析基本数据类型和引用数据类型
console.log(JSON.parse('1024'));   // 1024
console.log(JSON.parse('"1024"')); // "1024"
console.log(JSON.parse('true'));   // true
console.log(JSON.parse('null'));   // null
console.log(JSON.parse(JsonStr)); // { project: 'Web Travel', type: 'JSON' }

// 无法解析前导0的数字,因为JSON.stringify忽略的前导0，因此数字是不会有前导0的
console.log(JSON.parse('01024'));

// reviver函数
console.log(JSON.parse(JsonStr,(key, value)=>{
  // 如果到达最顶层时(解析完成，value是最终还原的值)，key为''
  if(key === '') return value;
  // 现在删除一个key为type的属性
  if(key === 'type'){
    // 如果返回undefined，则删除属性
    return undefined;
  }
  // 其他情况，改为大写
  return value.toUpperCase();
}));   //  { project: 'WEB TRAVEL' }

// JSON.parse返回的引用数据类型 只有 Object 和 Array
// JSON.stringify序列化的时候，原型由于不可枚举因此被忽略，所以正常JSON.parse出来的话只会是Object或者Array
class Person{}
const p = new Person();
console.log(p instanceof Person);
// 先序列化再解析以后,p就不是Person的实例了
console.log(JSON.parse(JSON.stringify(p)) instanceof Person);

```

## 面试题
::: details 1. JSON?
未完待续
:::