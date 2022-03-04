// 测试文件 用于测试TS代码


// 共同点:
// I. interface和type都可以用来描述对象类型，包括函数类型、构造函数类型、元组(本质上还是对象类型)、索引类型
// II. 无论是type还是interface定义的类型都无法被class继承(extends)
// III. 支持扩展,type通过&创建联合类型,interface通过extends继承,注意,TS允许多继承,即同时继承多个接口/类
// IV. interface可以通过extends扩展其他对象类型, 无论是interfac定义的还是type定义
// V. class可以extends或者implements对象类型, 无论是interfac定义的还是type定义


// 不同点: 
// 1. interface是定义描述对象结构的类型,因此无法描述如 字面量类型('A'、1024、true)、string、number、boolean、null、undefined、any、unknown、void、never等非对象类型
// 2. interface无法描述联合类型、交叉类型、映射类型
// 3. interface可以声明合并,而type重复声明会报错


// 其他情形

// interface和type都可以用来描述对象类型，包括函数类型、构造函数类型、元组(本质上还是对象类型)、索引类型
// 对象类型
interface IObj {
  name:string;
}

type TObj = {
  name:string;
}
// 函数类型
interface IFn {
  (): void;
}
type TFn = () => void;

// 构造函数类型
interface ICon {
  new (): void;
}
type TCon = new () => void;

// 元组
interface ITuple extends Array<any>{
  0: string;
  1:number;
  length: 2;
}

type TTuple = [string, number]

// 索引类型
interface IIndexType{

}

type TIndex

// 使文件被当成模块处理
export {};