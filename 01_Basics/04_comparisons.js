// console.log(3 > 2); // true
// console.log(2 >= 1);
// console.log(2!=1);


// console.log("2" > 1);
// console.log("02" > 1); // different data types are converted during comparison.

console.log(null > 0);
console.log(null == 0);
console.log(null >= 0); 

// null was converted to zero by comparisons

console.log(undefined > 0);
console.log(undefined == 0);
console.log(undefined >= 0);

// === 

console.log("2"=== 2); // false

// these comparisons are not recommended because of type coercion. Use ===.