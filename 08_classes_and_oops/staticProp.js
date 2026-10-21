class User{
    constructor(username){
        this.username = username
    }
    logMe(){
        console.log(`Username is ${this.username}`);

    }

    static createId(){
        return `123`

    }

}

const Saransh = new User("Saransh")
//console.log(Saransh.createId());

class Teacher extends User{
    constructor(username, email){
        super(username)
        this.email = email;
    }
}

const iphone = new Teacher("iphone", "iphone@gmail.com")
iphone.logMe();
console.log(iphone.createId()); // static can't be accessed with parents and childs either'
