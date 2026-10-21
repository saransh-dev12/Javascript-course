// let myName = "Saransh  "
// let myChannel = "Roukin  "

// console.log(myName.truelength())  


let myHeroes = ["Thor", "Spiderman"]

let heroPower = {
    thor: "hammer",
    spiderman: "sling",

    getSpiderPower: function(){
        console.log(`Spider power is ${this.spiderman}`);
        
    }

}

Object.prototype.Saransh = function(){
    console.log(`Saransh is present in all objects`)
}

Array.prototype.heySaransh = function(){
    console.log(`Saransh says hello`);
    
}


// heroPower.Saransh()
// myHeroes.Saransh()
// myHeroes.heySaransh()
// heroPower.heySaransh()

// inheritance

const User = {
    name: "Something",
    email: "something@google.com"
}

const Teacher = {
    makeVideo: true
}

const TeachingSupport = {
    isAvailable: false
}

const TASupport = {
    makeAssignment: 'JS Assignment',
    fullTime: true,
    __proto__: TeachingSupport

}

Teacher.__proto__ = User // prototype inheritance

// modern syntax

Object.setPrototypeOf(TeachingSupport, Teacher)

let anotherUsername = "Something    "
String.prototype.truelength = function(){
   
   console.log(`${this}`);
    console.log(`True length is: ${this.trim().length}`)
    
}

anotherUsername.truelength()

"Saransh".truelength();