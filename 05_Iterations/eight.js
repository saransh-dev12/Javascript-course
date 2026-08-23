const myNums = [1,2,3]

// const myTotal = myNums.reduce(function (acc, curval) {
//     console.log(`acc: ${acc} and currval: ${curval}`);
//     return acc + curval
// }

const myTotal = myNums.reduce( (acc,curr) => acc+curr, 0)
console.log(myTotal);


const shoppingCart = [
    {
        itemName: "JsCourse",
        price: 2999
    },
    {
        itemName: "PyCourse",
        price: 199
    },
    {
        itemName: "Data Science Course",
        price: 12999
    },


]

const priceToPay = shoppingCart.reduce((acc, item) => acc + item.price, 0)

console.log(priceToPay);
