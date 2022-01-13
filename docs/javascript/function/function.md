# 函数
函数是指一段可以直接被另一段程序或代码引用的程序或代码,在Javascript中,函数同时也是对象,它是Function构造函数的实例,同其他引用数据类型一样,有自己的方法和属性。
```javascript
// 无论是通过函数声明还是函数表达式定义的函数,都是Function和Object的实例,即它是对象
function run (){}
console.log(run instanceof Function); // true
console.log(run instanceof Object); // true 
console.log(run.name); // run, 函数名

const sing = function(){}
console.log(sing instanceof Function); // true
console.log(sing instanceof Object); // true
console.log(sing.name); // sing, 函数名

// 即然函数是对象、引用数据类型,那么赋值的就是引用了
const sing2 = sing; 
console.log(sing === sing2) // true
console.log(sing2.name); // sing, 函数名 
```

## 定义函数
界定是函数声明还是函数表达式主要是根据函数定义出现的位置,函数声明是语句,而函数表达式顾名思义,是表达式,出现在语句位置的是函数声明,出现在表达式位置的是函数表达式。[ 语句 - 表达式 ](TODO)
### 函数声明
```javascript
// 函数声明的形式 - function 函数名(参数列表){函数体}
function run(who,doing){
  console.log(who + " is " + doing);
} /* 函数声明结尾不需要分号(;) */
run('Jim','running'); // Jim is running
```

### 函数表达式
```javascript
const sing = function(who,doing){
  console.log(who + " is " + doing);
};
sing('Tom','singing'); // Tom is singing

// 箭头函数的函数表达式
const play = (who,doing) => {
  console.log(who + " is " + doing)
};
play('Jack','playing'); // Jack is playing

// 如果函数表达式有名称,那么只是赋值引用,函数名不变
const fn = function test(){}
console.log(fn.name); // test
console.log(fn); // [Function: test]

// 如果函数表达式没有名称,那么除了赋值引用外,还会将变量名作为函数名
const cb = function (){}
console.log(cb.name); // cb
console.log(cb); // [Function: cb]
```

### 构造函数
一般情况很少使用构造函数定义函数,因为构造函数方式的代码会执行两次,第一次将其看作普通的JS代码执行,第二次会解析传递给构造函数的字符串,影响性能。
```javascript
// coding函数接受参数who和doing
const coding = new Function('who','doing',`console.log(who + " is " + doing)`);
// 最后一个参数是函数体,前面的所有参数都是参数名
// 这里的Marco就是参数who, coding就是参数doing
coding('Marco','coding'); // Marco is coding
```

### 函数声明提升
函数声明和函数表达式的主要区别在于,JS引擎执行时,会先读取函数声明并定义函数,所以即便在函数声明前调用了函数,依旧可以执行,即函数声明提升,而函数表达式是将函数的引用赋值给变量,只有赋值成功以后才可以调用。
```javascript
// 在函数声明前调用依旧有效
study(); // I'm studying
function study(){
  console.log(`I'm studying`);
}

// 函数表达式无法在赋值前使用
// 即便使用了var变量声明提升了,但是还没有赋值,此时的sleep是undefined,无法调用
sleep(); // TypeError: sleep is not a function - 类型异常: sleep不是一个函数
var sleep = function (){
  console.log(`I'm sleeping`);
}
```


### 函数返回值
函数可以通过return语句返回一个执行结果(返回值 - 可以是任意类型,包括函数),即使没有手写return语句,函数也会有默认的返回值 - undefined。

注意: 函数执行return语句会结束函数执行,即函数体中return后面的代码不会执行
```javascript
// 调用函数返回参数和,此时是需要返回值的
function sum(n1, n2, n3){
  // 返回值为三数之和
  return n1 + n2 + n3;
  console.log('after return'); // 函数return后面的代码不会执行
}
console.log(sum(1,2,3)); // 6

// hello函数只是为了打印'hello world',并不需要返回什么东西,所以不用写return
function hello(){
  // 函数体中无return语句
  console.log('hello world'); // hello world
}
console.log(hello()); // undefined
```

## 函数内部对象
### arguments 
arguments是一个类数组对象,包含调用函数时传递的所有参数,箭头函数没有arguments。
```javascript
function sum (n1, n2, n3){
  // 1. arguments以类数组的形式存储函数调用传递的参数 
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }

  // 2. arguments调用toString方法打印类型是 [object Arguments]
  console.log(Object.prototype.toString.call(arguments)); // [object Arguments]

  // 3. arguments上的length表示的就是参数数量
  console.log(arguments.length); // 3

  // 4. arguments.callee表示函数本身,严格模式下会报错,开发中用的很少
  console.log(arguments.callee); // [Function: sum]

  return n1 + n2 + n3;
}

console.log(sum(1,2,3)); // 6
```

#### arguments行为不稳定
arguments的行为在非严格模式下不一致,避免在非严格模式下使用arguments。
###### 严格模式
默认参数、剩余参数以及解构赋值的存在不会对arguments有影响
```javascript
'use strict'
function test(n1, n2, n3){
  n1 = 100; 
  // 修改第一个参数,arguments不受影响
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
}
test(1,2,3);
```
###### 非严格模式:
 - 存在默认参数、剩余参数以及解构赋值: 参数改变不影响arguments
 - 不存在默认参数、剩余参数以及解构赋值: 参数改变,arguments跟随改变
```javascript
// 有剩余参数、默认参数和解构赋值其中一个
function fn2(n1 = 1  ,{ name }, ...chars ){
  n1 = 100; 
  // 修改第一个参数,arguments不受影响
  console.log(arguments); // [Arguments] { '0': 1, '1': 2, '2': 3 }
}
fn2(1, { type: 'obj' }, 'A');

// 没有剩余参数、默认参数和解构赋值
function fn1(n1, n2, n3){
  n1 = 100; 
  // 修改第一个参数,arguments受影响
  console.log(arguments); // [Arguments] { '0': 100, '1': 2, '2': 3 }
}
fn1(1,2,3);
```

### new.targe <Badge text="ES6" />
ES6新增了new.target用于检测函数调用是否使用了new关键字,使用了new,那么new.target就是被调用的构造函数,否则new.target就是undefined。
```javascript
function Person(){
  console.log(new.target);
}

Person(); // undefined, 不使用new调用,new.target为undefined
new Person(); // [Function: Person], 使用new,则new.target为该构造函数
```

## 函数参数
函数参数可以理解成调用时在()中定义变量存储传递的数据(此时变量上就有传递进来的数据了),然后这些变量只能在函数体中使用。
### 理解参数
###### 函数明明可以拿到函数外的变量,直接获取不就行了,为什么要通过参数传递的形式呢？
```javascript
const str = 'hello';
{
  const num = 1024; // 这个变量的作用域是块级,外部无法访问
}
function log(){
  // 如果要打印不同的值,就得不断的修改str
  console.log(str);
  // console.log(num); // 访问不到num变量
}
log();
```
**原因**:
 - 变量都有作用域,你无法保证你要访问的变量在函数调用的位置能够访问到
 - 访问外部变量,需要在外部创建变量,会污染外部的环境,导致外部环境变量繁多,难以维护
 - 函数具有自己的作用域,外部作用域无法访问到函数内的变量,所以可以有效的减少命名冲突的问题
 - 函数可以根据传递的不同参数表现出不同的行为,访问外部的变量很难做到这点(需要不断的修改该变量)

**使用函数参数**
```javascript
function log(str) {
  console.log(str);
}
log('hello'); // hello
log('hi'); // hi
```
###### 什么时候需要参数？
当函数的行为是动态的,即需要根据参数表现不同行为时,需要传入参数控制行为,开发时根据自身需要决定是否需要参数。
```javascript
// 这个函数不管怎么调用 打印的都是hello
function hello(){
  console.log('hello');
}
hello(); // hello

// 可以根据传递的参数表现出不同的行为
function sayHiTo(who){
  console.log(`hi,${who}`);
}
sayHiTo('Marco'); // hi,Marco
sayHiTo('Jack'); // hi,Jack
```

### 浅拷贝
一定一定要记住一点,参数是浅拷贝的,在接收引用数据类型时,需要注意这点,避免修改引发的意料之外的bug,参考[浅拷贝](TODO)。
```javascript
const student = {
  name: 'Marco',
};

function changeName (stu){
  // 这里的stu指向的还是外部student的引用,所以现在修改会影响student
  stu.name = 'Jack';

  // 此处将stu的引用修改掉了,那么它指向的是{},而不是原本的student,所以修改不会影响student
  stu = {};
  stu.name = 'Tom';
  console.log('Tom - ', stu); // Tom -  { name: 'Tom' }
}

// 内部的stu其实就是student的引用,两个变量指向的是同一个引用,所以内部修改会影响外部
changeName(student);
console.log('Jack - ', student); // Jack -  { name: 'Jack' }
```

### 参数默认值
在Javascript中,定义了两个参数并不是说一定要传递两个参数,参数个数对不上也不会报错,如果没有接收到传入的参数,则默认值是undefined,也可以设置默认值,在没有传递参数或者参数值为undefined时会使用我们设置的默认值。
```javascript
// 参数定义了,但是没有传递,默认是undefined
// 注意:()中的定义变量是有序的,如content定义的时候,content2还没定义,所以可以后面的参数访问前面的参数,而不能前面的参数访问后面的参数\
// ()中无法访问函数体内的变量
// 写成 content = content2, content2 = 'Fuction Params' 是不行的,会报错
function fn(title = 'Fn', content = 'Fuction Params', content2 = content,author = 'ME'){
  // 第一个参数是'Function', 不是undefined,不使用默认值
  console.log(title);    // Function

  // 第二个参数显式传递了一个undefined,使用默认值
  console.log(content);  // Fuction Params

  // 第三个参数没有传递,默认是undefined,而默认值是content(也就是和第二个参数相等)
  console.log(content2); // Fuction Params

  // 第四个参数没有传递,默认是undefined,默认值是'ME'
  console.log(author);   // ME

  // arguments中存放的是调用函数传递的数据,不受默认值设置的影响
  // 可以看到,默认值并没有在arguments中生效
  console.log(arguments); // [Arguments] { '0': 'Function', '1': undefined }

  // 参数定义类似于let和const, 所以在函数体内存在暂时性死区,无法再声明与参数同名的变量
  // let title = 'JS'; // SyntaxError: Identifier 'title' has already been declared - 语法异常: 标识符'title'已经声明了
}

fn('Function', undefined);
```

### 扩展参数与剩余参数

#### 扩展参数
当函数接收多个参数,而这些参数来自数组,如果不使用扩展参数,一个个传很繁琐,这时候就可以使用扩展参数来简化操作。
```javascript
const nums = [ 1, 2, 3 ];
function sum (n1, n2, n3){
  return n1 + n2 + n3;
}

// 现在想要将nums的三个元素传递给sum
// 1. 最笨的传法 - 不扩展参数
console.log(sum(nums[0], nums[1], nums[2])); // 6

// 扩展参数
// 2. apply不仅可以改变this的指向而且接受的是数组形式的参数列表,也可以用来展开参数
// 具体用法在this指向部分,此处只要知道它能调用函数并传递数组形式的参数即可
console.log(sum.apply(null, nums)); // 6

// 3. ES6提供的扩展运算符,可以将数组展开成多个值
console.log(sum(...nums)); // 6
```

#### 剩余参数
剩余参数类似于arguments,arguments将参数整合到类数组对象,而剩余参数则是将参数整合到一个数组。由于剩余参数会接收后续的所有参数,所以它必须作为最后一个参数。
```javascript
const nums = [ 1, 2, 3, 4, 5 ];

function operatorFn (operator, ...nums){
  // 第一个参数为操作符,决定使用加法还是乘法
  // 第二个参数为剩余参数,通过...接收后续的所有参数作为数组,此处作为加数或者乘数
  console.log(nums); // [ 1, 2, 3, 4, 5 ]
  if(operator === '+'){
    // 使用reduce返回数组的和
    return nums.reduce((acc, cur) => acc + cur, 0);
  }
  if(operator === '*'){
    // 使用reduce返回数组的乘积
    return nums.reduce((acc, cur) => acc * cur, 1);
  }
}

// 此处使用扩展运算符将数组展开传入
console.log(operatorFn('+', ...nums)); // 15
console.log(operatorFn('*', ...nums)); // 120
```




## IIFE
IIFE(Immediately Invoked Function Expression,立即执行的函数表达式),使用括号运算符返回函数表达式(常见形式),并立即执行。

解析: IIFE并不是一定要用(),只是因为这个写法最为简单,IIFE也叫做**立即执行的函数表达式**,这个名称其实更贴切,首先是立即执行,然后是函数表达式,这便是IIFE的主要特点,所以能够满足这两点就是IIFE。

优点:
 - IIFE具有独立的作用域,既不污染全局环境,外部环境也无法访问IIFE中的变量。
 - 立即执行,不创建引用,所以在垃圾回收时会被回收。

### 匿名函数
匿名函数就是没有函数名的函数,并且匿名函数必定是函数表达式,因为函数声明必须有函数名。
```javascript
// 匿名函数
console.log(function(){}); // [Function (anonymous)]
console.log([function(){}][0]); // [Function (anonymous)]

// 具名函数
console.log(function fn(){}); // [Function: fn]
```

### 理解
 - 在语句位置出现的函数定义是函数声明,在表达式位置出现的是函数表达式
 - 函数声明不能直接调用,函数表达式可以直接调用
```javascript
// 1. 复习一下括号运算符,括号运算符会返回最后一个元素,并且()中的元素都是表达式
const last = (1,2,3);
console.log(last); // 3

// 2. 将函数表达式的引用赋值给变量
const fn = function(){};

// 3. 为什么不能直接写function(){}()? 因为直接写function(){},位置是在语句位置,被识别成了函数声明,函数声明不能立即调用
function t (){} // 出现在语句位置,是函数声明

// 4. 括号运算符中必是表达式,不是表达式会报错,可以试试在()中写return,会报错,()中只能是表达式
// 因此将function(){}()使用()包裹, 就会被当成函数表达式,从而可以立即执行
(function (){
  console.log('!'); // !
}()); 

// 5. 函数调用可以放在外部调用,只要function(){}函数定义这部分在()中被识别成函数表达式就可以了
(function() {
  console.log('!'); // !
})();

// 根据定义可以有别的写法,不过一般还是用()
// 同理可得
[function(){
  console.log('!'); // !
}][0](); // 这也是立即执行的函数表达式
false || function(){
  console.log('!'); // !
}();
```

## 箭头函数 <Badge text="ES6" />
箭头函数是ES6新增的定义函数表达式的方式,语法较于function定义更加简洁,但也和function定义的函数表达式有一些区别。

### 使用方式
```javascript
// 1. 不省略、完整的箭头函数形式如下
const fn1 = (n1, n2 ,n3) => {
  console.log('get sum');
  return n1 + n2 + n3;
};

// 2. 只有单个参数时,()可以省略,无参数和多参数时,()不能省略
const fn2 = x => {}

// 3. 只有返回值时, {}可以省略
const fn3 = () => 'A';

// 4. 只有返回值并且是对象,可以使用括号运算符()
const fn4 = ()=> ({ type: 'Func' });

// 5. 立即执行的匿名函数
(()=>{ console.log('Nice') })(); // Nice
```

### 箭头函数特点
 - 没有arguments
 - 因为没有prototype属性,而构造函数在实例化时需要prototype属性作为实例对象的原型链指向,所以不能作为构造函数,也就不能用new调用了,也就不会有new.target了,[原型链](/WebTravel/javascript/data-type/prototype-chain/prototype-chain.html)
 - super仅在构造函数中存在, 箭头函数不能作为构造函数,自然也是没有的
 - 不绑定this,箭头函数的this是自身作用域的上一层的this,不适合作为对象上的方法(参考this指向部分)

```javascript
const fn = () => {
  // 在node环境中不会报错,因为node全局环境内部有一个arguments的变量,所以打印的是node的arguments,而不是函数的
  // 在浏览器环境会报错,本质上就是因为箭头函数是没有arguments的
  // console.log(arguments); // ReferenceError: arguments is not defined - 引用异常: arguments未定义
}

// 箭头函数没有prototype,但是有 __proto__属性
console.log(fn.prototype); // undefined
console.log(fn.__proto__); // {}
// 获取原型的方法获取的是箭头函数的__proto__属性
console.log(fn.__proto__ === Object.getPrototypeOf(fn)); // true
console.log(fn instanceof Function); // true
 
// 无法作为构造函数,也无法使用new关键字,更不会有new.target和super
// new fn(); // TypeError: fn is not a constructor - 类型异常: fn不是一个构造函数

fn();

class Person{}
class Student extends Person{
  // 无法使用箭头函数作为构造函数,所以箭头函数不会有super
  constructor(){
    super();
  }
}
const s = new Student();
```

### 应用
```javascript
// 列举几个简单的应用场景增加记忆
const arr = [ 1, 2, 3, 4, 5 ];

// 求和
console.log(arr.reduce((acc,cur)=>acc+cur)); // 15

// 筛选偶数
console.log(arr.filter((v)=>v % 2 === 0)); // [ 2, 4 ]

// 数组每项乘2
console.log(arr.map((v)=>v * 2)); // [ 2, 4, 6, 8, 10 ]
```

## this指向

## 闭包

## 递归和尾调用优化

## 参考
 - [揭秘 IIFE 语法](https://github.com/xitu/gold-miner/blob/master/TODO/disassembling-javascripts-iife-syntax.md)
 - [Function Definitions in JavaScript](https://mariusschulz.com/blog/function-definitions-in-javascript)