# 基本数据类型
基本数据类型(原始值/原始数据类型): 无方法、无对象、无法修改的数据

当前Javascript中有7种基本数据类型：**String、Number、Boolean、Null、Undefined、Symbol(ES6)、BigInt(ES10)**

###### 无法修改
```javascript
// 示例
let str = 'hello';  // 初始化时, str的值为 'hello'
str = 'hi';         // 赋值其实修改的是变量存储的值,'hello'本身并没有改变,只是str存储的值变成了 'hi'
str.toUpperCase();; // 转换成大写, 返回HI,但是不影响原本的str
console.log(str);   // hi 


let num = 1024;
num * 2;
console.log(num); // 1024

// 结论：基本数据类型无法修改，你可以修改的只是存储在某个变量上的值
// 你对数字、字符串做操作，本质上返回的也是一个新的数字、字符串,不会改变原来的数字、字符串,其他基本数据类型同理
```

###### 构造函数
```javascript
// 基本数据类型除了null和undefined,都存在其构造函数
// 构造函数主要有两种用法
// 1. 创建包装对象 - 装箱
// 加上new关键字，创建对应的包装对象,其valueOf方法返回基本数据类型
// 演示String,其他几个同理,Symbol不能使用new关键字
const strObj = new String('String-Type'); 
console.log(strObj);           // [String: 'String-Type']
console.log(typeof strObj);    // object, 包装对象，顾名思义，是对象类型
// 将包装对象转成基本数据类型 - 拆箱
console.log(strObj.valueOf()); // String-Type

// 前面说到过，基本数据类型没有方法，那为什么我们可以使用方法呢？
// 答：本质上是JS引擎将基本数据类型转换成了对应的包装对象
console.log('String-Type'.toLowerCase());  // string-type
// 开发者使用的时候是感知不到的,相当于
console.log(new String('String-Type').toLowerCase()); // string-type

// 由于null和undefined没有构造函数,无法装箱,所以它们是不能调用属性和方法的

// 2. 转换数据类型 - 显式类型转换
// JS引擎自动转换是隐式类型转换
// 当构造函数不使用new关键字时，它就变成了转换函数，用于转换数据类型
console.log(String(1024));   // '1024', 等价于 '' + 1024

console.log(Boolean(''));    // false,  等价于 !!''

console.log(Number('!'));    // NaN,    等价于 +'!'

console.log(Symbol('s'));    // Symbol(s)

console.log(BigInt('1024')); // 1024n

```

## string
String(字符串)代表0或多个16位Unicode字符序列，可以使用单引号('')、双引号("")和反引号(``)表示。
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
| \\\ | 反斜杠(\\)  |
| \\' | 单引号,字符串以单引号表示时使用,如 `'He\'s code is nice'`  |
| \\" | 双引号,字符串以双引号表示时使用,如 `"He said \"Hi\""`  |
| \\` | 反引号,字符串以反引号表示时使用,如 ``` `He said \`Hi\`` ```  |  |

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

## number
数值类型，用于表示数字，包括整数和浮点数,能够准确表示的整数范围在-2\**53到2\**53之间
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
// 全局对象上也有parseInt和parseFloat,并且和Number上的是相等的
console.log(Number.parseInt === parseInt); // true

// 开头的空格会被忽略,将开头开始合法的字符串转换成数字,如果从头到尾都不合法,则返回NaN
// 第二个参数可以指定进制,默认10进制
// Number.parseInt 将字符串转换成整数,如果无法转换则返回NaN
console.log(Number.parseInt('3.14 Code'));   // 3
// Number.parseFloat 将字符串转换成整数,如果无法转换则返回NaN
console.log(Number.parseFloat('3.14 Code')); // 3.14
// 转换成数字优先使用parseInt和parseFloat，而不是Number

// 5. toFixed()方法 转换成保留几位小数的字符串
console.log(1024..toFixed(2)); // '1024.00' 

```

## boolean
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

注意: 任何值都有对应的布尔值,所以!!和Boolean对任何值进行转换都是可以的

```javascript
// 可以通过Boolean()或者!!将值转换成true或者false
console.log(Boolean(undefined)); // false
console.log(!!undefined);  // false
 
// 真/假值在JS中使用非常频繁,常见有
if(true){console.log('真值')} // if条件判断,真值时才会执行代码块中的代码
const source = true && 80;   // 逻辑运算符 && 和 ||
true ? '真': '假'             // 三元运算符
```



## undefined
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

## null
null类型只有一个值null,是一个字面量，指代一个空指针，即未设置值的对象
```javascript
let obj = null; 
obj = {};

// 需要注意一点,也是面试常问
console.log(typeof null); // 'object'
// 原因
// 在JS中, 值是有一个表示类型的标签和实际值组成,对象的标签为000
// null表示空指针、对象无引用,其值全为0,标签也是0 (早期设计,现在无法修复)
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
// 综上所述,null和undefined没有属性和方法,不能访问,否则 类型异常:无法从null/undefined获取属性 
console.log(undefined.title); // TypeError:Cannot read property 'title' of undefined
console.log(null.title); // TypeError:Cannot read property 'title' of null


// 不同点:
// 1. 含义不同
// null表示空指针、对象无引用地址,而undefined表示缺少值、未被定义的值

// 2. 转换成数字时,null转换成0,而undefined转换成NaN
console.log(+null); // 0
console.log(+undefined); // NaN

// 3. null是一个字面量(值),而undefined既是全局的一个属性,也是字面量
// 可以通过赋值检验
null = {}; // SyntaxError:Invalid left-hand side in assignment - 语法异常:等号左侧不合法
undefined = {}; // 正常运行,不过undefined无法被修改

// 4. 是否会赋值默认值
// null不会赋默认值，而undefined会赋默认值,因为默认不传递参数时，就是undefined
function test(num = 1024){ // 1024是默认值,当num为undefined时赋值
  console.log(num);
}

test(null); // null
test(undefined); // 1024
```

## Symbol <Badge text='ES6' />
symbol是ES6新增的基本数据类型,表示唯一不重复的值, 使用Symbol函数创建Symbol类型的值,主要用来解决JS对象属性名都是字符串、容易出现属性名冲突的问题
symbol接收字符串，非字符串的值会先被转换成字符串，再创建Symbol值

### 基本使用
```javascript
// 1. 基本使用
const s1 = Symbol();
const s2 = Symbol('des'); // 接受一个描述信息
console.log(s2.description); //des, 获取Symbol的描述信息,ES2019新增

// 2. Symbol每次调用都会创建一个新的Symbol,描述只是利于区分，描述相同也不是同一个值
const foo1 = Symbol('foo');
const foo2 = Symbol('foo');
console.log(foo1 === foo2); // false

// Symbol不是一个完整的构造函数,不支持new关键字,所以也没有对应的包装对象
const info = new Symbol(); // TypeError: Symbol is not a constructor - 类型异常: Symbol不是一个构造函数
```



### Symbol类型转换
```javascript
// 1. 使用构造函数是显式类型转换，使用运算符进行运算时，是隐式类型转换
// Symbol只能
// 2. Symbol只能显式转换成 String和Boolean
console.log(String(Symbol()));  // 'Symbol()'
console.log(Boolean(Symbol())); // true
console.log(Number(Symbol()));  // TypeError: Cannot convert a Symbol value to a number - 类型异常: 无法将Symbol转换成number
```

### 作为属性名
Symbol的主要用途是作为对象的key,避免属性名冲突,一般搭配[]使用,需要理解[对象 - Object](/WebTravel/javascript/data-type/object.html)。
```javascript
// 1. symbol作为key的设置和读取 
let s1 = Symbol();
let s2 = Symbol();
let s3 = Symbol();
// 使用[]将symbol作为key
let obj = { [s1]: 'Symbol - 1',  s1: 'String' };
obj[s2] = 'Symbol - 2';

// 使用Object.defineProperty设置
Object.defineProperty(obj, s3, { value: 'Symbol - 3' });

// 获取的话也使用[]获取
console.log(obj.s1);  // String,使用.运算符获取的是key为's1'的字符串对应的值 
console.log(obj[s1]); // Symbol - 1
console.log(obj[s2]); // Symbol - 2

// 注意
// 1. Symbol作为属性名无法通过Object.getOwnPropertyNames获取
console.log(Object.getOwnPropertyNames(obj)); // []

// 2. for .. in .. 遍历时,获取不到symbol的key
for (const key in obj){
  console.log(key); // s1
}

// 3. 可以通过Object.getOwnPropertySymbols获取
console.log(Object.getOwnPropertySymbols(obj)); // [ Symbol(), Symbol(), Symbol() ]

```

### Symbol.keyFor和Symbol.for
有时我们也需要使用到相同的Symbol,JS也为我们提供了相应的机制

JS存在一个全局symbol注册表,Symbol.for方法会在注册表中进行注册,如果注册表中已经存在该描述注册的Symbol,则直接使用,否则会创建。

Symbol.keyFor 获取全局symbol注册表中的symbol对应的描述,如果不在注册表中,则返回undefined

```javascript
// 1. Symbol.for
const s = Symbol('des'); // 每次Symbol调用都会创建一个新的symbol
const s1 = Symbol.for('des'); // 使用des创建一个Symbol并登记到注册表
const s2 = Symbol.for('des'); // des创建的symbol已经存在,无需创建直接使用,所以 s1 === s2

console.log(s === s1);  // false
console.log(s1 === s2); // true

//总结:使用Symbol.for并且描述相同的Symbol是同一个symbol

// 2. Symbol.keyFor 获取注册表中的symbol对应的描述
const sDes = Symbol.keyFor(s);
console.log(sDes); // undefined, Symbol()的方式不会在注册表登记,所以返回undefined

const s1Des = Symbol.keyFor(s1);
console.log(s1Des); // des
```

### 实用内置Symbol
ECMAScript除了可以自定义Symbol以外,还提供了内置Symbol值,以Symbol的静态属性形式存在,以下列举部分比较有意思的Symbol值,详细可参考 [MDN - Symbol](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)

###### Symbol.hasInstance
判断对象是否是构造函数的实例,作用于构造函数
```javascript
class Arr{
  static [Symbol.hasInstance](instance){
    // instance是接收的实例
    return false; 
  }
}

const arr = new Arr();
// arr是Arr构造函数new出来的,正常来说arr instanceof Arr应该是true
// 但是我们通过 Symbol.hasInstance改变的判断结果,所以返回了false
console.log(arr instanceof Arr); // false
```

###### Symbol.toPrimitive
在对象转换成基本数据类型时调用,可以控制对象转换成基本数据类型的结果,转换成boolean不会触发,Symbol.toPrimitive优先级高于toString
```javascript
const obj = {};
console.log(+obj);         // NaN
console.log(''+obj);       // [object Object]
console.log(String(obj)) ; // [object Object] 
console.log(`${obj}`);     // [object Object]

obj[Symbol.toPrimitive]=function(hint){
  // hint是会被转换成什么类型,共有3个取值
  // 通过+和Number()转换成number时,hint为number
  if(hint === 'number') return 1024;
  // 通过String()和模板字符串类型转换时,hint为string
  if(hint === 'string') return 'primitive';
  // 通过和字符串进行拼接 ''+ , hint为default
  if(hint === 'default') return true;
}

console.log(+obj);         // 1024, hint - number
console.log(Number(obj));  // 1024, hint - number
console.log(String(obj)) ; // primitive, hint - string
console.log(`${obj}`);     // primitive, hint - string
console.log(''+obj);       // true, hint - default
```


###### Symbol.toStringTag
```javascript
// 调用toString()方法会打印出 [object tag]形式的字符串,Symbol.toStringTag就是这个tag
const obj = {};
console.log(obj.toString()); // [object Object]
obj[Symbol.toStringTag] = 'MyObject';
console.log(obj.toString()); //[object MyObject]
```

###### Symbol.iterator
为对象定义迭代器,可以使用for..of..遍历, 对象默认是不能遍历的,而数组和字符串是有默认的迭代器的,可参考[迭代器 - iterator]()
```javascript
const hero = { name: 'Marco', type: 'AD' };
// 为对象hero设置迭代器
hero[Symbol.iterator] = function *(){
  for (const key in hero) {
    yield hero[key];
  }
}
// 有了迭代器就可以被for..of..遍历了
for (const value of hero) {
  console.log(value);
}

for(const value of [1,2,3]){
  console.log(value); // 1 ,  2 , 3
}
```

###### Symbol.isConcatSpreadable
控制数组和类数组对象作为Array.prototype.concat()的参数时,是否可以展开
```javascript
let oddNums = [];
const odd = [1,3,5,7];
odd[Symbol.isConcatSpreadable] = false;

oddNums = oddNums.concat(odd);  
console.log(oddNums);   // [ [1,3,5,7] ], odd没有被展开,整个数组作为一个值拼接到nums

let evenNums = [];
const even = [2,4,6,8];

evenNums = evenNums.concat(even); 
console.log(evenNums);  // [2,4,6,8], even被展开进行拼接

// 类数组对象,即有着和数组同样结构的对象,数字字符串的key以及length
// 默认情况下,类数组是不能展开的
const likeArrayObj = {
  0: '0',
  1: '1',
  a: '2',
  length: 2,
}

// 可以注释这行 来观察nums的值
likeArrayObj[Symbol.isConcatSpreadable] = true; 

let nums = [];
nums = nums.concat(likeArrayObj);

console.log(nums); // ['0', '1'],如果没有设置可以展开则是[ { '0': '0', '1': '1', length: 2 } ]
```


## BigInt <Badge text="ES10" />
BigInt是ES10新增的基本数据类型,可以表示的数字的范围没有限制,即任意大的数字都可以使用BigInt表示


###### 基本使用
```javascript
let code = 1024n; // 在数字后加n,就是BigIn的类型
let code2 = BigInt('1024'); // 使用构造函数将数字或者字符串数字转换成BigInt

// 注意:BitInt无法隐式类型转换成Number,但是可以隐式转换成String、Boolean
console.log('' + code); // 1024
console.log(!!code); // true
console.log(Number(code)); // 1024, Number()是显式转换
console.log(parseInt(1024n)); // BigInt可以通过parseInt转换成Number

// BigInt无法和number进行操作,因为它无法隐式转换成Number
console.log(+code); // TypeError:Cannot convert a BigInt value to a number - 类型异常: 无法将BigInt转换成Number
console.log(1024 + code); // TypeError:Cannot mix BigInt and other types, use explicit conversions - 类型异常: 不能将BigInt和其他类型混合使用,请使用显式转换

// BigInt和Symbol一样,构造函数(不完整)只具备转换类型的作用,不能使用new关键字新建实例
const bi = new BigInt(1024);  // TypeError:BigInt is not a constructor  - 类型异常: BigInt不是一个构造函数
```

###### 比较
BigInt和number不能隐式转换，意味着不能直接进行运算,但是比较是可以直接进行比较的
```javascript
console.log(1024n > 10); // true

// BigInt和Number不严格相等
console.log(0n == 0);    // true
console.log(0n === 0);   // false
```

###### 无法序列化
```javascript
const obj = {
  num: 1024n
}

console.log(JSON.stringify(obj)); // TypeError:Do not know how to serialize a BigInt - 类型错误: 不知道如何序列化BigInt
```
