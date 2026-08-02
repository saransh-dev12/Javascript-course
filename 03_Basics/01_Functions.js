function sayMyName(){
    console.log("S");
    console.log("A");
    console.log("R");
    console.log("A");
    console.log("N");
    console.log("S");
    console.log("H");
}

//sayMyName();

// function addTwoNumbers(number1, number2){ // here number 1 and number 2 are parameters
//    console.log(number1 + number2);
// }
function addTwoNumbers(number1, number2){ // here number 1 and number 2 are parameters
//    let result = number1 + number2
//    return result
//    console.log("Saransh") // wont be printed after return

    return number1 + number2

}


//addTwoNumbers(3,"4"); // treated 4 as a string // here 3 and 4 are arguments
const result = addTwoNumbers(3,5); 

// console.log("Result: ", result);


// function logInUserMessage(username){
//     if(!username){
//         console.log("Please Enter a Username");
//         return 
//     }
//     return `${username}just logged in`
// }

// //console.log(logInUserMessage("Saransh "))
// console.log(logInUserMessage()) // shows undefined


function logInUserMessage(username = "Sam"){
    if(!username){
        console.log("Please Enter a Username");
        return 
    }
    return `${username} just logged in`
}

//console.log(logInUserMessage("Saransh "))
//console.log(logInUserMessage("Saransh")) // shows undefined


function calculateCartPrice(val1, val2,...num1){ // rest operator
    return num1
}

//console.log(calculateCartPrice(200,300,400, 2000, 2001))

const user = {
    username: "Saransh",
    price: 199
}

function handleObject(anyObject){
    console.log(`Username is ${anyObject.username} and price is ${anyObject.price}`);

}

// handleObject(user)
// handleObject({
//     username: "sam",
//     price: 399
// })


const myNewArray = [200,400,100,600]

function returnSecondValue(getArray){
    return getArray[1]
}

//console.log(returnSecondValue(myNewArray));

console.log(returnSecondValue([200,650,500,600,77]));
