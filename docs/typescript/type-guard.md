# 类型保护
类型保护是能够确保某个变量或参数在一定的范围内能够正常使用的表达式,通过类型保护,该变量或参数在该范围内会被当作正确的类型进行使用,从而通过类型检测。

## in 
in关键字同样可以推断类型,前提是该属性能够有效的区分不同类型(并非共有属性)。
```typescript
type Runner = {
  name: string;
  level: number;
  run:Function;
}

type Student = {
  name: string;
  source: number;
  study: Function;
}

function todo(p: Runner | Student){
  if('run' in p){
    // 存在run,必定是Runner类型,因此在if的作用域中,p为Runner类型
    console.log(p.level); 
  }else{
    // 由于p只能是Runner或Student,else以后只能是Student了(如果类型更多,还需要继续判断)
    console.log(p.source);
  }

  // 共有属性/方法无法进行类型保护
  if('name' in p){
    // Runner和Student都存在name属性
    // 因此name in p无法确定p是Runner还是Student,所以在这个if的作用域中只能访问共有属性
  }
}
```

## typeof
typeof适用于基本数据类型保护,因为对象类型typeof的结果都是object,并不能有效进行区分。
```typescript
function fn(v: number | string | symbol){
  if(typeof v === 'string'){
    // 此if的作用域中,v的类型为string
    return v.toLowerCase();
  }else if(typeof v === 'number'){
    // 此if的作用域中,v的类型为number
    return v.toFixed(2);
  }else{
    // 此if的作用域中,v的类型为symbol
    return v.description;
  }
}
```

## instanceof
instanceof适用于类和构造函数的类型保护,无法对基础类型和普通对象类型进行保护。
```typescript
class Runner{
  level: number;
  run(){}
}

class Worker{
  source: number;
  work(){}
}

function todo(p: Runner | Worker){
  if(p instanceof Runner){
    // 此if作用域中,p是Runner的实例,因此可以访问Runner的实例属性/方法
    console.log(p.level);
  }else{
    // 此if作用域中,p是Worker的实例,因此可以访问Worker的实例属性/方法
    console.log(p.source);
  }
}
```

## 自定义类型保护
自定义类型保护通过定义一个方法,返回值为argument is Type,通过判断返回值是否为true,判断某个参数是否是Type类型。相较于之前的几种类型保护方式,自定义的灵活性更高,但是书写成本也更高(代码量更多了),但是它可以和typeof和instanceof结合(控制返回值而已),因此具备基础类型/类/普通对象类型保护的能力。
```typescript
type Runner = {
  name: string;
  level: number;
  run:Function;
}

type Student = {
  name: string;
  source: number;
  study: Function;
}

// 参数一般是联合类型,如这里的p是 Runner | Student
// 返回值为类型谓词, argument is Type, 即某个参数是否是某个类型,Type只能是联合类型其中的类型之一
function isRunner(p:Runner | Student): p is Runner{ // 这里的类型只能是Runner或者Student
  // 当返回值为true时,则该参数被识别为Type, 此处为例,返回值为true,则p为Runner类型
  return (p as Runner).run !== undefined;
  // 如果要判断基础类型 结合typeof, 如 
  // 如果要判断类类型,结合instanceof 
}

function todo(p: Runner | Student){
  // 此处p的类型为Runner | Student,因此只能访问共有属性/方法
  console.log(p.name); // name是共有的属性
  // 通过自定义类型保护,可以使p的类型更加明确,并且具备相应的代码提示和检测
  if(isRunner(p)){
    // isRunner判断为true,则在此if作用域中,p为Runner类型
    p.run();
  }else{
    // p要么是Runner,要么是Student,因此else以后只能是Student
    p.study();
  }
}


// 结合typeof进行基础类型保护
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

// 同理可以结合instanceof 进行类的类型保护, 这里就不演示了
```
