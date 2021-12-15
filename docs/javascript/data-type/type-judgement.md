# 类型判断

## typeof 
typeof返回一个数据类型字符串,对于引用数据类型有一定的局限性,更适合基本数据类型的判断。
###### 基本使用
```javascript
console.log(typeof 1024);          // number

console.log(typeof NaN);           // number

console.log(typeof 'Natural');     // string

console.log(typeof true);          // boolean

console.log(typeof undefined);     // undefined

console.log(typeof Symbol());      // symbol

console.log(typeof 1024n);         // bigint

console.log(typeof {});            // object
console.log(typeof []);            // object
console.log(typeof null);          // object

console.log(typeof function(){});  // function 
```

###### typeof null
在JS中, 值是有一个表示类型的标签和实际值组成,对象的标签为0, null表示空指针、对象无引用,其标签也是0 (早期设计,现在无法修复),而typeof是根据标签来判断的,所以typeof null返回 'object'
```javascript
console.log(typeof null);   // object
```

###### typeof 和 未声明变量
typeof后面所跟的变量即便没有声明也不会报错,而是被当成undefined进行判断,但是依旧受let、const的暂时性死区约束
```javascript
console.log(typeof str); // undefined, 此处str没有声明,但是没有报错,类型为undefined

// let和const的暂时性死区依旧有效
console.log(typeof num); // ReferenceError: Cannot access 'num' before initialization - 引用异常: 无法在声明前使用变量
let num;
```

###### typeof特点
 - 优点
   -  简单、高效,基本数据类型用typeof足矣
 - 缺点
   - 将null判断城object容易造成误解
   - 除了函数会被识别成function,其他引用数据类型全部都返回object,无法对其进行区分



## Object.prototype.toString.call()

###### 判断基本数据类型
Object.prototype.toString.call()可以精准的判断出基本数据类型,以[object stringTag]形式的字符串返回
```javascript
console.log(Object.prototype.toString.call(1024));          // [object Number]
console.log(Object.prototype.toString.call('str'));         // [object String]
console.log(Object.prototype.toString.call(true));          // [object Boolean]
console.log(Object.prototype.toString.call(null));          // [object Null]
console.log(Object.prototype.toString.call(undefined));     // [object Undefined]
console.log(Object.prototype.toString.call(Symbol()));      // [object Symbol]
console.log(Object.prototype.toString.call(1024n));         // [object BigInt]
```

###### 判断引用数据类型
Object.prototype.toString.call()是可以区分常见的引用数据类型
```javascript
console.log(Object.prototype.toString.call({}));                   // [object Object]
console.log(Object.prototype.toString.call([]));                   // [object Array]
console.log(Object.prototype.toString.call(/RE/));                 // [object RegExp]
console.log(Object.prototype.toString.call(new Date()));           // [object Date]
console.log(Object.prototype.toString.call(Math));                 // [object Math]
console.log(Object.prototype.toString.call(new Error()));          // [object Error]
console.log(Object.prototype.toString.call(new Set()));            // [object Set]
console.log(Object.prototype.toString.call(new WeakSet()));        // [object WeakSet]
console.log(Object.prototype.toString.call(new Map()));            // [object Map]
console.log(Object.prototype.toString.call(new WeakMap()));        // [object WeakMap]
console.log(Object.prototype.toString.call(Promise.resolve()));    // [object Promise]
console.log(Object.prototype.toString.call(function *(){}));       // [object GeneratorFunction]
(function(){
  console.log(Object.prototype.toString.call(arguments));          // [object Arguments]
})();
```




###### Symbol.toStringTag
在学习内置symbol值的时候曾经提及过Symbol.toStringTag,它就是toString方法返回时 [object stringTag] 的 stringTag
```javascript
// 温故
// 可以通过修改Symbol.toStringTag属性来改变toString返回的值
const obj = {};
console.log(obj.toString()); // [object Object]
obj[Symbol.toStringTag] = 'MyObject';
console.log(obj.toString()); //[object MyObject]

// 知新
// 1. 是否引用数据类型上具有Symbol.toStringTag的属性？
// 并不是所有引用数据类型都具有Symbol.toStringTag属性
console.log(Math[Symbol.toStringTag]);                // Math
console.log(Promise.resolve()[Symbol.toStringTag]);   // Promise

console.log(/RE/[Symbol.toStringTag]);    // undefined
console.log({}[Symbol.toStringTag]);      // undefined

// 2. toString方法无法区分自定义类的实例
// 没有[Symbol.toStringTag]属性,返回值是 [object Object]
// 有[Symbol.toStringTag]属性,返回值是 [object Person]
class Person {
  [Symbol.toStringTag] = 'Person';
}
let p = new Person();
console.log(Object.prototype.toString.call(p));  // [object Person]

// 3. Object.prototype.toString方法是可以被重写的
// 重写之后 toString就不具备原本的效果了
Object.prototype.toString = function () {
  return 'new toString';
}

console.log(Object.prototype.toString.call(1024)); // new toString
```

###### Object.prototype.toString.call()特点
  - 优点
    - 精准识别基本数据类型
    - 可识别大多数常见引用数据类型,无法识别所有引用数据类型,如 自定义类的实例
  - 缺点
    - 使用略微复杂,性能不如typeof
    - Object.prototype.toString可以重写,如果被重写会导致行为不一致


## instanceof 


## 参考
 - [掘金 -【JS 进阶】你真的掌握变量和类型了吗](https://juejin.cn/post/6844903854882947080)
 - []()