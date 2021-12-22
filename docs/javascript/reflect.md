# Reflect
Reflect是内置对象,提供了Javascript操作的方法,它不是函数对象,所以无法通过new来创建实例对象。

Reflect(不兼容IE)可以和proxy(也不兼容IE)完美配合,不过在项目中使用频率非常低,现阶段稍做了解,暂时不需要花过多时间深入学习。

## Reflect.get
Reflect.get()方法以函数调用的形式从对象中读取属性。
###### 参数列表: Reflect.get(target, propertyKey[, receiver])
  - target
    - 详情:取值对象 - 必须是对象,否则抛出异常
    - 必填: true
  - propertyKey
    - 详情: 属性名,用于获取对应的值
    - 必填: true
  - receiver:
    - 详情: 在属性是以getter的形式设置时,receiver作为getter函数的this
    - 必填: false
```javascript
const obj = {
  get name(){
    console.log(this); // { name: 'receiver' }, getter的this默认是obj,但是Reflect.get的时候可以指定this
    return 'Marco';
  }
};
// 获取obj上key为name的值,若该属性是getter形式,其中的this为{ name: 'receiver' }
console.log(Reflect.get(obj,'name', { name: 'receiver' })); // Marco

// target必须是对象,否则类型错误
console.log(Reflect.get(1024,'name')); // TypeError: Reflect.get called on non-object - 类型一次:在非对象上调用Reflect.get
```

## Reflect.set
Reflect.set()方法以函数调用的形式设置对象属性。
###### 参数列表: Reflect.set(target, propertyKey, value[, receiver])
  - target
    - 详情:取值对象 - 必须是对象,否则抛出异常
    - 必填: true
  - propertyKey
    - 详情: 属性名,设置的属性的名称
    - 必填: true
  - value
    - 详情: 属性名对应的值
    - 必填: true
  - receiver:
    - 详情: 在属性是以setter的形式设置时,receiver作为setter函数的this
    - 必填: false
```javascript
const obj = {};

console.log(Reflect.set(obj)); // true,但是没有指定key和value,所以key和value都是undefined

console.log(obj); // { undefined: undefined }

const coder = {};

Reflect.set(coder, 'code', 1024);

console.log(coder); // { code: 1024 }, 设置成功

const student = {
  _source: 60,
  get source(){
    return this._source;
  },
  set source(source){
    // 默认情况下,this指向student,但是Reflect.set可以指定receiver改变this指向
    this._source = source;
  }
};

const receiver = { name: 'receiver'};

Reflect.set(student,'source',100); 

console.log(student.source); // 100

Reflect.set(student,'source', 99 ,receiver);

// 可以发现,student.source没有改变,因为指定了receiver,所以this改变了,实际上修改的是receiver
console.log(student.source);   // 100
console.log(receiver._source); // 99

// 无法设置/无法修改的属性值,使用Reflct.set设置会失败,返回false
const person = {}
Object.defineProperty(person,'name', {
  value:'Peate',
  configurable:false,
  writable:false,
  enumerable:true
})

console.log(Reflect.set(person,'Jiessie',2048)); // false,设置失败
console.log(person.name); // Peate
```


## Reflect.defineProperty
Reflect.defineProperty()用于设置属性描述,基本与Object.defineProperty等价,返回boolean。
###### 参数列表: Reflect.defineProperty(target, propertyKey, attributes)
  - target
    - 详情:取值对象 - 必须是对象,否则抛出异常
    - 必填: true
  - propertyKey
    - 详情: 属性名,用于获取对应的值
    - 必填: true
  - attributes:
    - 详情: 属性描述,用于设置该属性
    - 设置项:
      - value: 属性值,默认undefined
      - configurable: 是否可设置,默认false,即该属性无法重新设置,也无法删除
      - enumerable: 是否可枚举,默认false,即该属性无法被枚举,如打印对象、for..of..和Object.keys()时不会显示
      - writable: 是否可修改,默认false,即该属性的值无法被修改
      - get: getter函数,默认undefined
      - set: setter函数,默认undefined
    - 必填: true

###### 描述符分类
注意: （get、set）和（value、writable）不能够同时出现在一个描述符中
|   | enumerable | configurable  | value  |  writable  | get |  set  |
|   :----:  |   :----: |   :----:  |   :----: |   :----:   |   :----: |   :----:   |
| 数据描述符  | 可以 | 可以  | 可以 |  可以  | 不可以 |  不可以  |
| 存取描述符  | 可以 | 可以  | 不可以 |  不可以  | 可以 |  可以  |

```javascript
const obj = {};
Reflect.defineProperty(obj,'name',{
  value: 'Jack',
  writable: false,
  set(){},
  get(){},
}); 
// 类型异常: 无效属性描述符,无法同时指定存取器(getter/setter)和 value或writable.
// TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute
```


###### 演示
```javascript
const book = {};
Reflect.defineProperty(book,'title', {
  value:'You don\'t know JS', // 属性值
  configurable: false,        // 是否可设置
  enumerable: false,          // 是否可枚举
  writable: false,            // 是否可修改
});

console.log(delete book.title); // configurable为false,无法删除

const res = Reflect.defineProperty(book,'title',{
  value:'Javascript高级教程'
}); 
console.log(res); // false, 因为configurable为false,所以无法重新设置

console.log(book); // {}, enumerable为false,无法枚举
for (const key in book) {
  console.log(key); // 无法枚举,所以什么也不打印
}
console.log(Object.keys(book));  // [], 无法枚举,Object.keys只能获取可枚举的属性名

console.log(book.title); // You don't know JS, 虽然无法枚举,但是还是可以获取

book.title = 'Javascript语言精粹';
console.log(book.title); // You don't know JS, writable为false,所以无法修改值
```

## Reflect.deleteProperty
Reflect.deleteProperty()用于删除属性,与非严格模式的delete基本一致
###### 参数列表 Reflect.deleteProperty(target, propertyKey)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true
  - propertyKey
    - 详情: 属性名,删除属性名对应的值
    - 必填: false,默认undefined

```javascript
const cat = {
  name: 'QiQi',
  type: 'American Shorthair',
  age: 0.5,
  undefined: 'U'
};

// 删除属性成功,返回true
console.log(Reflect.deleteProperty(cat,'age')); // true

// 属性不存在也算成功,返回true
console.log(Reflect.deleteProperty(cat, 'sex')); // true 

Reflect.defineProperty(cat,'name',{
  configurable:false,
});
// 不传propertyKey时,propertyKey默认为undefined,所以删除键名为undefined的属性
console.log(Reflect.deleteProperty(cat)); // true

// 不可配置的属性无法使用delete和Reflect.deleteProperty删除,返回false
console.log(Reflect.deleteProperty(cat,'name')); // false
```

## Reflect.getOwnPropertyDescriptor
Reflect.getOwnPropertyDescriptor()方法以函数调用的形式从对象中读取属性描述符。
###### 参数列表: Reflect.getOwnPropertyDescriptor(target, propertyKey)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true
  - propertyKey
    - 详情: 属性名,用于获取对应的属性描述符
    - 必填: false,默认undefined

```javascript
const obj = {
  code:1024
};

Reflect.defineProperty(obj, 'name', {
  value:'Polo',
  writable:false,
  configurable:false,
  enumerable:false,
})

console.log(Reflect.getOwnPropertyDescriptor(obj,'name'));  // {value: 'Polo', writable: false,enumerable: false,configurable: false}
// 对象中直接定义的属性,writable、enumerable、configurable都是true
console.log(Reflect.getOwnPropertyDescriptor(obj,'code'));  // { value: 1024, writable: true, enumerable: true, configurable: true }
console.log(Reflect.getOwnPropertyDescriptor(obj,'title')); // undefined
```

## Reflect.setPrototypeOf
Reflect.setPrototypeOf()方法以函数调用的形式设置对象的原型对象,与Object.setPrototypeOf基本一致,关于参考[原型]()。
###### 参数列表: Reflect.getPrototypeOf(target)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true
  - 

## Reflect.getPrototypeOf
Reflect.getPrototypeOf()方法以函数调用的形式获取对象的原型对象,与Object.getPrototypeOf基本一致,关于参考[原型]()。
###### 参数列表: Reflect.getPrototypeOf(target)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true

###### 演示
```javascript
console.log(Reflect.getPrototypeOf({}));       // [Object: null prototype] {}
console.log(Reflect.getPrototypeOf([]));       // Object(0) []
const obj = Object.create({ name: 'proto' });  // Object.create()创建指定原型的对象
console.log(Reflect.getPrototypeOf(obj));      // { name: 'proto' }
```

## Reflect.has
Reflect.has()方法判断对象以及其原型链上是否包含某个属性,与in作用相同,返回boolean。
###### 参数列表: Reflect.has(target, propertyKey)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true
  - propertyKey
    - 详情:属性名,对象上是否包含该属性
    - 必填: false,默认undefined

###### 演示
```javascript
const person = {
  name: 'Tony',
}

// 设置原型对象,原型对象上有 gender属性
Reflect.setPrototypeOf(person,{
  gender:'man'
})

// 不可枚举属性
Reflect.defineProperty(person,'sport', {
  value:'run',
  enumerable:false,
})

// 对象自身的属性
console.log(Reflect.has(person,'name'));    // true
console.log('name' in person); // true

// 原型链上存在也会返回true
console.log(Reflect.has(person,'gender'));  // true
console.log('gender' in person); // true

// 不可枚举的属性也会返回true
console.log(Reflect.has(person,'sport'));  // true
console.log('sport' in person); // true

// 不存在的属性
console.log(Reflect.has(person,'age')); //false
console.log('age' in person); //false
```

## Reflect.preventExtensions
Reflect.preventExtensions()方法禁止对象扩展(即禁止新增属性)。
###### 参数列表: Reflect.preventExtensions(target)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true

###### 演示
```javascript
const empty = {};

Reflect.preventExtensions(empty);

// 无论是属性描述符
Reflect.defineProperty(empty,'title', {
  value: 'Hello World'
})
// 还是直接设置属性
empty['sport'] = 'run';

// 都无法设置成功
console.log(empty); // {}
```

###### 和Object.preventExtensions的区别
Object.preventExtensions接收非对象的值时，会将其转换成对象,而Reflect.preventExtensions直接报错。
```javascript
Object.preventExtensions('');  // 非对象会被转换成对象
Reflect.preventExtensions(''); // TypeError: Reflect.preventExtensions called on non-object - 类型异常: 对非对象调用Reflect.preventExtensions
```

## Reflect.isExtensible
Reflect.isExtensible()方法判断对象是否可以可扩展(即是否可新增属性)。
###### 参数列表: Reflect.isExtensible(target)
  - target
    - 目标对象 - 必须是对象,否则抛出异常
    - 必填: true

###### 演示
```javascript
const obj = {};

console.log(Reflect.isExtensible(obj)); // true
console.log(Reflect.set(obj, 'type', 'computer')); // true

// 禁止扩展
Reflect.preventExtensions(obj);

console.log(Reflect.isExtensible(obj));
console.log(Reflect.set(obj,'size', '14')); // false
```

###### 与 Object.isExtensible()的区别   
Object.isExtensible接收非对象的值时，会将其转换成对象,而Reflect.isExtensible直接报错。
``` javascript
Object.isExtensible('');   // 非对象会被转换成对象
Reflect.isExtensible('');  // TypeError: Reflect.isExtensible called on non-object - 类型异常: 对非对象调用Reflect.isExtensible
```

## Reflect.ownKeys
Reflect.ownKeys()返回一个由目标对象自身的属性名(包含symbol属性名)组成的数组 - 不包含原型链上的属性。
###### 参数列表: Reflect.ownKeys(target)
  - target
    - 详情:目标对象 - 必须是对象,否则抛出异常
    - 必填: true

###### 演示
```javascript
const s = Symbol();
const student = {
  name:'xm',
  grade: 6,
  [s]: 'symbol value'
}

Reflect.setPrototypeOf(student, { gender: 'man' });

// Reflect.ownKeys可以获取包含
console.log(Reflect.ownKeys(student)); // [ 'name', 'grade', Symbol() ]

// 等价于 Object.getOwnPropertyNames(获取非symbol的自身属性)和Object.getOwnPropertySymbols组合使用(获取自身symbol属性)
console.log(Object.getOwnPropertyNames(student).concat(Object.getOwnPropertySymbols(student)));
```

## Reflect.apply
Reflect.apply()可以在调用函数的同时指定函数中的this并指定参数列表。
###### 参数列表: Reflect.apply(target, thisArgument, argumentsList)
  - target
    - 详情:目标对象 - 必须是函数,否则抛出异常
    - 必填: true
  - thisArgument
    - 详情:函数调用时的this
    - 必填: true
  - argumentsList
    - 详情:函数调用时接收的参数列表,接收数组/类数组结构,不需要参数也要传[]
    - 必填: true

###### 演示
```javascript
function test(...args){
  console.log('this', this); // this { type: 'this' }
  console.log('args', args); // args [ 1, 2, 3 ]
}

const _this = { type: 'this' };

// 使用Reflect.apply,较少使用
Reflect.apply(test, _this, [1,2,3])

// 等价于 fn.apply, 推荐而且常见, 函数都具备apply这个方法(通过原型链上继承来的)
test.apply(_this, [1,2,3])
```

###### 应用
介绍apply的常见用法,想要熟练用好apply还需要对this有所了解,和Function.prototype.apply(推荐使用)效果相同。[this - TODO]()
```javascript
// 1. 改变this指向
// apply具有和call一样改变this的作用
console.log(Reflect.apply(Object.prototype.toString,'hello',[])); // [object String]
console.log(Reflect.apply(Object.prototype.toString,[1,2,3],[])); // [object Array]

// 类数组调用数组的方法
console.log(Reflect.apply(Array.prototype.join,likeArray,['-'])); // 0-1-2
console.log(Reflect.apply(Array.prototype.reverse,likeArray,[])); // { '0': 2, '1': 1, '2': 0, length: 3 }

// 字符串可以调用数组的不改变数组的方法,如 join,filter,map等
console.log(Reflect.apply(Array.prototype.join,'hello',['-']));   // h-e-l-l-o
console.log(Reflect.apply(Array.prototype.filter,'hello',[(c)=> c === 'l'])); // [ 'l', 'l' ]

// pop、push、shift、unshift、reverse等会改变原数组的方法无法对字符串使用,因为字符串是不变的
// 类型异常: 不能修改[object String]对象的只读属性 - 之前说过 字符串是不可变的
// console.log(Reflect.apply(Array.prototype.reverse,'hello',[]));   // TypeError: Cannot assign to read only property '0' of object '[object String]'

// 2. 将数组展开传入
const arr = [10,2,3,4,5,6];

// 默认情况下,Math.max以...value的形式接收参数,无法接收一个数组作为参数
console.log(Math.max(1,2,3)); // 3

// 使用Reflect.apply展开传入
console.log(Reflect.apply(Math.max,null,arr)); // 10

// 使用apply可以将数组展开传入
console.log(Math.max.apply(null,arr)); // 10

// 等价于
console.log(Math.max(...arr)); // 10
```

## Reflect.construct
Reflect.construct()类似于new运算符,用于创建构造函数的实例。

###### 参数列表 Reflect.construct(target, argumentsList[, newTarget])
  - target
    - 详情: 目标对象,必须是函数,否则抛出异常
    - 必填: true
  - argumentsList
    - 详情: 构造函数的参数列表
    - 必填: true, 接收数组/类数组结构,不需要参数也要传[]
  - newTarget
    - 详情: 作为新建的实例对象的constructor属性,会改变实例的原型对象和constructor属性
    - 必填: false,默认为 target

###### 演示
```javascript
class Person{
  name;
  alias;
  constructor(name,alias){
    this.name=name;
    this.alias=alias;
  }
  run(){
    console.log('run');
  }
}
class Student {
  study(){ console.log('study'); }
}

// 改变了constructor,可以看到,原型链也发生了改变,无法在使用原本构造函数中的实例方法,而可以使用传入的构造函数的实例方法

// zs原本应该是Person的实例对象,可以调用run,不能调用study
// 因为传入了newTarget,改变了constructor和原型链,除了实例自身的属性,其他的都由新的构造函数决定
const zs = Reflect.construct(Person,['张三','法外狂徒'], Student); // 新构造函数 Student
console.log(Reflect.getPrototypeOf(zs) === Student.prototype); // true
console.log(zs);  // Student { name: '张三', alias: '法外狂徒' }
console.log(zs.constructor); // [class Student]
// zs.run(); // TypeError: zs.run is not a function
zs.study();  // study

const ssx = Reflect.construct(Person,['孙尚香','大小姐']);
console.log(Reflect.getPrototypeOf(ssx) === Person.prototype); // true
console.log(ssx); // Person { name: '孙尚香', alias: '大小姐' }
console.log(ssx.constructor); // [class Person]
ssx.run(); // run 
// ssx.study();  // TypeError: ssx.study is not a function
```