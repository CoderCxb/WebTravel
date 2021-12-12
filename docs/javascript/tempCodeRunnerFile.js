const s = Symbol();
console.log(Object(s) == s);

const bi = BigInt(1024);
console.log(Object(bi) == bi);


console.log(Object.prototype.toString.call(Object(s)));
console.log(Object.prototype.toString.call(s));