# 基础类型

### 类型限定
TS在定义变量/函数时,可以对其类型进行限定,使其固定为某个类型。
```typescript
// 通过:type的形式,限定code为number类型, 无法赋值其他类型(有些特殊情况后续会解析)
let code: number = 1024;
code = '1024'; // error TS2322: Type 'string' is not assignable to type 'number' - string类型无法赋值给number类型
```

### 类型推论
在没有明确指定类型的地方,TS会根据初始值来推断类型(可以通过鼠标移动到变量/函数上查看其类型)。
```typescript
// 虽然没有限定,但是Typescript会根据初始值进行推断
let code = 1024; // 推断成number, 相当于 let code: number = 1024;
code = '1024'; // error TS2322: Type 'string' is not assignable to type 'number' - string类型无法赋值给number类型

// 如果没有初始值,则类型推断成any(任意类型)
let anyValue;
anyValue = 1024;  // OK
anyValue = 'A';   // OK
```

### 类型

#### 字面量类型
在TS中,字面量既可以作为值,也可以作为类型,如1024,它既可以作为值赋值给变量,也可以作为类型限定变量,绝大部分值都可以作为类型使用(字符串、数字、布尔值、数组、对象...)。
```typescript
// 此处以数字字面量为例,其他字面量同理
// 作为值赋值给变量
let n:number = 1024; // OK

// 作为类型限定变量
let n2: 1024 = 10; // 不能将类型"10"分配给类型"1024"
```
#### number
```typescript
let decNum: number = 1024;      // 1024, 十进制
let binaryNum: number = 0b10;   // 2, 二进制
let octalNum: number = 0o10;    // 8, 八进制
let hexNum: number = 0x10;      // 16, 十六进制
let floatNum: number = 3.14; // 浮点数
```

#### string
```typescript
let title:string = 'basic type';
let type = "ts";
let sentence:string = `Now, study ${title}`;
```

#### boolean
```typescript
let isSuccess: boolean = true;
let isFail: boolean = false;
```

#### null 和 undefined
默认情况下,null和undefined是所有类型的子类型,这意味着可以将null/undefined赋值给所有类型,可以通过修改tsconfig.json中的配置compilerOptions下的strictNullChecks为true来开启严格空值检查(默认关闭)来禁止这种行为。
```typescript
// 默认情况下,null和undefined可以赋值给所有类型
let char = 'A';
char = null; // OK
char = undefined; // OK

// 无法将其他类型赋值给null类型
let nullType: null = null;
nullType = 1024; // Type '1024' is not assignable to type 'null' - 1024不能赋值给null类型的变量

// 无法将其他类型赋值给undefined类型
let undefinedType: undefined = undefined;
undefinedType = 1024; // Type '1024' is not assignable to type 'undefined' - 1024不能赋值给undefined类型的变量

// 默认情况下(不开启严格空值检查),null和undefined可以互相赋值
undefinedType = null; // OK
nullType = undefined; // OK
```

#### void
void表示没有任何类型,常用于函数没有返回值时，返回值类型为void,极少配合变量使用。
```typescript
// 1. 默认不开启严格空值检查, void类型允许接收null和undefined (null和undefined可以赋值给所有类型)
// 2. 开启严格空值检查, void只允许接收undefined
let v: void = undefined;
v = null;

// 函数部分会详细解析void与函数的结合使用
```


#### never
never表示永远不存在的值的类型,never是所有类型的子类型,可以赋值给任意类型,但其他类型都无法赋值给never(包括any)。
```typescript
// 抛出异常的函数的返回值为never类型
function error(message: string): never {
  throw new Error(message);
}

// 无法停止执行的函数返回值为never类型
function infiniteLoop(): never {
  while (true) {}
}
const num:number = error('err');
const str:string = infiniteLoop();

// 其他任何类型都无法赋值给never,any都不行
let anyObj: any = {};
let n:never = anyObj;
```

#### Array
```typescript
// 定义方式一: type[]
let numArr1: number[] = [];
// 定义方式二: Array<type>  通过数组的泛型(泛型部分会讲)
let numArr2: Array<number> = [];

// 数组的类型推论 - 根据元素类型推论
// 数组空位、null和undefined会被推论成any
let emptyArr = []; // any[]
let nArr = [ null, undefined ]; // any[]

// 其他情况根据元素类型推论
let mixArr = [ 1024, '', true ]; //  (string | number | boolean)[]
```

#### Tuple
元组类型用来表示一个指定元素数量和类型的数组。
```typescript
// 数组元素的数量和类型必须和tuple类型保持一致
const mix: [ string, number, boolean ] = [ '', 1024, true ];
// 第一个元素被限定为string类型,只能赋值string类型
mix[0] = 10; // Type 'number' is not assignable to type 'string' - 类型number不能赋值给string类型
```


#### unknown
unknow,未知类型,未知表示它可能是任意一种类型,因此任意类型都可以赋值给unknown,但是unknown只能赋值给unknown本身和any,并且unknown上的属性和方法无法访问。
```typescript
// unknown类型可以接收任意类型的值
let unk:unknown = 1024;
unk = '';
unk = true;
unk = Symbol();
unk = {};
unk = [];
unk = null;
unk = undefined;
unk = ()=>{}

// unknow类型的值只能赋值给unknown或者any类型
let anyValue: any = unk;
let unk2: unknown = unk;

// 其他类型都不能接收unknow的值
let str: string = unk; // 报错: 不能将类型“unknown”分配给类型“string”
// ... 其他同理

// 无法访问unknown上的属性和方法,哪怕它真的存在
const unknownObj: unknown = { char: 'A',run(){ console.log('run');} };
console.log(unknownObj.char); // 报错: 类型“unknown”上不存在属性“char”
unknownObj.run(); // 报错: 类型“unknown”上不存在属性“run”
```


#### any
any,任意类型,可以接收所有类型的值,也可以赋值给除了never的其他所有类型,是TS中最自由的类型,但是这是TypeScript,要是any泛滥就成AnyScript了,TypeScript的优势也就不明显了,所以在开发中尽量避免使用any。
```typescript
// 可以将任意类型的值赋值给any类型
let value:any = 1024;
value = '';
value = true;
value = Symbol();
value = {};
value = [];
value = null;
value = undefined;
value = ()=>{}

// 可以将any类型的值赋值给除了never以外的其他类型
let v: any; // any类型的值是什么都不重要,赋值都是被允许的,所以太自由了,所以违背了使用TS的初衷
let num: number = v;
let str: string = v; // OK
let arr: Array<number> = v; // OK

// any也无法赋值给never
let n: never = v; // 不能将类型“any”分配给类型“never”
```

#### 对象

##### 动态赋值
Typescript是静态编译时进行类型检测,而使用\[key]的形式进行[动态赋值](TODO),在运行阶段才能确定key值,所以TS无法检测到该赋值是否合法。
```typescript
interface Person{
  type:string;
}

let p: Person = { type: 'Man' };
p['age'] = 18; // OK
p.age = 18; //  类型“Person”上不存在属性“age”
```


##### Object
Object在TS中的使用分为两种,一是作为类型,此时是interface Object{},二是作为值,此时是ObjectConstructor接口限定的对象(TS内部实现)

###### 类型与值
在同一个作用域中可以同时定义同名的类型和变量,在作为类型或值时使用,互不影响,Object就是如此,既可以作为类型使用,又可以作为值使用。
```typescript
// 类型
// 定义了一个名为 Person 的接口
interface Person {
  type: string;
}

// 值
// 声明Person变量,类型为Function
declare let Person: Function;

// 定义Person
Person = function(){
  return 'use as value'
}

// 作为类型使用
let p:Person = {
  type: 'person'
}

// 作为值使用
console.log(Person()); // use as value
```

###### 解析Object
```typescript
// 缩略版Object接口,留下部分属性和方法的定义
// Object作为类型使用时,使用的是interface定义的Object
interface Object {
  constructor: Function;
  toString(): string;
  toLocaleString(): string;
  valueOf(): Object;
}

// 缩略版限定Object构造函数的接口,留下部分属性和方法的定义
interface ObjectConstructor {
  new(value?: any): Object; 
  (): any;
  (value: any): any; 
  readonly prototype: Object;
  keys(o: object): string[];
}

// 声明Object的值,注意,这个是值而不是类型,当Object作为值使用的时候,它的类型为ObjectConstructor
declare var Object: ObjectConstructor; // 限定Object作为值的时候的类型

// Object作为值使用的时候,使用的是ObjectConstructor限定的Object构造函数(本质上是对象)
//@ts-ignore
Object = {/** 此处为Object的实现 **/} 

// 此时Object是类型,使用interface Object
let obj: Object = {};

// 这些情况是Object作为值使用的时候,使用Object对象
Object.values({});
Object(''); 
new Object();
```

###### 装箱
当基本数据类型如(number、string、boolean、undefined、null)等作为Object使用或赋值时,会进行装箱(包装成对象)和拆箱(恢复成基本数据类型)的操作,不影响原本的执行逻辑,因此可以将基本数据类型赋值给Object类型的变量,这也是为什么基本数据类型可以调用方法的原因(undefined和null没有属性和方法)。
```typescript
// 判断类型时会被包装成Object(1024),实际赋值进去的还是1024,JS引擎内部做的
const num: Object = 1024;

// 直接使用时是正常的使用
console.log(num); // 1024
console.log(typeof num); // number

// 作为对象使用时,会被包装成 Object(num),所以可以调用属性/方法
console.log(num.constructor); // [Function: Number]
```

###### 类型限定
对象默认情况下是具备Object上的所有方法和属性,如果需要重写对象的方法,那么需要和接口Object限定的保持一致。
```typescript
// 接口Object上限定了toString必须返回string类型,所以如果在对象中重写toString方法,也必须返回string类型,其他属性/方法同理
const obj: Object = {
  type: 'Object', // 初始化时,对于属性/方法是没有限制的,哪怕这些属性方法不在Object接口上
  toString(){
    return 'BOOK - YDNJS'; // 必须返回string类型
  }
};
// 但是后续使用的时候只能使用Object上有的属性和方法
console.log(obj.toString()); // BOOK - YDNJS

// type在Object接口上没有定义,无法访问
// console.log(obj.type); // 类型“Object”上不存在属性“type”

// 动态访问
console.log(obj['type']); // Object
```

##### object
限定为对象类型(引用数据类型即可),初始化时对于对象中的属性/方法没有限制,并且并不受Object接口的类型限制,但无法接收基本数据类型(不会装箱和拆箱)。
```typescript
// 1. 无法接收基本数据类型
// const num:object = 1024; // 不能将类型“number”分配给类型“object”

// 2. 覆盖string原有的方法不受接口Object类型的限制
const obj: object = {
  type: 'object', // 初始化时,对于属性/方法是没有限制的,哪怕这些属性方法不在Object接口上
  toString(){
    return 1024; // 原本是要返回一个string类型,现在返回其他类型也是被允许的
  }
}
// 3. 但是后续使用的时候只能使用Object上有的属性和方法
console.log(obj.toString()); // 1024

// type在Object接口上没有定义,无法访问
console.log(obj.type); // 类型“object”上不存在属性“type”

// 动态访问
console.log(obj['type']); // object
```

##### {}
空对象类型(引用数据类型即可),虽然叫做空对象类型,但是初始化时对于对象中的属性/方法没有限制,并且并不受Object接口的类型限制,能够接收基本数据类型。
```typescript
// 1. 接收基本数据类型
const num:{} = 1024; // 不能将类型“number”分配给类型“object”

// 2. 覆盖string原有的方法不受接口Object类型的限制
const obj: {} = {
  type: '{}', // 初始化时,对于属性/方法是没有限制的,哪怕这些属性方法不在Object接口上
  toString(){
    return 1024; // 原本是要返回一个string类型,现在返回其他类型也是被允许的
  }
}
// 3. 但是后续使用的时候只能使用Object上有的属性和方法
console.log(obj.toString()); // 1024

// type在Object接口上没有定义,无法访问
// console.log(obj.type); // 类型“{}”上不存在属性“type”

// 动态访问
console.log(obj['type']); // {}
```

##### Object vs object vs {}
一般对对象进行限定,都是自定义interface限定,这三种情况的使用场景较少,但是还是可以了解一下这三者的区别。

无论是Object、object还是{},本质含义上都是限定引用数据类型(拆箱/拆箱从含义上也是让传入的数据变成对象),Object是一个接口(interface),而object和{}就是指代引用数据类型,因此不受Object接口中的类型限制(覆盖时类型不受限制)。

|   | Object | object  | {} |
|   :----:  |   :----: |   :----:  |   :----: |
| 含义  | Object接口 | 引用数据类型 | 引用数据类型 |
| 能否接收基本数据类型(装箱/拆箱)  | 能 | 不能  | 能 |
| 覆盖Object接口的属性/方法,类型是否受限制 | 受限制 | 不受限制  | 不受限制 |
| 初始化时,是否能够定义接口中不存在的属性/方法  | 能 | 能  | 能 |
| 静态访问Object接口外的属性/方法  | 不能 | 不能  | 不能 |



### 可赋值性
 - 看法
   - 竖着看：查看类型可以接收哪些类型
   - 横着看：查看类型可以赋值给哪些类型
 - 标识
   - ✅ &nbsp;&nbsp;允许接收/赋值
   - ⚙️ &nbsp;&nbsp;当strictNullChecks设置为false时(默认情况),允许接收/赋值
   - 🚫 &nbsp;&nbsp;不允许接收/赋值

|  <div>赋值 ➡️</div> <div>接收 ⬇️</div>   | any | unknown  | object |  void  |  null  |  undefined  | never |  简述  | 
|   :----:  |   :----: |   :----:  |   :----: |   :----:   |   :----: |   :----:   |   :----: |  :----: |
| any | ✅ | ✅  | ✅ |  ✅  | ✅ |  ✅  | 🚫  | any类型可以接收任何类型,可以赋值给除never以外的其它类型 |
| unknown| ✅ | ✅  | 🚫 |  🚫  | 🚫 |  🚫  | 🚫  | unknown类型可以接收任何类型,但只能赋值给unknown和any类型 |
| object    | ✅ | ✅  | ✅ |  🚫  | 🚫 |  🚫  | 🚫  |  |
| void    | ✅ | ✅  | 🚫 |  ✅  | 🚫 |  🚫  | 🚫  |
| null   | ✅ | ✅  | ⚙️ |  ⚙️  | ✅ |  ⚙️  | 🚫  | 默认情况,null可以赋值给除never以外的任何类型 | 
| undefined| ✅ | ✅  | ⚙️ |  ✅  | ⚙️ |  ✅  | 🚫  | 默认情况,undefined可以赋值给除never以外的任何类型 | 
| never   | ✅ | ✅  | ✅ |  ✅  | ✅ |  ✅  | ✅  | never类型可以赋值给任何类型,但只能接收never类型 |
