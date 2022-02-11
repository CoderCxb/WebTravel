# 接口


## 可选属性

## 只读属性

## 函数类型

## 构造函数类型

## 可索引类型

## 类

## 


```typescript
interface Person {
  constructor:Function;
  type:string;
}

class Women {
  constructor(){}
  static type = '';
  static age = '';
}

function Man(){}
Man.age = '';
Man.type = '';

let m: Person = Man;
let wm: Person = Women;
```

## 声明合并

## interface vs type


## 习题
```typescript
// ...any的类型 会导致interface失效
```