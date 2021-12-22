# 类型转换
数据类型转换又分为显式转换和隐式转换

显式转换如: 构造函数、parseInt、parseFloat、toString等,顾名思义,很明显就能判断出会被转换成什么数据类型

隐式转换如: == 、 < 、 > 、 + 等, 需要考虑操作的元素,如 == 判断两边的类型不同还会进行不同的转换以后进行比较，参考[关系运算符](/WebTravel/javascript/operator.html#关系运算符)。

尽量使用===,避免类型转换考虑不全带来的异常行为,但是还是需要对隐式转换有所了解,可以加深你对类型转换的理解并且在项目中如果碰到也不会一脸懵。

## string
将其他类型转换成string一般采用 ''+(和字符串拼接)、String()、toString()
###### 演示
```javascript
// 1. 拼接字符串 ''+
console.log('' + 1024);      // '1024'
console.log('' + true);      // 'true'
console.log('' + false);     // 'false'
console.log('' + null);      // 'null'
console.log('' + undefined); // 'undefined'
console.log('' + 1024n);     // '1024'

// 相当于调用Object.prototype.toString.call()
console.log('' + {});        // '[object Object]'

// 数组转换成字符串, 使用','将拼接每一项形成字符串,空数组[]转换成''
console.log('' + []);        // ''
console.log('' + [1]);       // '1'
console.log('' + [1,2,3]);   // '1,2,3'

// 数组转换成字符串, null和undefined会被转换成''
console.log('' + [null]);      // ''
console.log('' + [undefined]); // '' 

// 相当于调用join(',')
console.log([1,2,3].join(',') === '' + [1,2,3]); // true

// 2. String() 
// 转换和拼接字符串基本一致
// 不同点:
// Symbol可以使用String()转换成stirng,不能使用+转换
console.log('' + Symbol());    // TypeError: Cannot convert a Symbol value to a string - 类型异常: 不能将Symbol转换成string
console.log(String(Symbol())); // Symbol()

// 3. toString()方法
// 除了null和undefined,其他的数据都可以调用toString()方法
// 如果忘记了基本数据类型为什么可以调用方法以及为什么null和undefined不能调用,可以复习一下基本数据类型
console.log(false.toString());    // false
console.log({}.toString());       // [object Object]
console.log([1,2,3].toString());  // 1,2,3

console.log(undefined.toString()); // TypeError: Cannot read property 'toString' of undefined - 类型异常: 不能从undefined上读取toString
console.log(null.toString()); // TypeError: Cannot read property 'toString' of null - 类型异常: 不能从null上读取toString
```

## number
将其他类型转换成number一般采用 +、Number()、parseInt和parseFloat

###### string -> number
使用常见的方式将string转换成number
```javascript
// 1. +
// 忽略前后空格,不仅可以转换整数,还可以转换浮点数
console.log(+'    1024.2    ');  // 1024.2
// 无法转换成数字,则返回NaN
console.log(+'1024Number'); // NaN, 尽管前面的1024可以转换,但整个字符串无法转换

// 注意: 特殊值的字符串可以转换成number
console.log(+'Infinity'); // Infinity
console.log(+'NaN');      // NaN, 至于这个是转换成功的NaN还是失败的NaN不那么重要

// 2. Number()
// 忽略前后空格,不仅可以转换整数,还可以转换浮点数
console.log(Number('    1024.2    '));
// 无法转换成数字,则返回NaN
console.log(Number('1024Number')); // NaN, 尽管前面的1024可以转换,但整个字符串无法转换


// 3. parseInt和parseFloat
// 这两个方法除了被挂载在全局对象,也被挂载在 Number上
console.log(Number.parseFloat === parseFloat);  // true
console.log(Number.parseInt === parseInt);  // true

// 忽略前后空格,并且会省略小数部分
console.log(parseInt('   1024.2   ')); // 1024
// 忽略空格后,从头开始匹配数字,直至非数字字符为止,将匹配的部分转换成数字,匹配部分如果为空,返回NaN
console.log(parseInt('   1024.2N   ')); // 1024, 截止1024部分都是数字字符串,N不满足
console.log(parseInt('   N1024.2   ')); // NaN, 开头N直接不满足,转换成NaN
```
###### 其他转换
演示其他数据类型转换成number
```javascript
console.log(+'');        // 0
console.log(+true);      // 1
console.log(+false);     // 0
console.log(+null);      // 0
console.log(+undefined); // NaN

// BigInt可以通过Number转换,不能使用+转换
console.log(+1024n); // TypeError: Cannot convert a BigInt value to a number - 类型异常: 无法将BigInt转换成number
console.log(Number(1024n)); // 1024

// 数组和对象转换成number,先调用[Symbol.toPrimitive]函数, 如果没有,则执行toString()
console.log(+{});     // NaN, {}先被转换成[object Object],相当于 +'[object Object]'

// 数组转换number,需要先将其转换成string,再转换成number
console.log(+[]);             // 0,    []先被转换成'',相当于 +''
console.log(+[null]);         // 0,    [null]先被转换成'',相当于 +''
console.log(+[undefined]);    // 0,    [undefined]先被转换成'',相当于 +''
console.log(+['1024']);       // 1024, ['1024']先被转换成'1024',相当于 +'1024'
console.log(+['1024','64']);  // NaN,  ['1024','64']先被转换成 '1024,64', 相当于 +'1024,64'
```

## boolean
将其他类型转换成boolean一般采用 !!、Boolean()
```javascript
// JS存在的falsy(假值)全在这了
console.log(false);
console.log(!!0); // 包括 +0、-0、0n
console.log(!!null);
console.log(!!undefined);
console.log(!!'');
console.log(!!NaN);

// 除了以上的值转换成false,其他值转换成boolean时,皆为true
console.log(!!10);      // true
console.log(!!'0');     // true, 注意:这个是字符串,只有空字符串''才会转成false
console.log(!!'false'); // true, 注意:这个是字符串,只有空字符串''才会转成false
console.log(!![]);      // true,和转换成number不一样,不会先转换成string
console.log(!!{});      // true
```

## object -> 基本数据类型
从object转换成基本数据类型并不都是调用toString(),还有\[Symbol.toPrimitive]()以及valueOf()

优先级为[Symbol.toPrimitive] > valueOf > toString

这三个函数至少得有一个返回基本数据类型,否则会报错,如果不写return,默认返回的undefined是基本数据类型
```javascript
const obj  = {
  [Symbol.toPrimitive](){
    return 'toPrimitive';
  },
  valueOf(){
    return 'valueOf';
  },
  toString(){
    return 'toString'
  },
}

//  此时三种方式都存在, 返回Symbol.toPrimitive的值
console.log(''+obj); // toPrimitive
delete obj[Symbol.toPrimitive];  // 移除Symbol.toPrimitive方法

// 此时只剩 toString 和 valueOf
console.log(''+obj); // valueOf
delete obj.valueOf;  // 移除valueOf方法

// 只剩toString
console.log(''+obj); // toString
```

## 面试题
:::tip
:::details 定义变量n,使 n == 1 && n == 2 && n == 3 成立
```javascript
// 既然知道了可以控制对象转换成基本数据类型的行为,那么这就非常简单了
const n = {
  num : 1,  // 存储数字
  [Symbol.toPrimitive](){
    return this.num ++; // 每次换成基本数据类型的时候,num都加1
  }
};
// 注意,==会触发类型转换,===不会
// 每次判断以后num都+1,所以每次判断都相等
console.log(n == 1 && n == 2 && n == 3); // true
```
:::

## 参考 
 - [从一道面试题说起 — JS隐式转换踩坑合集](https://juejin.cn/post/6844903694039777288)