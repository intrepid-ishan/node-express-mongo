var faker = require('faker');

var i;

for (i = 0; i < 10; i++) {
    var randomProduct = faker.commerce.productName(); // Caitlyn Kerluke
    var randomPrices = faker.commerce.price(); // Rusty@arne.infvar randomName = faker.name.findName(); // Caitlyn Kerluke

    console.log(randomProduct + " " + randomPrices);
}