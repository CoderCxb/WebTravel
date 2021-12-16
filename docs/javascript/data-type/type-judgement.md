# 类型判断

## typeof 
typeof返回一个数据类型字符串,由于对引用数据类型的判断具有局限性,更适合基本数据类型的判断。
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

###### typeof优缺点
 - 优点
   -  简单、高效,基本数据类型用typeof足矣(需要注意null)
 - 缺点
   - 将null判断成object容易造成误解
   - 除了函数会被识别成function,其他引用数据类型全部都返回object,无法对其进行区分

## Object.prototype.toString.call()
通过call改变Object.prototype.toString的this指向,返回[object stringTag]形式的字符串
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

// 2. 如果没有使用[Symbol.toStringTag],toString方法无法区分自定义类的实例
// 没有[Symbol.toStringTag]属性,返回值是 [object Object],无法和其他类的实例区分开
// 有[Symbol.toStringTag]属性,返回值是 [object Person]
class Person {
  [Symbol.toStringTag] = 'Person';
}
let p = new Person();
console.log(Object.prototype.toString.call(p));  // [object Person]
// 尽管可以使用这种方式来区分不同类的实例,但是一般不会这样用,还是使用instanceof

// 3. Object.prototype.toString方法是可以被重写的
// 重写之后 toString就不具备原本的效果了
Object.prototype.toString = function () {
  return 'new toString';
}

console.log(Object.prototype.toString.call(1024)); // new toString
```

###### Object.prototype.toString.call()优缺点
  - 优点
    - 精准识别基本数据类型
    - 可识别大多数常见引用数据类型,无法识别所有引用数据类型,如 自定义类的实例
  - 缺点
    - 使用略微复杂,性能不如typeof
    - Object.prototype.toString可以重写,如果被重写会导致行为不一致


## instanceof 
instanceof检测构造函数的prototype属性是否存在于某实例对象的原型链上,JS是通过原型的方式来完成继承,在这并不会对原型、继承、原型链进行展开,详细内容移步 [原型]()。

###### 基本使用
```javascript
console.log({} instanceof Object); // true
console.log([] instanceof Array);  // true

// 绝大多数引用数据类型的原型链都包含Object.prototype,也就是说 大多数构造函数都是继承自Object
console.log([] instanceof Object); // true

// 注意: Object.create可以创建一个指定原型的对象
// 如果将原型设置为null,则无法用instanceof判断,因为它没有原型链 
const obj = Object.create(null);
console.log(obj instanceof Object); // false
// 但是 它本质上是一个没有原型链的对象
console.log(typeof obj); // 'object'
console.log(Object.prototype.toString.call(obj)); // [object Object]
```

###### 继承与instanceof
```javascript
// 类的继承演示
// 首先 默认去创建类,原型链肯定是包含Object的
// 其次 Student继承了Person,那么Student原型便加到了Person原型后面
// 即形成 Object -> Person -> Student 这样的原型链
// 通过instanceof判断,则Object、Person、Student的原型都是在原型链上,所以都返回true
class Person {}
class Student extends Person{}
const s = new Student();
console.log(s instanceof Person);  // true
console.log(s instanceof Student); // true
console.log(s instanceof Object);  // true
```

###### 基本数据类型与instanceof
instanceof是通过判断构造函数的prototype属性是否在实例对象的原型链上,基本数据类型没有原型链(原型链是通过属性进行链接,基本数据类型没有属性),所以,instanceof无法判断基本数据类型
```javascript
console.log('str' instanceof String); // false
console.log(1024 instanceof Number);  // false

// 注意,之前学习基本数据类型时提过,使用构造函数可以将基本数据类型转换成对象,这样就可以使用instanceof判断
// 但是,这并不改变基本数据类型无法判断的问题,因为转换后是对象,而不是基本数据类型
console.log(new String('str') instanceof String); // true
```

###### 简单实现instanceof
```javascript
function myInstanceOf(instance, constructor) {
	// 当instance是基本数据类型时 直接返回false
	if (
		instance === null ||
		(typeof instance !== 'object' && typeof instance !== 'function')
	) {
		return false;
	}
	// 获取实例的原型
	let proto = Object.getPrototypeOf(instance);
	// 通过循环实现原型链向上查询
	while (proto) {
		// 原型与链上prototype相等时 则instance是constructor的实例
		if (constructor.prototype === proto) return true;
		// 如果不是,则继续沿原型链向上查询
		proto = Object.getPrototypeOf(proto);
	}
	// 当while中没有满足时,说明原型链无法继续向上了,返回false
	return false;
}
// 演示
console.log(myInstanceOf({}, Number));   // false
console.log(myInstanceOf({}, Object));   // true
console.log(myInstanceOf(function () {}, Function)); // true
```

###### instanceof优先级
```javascript
//  !!的优先级高于instanceof(一元运算符普遍优先级高于二元)
// 所以 !!{}先执行得到true, 判断的是 true instanceof Object, 永远返回false
console.log(!!{} instanceof Object);   // false

// 可以使用()改变优先级
console.log(!!({} instanceof Object)); // true
```

###### instanceof优缺点
  - 优点
    - 可以判断实例对象是否是某个构造函数的实例的推荐用法
  - 缺点
    - 无法判断基本数据类型
    - 原型可以被修改,会影响instnceof判断

## isPrototypeOf()
isPrototypeOf()判断掉用对象是否在实例对象的原型链上

###### 基本使用
```javascript
// 1. 和instanceof一样,基本数据类型不属于任何构造函数的实例
console.log(String.prototype.isPrototypeOf('')); //  false

// 2. 演示
console.log(Object.prototype.isPrototypeOf({})); // true
console.log(Array.prototype.isPrototypeOf([]));  // true
console.log(Object.prototype.isPrototypeOf([])); // true
```

###### instanceof与isPrototypeOf()
```javascript
// 乍一看,isPrototypeOf和instanceof非常相似,其实他们的含义并不是很相同

// 判断的是Array.prototype是否在[]的原型链上
console.log([] instanceof Array); // true

// 判断的是Array.prototype是否在[]的原型链上,调用对象是Array.prototype
console.log(Array.prototype.isPrototypeOf([])); // true

// 判断的是Array是否在[]的原型链上,调用对象是Array
console.log(Array.isPrototypeOf([])); // false,

// 从以上代码可以看出,instanceof是判断构造函数的prototype是否在实例原型链上
// 而isPrototypeOf是判断调用它的对象是否在实例原型链上
```

###### isPrototypeOf()优缺点
  - 优点
    - 可以判断实例对象是否是某个构造函数的实例(一般不这么写)
  - 缺点
    - 无法判断基本数据类型
    - 原型可以被修改,会影响instnceof判断

## 参考
 - [掘金 -【JS 进阶】你真的掌握变量和类型了吗](https://juejin.cn/post/6844903854882947080)