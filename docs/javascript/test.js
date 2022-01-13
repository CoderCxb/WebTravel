// 测试文件 用于测试JS代码

const student = {
  name: 'Jack',
  study(){
    console.log(this.name);
    console.log(student.name);
  }
};

student.study()