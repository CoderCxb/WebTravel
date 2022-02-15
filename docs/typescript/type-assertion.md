# 类型断言
类型断言(Type Assertion): 指定某个变量的类型,使其能够通过类型检测,类型断言的作用范围是断言的表达式并且不会影响变量原本的类型。


## \<type>value
通过\<type>value的形式(尖括号语法),将value断言成type类型,断言时可以访问type的属性和方法,但是在JSX语法中容易冲突和误解,因此更推荐as写法。
```typescript
function getType(value: string | number){
  // 默认情况下只能访问共有属性/方法
  value.toString();

  // 想要访问其中类型的特定方法,需要将其断言成该类型
  (<string>value).length; // OK
  // value.length; // 报错: 类型“string | number”上不存在属性“length”

  if((<string>value).length){
    return 'string';
  }else{
    return 'number';
  }
}
```

## value as type <Badge text="推荐" />
通过value as type形式,将value断言成type类型,断言时可以访问type的属性和方法。
```typescript
function getLen(value: string | number){
  // value的类型为string|number,正常只能访问共有属性/方法
  value.toString(); // OK, toString为共有方法

  // 通过类型断言,指定value为string类型,因此可以访问length属性,不过断言仅在当前表达式有效
  (value as string).length; // OK
  // value.length; // 报错, 之前的断言仅在该表达式有效,其他位置的value类型不受影响,还是string | number,因此不能访问length

  const str: string = value as string;  // 将value断言成string赋值给str, str就会被推论成string类型
  if(str.length){
    return str.length;
  }

  // 没有length的话,只能是number类型了,转换成字符串返回length
  return String(value).length;
}
```




## 非空断言
通过添加!后缀, 可以从变量的类型中去除null和undefined。
```typescript
// 需要设置package.json文件的compilerOptions的strictNullChecks:true,开启对null和undefined的严格检查
function fn(name: string | null){
  // 原本name是无法赋值给alias, 因为string | null类型无法赋值给string类型
  // 通过添加!后缀,去除了null类型,因此可以赋值成功
  let alias: string = name!;
}
```

## 断言限制
并不是所有类型都能够直接断言成功的,断言需要满足[兼容性原则](/WebTravel/typescript/type-compatibility.html),即类型A和类型B之间存在兼容关系,无论是A兼容B还是B兼容A,满足其一即可断言。
```typescript
// string和number是完全没有兼容性的,因此是不能直接断言成功的
let s1: string = 1024 as string; // 报错: 类型 "number" 到类型 "string" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"

// 而any和string是存在兼容性关系的,可以断言
let s2: string = 1024 as any; // OK
```

## 双重断言
主要利用的是any和unknown可以兼容任何类型的原理,既然它们可以兼容任何类型,那我们就可以将某个变量先断言成any或者unknown,然后再断言成我们需要的类型。

注意,双重断言无视了断言的兼容规则,除非迫不得已并且你能保证自己断言的类型是正确的,否则不要使用双重断言。
```typescript
// 双重断言无视规则,将number断言成了string
let s:string = 1024 as unknown as string;


// 学生信息接口以及打印信息的函数可以看成是某个三方库里面的接口和函数, 你无法进行修改
// 学生信息接口
interface StudentInfo {
  no: string;  // 学号
  name: string; // 姓名
  gender: 'Man' | 'Women'; // 性别
}

// 打印信息
function logInfo(student: StudentInfo){
  console.log(`NO${student.no} is ${student.name}`);
}

// 某学生,可以看出,它的类型和StudentInfo是不兼容的
const stu = {
  no: '1',
  name: 'Jack',
  source: 100,
}

// 现在,你想打印stu的信息,如果直接断言,会因为stu的类型和StudentInfo的类型不兼容而失败
// 但是你能发现,logInfo中用到的属性,stu都有,此时可以使用双重断言
logInfo(stu as unknown as StudentInfo);

```