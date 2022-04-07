# 小技巧

### TS与JSDoc
JSDoc不仅可以在JS中使用,它同样可以在TS中使用,如函数、接口等增加JSDoc的注释,在使用时hover可以获取注释内容作为提示信息,接下去以interface举例。
```typescript
/** 书籍接口 */
interface Book {
  /** 书本名称 */
  title: string;
}

let book: Book = {
  title: 'YDKJS'
};
```
当使用Book时,鼠标悬停(hover)查看Book

<img src='/WebTravel/images/jsdoc_3.png'>

当鼠标悬停查看Book的title属性时


<img src='/WebTravel/images/jsdoc_4.png'>

### readonly修饰符
readonly可以用来修饰数组和元组类型, 但是需要注意一下写法

```typescript
// 以数组泛型的形式无法使用readonly
type NArray = readonly Array<number>; // 报错: 仅允许对数组和元组文本类型使用 "readonly" 类型修饰符

// 而type[]的形式是可以使用readonly的
type SArray = readonly string[]; // OK
```