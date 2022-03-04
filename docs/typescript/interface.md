# 接口
Typescript中,可以使用接口(interface)来定义对象(包括函数)的类型,约束对象,使其和接口定义保持一致。
```typescript
// Animal接口, 限定必须包含类型为string的type属性和类型为()=>void的eat方法
 interface Animal  {
  type: string;
  eat: () => void;
}

// type和eat缺一不可,并且类型也需要和接口中的保持一致
let cat: Animal = {
  type: 'Cat',
  eat(){
    console.log('吃猫粮');
  }
}
```

## 可选属性
接口中并不是所有属性都是必须的,因此可以通过key?:type的形式定义可选属性,本质上就是联合了undefined类型。
```typescript
interface Book  {
  type: string;
  auth?: string; // 可选属性,类型为 string | undefined,因此可以为undefined
}

let book: Book = {
  type: 'YDNJS',
}
```

## 只读属性
允许定义只读属性,只读属性在初始化以后就无法再赋值了,通过添加readonly关键字表明属性为只读属性。
```typescript
type Book = {
  readonly type: string; // 只读属性
}

// 初始化
let book: Book = {
  type: 'YDNJS',
}

// 只读属性无法再次赋值
book.type = 'Professional JavaScript for Web Developers'; // 无法分配到 "type" ，因为它是只读属性
```

## 可索引类型
可索引类型具有索引签名,描述了对象索引的类型以及对应的返回值,同[索引类型](/WebTravel/typescript/advanced-type.html#索引类型)。
```typescript
interface StringKeyType {
  // 所有key为string类型的索引对应的类型必须是能够赋值给string的类型
  name: string; // OK 
  char: 'A';    // OK, 'A'可以赋值给string
  // age: number; // 类型“number”的属性“age”不能赋给“string”索引类型“string”
  [key: string]: string; 
}

// 索引签名支持number、string、symbol三种,其中number索引签名需要符合string索引签名
interface NSKeyType {
  // number类型签名对应的类型必须是string类型签名的子类型
  // 此处string索引签名对应boolean类型,因此number索引签名对应的类型需要是能够赋值给boolean类型的类型
  [n:number]: true;  // 如果改成string等无法复制给boolean的类型，则会报错
  [key: string]: boolean; 
  [s: symbol]: string; // symbol不受影响
}
```

## 函数类型
函数本质上也是对象,接口同样可以描述函数,约束其参数类别和返回值类型。
```typescript
interface FormatFn {
  // 限定函数的参数列表为(time:number), 返回值类型为Date
  (time: number): Date;
}

// 参数列表关注的是参数的类型, 参数名不同没事,类型能够对应即可
let formatFn: FormatFn = function(t: number){ // 参数列表
  return new Date(t); // 返回值
}
```


## 类

### 前置知识
 - 类的public、private、protected修饰符。
   - public: 表示属性/方法为公有的,即谁都能访问, 不添加修饰符,默认就是public, 接口针对的也是类的public属性/方法
   - private: 表示属性/方法为私有的,即谁都不能访问, 接口不限制private属性/方法
   - protected: 表示属性/方法为受保护的,即只有派生类(子类)能访问, 接口不限制protected属性/方法
 - 类中包含两部分,静态部分以及实例部分
   - 静态部分: static修饰的属性和方法、constructor(构造函数)
   - 实例部分: 除静态部分就是实例部分了
 - implements实现接口,针对的是实例部分
 - 限制类型限制的是静态部分

### 演示
```typescript
// 使用方式为 限制类型的方式
interface BookConstructor{
  new (title:string): void; // 限制构造函数类型,因此无法使用implements
  type: string; // 限制静态属性type为string类型
  finish: ()=> void; // 限制静态方法publish

}

// 使用方式为 implements
interface BookInstance {
  title: string; // 限制实例属性title
  getTitle: () => string; // 限制实例方法finish的类型
}

// 如前置知识提到的,implements针对是实例部分
class Book implements BookInstance{
  title:string; // 实例属性title,
  // 实例方法 getTitle
  getTitle(){
    return this.title;
  }

  static type:string; // 静态属性type
  // 静态方法 publish
  static finish(){
    return '完结撒花~'
  }
  private secret:string; // 私有属性, 不受接口影响
  protected auth:string; // 受保护属性,不受接口影响

  // 构造函数属于静态部分
  constructor(title:string){
    this.title = title;
  } 
}

// 限制类型针对的是静态部分
let NewBook: BookConstructor = Book;
```

## 继承
接口可以继承其他接口,同时也可以继承类。

#### 继承单个接口
```typescript
interface Shape {
  color: string;
}

interface RedSquare extends Shape{
  color: 'Red';  // 当出现重名属性时, 子接口的类型需要是父接口类型的子类型,此处 'Red'是string的子类型
  sideLength: number;
}

let square: RedSquare = {
  color: 'Red',
  sideLength: 10
}
```

#### 继承多个接口
接口允许多继承,即同时extends多个接口。
```typescript
interface Worker {
  years: number;
  work:() => void;
}

interface Student {
  source: number;
  study:() => void;
}

// 此时的WS就包含了Student和Worker的类型定义了
interface WS extends Worker,Student {}

// 相当于
// interface WS {
//   years: number;
//   work:() => void;
//   source: number;
//   study:() => void;
// }

```

###### 无法继承多个存在同名但是不同类型的接口
```typescript
interface Worker {
  type:string
}

interface Student {
  type: any;
}

// Worker和Student存在类型不同的type属性,因此无法同时继承这两个接口
interface WS extends Worker,Student {}
```


#### 继承类
当接口继承类时,继承的是类成员的类型,而不是继承类成员的实现,通过继承类,可以快速的获取类的类型并且可以进行扩展。
```typescript
class Worker {
  type = 'woker'; 
  work(){
    return 'Working';
  }
}

interface  Coder extends Worker {
  language: string;
}

// 此时的Coder相当于
// interface Coder {
//   type: string; 
//   language: string;
//   work: () => string;
// }

let coder: Coder = {
  type: 'coder',
  language: 'TS',
  work(){
    return 'Coding~';
  }
}
```
###### 类成员的修饰符
接口继承类时,不仅仅会继承公有(public)的成员,还会继承私有(private)和受保护(projected)的成员,若继承类私有和受保护的成员, 则接口只允许被类及其子类所实现(implements)。
```typescript
class Person {
  private age: number;
}

interface IPerson extends Person{}


// 1. 属性名和类型对上了,但是并不是类及其子类的实现
let person: IPerson = {
  age: 18, // 报错: 属性“age”在类型“Person”中是私有属性，但在类型“{ age: number; }”中不是
}

class Man {
  private age: number;
}

// 2. 属性名和类型对上了,并且也是私有属性,还是不可以,类之间的私有属性并不是名字相同就一样的
let man: IPerson = new Man(); // 不允许,虽然man中也有私有属性age,但是和Person中的age并不是同一个

// 3. Child是Person的子类, 所以是可以的
class Child extends Person{}
const child: Person = new Child(); // OK
```

## 声明合并
接口合并,即将多个同名接口合并成一个接口的机制,需要注意以下几点。

 - 非函数成员应该是唯一的,如果多个接口出现同名的非函数成员,需要确保它们类型一致

```typescript
interface Book {
  title: string;
}

interface Book {
  title: any; // 后续属性声明必须属于同一类型。属性“title”的类型必须为“string”，但此处却为类型“any”
}
```

 - 同名函数成员会被视为[函数重载](TODO),后面的接口具有更高优先级(出现在重载的前面), 

```typescript
// 特殊情况,当签名中有一个参数类型为 单一字符串字面量(字符串的联合类型不算), 会被提升到重载列表的最前端
interface M {
  returnValue(value: 'A'): string;
}

interface M {
  returnValue(value: any): any
}

interface M {
  returnValue(value:number): number;
}

interface M {
  returnValue(value: string): string;
}

// 合并后相当于
// 合并之后,除特殊情况外,后面接口的函数定义出现在了前面
// interface Student {
//   returnValue(value: 'A'): string;
//   returnValue(value: string): string;
//   returnValue(value:number): number;
//   returnValue(value: any): any
// }

let m: M = {
  returnValue(value:any){
    if(value === 'A'){
      return 'A';
    }else if(typeof value === 'string'){
      return 'S'
    }else if(typeof value === 'number'){
      return 'N'
    }else{
      return value;
    }
  }
}
```

## interface vs type

### 相同点

#### 1. interface和type都可以用来描述对象类型
interface和type都可以用来描述对象类型，包括函数类型、构造函数类型、元组(本质上还是对象类型)、索引类型
```

```

#### 2. 类只能实现(implements)对象类型,而不能继承对象类型(extends)
class可以implements对象类型, 无论是interfac定义的还是type定义
无论是type还是interface定义的类型都无法被class继承(extends)
#### 3. 支持扩展(扩展方式不同)
// 支持相互扩展(type继承interface,interface extends)
支持扩展,type通过&创建联合类型,interface通过extends继承,注意,TS允许多继承,即同时继承多个接口/类
interface可以通过extends扩展其他对象类型, 无论是interfac定义的还是type定义


### 不同点

#### 1. interface只能描述类型,而type范围相对更广
interface是定义描述对象结构的类型,因此无法描述如 字面量类型('A'、1024、true)、string、number、boolean、null、undefined、any、unknown、void、never等非对象类型,而type可以为这些类型起别名。

#### 2. interface无法描述联合类型、交叉类型、映射类型



####  3. interface可以声明合并,而type重复声明会报错


### 异同之处
 - 标识
   - ✅ &nbsp;&nbsp; 支持
   - ⚙️ &nbsp;&nbsp; type描述对象类型时支持
   - 🚫 &nbsp;&nbsp; 不支持
  
|  表现 | type  | interface | 解析 |
|   :----:  |   :----:  |   :----: |  :----: |
| 是否能够描述非对象类型  | ✅ | 🚫 | 如字面量、any、unknown、void、string、number、boolean等非对象类型 |
| 是否能够描述对象类型 | ✅ | ✅ | 如函数类型、构造函数类型、元组、索引类型等对象类型 |
| 是否能够被class继承(extends)  | 🚫 | 🚫 | 类(class)不允许继承类型,无论是type还是interface定义的 |
| 是否能够被class实现(implements)  | ⚙️ | ✅ | 类(class)可以实现interface或者type描述的**对象类型** |
| 是否能够被interface继承(extends)  | ⚙️ | ✅ | 接口(interface)可以继承interface或type描述的**对象类型** | 
| 是否支持映射类型  | ✅ | 🚫 | interface中不支持in操作符号,也就不支持映射类型，type可以 |
| 是否支持联合/交叉类型  | ✅ | 🚫 |  interface不支持联合/交叉类型,type支持 | 
| 是否支持声明合并  | 🚫 | ✅ |  interface支持声明合并,type不支持 | 
| 是否支持扩展  | ✅ | ✅ | 无论是type还是interface都支持扩展,type通过&,interface通过extends,并且都支持同时扩展多个类型,当type描述对象类型时,type和interface无异,可以互相扩展 | 



## 习题
```typescript
// ...any的类型 会导致interface失效
```