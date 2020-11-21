var monkey, monkey_running;
var banana, bananaImage, obstacles, obstacleImage
var foodGroup, obstacleGroup
var score, survivalTime, PLAY = 1,
  END = 0,
  gameState = PLAY;

function preload() {


  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");

}



function setup() {
  monkey = createSprite(30, 350);
  monkey.addAnimation("monkey", monkey_running);   
  monkey.scale = 0.1;

  ground = createSprite(200, 390, 400, 20);
  ground.velocityX = -3;
  foodGroup = new Group();
  obstacleGroup = new Group();

  survivalTime = 0;
  score = 0;


  monkey.debug = false;
}


function draw() {

  if (gameState === PLAY) {
    background("turquoise");

    fill("green");
    stroke("teal");
    text("Score : " + score, 300, 20);
    survivalTime = Math.ceil(frameCount / frameRate());
    textSize(15);
    fill("red");
    stroke("pink");
    text(" Survival Time : " + survivalTime, 150, 20);
    if (ground.x < 198) {
      ground.x = ground.width / 2;
    }
    if (keyDown("SPACE") && monkey.y > 250) {
      monkey.velocityY = -10;
    }
    monkey.velocityY = monkey.velocityY + 0.8;
    monkey.collide(ground);

    if (monkey.isTouching(foodGroup)) {
      foodGroup.destroyEach();
      score = score + 1;
    }

    if (monkey.isTouching(obstacleGroup)) {
      gameState = END;
      background("yellow");
      text("Survival Time : " + survivalTime, 150, 200);
      text("Score : " + score, 160, 220);
      text("GOOD JOB !!", 160, 240);
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      monkey.destroy();

    }
    food();
    obstacle();
  }

  drawSprites();
}

function food() {
  if (frameCount % 80 === 0) {
    banana = createSprite(400, Math.round(random(250, 350)))
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -4;
    banana.lifetime = 110;
    foodGroup.add(banana);
  }
}

function obstacle() {
  if (frameCount % 300 === 0) {
    obstacles = createSprite(Math.round(random(250, 350)), 370);
    obstacles.addImage(obstacleImage);
    obstacles.scale = 0.1;
    obstacles.velocityX = -4;
    obstacles.lifetime = 110;
    obstacleGroup.add(obstacles);
  }
}