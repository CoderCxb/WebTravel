# 接口

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
