# Array - 数组
数组是JS中最常用的类型之一,用于有序的存储数据,数组中存储的数据类型可以是任意类型,并且不需要是相同类型,数组的大小会根据数据的增删而改变。数组本质上也是对象,数组上的数字字符串的属性又称为索引/下标/index等,索引从0开始。


## 创建数组
Javascript中创建数组的方式有构造函数、数组字面量、Array.from和Array.of,实际开发中常见和推荐的写法是数组字面量的形式,构造函数作为了解即可,这里演示构造函数和数组字面量,Array.from和Array.of在静态方法中演示。
###### 数组字面量
数组字面量通过[]创建数组并且不会调用Array构造函数,长度由 [] 中的元素决定。
```javascript
const arr = [];

const chars = ['A','B','C'];

const mix = [1024,'hello world'];

// 可以通过扩展运算符快速创建一个由可迭代对象转换而来的数组,如数组、Set、Map、String
const copyFromChars = [...chars];
const copyFromStr = [...'ABC'];
```

###### 构造函数
通过Array构造函数创建数组,new可以省略(不建议),开发中并不是很常见,但是还是要了解一下。
```javascript
// 1. 不传递参数
console.log(new Array()); // []

// 2. 传递一个number类型参数(必须是number类型,不会进行类型转换),此时的参数为数组长度
const emptyItemsArr = new Array(2);
console.log(emptyItemsArr); // [ <2 empty items> ], 长度为2,每一项都是空位(hole),空位和undefined是不一样的

// 3. 传递一个非number参数,作为元素添加到数组
console.log(new Array('1024')); // [ '1024' ]

// 4. 传递超过一个参数,作为元素添加到数组
console.log(new Array(1024,'hello world')); // [ 1024, 'hello world' ]
```

## 索引
数组是有序集合,数组中的数字字符串的属性又称为索引,可用于访问指定位置的元素,索引从0开始,因此数组索引的范围是[0,length-1]。
```javascript
const arr = [1,2,3];
console.log(arr[0]); // 1
console.log(arr[1]); // 2
console.log(arr[2]); // 3
console.log(arr[3]); // undefined, 超出范围返回undefined

// 设置索引值
arr[0] = 1024;
console.log(arr[0]); // 1024

// 如果设置的索引值超出数组长度,除了赋值以外,还会进行填充空位
arr[5] = 6;
// 可以看出,数组原本长度为3,填充之后长度为6,索引值4、5被空位填充
console.log(arr.length); // 6
console.log(arr); // [ 1024, 2, 3, <2 empty items>, 6 ]

// 无效的索引会被当成普通属性处理,此时就不是数组索引,而是对象的键(key)
arr[-1] = -1;
console.log(arr); // [ 1024, 2, 3, <2 empty items>, 6, '-1': -1 ], 属性'-1'对应的值-1
```


## 解构赋值
数组的解构赋值是根据索引来解构,也可以说是按序解构。
```javascript
const colors = ['yellow','red','blue']
// 可以使用空位跳过不需要的元素，此处red就被跳过了
const [ y , , b ] = colors;
console.log(y); // yellow
console.log(b); // blue
```
#### 默认值
```javascript
// 当解构出来的元素是undefined时(只有undefined,null不会使用默认值),会使用默认值
const colors = ['yellow',undefined];
// 其中r是因为元素本身就是undefined,而b是因为colors长度只有2,而b是要解构第三个元素,所以没有解构到元素,也是undefined
const [y,r = 'red',b = 'blue'] = colors;
console.log(y); // yellow
console.log(r); // red
console.log(b); // blue
```

#### 剩余元素
数组中支持使用...来获取剩余的所有元素。
```javascript
const chars = [ 'A', 'B', 'C', 'D', 'E'];
// 前两个元素解构了以后,使用...将剩余的所有元素放在了rest中
const [ a, b, ...rest ] = chars;
console.log(a); // A
console.log(b); // B
console.log(rest); // [ 'C', 'D', 'E' ]
```

#### 嵌套数组解构
不需要在意数组是什么结构的,只要你解构时的结构和数组的结构一致,就可以解构出想要的元素。
```javascript
const nums = [[1,2,3],[4,5,6]];
// 解构出数组中第一个数组的第二个元素
const [[,two],[,,six]] = nums;
console.log(two); // 2
console.log(six); // 6
```

## 循环遍历
```javascript
const nums = [1,2,3];

// 最最基本的for循环 - 根据索引访问
for (let index = 0; index < nums.length; index++) {
  console.log(nums[index]); // 分别打印 1、2、3
}

// for..of循环,只能拿到数组的值,无法拿到索引
for (const num of nums) {
  console.log(num); // 分别打印 1、2、3
}

// 数组本质上也是对象,所以也可以用for..in(适用于普通对象,而不是数组)
// 但是正常不会这样用,因为for..in不仅会获取索引对应的值,还会获取非索引的值
for (const key in nums) {
  // 不仅打印了nums索引对应的值,还把数组上的其他属性给打印出来了
  console.log(nums[key]); // 分别打印 1、2、3、nums
}
```

## 多维数组
多维数组,就可以叫做数组嵌套,说白了就是数组里面还是数组
```javascript 
const arr_2d = [ [1, 2, 3], [4 ,5 ,6] ];

// 获取二维数组的元素,先获取内层的数组,然后再获取该数组上的元素
console.log(arr_2d[0][1]); // 2

// 循环遍历,二维数组嵌套2层,那遍历也需要两个循环
// 遍历外层数组
for (const arr of arr_2d) {
  // arr为内层数组
  // 遍历内层数组
  for (const num of arr) {
    // num为内层数组的元素
    console.log(num); // 分别打印 1、2、3、4、5、6
  }
}

```

## 数组空位
数组空位和undefined并不是一个概念,ES6前的方法会忽略空位,而ES6新增方法会将空位当成存在的元素,值为undefined。

###### 创建空位
```javascript
// 1. 使用逗号创建空位
const holes = [,,,,,];
console.log(holes); // [ <5 empty items> ]

// 2. 通过构造函数设置长度
const holes2 = new Array(5);
console.log(holes2); // [ <5 empty items> ]

// 3. 直接设置长度创建空位
const holes3 = [];
holes3.length = 5;
```

###### 空位处理
运算符和数组方法对于空位的处理非常不统一,因此在开发中尽量避免出现空位。
```javascript
const holes = [,,,];

// 1. in运算符忽略空位
console.log(0 in holes); // false

// 2. forEach、filter、indexOf、lastIndexOf、reduce、reduceRight、every和some忽略空位
console.log(holes.indexOf(undefined));  // -1
holes.forEach(()=>{console.log('forEach');}) // 什么也不打印

// 3. join和toString会将空位当成undefined处理，而undefined会被转换成''
console.log(holes.join('-')); // --

// 4. for..of会遍历空位
for (const hole of holes) {
  console.log(hole); // undefined,打印3次
}

// 5. entries、keys、values、includes、find和findIndex将空位看成undefined
console.log(holes.includes(undefined)); // true
console.log(holes.findIndex(v=>v===undefined)); // 0
```

## length
length属性表示数组中的元素个数。

###### 范围
length取值范围从0到2**32-1,不在范围内则会异常。
```javascript
const arr = [];
arr.length = -1; // RangeError: Invalid array length - 范围异常: 无效数组长度
arr.length = 2 ** 32; // RangeError: Invalid array length - 范围异常: 无效数组长度
```

###### length的属性描述
length是一个可写入、不可枚举、不可配置的属性,即可以修改、无法枚举、也无法重新配置属性描述,而设置length会改变数组长度。
```javascript
const nums = [1,2,3,4];

// 当设置的length小于数组原本length时,会进行截断
nums.length = 3;
console.log(nums); // [ 1, 2, 3 ], 超出部分被截断了

// 当设置的length大于数组原本的length时,会进行填充,填充空位
nums.length = 5;
console.log(nums); // [ 1, 2, 3, <2 empty items> ]
```

## 实例方法

数组提供的方法非常多,不需要全部详细的掌握, 熟悉常见方法的主要使用方式即可。
### 栈方法
**栈:** 是一种后进先出的线性数据数据,JS中默认没有,数组提供了方法(pop、push)模拟栈的行为。
###### push
push方法将一个或多个元素按序添加到数组的末尾，并返回该数组的新长度, push会改变原数组。
```javascript
const arr = ['A','B','C'];
// push可以接收多个参数,并且按序的添加到数组末尾
console.log(arr.push('D','E','F')); // 6
console.log(arr.length); // 6
console.log(arr); // [ 'A', 'B', 'C', 'D', 'E', 'F' ]
```

###### pop 
pop()方法从数组中删除最后一个元素，并返回该元素的值,数组为空则返回undefined,pop会改变原数组。
```javascript
const arr = ['A','B','C'];
console.log(arr.pop());  // C
console.log(arr.length); // 2
console.log(arr); // [ 'A', 'B' ]
```
###### 简单算法题
有效的括号(难度简单,助于理解),使用到了栈,如果单纯看文字不好理解,可以看一下官方视频解析[Leetcode - 有效的括号](https://leetcode-cn.com/problems/valid-parentheses/solution/you-xiao-de-gua-hao-by-leetcode-solution/)。
```javascript
// 有效的括号
// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。

// 示例 1：
// 输入：s = "()"
// 输出：true

// 思路: 将()、[]、{}做成对象映射 这样可以根据左括号找到右括号,然后使用一个数组作为栈，当遇到左括号时 将其推入，遇到右括号时 判断数组最后一个元素是否是其左括号 如果是 则将该左括号移除，如果字符串有效，则所有左括号会被移除 数组长度为0

/**
 *
 * @param {string} s 括号字符串
 * @return {boolean} 括号字符串是否有效
 */
 var isValid = function (s) {
	// 1. 长度非偶直接false
	if (s.length % 2 === 1) return false;
	// 括号对象 将起始括号和结束括号对应起来
	let closeChar = {
		'[': ']',
		'{': '}',
		'(': ')',
	};
	// 2. s对应的数组,用来模拟栈
	let sArr = [];
	// 3. 遍历字符串
	for (let index = 0; index < s.length; index++) {
	// 4. 如果数组的最后一个元素和遍历到的s的字符是闭合关系,如()、[], 则移除数组的最后一个元素
		if (closeChar[sArr[sArr.length - 1]] === s[index]) {
			sArr.pop();
		} else {
	// 5. 否则 将这个字符添加到数组
			sArr.push(s[index]);
		}
	}
	// 6. 若sArr为空 则说明括号闭合都是有效的
	return sArr.length === 0;
};

console.log(isValid('[()][]()')); // true 
console.log(isValid('()[]{]'));  // false
```

### 队列方法
**队列:** 是一种先进先出的线性数据结构,JS中默认没有,数组提供了方法(shift、push)模拟栈的行为,反向队列可以通过(unshift、pop)模拟。

###### shift
shift()方法从数组中删除第一个元素,并返回该元素的值,数组为空则返回undefined,shift会改变原数组。
```javascript
const arr = ['A','B','C'];
console.log(arr.shift()); // 'A'
console.log(arr.length);  // 2
console.log(arr); // [ 'B', 'C' ]
```

###### unshift
unshift()方法将一个或多个元素添加到数组的开头，并返回该数组的长度，unshift会改变原数组。
```javascript
const arr = ['D','E','F'];
console.log(arr.unshift('A','B','C')); // 6
console.log(arr.length); // 6
console.log(arr); //  [ 'A', 'B', 'C', 'D', 'E', 'F' ]
```

###### 简单算法题
和为s的连续正数序列(难度简单,助于理解),使用队列,思想和滑动窗口类似,滑动窗口通过索引存储区间,而队列是直接存储,所以占用空间会更大点(当前使用队列做是为了帮助理解队列)。
```javascript
// 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。
// 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

// 示例 1：

// 输入：target = 9
// 输出：[[2,3,4],[4,5]]
// 示例 2：

// 输入：target = 15
// 输出：[[1,2,3,4,5],[4,5,6],[7,8]]

// 流程: 拿target=15举例,
// 开始 sum = 0 小于15,所以+1、+2、+3、+4、+5(直到sum>=target),此时sum刚好等于15,然后[1,2,3,4,5]加入result数组,
// 然后 sum = 15 + 6 大于15,这是要将队列的头部推出(直到sum<=target), -1、-2、-3,此时sum又刚好等于15, 然后 [4,5,6] 加入result数组,
// 然后 sum = 15 + 7 大于15,这是要将队列的头部推出(直到sum<=target), -4,-5, 此时sum = 13 小于15
// 然后 sum = 13 + 8 大于15,这是要将队列的头部推出(直到sum<=target), -6, 此时 sum = 15,然后将 [7,8] 加入result数组
/**
 * @param {number} target
 * @return {number[][]}
 */
var findContinuousSequence = function (target) {
  // 1. 返回的结果数组
  const result = [];
  // 2. 队列
  const queue = [];
  // 3. 当前的和
  let sum = 0;
  // 4.循环遍历,只有两个数,从1开始,所以不包含target本身
  for (let index = 1; index < target; index++) {
    // 5. 不断累加和
    sum += index;
    // 6. 将index添加到队列
    queue.push(index);
    // 7. 只要和大于target时,就要将队列头部推出队列(因为index单调递增,队列也是单调递增的,队头肯定是最小的)并且sum要减去队头的值,直到和(sum)<=target
    while (sum > target) {
      sum -= queue.shift();
    }
    // 8. 当sum等于target时,说明当前队列满足条件
    if (sum === target) {
      // 9. 由队列创建新的数组添加到result中,为什么是新数组? 因为是数组引用数据类型,如果不是新数组,那么后面队列的改动也会影响到已经添加到result的队列
      result.push([...queue]);
    }
  }
  // 10. 返回result
  return result;
};

console.log(findContinuousSequence(10)); // [ [ 1, 2, 3, 4 ] ]
console.log(findContinuousSequence(15)); // [ [ 1, 2, 3, 4, 5 ], [ 4, 5, 6 ], [ 7, 8 ] ]


```


### 排序方法
###### sort
sort()方法对数组进行排序(默认升序,可传入函数改变),是比较转换成字符串后的UTF16编码,因此使用sort时,需要考虑数组中的元素转换成字符串是什么,sort方法会改变原数组。
```javascript
// 1. 不使用参数 默认直接升序排列
const arr = [ 3, 2, 1, '3', '2', '1', 10 ];
arr.sort();
console.log(arr); // [ 1, '1', 10, 2, '2', 3, '3' ], 并不是比较数字的大小,而是根据转换的字符串比较

// 2. 传入函数控制
const students = [
  { name: '小明', source: 100 },
  { name: '小红', source: 90 },
  { name: '小绿', source: 80 }
];
//
// students.sort(); // 默认无法修改对象数组的排序,因为对象转换成字符串都是[object Object],所以还是按原本的顺序
students.sort((nextE,preE)=>{
  // nextE是下一个元素,preE是上一个元素
  // 即 第一次进入,nextE是小红,preE是小明
  // 返回值小于0, 则互换位置,即nextE排到preE前
  if(preE.source > nextE.source) {
    return -1
  }
  // 返回值等于0,则保持原本的位置不变
  else if(preE.source === nextE.source) return 0;
  // 返回值大于0,则 preE排在nextE前
  else return 1;

  // 其实就相当于
  // return nextE.source - preE.source;
})
console.log(students);

// 3. 使用sort反转数组
const upArr = [1,2,3,4,5];
upArr.sort(()=>-1);
console.log(upArr); // [ 5, 4, 3, 2, 1 ]
```


##### reverse
reverse()方法将数组的元素位置颠倒,即反转,返回值为该数组,reverse方法会改变原数组。
```javascript
const arr = ['A', 'B', 'C', 'D'];
console.log(arr.reverse()); // [ 'D', 'C', 'B', 'A' ]
console.log(arr); // [ 'D', 'C', 'B', 'A' ]
```
### 操作方法

##### concat
concat()方法用于合并两个或多个数组,也可以接收元素,返回新的数组(浅拷贝),不改变原数组。
```javascript
// 1. 可以同时接收元素和数组,数组会被展开,元素直接添加
const nums = []; 
const newNums = nums.concat(1,2,[3,4,5])
console.log(newNums); // [ 1, 2, 3, 4, 5 ]

// 2. 正常展开合并数组
const arr = [1,2,3];
let result = arr.concat([4,5],[6,7]); // [4,5]、[6,7]会被展开添加到arr,然后返回新数组
console.log(arr);  // [ 1, 2, 3 ], 原数组没有发生改变
console.log(result);  // [ 1, 2, 3, 4, 5, 6, 7 ]

// 3. 无法展开的数组, Symbol章提过Symbol.isConcatSpreadable,控制数组是否可以展开
const lockArr = [8,9];
lockArr[Symbol.isConcatSpreadable] = false;

result = result.concat(lockArr); 
// 此处将数组设置为无法展开,concat就会将整个数组当作一个元素进行合并
console.log(result); // // [ 1, 2, 3, 4, 5, 6, 7, [ 8, 9, [Symbol(Symbol.isConcatSpreadable)]: false ] ]

// 4. 二维数组(嵌套数组)的合并
// concat只会对第一层的数组进行展开,二维数组内层的数组不会进行展开
let concat2DArr = [ 1, 2, 3 ];
const arr_2d = [ [4,5,6], [7,8,9] ];
// [4,5,6], [7,8,9]还是以整个数组的形式进行合并,没有展开
console.log(concat2DArr.concat(arr_2d)); // [ 1, 2, 3, [ 4, 5, 6 ], [ 7, 8, 9 ] ]
```

##### slice
slice()方法通过索引(begin和end)进行浅拷贝返回一个新的数组,slice不改变原数组。
###### 参数列表 slice([begin[, end]])
 - begin
   - 详情: 浅拷贝的起始索引
   - 必填: false
   - 取值
     - \[0,length-1]: 从索引begin开始浅拷贝数组
     - 大于length-1: 起始位置超过索引范围,返回空数组
     - 负数: 从原数组倒数第几个元素开始浅拷贝(反向)。
 - end
   - 详情: 浅拷贝到结束索引前一个元素,[begin,end),即索引为end的元素不被拷贝
   - 必填: false
   - 取值: 
     - \[0,length-1]: 拷贝到索引end结束
     - 超过索引范围或不指定:  拷贝到底
     - 负数: 拷贝原数组倒数第几个元素结束浅拷贝。
```javascript
const arr = [1,2,3,4,5];

// 不指定end默认拷贝到结束
// 1. 不传递begin,浅拷贝整个数组
console.log(arr.slice()); // [ 1, 2, 3, 4, 5 ]

// 2. begin为正数并且取值在索引范围内,从索引begin拷贝到结束
console.log(arr.slice(2));  // [ 3, 4, 5 ]

// 3. 超过索引范围,返回空数组
console.log(arr.slice(6)); // []

// 4. 从倒数第二个元素开始拷贝
console.log(arr.slice(-2)); // [ 4, 5 ]

// 注意: 索引end所在的元素不会被拷贝 [begin,end),end不包含
// 5. begin大于或等于end时,浅拷贝不到元素,返回空数组
console.log(arr.slice(2,2)); // []

// 6. 索引为2到倒数第一个元素(不包含)
console.log(arr.slice(2,-1)); // [ 3, 4 ]

// 7. 索引end超出范围则拷贝到底
console.log(arr.slice(2,10)); // [ 3, 4, 5 ]
```

##### splice 
splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容,splice会改变原数组。
###### array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
 - start  
   - 详情: 指定开始修改的索引位置
   - 必填: true
   - 取值
     - 超出长度,表示数组末尾
     - 负数,表示从末尾开始数,如果超出索引,则表示数组开头
 - deleteCount
   - 详情: 删除元素个数
   - 必填:false
   - 取值
     - 大于等于后面元素数或者不指定,删除start后的所有元素
     - 0或者负数则不删除元素
 - ...items
   - 详情: 要添加到数组的新元素
   - 必填: false

```javascript
// 删除元素
// 从索引为0删除1个元素
console.log(arr.splice(0,1)); // [ 'A' ]
console.log(arr);  // [ 'B', 'C', 'D' ]

// 替换元素,其实就是删除的元素和添加的元素个数一致,看上去就是替换了
// 从索引为0删除2个元素,并添加2个元素 'X'、'Y'
console.log(arr.splice(0,2,'X','Y')); // [ 'B', 'C' ]
console.log(arr); // [ 'X', 'Y', 'D' ]

// 添加元素
// 在索引为2的位置删除0个元素,添加2个元素
console.log(arr.splice(2,0,'A','B')); // [], 单纯的新增,不修改原数组内容,返回空数组
console.log(arr); // [ 'X', 'Y', 'A', 'B', 'D' ]

// 其实只提供了删除和添加两个功能,当删除元素和添加元素的个数一样的时候,看上去就变成了替换
// 删除和添加的元素不需要一致,根据需求来操作(可能你就是需要删除2个元素然后添加一个元素)
```

##### flat
flat() 方法会按照一个可指定的深度(默认为1)递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回,flat不改变原数组。
```javascript
// 当前数组中深度为3
const arr = [ [1, 2, 3], [ 4 ,5 , [ 6, [ 7 ] ] ] ];

// 深度为0,完全不展开
console.log(arr.flat(0)); // [ [1, 2, 3], [ 4 ,5 , [ 6, [ 7 ] ] ] ]
// 深度为1,展开第一层的数组,不传深度默认就是1
console.log(arr.flat(1)); // [ 1, 2, 3, 4, 5, [ 6, [ 7 ] ] ]
// 深度为2,展开第二层的数组
console.log(arr.flat(2)); // [ 1, 2, 3, 4, 5, 6, [ 7 ] ]
// 深度为3,展开第三层的数组
console.log(arr.flat(3)); // [ 1, 2, 3, 4, 5, 6, 7 ]
```

#### fill
fill()方法用固定值填充数组起始索引到终止索引的全部元素,不包含中终止索引。
```javascript
const nums = [ 1, 2, 3, 4, 5 ];

// 第一个参数是填充物,不传入索引表示填充整个数组
// 第二个参数是起始索引(默认从0)，第三个参数是终止索引(默认是length)
// 即只传递填充物,则填充整个数组
console.log(nums.fill(0)); // [ 0, 0, 0, 0, 0 ] 

// fill如果填充的范围不合法(反向、长度为0、超出数组的边界),则不填充
// 反向, 4->2
console.log(nums.fill(1024,4,2)); // [ 0, 0, 0, 0, 0 ]
// 长度为0
console.log(nums.fill(1024,2,2)); // [ 0, 0, 0, 0, 0 ]
// 超出数组边界
console.log(nums.fill(1024,10,20)); // [ 0, 0, 0, 0, 0 ]

// 只指定起始索引
console.log(nums.fill(8,3)); // [ 0, 0, 0, 8, 8 ]
// 指定起始索引和终止索引
console.log(nums.fill(9,1,3)); // [ 0, 9, 9, 8, 8 ]
```



### 搜索和位置方法
Javascript提供两类搜索数组的方法：按严格相等搜索和按断言函数搜索,无论是哪一种搜索的方法,都不会修改原数组。
##### 严格相等
严格相等函数包括:indexOf()、lastIndexOf()和includes(),根据接受的参数在数组中找到严格相等的元素,并返回结果。

includes和lastIndexOf方法使用的是类似===的全等判断逻辑,因此NaN一直都会返回-1,而includes采用的是类似Object.is的判断(NaN等于NaN)。
###### indexOf
indexOf()方法返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回-1。
```javascript
const colors = [ 'red', 'blue', 'yellow', 'blue', NaN];

// 从头开始找
console.log(colors.indexOf('blue'));   // 1

// 第二个参数指定搜索的起始位置,指定为2,跳过了第一个blue
console.log(colors.indexOf('blue',2)); // 3

// 元素不存在,返回-1 
console.log(colors.indexOf(NaN)); // -1, 判断逻辑类似于===,NaN不等于自身
console.log(colors.indexOf('black'));  // -1
```

###### lastIndexOf
lastIndexOf()方法返回在数组中可以反向(从尾到头)找到一个给定元素的第一个索引，如果不存在，则返回-1。
```javascript
const colors = [ 'red', 'blue', 'yellow', 'blue', NaN];

// 从尾开始找
console.log(colors.lastIndexOf('blue'));   // 3

// 第二个参数指定跳过最后几个元素,指定为2,跳过最后两个元素
console.log(colors.lastIndexOf('blue',2)); // 1

// 元素不存在,返回-1
console.log(colors.indexOf(NaN)); // -1, 判断逻辑类似于===,NaN不等于自身
console.log(colors.lastIndexOf('black'));  // -1
```

###### includes
includes()方法用来判断数组是否包含一个指定的值,如果包含则返回true,否则返回false。
```javascript
const nums = [NaN, 1, 2, 3];

// includes判断逻辑类似于Object.is,NaN也能找到。
console.log(nums.includes(NaN)); // true

// 第二个参数指定搜索的起始位置, 1被跳过了
console.log(nums.includes(1,2)); // false

// 找到元素,返回true
console.log(nums.includes(3)); // true
// 没有找到,返回false
console.log(nums.includes(0));
```

##### 断言函数
断言函数的方法通过传入函数的形式,可以自定义判断相等的逻辑,相较于严格相等的方法更加灵活,实际开发中根据需要进行选择,如果严格相等的方法无法满足,那可以考虑一下断言函数的方法。
###### find
find()方法返回数组中**第一个**执行传入函数结果为true的元素的值,否则返回undefined。
```javascript
const source = [60, 80, 90 ,75, 100];

// 第一个成绩达到90的
const firstGood = source.find((value,index,arr)=>{
  // 成绩大于90返回true
  return value >= 90;
});

console.log(firstGood); // 90,只返回第一个满足的元素

// 第一个成绩低于60的
const firstBad = source.find((value,index,arr)=>{
  // 成绩大于90返回true
  return value < 60;
});

console.log(firstBad); // undefined
```
###### findIndex
findIndex()方法返回数组中**第一个**执行传入函数结果为true的元素的索引,否则返回-1。
```javascript
const source = [60, 80, 90 ,75, 100];

// 第一个成绩达到90的
const firstGood = source.findIndex((value,index,arr)=>{
  // 成绩大于90返回true
  return value >= 90;
});

console.log(firstGood); // 2

// 第一个成绩低于60的
const firstBad = source.findIndex((value,index,arr)=>{
  // 成绩大于90返回true
  return value < 60;
});

console.log(firstBad); // -1
```

##### 对象数组
严格相等的方法对于对象的判断非常严格,必须是引用相同才被判定为同一个值,大概率是无法满足需求,此时可以使用断言函数的方法。
```javascript
// 学生信息
const students =  [
  { name: "Jack" },
  { name: 'Marco' },
  { name: "Mary" },
];

// 现在要找到name为Marco的学生(假设不重名)
// 此时用indexOf、lastIndexOf、includes无法满足我们的需求
// 因为这几个方法对于引用数据类型的判断局限性比较大

// 使用find/findIndex,可以自定义判断条件,至于使用哪个,看你是需要该元素还是索引
const marco = students.find((value)=>{
  return value.name === 'Marco';
})
console.log(marco); // { name: 'Marco' }
```


### 迭代方法

###### filter
filter()方法创建一个新数组,返回元素指定传入函数执行结果为true的元素的数组，filter意为过滤,常用于根据某些条件筛选数组元素,filter不影响原数组。 
```javascript
const arr = [ 1, 2, 3, 4, 5, 6 ];
// filter第一个参数接收函数,每个元素都会执行一次该函数,函数返回true,则该元素会被添加到新数组
// 第二个参数指定函数中的this对象
// 筛选出数组中的偶数
const even = arr.filter((value, index, array)=>{
  // value为元素,index为索引,array为当前数组
  // 偶数
  if(value % 2 === 0) {
    return true
  }
});
console.log(even); // [ 2, 4, 6 ]
```

###### map
map()方法创建一个新数组，其结果是该数组中的每个元素是调用一次提供的函数后的返回值,map不改变原数组。
```javascript
const arr = [ 10, 20, 30 ];
// map第一个参数接收函数,每个元素都会执行一次该函数,函数的返回结果会被添加到新数组
// 第二个参数指定函数中的this对象
// 将数组中的每一个元素乘2添加到新数组
const double = arr.map((value, index, array)=>{
  // value为元素,index为索引,array为当前数组
  // 元素都乘2
  return value * 2;
});

console.log(double); // [ 20, 40, 60 ]
```

###### every
every()方法接收一个函数,每一个元素都会执行该函数,如果所有执行结果都是true,则every方法返回true,every方法不改变原数组。
```javascript
// 成绩数组
const sources = [ 60, 70, 75, 80, 100, 99];
// 是否全部及格
const allPassed = sources.every((value, index, array)=>{
  // value为元素,index为索引,array为当前数组
  // 成绩大于等于60返回true
  return value >= 60;
});
console.log(allPassed); // true
```

###### some
some()方法接收一个函数,每一个元素都会执行该函数,如果所有执行结果中有一个是true,则some方法返回true,some方法不改变原数组。
```javascript
// 成绩数组
const sources = [ 60, 70, 75, 80, 100, 99];
// 是否存在满分💯
const hasFullMark = sources.some((value, index, array)=>{
  // value为元素,index为索引,array为当前数组
  // 成绩为100时返回true
  return value === 100;
});
console.log(hasFullMark); // true
```

###### forEach
forEach()方法接收一个函数,每一个元素都会执行该函数,返回值为undefined(无法链式调用),forEach不改变原数组。
**注意:** 除了抛出异常以外，没有办法中止或跳出 forEach() 循环。
```javascript
const nums = [ 1, 2, 3, 4];

for (let index = 0; index < nums.length; index++) {
  console.log(nums[index]); // 分别打印1、2、3、4
}

// 使用forEach替换for循环
nums.forEach((value,index,array)=>{
  // value为元素,index为索引,array为当前数组
  console.log(value); // 分别打印1、2、3、4
});
```

### 迭代器方法
ES6新增了3个迭代器方法: keys()、values()和entries(),可参考[迭代器 - Iterator](TODO)。
 - keys 返回数组索引的迭代器
 - values 返回数组元素的迭代器
 - entries 返回索引/值的迭代器

```javascript
const nums = [1,2,3,4];

// 索引迭代器
const keys = nums.keys();
console.log(keys); // Object [Array Iterator] {}
console.log([...keys]); // [ 0, 1, 2, 3 ]

// 值迭代器
const values = nums.values();
console.log(values); // Object [Array Iterator] {}
console.log([...values]); // [ 1, 2, 3, 4 ]

// 索引/值迭代器
const entries = nums.entries();
console.log(entries); // Object [Array Iterator] {}
console.log([...entries]); // [ [ 0, 1 ], [ 1, 2 ], [ 2, 3 ], [ 3, 4 ] ]
```

### 归并方法
归并方法有reduce和reduceRight,使用上是一致的,区别是reduce是从左往右遍历,而reduceRight是从右往左遍历,掌握了reduce,reduceRight也不再话下,此处仅详细介绍reduce。
#### reduce 
reduce()方法对数组中的每一个元素执行指定函数(升序执行),每次执行都能够获取前一次的返回值,最后一次执行结果将作为reduce方法的返回
值。
###### 参数列表 arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
 - callback 回调函数,接收以下四个参数
   - Accumulator (acc) (累计器): 存储函数执行的结果,每次函数执行都会将返回值赋值给acc,初始值受initialValue控制
   - Current Value (cur) (当前值): 索引对应的值,会被初始值(initialValue)影响
   - Current Index (index) (当前索引): 如果有初始值(initialValue),则索引从0开始,没有初始值,索引从1开始
   - Source Array (arr) (源数组)
 - initialValue
   - 详情: 累加器的初始值
   - 必填: false

###### 累计器
reduce方法最不好理解的就是这个累计器,累计器可以看成一个用来存储返回值的变量,后续的每次函数都能够获取到这个变量。
```javascript
const nums = [1,2,3,4,5,6,7,8];

// 计算累加
// 使用reduce方法实现
const sum = nums.reduce((acc,cur,index,arr) => {
  // 这一步看一看成 acc= acc + cur,这个结果的值会作为下一次函数执行的累计器(acc)
  return acc + cur;
});
console.log(sum); // 36

// reduce的大致流程
let acc; // 这个就是累计器, 初始值由initialValue决定
nums.forEach((cur,index,arr) => {
  // 当累计器没有初始值时,会将第一项的值赋值给累计器并且return
  if(acc === undefined) {
    acc = cur;
    return;
  }
  // 如果不提供initialValue,则第一次循环被跳过(索引0),因此索引从1开始
  // 如果提供了initialValue,则索引从0开始
  // 需要查看索引可以打开下一行的代码注释
  // console.log(cur,index); 
  // reduce中每次函数的return,都会将返回的结果赋值给累计器
  acc = acc + cur;
});
// 累计器的值就是最后一次赋值的结果
console.log(acc);
```


###### reduce应用
reduce既能够遍历数组,同时他的返回值也非常的灵活(通过传入的函数控制),因此reduce基本可以满足数组的大部分的需求(使用外部创建变量+遍历,也能够实现和reduce一样的效果),当然,别的数组方法更合适的话,没必要强行使用reduce增加工作量和增加理解成本。
```javascript
const nums = [1,2,3,4,5,6,7,8];

// 模拟filter, 筛选所有偶数
const even = nums.reduce((acc,cur,index,arr) => {
  if(cur % 2 === 0) acc.push(cur);
  return acc; 
},[]);
console.log(even); // [ 2, 4, 6, 8 ]

// 模拟map,将刚刚得到的偶数数组翻倍
const evenDouble = even.reduce((acc,cur,index,arr) => {
  acc.push(cur * 2)
  return acc;
},[]);
console.log(evenDouble); // [ 4, 8, 12, 16 ]

// 计算一组学生获取的stars总数
const students = [
  { name: '小明', stars: 1000 },
  { name: '小红', stars: 500 },
  { name: '小绿', stars: 100 }
];

// 不使用reduce的话,就需要在外部定义一个变量用来存储stars的总数
let starsCount1 = 0;
for (const student of students) {
  starsCount1 += student.stars;
}
console.log(starsCount1); // 1600

// 使用reduce,内部通过acc来存储stars总数,就不需要额外创建变量,而且写法也更加简洁
const starsCount2 = students.reduce((acc,cur,index)=>acc + cur.stars,0);
console.log(starsCount2);
```
#### reduceRight
同reduce,遍历方向相反。

### 转换方法
#### toString
Array的toString()方法重写了Object的toString方法,返回一个字符串,该字符串由数组的每一项通过逗号(,)拼接,当数组被转换成字符串时调用toString方法。
```javascript
const arr = [ 'A', 'B'];
// 1. 当数组和字符串拼接或者使用String转换成字符串时,会调用toString方法
console.log('' + arr); // A,B
console.log(String(arr)); // A,B

// 2. null和undefined在数组转换成字符串时会被转换成''
console.log(String([])); // '', 空字符串
console.log(String([null])); // '', 空字符串
console.log(String([undefined])); // '', 空字符串

// 3. 单个元素就不需要逗号(,)拼接了
console.log(String([1024])); // '1024'
console.log(String([{}]));   // [object Object]

// 4. 多个元素,使用逗号(,)拼接
console.log(String([1024,true])); // 1024,true
console.log(String([1024,{}])); // 1024,[object Object]
```

## 静态方法
### Array.isArray
Array.isArray(value)方法用于判断传递的值是否是数组(推荐使用),是则返回true,否则false
```javascript
console.log(Array.isArray([]));    // true
console.log(Array.isArray({}));    // false
console.log(Array.isArray(1024));  // false
console.log(Array.isArray(null));  // false
console.log(Array.isArray(true));  // false

// Polyfill - 当Array.isArray方法不存在时,可以通过以下代码创建
if (!Array.isArray) {
  Array.isArray = function(value) {
    return Object.prototype.toString.call(value) === '[object Array]';
  };
}
```
### Array.from
Array.from方法通过类数组或可迭代对象创建一个新的、浅拷贝的数组。
###### 参数列表: Array.from(arrayLike[, mapFn[, thisArg]])
 - arrayLike
   - 详情: 要转换成数组的类数组或可迭代对象 - 不能传递null和undefined
   - 必填: true
 - mapFn
   - 详情: 新数组的每个元素都会执行回调函数,返回值会作为新数组的元素(极少用,可以了解)
   - 必填: false
 - thisArg
   - 详情: 指定mapFn中的this(极少用,可以了解)
   - 必填: false


###### 基本使用
Array.from 在开发中主要用法仅仅只是将类数组和可迭代对象转换成数组,至于转换后需要做什么,不使用mapFn也能做到。
```javascript
// 1. string 转 数组, string是可迭代对象
console.log(Array.from('ABC')); // [ 'A', 'B', 'C' ]

// 2. Set 转 数组, Set是可迭代对象
const s = new Set();
s.add(1).add(2).add(3);
console.log(Array.from(s)); // [ 1, 2, 3 ]

// 3. Map 转 数组, Map是可迭代对象
const m = new Map();
m.set('name','You don\'t know JS').set('color', 'yellow');
console.log(Array.from(m)); // [ [ 'name', "You don't know JS" ], [ 'color', 'yellow' ] ]

// 4. 类数组 转 数组
const likeArray = { 0:0, 1:1, 2:2, length:3 };
console.log(Array.from(likeArray)); // [ 0, 1, 2 ]
```

###### mapFn和thisArg
mapFn和thisArg提供了将类数组和可迭代对象转换成数组后的额外操作,但是mapFn和thisArg参数实际开发使用频率低,了解即可。
```javascript
// 这是一个奇数的Set
const oddSet = new Set([1,3,5])

// 现在要将它转换成偶数数组
const oddArr = [...oddSet]; // 中间数组,如果不需要可以直接 [...oddSet].map,这样就不会产生中间数组了
const evenArr1 = oddArr.map((value,index,array)=>{
  // map方法的回调函数可以获取到value,index和array(数组本身)
  return value * 2;
})
console.log(evenArr1); // [ 2, 6, 10 ]

// mapFn不会有中间数组,即Array.from
const evenArr2 = Array.from(oddSet,(value,key)=>{
  // mapFn无法获取到类数组/可迭代对象本身
  // 此处(mapFn中)的this有thisArg指定
  return value * 2;
},/** 指定mapFn的this */{ type: 'this' });
console.log(evenArr2); // [ 2, 6, 10 ]

// 首先map可以产生一个中间的数组,而mapFn不能
// 其次map可以获取到数组本身,而mapFn获取不到类数组/可迭代对象本身
// 结论: 一般使用Array.from大多数时候仅仅是用来将类数组/可迭代对象本身转换成数组,并不会使用它的mapFn(不排除你要求特殊)
```

### Array.of
Array.of方法根据传入的参数创建新的数组实例,传入的参数只会是元素,不会是长度(区别与Array构造函数)。

###### 基本使用
```javascript
// 无论几个参数,无论是否是number,都是作为元素按序添加到新创建的数组中
console.log(Array.of(2));      // [ 2 ]
console.log(Array.of(1,2,3));  // [ 1, 2, 3 ]

// Polyfill - 当Array.of方法不存在时,可以通过以下代码创建
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

## 判断数组
判断数组主要有以下4种方式,如果只是判断数组,推荐使用Array.isArray。
```javascript
const arr = [];
const obj = {};

// 1. 使用Array.isArray判断(推荐)
console.log(Array.isArray(arr)); // true
console.log(Array.isArray(obj)); // false

// 2. 通过instanceof
console.log(arr instanceof Array); // true
console.log(obj instanceof Array); // false

// 3. 通过Object.prototype.toString
console.log(Object.prototype.toString.call(arr) === '[object Array]'); // true
console.log(Object.prototype.toString.call(obj) === '[object Array]'); // false

// 4. Array.prototype.isPrototypeOf和instanceof类似,都是通过原型链判断
console.log(Array.prototype.isPrototypeOf(arr)); //  true
console.log(Array.prototype.isPrototypeOf(obj)); // false
```

## 其他
###### 去重
```javascript
// 使用Set先去重,在将Set转换成数组即可
const arr = [1,1,2,3,4,5,5,6];
console.log([...new Set(arr)]); // [ 1, 2, 3, 4, 5, 6 ]
```

## 参考
 - [阮一峰ES6入门 - 数组空位](https://es6.ruanyifeng.com/?search=%E6%89%A9%E5%B1%95%E8%BF%90%E7%AE%97%E7%AC%A6&x=0&y=0#docs/array#%E6%95%B0%E7%BB%84%E7%9A%84%E7%A9%BA%E4%BD%8D)
 - [掘金 - 25个你不得不知道的数组reduce高级用法](https://juejin.cn/post/6844904063729926152)