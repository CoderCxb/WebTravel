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
剩余参数类似于arguments,arguments将参数整合到类数组对象,而剩余参数则是将参数整合到一个数组(如果没有接收到参数,则是[])。由于剩余参数会接收后续的所有参数,所以它必须作为最后一个参数。
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
void function(){
  console.log('!'); // !
}()

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
 - 因为没有[[Construct]]内部方法,无法作为构造函数,因此不需要prototype属性(作为实例对象的原型)并且不能用new调用,也就不会有new.target了 [原型链](/WebTravel/javascript/data-type/prototype-chain/prototype-chain.html)
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
英文中this是一个代词,在JS中this是一个隐式传递的引用指向,通过this的机制可以使代码更简洁,避免显式传递上下文对象导致代码难以维护,**this的指向由函数的调用方式决定**。

### 为什么用this
主要是可以避免频繁的参数传递,尤其是在对象/实例的方法中,this的使用频率会很高。
```javascript
// 使用this的形式,谁调用,默认this就是谁,可以复用
function run() {
  console.log(`${this.name} is running~`);
}

const marco = {
  name: 'Marco',
  // 1. 使用对象的方式虽然可以不需要传递参数,但是这个函数(方法)就被限定死了,无法复用,意味着别的对象无法直接使用这个方法
  study(){
    console.log(`${marco.name} is studying~`);
  },
  // 2. 通过传递参数的方式,缺点显而易见,需要传递参数,参数越多越繁琐,也难以维护
  code(person){
    console.log(`${person.name} is coding~`);
  },
  // 3. 使用this的形式,this默认指向调用者
  run
}

// 执行结果
marco.study(); // Marco is studying~
marco.code(marco); // Marco is coding~

// marco调用,this指向marco
marco.run(); // Marco is running~

// jack也有run方法,并且和marco的是同一个方法, 方法复用了
const jack = {
  name: 'Jack',
  // run可以复用
  run
}

// jack调用,this就是jack
jack.run()
```

### 绑定规则
首先记住一点,**this指向由函数的调用方式决定**,接下来将会对this的绑定规则进行分析,分析时需要顺着函数的调用链找到函数的调用位置,并根据函数的调用方式判断函数的中的this指向。
#### 默认绑定
默认绑定又称为独立函数调用,是函数默认情况下的this绑定,当其他规则没有生效的情况下应用,严格模式下默认绑定的this为undefined。
```javascript
// 不使用关键字定义的变量,默认会被挂载在全局对象(浏览器为window,node为global)
// 'use strict'  // 打开注释,就是严格模式了
num = 1024;
function fn () {
  console.log(this.num);
}

fn.num = 28;

// 此处函数是以独立调用的形式(其实就是直接调用),采用默认绑定规则,所以函数中的this指向全局对象,而不是函数本身
fn(); // 1024
```

#### 隐式绑定
当函数作为对象的方法调用时,应用隐式绑定规则,此时的this为调用函数的对象。
```javascript
name = 'Jack';
const marco = {
  name: 'marco',
  logName(){
    console.log(this.name);
  }
};

// 通过对象调用时,函数中的this为调用函数的对象
marco.logName(); // marco

// 隐式绑定丢失
// 但是, 将函数引用赋值给一个变量之后再调用,应用的是默认绑定规则
const logName = marco.logName;
// 此处的this规则为默认绑定, 因为调用方式并不是通过对象调用的,而是对函数直接调用,所以是默认绑定
logName(); // Jack

// 注意,函数参数传递本质上是浅拷贝,也是赋值,所以这里的callback仅仅是函数的引用
function fn(callback) {
  // 这里才是真正的调用方式,可以看出来,是独立调用(直接调用),所以函数中的this指向全局对象
  callback();
}

// 虽然这里看起来好像是对象调用,但是这里只是传递引用并没有调用,判断规则是要看调用方式的
fn(marco.logName); // Jack

// 理解: 函数本身并不在对象上, 对象上有的也仅仅是函数的引用罢了,本质上还是要看调用的方式是否是通过对象调用。
```

###### 举一反三
```javascript
num = 10;
const obj = {
  num: 20,
  logNum(){
    console.log(this.num);
  },
  logThis(){
    console.log(this);
  }
};

function useCallback(callback) {
  const obj = { num: 30,callback };
  // 通过对象调用, this为obj
  obj.callback(); // 30
  // 直接调用, this为全局对象
  callback(); // 10
}

useCallback(obj.logNum);


// 此处的this为Timeout对象,也很好理解,之前说过,看调用的方式,这里明显不是调用的位置,只是传递函数(引用)
// 而this指向由调用方式决定,虽然无法确定setTimeout中是怎么调用的,但是肯定不是直接调用
setTimeout(obj.logThis); // Timeoout {....}
```

#### 显式绑定
显式绑定通过函数的实例方法apply和call实现,通过apply和call在函数调用时显式的指定this。
```javascript
function log(...args) {
  console.log(args); // [ 1, 2, 3], 无论是call还是apply,只是接收的时候不一样,传递到函数以后都一样
  console.log(this.type);
}

// call和apply区别主要是接收this以外参数的形式,可以根据需求进行选择
// call除了接收this对象外,还能接收多个参数并传入函数
log.call({ type: 'useCall' }, 1, 2, 3);  // useCall

// apply除了接收this对象外,还能接收一个参数数组传入函数
log.apply({ type: 'useApply' }, [ 1, 2, 3 ]);  // useApply
```
##### 硬绑定
apply和call还是有局限的,只能在调用的时候指定,因此JS还提供了bind方法,返回一个新的、绑定好指定this的函数而不是立即调用,适用于当你需要绑定this而不马上调用的场景。
```javascript
function fn(...args) {
  console.log(args); // [ 1, 2, 3]
  console.log(this.type); // useBind
}

// bind除了接收this对象外,还能接收多个参数并传入函数
// bind并不会立即执行函数,而是返回一个新的函数,接收参数的形式和call是一样的
const useBindFn = fn.bind({ type: 'useBind' }, 1, 2, 3);
// 调用bind返回的函数
useBindFn(); // useBind

// bind绑定this后返回的函数无法再使用apply、call和bind修改this
useBindFn.call({ type: 'useCall' }); // useBind
```

##### apply、call、bind异同
 - 当this为undefined或者null时会被忽略
 - apply和call是立即调用函数,而bind是返回一个绑定指定this的函数
 - 除了this对象以外,apply接收参数数组并展开传入函数,而call和bind接收的是多个参数并传入


##### apply、call、bind应用
apply、call和bind除了可以改变this指向以外,还可以改变参数的接收形式,apply接收数组,call接收多参数形式

###### 改变this指向
```javascript
// 通过改变this的指向,是函数能够在别的对象上使用

// 1. toString.call方式判断类型就是改变this指向的应用
console.log(Object.prototype.toString.call(1024));

// 2. 使String可以调用数组的部分方法(不改变原数组的方法, 因为string是基本数据类型,不能修改) 
console.log(Array.prototype.filter.call('hello',(v)=>{
  return v > 'h'
}));

// 就列举两个,主要是要看传入的this是否可以执行该函数,如果可以,才能修改this
```

###### 改变参数形式
```javascript
// 例
// 原本的max是接收多参数形式的,现在通过apply可以接收数组,不过这个通过扩展运算符等方式也能实现
const nums = [ 1, 2, 3, 4, 5];
console.log(Math.max(1,2,3,4,5)); // 原本要这样接收参数
console.log(Math.max.apply(null, nums));
console.log(Math.max(...nums)); // 扩展运算符也可以做到
```

##### 手写apply、call和bind
函数是Function的实例对象,apply、call和bind是Function的实例属性,挂载在Function.prototype上,现在以相同的方式挂载实例方法模拟这三个方法。
###### apply
主要思路是通过将函数作为传入对象的方法,通过对象的方式进行调用,这样函数的this就会指向该对,也就改变了函数原本的this指向。

**注意**
 - 无法接收Symbol和bigint类型的值
 - undefined和null会被忽略,从而使用默认绑定
 - 其他基本数据类型会被转换成包装对象

```javascript
// context为指定的this对象,params为参数数组,设置默认值
Function.prototype.myApply=function(context,args = []){
  // 此处的this调用myApply的函数

  // 1. bigint和symbol无法转换成对象,所以不能作为this
  if(typeof context === 'bigint' || typeof context === 'symbol') {
    throw TypeError('this对象必须是对象或者可以转换成对象的基本数据类型,Symbo和BigInt不可以~')
  }

  // 2. 当context为null或者undefined时,使用默认绑定规则,否则使用传递的context作为this
  // 使用Object包裹context,如果是基本数据类型,转换成包装对象,如果是引用数据类型,则没有影响
  context = (context === undefined || context === null) ? (window || global || globalThis) : Object(context); // 如果传递的this为基本数据类型,则需要封装成对象

  // 3. 此处使用Symbol是因为如果context上存在同名的属性或方法,会被覆盖掉
  const fn = Symbol();
  context[fn]=this;

  // 4. 通过对象的方式调用函数,此处的this指向就是该对象了,通过将参数数组展开传递给函数
  context[fn]\(...args);

  // 5. 删除刚刚添加到context上的函数,避免对context造成影响
  Reflect.deleteProperty(context,fn);
}

function logThis() {
  console.log(this);
}

logThis.myApply({ type: 'useMyApply' }); // { type: 'useMyApply', [Symbol()]: [Function: logThis] }
logThis.myApply(0); // [Number: 0] { [Symbol()]: [Function: logThis] }
logThis.myApply(undefined); // 全局对象
logThis.myApply(1024n); // TypeError: this对象必须是对象或者可以转换成对象的基本数据类型,Symbo和BigInt不可以~
```


###### call 
call的思路和apply一致,只是接收参数的形式不同。
```javascript
Function.prototype.myCall=function(context, ...args){
  if(typeof context === 'bigint' || typeof context === 'symbol') {
    throw TypeError('this对象必须是对象或者可以转换成对象的基本数据类型,Symbo和BigInt不可以~')
  }
  context = (context === undefined || context === null) ? (window || global || globalThis) : Object(context); // 如果传递的this为基本数据类型,则需要封装成对象
  const fn = Symbol();
  context[fn]=this;
  context[fn]\(...args);
  Reflect.deleteProperty(context,fn);
}

function logThis() {
  console.log(this);
}

logThis.myCall({ type: 'useMyCall' }, 1, 2, 3); // { type: 'useMyCall', [Symbol()]: [Function: logThis] }
logThis.myCall(0); // [Number: 0] { [Symbol()]: [Function: logThis] }
logThis.myCall(undefined); // 全局对象
logThis.myCall(1024n); // TypeError: this对象必须是对象或者可以转换成对象的基本数据类型,Symbo和BigInt不可以~
```

###### bind
主要思路是闭包,返回一个新的函数,该函数中通过对象的方式调用原函数,改变其this指向。
 - 无法接收Symbol和bigint类型的值
 - undefined和null会被忽略,从而使用默认绑定
 - 其他基本数据类型会被转换成包装对象
 - bind可以被new调用,所以需要保持原型链一致以及判断是否使用new关键字调用

```javascript
Function.prototype.myBind=function(context,...params1){
  // 此处的this调用myBind的函数,
  // 1. bigint和symbol无法转换成对象,所以不能作为this
  if(typeof context === 'bigint' || typeof context === 'symbol') {
    throw TypeError('this对象必须是对象或者可以转换成对象的基本数据类型,Symbo和bigint不可以~')
  }

  // 此处的this为调用myBind的函数,将其赋值给一个变量,避免和将要返回的函数中的this搞混了
  const outThis = this;

  // 2.context是接收的第一个参数 也就是this要指向的对象 
  // params1则是传递的参数
  // (window || global || globalThis) 是为了兼容浏览器和node版本
  context = (context === undefined || context === null) ? (window || global || globalThis) : Object(context); // 同apply和call

  // 3. 将函数绑定到context的原型上,等会就可以通过对象方式调用函数,这样this指向就改变了
  // 使用Symbol,避免重名等问题
  let fn= Symbol();
  // 之所以绑定要原型上,因为使用new关键字调用时,context会重新赋值,fn会丢失
  context.__proto__[fn] = outThis; 
  
  // 4.bind返回的是一个新的函数,不影响原本函数
  let func = function(...params2){
    // 5. 由于bind返回到是函数,所以需要考虑返回到函数使用new关键字调用
    // 使用new关键字,函数中的this指向函数的实例对象
    // 不使用new关键字,context保持不变
    context = new.target ? this : context;

    // 6. 调用函数并返回结果
    return context[fn](...params1, ...params2);
  }
  // 7. bind可以被new调用,所以需要保持原型链一致
  func.prototype = outThis.prototype;

  // 8. 返回新的函数
  return func;
}

function Person() {
  console.log(this);
}

const bindPerson = Person.myBind({name:'useBind'});
bindPerson(); // { name: 'useBind' }

const p = new bindPerson(); // Person {}
```

#### new绑定
JS中的所有函数都可以作为构造函数,只要通过new关键字调用(函数的构造调用),那么它就是构造函数,而通过new调用时,this指向为构造函数的实例对象。

###### new中this
```javascript
function Animal(name,type) {
  this.name = name;
  this.type = type;

  // new中的this指向构造函数的实例对象
  console.log(this); // Animal { name: 'QiQi', type: 'cat' }
}

const qq = new Animal('QiQi', 'cat');
```

###### new调用执行以下操作
 - 创建一个新对象,新对象的原型为构造函数的prototype属性
 - 将新对象作为构造函数执行的this并调用(用new调用时,构造函数中的this为新对象,也就是实例对象)
 - 如果构造函数的返回值是对象(引用数据类型),则返回该对象,如果不是,那么返回新对象

###### 手写new
```javascript
// 第一个参数为构造函数,后续参数为传递给构造函数的参数
function myNew(Constructor, ...args) {

	// 1. 创建空对象
	let obj = new Object();

	// 2.改变obj的原型 obj有可能会返回 而且是作为构造函数执行的this
	obj.__proto__ = Constructor.prototype;
	
	// 1和2可以直接使用 Object.create代替
	// let obj=Object.create(Constructor.prototype);

	// 4. 执行构造函数并改变其this指向,通过接收其返回值
	let res = Constructor.apply(obj, args);

	// 5. 如果构造函数返回值为引用数据类型,则直接返回, 如果不是,则返回obj
	return typeof res === 'object' ? res : obj;
}

function Student() {
	// 如果使用了new关键字,则new.target为函数本身,否则undefined
	// 这里就不模拟new.target了
	console.log(this);
}

let s1 = myNew(Student);

let s2 = new Student();
```

#### 绑定优先级
既然有这么多种绑定方式,那么就会存在优先级的概念(同时存在谁生效),绑定的优先级为 默认绑定 < 隐式绑定 < 显式绑定 < new绑定
```javascript
// 1. 默认绑定优先级最低,只要绑定了其他任何规则,默认绑定就不会生效
function logThis() {
  console.log(this);  
}

// 默认绑定
logThis(); // 全局对象

// 隐式绑定 > 默认绑定
const obj = { logThis };
obj.logThis(); // { logThis: [Function: logThis] }, this为obj对象,所以隐式绑定 > 默认绑定 

// 2. 显式绑定优先于隐式绑定
obj.logThis.call({ type: 'useCall' }); // { type: 'useCall' }, this为call绑定的对象,而不是obj, 显式绑定 > 隐式绑定 

// 3. 由于call和apply都是直接调用,无法和new一起使用,所以演示的是bind
const bindLogThis = logThis.bind({ type: 'useBind' });
new bindLogThis(); // logThis {}, this为实例对象,而不是bind绑定的对象,new绑定 > bind(显式绑定)
```

#### 箭头函数的this
ES6新增的箭头函数则无视这些绑定规则, **箭头函数的this由定义函数的作用域中的this决定**,要判断箭头函数的this指向,只要找到箭头函数的定义位置,然后判断该位置的this即可。
```javascript
const outter = function () {
  // 此处是箭头函数定义的作用域
  // 箭头函数的this指向,由当前作用域的this决定,也就是说这里的this是什么,箭头函数的this也是什么
  // console.log(this); // 和箭头函数的this一致
  return () => {
    // 箭头函数的this由定义时的this指向决定
    console.log(this); // 跟随外层作用域的this指向
  }
}

// 直接调用outter,outter的this为全局对象,所以箭头函数中也是全局对象
outter()(); // 全局对象

// outter使用call绑定了this,outter的this为{ type: 'useCall' },所以箭头函数的this也是{ type: 'useCall' }
outter.call({ type: 'useCall' })(); // { type: 'useCall' }

// outter是直接调用,所以this为全局对象,此时对返回的箭头函数使用call是无效的,箭头函数的this只由定义函数时的作用域this决定
outter().call({ type: 'useCall' }); // 全局对象
```

## 递归和尾调用优化

### 递归

### 尾调用优化

## 柯里化
```javascript

```

## 参考
 - [揭秘 IIFE 语法](https://github.com/xitu/gold-miner/blob/master/TODO/disassembling-javascripts-iife-syntax.md)
 - [Function Definitions in JavaScript](https://mariusschulz.com/blog/function-definitions-in-javascript)
 - [彻底搞懂闭包，柯里化，手写代码，金九银十不再丢分!](https://juejin.cn/post/6864378349512065038)
