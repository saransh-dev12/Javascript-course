// Immediately Invoked Function Expression

(function chai(){
    console.log(`DB Connected`)

})(); // semicolon is supposed to be used here because if we don't use it, then the next line of code will be considered as a function call and it will throw an error.

// to eliminate the pollution by the global scope variables IIFE is used.


( (name)=> {
    console.log(`DB connected Two ${name}`);
} )('Saransh')