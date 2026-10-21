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
myHeroes.Saransh()
myHeroes.heySaransh()
// heroPower.heySaransh()


