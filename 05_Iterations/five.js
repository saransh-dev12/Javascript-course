const coding = ["js", "ruby", "java", "python", "cpp"]

// coding.forEach( function (item) {
//     console.log(item);
// } )

// coding.forEach( (val) => {
//     console.log(val);
// } ) // using arrow function

function PrintMe(item){
    //console.log(item);
}

coding.forEach(PrintMe) // reference needs to be given not the whole function needs to be executed.

// coding.forEach( (item, index, arr) => {
//     console.log(item, index, arr);
// })

const myCoding = [
    {
    langname: "JavaScript",
    langfile: "JS",
    },
    {
    langname: "Java",
    langfile: "Java",
    },
    {
    langname: "Python",
    langfile: "py",
    },
]
 
myCoding.forEach((item)=> {
    console.log(item.langname); // Accesing the value of objects in an array.
})

