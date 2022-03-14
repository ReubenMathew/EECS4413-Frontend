function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
async function getDummyData() {
  var data = [];
  var numOfItems = 50;
  var colors = ["Red", "Green", "Blue", "Orange", "White", "Purple", "Black"];
  const products = await fetch(
    `https://random-data-api.com/api/appliance/random_appliance?size=${numOfItems}&`
  ).then((res) => {
    return res.json();
  });
  products.map((item, index) => {
    console.log(item.equipment);
    data.push({
      id: index,
      productName: item.brand + " " + item.equipment,
      category: item.brand,
      description: `Its a ${item.equipment}.`,
      color: colors[getRandomInt(colors.length)],
      price: getRandomInt(500),
      quantity: getRandomInt(100),
    });
  });

  console.log("products test");
  console.log(data);
  return data;
}
