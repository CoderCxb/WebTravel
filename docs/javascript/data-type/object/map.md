# Map - 映射 <Badge text="ES6" />
Map是ES新增的引用数据类型,保存键值对,键和值可以是任意类型的值,可以弥补Object键只能是String和Symbol的局限性,当你需要使用对象(引用数据类型)作为key时可以使用Map。

## Map
Map通过构造函数创建Map对象,可接受[[key,value],...]形式的数组,Map实例上提供了操作Map对象的API,Map对象是可迭代对象,参考[Iterator - 迭代器](TODO)。
```javascript
// 不传递参数
const m = new Map();
m.set('str', 'hello');
console.log(m); // Map(1) { 'str' => 'hello' }

// 传递[[key,value],...]形式的参数
const arrKey = [];
const m2 = new Map([
  [arrKey,'arr'],
  ['obj', {type: 'obj'}]
]);

m2.set('code',1024);
 
console.log(m2); // Map(3) { [] => 'arr', 'obj' => { type: 'obj' }, 'code' => 1024 }

// map转成数组,形式如 [[key,value], ... ]
console.log([...m2]); // [ [ [], 'arr' ], [ 'obj', { type: 'obj' } ], [ 'code', 1024 ] ]
```
### 相等逻辑
 - map的相等逻辑针对的是key,也就是键
 - 判断逻辑基本同Object.is一致
 - +0、-0、0被认为是相等的
 - 基本数据类型中只有NaN比较特别(NaN不等于自身,但是Set中不会被重复添加)
 - 引用数据类型是判断引用地址是否为相同地址
 
### Map与Object区别 
|   | Map | Object  | 
|   :----:  |   :----: |   :----:  |  
| 键的类型  | 任意类型 | String或Symbol  | 
| 键的顺序 | Map是有序的  | Object是无序的 |  
| 键的数量 | Map可以通过size获取  | Object只能通过手动遍历计算 |  
| 迭代  | Map是可迭代对象,默认支持迭代 | Object需要使用如Object.keys的Api获取键的数组以后迭代  | 
| 性能  | 优化频繁增删时的性能 | 无优化  | 

### 使用演示
```javascript
const map = new Map();

const arrKey = [];
const objKey = {};
// set方法设置键值对,如果key已经存在则覆盖,不存在则创建,返回值是Map对象,可链式调用
map.set(arrKey,null).set(arrKey,'arrValue'); // 同一个key重复赋值,会进行覆盖,即保留后者赋的值
map.set(objKey,'objValue');


// size属性返回Map中的元素个数
console.log(map.size); // 2

// Map对象上存在Symbol.toStringTag属性,可配置,无法写入和枚举
console.log(map[Symbol.toStringTag]); // Map
console.log(Object.prototype.toString.call(map)); // [object Map]

// has方法判断Map中是否存在指定的key,存在返回true,否则false
console.log(map.has(arrKey)); // true

// get方法获取Map中key对应的值,如果找不到,则返回undefined
console.log(map.get(arrKey));  // arrValue
console.log(map.get('type'));  // undefined

// keys方法获取Map中的键(key)的迭代对象
console.log(map.keys()); // [Map Iterator] { [], {} }

// values方法获取Map中值(value)的迭代对象
console.log(map.values()); // [Map Iterator] { 'arrValue', 'objValue' }

// entries方法获取Map中键值对的迭代对象
console.log(map.entries()); //[Map Entries] { [ [], 'arrValue' ], [ {}, 'objValue' ] }

const thisArg = { name: 'thisObj' };
// forEach方法遍历执行回调函数 接收参数(value,key,m) 即 (值,键,Map对象)
map.forEach(function(value,key,m){
  // 避免看起来比较乱,这里就注释掉了,需要看的话打开注释即可
  // console.log(value,key,m);
  // console.log(this);
},  /**指定回调函数中的this对象 **/  thisArg)

// delete方法删除指定key以及对应的value,删除成功返回true,否则false
console.log(map.delete(arrKey)); // true

// clear方法清空Map中的元素
map.clear(); 

console.log(map); // Map(0) {}
```
### 转换
```javascript
// 对象转换成map
const book = { type: 'book', name: 'JavaScript高级程序设计'};
const bookMap = new Map(Object.entries(book));
console.log(bookMap); // Map(2) { 'type' => 'book', 'name' => 'JavaScript高级程序设计' }

/**
 * map转换成对象的函数
 * @param {Map} map  需要转换成对象的Map对象
 */
function mapToObject(map){
  const obj = Object.create(null);
  map.forEach(function(value,key){
    obj[key] = value;
  })
  return obj;
}
console.log(mapToObject(bookMap)); // { type: 'book', name: 'JavaScript高级程序设计' }

// 数组转换成map,数组的形式需要是 [ [key,value], ... ]形式
const hero = [ ['name','Iron Man']];
const heroMap = new Map(hero);
console.log(heroMap); // Map(1) { 'name' => 'Iron Man' }

// map转换成数组
// 1. 使用扩展运算符
console.log([...heroMap]); // [ [ 'name', 'Iron Man' ] ]
// 2. 使用Array.from
console.log(Array.from(heroMap)); // [ [ 'name', 'Iron Man' ] ]
```


## WeakMap
WeakMap对象存储键值对,其中的键是弱引用且必须是对象,而值可以是任意类型,构造函数使用同map,当你想以对象作为key,并且不想影响对象的垃圾回收,可以使用WeakMap。
### 与Map的区别
 - WeakMap的键只能是对象
 - WeakMap中的键是弱引用(不计入引用,不阻止垃圾回收),值是正常引用,如果没有被别的地方引用,在垃圾回收时会被回收,因此WeakSet不可枚举,也没有size
 - WeakMap不可迭代,也没有forEach、keys、values、entries等循环遍历的方法

### 使用演示
```javascript
const wm = new WeakMap();

const arrKey = [];
// set方法设置键值对,如果key已经存在则覆盖,不存在则创建,返回值是WeakMap对象,可链式调用
wm.set(arrKey, null).set(arrKey,'arrValue');

// has方法判断WeakMap中是否存在指定的key,存在返回true,否则false
console.log(wm.has(arrKey)); // true

// get方法获取Map中key对应的值,如果找不到,则返回undefined
console.log(wm.get(arrKey)); // arrValue

// delete方法删除指定key以及对应的value,删除成功返回true,否则false
console.log(wm.delete(arrKey));
```