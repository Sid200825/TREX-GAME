var trex,trex_running,trex_collided;
var ground,ground_image,invisibeG
var cloud,cloudImage,CloudsGroup
var obstacle,ob1,ob2,ob3,ob4,ob5,ob6,ObstaclesGroup
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var count = 0,highScore=0,x=0;
var restart,restartImage,gameOver,gameOverImage

function preload(){
trex_running=loadAnimation("trex1.png","trex3.png","trex4.png")
  ground_image=loadImage("ground2.png")
  cloudImage=loadImage("cloud.png")
  ob1=loadImage("obstacle1.png")
  ob2=loadImage("obstacle2.png")
  ob3=loadImage("obstacle3.png")
  ob4=loadImage("obstacle4.png")
  ob5=loadImage("obstacle5.png")
  ob6=loadImage("obstacle6.png")
  trex_collided=loadAnimation("trex_collided.png")
  restartImage=loadImage("restart.png")
  gameOverImage=loadImage("gameOver.png")
   
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,50)
  trex.addAnimation("running",trex_running)
   trex.addAnimation("collided",trex_collided)
  trex.scale=0.5
  
  ground=createSprite(300,180,600,20)
  ground.addImage("ground",ground_image)
  ground.velocityX=-6
  invisibleG=createSprite(300,190,600,20)
  invisibleG.visible=false
  
  CloudsGroup=new Group()
  ObstaclesGroup=new Group()
  
 gameOver = createSprite(300,100);
 restart = createSprite(300,140);
gameOver.addImage("gameOver",gameOverImage);
gameOver.scale = 0.5;
restart.addImage("restart",restartImage);
restart.scale = 0.5;
gameOver.visible=false;
restart.visible=false;

}

function draw() {
  background(150);
  fill("white")
  
  text("Score: "+ count, 450, 80);
  if (x===1) {
    text("High Score:"+highScore, 450, 110);
  }
  if(gameState===PLAY){
if(keyDown("space")&&trex.y>140){
  trex.velocityY=-10
  } 
  trex.velocityY=trex.velocityY+0.5
  if(ground.x<0){
  ground.x=300
  }  
    if (World.frameCount%5==0) {
      count = count+1;
      if (count%100===0&&count>0) {
        ground.velocityX = ground.velocityX-2;
        //playSound("checkPoint.mp3", false);
      }
    }
      spawnClouds()
    spawnObstacles()
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
      //playSound("die.mp3", false);
    }
  }
  else if(gameState===END){
    gameOver.visible=true;
restart.visible=true;
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    trex.changeAnimation("collided",trex_collided)
  
  }
  if (mousePressedOver(restart)) {
    reset();
  }
  
  
  
  trex.collide(invisibleG)
  
  drawSprites()
}
function reset() {
  gameState = PLAY;
  trex.changeAnimation("running",trex_running);
  ObstaclesGroup.destroyEach();
  CloudsGroup .destroyEach();
  restart.visible = false;
  gameOver.visible = false;
  if (count>highScore) {
    highScore = count;
  }
  x = 1;
  count = 0;
  ground.velocityX = -6;
}
 
function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y =Math.round( random(80,120));
    
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = ground.velocityX;
    
    //generate random obstacles
    var rand =Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(ob1)
        break;
        case 2:obstacle.addImage(ob2)
        break;
        case 3:obstacle.addImage(ob3)
        break;
        case 4:obstacle.addImage(ob4)
        break;
        case 5:obstacle.addImage(ob5)
        break;
        case 6:obstacle.addImage(ob6)
        break;
        
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 100;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
  }
}
