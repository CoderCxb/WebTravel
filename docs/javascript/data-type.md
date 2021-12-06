# 数据类型

## 基本数据类型
基本数据类型(原始值/原始数据类型): 无方法、无对象、无法修改的数据

当前Javascript中有7种基本数据类型：**string、number、boolean、null、undefined、symbol(ES6)、BigInt(ES10)**

### 无法修改
```javascript
// 示例
let str = 'hello';
str = 'hi';        // 赋值其实修改的是变量存储的值,'hello'本身并没有改变
str.toUpperCase(); // 转换成大写

let num = 1024;
num * 2;
console.log(num); // 1024

// 结论：基本数据类型无法修改，你可以修改的只是存储在某个变量上的值
// 你对数字、字符串做操作，本质上返回的也是一个新的数字、字符串

```

### 基本数据类型的构造函数
```javascript
// 基本数据类型除了null和undefined,都存在其构造函数
// 构造函数主要有两种用法
// 1. 创建包装对象
// 加上new关键字，创建对应的包装对象,其valueOf方法返回基本数据类型
// 演示String,其他几个同理,Symbol不能使用new关键字
const strObj = new String('Data Type'); 
console.log(strObj);           // [String: 'Data Type']
console.log(typeof strObj);    // object, 包装对象，顾名思义，是对象类型
console.log(strObj.valueOf()); // Data Type

// 前面说到过，基本数据类型没有方法，那为什么我们可以使用方法呢？
// 答：本质上是JS引擎将基本数据类型转换成了对应的包装对象
console.log('Data Type'.toLowerCase());
// 开发者使用的时候是感知不到的,相当于
console.log(new String('Data Type').toLowerCase());


// 2. 转换数据类型
// 当构造函数不使用new关键字时，它就变成了转换函数，用于转换数据类型
console.log(String(1024));   // '1024', 等价于 '' + 1024

console.log(Boolean(''));    // false,  等价于 !!''

console.log(Number('!'));    // NaN,    等价于 +'!'

console.log(Symbol('s'));    // Symbol(s)

console.log(BigInt('1024')); // 1024n

```

### string
string(字符串)代表0或多个16位Unicode字符序列，可以使用单引号('')、双引号("")和反引号(``)表示。
```javascript
const ssx = '孙尚香';
const mk = "马可波罗";
const gsl = `公孙离`;
```
###### 字符字面量
| 字面量  | 含义 |
|   :----:  |   :----: | 
| \n | 换行  |
| \r | 回车  |
| \t | 制表符  |
| \b | 退格  |
| \f | 换页，其实就是换行，然后前面填充空格至上一行的长度  |
| \\ | 反斜杠(\)  |
| \' | 单引号,字符串以单引号表示时使用,如 `'He\'s code is nice'`  |
| \" | 双引号,字符串以双引号表示时使用,如 `"He said \"Hi\""`  |
| \` | 反引号,字符串以反引号表示时使用,如 ``` `He said \`Hi\`` ```  |  |

###### 转换成字符串
```javascript
// 1. 使用 '' + 
console.log('' + 1024);        // '1024'

// 2. 使用构造函数
console.log(String(1024));     // '1024' 

// 3. toString方法,null和undefined没有
console.log(1024..toString()); // '1024' ,为什么是..，因为数字存在小数点，用于区分
```

###### 模版字符串 <Badge text='ES6' />
ES6新增了模版字符串，其具有可以换行以及使用变量的能力,使用 ``定义。
```javascript
// 1. 跨行定义字符串, ""和''则不行
const str = `
  line 1,
  line 2,
`;

// 2. 在``中使用变量,需要使用${}包裹
const date = 1024;
console.log(`${date}是程序员节!`); // 1024是程序员节!
// 相当于
console.log(date + '是程序员节!'); // 1024是程序员节!
// 和字符串拼接相比，模板字符串更加简洁
```

###### 字符串常用方法
以下演示的是最基本的用法，详细用法需参考 [MDN - String](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
```javascript
// chatAt(index) 获取字符串index位置的字符
console.log('Easy'.charAt(0)); // E 

// charCodeAt(index) 获取字符串index位置字符对应的Unicode值
console.log('Hard'.charCodeAt(0)); // 72,  H对应的是72

// concat(str) 拼接字符串,可接受多个字符串
console.log('Learn '.concat('String ', '!')); // Learn String !

// startsWith(str) 是否以str开头，返回值是 true/false
console.log('Learn String!'.startsWith('Learn'));       // true

// endsWith(str) 是否以str结尾,返回值是 true/false
console.log('Learn String!'.endsWith('!'));       // true

// includes(str) 是否包含返回str, true/false
console.log('Learn String!'.includes('String')); // true

// indexOf(str) 左->右，返回找到的第一个索引值,不存在返回 -1 
console.log('Learn String!'.indexOf('String'));     // 6

// lastIndexOf(str) 右边->左，返回找到的第一个索引值,不存在返回 -1 
console.log('Learn String!'.lastIndexOf('String')); // 6


// padStart(length,padString)和padEnd(length,padString)
// padStart左侧填充，padEnd右侧填充，将字符串填充到length长度
console.log('Me'.padStart(5,'-'));  // ---Me
console.log('Me'.padEnd(5,'-'));    // Me---

// repeat(count)  重复字符串cout次
console.log('.'.repeat(3)); // ...

// replace(oldStr,newStr) 替换字符串,支持正则表达式
console.log('This is easy'.replace('easy', 'hard')); // This is hard

// slice(start,end) 提取start~end部分的字符串作为新字符串返回，不影响原本的字符串
console.log('Easy Hard'.slice(0,4)); // Easy

// split(str) 以str对原字符串进行切割放入数组并返回
console.log('abcde'.split('')); // [ 'a', 'b', 'c', 'd', 'e' ]
// 以空格切割成数组更推荐使用 
console.log('😊'.length);      // 2,可以看出,emoji表情占两个字符长度 
console.log('😊'.split(''));   // [ '�', '�' ],以''切割,😊会被切割成两个字符放入数组
console.log([...'😊']);        // ['😊'],正常转换成数组
console.log(Array.form('😊')); // ['😊'],正常转换成数组

// substring(start,end) 返回索引值 start～end的字符串，不包含索引为end到字符
console.log('How are you?'.substring(4,7)); // are

// toLocaleLowerCase()转小写，toLocaleUpperCase()转大些
console.log('Nice'.toLocaleLowerCase()); // nice
console.log('Nice'.toLocaleUpperCase()); // NICE


// trim()去除两侧空格,trimStart()去除左侧空格，trimEnd()去除右侧空格
console.log('  Me  '.trim());     // Me
console.log('   Me'.trimStart()); // Me
console.log('Me   '.trimEnd());   // Me

```

### number
数值类型，用于表示数字，包括整数和浮点数
###### 数字字面量
```javascript
let one = 1;           // 十进制 1
let three =  0b11;     // 二进制 3, 0b开头
let nine = 011;        // 八进制 9, 0开头
let twenty_six = 0x1A; // 十六进制 26, 0x开头
// 十六进制:0 1 2 3 4 5 6 7 8 9 A B C D E F 分别是 0 到 15

let percent90 = 0.9;   // 浮点数 
``` 

###### 数字常量和方法
以下演示的是最基本的用法，详细用法需参考 [MDN - Number](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)

```javascript
// Number常量

console.log(Number.NaN); // NaN

// Number.MIN_SAFE_INTEGER 代表在 JavaScript中最小的安全的integer型数字 (-(2**53 - 1))
console.log(Number.MIN_SAFE_INTEGER === -(2 ** 53 - 1)); // true

// Number.MIN_VALUE 属性表示在 JavaScript 中所能表示的最小的正值
console.log(Number.MIN_VALUE);  // 5e-324

// Number.MAX_SAFE_INTEGER 常量表示在 JavaScript 中最大的安全整数，其值为2的53次方-1
console.log(Number.MAX_SAFE_INTEGER === 2 ** 53 - 1); // true, 

// MAX_VALUE属性值接近于1.79e+308，大于MAX_VALUE就是Infinity
console.log(Number.MAX_VALUE);  // 约等于 1.79e+308

console.log(1/0);  // Infinity
console.log(1/-0); // -Infinity
console.log(+Infinity); // Infinity,正无穷大
console.log(-Infinity); // -Infinity,负无穷大
console.log(Number.POSITIVE_INFINITY);  // Infinity,正无穷大
console.log(Number.NEGATIVE_INFINITY);  // -Infinity,负无穷大

// Number方法

// 1. Number.isNaN 判断值是否是NaN
console.log(Number.isNaN(NaN)); // true
// 如果不使用方法，那么可以判断
const n = NaN;
console.log(n!==n); // true, NaN是唯一一个不等于自身的值

// 2. Number.isFinite 是否是有穷数
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isFinite(1024));     // true

// 3. Number.isInteger 是否是整数
console.log(Number.isInteger(1024)); // true
console.log(Number.isInteger(0.99)); // false

// 4. Number.parseInt和Number.parseFloat
// 第二个参数可以指定进制,默认10进制
// Number.parseInt 将字符串转换成整数,如果无法转换则返回NaN
console.log(Number.parseInt('3.14 Code'));   // 3
// Number.parseFloat 将字符串转换成整数,如果无法转换则返回NaN
console.log(Number.parseFloat('3.14 Code')); // 3.14
// 转换成数字优先使用parseInt和parseFloat，而不是Number

// 5. toFixed()方法 转换成保留几位小数的字符串
console.log(1024..toFixed(2)); // '1024.00' 

```

### boolean
布尔值有两个字面量，分别是true(真)和false(假)，用于表达真假

###### 布尔字面量
```javascript
const win = true;
const lose = false; 

// 布尔值区分大小写，只有全小写的true/false才是布尔值
// True,False这种都不是布尔值，而是标识符
```

###### truthy(真值)和falsy(假值)
和布尔值不同，真值表示会被转换成true的值,而falsy则是会被转换成false的值
目前的falsy值有**undefined、null、''、0、NaN以及false本身**,除去falsy值，其他都是真值

```javascript
// 可以通过Boolean()或者!!将值转换成true或者false
console.log(Boolean(undefined)); // false
console.log(!!undefined);  // false
 
// 真/假值在JS中使用非常频繁,常见有
if(true){console.log('真值')} // if条件判断,真值时才会执行代码块中的代码
const source = true && 80;   // 逻辑运算符 && 和 ||
true ? '真': '假'             // 三元运算符
```


### undefined
undefined表示声明未定义的变量/参数的初始值,undefined类型只有一个值undefined

undefined是全局对象的属性,同时也是一个字面量

```javascript
// 基本使用
let u1; // 默认没有进行赋值就是undefined 
let u2 = undefined; // 手动赋值undefined,不推荐

// 运算符时提及,void运算符返回undefined,平时不一定要这样写,但是如果看到要知道什么意思
let v = void 0;

// 访问对象上没有属性/方法
const obj = {};
console.log(obj.name); // undefined

// 函数参数没有传值
function test(num) {
  console.log(num);
}
test(); // undefined

// 函数没有return,默认返回undefined
function test(){}
console.log(test()); // undefined 
```

### null
null类型只有一个值null,是一个字面量，指代一个空指针，即未设置值的对象
```javascript
let obj = null; 
obj = {};

// 需要注意一点,也是面试常问
console.log(typeof null); // 'object'
// 原因
// 在JS中, 值是有一个表示类型的标签和实际值组成,对象的标签为0
// null表示空指针、对象无引用,其标签也是0 (早期设计,现在无法修复)
// 而typeof是根据标签来判断的,所以typeof null返回 'object'
```

###### null 和 undefined 异同
```javascript
// 相同点:
// 1. 都是falsy 
console.log(!!null); // false
console.log(!!undefined); // false

// 2. 在JS,null和undefined非严格相等
console.log(null == undefined); // true
console.log(null === undefined); // false

// 3. 无妨访问属性和方法,因为无构造函数
// 前情回顾
// 3.1 null和undefined是没有构造函数的
// 3.2 基本数据类型是没有属性和方法的
// 3.3 基本数据类型能调用属性和方法是因为JS引擎使用构造函数将其转换成包装对象
// 综上所述,null和undefined没有属性和方法,不能访问,否则报错:无法从null/undefined获取属性 
console.log(undefined.title); // 报错:Cannot read property 'title' of undefined
console.log(null.title); // 报错:Cannot read property 'title' of null


// 不同点:
// 1. 含义不同
// null表示空指针、对象无引用地址,而undefined表示缺少值、未被定义的值

// 2. 转换成数字时,null转换成0,而undefined转换成NaN
console.log(+null); // 0
console.log(+undefined); // NaN

// 3. null是一个字面量(值),而undefined既是全局的一个属性,也是字面量
// 可以通过赋值检验
null = {}; // 报错:Invalid left-hand side in assignment - 等号左侧不合法
undefined = {}; // 正常运行,不过undefined无法被修改

// 4. 是否会赋值默认值
// null不会赋默认值，而undefined会赋默认值,因为默认不传递参数时，就是undefined
function test(num = 1024){ // 1024是默认值,当num为undefined时赋值
  console.log(num);
}

test(null); // null
test(undefined); // 1024

```

### symbol <Badge text='ES6' />
symbol是ES6新增的基本数据类型, 使用Symbol函数创建Symbol类型的值

由于JS对象属性名都是字符串,容易出现属性名冲突,ES6引入Symbol,表示唯一不重复的值

symbol接收字符串，非字符串的值会先被转换成字符串，再创建Symbol值

###### 基本使用
```javascript
// 基本使用
const s1 = Symbol();
const s2 = Symbol('des'); // 接受一个描述信息
```
###### 唯一性
每次Symbol创建出来的都不是同一个Symbol值，描述相同也不是同一个值
```javascript
const foo1 = Symbol('foo');
const foo2 = Symbol('foo');
console.log(foo1 === foo2); // false
```
###### 不能new,无包装对象
Symbol不是一个完整的构造函数,不支持new关键字,所以也没有对应的包装对象
```javascript
const info = new Symbol(); // 报错: Symbol is not a constructor
```

###### 作为属性名


### BigInt

## 引用数据类型


## 判断类型

### typeof 
可以判断未声明的变量