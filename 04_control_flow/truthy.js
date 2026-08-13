const userEmail = []

if (userEmail) {
    console.log("Got user email")
}
else{
    console.log("Dont have user email")
}

// falsy values

// false, 0, -0, BigInt 0n, "", null, undefined, NaN

// truthy values
// "0", "false", " ", [], {}, function(){} 
// an empty function is also a truthy value

if (userEmail.length === 0) {
    console.log("Array is Empty");
    
}

const emptyObj = {}

if (Object.keys(emptyObj).length === 0) {
    console.log("Object is Empty");
}

// Nullish Coalescing Operator (??): null undefined

let val1;
//val1 = 5 ?? 10
//val1 = null ?? 10 // This is a safety check for null values
//val1 = undefined ?? 15 // safety check for undefined values too

val1 = null ?? 110 ?? 20 // in case of non null values the first value is assigned

console.log(val1); 



// Ternary Operator

//condition ? true : false

const iceTeaPrice = 100;

iceTeaPrice <=80 ? console.log("Less than 80"): console.log("more than 80");