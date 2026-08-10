//var c  = 300
let a = 300

if(true){
    let a = 10
    const b = 20
   // console.log(a);
   function addnum(){

   }

} 


//console.log(a);
//console.log(b);
//console.log(c);

function one(){
    const username = "Saransh"

    function two(){
        const website = "youtube"
        console.log(username);  // in nested functions child functions can access parent functions variables but not vice versa
    }
    //console.log(website);
    // two();
}

// one();

if(true){
    const username = "Saransh"
    if(username === "Saransh"){
        const website = " youtube"
        //console.log(username + website);

    }
    // console.log(website);

}

// console.log(username);




// +++++++++++++ interesting +++++++++++++

console.log(addOne(5)); // 6
function addOne(num){
    return num + 1
}



//addTwo(5) 
const addTwo = function(num){ // function is hold in a value so it cannot be accesed by the compiler
    return num + 2;

}
