# Date - 日期
Date对象表示从1970年1月1日（UTC）到某个时刻的时间,提供处理日期和时间的方法(本地时间和UTC时间)。

## 常见时间
一般在项目开发中主要使用的都是本地时间(计算机所在地的时间),对于我们来说就是北京时间。
###### UTC
UTC(Universal Time Coordinated) - 协调世界时、世界标准时间: 是以原子时秒长为基础，在时刻上尽量接近于世界时的一种时间计量系统。

###### ISO
ISO(International Organization for Standardization) - 国际标准组织: 以国际标准ISO 8601表示日期和时间

###### GMT
GMT(Greenwich Mean Time) - 格林尼治时间:格林尼治所在地的标准时间，也是表示地球自转速率的一种形式。
###### CST
CST(Chinese standard time) - 北京时间: 北京时间是中国采用国际时区东八时区的区时作为标准时间,中国全境（大陆、港澳、台湾）均采取北京时间（UTC+8),即北京时间比UTC晚8个小时。

## 构造函数
Date构造函数创建一个Date的实例对象,默认是UTC,UTC早于北京时间8小时。
```javascript
// 1. 不接收参数时, 创建现在时间的date对象
console.log(new Date()); // 2021-12-25T04:00:00.000Z

// 2. 传入时间戳(毫秒数),计算从1970年1月1日（UTC）以来的时间的毫秒数
console.log(new Date(1640404800000)); // 2021-12-25T04:00:00.000Z

// 3. 传入date对象
const date = new Date();
const copyDate = new Date(date);

// 4. 传入的能被Date.parse的字符串
console.log(new Date('December 25, 2021 12:00:00')); // 2021-12-25T04:00:00.000Z
console.log(new Date('2021-12-25T 12:00:00Z'));      // 2021-12-25T04:00:00.000Z
console.log(new Date('12/25/2021 12:00:00'));        // 2021-12-25T04:00:00.000Z

// 5. new Date(year,monthIndex,[,date,hours,minutes,seconds,milliseconds])
// 除了年、月是必填,其他的是可选
// 0到99会被映射至1900年至1999年
// 注意: 月份的范围是0～11,0是1月,11是12月
// date默认为1, hours、minutes、seconds、milliseconds 默认为0
console.log(new Date(2021,11)); // 2021-11-30T16:00:00.000Z
console.log(new Date(2021,11,25,12,00,00)); // 2021-12-25T04:00:00.000Z
```

## 静态方法
```javascript
// 1. 1970年1月1日（UTC）到当前时间的毫秒数,记住是毫秒数
console.log(Date.now()); // 1640455537359

// 2. Date.parse 解析一个表示某个日期的字符串(符合RFC2822/IETF语法),并返回从1970年1月1日（UTC）到该日期对象（该日期对象的UTC时间）的毫秒数
// 如果日期字符串无法解析, 则返回NaN
// 一般日期字符串都是通过生成的,可以直接使用

// ISO日期格式 - 具体时间可以没有,但是必须有日期
console.log(Date.parse('2021-12-25'));  // 1640390400000
console.log(Date.parse('2021-12-25T12:00:00'));  // 1640404800000

// RFC2822 / IETF 日期格式
console.log(Date.parse('Sat Dec 25 2021 12:00:00 GMT+0800'));    // 1640404800000
console.log(Date.parse('December 25, 2021 12:00:00'));           // 1640404800000

// 3. Date.UTC 获取从1970年1月1日（UTC）到指定时间(UTC时间)的毫秒数
const UTCChristmas = Date.UTC(2021,11,25); 
console.log(new Date(UTCChristmas).toLocaleString()); // 2021/12/25 上午8:00:00

// 记住,构造函数是获取 从1970年1月1日（UTC）到指定时间(本地时间)的毫秒数,对应的UTC时间还得往前8小时
const LocaleChristmas = new Date(2021,11,25).getTime();

console.log(new Date(LocaleChristmas).toLocaleString()); // 2021/12/25 上午12:00:00, 上午12:00表示的就是0点

// 解析: 使用构造函数创建的是本地时间的2021-12-25 00:00:00,对应的UTC时间得往前8小时,也就是 2021-12-24 16:00:00
//      而Date.UTC创建的是UTC时间的2021-12-25 00:00:00,对应的本地时间还得往后8小时,也就是2021-12-25 08:00:00
```

## 实例方法
###### 读取时间
实例上有获取时间具体信息的方法,可以获取本地时间,也可以获取UTC时间,以下展示本地时间的获取方式。
```javascript
const Christmas = new Date(2021,11,25,12,00,00);

// 1. getTime 返回从1970年1月1日0时0分0秒(UTC)到date实例时间的毫秒数
console.log('获取时间毫秒表示:',Christmas.getTime());            // 获取时间毫秒表示: 1640404800000

// 2. getFullYear获取当前时间年份
console.log('获取本地时间年份:',Christmas.getFullYear());        // 获取年份: 2021 

// 3. getMonth获取当前时间月份(0～11,0表示1月,11表示12月,为了正常显示,要+1)
console.log('获取本地时间月份:',Christmas.getMonth()+1);         // 获取月份: 12

// 4. getDate获取当前时间日期
console.log('获取本地时间日期:',Christmas.getDate());            // 获取日期: 25

// 5. getHours获取当前时间的小时
console.log('获取本地时间时钟:',Christmas.getHours());           // 获取时钟: 12

// 6. getMinutes获取当前时间的分钟
console.log('获取本地时间分钟:',Christmas.getMinutes());         // 获取分钟: 0

// 7. getSeconds获取当前时间的秒钟
console.log('获取本地时间秒钟:',Christmas.getSeconds());         // 获取秒钟: 0

// 8. getMilliseconds获取当前时间的毫秒钟
console.log('获取本地时间毫秒钟:',Christmas.getMilliseconds());  // 获取毫秒数: 0

// 9. getDay获取当前时间在这周处于第几天(1~7,也就是周一到周日)
console.log('获取本地时间周几:',Christmas.getDay());             // 获取天数: 6

// 10. getTimezoneOffset获取UTC和当前时间的时差(单位是分钟),我们是北京时间, 和UTC时差为8个小时,也就是480分钟
// 也就是用UTC的时间 - 当前时区的时间
console.log('获取时差:',Christmas.getTimezoneOffset());  // 获取时差: -480

// 获取UTC时间
// 与获取本地时间同理,一定要记住,UTC的时间是早于北京时间8个小时
console.log('获取UTC年份:', Christmas.getUTCFullYear());      // 获取UTC年份: 2021
console.log('获取UTC月份:', Christmas.getUTCMonth());         // 获取UTC月份: 11
console.log('获取UTC日期:', Christmas.getUTCDate());          // 获取UTC日期: 25
console.log('获取UTC时钟:', Christmas.getUTCHours());         // 获取UTC时钟: 4
console.log('获取UTC分钟:', Christmas.getUTCMinutes());       // 获取UTC分钟: 0
console.log('获取UTC秒钟:', Christmas.getUTCSeconds());       // 获取UTC秒钟: 0
console.log('获取UTC周几:', Christmas.getUTCDay());           // 获取UTC周几: 6
console.log('获取UTC毫秒钟:',Christmas.getUTCMilliseconds());  // 获取UTC毫秒钟: 0
```


###### 设置时间
```javascript
const Christmas = new Date();
Christmas.setFullYear(2021);              // 设置年份 
Christmas.setMonth(11);                   // 设置月份, 0~11,0是1月,11是12月
Christmas.setDate(25);                    // 设置日期
Christmas.setHours(12);                   // 设置时钟
Christmas.setMinutes(0);                  // 设置分钟
Christmas.setSeconds(0);                  // 设置秒钟
Christmas.setMilliseconds(0);             // 设置毫秒

// 也可以直接设置从从1970年1月1日（UTC）开始的毫秒数, 很少用到
// Christmas.setTime(1640404800000);      

console.log(Christmas);  // 2021-12-25T04:00:00.000Z

// UTC的方法也一样,就不演示了
```

###### 输出时间
```javascript
const Christmas = new Date(2021,11,25,12,00,00);

console.table({
  // 1. toLocaleDateString 返回日期对象日期部分的字符串
  'toLocaleDateString': Christmas.toLocaleDateString(), // 2021/12/25

  // 2. toLocaleTimeString 返回日期对象时间部分的字符串
  'toLocaleTimeString': Christmas.toLocaleTimeString(),  // 下午12:00:00

  // 3. toLocaleString 返回该日期对象的日期和时间字符串, 相当于 toLocaleDateString + ' ' + toLocaleTimeString
  'toLocaleString': Christmas.toLocaleString(),         // 2021/12/25 下午12:00:00

  // 6. toDateString 返回日期对象日期部分的美式英语日期格式的字符串
  'toDateString': Christmas.toDateString(),             // Sat Dec 25 2021

  // 7. toTimeString 返回日期对象时间部分的美式英语日期格式的字符串
  'toTimeString': Christmas.toTimeString(),             // 12:00:00 GMT+0800 (中国标准时间)

  // 8.Date实例重写了toString方法,返回日期对象日期和时间的美式英语日期格式的字符串
  // 相当于 toDateString + ' ' +  toTimeString
  'toString': Christmas.toString(),                    // Sat Dec 25 2021 12:00:00 GMT+0800 (中国标准时间)

  // 9. toUTCString 返回UTC时间的美式英语日期格式的字符串
  'toUTCString': Christmas.toUTCString(),               // Sat, 25 Dec 2021 04:00:00 GMT
  
  // 10. toISOString 返回ISO格式的字符串: YYYY-MM-DDTHH:mm:ss.sssZ
  // 时区总是UTC(协调世界时),加一个后缀“Z”标识
  'toISOString': Christmas.toISOString(),               // 2021-12-25T04:00:00.000Z

  // 11. toJSON 返回一个JSON格式字符串(使用 toISOString())
  'toJSON': Christmas.toJSON(),                         // 2021-12-25T04:00:00.000Z

  // 12. valueOf 返回和getTime一样的毫秒数
  'valueoOf': Christmas.valueOf(),                       // 1640404800000
});           

console.log(Christmas.toISOString() === Christmas.toJSON()); // true
```


## 时间矫正
通过构造函数和setXXX的形式设置时间时,如果传入的日期超出,则会对时间进行矫正。
```javascript
// 1. 元旦节 - 2021/1/1
const newYear = new Date(2021,0,1);
console.log(newYear.toLocaleString()); // 2021/1/1 上午12:00:00

/// 这也是元旦 - 2020/12/32 因为12月只有31天, 32天则是下一个月的第一天,就变成 2021/1/1
const newYear2 = new Date(2020,11,32);
console.log(newYear2.toLocaleString()); // 2021/1/1 上午12:00:00
```


## 应用
Date的应用中,最经常用到的无非就是时间格式化和时间差值的计算了。
 - 时间格式化: 当以上date实例提供的输出方法不能够满足我们的需求的时候,就需要手动的获取各个属性,然后根据需求做相应的操作。
 - 时间差值: 计算两个日期之间的时间差,通过获取两个日期的毫秒数,进行减法运(-),就可以获取两个日期之间间隔的毫秒数,然后转换成需要的单位。

###### 实战
假设现在正在完成一个聊天的项目,涉及到聊天消息相关的功能,现在有个需求,编写一个工具类函数,接收一个date对象,并根据和当前时间的差值,返回不同的结果。
 - 过去30秒内, 返回'刚刚'
 - 30秒以上,但是是同一天, 返回格式 'HH:mm',如 '16:00'
 - 昨天的date对象, 返回 '昨天 HH:mm', 如 '昨天 16:00' 
 - 昨天以前,但是是同一年, 返回格式 'X月X日 HH:mm',如 '12月25日 16:00'
 - 去年以及再往前, 返回 'XXXX年X月X日 HH:mm', 如 '2016年12月11日 16:00'

```javascript
/**
 * 
 * @param {Date} date 日期对象
 * @returns {String} 格式化后的日期字符串
 */
function dateFormat(date){
  // 需要先获取当前时间和接收时间的 date对象和毫秒数
  // 毫秒数用来计算差值,date对象用来获取年/月/日/时/分
  const now = new Date();  // 当前时间的date对象
  const nowTime = Date.now(); // 当前时间的毫秒表示
  const dateTime = date.getTime(); // 接收的date对象的毫秒数
  const diff = dateTime - nowTime; // 时间差值, 单位是毫秒

  // dateMap用于获取存储date的年/月/日/时/分, 目前用到的就这些,根据需要存储
  const dateMap = {
    year: date.getFullYear(),
    mouth: date.getMonth()+1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  };
  
  // 这个是昨天的date对象,用于等会获取昨天的日期部分
  const yesterday = new Date(nowTime - 24 * 3600 * 1000);

  // 根据年/月/日/时/分和时间差值来判断两个时间之间的关系
  // 1. 时间间隔小于等于 30秒
  if(Math.abs(diff) <= 30000 ) return '刚刚';
  // 2. 时间间隔大于30秒,但是是同一天
  // 通过比较now(现在)的日期部分和date对象的日期部分
  else if (now.toLocaleDateString() === date.toLocaleDateString()){
    const {hour, minute} = dateMap;
    return `${hour}:${minute}`;
  // 3. 昨天的消息, 比较昨天的日期部分和 date的日期部分
  }else if(yesterday.toLocaleDateString() === date.toLocaleDateString()){
    const { hour, minute } = dateMap;
    return `昨天 ${hour}:${minute}`;
  // 4. 年份相同(同年),但是不是今天、不是昨天(昨天和今天在上面就return了)
  }else if(now.getFullYear() === dateMap.year){
    const {mouth, day, hour, minute} = dateMap;
    return `${mouth}月${day}日 ${hour}:${minute}`;
  // 5. 年份不同
  }else{
    const {year,mouth, day, hour, minute} = dateMap;
    return `${year}年${mouth}月${day}日 ${hour}:${minute}`
  }
}

// 因为是以当前时间作为参照,所以不同时间打印出来的也是不一样的,关注返回格式即可
console.log(dateFormat(new Date(new Date().getTime()-9000)));         // 刚刚, 9秒前
console.log(dateFormat(new Date(new Date().getTime()-3600000)));      // 10:55, 一小时前
console.log(dateFormat(new Date(new Date().getTime()-24 * 3600000))); // 昨天 11:55, 一天前
console.log(dateFormat(new Date(new Date().getTime()-48 * 3600000))); // 12月25日 11:55, 两天前
console.log(dateFormat(new Date(new Date().getTime()-365 * 24 * 3600000)));  // 2020年12月27日 11:55, 365天前
```

