class User{
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`USERNAME IS ${this.username}`);
        
    }
}

class Teacher extends User {
    constructor(username, email, password){
        super(username)
        this.email = email
        this.password = password
    }

    addCourse(){
        console.log(`A new course was added by ${this.username}`);
        
    }
}

const something = new Teacher("Someone", "someone@teacher.com", "123")

something.addCourse();
something.logMe();

const weirdOne = new User("WeirdOne")

weirdOne.logMe();

console.log(something === weirdOne);
console.log(User === Teacher);
console.log(weirdOne instanceof User);
