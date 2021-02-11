var ghost, ghostImage ;
var tower, towerImage ;
var door, doorImage, doorsGroup ;
var climber, climberImage, climbersGroup;
var invisibleBlock, invisibleBlockGroup ;
var spookySound ;
var gameState = "play";

function preload(){
  
  ghostImage = loadImage("ghost-standing.png");
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  spookySound = loadSound("spooky.wav");
  
}



function setup(){
  createCanvas(600, 600);
  
  spookySound.loop();
  
  tower = createSprite(300, 300);
  tower.addImage("tower", towerImage);
  tower.velocityY = 1 ;
  
  ghost =  createSprite( 300, 100, 50, 50);
  ghost.addImage("ghost", ghostImage);
  ghost.scale = 0.3 ;

  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
  
}



function draw(){
  background(0);
  
  if(gameState==="play") {
    
    if(keyDown("left_arrow")){
      ghost.x = ghost.x-3 ;
    }
    
    if(keyDown("right_arrow")){
      ghost.x= ghost.x+3 ;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10 ;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8 ;
    
    if(tower.y > 400){
    tower.y = 300 ;
      
  }
  
  spawnDoors();
    
//Climbers Group. Collide(Ghost);
    if(climbersGroup.isTouching(ghost)){
      ghost.VelocityY = 0 ;
    }
    
    if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end";
    }
  
  drawSprites(); 
  }
  
  if(gameState === "end"){
    
    stroke("yellow");
    fill("yellow");
    textSize(30);
    text("GAME OVER!" , 230, 250);
    
  }
}

function spawnDoors(){
//Write Codes Here To Spawn The Doors In The Tower
  if(frameCount % 240 === 0 ){
    var door = createSprite(200, -50);
    var climber = createSprite(200, 10);
    var invisibleBlock = createSprite(200, 15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2 ;
    
    door.x = Math.round(random(120, 400));
    climber.x = door.x ;
    invisibleBlock.x = door.x ;
    
    door.addImage(doorImage);
    climber.addImage(climberImage);
    
    door.velocityY = 1 ;
    climber.velocityY = 1 ;
    invisibleBlock.velocityY = 1 ;
    
    ghost.depth = door.depth ;
    ghost.depth = +1 ;
    
//Assign LifeTime To The Variables
    door.lifetime = 800 ;
    climber.lifetime = 800 ;
    invisibleBlock.lifetime = 800 ;
    
//Add Each Door To The Group  
    doorsGroup.add(door);
    invisibleBlock.debug = true ;
    climbersGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
  } 
}