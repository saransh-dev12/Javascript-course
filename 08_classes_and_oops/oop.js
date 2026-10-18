const user = {
    username: "Saransh",
    loginCount: 8,
    signedIn: true,

    getUserDetails: function(){
        //console.log("Got user details from database");
        //console.log(`Username: ${this.username}`)
        console.log(this)
    }
}

//console.log(user.username);
//console.log(user.getUserDetails());
//console.log(this) // return an empty paranthesis

function User(username, loginCount, isLoggedIn){
    this.username = username;
    this.loginCount = loginCount;
    this.isLoggedIn = isLoggedIn;

    this.greeting = function(){
        console.log(`Welcome ${this.username}`)
    }

    // return this
}

const userOne = new User("SARANSH", 12, true)
const userTwo = new User("Something", 11, false)
console.log(userOne.constructor);
//console.log(userTwo);




// this overrides the values of userOne

