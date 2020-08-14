var dog, dogImg1, dogImg2, database, amount, foodS, foodStock;

function preload() {
  dogImg1 = loadImage("images/dogImg.png");
  dogImg2 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(1175, 505);
  
  dog = createSprite(1000, 250, 100, 100);
  dog.addImage(dogImg1);
  dog.scale = 0.5;

  var foodStock = database.ref("food");
  foodStock.on("value", readStock, showMessage);
}

function draw() {  
  background(46, 139, 87);

  fill(255,165,79);
  rect(-2, 375, 1300, 200);

  drawSprites();

  textSize(30);
  fill("white");
  text('Press the buttons to make food and feed it to Drago the dog!', 6, 30);

  textSize(50);
  fill("white");
  text('Food Remaining: ' + foodS, 6, 275);
}

function writeStock(x){
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }
  database.ref('/').update({
    "food": x
  })
}

function readStock(data) {
  foodS = data.val();
}

function showMessage() {
  console.log("You fed Drago!");
}

function addFood() {
  if (foodS >= 20) {
    foodS = 20;
  } else {
    foodS = foodS + 1;
  }
  database.ref('/').update({
    "food": foodS
  })
  dog.addImage(dogImg1);
}

function feedFood() {
  writeStock(foodS);
  dog.addImage(dogImg2);
}