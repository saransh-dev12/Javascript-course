const marvel_heroes = ["thor", "IronMan", "CaptainAmerica"];
const dc_heroes = ["superman", "cyborg", "Batman"]

//marvel_heroes.push(dc_heroes);

// console.log(marvel_heroes); // this takes the dc heroes array as an element

// console.log(marvel_heroes[3]);
// console.log(marvel_heroes[3][1]);

//const all_heroes = marvel_heroes.concat(dc_heroes)

//console.log(all_heroes); // provides the same output as same as of push but provides a new array altogether

const all_newHeroes = [...marvel_heroes,...dc_heroes];

//console.log(all_newHeroes);
const another_array = [1,2,3,[4,5,6],7,[6,7,[4,5]]]

const real_another_array = another_array.flat(Infinity)

//console.log(real_another_array);

console.log(Array.isArray("Saransh"));
console.log(Array.from("Saransh"));
console.log(Array.from({name: "Saransh"})); // we need to provide keys and values for this


let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1, score2, score3));



