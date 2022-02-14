# 枚举
枚举是带有含义的常量,使用枚举替代往常的直接使用常量的情景,使得代码可以更加便于理解。

```typescript
// 这是一个数字枚举,Up初始值默认为0,后续成员从0开始递增,即 Up=0,Down=1,Left=2,Right=3
const center = 'center';
enum Directions {
  Up,
  Down,
  Left,
  Right,
  Center = center, // 使用变量和字符串同理, 后续成员需要手动指定枚举值
  CopyUp = Up, // 可以访问前面的成员的值,但是无法访问后面的成员的值
}

console.log(Directions[0]); // Up
console.log(Directions.Up); // 0
```

## 普通枚举
根据枚举的枚举值的类型,又将枚举分为3类, 数字枚举、字符串枚举以及异构枚举(枚举值为字符串和数字类型)。

注意: 包含字符串值成员的枚举中不允许使用计算值, 如 1 + 1, 1 << 2, 1 | 2

### 数字枚举
数字枚举,即对应的常量值均为数字的枚举,默认情况下,第一项枚举的默认值为0,后续枚举项的值会在前一项的基础上+1,因此默认为数字枚举。
```typescript
enum Directions {
  Up,
  Down,
  Left,
  Right
}

// // 相当于 
// enum Directions {
//   Up = 0,
//   Down = 1,
//   Left = 2,
//   Right = 3,
// }

console.log(Directions[0]); // Up
console.log(Directions.Up); // 0
```

###### 手动指定值
除了使用默认值以外,还可以通过手动指定的方式为枚举指定值,手动手动值以后,会影响后续的枚举值,因此枚举值是在前一项的基础上递增的。
```typescript
enum Directions {
  Up, // 默认值为0
  Down, // 根据前一项的值+1,因此为1
  Left = 10,
  Right,  // 根据前一项的值+1,因此为11
}

// 相当于
enum Directions {
  Up = 0,
  Down = 1,
  Left = 10,
  Right = 11,
}

```

### 字符串枚举
当所有的枚举值都为字符串类型时,则为字符串枚举,字符串枚举每一项都需要手动指定。
```typescript
enum Directions {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

console.log(Directions.Up); // up
```

### 异构枚举
异构枚举,也可以理解为混合枚举,即枚举值并不是单纯的数字和字符串,而是既有数字又有字符串。
```typescript
enum Colors {
  Red,
  Green = 'green',
  Black = 1, // 注意,前一项的枚举值为字符串枚举时,必须手动指定,因为无法从字符串推导出有效的数字
  Yellow,
}

// 相当于
enum Colors {
  Red = 0,
  Green = 'green',
  Black = 1, 
  Yellow = 2,
}
```

### 本质
普通枚举(非const枚举)的本质是一个存储了常量及其含义的对象,形式为{ 枚举名: 枚举值, 枚举值: 枚举名 }。
<CodeGroup>
  <CodeGroupItem title='TS - 编译前' active>

```typescript
// Directions枚举
enum Directions {
  Up,
  Down,
  Left,
  Right
}

Directions[0]; // OK
Directions.Up; // OK
```

  </CodeGroupItem>
  <CodeGroupItem title='JS - 编译后'>

```javascript
var Directions; // 定义枚举

// 1. 立即执行函数表达式, 接收Directions
// 2. 为Directions赋值 以Directions[Directions["Up"] = 0] = "Up"为例 (这句话进行了2次赋值)
// 2.1 Directions["Up"] = 0 设置Directions的'Up'属性值为0,并且返回0
// 2.2 Directions["Up"] = 0 返回0, 所以相当于 Directions[0] = "Up"
// 2.3 相当于 Directions["Up"] = 0; Directions[0] = "Up"; 两句话
(function (Directions) {
    Directions[Directions["Up"] = 0] = "Up";
    Directions[Directions["Down"] = 1] = "Down";
    Directions[Directions["Left"] = 2] = "Left";
    Directions[Directions["Right"] = 3] = "Right";
})(Directions || (Directions = {}));

// 此时的Directions
// {
//   // 枚举值: 枚举名
//   '0': 'Up',
//   '1': 'Down',
//   '2': 'Left',
//   '3': 'Right',
//   // 枚举名: 枚举值
//   Up: 0,
//   Down: 1,
//   Left: 2,
//   Right: 3
// }

// 因此既可以通过枚举名访问,也可以通过枚举值访问
Directions[0]; // OK
Directions.Up; // OK
```
  </CodeGroupItem>
</CodeGroup>


## const枚举
const枚举是通过const修饰的枚举,其具有以下特点。
 - 只允许通过枚举名进行访问
 - 在编译阶段枚举会被删除, 在使用的位置全部以枚举值(字面量)的形式存在
 - 变量不能作为初始值

###### 仅允许枚举名访问
```typescript
const enum Directions {
  Up,
  Down,
  Left,
  Right
}

// 只允许通过枚举名访问
// Directions.Up; // OK
// Directions[0]; // 常量枚举不允许通过枚举值访问
```

###### 编译阶段删除
const枚举在编译之后会被删除, 后续使用枚举值的位置全部以枚举值形式(字面量)存在,可以通过tsc + 文件名的方式将TS编译成JS文件。
<CodeGroup>
  <CodeGroupItem title='TS - 编译前' active>

```typescript
const enum Directions {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

let up = 'up';
if(up === Directions.Up){
  console.log('OK'); // OK
}
```

  </CodeGroupItem>
  <CodeGroupItem title='JS - 编译后'>

```javascript
// 可以看出, TS文件中定义的const枚举Directions编译后并不存在,只剩下枚举值的字面量
var up = 'up';
if (up === "up" /* Up */) {
    console.log('OK'); // OK
}
```
  </CodeGroupItem>
</CodeGroup>


###### 变量不能作为初始值
```typescript
const green = 'green';

const enum Colors {
  Red,
  Yellow,
  Green = green, // 报错: 常量枚举成员初始值设定项只能包含文字值和其他计算的枚举值
}
```

## 作为类型
当枚举作为类型使用时, 相当于枚举成员的联合类型,并且和number具有兼容关系，因此取值必须是该枚举的成员。
```typescript
// 1. 如果是数字枚举和异构枚举,则除了枚举成员以外,还可以赋值任意数字,因此兼容
const enum Colors {
  Red,
  Yellow,
  Blue,
  Green = 'G',
}

let color:Colors = Colors.Blue; // OK
color = 1024; // OK

// 同样,数字枚举和异构枚举的枚举值为number的成员可以赋值给number类型,string类型的成员不行
let n1: number = Colors.Red; // OK 
let n2: number = Colors.Green; // 报错: 不能将类型“Colors”分配给类型“number”, 主要是因为Green对应的值是字符串


// 2. 如果是字符串枚举,则只允许赋值枚举成员
enum Directions {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

let direction: Directions = Directions.Up; // OK
direction = 1024; // 报错: 不能将类型“1024”分配给类型“Directions”
```



