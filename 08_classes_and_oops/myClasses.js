// // ES6

// class User{
//     constructor(username, email, password){
//         this.username = username;
//         this.email = email;
//         this.password = password;
//     }
//     encryptPassword(){
//         return `${this.password}abc`
//     }
//     changeUsername(){
//         return `${this.username.toUpperCase()}`
//     }
// }

// const something = new User("something", "something@gmail.com", "123")

// console.log(something.encryptPassword());
// console.log(something.changeUsername());

// behind the scenes

function User(username, email, password){
    this.username = username;
    this.email  = email;
    this.password = password;

}

User.prototype.encryptPassword = function(){
    return `${this.password}abc`
}
User.prototype.changeUsername = function(){
    return `${this.username.toUpperCase()}`
}




const something2 = new User("something2", "something2@gmail.com", "123")

console.log(something2.encryptPassword());
console.log(something2.changeUsername());