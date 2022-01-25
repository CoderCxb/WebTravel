// 测试文件 用于测试TS代码

interface Person {
  type: string;
}

declare let Person: Function;

Person = function(){
  return 'use as value'
}

// 作为类型使用
let p:Person = {
  type: 'person'
}

// 作为值使用
console.log(Person()); // use as value
