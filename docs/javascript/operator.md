# 运算符

## 基础概念
 - 运算元：运算符作用的对象，加法运算1024 + 2048，有两个运算元，分别是1024和2048
 - 一个运算符作用于几个运算元，那它就是几元运算符，常见有 一/二/三元运算符


## 一元运算符
```javascript
// 1. A++ 后置自增运算符
let x = 5;
let y = x++; // 后置自增,先使用值，使用以后再+1
console.log(x,y); // 6, 5

// 2. ++A 前置自增运算符
let x = 5;
let y = ++x; // 前置自增，先+1，再使用值
console.log(x,y); // 6,6

// 3. A-- 后置自减运算符
let x = 5;
let y = x--; // 后置自增,先使用值，使用以后再-1
console.log(x,y); // 4,5

// 4. --A 前置自减运算符
let x = 5;
let y = --x; // 前置自增,先-1，再使用值
console.log(x,y); // 4,4

// 总结:++代表加1,--代表减1，而前/后置则表示在变量使用前/后进行++/--

// 5. + 和 - 转换成Number类型, 负号-还会将number变成负数
const strNum = '1024';
console.log(+strNum); // 1024
console.log(-strNum); // -1024

// 如果字符串不是一个合法的数字字符串,则会转换成NaN - Not a Number 不是一个数字
console.log(+undefined); // NaN, undefined转换成NaN
console.log(+{});        // NaN, 对象{}和数组[]都会被转换成NaN
console.log(+'JS');      // NaN , 负号-同理
console.log(+'');        // 0 , 空字符串''转换为0
console.log(+false);     // 0 , false转换为0
console.log(+true);      // 1 , true转换为1
console.log(+null);      // 0 , null转换为0
console.log(typeof NaN); // number - 很魔幻的就是 NaN的类型是number

// 6. ! 逻辑非 真值返回false,假值返回true,取反的意思
// !!两次取反就是原本对应的布尔值，负负得正
console.log(!!''); // ''对应的布尔值是false
console.log(!'');  // ''对应的布尔值为false, 只有一个!，所以取反就是true

// 会被转换成false的值
console.log(!!'');        // false,空字符串, 不为空的字符串都是true，如'0'
console.log(!!undefined); // fasle
console.log(!!null);      // false
console.log(!!+0);        // false
console.log(!!-0);        // false
console.log(!!NaN);       // false

// 7. delete 删除对象的某个属性,成功返回true,失败返回false
const obj = {
  name: 'operator'
};
delete obj.name;
console.log(obj); // {}
// 也可以删除数组的索引,但是只是删除值,索引依旧存在
const arr = [1,2,3];
delete arr['0']; // 删除第一项
console.log(arr); // [ <1 empty item>, 2, 3 ] 第一项为空项了

// 8. void 执行后续表达式并返回undefined
let num;
console.log(void (num = 1024)); // undefined
console.log(num);    // 1024, 赋值成功，表达式执行了

// void 常被用于获取undefined，通常使用 void 0, 如果只是一个值，()可以省略
console.log(void 0); // undefined

// 9. typeof 用于获取数据的类型 - 字符串形式
// 在数据类型部分会对比typeof和其他几种类型判断的方式的优劣势

console.log(typeof Symbol());  // 'symbol'

console.log(typeof 1024n);     // 'bigint'

console.log(typeof 1024);     // 'number'
console.log(typeof NaN);      // 'number'
 
console.log(typeof 'str');     // 'string'
console.log(typeof undefined); // 'undefined'
console.log(typeof true);      // 'boolean'

// 除函数以外的所有对象使用typeof获取的都是'object'
console.log(typeof null);      // 'object'
console.log(typeof {});        // 'object'
console.log(typeof []);        // 'object'

console.log(typeof function(){}); // 'function'

```

## 算术运算符
```javascript

// 1. + - * / 即加、减、乘、除
console.log(10 + 10); // 20
console.log(10 - 10); // 0
console.log(10 * 10); // 100
console.log(10 / 10); // 1, 如果除不尽，保留小数点

// 注意：+用在数字之间是加法，如果用在字符串的话 就是拼接
console.log('Hello ' + 'JS'); // Hello JS
// 字符串+其他类型时，其他类型会被转换成字符串
console.log('value:' + true); // value:true
console.log('value:' + 1024); // value:1024
console.log('value:' + {});   // value:[object Object]


// 2. % 取余数
console.log(10 % 3)； // 1 

// 3. ** 幂/次方
console.log(2 ** 3); // 8,  2的3次方
console.log(3 ** 3); // 27, 3的3次方
```

## 逻辑运算符
```javascript
const count = 0;

// 真值(truthy): 转换成布尔值为true的值

// 1. && (短路与)
// 返回第一个假值(有假值) 或最后一个值(无假值)
// 注意:找到第一个假值后 不会判断后续的值了
console.log(2 && 1); // 1
console.log(1 && 0 && 2 && count++); // 0，count++不会执行,1是真值,被短路了
console.log(count); // 0

// 常用于做逻辑判断，每一项都需要满足条件(真值)
const hasCat = true, hasDog = false;
// 不全为真值，因此&&以后为假值
if(hasCat && hasDog) {    // 不满足
  console.log('猫狗双全'); // 不执行
}

// 2. || (短路或)
// 返回第一个真值(有真值)或最后一个值(无真值)
// 注意:找到第一个真值后 不会判断后续的变量
console.log(0 || null);    // null
console.log(2 || 1);       // 2
console.log(1 || count++);  // 1,count++不会执行，1是真值，被短路了
console.log(count);        // 0

// 常用于做逻辑判断，只要有一个满足条件即可(一个真值即可)
const hasCat = true, hasDog = false;
// 有一个为真值，因此||以后会之为真值
if(hasCat || hasDog) {  // 满足
  console.log('铲屎官'); // 执行
}


// 3. ?? 空值合并运算符 
// 当左侧是 undefined或者null时，返回右侧值，否则返回左侧值
console.log(undefined ?? 1024); // 1024
console.log(null ?? 1024);      // 1024
console.log('left' ?? 'right'); // left

// 常用于当一个值可能为空值时，为其赋值，避免出错
let obj; // 此时obj是空的
const student = obj ?? {}; // 将 ?? {}去掉,则代码报错
console.log(student.name); // 如果上面没有使用 ?? {} 赋予默认值,此处的student就是 undefined,无法访问属性,报错

```

## 赋值运算符
```javascript
// 1. =、+=、-=、*=、/=
let num = 1024; // = 给变量赋值
num += 2;    // num = num + 2; 的缩写
num -= 2;    // num = num - 2; 的缩写
num *= 2;    // num = num * 2; 的缩写
num /= 2;    // num = num / 2; 的缩写
console.log(num);

// 2. ??=  仅当左侧的值为undefined或者null的时候才会赋值
let str = 'hello';
str ??= 'hi';      // 相当于 str ?? (str = 'hi');
console.log(str);  // hello

let n;            // 此时 n 的值为undefined
n ??= 1024;       // 会赋值
console.log(n);   // 1024

// 3. ||= 当左侧的值为falsy(会被转换成false)时，进行赋值
let str = 'hello'; // !!str为false
str ||= 'hi';      // 相当于 str || (str = 'hi');
console.log(str);  // hello

let n = 0;
n ||= 1024;       // 会赋值
console.log(n);   // 1024

// 3. &&= 当左侧的值为truthy(会被转换成true)时，进行赋值,与||=相反
let str = 'hello'; // !!str为true
str &&= 'hi';      // 相当于 str && (str = 'hi');
console.log(str);  // hi

let n = 0;         // !!n为false
n &&= 1024;        // 不会赋值
console.log(n);    // 0

```


## 关系运算符
```javascript
// 1. in 判断属性是否在对象或其原型连上
// 右侧必须是对象(引用数据类型)
const obj = { title: 'Operator' };
console.log('title' in obj); // true 
console.log('toString' in obj); // true, toString在obj的原型对象上，原型可在原型章节学习

// 2. instanceof 判断对象的原型链是否包含构造函数的prototype 
// 可参考原型章节
const obj = {};
const arr = [];
const fn = function(){};

// 可以看出，数组和函数本质上也是特殊的对象
console.log(obj instanceof Object); // true
console.log(arr instanceof Object); // true 
console.log(fn instanceof Object);  // true

// 3. >、>=、<、<= 大于、大于等于、小于、小于等于 返回值为布尔值
// 数值的比较很简单，不过多解释
console.log(1 < 1024);      // true
console.log(1024 > 1);      // true
console.log(1024 >= 1024);  // true
console.log(1024 <= 1024);  // true

// 字符串比较的是每个字符对应的Unicode编码
const s1 = 'a'; // 97
const s2 = 'az'; // 97 122
// 可以使用charCodeAt方法查看字符串索引对应的Unicode值
console.log(s1.charCodeAt(0)); // 查看第一个字符的Unicode为97
console.log(s2.charCodeAt(1)); // 查看第二个字符的Unicode为122

// 比较规则,将两个字符串的每个字符从左到右逐一比较大小, ''最小
console.log('ab' > 'a');  // 第一个字符相同, 'a'后面没有字符了取'','ab'还有 'b', 所以 'b' > '',所以 'ab' > 'a'，
console.log('ac' > 'ab'); // 第一个字符相同, 但 'c' > 'b', 所以 'ac' > 'ab'

// 其他类型会被转换成数值进行比较
// true -> 1
// false -> 0
// null -> 0
// undefined -> NaN
console.log(true > false);  // 1 > 0 , true
console.log(true > null);   // 1 > 0 , true

// 只要有一边是NaN,则直接返回false 
console.log(undefined > 1);  // false
console.log(undefined < 1);  // false

// 4. == 相等运算符，判断时会进行类型转换
// 现在用的比较少了，尽量使用===做判断，避免发生类型转换，如果需要类型转换,最好手动转换
// 4.1 对象必须是同一个对象(引用相同)才能相等
const obj1 = {}, obj2 = {};
console.log(obj1 == obj2); // false,虽然都是{}， 但是其实是不同的对象 

// 4.2 字符串和数字比较时，尝试将字符串转为数字
console.log('1024' == 1024); // true 
console.log('' == 0); // true, '' 转换成 0

// 4.3 null和undefined使用==返回true
// null和undefined只与对方非严格相等 
console.log(undefined == null); // true
 
// 4.2 布尔值 true -> 1,false -> 0
console.log(1 == true);  // true
console.log(0 == false); // false

// 4.4 一方是对象,另一方是字符串/数字
// 先尝试调用valueOf,如果还是对象,则调用toString
// toString和valueOf在对象的原型上
const obj = {};
const proto = Object.getPrototypeOf(obj); // 获取obj的原型
// 修改obj原型上的方法
Object.assign(proto, {
  toString:()=>'T', 
  valueOf:()=>'V',  // 注释掉的话,类型转换就会走toString方法,{}=='T'就是true了
})

console.log({} == 'T');   // false, {} 优先调用valueOf()方法
console.log({} == 'V');   // true, {} 优先调用valueOf()方法

// 4.5 +0 == -0
console.log(+0 == -0); // true

// 4.6 NaN不等于任何值，包括它自己
console.log(NaN == NaN); // false
console.log(NaN == undefined); // false

// 4.7 string和boolean
// boolean先转换成number,然后number和string比较,string会被转换成number
// 简单记就是，string和boolean比较,会被转换成number进行比较
console.log(false == ''); // true, false - > 0, ''-> 0 
console.log(true == '1'); // true, true -> 1, '1' -> 1

// 5. != 不等运算符，判断时会进行类型转换, 和==相反
// ==返回true的,!=就返回false,同理，==返回false,!=就返回true
console.log(1024 != '1024'); // false

// 6. === 严格相等运算符，判断时不会进行类型转换
// 和==不同,===不会进行类型转换,因为要求类型也要一致
console.log(1024 === 1024);   // true
console.log(1024 === '1024'); // false
console.log(0 === false);     // false

// 7. !== 不严格相等运算符，判断时不会进行类型转换
// 和 === 相反
console.log(1024 !== 1024);   // false
console.log(1024 !== '1024'); // true
console.log(0 !== false);     // true

```

## 条件(三元)运算符
```javascript
const source = 60;
// 三元运算符,当条件为true时,返回res1,条件为false，返回res2
// 条件 ? res1 : res2
const pass = source >= 60 ? '及格' : '不及格'; 
// 虽然条件运算符可以用于控制语句的执行，但是极少这样用，一般都是用来控制值的返回
source >= 60 ? console.log('秀'): console.log('捞');

// 三元运算符可以嵌套使用，正常不会这样写，阅读性较差
source >= 60 
  ?source >= 90 ? '秀啊': '基操' 
  :'捞啊' ;

```

## 扩展运算符 <Badge text="ES6" />
```javascript
// 扩展运算符是ES提供的一个非常强大的运算符,可以将对象/数组/字符串/生成器进行展开
// 更多用于数组,对象自身有提供方法
// 1. 用于拷贝数组 也可以拼接数组
const arr = [1,2,3];
const arrCopy = [...arr]; // [1,2,3]
const arrConcat = [...arr, ...[4,5,6]]; // [1,2,3,4,5,6]

// 模拟数组的push、unshift, 扩展运算符更为
let nums = [1,2,3];
nums = [0, ...nums]; // unshift
nums = [...nums, 4]; // push
console.log(nums);   // [ 0, 1, 2, 3, 4 ]

// 2. 可以拷贝对象 也可以扩展对象 
const obj = { alias: '...' };
const objCopy = { ...obj, ...{name: '扩展运算符'} }; // { alias: '...', name: '扩展运算符' }

// 3. 字符串转换成数组
console.log([...'hello']); // [ 'h', 'e', 'l', 'l', 'o' ] 相当于Array.from([...'hello']);

// 4. 调用方法时,展开数组传入
// 当你需要的不是数组,而是类似于 1,2,3,4这样的参数时，可以使用...展开数组
function add(n1, n2, n3){ return n1 + n2 + n3;}
const nums = [1,2,3];
console.log(add(...nums)); // 6

// 例子 - 学会举一反三
const arr = [9,2,3,4];
// Math.max()无法直接接收数组
// 没有扩展运算符时获取数组最大值
console.log(Math.max.apply(null, arr));
// 使用扩展运算符
console.log(Math.max(...[arr]));


```

## 其他运算符
```javascript
// 1. 逗号运算符  ,
// 一般结合分组运算符使用,返回最后一个运算元
const x = (1,2,3);
console.log(3);

// 2. 分组运算符  ()
// 用控制表达式中求值的优先级,和数字中的()含义相同
console.log((2 + 2) * 1024); // 4096
```

## 面试题
:::tip 请分析以下代码的结果
:::details 
```javascript

// 记住,很多falsy值的类型转换到最后都会变成这几个值的比较
// false == 0 == '0' == '' 这几个值都是非严格相等(==)
console.log(false == 0);  // true
console.log(false == ''); // true
console.log(0 == '');     // true 
console.log(0 == '0');    // true

// 注意: 数组和基本数据类型比较时,默认是调用toString()
// 所以你得先知道调用toString()会得到什么
// 数组调用toString(),返回 每一项使用','拼接的结果(null和undefined会变成'')
// []       -> ''
// ['1024'] -> '1024'
// [1,2,3]  -> '1,2,3'
console.log([] == 0); // true, 实际判断 '' == 0
console.log([] == false); // true, 实际判断 '' == false

console.log(['1024'] == 1024); // true, 实际判断 '1024' == 1024

console.log(['0'] == false); // true, 实际判断 '0' == false, false会被转化成0

// undefined和null在toString()时转换成'', 所以[null]和[undefined]对应 ''
console.log([null] == false); // true, 实际判断 '' == false
console.log([undefined] == false); // true, 实际判断 '' == false

console.log([] == ![]) // true, []对应'', ![]对应 false, 实际比较 '' == false

// 记住一点: null == undefined,与其他几个falsy值都不等
console.log(null == 0);     // false
console.log(null == false); // false
console.log(null == '');    // false
console.log(null == NaN);   // false

console.log(undefined == 0);      // false
console.log(undefined == false);  // false
console.log(undefined == '');     // false
console.log(undefined == NaN);    // false
```
:::


## 参考
 - [从一道面试题说起 — JS隐式转换踩坑合集](https://juejin.cn/post/6844903694039777288)