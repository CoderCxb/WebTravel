# Set - 集合 <Badge text="ES6" />
Set对象用于存储任意类型的唯一值,即不会重复,类似于数组,有Set和WeakSet两种Set类型。

## Set
Set通过构造函数创建Set对象,Set是可迭代对象,可参考[Iterator - 迭代器](TODO)。
```javascript
// 1. 不传递参数(等价于传递undefined)或者传递null
console.log(new Set()); // Set(0) {}
console.log(new Set(undefined)); // Set(0) {}
console.log(new Set(null)); // Set(0) {}

// 2. 传递可迭代对象,如数组、字符串等
const arrSet = new Set([1,2,3]);
console.log(arrSet); // Set(3) { 1, 2, 3 }

const strSet = new Set('abc');
console.log(strSet); // Set(3) { 'a', 'b', 'c' }

// Set对象本身也是可迭代对象,所以也可以用来创建新的Set对象
const s = new Set([1,2,3,4]);
const copySet = new Set(s);
console.log(copySet); // Set(4) { 1, 2, 3, 4 }
```
 
### 相等逻辑
 - 判断逻辑基本同Object.is一致
 - +0、-0、0被认为是相等的
 - 基本数据类型中只有NaN比较特别(NaN不等于自身,但是Set中不会被重复添加)。
 - 引用数据类型是判断引用地址是否为相同地址
```javascript
const obj = { name: 'o' };
const arr = [29];
const s = new Set([
  1024,1024,
  '1024','1024',
  true,true,
  null,null,
  undefined,undefined,
  NaN,NaN,
  obj,obj,
  arr,arr,
]);

console.log(s);

// Set(8) {
//   1024,  
//   '1024',
//   true,
//   null,
//   undefined,
//   NaN,
//   { name: 'o' },
//   [ 29 ]
// }
```

### 使用演示
```javascript
const s = new Set();

// add(value)方法在Set对象末尾添加元素(无法添加已经存在的元素),返回值为Set对象本身,所以可以链式调用
s.add(1024).add(1024).add('hello');

// size属性为Set对象元素的个数,无法手动修改
console.log('size:', s.size); // size: 2

// forEach方法遍历执行回调函数, 接收参数forEach(callback,thisArg)
// currentValue和currentKey都表示被操作的元素,set表示当前操作的set对象
const thisArg = { name: 'thisObj' };
s.forEach(function(currentValue,currentKey,set){
  // 避免看起来比较乱,这里就注释掉了,需要看的话打开注释即可
  // console.log(currentValue,currentKey,set);
  // console.log(this); // { name: 'thisObj' }
}, /**指定回调函数中的this对象 **/ thisArg);


console.log('Set:', s); // Set: Set(2) { 1024, 'hello' }

// values方法按照Set对象元素的插入顺序,返回一个可迭代对象
console.log('values:',s.values());  // values: [Set Iterator] { 1024, 'hello' }

// keys方法是values方法的别名,作用相同
console.log('keys', s.keys());    // keys [Set Iterator] { 1024, 'hello' }

// entries方法返回[key,value]形式的可迭代对象,注意,Set对象的key和value是一样的
console.log('entries:', s.entries()); // entries: [Set Entries] { [ 1024, 1024 ], [ 'hello', 'hello' ] }

// delete方法删除指定元素,返回布尔值,表示是否删除成功
console.log(s.delete(1024)); // true
console.log('Set:', s); // Set:Set(1) { 'hello' }

// has方法判断Set对象是否包含元素,返回布尔值
console.log('has 1024:', s.has(1024)); // has 1024: false

// clear方法用来清空Set对象中的所有元素
s.clear();
console.log('Set:', s); // Set: Set(0) {}
```

### 去重
由于Set可以不重复地接收可迭代对象,这就意味着,可以对可迭代对象进行去重,如数组、字符串等。
```javascript
// 可迭代可转换成数组
const s = new Set();
s.add(1);
s.add(2);
s.add(3);
console.log([...s]); // [1,2,3]

// 数组去重
const arr = [1,1,2,3,3,4,5,6,6];
console.log([...new Set(arr)]); // [ 1, 2, 3, 4, 5, 6 ]

// 字符串去重
const str = 'Hello World';
console.log([...new Set(str)].join('')); // Helo Wrd

// 相当于以下三步
// 1. new Set(str) 将字符串转换成一个Set对象,此时已经完成去重,但是是Set对象
const strSet = new Set(str); 
console.log(strSet);    // Set(8) { 'H', 'e', 'l', 'o', ' ', 'W', 'r', 'd' },已经没有重复的字符了
// 2. [...new Set(str)] 将去重的Set对象转换成数组
const charArr = [...strSet];
console.log(charArr);   // [ 'H', 'e', 'l', 'o', ' ', 'W','r', 'd']
// 3. 将数字使用join方法拼接起来 
const uniqueStr = charArr.join('');
console.log(uniqueStr); // Helo Wrd
```


## WeakSet
WeakSet构造函数用于创建一个WeakSet对象(不可迭代),只能以弱引用的形式存储对象,无法存储基本数据类型,判断相等逻辑和Set相同。

### 与Set的区别
 - WeakSet对象只能存储引用数据类型
 - WeakSet中的对象是弱引用(不计入引用,不阻止垃圾回收),如果没有被别的地方引用,在垃圾回收时会被回收,因此WeakSet不可枚举,也没有size
 - WeakSet不可迭代,也没有forEach、keys、values、entries等循环遍历的方法

### 使用演示
```javascript
// 构造函数的用法和Set相同,不过可迭代对象中的元素必须是对象
const ws = new WeakSet();

const arr = [1,2,3];

const obj = { type: 'obj' };

// add(value)方法在Set对象末尾添加元素(无法添加已经存在的元素),返回值为Set对象本身,所以可以链式调用
ws.add(arr).add(obj);

// has方法判断Set对象是否包含元素,返回布尔值
console.log(ws.has(arr)); // true

// delete方法删除指定元素,返回布尔值,表示是否删除成功
console.log(ws.delete(obj)); // true, 删除成功

// 不可枚举、也不是可迭代对象,也没有forEach、keys、values、entries

// WeakSet不可枚举,无法查看元素
console.log(ws); // WeakSet { <items unknown> }
```


### 检测循环引用
WeakSet只能存储弱引用对象,无法获取值,但是判断对象是否在WeakSet中比较简单,可用于检测或避免循环引用,手写[深拷贝](TODO)时也需要考虑到循环引用。

**思路**: 循环遍历对象上的所有属性(属性是对象还需要再循环遍历),使用WeakSet存储所有出现的对象,如果对象重复出现,则说明存在循环引用 - 这里的对象指的是引用数据类型。

**为什么使用WeakSet而不是Set**: 用Set同样可以实现相同的效果,但是Set上的部分属性、方法以及可迭代性对于判断都是无用的,因此WeakSet更适合于检测循环引用,至于弱引用在此处并没有明显优势,因为对象都有被外部引用,所以不存在被垃圾回收的情况。
```javascript
/**
 * 检测对象中是否循环引用
 * @param {Object} obj  需要判断循环引用的对象
 */
function isCircularReference(obj){
  // refs存储obj和其属性中包含的所有对象
  const refs = new WeakSet();
  // result存储结果,即是否循环引用
  let result = false;
  // 判断循环引用的函数
  function judgeCircularReference(value){
    // 如果value已经在refs上(重复出现),则说明循环引用了
    if(refs.has(value)) {
      result = true;
      return; // 直接打断后续执行,避免无限循环
    }
    // value是引用数据类型(对象)时,需要遍历继续判断
    if(value instanceof Object){
      // 将value加入refs
      refs.add(value);
      for (const key in value) {
        // 遍历判断value的每一项
        judgeCircularReference(value[key])
      }
    }
  }
  // 调用判断循环引用的函数
  judgeCircularReference(obj);
  return result;
}

const falseArr = [1024,'hello',null,undefined,Symbol(),1024n,true,[],{}];

falseArr.forEach(function(value){
  console.log(value,':',isCircularReference(value));
});
// 测试基本数据类型和正常引用数据类型,都符合预期
// 1024 : false
// hello : false
// null : false
// undefined : false
// Symbol() : false
// 1024n : false
// true : false
// [] : false
// {} : false

// cr和o是循环引用的对象
const o = {};
const cr = { o };
o.cr = cr;
const trueArr = [o,cr];

// 测试循环引用的对象,返回true,符合预期
trueArr.forEach(function(value){
  console.log(value,':',isCircularReference(value));
})

// <ref *1> { cr: { o: [Circular *1] } } : true
// <ref *1> { o: { cr: [Circular *1] } } : true
```

