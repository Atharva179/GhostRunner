var tower , towerImage
var door , doorImage , doorGroup
var ghost, ghostImage
var climber, climberImage, climberGroup
var block, blockGroup
var Gamestate = "play"


function preload(){
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  ghostImage = loadImage("ghost-standing.png")
  
}

function setup(){
  createCanvas (600,600)
  
  tower = createSprite(300,300,10,10)
  tower.addImage(towerImage)
  tower.velocityY = 5;
  
  doorGroup = createGroup();
  climberGroup = createGroup();
  blockGroup = createGroup();
  
  ghost = createSprite(300,300,50,50)
  ghost.scale = 0.3
  ghost.addImage(ghostImage)
  
  
}

function draw(){
  
  background("black")
  
  if(Gamestate === "play"){
    if(tower.y>600){
    tower.y = 300
  }
  
  if(keyDown("left_arrow")) {
    ghost.x = ghost.x -3;
  }
  if(keyDown("right_arrow")) {
   ghost.x = ghost.x +3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -12
  }
  
  ghost.velocityY = ghost.velocityY + 0.8 
  
  if(climberGroup.isTouching(ghost)){
    ghost.velocityY = 0
  }
  
  if(blockGroup.isTouching(ghost)|| ghost.y> 600){
   ghost.destroy();
    Gamestate = "end"
  }
      
  doors(); 
  drawSprites();
  
  }
  else{
    textSize (50)
    text("GAME OVER!!",150,300)
  }
  
  
  
  
}

function doors(){
  if(frameCount % 240 === 0){
    door = createSprite(200,-50,10,10)
    door.addImage(doorImage)
    door.velocityY = 5;
    door.x = Math.round(random(50,450))
    door.lifetime = 800;
    doorGroup.add(door)
    
    climber = createSprite (200, 10, 10, 10);
  climber.addImage(climberImage);
    door.x = climber.x;
    climber.velocityY = 5;
    climber.lifetime = 800;
    climberGroup.add(climber)
    
    ghost.depth = door.depth;
    ghost.depth = ghost.depth +1;
    
    block = createSprite (200, 15);
    block.x = door.x;
    block.width= climber.width;
    block.height = 2;
    block.velocityY = 5;
    block.lifetime = 800;
    blockGroup.add(block)
    
    
    
    
  }
    
}