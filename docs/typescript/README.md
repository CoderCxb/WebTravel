# Typescript 学习

## what
Typescript,简称TS,是Javascript的超集,包含JS的最新特性,以及额外提供了静态类型系统以及如枚举、装饰器等特性。

## why
JS是弱类型、动态语言,在开发阶段能够发现的主要是语法错误,而类型错误在运行时才能发现,而TS提供了静态编译时的类型检测,使得开发阶段就能够发现类型错误,大大提高了开发的效率。

## how

###### 安装
```
npm install typescript -g
```

###### 运行方式一
ts文件无法直接运行,可以先编译成js文件,在执行编译后的js文件。
```Shell
tsc fileName.ts
```

###### 运行方式二
安装ts-node, 这个库能够帮助我们运行ts文件。
```Shell
# 安装ts-node
npm i ts-node -g

# 使用ts-node运行ts文件
ts-node fileName.ts
```


## 优质文章
 - [一文读懂 TypeScript 泛型及应用](https://juejin.cn/post/6844904184894980104)
 - [一份不可多得的 TS 学习指南](https://juejin.cn/post/6872111128135073806)
 - [了不起的 TypeScript 入门教程](https://juejin.cn/post/6844904182843965453)
 - [深入理解 TypeScript](https://jkchao.github.io/typescript-book-chinese/)
 - [TypeScript 高级用法](https://juejin.cn/post/6926794697553739784)
 - [TypeScript 入门教程](https://ts.xcatliu.com/)
 - [慕课 - TypeScript 入门教程](https://www.wenjiangs.com/docs/typescript-introduction-2)
 - [22个示例深入讲解Ts最晦涩难懂的高级类型工具](https://juejin.cn/post/6994102811218673700)
 - [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
