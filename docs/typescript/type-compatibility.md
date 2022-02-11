# 类型兼容
TS中的类型兼容性是基于结构子类型的,即判断类型是否兼容时,关注点应该是结构(成员)而不是名称。TS中结构化类型系统的基本规则是,如果X要兼容Y, 那么Y至少具有与X相同的属性。
```typescript
interface N1 {
  name: string;
}

interface N2 {
  name: string;
}

class Person {
  name: string;
}

// N1和N2存在相同的结构, 虽然并不是同一个类型,但是结构兼容,因此能够赋值成功
let p: N1 = { name: 'n2' } as N2;

// 同理, Person的实例与N1结构兼容,因此也可以正常赋值
p = new Person();
```



## 基础类型
 - any为任意类型,基本兼容所有类型,自由度极高,但是与我们使用TS的初衷相违背,在大部分情况下尽量避免使用any
 - unknown为未知类型,基本兼容所有类型, 常用于双重断言
 - 若所有属于类型A的值都属于类型B,那么A是B的子类型,子类型可以赋值给父类型,也可以说是B兼容A(父类型兼容子类型,所以子类型可以赋值给父类型)。
```typescript
// any兼容性很强,因此尽量避免使用
let a: any;
a = 'str';
a = 1024;
a = true;

// unknown同理
let u: unknown;
u = 'str';
u = 1024;
u = true;


// 字符串字面量的联合类型
type Chars = 'A' | 'B';

let c:Chars = 'A';

// string是所有字符串的联合类型,因此包含了Chars,因此Chars是string的子类型
let s:string = c;

// any是任意类型, 包含了string,因此string是any的子类型
let a:any = s;
```
## interface
```typescript
// Person是父类型
interface Person{
  name:string;
  type: string;
}

// Student是子类型
interface Student {
  name:string;
  type: string;
  source: number;
}

// 解析: Person代表所有拥有name、type属性(类型也要符合)的值,而Student代表拥有name、type以及source(类型也要符合)的值,可以看出,Student仅仅是Person的一部分(拥有source的Person), 也就是说Student类型的值全部都是Person类型(Student是Person的子类型),但是Person类型的值不一定是Student类型的值。

// Student extends Person 判断Student是否是Person的子类型,此处使用三元运算符,如果是返回true类型,否则返回false类型
// 注意: 此处返回的是类型,因为无论Student还是Person,都是类型,所以这一句中的其他值以及返回值,都是类型
type Result = Student extends Person ? true : false; // true, Student是Person的子类型

let p: Person;
let s: Student;

// 子类型可以赋值给父类型,而父类型不能赋值给子类型
p = s; // OK 
s = p; // 报错: 类型 "Person" 中缺少属性 "source"，但类型 "Student" 中需要该属性
```

## 联合类型
```typescript
// 联合类型 - 详情见高级类型
type F =  string | number | boolean;

type S = string | number;

// 解析: F表示所有的字符串、数字和布尔值,而S表示所有的字符串和数字,这一看就知道,S类型包含的所有值也都是属于F类型,所以S类型是F类型的子类型,反之不成立,因为F类型中的布尔值并不在S类型中。

// S extends F 判断S是否是F的子类型,此处使用三元运算符,如果是返回true类型,否则返回false类型
// 注意: 此处返回的是类型,因为无论S还是F,都是类型,所以这一句中的其他值以及返回值,都是类型
type Result = S extends F ? true : false; // true

// 联合类型使用extends时会对每项进行extends并使用｜运算符,相当于
type Result = (string extends F ? true : false) | (number extends F ? true : false);

// 此处,联合类型的实际类型会根据赋值而改变,赋值字符串时是string,赋值布尔值时是boolean
// 所以本质上只是联合类型中的其中一种
let f1: F = ''; // 此时f1为string类型,不是F类型,可以赋值给S类型
let s1: S = f1; // OK

let f2: F = true; // 此时f2为boolean类型,不是F类型,不能赋值给S类型
let s2: S = f2; // 不能将类型“boolean”分配给类型“S”

// fn返回值类型为F
function fn(): F {
  let random = Math.random();
  // 根据随机数返回 string/number/boolean其中一种
  return random > 0.6 ? String(random) : random > 0.3 ? random : Boolean(random);
}

// 不能将类型“F”分配给类型“S”  -   不能将类型“boolean”分配给类型“S”
let f3: S = fn();
```

## Function
函数类型需要考虑的参数列表以及返回值类型。
```typescript
// 函数仅考虑参数列表时,若类型A的参数列表能够按序的在类型B的参数列表中找到对应类型的参数,则类型A是类型B的子类型,子类型可以赋值给父类型
// 函数参数列表需要关注的是类型,参数名并不重要
type fnType = (n:number,s:string) => string;
const fn1: fnType = () => ''; // 空列表直接满足,不用找
const fn2: fnType = (num:number) => ''; // 第一个参数是number,fnType第一个参数也是number,所以是fnType的子类型,可以赋值
const fn3: fnType = (num:number, str: string) => ''; // 参数列表的参数分别是number、string,和fnType一致,是其子类型,可以赋值

// 参数列表不符合
// const fn4: fnType = (str:string, num: number) => ''; // 不能将类型“(str: string, num: number) => string”分配给类型“fnType”

// 函数除了要考虑参数列表,还要考虑返回值
// 如此处,fnType的返回值是string
// const fn5:fnType = () => 1024; // 不能将类型“number”分配给类型“string”, fnType限制返回值必须是string或能够赋值给string的值
const fn6: fnType = () => Object(); // OK, Object()的返回值是any类型,而不是Object
```

## 枚举
 - 成员包含数字的枚举与number类型兼容
 - 枚举之间无论成员是否一致,都互不兼容,
```typescript
// 只要有一个成员是数字即可, Up取的是默认0
enum Direction {
  Up,
  Down = 'Down',
  Left = 'Left',
  Right = 'Rigth',
}

enum OtherDirection {
  Up,
  Down = 'Down',
  Left = 'Left',
  Right = 'Rigth',
}

let direction: Direction = 1024; // 数字枚举与number兼容
let n: number = Direction.Up; // 数字枚举与number兼容

// let oDirection: Direction = OtherDirection.Up; // 不同枚举无论是否成员一致,都无法兼容

```

### 协变和逆变