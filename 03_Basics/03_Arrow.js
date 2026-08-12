const user = {
    username:  "Saransh",
    price: 999,

    welcomeMessage: function() {
        console.log(`${this.username}, welcome to the website`);
        console.log(this);
    }

}

// user.welcomeMessage();
// user.username = "Sam";
// user.welcomeMessage();

// console.log(this); // this will point to the global object (window in browsers, global in Node.js)

// function chai(){
//     let username = "Saransh";
//     console.log(this.username); // this is mainly used in object methods, not in regular functions. In a regular function, this refers to the global object (window in browsers, global in Node.js). Since there is no username property on the global object, it will log undefined.

// }

// chai();

// const Chai = function() {
//     let username = "Saransh"
//     console.log(this.username);
    
// }
// Chai();

// const Chai = () => {
//     let username = "Saransh"
//     console.log(this);
    
// }
// Chai();

// const addTwo = (num1, num2) => {
//     return num1 + num2; // explicit return 
// }

// console.log(addTwo(4,6));


//const addTwo = (num1, num2) => num1 + num2; 
//const addTwo = (num1, num2) => (num1 + num2); // implicit return 

const addTwo = (num1, num2) => ({username: "Saransh", price: 999}); // implicit return of an object


console.log(addTwo(4,6));


