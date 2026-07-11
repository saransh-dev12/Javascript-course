//Primitive data types

// 7 types: string, Number, Boolean, null, undefined, symbol, 
// bigint

// const score = 100 
// const scoreValue = 100.1

const isloggedin = true; // boolean
const outsideTemp = null; // null
let userEmail; // undefined

const id = Symbol('123');
const anotherId = Symbol('123');


console.log(id === anotherId); // false
// js is a dynamically typed language. 

const bigNumber = 123456789n; // bigint


// Array, Objects, Functions


const heroes= ["Ironman" , "Captain America", "Black Panther"];

let myObj = {
    name: "Saransh",
    age: 21,
}


const myFunction = function() {
    console.log("Hello World");
}


console.log(typeof myFunction); // function
console.log(typeof heroes); // object
console.log(typeof myObj); // object
console.log(typeof bigNumber); // bigint


