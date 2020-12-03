var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var score
var gameOverImage,restartImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}

function setup() {
 createCanvas(600,200); 

  monkey = createSprite(80,160,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.08;

  ground = createSprite(400,190,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstaclesGroup = createGroup();

  score = 0;
}
function draw() {
 background(225);
  
  text("Score: "+ score, 500,50);
  
  if(gameState === PLAY){
    ground.velocityX = -(4 + 3* score/100);
     score = score + Math.round(getFrameRate()/60);
    if(score>0 && score%100 === 0){
    }
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 161) {
        monkey.velocityY = -12;
    }
    monkey.velocityY = monkey.velocityY+0.8;
    
    Food();
    Obstacles();
    
    if(obstaclesGroup.isTouching(monkey)){
        gameState = END;
    }
  }
  else if (gameState === END){
     ground.velocityX = 0;
      monkey.velocityY = 0;
    
    obstaclesGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
     
     obstaclesGroup.setVelocityXEach(0);
     FoodGroup.setVelocityXEach(0);
  }
  monkey.collide(ground);
  drawSprites();
}
function Obstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,165,10,40);
   obstacle.velocityX = -(6 + score/100); 
   obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;

    obstaclesGroup.add(obstacle);
 }
}

function Food() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(bananaImage);
    cloud.scale = 0.1;
    cloud.velocityX = -3;
  
    cloud.lifetime = 200;
  
    cloud.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    
    FoodGroup.add(cloud);
  }
}









