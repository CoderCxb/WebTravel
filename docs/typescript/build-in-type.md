# 内置类型
TypeScript提供了几种实用的类型供用户直接使用,接下去会对这些类型的使用和定义进行解析。

### 前置知识
此处为接下去的内置类型所需要的前置知识。
 - [infer](TODO)
 - [映射类型](/WebTravel/typescript/advanced-type.html#映射类型)

###### extends处理高级类型
extends对高级类型的处理,如果extends前是泛型,则是分别对高级类型中的每个类型进行判断,如果不是泛型,则为一个整体作为判断。
```typescript
// 以联合类型举例
type Mixins = 0 | 'A';

// 泛型情况
// Str接收一个泛型T, 如果泛型T是string的子类型,则返回T,否则返回never(为什么是never,看第四点)
// 此处T是联合类型,会将联合类型的每一项作为T代入,此处为0和'A'
type Str<T> = T extends string ? T : never; // 当前是保留string子类型,调换T和never的位置,则变成剔除string子类型
type StrInMixins = Str<Mixins>;

// 此处的T为Mixins相当于
type StrInMixins2 = (0 extends string ? 0 : never) | ('A' extends string ? 'A' : never);

// 而不使用泛型, 直接使用该联合类型, 此处是直接比较 Mixins extends string的结果,而不会将联合类型中的类型分别extends
type StrInMixins3 = Mixins extends string ? Mixins : never;
```

###### in在类型定义的使用
```typescript 
type Keys = 'name' | 'title';

// 联合类型时
type Obj = {
  [K in Keys]: any;
}

// 相当于, 说白了就是遍历Keys,定义属性
// type Obj = {
//   name: any;
//   title: any;
// }

// 基础类型时, in 相当于 :
type Book = {
  [K in string]: any;
}

// 相当于
type Book = {
    [x: string]: any;
}
```

###### never在高级类型中的使用
```typescript
// 1. never在联合类型中,直接被忽略
type NS = number | string | never; 
// 相当于 type NS = string | number

// 2. never在交叉类型中,直接整个交叉类型变成never
type N = any & never;
// 相当于 type NS = never
```

###### new修饰的函数
在JS中,除箭头函数以外的函数都可以使用new关键字调用而成为构造函数,但是在TS中,普通函数和构造函数是有区分的。普通函数无法直接赋值给构造函数类型,而构造函数类型的调用必须使用new关键字,并且无法相互赋值,即构造函数类型无法赋值给普通函数类型,普通函数类型也无法赋值给构造函数类型。
```typescript
// 通过new关键字,将函数类型变成构造函数类型,即不再是用于限定普通函数,而是用于限定构造函数
type ConType = new () => void;

// 普通函数无法直接赋值给构造函数类型, 只能通过双重断言
let con: ConType = function Person(){} as unknown as ConType;

new con(); // 构造函数类型只能通过new调用

// con(); // 类型“ConType”的值不可调用。是否希望包括 "new"? --- 只能通过new调用

// 普通函数类型和构造函数类型无法直接赋值, 需要进行类型断言
type FnType = () => void;
let fn: FnType = con as unknown as FnType; 
```

###### abstract修饰的构造函数类型
使用abstract修饰的构造函数类型无法进行实例化。
```typescript
type AbsFnType = abstract new () => void;

let con: AbsFnType = class Person{};

new con(); // 无法创建抽象类的实例
```

###### this参数
```typescript
// this参数必须写在第一个参数的位置,否则会报错
type FnType = (this: number) => void;

// 不过需要注意的一点是,参数名为this的参数无法直接传递,可以通过apply等修改this的方式传入
let fn: FnType = function (this:number) {
  console.log(this);
}

// fn(); // 类型为“void”的 "this" 上下文不能分配给类型为“number”的方法的 "this"
fn.apply(1024); // 1024


// this参数还有个问题,就是在infer推断类型的时候会被忽略掉, 具体查看infer章
// 通过infer P来获取参数列表的类型
type MyParameters<T> = T extends (...args: infer P) => any ? P : never;

// 可以看出, this参数被省略了
type ParamType = MyParameters<(this:number,s:string)=>void>; // type ParamType = [s: string]
```

### Required\<Type>
返回一个包含Type所有属性、所有属性都是必填的类型, 与Partial相反。
###### 使用
```typescript
interface OpBook {
  title: string;
  auth?: string;
  date?: Date;
}

type RBook = Required<OpBook>;

// 此时的RBook所有的属性都变成必填的了
// type RBook = {
//   title: string;
//   auth: string;
//   date: Date;
// }
```

###### 定义
```typescript
// 前置知识部分提到过,可以使用-?将属性变成必填的, 其余部分和Readonly非常类似(遍历keys并设置类型)
type Required<T> = { [P in keyof T]-?: T[P]; }
```


### Partial\<Type>
返回一个和Type属性相同,但所有属性都是可选属性的新类型。
###### 使用
```typescript
interface Person {
  name:string;
  title:string;
}

type PPerson = Partial<Person>;

// Partial会给每个属性增加?, 相当于
// type PPerson = {
//   name?: string;
//   title?: string;
// }
```
###### 定义
```typescript
// <T>接收一个类型
type Partial<T> = {
  // K为T的key值,T[K]为值
  // 如果没有?, 那么和原本的T是一样的,加上?,则变成可选的属性
	[K in keyof T]?: T[K] | undefined; 
};
```

### Pick\<Type, Keys>
返回一个从Type选择Keys(键组)的新类型,键组可以是字符串或者字符串的联合类型,但是必须是Type的全部keys的子集,即 不能出现Type中不存在的键。
###### 使用
```typescript
interface Person {
  name:string;
  title:string;
  run:Function;
}

// 此处,第二个泛型只能接收 name | title | run 的子集
type PPerson = Pick<Person, 'name' | 'title'>;

// Pick会根据keys创建新的类型,该类型仅包含原Type的keys
// type PPerson = {
//   name: string;
//   title: string;
// }
```

###### 定义
```typescript
// T为被Pick的类型,K为T的keys的子集(keyof T,获取T的所有键作为类型)
// 通过in遍历K设置属性及其类型即可完成Pick操作
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
}
```

### Omit\<Type, Keys>
返回一个从Type的所有属性中删除Keys(字符串或者字符串联合类型,如果Type中不存在,则不影响)的新类型。
###### 使用
```typescript
interface Book {
  title: string;
  auth: string;
  date: Date;
}

// date属性限定被删除,time不存在,所以不影响
type OBook = Omit<Book, 'date' | 'time'>

// 此时的OBook就是删除了date属性的Book
// type OBook = {
//   title: string;
//   auth: string;
// }
```

###### 定义
```typescript
// Omit通过key位置使用Exclude剔除属性
// K extends string | number | symbol 一般用于限定键(key)的类型
// [P in Exclude<keyof T, K>]  从T的keys中剔除K(这里的K是要剔除的keys,字符串或字符串联合类型)并使用in遍历作为新类型的key
type Omit<T, K extends string | number | symbol> = { [P in Exclude<keyof T, K>]: T[P]; }
```

### Exclude\<Type, ExcludeUnion>
返回一个从联合类型Type中排除ExcludeUnion类型的新类型。
###### 使用
```typescript
type UType = string | number | boolean;

// 从联合类型UType中剔除boolean类型
type NS = Exclude<UType,boolean>;

// 相当于
// type NS = string | number
```

###### 定义
```typescript
// 这行代码的意思是 如果联合类型T中的子类型是U的子类型,则返回never(被忽略 - 可参考前置知识),否则返回该类型
type Exclude<T, U> = T extends U ? never : T;

// 以UType为例
type UType = string | boolean;
type S = Exclude<UType, boolean>; // 此处 type S = string
// 相当于
// type S = (string extends boolean ? never : string) | (boolean extends boolean ? never : boolean);
```

### Extract\<Type, Union>
返回联合类型Type中,是Union类型的子类型的类型的联合类型。
###### 使用
```typescript
type BC = Extract<'a'|'b'|'c', 'b'|'c'|'d'>;  // type BC = "b" | "c"

type NS = Extract<string | number, string | number | boolean> // type NS = string | number

// 如果不存在,则是never
type N = Extract<string, number>  // type N = never
```

###### 定义
```typescript
// 这行代码的意思是 如果联合类型T中的子类型是U的子类型,则返回该类型,否则返回never(和Exclude相反)
type Extract<T, U> = T extends U ? T : never

// 以UType为例
type UType = string | boolean;
type B = Extract<UType, boolean>; // 此处 type B = boolean
// 相当于
// type B = (string extends boolean ? string : never) | (boolean extends boolean ? boolean : never );
```


### Readonly\<Type>
返回由Type的所有属性构成、并且所有属性都是只读的新类型。
###### 使用
```typescript
interface Book {
  title: string;
  auth: string;
  date: Date;
}

// 使用Readonly将所有属性变成只读
type RBook = Readonly<Book>;

// 此时的RBook就是将Book的所有属性都变成readonly
// type RBook = {
//   readonly title: string;
//   readonly auth: string;
//   readonly date: Date;
// }
```

###### 定义
```typescript
// Readonly的实现比较简单,就是通过readonly修饰in遍历的所有属性
// [P in keyof T] 遍历T的所有key并作为属性名
type Readonly<T> = { readonly [P in keyof T]: T[P]; }
```

### Record\<Keys, Type>
返回一个属性为keys类型,值为Type类型的对象类型。
###### 使用
```typescript
type Keys = 'type' | 'title';

// 限定了一个键为Keys类型,value为string类型的对象类型
type Book = Record<Keys, string>;

let p: Book = {
  title: 'YDNJS',
  type: 'JS'
};
```

###### 定义
```typescript
// 对象属性名的类型必定是 string | number | symbol的子类型, 此处K就是限定属性的泛型
type Record<K extends string | number | symbol, T> = { [P in K]: T; }
```


### ReturnType\<Type>
返回一个函数类型的返回值类型。
###### 使用
```typescript
type Fn = () => number | string;

type FnReturn = ReturnType<Fn>; // type FnReturn = string | number

type anyType = ReturnType<any>; // type anyType = any;

type neverType = ReturnType<never>; // type neverType = never;
```

###### 定义
```typescript
// T extends (...args: any) => any, 即泛型接收的是函数类型
// infer仅在extends可用,作用是让TS根据extends前的类型进行推断,并将推断的类型存储在一个类型变量中
// 拿 type fn = () => number | string 举例, fn extends (...args: any) => infer R, 此时的infer R 被推断成了 number | string
// 此时的R就存储了类型 number | string
type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R :any; 
```


### NonNullable\<Type>
返回Type剔除掉null和undefined后的新类型。
###### 使用
```typescript
type Mixins = string | number | boolean | null | undefined;

type NMixins = NonNullable<Mixins>; // type NMixins = string | number | boolean
```

###### 定义
```typescript
// 当泛型T是null的子类型时,返回never, 否则返回T,这样就能将null和undefined排除
type NonNullable<T> = T extends null ? never : T;

// 为什么是null而不是 null | undefined ?
// 因为undefined 和 null 互为子类型, 因此也可以写成
type NonNullable<T> = T extends undefined ? never : T;
```

### ConstructorParameters\<Type>
返回构造函数类型的参数列表的类型,它是一个包含所有参数类型的元组,当Type不为函数类型时,返回never类型。
###### 使用
```typescript
type Con = {
  new (n: number, s: string): void
}

// 获取构造函数类型Con的参数列表的类型
type CPType  = ConstructorParameters<Con>; // type CPType = [n: number, s: string]

type CRType2 = ConstructorParameters<new (b: boolean)=>{}>; // type CRType2 = [b: boolean]
```

###### 定义
```typescript
// T extends abstract new (...args: any) => any, 限定T为抽象构造函数类型
// (...args: infer P)使用infer P推断args的类型并返回,就获取到构造函数参数的类型了
type ConstructorParameters<T extends abstract new (...args: any) => any> = T extends abstract new (...args: infer P) => any ? P : never;
```

### ThisParameterType\<Type>
返回函数类型参数列表中的this的类型,如果没有则是unknown。
###### 使用
```typescript
type FnType = (this: number) => void;

type ThisType = ThisParameterType<FnType>; // type ThisType = number

// 参数名为this的参数无法直接传递,可通过apply等修改this的方式传入

let fn: FnType =function (this:number) {
  console.log(this);
}

// fn(); // 类型为“void”的 "this" 上下文不能分配给类型为“number”的方法的 "this"
fn.apply(1024); // 1024
```

###### 定义
```typescript
// (this: infer U, ...args: any[]) => any 是包含this参数的函数类型
// 使用infer推断this的类型并返回
type ThisParameterType<T> = T extends (this: infer U, ...args: any[]) => any ? U : unknown
```

### InstanceType\<Type>
返回构造函数类型对应的实例的类型。
###### 使用
```typescript
class Person {}

// InstanceType接收类型, 所以使用 typeof先获取Person的类型
type PersonInstanceType = InstanceType<typeof Person>; // Person
type NeverInstanceType = InstanceType<never>; // never
type AnyInstanceType = InstanceType<any>; // any

// InstanceType接收的Type为abstract new (...args: any) => any 的子类型
type StringType = InstanceType<string>; // 类型“string”不满足约束“abstract new (...args: any) => any”
```

###### 定义
```typescript
// 和ConstructorParameters相似, 通过infer R获取返回值类型
type InstanceType<T extends abstract new (...args: any) => any> = T extends abstract new (...args: any) => infer R ? R : any
```

### Parameters\<Type>
返回函数类型的参数的类型(元组),注意,this参数会被忽略,原因请参考前置知识。
###### 使用
```typescript
type FnType =  (this:string, n:number) => void;

// 可以看出,this参数被忽略了,其余参数以元组类型的形式返回
type FnParameterType = Parameters<FnType>; // type FnParameterType = [n: number]
```

###### 定义
```typescript
// T extends (...args: any) => any, 即T是函数类型
// 使用infer P接收参数列表的类型(这一步会忽略this)并返回
type Parameters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
```

### OmitThisParameter\<Type>
返回函数类型Type的移除this参数后的类型,当this的类型为unknown的父类型时不会移除,Type为非函数类型时,直接返回Type。
###### 使用
```typescript
// 如果没有this参数则直接返回Type
type NoThisFnType1 = OmitThisParameter<(title: string) => void>; // type NoThisFnType1 = (title: string) => void

// 只有this参数,返回剔除this参数后的Type
type NoThisFnType2 = OmitThisParameter<(this: number) => void>; // type NoThisFnType2 = () => void

// 多个参数并且包含this参数,返回剔除this参数后的Type
type NoThisFnType3 = OmitThisParameter<(this: number, title: string) => void>; // type NoThisFnType3 = (title: string) => void

// 当this的类型是any和unknown时并不会被省略,原因请看定义
type AnyFnType = OmitThisParameter<(this:any)=>void>; // type AnyFnType = (this: any) => void
type UnknownFnType = OmitThisParameter<(this:unknown)=>void>; // type UnknownFnType = (this: unknown) => void

// 非函数类型,则会直接返回Type
type N = OmitThisParameter<never>; // type N = never
type S = OmitThisParameter<string>; // type S = string
```

###### 定义
```typescript
// 当Type的this类型为unknown的父类型,直接返回Type,否则判断是否是函数类型,如果是函数类型,则返回移除this后的函数类型,如果不是函数类型则直接返回
// 1. unknown extends ThisParameterType<T> 判断unknown是否是T的this参数类型的子类型,这也是为什么any和unknown的this不会被移除的原因
// 2. T extends (...args: infer A) => infer R, 这里的infer A的A会忽略掉this参数
// 3. (...args: A) => R, 则是返回的移除this参数后的新的函数类型
type OmitThisParameter<T> = unknown extends ThisParameterType<T> ? T : T extends (...args: infer A) => infer R ? (...args: A) => R : T
```

### String Manipulation Types
字符串操作类型有Uppercase\<Type>、Lowercase\<Type>、Capitalize\<Type>以及Uncapitalize\<Type>,其中Type为字符串的子类型(Type extends string)。
###### 使用
```typescript
// 将字符串类型转换成大写
type U = Uppercase<'hello' | 'hi'>; // type U = "HELLO" | "HI"

// 将字符串类型转换成小写
type L = Lowercase<'Hello' | 'Hi'>; // type L = "hello" | "hi"

// 将字符串类型首字母大写
type C = Capitalize<'hello' | 'hi'>; // type C = "Hello" | "Hi"

// 将字符串类型首字母小写
type UC = Uncapitalize<'Hello' | 'Hi'>; // type UC = "hello" | "hi"
```