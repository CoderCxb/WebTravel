# Array - 数组
数组是JS中最常用的类型之一,用于有序的存储数据,数组中存储的数据类型可以是任意类型,并且不需要是相同类型,数组的大小会根据数据的增删而改变。数组本质上也是对象,数组上的数字字符串的属性又称为索引/下标/index等,索引从0开始。

## 创建数组
Javascript中创建数组的方式有构造函数、数组字面量、Array.from和Array.of,实际开发中常见和推荐的写法是数组字面量的形式,构造函数作为了解即可,这里演示构造函数和数组字面量,Array.from和Array.of在静态方法中演示。
###### 数组字面量
数组字面量通过[]创建数组并且不会调用Array构造函数,长度由 [] 中的元素决定。
```javascript
const arr = [];

const chars = ['A','B','C'];

const mix = [1024,'hello world'];
```

###### 构造函数
通过Array构造函数创建数组,new可以省略(不建议),开发中并不是很常见,但是还是要了解一下。
```javascript
// 1. 不传递参数
console.log(new Array()); // []

// 2. 传递一个number类型参数(必须是number类型,不会进行类型转换),此时的参数为数组长度
const emptyItemsArr = new Array(2);
console.log(emptyItemsArr); // [ <2 empty items> ], 长度为2,每一项都是空位(hole),空位和undefined是不一样的

// 3. 传递一个非number参数,作为元素添加到数组
console.log(new Array('1024')); // [ '1024' ]

// 4. 传递超过一个参数,作为元素添加到数组
console.log(new Array(1024,'hello world')); // [ 1024, 'hello world' ]
```

## 索引
数组是有序集合,数组中的数字字符串的属性又称为索引,可用于访问指定位置的元素,索引从0开始,因此数组索引的范围是[0,length-1]。
```javascript
const arr = [1,2,3];
console.log(arr[0]); // 1
console.log(arr[1]); // 2
console.log(arr[2]); // 3
console.log(arr[3]); // undefined, 超出范围返回undefined

// 设置索引值
arr[0] = 1024;
console.log(arr[0]); // 1024

// 如果设置的索引值超出数组长度,除了赋值以外,还会进行填充空位
arr[5] = 6;
// 可以看出,数组原本长度为3,填充之后长度为6,索引值4、5被空位填充
console.log(arr.length); // 6
console.log(arr); // [ 1024, 2, 3, <2 empty items>, 6 ]

// 无效的索引会被当成普通属性处理,此时就不是数组索引,而是对象的键(key)
arr[-1] = -1;
console.log(arr); // [ 1024, 2, 3, <2 empty items>, 6, '-1': -1 ], 属性'-1'对应的值-1
```

## 循环遍历
```javascript
const nums = [1,2,3];

// 最最基本的for循环 - 根据索引访问
for (let index = 0; index < nums.length; index++) {
  console.log(nums[index]); // 分别打印 1、2、3
}

// for..of循环,只能拿到数组的值,无法拿到索引
for (const num of nums) {
  console.log(num); // 分别打印 1、2、3
}

// 数组本质上也是对象,所以也可以用for..in(适用于普通对象,而不是数组)
// 但是正常不会这样用,因为for..in不仅会获取索引对应的值,还会获取非索引的值
for (const key in nums) {
  // 不仅打印了nums索引对应的值,还把数组上的其他属性给打印出来了
  console.log(nums[key]); // 分别打印 1、2、3、nums
}
```

## 数组空位
数组空位和undefined并不是一个概念,ES6前的方法会忽略空位,而ES6新增方法会将空位当成存在的元素,值为undefined。

###### 创建空位
```javascript
// 1. 使用逗号创建空位
const holes = [,,,,,];
console.log(holes); // [ <5 empty items> ]

// 2. 通过构造函数设置长度
const holes2 = new Array(5);
console.log(holes2); // [ <5 empty items> ]

// 3. 直接设置长度创建空位
const holes3 = [];
holes3.length = 5;
```

###### 空位处理
运算符和数组方法对于空位的处理非常不统一,因此在开发中尽量避免出现空位。
```javascript
const holes = [,,,];

// 1. in运算符忽略空位
console.log(0 in holes); // false

// 2. forEach、filter、indexOf、lastIndexOf、reduce、reduceRight、every和some忽略空位
console.log(holes.indexOf(undefined));  // -1
holes.forEach(()=>{console.log('forEach');}) // 什么也不打印

// 3. join和toString会将空位当成undefined处理，而undefined会被转换成''
console.log(holes.join('-')); // --

// 4. for..of会遍历空位
for (const hole of holes) {
  console.log(hole); // undefined,打印3次
}

// 5. entries、keys、values、includes、find和findIndex将空位看成undefined
console.log(holes.includes(undefined)); // true
console.log(holes.findIndex(v=>v===undefined)); // 0
```

## 实例方法/属性
### length
length属性表示数组中的元素个数。

###### 范围
length取值范围从0到2**32-1,不在范围内则会异常。
```javascript
const arr = [];
arr.length = -1; // RangeError: Invalid array length - 范围异常: 无效数组长度
arr.length = 2 ** 32; // RangeError: Invalid array length - 范围异常: 无效数组长度
```

###### length的属性描述
length是一个可写入、不可枚举、不可配置的属性,即可以修改、无法枚举、也无法重新配置属性描述,而设置length会改变数组长度。
```javascript
const nums = [1,2,3,4];

// 当设置的length小于数组原本length时,会进行截断
nums.length = 3;
console.log(nums); // [ 1, 2, 3 ], 超出部分被截断了

// 当设置的length大于数组原本的length时,会进行填充,填充空位
nums.length = 5;
console.log(nums); // [ 1, 2, 3, <2 empty items> ]
```

### 常见方法
数组提供的方法非常多,不需要全部详细的掌握, 熟悉常见方法的主要使用方式即可。
###### 迭代器方法
ES6新增了3个迭代器方法: keys()、values()和entries(),可参考[迭代器 - Iterator](TODO)。
 - keys 返回数组索引的迭代器
 - values 返回数组元素的迭代器
 - entries 返回索引/值的迭代器

```javascript
const nums = [1,2,3,4];

// 索引迭代器
const keys = nums.keys();
console.log(keys); // Object [Array Iterator] {}
console.log([...keys]); // [ 0, 1, 2, 3 ]

// 值迭代器
const values = nums.values();
console.log(values); // Object [Array Iterator] {}
console.log([...values]); // [ 1, 2, 3, 4 ]

// 索引/值迭代器
const entries = nums.entries();
console.log(entries); // Object [Array Iterator] {}
console.log([...entries]); // [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]
```

###### 栈方法
```

```

###### 队列方法
```javascript

```

###### 排序方法

###### 操作方法

###### 搜索和位置方法

###### 迭代方法

###### 归并方法

## 静态方法
### Array.isArray
Array.isArray(value)方法用于判断传递的值是否是数组(推荐使用),是则返回true,否则false
```javascript
console.log(Array.isArray([]));    // true
console.log(Array.isArray({}));    // false
console.log(Array.isArray(1024));  // false
console.log(Array.isArray(null));  // false
console.log(Array.isArray(true));  // false

// Polyfill - 当Array.isArray方法不存在时,可以通过以下代码创建
if (!Array.isArray) {
  Array.isArray = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };
}
```
### Array.from
Array.from方法通过类数组或可迭代对象创建一个新的、浅拷贝的数组。
###### 参数列表: Array.from(arrayLike[, mapFn[, thisArg]])
 - arrayLike
   - 详情: 要转换成数组的类数组或可迭代对象 - 不能传递null和undefined
   - 必填: true
 - mapFn
   - 详情: 新数组的每个元素都会执行回调函数,返回值会作为新数组的元素(极少用,可以了解)
   - 必填: false
 - thisArg
   - 详情: 指定mapFn中的this(极少用,可以了解)
   - 必填: false


###### 基本使用
Array.from 在开发中主要用法仅仅只是将类数组和可迭代对象转换成数组,至于转换后需要做什么,不使用mapFn也能做到。
```javascript
// 1. string 转 数组, string是可迭代对象
console.log(Array.from('ABC')); // [ 'A', 'B', 'C' ]

// 2. Set 转 数组, Set是可迭代对象
const s = new Set();
s.add(1).add(2).add(3);
console.log(Array.from(s)); // [ 1, 2, 3 ]

// 3. Map 转 数组, Map是可迭代对象
const m = new Map();
m.set('name','You don\'t know JS').set('color', 'yellow');
console.log(Array.from(m)); // [ [ 'name', "You don't know JS" ], [ 'color', 'yellow' ] ]

// 4. 类数组 转 数组
const likeArray = { 0:0, 1:1, 2:2, length:3 };
console.log(Array.from(likeArray)); // [ 0, 1, 2 ]
```

###### mapFn和thisArg
mapFn和thisArg提供了将类数组和可迭代对象转换成数组后的额外操作,但是mapFn和thisArg参数实际开发使用频率低,了解即可。
```javascript
// 这是一个奇数的Set
const oddSet = new Set([1,3,5])

// 现在要将它转换成偶数数组
const oddArr = [...oddSet]; // 中间数组,如果不需要可以直接 [...oddSet].map,这样就不会产生中间数组了
const evenArr1 = oddArr.map((value,index,array)=>{
  // map方法的回调函数可以获取到value,index和array(数组本身)
  return value * 2;
})
console.log(evenArr1); // [ 2, 6, 10 ]

// mapFn不会有中间数组,即Array.from
const evenArr2 = Array.from(oddSet,(value,key)=>{
  // mapFn无法获取到类数组/可迭代对象本身
  // 此处(mapFn中)的this有thisArg指定
  return value * 2;
},/** 指定mapFn的this */{ type: 'this' });
console.log(evenArr2); // [ 2, 6, 10 ]

// 首先map可以产生一个中间的数组,而mapFn不能
// 其次map可以获取到数组本身,而mapFn获取不到类数组/可迭代对象本身
// 结论: 一般使用Array.from大多数时候仅仅是用来将类数组/可迭代对象本身转换成数组,并不会使用它的mapFn(不排除你要求特殊)
```

### Array.of
Array.of方法根据传入的参数创建新的数组实例,传入的参数只会是元素,不会是长度(区别与Array构造函数)。

###### 基本使用
```javascript
// 无论几个参数,无论是否是number,都是作为元素按序添加到新创建的数组中
console.log(Array.of(2));      // [ 2 ]
console.log(Array.of(1,2,3));  // [ 1, 2, 3 ]

// Polyfill - 当Array.of方法不存在时,可以通过以下代码创建
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

## 判断数组
判断数组主要有以下4种方式,如果只是判断数组,推荐使用Array.isArray。
```javascript
const arr = [];
const obj = {};

// 1. 使用Array.isArray判断(推荐)
console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false

// 2. 通过instanceof
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false

// 3. 通过Object.prototype.toString
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
console.log(Object.prototype.toString.call(obj) === '[object Array]'); // false

// 4. Array.prototype.isPrototypeOf和instanceof类似,都是通过原型链判断
console.log(Array.prototype.isPrototypeOf(arr)); //  true
console.log(Array.prototype.isPrototypeOf(obj)); // false
```

## 参考
 - [ES6入门 - 数组空位](https://es6.ruanyifeng.com/?search=%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6&x=0&y=0#docs/array#%E6%95%B0%E7%BB%84%E7%9A%84%E7%A9%BA%E4%BD%8D)