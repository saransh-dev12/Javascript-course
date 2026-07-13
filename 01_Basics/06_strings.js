const name = "Saransh";
const repoCount = 50;

//console.log(name + repoCount+ " Value"); // outdated syntax

console.log(`Hello my name is ${name} and my repo count is ${repoCount}`); // updated syntax)

const gameName = new String("God-of-War");

console.log(gameName[0]);
console.log(gameName.__proto__);

console.log(gameName.length);
console.log(gameName. toLowerCase());
console.log(gameName. charAt(2));
console.log(gameName. indexOf("T"));

console.log(gameName. slice(0,3));
const newString = gameName.substring(0,6);
console.log(newString);

const anotherString = gameName.substr(-8, 4);
console.log(anotherString);

const NewStringOne = "     Saransh        ";
console.log(NewStringOne);
console.log(NewStringOne.trim());

const url = "https://saransh.com/saransh%20pandey";

console.log(url.replace('%20', '-'));
console.log(url.includes("saransh"));
console.log(url.includes("hitesh"));
console.log(gameName.split('-')); 







