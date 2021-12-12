# 语法基础

## 语法


### 区分大小写
Javascript中无论是变量名、函数名还是运算符，都区分大小写。

```javascript
const str = 'hello javascript';
const STR = 'HELLO JAVASCRIPT';
console.log(str === STR); // false，它们是两个变量
```

  - 标识符：变量名、函数的名称
    - 第一个字符必须是字母、下划线(_)或者美元符($)
    - 剩下其他字符可以是字母、下划线、美元符或者数字
```javascript
// 以下是常见的写法，并不是强制要求，不同团队可能还会存在差异
// 1. 变量名一般采用小驼峰形式，即第一个单词首字母小写，后续的单词首字母大写
const studentInfo = {};
// 有时也会使用 xx_yy的形式
const student_info = {};

// 2. 常量一般使用全大写并使用_分割单词的形式
const MAX_NUM = 1024;

// 3. 函数以及方法通常使用小驼峰形式
function studyJavascript(){}
const student = {
  studyCode(){}
}
```

### 注释

#### 单行注释 
```javascript
// 这是单行注释
```
#### 多行注释
```javascript
/** 
 * 多行注释
 * 多行注释
*/
```

#### JSDoc
使用Typescript可以限定变量的类型，但是有时根据项目情况，只能够编写Javascript代码,此时可以使用JSDoc来辅助Javascript编写函数、方法、类以及命名空间

ps:掌握基本用法即可，不需要掌握全部,使用方式参考[JSDoc](https://www.shouce.ren/api/view/a/13232)。
```javascript
  /**
   * JSDoc的基本使用
  *  
  *  @param {string} name - 名称
  *  @param {number} age - 年龄
  *  @returns {string} 返回值 
  */
  function show(name,name){}
```
  - JSDoc优势一：写完JSDoc的注释后，使用该函数时，将鼠标移至函数名，则会出现JSDoc注释
    <img src='/WebTravel/images/jsdoc_1.png'>
  - JSDoc优势二：在函数中，参数的类型限定好，虽然可以传入其他类型的参数并且不会报错，但是使用的时候会有代码提示

    <img src='/WebTravel/images/jsdoc_2.png' height="300">

### 关键字和保留字
  - 关键字: 有特殊用途的单词，不能作为标识符
  
| break  | case | catch  | const |  continue  | debugger |  default  | delete |
|   :----:  |   :----: |   :----:  |   :----: |   :----:   |   :----: |   :----:   |   :----: |
| do  | else | export  | extends |  finally  | for |  function  | if  |
| import | in  | instanceof |  new  | return |  super  | switch | this  |
| throw | try  | typeof |  var  | void |  while  | with | yield |

  - 保留字: 未来的保留字，不要作为标识符

| await  | enum | imnplements  | interface |  let  | package |  protected  |
|   :----:  |   :----: |   :----:  |   :----: |   :----:   |   :----: |   :----:   |
| private  | public | static  | 

## 变量
变量，即可以用来保存任何类型的数据，每个变量只是用来存储某些值的标识符，可使用var、let(ES6)、const(ES6)来声明变量

### var声明
```javascript
// 1.基本使用
var message;
message = 'Hello';
// 等价于
var message = 'Hello';

// 2. 声明作用域 - 函数作用域
var title = '标题'; // 全局变量，会被绑定在window上,全局可以访问
function test(){
  var message = 'Hello'; // 声明在函数中，这个变量仅在函数内使用
}
console.log(title); // 可以访问全局变量
console.log(message); // 无法访问函数内的局部变量

// 3. 声明提升
console.log(num);  // 不会报错，因此变量声明被提升到前面去了
var num = 1024;
function test(){};

// 编译器会将函数和var声明的变量提升到前面，函数先于变量 
function test(){}  // 函数声明会被提升至最前
var num;           // var声明的变量紧随其后
num = 1024;        
console.log(num); 

// 4. 允许重复声明,注意 声明不会影响之前的值
var str = 'hello world';
var str;
console.log(str); // hello world
```

### let声明 <Badge text="ES6" />

```javascript

// 1. 基本使用
let message;
message = 'Hello';
// 等价于
let message = 'Hello';

// 2. 声明作用域 - 块级作用域 
// 块级作用域是函数作用域的子集，即 let定义的变量在函数中定义也无法在函数外访问
function test(){
  let arr = [];
}
{
  let letArr = [];
  var varArr= []; 
}
console.log(arr);    // arr is not defined
console.log(letArr); // letArr is not defined
console.log(varArr); // []

// 3. 无法重复声明
let arr = [];
let arr; // SyntaxError:Identifier 'arr' has already been declared - 语法异常:标识符'arr'已经被声明

// 4. 无声明提升 - 暂时性死区
// 因为let声明的变量不会提升，所以无法在声明前使用
console.log(str); // ReferenceError:Cannot access 'str' before initialization - 引用异常:无法在变量'str'声明前使用它
let str = 'Hello JS';

// 5. let声明的变量不会被挂载到window
let title = 'study grammer';
console.log(window.title); // undefined

```

### const声明 <Badge text="ES6" />
```javascript
// 1. 基本使用 - const声明时必须赋值
const arr; // SyntaxError:Missing initializer in const declaration - 语法异常:const声明缺少初始值
const obj = {}; // 正常

// 2. 无法重复声明，同let

// 3. 无声明提升 - 暂时性死区 同let

// 3. const声明的变量不能修改引用地址，哪怕值一样
const num = 1024;
num = 1024; // TypeError: Assignment to constant variable - 类型异常:向常量赋值
const obj = {};
const arr = []; 
// 但是允许向对象和数组添加元素,因为引用地址没有发生改变
obj.name = 'box';  
arr.push(1);
// 简单记就是，const定义的变量不能赋值,新增属性、元素不算赋值

```

## 面试题

### 题一
::: tip for循环中的let和var有何区别?
::: details 查看解析
```javascript
var fns = [];
// 以下代码输出为什么是10? 将var改为let为什么就正常了？
for (var i = 0, obj = {}; i < 10; i++) {
  fns[i] = function () {
    console.log(i);
    return obj;
  };
}
fns[6]();  // 10
console.log(fns[1]() === fns[7]()); // 返回true，即后续循环会获取到前面for()中的变量的值
//  解析
// 1. var是函数作用域，let是块级作用域，而for()是块级作用域
// 2. for()每次循环都是独立的，后续循环会获取到前面for()中的变量的值
// 3. for(父作用域){子作用域} for循环有两个作用域

// 综上所述，for循环可以看成如下结构
// 外层{}相当于 for(父作用域)
// 内层{}相当于 {子作用域}
let pre;
{
  // 第一次for循环
  let i = 0;
  {
    fns[i] = function(){
      console.log(i);
    }
  }
  pre = i; // 记录上一次的值
}
{
  // 第二次循环
  // i++相当于
  let i = pre; // 使用let的话，不影响第一次循环的i，如果是var，则会影响，因为作用域不同
  i++;
  {
    fns[i] = function(){
      console.log(i);
    }
  }
  pre = i; // 记录上一次的值
}
// .... 此处省略后续循环，同理可推

fns[0]() // 使用var时，输出1，使用let时，输出0

```
:::


### 题二
::: tip 暂时性死区以及作用域的理解
::: details 查看解析
```js
var str = 'One';
{
  console.log(str); // ReferenceError: Cannot access 'str' before initialization - 引用异常: 无法在声明前使用变量
  let str = 'Two';  
  // 用let和const都会出现暂时性死区,因为let和const没有变量提升
}
{
  console.log(str);  // One
  var str = 'Three';
  // 之所以能打印出One，首先 var存在变量提示
  // 其次，var是函数作用域，所以这里的str和外部的str是同一个
}

// 立即执行函数
(function (){
  console.log(str); // undefined
  var str = 'Two';
  // 将{}修改成函数,此处的str和外部的str就不再是同一个变量
  // 此处访问的就是内部的str了，而在赋值前使用var定义的变量，就是undefined
})()

```
:::