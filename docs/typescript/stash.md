# 扩展

###### 对象的keys和values作为类型
```typescript
type Computer = { brand: 'Apple', type: 'Mac Book'}

// 对象类型的keys作为类型,此处为 "brand" | "type"
type Keys = keyof Computer;
// 对象类型的values作为类型, 此处为 "Apple" | "Mac Book"
type Values = Computer[keyof Computer]
```

###### 获取类型数组的元素作为联合类型
```typescript
type Types = [string, number, boolean];
// 元组中存储了多个类型,现在想把元组中的类型变成联合类型
type TypesUnion = Types[number];

// 等价于
// type TypesUnion = string | number | boolean
```

###### 映射类型修饰符
映射类型支持添加/删减readonly以及?修饰符。
```typescript
interface Person {
  name :string;
}

// 添加readonly修饰符,使属性变成只读
type ReadOnlyPerson = {
  +readonly [K in keyof Person]: Person[K]
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
  [K in keyof Person]+?: Person[K]
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
