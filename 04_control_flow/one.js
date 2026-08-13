// if statement

const isUserLoggedIn = true;
const temperature = 41;

// if(temperature === 40){
//     console.log("Temperature is less than 50");
// }
// else{
//     console.log("Temperature is greater than 50");
// }

// if(2 === "2") { // === for strict checking
//     console.log("Executed");

// }


// const score = 200;

// if(score > 10){
//     const power = "fly"; // if used var the scope becomes global
//     console.log(`User power: ${power}`);
    
// }
// console.log(`User power: ${power}`); // not executed outside as the scope is local of power

const balance = 1000;

//if(balance > 500) console.log("test"), console.log("TEST2"); // Not a good Practice

// if (balance < 500){
//     console.log("less than");
// }
// else if(balance < 750){
//     console.log("less than 750");

// }
// else{
//     console.log("Less than 1200");
// }

const userLoggedIn = true;
const debitCard = true;
const loggedInFromGoogle = false;
const loggedInFromEmail =true;


if(userLoggedIn && debitCard && 2==3){ // will not be executed as one of the condiiton is false
    console.log("Allowed to buy courses");
}
if(loggedInFromGoogle || loggedInFromEmail){ // will be executed as one of the condition is true
    console.log("User Logged In");
}

