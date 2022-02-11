# 高级类型

## 联合类型
联合类型(Union Types): 表示取值的类型可以是多种类型中的一种,使用 | 连接多个类型,形式如 T1 | T2, 子类型extends联合类型为true。
###### 基本使用
```typescript
// NS表示可以是number类型 也可以是string类型
type NS = number | string;

// number和string都是NS的子类,extends为true
type R = number extends NS ? true : false;

// 联合类型的变量在被赋值时,会根据类型推论推断出一个类型,作为当前变量的类型
let ns: NS;
// 此处ns赋值了number类型, 则ns的类型为number,所以可以使用number的方法
ns = 1024;
console.log(ns.toFixed(2)); // 1024.00

// 此处ns赋值了string类型, 则ns的类型为string,所以可以使用string的方法
ns = 'Union';
console.log(ns.toUpperCase()); // UNION

// 当联合类型的变量被赋值后使用 typeof获取类型时, 获取的是类型推论出的类型, 而不是联合类型
type S = typeof ns; // type S = string
```

###### 访问属性和方法
当无法确定变量到底是联合类型中的哪一种类型时,只能访问联合类型中所有类型共有的属性和方法。
```typescript
function fn(ns: number | string){
  // 此处的ns并无法直接推断出到底是number还是string
  // 这种情况只能访问联合类型所有类型中共有的属性和方法
  console.log(ns.toString()); // 编译OK
  // console.log(ns.length); // 报错: 类型“number”上不存在属性“length”
}
```

###### 类型省略
当联合类型中的某个类型包含了另一个类型时,会保留范围更大的类型,而被包含的类型则被省略。
```typescript
type Man = {}

type Women = {};

type Person = Man | Women;

// Person类型包含了 Man | Women 类型, 所以P就直接变成了Person类型,而不是Man | Women | Person
type P = Man | Women | Person; // type P = Person 


// 同理, any中包含了string, 而string也包含了"A", 因此 type T = any
type T = "A" | string | any;
```

###### 可辨识联合类型
可辨识联合类型,即联合类型中的所有类型存在相同的属性(可辨识特征/标识,可以不止一个),其他属性并无关联,TS会根据标识,匹配联合类型中对应的类型。
```typescript
interface Square {
  kind: "square";
  size: number;
}
interface Circle {
  kind: "circle";
  radius: number;
}

// 此处的Shape为可辨识联合类型
type Shape = Square | Circle;

// Square和Circle共有的属性就是 标识

function getArea(s: Shape) {
  // 除了用switch,也可以用if
  // 根据不同的标识(kind), s会被识别联合类型中对应的类型
  switch(s.kind){
    // 此处的s为Square类型
    case "square": 
      // 正方形面积 长/宽的平方
      return Math.pow(s.size,2);
    // 此处的s为Circle类型
    case "circle":
      // 圆形面积 π(r ** 2)
      return Math.PI * Math.pow(s.radius,2);
  }
}

// 当传入的对象的kind属性为'square'时, TS将会认定getArea接收的是Shape中的Square类型
console.log(getArea({ kind: 'square' ,size: 1})); // 1

// 当传入的对象的kind属性为'circle'时, TS将会认定getArea接收的是Shape中的Circle类型
console.log(getArea({ kind: 'circle', radius: 1 })); // 3.141592653589793


```

## 交叉类型
交叉类型(Intersection Types): 将多个类型合并为一个类型,它包含了所需的所有类型的特性。
###### 基本使用
```typescript
// 1. 当对象类型交叉时存在相同的属性定义时, 会将所有类型的同名属性进行交叉 
type Person = {
  name: string;
  gender: string;
}

type Student = {
  name: symbol;
  source: string;
  school: string;
}

// 此时的交叉类型具备Person类型和Student类型的特性
type Info = Person & Student;
// 相当于 
// type Info = {
//   这里为什么是never? 就是因为Person和Student都有name属性, string & symbol的结果就是never
//   name: never;  
//   gender: string;
//   source: string;
//   school: string;
// }

// 2. 基本类型或者字面量类型交叉,一般是取交集
type C = 'A' & string; // type C = "A"

// string 和 number没有交集,因此是never
type N = string & number; // type N = never

// unknown包含了string,他们的交集是string
type U = string & unknown; // type U = string

// any比较特殊,交叉后是还是any
type A = string & any; // type A = any
```

## 索引类型
索引类型(Index Types): 通过keyof操作符获取索引类型并可以通过索引类型获取对应的类型,还可以声明索引签名限制成员属性。

### 索引类型查询
索引类型查询通过keyof操作符,keyof(索引类型查询操作符)返回对象类型的索引的联合类型。
```typescript
type Computer = { brand: string, type: string, price: number }

// 对象类型的索引作为类型,此处为Keys类型为 "brand" | "type" | "price"
type Keys = keyof Computer; // type Keys = "brand" | "type" | "price"
```

#### keyof只获取公有属性
```typescript
// 注意,keyof只能获取公有的keys作为类型
class Person {
  public name: string;
  private age: number;
  protected money: number;
}

// 由于keyof只能获取公有的key,所以 type PersonKeys = "name"
type PersonKeys = keyof Person;
```

#### 索引签名
当声明了索引标签, 所有成员需要符合索引签名。
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
### 索引访问
Type[Key]\(索引访问操作符),返回对象索引对应的值类型,Type为对象类型,Key为索引类型。
```typescript
type Computer = { brand: string, type: string, price: number }

type Keys = keyof Computer;

// 获取索引类型为"brand"对应的类型
type S = Computer['brand']; // type S = string
// 获取Computer中所有索引类型对应类型的联合类型
type Values = Computer[keyof Computer]; // type Values = string | number
```
#### 元组类型转换成联合类型
元组可以看出一个类型数组, 索引类型为number, 因此可以通过Tuple[number]的方式获取到元组中的类型的联合类型。
```typescript
type Types = [string, number, boolean];
// 元组中存储了多个类型,现在想把元组中的类型变成联合类型
type TypesUnion = Types[number];

// 等价于
// type TypesUnion = string | number | boolean
```

## 映射类型
映射类型: 将一个类型映射到新的类型上,并且可以根据需求对原来的属性类型进行改动
```typescript
interface Info {
  name: string;
  height: number;
  weight: number;
} 

// 将Info的所有属性都变成只读
// 1. key Info获取到Keys,这个需要遍历的属性名的联合类型
// 2. K in Keys, 遍历Keys,类似for循环,K为遍历出来的每个属性名
// 3. Info[K], 获取到属性名对应的类型, 至此,已经将Info映射过来了
// 4. 添加只读修饰符 readonly, 大功告成 - Readonly就是这样实现的,不过就是使用了泛型而已
type ReadonlyInfo ={ 
  readonly [K in keyof Info]: Info[K]; 
}

// 等价于
// type ReadonlyInfo = {
//   readonly name: string;
//   readonly height: number;
//   readonly weight: number;
// }

// 需要注意的是,在interface中不能使用,在类型别名形式改成interface就会报错
// interface ReadonlyInfo { 
//   readonly [K in keyof Info]: Info[K]; 
// }
```

### 映射类型修饰符
映射类型支持添加/删减readonly以及?修饰符。
```typescript
interface Person {
  name :string;
}

// 添加readonly修饰符,使属性变成只读
type ReadOnlyPerson = {
  readonly [K in keyof Person]: Person[K]
};

// 相当于
// type ReadOnlyPerson = {
//   readonly name: string;
// }

// 移除readonly标识符,使属性变成可写
type WritablePerson = {
  -readonly [K in keyof ReadOnlyPerson]: ReadOnlyPerson[K]
}

// 相当于
// type WritablePerson = {
//   name: string;
// }

// 添加?标识符使属性变成可选属性
type OpPerson = {
  [K in keyof Person]?: Person[K]
}

// 相当于
// type OpPerson = {
//   name?: string;
// }

// 移除?标识符使属性变成可选属性
type RequiredPerson = {
  [K in keyof Person]-?: Person[K]
}

// 相当于
// type RequiredPerson = {
//   name: string;
// }
```

