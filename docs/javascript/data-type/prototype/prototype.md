# 原型
JS通过原型的形式能够实现对象共享以及快速扩展,表现形式为构造函数的prototype属性以及实例对象上的__proto__属性。

## 概念
在JS中,所有引用数据类型都是Object的实例对象(可能跨层级),基本数据类型不具有原型的概念。原型能够使公共属性和方法的共享变得更加简单。
 - 构造函数: 在JS中,使用new调用的函数才是构造函数,其prototype属性指向原型对象
 - prototype: 构造函数的原型对象,是所有实例对象共享的对象,存放公共属性和方法,其constructor属性指向构造函数
 - 实例对象: 构造函数new出来的对象,能够访问原型上的属性和方法,其__proto__属性指向构造函数的原型对象

### 图解
以 let p = new Person()框为例, p为实例对象,Person为构造函数,Person.prototype为原型对象。 构造函数实例化创建了实例对象p, p.__proto__指向了Person.prototype,而Person.prototype.constructor指向Person, Person.prototype指向原型对象。

<img src="/WebTravel/images/prototype.png" />


### 演示
```javascript
// 1. 构造函数 - 通过new调用才算构造函数
function Person (name, age) {
  // 实例属性
  this.name = name;
  this.age = age;
  // 实例方法
  this.study = function(){
    console.log('Good Good Study, Day Day Up~');
  }
}

// 为原型对象添加值
Person.prototype.type = '人';
Person.prototype.logInfo = function() {
  console.log(`我的名字是${this.name},今年${this.age}岁,是个${Person.prototype.type}吧`);
}

// 2. 原型对象 - 所有实例都能够访问的公共对象,存储公用的属性和方法
console.log(Person.prototype); // { type: '人', logInfo: [Function (anonymous)] }

// 原型上的constructor指向构造函数
console.log(Person.prototype.constructor === Person); // true

// 3. 实例对象
let p = new Person('张三', 30); // 使用构造函数创建实例,p为实例对象

// 访问原型上的属性和方法
// 4. 实例上的__proto__属性
console.log(p.__proto__ === Person.prototype); // true, 实例对象上的__proto__属性指向构造函数的原型对象

// 实例对象能够访问原型上的属性
console.log(p.type); // 人 

// 实例对象同样能调用原型上的方法
p.logInfo(); // 我的名字是张三,今年30岁,是个人吧

// 访问实例上的属性和方法
console.log(p.name, p.age); // 张三 30
p.study(); // Good Good Study, Day Day Up~

// 再次创建一个人
let p2 = new Person('李四',40);
// 依旧可以访问原型上的属性和方法
console.log(p2.type); // 人
p2.logInfo(); // 我的名字是李四,今年40岁,是个人吧


// 这也是为什么明明定义对象的时候没有定义toString,而我们能够使用的原因
let obj = {};
console.log(obj.toString()); // [object Object]
```

## 原型链
顾名思义,有原型组成的链式结构,实例可以访问整个原型链上的属性和方法,当访问实例对象的属性或方式,实例对象没有,则会找其__proto__对应的原型对象,再找不到,再找原型对象的原型对象,直接原型对象为nul(原型链的尽头都是null)。
```javascript
const topProto = {
  title1: 'topProto的title1'
}

const centerProto = {
  title2: 'centerProto的title2'
};
centerProto.__proto__ = topProto


const obj = {};
obj.__proto__ = centerProto;

// 正常访问其原型属性
console.log(obj.title2); // centerProto的title2

// 以title1属性为例,查找顺序为 obj -> obj.__proto__(也就是centerproto) -> obj.__proto__.__proto__(也就是topProto)
// 1. 判断obj中是否有title1属性, 判断没有, 在原型centerProto中查找
// 2. centerproto也没有,在centerProto的原型topProto中找
// 3. topProto中存在title1, 返回title1对应的值
console.log(obj.title1); // topProto的title1,由于原型链的存在,所以能访问到topProto的属性


// 查找不存在的属性res
// obj没有,centerProto没有,centerProto还是没有,centerProto的原型是Object.prototype,依旧没有,再往上就是null了,都没有,因此返回undefined
console.log(obj.res); // undefined
```



## 小知识

###### 所有的函数(包括Function自身)都是Function构造函数的实例
构造函数的__proto__属性都指向Function.prototype, 当然,也可以使用instanceof来判断
```javascript
console.log(Function.__proto__ === Function.prototype); // true
console.log(Object.__proto__ === Function.prototype); // true
console.log(Array.__proto__ === Function.prototype); // true

// 使用instanceof判断实例
console.log(Array instanceof Function);
```

###### instanceof判断误区
```javascript
// 并不是所有的对象都是Object的实例, 在类型判断的章节提及的,instanceof本质上是判断原型链,因此原型为null的对象判断是false
console.log(Object.create(null) instanceof Object); // false
```

###### 属性屏蔽
 - 读取对象属性时,如果对象和原型上都有该属性时,优先使用对象上的属性
 - 设对象属性时,无论原型有没有,都是设置在对象上

```javascript
function Book(){
  this.title = 'JS高级程序教程第四版'
}

Book.prototype.title = '红宝书'
Book.prototype.nums = [1,2,3];

const book = new Book();

// 对象属性优先访问
console.log(book.title); // JS高级程序教程第四版

// 赋值属性只会修改对象自身的属性,不会影响到原型
book.title = '你不知道的JS';

// 对象的title被修改
console.log(book); // Book { title: '你不知道的JS' }

// 原型毫无变化
console.log(Book.prototype); // { title: '红宝书' }

// 注意: 如果原型上的属性是引用数据类型的话,如果没有改变引用,只是修改属性的话,是会影响原型的
book.nums.push(4);  // 数组还是那个数组,引用没有变,只是添加了元素,所以操作的是原型上的nums
console.log(Book.prototype); // { title: '红宝书', nums: [ 1, 2, 3, 4 ] }

// 如果是赋值的话,则还是赋值在对象上,原型不受影响
book.nums = [1024]
console.log(Book.prototype); // { title: '红宝书', nums: [ 1, 2, 3, 4 ] }
console.log(book.nums); // [ 1024 ]
```

## 继承
常见的继承方式: 原型链继承、经典继承(盗用构造函数继承)、组合继承、原型式继承、寄生式继承、寄生组合继承。

记住: 继承无非就是修改原型链、通过call将父类的实例属性绑定到子类的实例上

PS: 接下去的子类和父类并不是class的类,只是一个概念,子类是需要继承的一方,而父类是被继承的一方。

#### 原型链继承
```javascript
// 原型链继承: 将子类的原型链赋值为父类的实例对象,以获取父类原型上的属性和方法
function SuperType() {
	this.sup = 'Super Value';
}
SuperType.prototype.nums = [1,2,3,4];
SuperType.prototype.superTypeFn = function () {
	console.log('SuperType的方法');
};

function SubType() {
	this.sub = 'Sub Value';
}

SubType.prototype = new SuperType();
// 也可以写成 SubType.prototype = Object.create(SuperType.prototype),不过这种方式只能获取父类的原型上的属性和方法,获取不到父类实例属性和方法


// 通过原型继承了父类的属性和方法
let s = new SubType();
console.log(s.sup); // Super Value
s.superTypeFn(); // SuperType的方法
s.nums.push(4); // nums是引用数据类型,d


let s2 = new SubType();
console.log()
```
**问题:**
  - 父类原型上的属性在实例之间共享,如果是基本数据类型倒没什么问题,如果是引用数据类型,则修改其属性会影响所有实例
  - 无法向父类传递参数

#### 经典继承(盗用构造函数继承)
```javascript
// 经典继承(盗用构造函数继承): 通过call实现,在子类中调用SuperType.call(this) 将实例属性/方法绑定到this(此处的this就是子类的实例对象)

function SuperType(sup){
  this.sup=sup
}

// 经典继承 - 子类无法获取父类原型上的属性和方法
SuperType.prototype.title = 'Super';
SuperType.prototype.log = function(){
  console.log('nice');
}


function SubType(){
  SuperType.call(this,'Super Value'); // 支持传递参数
}

let s = new SubType()
console.log(SubType.prototype);

console.log(s instanceof SuperType); // false, 原型链不包含SuperType的原型
console.log(s.sup); // Super Value

// 无法获取父类原型上的属性和方法
console.log(s.title); // undefined
console.log(s.log); // undefined
```

**优点:**
  - 可以传递参数

**问题:**
  - 原型链并没有继承下来,子类无法访问父类的原型链上的属性和方法
  - 即便是公共的实例方法,每次实例化时都会重新创建

#### 组合继承
```javascript
// 组合继承
// 继承需要做什么？
// 1. 继承父类的实例属性和方法并能够传递参数, 盗用构造函数继承能做到
// 2. 继承父类原型上的属性和方法, 原型链继承能做到
// 因此将原型链继承和盗用构造函数继承进行组合, 即组合继承,兼备双方优点,是当前使用最多的继承方式
function SuperType(sup) {
	this.sup = sup;
}
SuperType.prototype = {
	type: 'SuperType',
	log(){
		console.log('Log');
	}
};

function SubType() {
	// 盗用构造函数形式
	SuperType.call(this, 'Super Value'); // 能够传递参数
}

// 1.SuperType的实例拿去赋值是比较差的选择 但是其他方式也都有问题 所以旧版本一般使用这种方式
// SubType.prototype = new SuperType();
// Object.setPrototypeOf(SubType.prototype, new SuperType()); 

// 2. __proto__有兼容性问题
// SubType.prototype.__proto__ = SuperType.prototype;

// 3. setPrototypeof ES6新增的语法,支持ES6时的推荐写法
Object.setPrototypeOf(SubType.prototype, SuperType.prototype);

let s = new SubType();
console.log(s); // SubType { sup: 'Super Value' }

// 原型链继承完整,原型链上包含SubType和SuperType的原型
console.log(s instanceof SubType);  // true
console.log(s instanceof SuperType); // true

// 访问父类原型上的属性和方法
console.log(s.type); // SuperType
s.log(); // Log

// 父类的实例属性也绑定到子类实例上
console.log(s.sup);
```

#### 原型式继承
```javascript
// 原型式继承就是以某个对象直接作为原型创建新的对象
// 也是操作原型链, 不需要父类构造函数,直接以某个原型对象创建新的对象
// ES6提供了Object.create(proto)来实现原型式继承
const proto = {
	type: 'SuperType'
}

function SubType() {}

SubType.prototype = proto;

const sub = new SubType();
console.log(sub.type); // SuperType

function createObject(prototype) {
	function F() {}
	F.prototype = prototype;
	let obj = new F();
	return obj;
}

const sub2 = createObject(proto);
console.log(sub.type); // SuperType
```

#### 寄生式继承
```javascript
// 寄生式继承
// 可以理解为将继承操作寄生到某个增强对象的函数上,使其实现继承的同时,还能对新对象进行扩展
function enhanceObject(proto){
  // 1.继承操作,以某种继承的方式创建新的对象,此处以原型式举例,但并不是只能使用原型式
  const obj = Object.create(proto);
  // 2. 增强对象
  obj.study= function(){
    console.log('Good Good Study~');
  }
  return obj;
}

const student = enhanceObject({ profession: 'student' });

// 既能访问该原型的属性,又能使用扩展的方法
console.log(student.profession); // student
student.study(); // Good Good Study~

```

#### 寄生组合继承
```javascript
// 寄生式组合继承
// 继承的最佳实践 class实现的原理
// 盗用构造函数 + 混合式原型链继承 + 寄生式继承
function SuperType() {
	this.sup = 'Super Value';
}

function SubType() {
  // 盗用构造函数,相当于class中构造函数中的super
	SuperType.call(this); 
	this.sub = 'Sub Value';
}


// 注意:以下这个函数功能接近class中的extends
function inheritPrototype(subType, superType) {
	// // 1. 以superType的原型对象为原型,创建一个subType的原型对象,并将其constructor属性指向构造函数
	let proto = Object.create(superType.prototype);
  // 2. 为对象进行扩展(这里和寄生式继承含义相同)
  proto.constructor = subType;
  // 3. 混合式原型链继承
  // 原型链继承是赋值父类实例的,现在赋值原型式创建的对象,所以叫混合式原型链继承
	subType.prototype = proto;
	// 基本等效
	// Object.setPrototypeOf(subType.prototype, superType.prototype);
	// subType.prototype.constructor = subType;
}

inheritPrototype(SubType, SuperType);

let s = new SubType();
console.log(SubType.prototype); // 原型对象上的constructor指向构造函数

// 原型链包含SuperType和SubType
console.log(s instanceof SuperType); 
console.log(s instanceof SubType);
```