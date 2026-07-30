// singleton
// object literals
// Object.create

const mySym = Symbol("key1")

const JsUser = {
    name: "Saransh",
    "full name": "Saransh Pandey",
    [mySym]: "mykey1",
    age: 20,
    email: "saranshpandey2006@gmail.com",
    location: "Gurgaon",
    isLoggedIn: false,
    lastLoginDays: ["Monday", "Tuesday"]

}

// console.log(JsUser.email);
// console.log(JsUser["email"]);
// console.log(JsUser["full name"]);
// console.log(JsUser [mySym]); 

JsUser.email = "saransh.coder2006@gmail.com";
//Object.freeze(JsUser);
JsUser.email = "saransh.coder2005@gmail.com";

console.log(JsUser ["email"]);
//console.log(JsUser);

JsUser.greeting = function(){
    console.log("Hello js user");

}
JsUser.greetingTwo = function(){
    console.log(`Hello js user, ${this.name}` );

}

console.log(JsUser.greeting());
console.log(JsUser.greetingTwo());

