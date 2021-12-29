# Math - 数学
Math是Javascript提供的一系列存储数学方法、常数属性的对象,仅支持number.不支持BigInt,Math计算会比手写Javascript代码性能更好。

## 数学常数属性
挂载在Math对象上的静态数学,
```javascript
console.log('自然对数的底数:', Math.E);
console.log('2的自然对数:', Math.LN2);
console.log('10的自然对数:',Math.LN10);
console.log('以2为底的e的对数:', Math.LOG2E);
console.log('以10为底的e的对数:', Math.LOG10E);
console.log('π,圆周率:', Math.PI);
console.log('√1/2, 根号二分之一:', Math.SQRT1_2);
console.log('√2, 根号二:', Math.SQRT2);
```

## 数学方法
列举使用频率较高的数学方法,还有一些类似三角函数这种的特定场景使用的并没有列举,可以参考[MDN - Math](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math)
###### Math.random()
Math.random()返回一个[0,1)之间的伪随机数,即大于等于0,小于1。
```javascript
console.log(Math.random()); // 0～1之间的随机小数

// 返回[min,max)之间的随机数
function getRandomBetween(min,max){
  return min + Math.random() * (max - min);
}
console.log(getRandomBetween(10,20));

// 返回[min,max]之间的随机整数
function getRandomIntBetween(min,max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(min + Math.random() * (max - min + 1));
}
console.log(getRandomIntBetween(10.5,20.5));
```

###### Math.abs(x) 
Math.abs(x) 返回接收值的绝对值,如果不是数字,则会先转换成数字再取绝对值,NaN的绝对值还是NaN
```javascript
console.log(Math.abs());       // 不传的话就是undefined,undefined转成数字就是NaN
console.log(Math.abs(null));   // 0, null转换成数字是0
console.log(Math.abs(NaN));    // NaN
console.log(Math.abs(1024));   // 1024, 正数不受影响
console.log(Math.abs(-1024));  // 1024, 负数返回绝对值
```

###### Math.pow(base, exponent) 
Math.pow(base, exponent) 返回基(base)的指数(exponent)次幂。
```javascript
// 基数为正
console.log(Math.pow(2,0));    // 1
console.log(Math.pow(2,2));    // 4
console.log(Math.pow(2,-2));   // 0.25
console.log(Math.pow(4, 0.5)); // 2

// 基数为负数,则指数不能在(0,1)之间
// 如果指数在(0,1)之间,那么就会对基数取根号(数学知识)  
console.log(Math.pow(-4,1));    // -4
console.log(Math.pow(-4,0));    // 1
console.log(Math.pow(-4, 0.5)); // NaN

// 无论是基数还是指数,有一个是NaN或者会被转换成NaN,就返回NaN
console.log(Math.pow(1,NaN));
console.log(Math.pow(NaN,1));
console.log(Math.pow(NaN,NaN));
```

###### Math.sqrt(x) 
Math.cbrt(x)返回数字的平方根。
```javascript
// 平方根是整数
console.log(Math.sqrt(0));   // 0
console.log(Math.sqrt(4));   // 2

// 平方根不是整数
console.log(Math.sqrt(3));   // 1.7320508075688772

// 平方以后必定是正数,所以负数也是返回NaN
console.log(Math.sqrt(-4));  // NaN

// NaN和会被转换成NaN的值,返回NaN
console.log(Math.sqrt());    // NaN,不传相当于传入undefined
console.log(Math.sqrt('A')); // NaN
console.log(Math.sqrt(NaN)); // NaN
```

###### Math.cbrt(x)
Math.cbrt(x)返回数字的立方根。
```javascript
// 立方根是整数
console.log(Math.cbrt(0));   // 0
console.log(Math.cbrt(-8));  // -2
console.log(Math.cbrt(8));   // 2

// 立方根不是整数
console.log(Math.cbrt(3));   // 1.4422495703074083

// // NaN和会被转换成NaN的值,返回NaN
console.log(Math.cbrt());    // NaN,不传相当于传入undefined
console.log(Math.cbrt('A')); // NaN
console.log(Math.cbrt(NaN)); // NaN
```
###### Math.round(x)
Math.round(x)返回一个数字四舍五入后的整数,负数的小数部分需要大于0.5才会四舍五入。
```javascript
// 小数部分小于0.5时
console.log(Math.round(0.4));  // 0
console.log(Math.round(-0.4)); // -0

// 小数部分大于0.5时
console.log(Math.round(0.6));  // 1
console.log(Math.round(-0.6)); // -1

// 小数部分等于0.5时 
// 可以看出来,当负数的小数部分刚好是0.5时,并不会四舍五入,需要大于0.5
console.log(Math.round(0.5));   // 1
console.log(Math.round(-0.5));  // -0
console.log(Math.round(-10.5)); // -10

// NaN和会被转换成NaN的值,返回NaN
console.log(Math.round(NaN)); // NaN
```
###### Math.ceil(x)
Math.ceil(x) 向上取整。
```javascript
// 正数
console.log(Math.ceil(0.9)); // 1
console.log(Math.ceil(0.1)); // 1

// 负数
console.log(Math.ceil(-0.1)); // -0
console.log(Math.ceil(-0.9)); // -0

// NaN和会被转换成NaN的值,返回NaN
console.log(Math.ceil());     // NaN, 不传相当于undefined
console.log(Math.ceil(NaN));  // NaN
console.log(Math.ceil('A'));  // NaN
```

###### Math.floor(x)
Math.floor(x) 向下取整。
```javascript
// 正数
console.log(Math.floor(0.9)); // 0
console.log(Math.floor(0.1)); // 0

// 负数
console.log(Math.floor(-0.1)); // -1
console.log(Math.floor(-0.9)); // -1

// NaN和会被转换成NaN的值,返回NaN
console.log(Math.floor());     // NaN, 不传相当于undefined
console.log(Math.floor(NaN));  // NaN
console.log(Math.floor('A'));  // NaN
```



###### Math.max(value1[,value2, ...])
Math.max()返回接收的所有参数中的最大值。
```javascript
// 1. 不传参数
console.log(Math.max()); // -Infinity, 不传参数,返回负无穷大

// 2. 传入NaN或者会被转换成NaN的其他数据, 都会返回NaN
console.log(Math.max('A',1,2,3));  // NaN, 'A'会被转换成NaN
console.log(Math.max(NaN,1,2,3));  // NaN
console.log(Math.max(0,1,2,['3'])); // 3, 类型转换时说过,['3']会转换成3

// 3. 可以使用扩展运算符(...)或者 apply的方式传入数组
const arr = [1,2,3];
console.log(Math.max(...arr)); // 3 
console.log(Math.max.apply(null,arr)); // 3
```

###### Math.min(value1[,value2, ...])
Math.min()返回接收的所有参数中的最小值。
```javascript
// 1. 不传参数
console.log(Math.min()); // Infinity, 不传参数,返回无穷大

// 2. 传入NaN或者会被转换成NaN的其他数据, 都会返回NaN
console.log(Math.min('A',1,2,3));  // NaN, 'A'会被转换成NaN
console.log(Math.min(NaN,1,2,3));  // NaN
console.log(Math.min([''],1,2,3)); // 0, 类型转换时说过,['']会转换成0

// 3. 可以使用扩展运算符(...)或者 apply的方式传入数组
const arr = [1,2,3];
console.log(Math.min(...arr)); // 1
console.log(Math.min.apply(null,arr)); //1 
```



###### Math.trunc(x)
Math.trunc(x) 截取浮点数的整数部分,不兼容IE。
```javascript
// 不是向上/下取整,而是直接截取整数部分
console.log(Math.trunc(5.6));  // 5
console.log(Math.trunc(-5.6)); // -5

// 可以利用 Math.floor和Math.ceil模拟trunc
// 正数的时候向下取整,负数的时候向上取整,这样就可以获取整数部分了
function myTrunc(num){
  return num >= 0 ? Math.floor(num) : Math.ceil(num);
}

console.log(myTrunc(5.6));  // 5
console.log(myTrunc(-5.6)); // -5
```