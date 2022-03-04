# 类型别名
通过type关键字可以为任何类型起一个别名,后续需要使用这个类型的时候直接使用别名即可,当某个类型使用频率较高时,为它起一个别名,能够有效的提高效率。

与interface比较相似,能做到的事情也有很大的重叠,具体区别参考 [interface vs type](/WebTravel/typescript/interface.html#interface-vs-type)

适用于: 
 - 基础类型,如string、number、boolean、元组、any
 - 高级类型,如联合类型、交叉类型、索引类型、映射类型

```typescript
// 基础类型
type S = string;
type Fn = () => void;

// 高级类型 如联合类型、交叉类型等,无法使用interface定义,但是可以使用type
type SN = string | number;
type N = string & number;

let sn: SN = 10;
sn = '10';

// 为类型 { name: string; age: number; } 起了一个别名 Person, 后续使用Person即可
// 当类型在多个地方使用的时候,优势更加明显
type Person = {
  name: string;
  age: number;
}

function fn(p: Person){ // 就不用写成 p: { name: string; age: number; }
  console.log(p.name,p.age);
}

let person: Person = {
  name: 'Jack',
  age: 10
}

fn(person); // Jack 10
```
