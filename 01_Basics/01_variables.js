const accountId = 123456;
let accountEmail = "saransh@google.com" // 1st way of defining variable. more common
var accountPassword = "12345"; // 2nd way of defining variable
accountCity = "Bangalore";

//accountId = 2 //not allowed
accountEmail = "hc@hc.com"
accountPassword = "212121"
accountCity = "Delhi"
let accountState; 
/*
Prefer not to use var because of issue in block scope and functional scope
*/



console.log(accountId);
console.table([accountId, accountEmail, accountPassword, accountCity, accountState]);

