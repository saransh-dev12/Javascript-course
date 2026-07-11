let score = true


// console.log(typeof score); 
// console.log(typeof(score));

let valueInNumber = Number(score); // convert string to number
// console.log(typeof(valueInNumber));
// console.log(valueInNumber);


// "33" => 33
// "33abc" => NaN
// true => 1
// false => 0
let isloggedin = "saransh";

let booleanIsLoggedIn = Boolean(isloggedin); // convert number to boolean
// console.log(booleanIsLoggedIn);

// 1 => true
// 0 => false
// "saransh" => true
// "" => false 

let number = 23;

let someNumber = String(number); // convert number to string
// console.log(someNumber);
// console.log(typeof someNumber);


// ************* Operations *************

let value = 3;
let negValue = -value;
// console.log(negValue);

// console.log(2 + 2);
// console.log(2 - 2);
// console.log(2 * 2);
// console.log(2 **2);
// console.log(2 / 2);
// console.log(2 % 3);

let str1 = "Hello";
let str2 = " Saransh";

let str3 = str1 + str2; // concatenation
// console.log(str3);

// console.log("1" + 1); 
// console.log(1 + "1");
// console.log("1" + 2 + 2); // here 2 + 2 is not added
// console.log(1 + 2 + "2"); // here 1 + 2 is added 

// console.log((3 + 4) * 5 % 3);

console.log(true);
console.log(+true);

let num1, num2, num3;

num1 = num2 = num3 = 2 + 2; 
console.log(num1, num2, num3);

let gameCounter = 100;
++gameCounter;
console.log(gameCounter);
