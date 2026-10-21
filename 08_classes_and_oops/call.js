function SetUsername(username){
    // complex DB calls
    this.username =  username
    console.log("called");
    
}
function CreateUser(username, email, password){
    SetUsername.call(this, username)

    this.email = email,
    this.password = password
}

const something = new CreateUser("Something", "something@mmeta.com", "123")
console.log(something);
