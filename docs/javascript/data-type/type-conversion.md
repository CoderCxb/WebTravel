# 类型转换

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

console.log('' + {});        // '[object Object]'

// 数组转换成字符串, 使用','将拼接每一项形成字符串,空数组[]转换成''
console.log('' + []);        // ''
console.log('' + [1]);       // '1'
console.log('' + [1,2,3]);   // '1,2,3'

// 数组转换成字符串, null和undefined会被转换成''
console.log('' + [null]);      // ''
console.log('' + [undefined]); // '' 

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

###### 常用方式
使用常见的方式将string转换成number
```javascript
// 1. +
// 忽略前后空格,不仅可以转换整数,还可以转换浮点数
console.log(+'    1024.2    ');  // 1024.2
// 无法转换成数字,则返回NaN
console.log(+'1024Number'); // NaN, 尽管前面的1024可以转换,但整个字符串无法转换

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
###### 演示
演示一些比较特殊的转换规则
```javascript
console.log(+'');        // 0
console.log(+null);      // 0
console.log(+false);     // 0
console.log(+true);      // 1
console.log(+undefined); // NaN

// BigInt可以通过Number转换,不能使用+转换
console.log(+1024n); // TypeError: Cannot convert a BigInt value to a number - 类型异常: 无法将BigInt转换成number
console.log(Number(1024n)); // 1024

// 数组和对象转换成number,先调用[Symbol.toPrimitive]函数, 如果没有,则执行toString()
//                                对应字符串         对应数字
console.log(String({}), +{});  // [object Object]  NaN

//                                           对应字符串    对应数字
console.log(String([]), +[]);                // ''        0
console.log(String([1024]), +[1024]);        // '1024'    1024
console.log(String([1024,64]), +[1024,64]);  // 1024,64   NaN
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
console.log(!!10);    // true
console.log('false'); // true, 注意:这个是字符串
console.log(!![]);    // true,和转换成number不一样,不会先转换成string
console.log(!!{});    // true
```

## 参考 
 - [从一道面试题说起 — JS隐式转换踩坑合集](https://juejin.cn/post/6844903694039777288)