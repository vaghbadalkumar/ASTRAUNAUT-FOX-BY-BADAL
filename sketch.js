const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
let bg;
let g ;
var astro , asImg;
var stImg , stImg2 , stImg3;
var gameState = 1;// 0 means pause , 1 means play, 2 means end 
var stoneGroup;
var rewardImg;
var rwdgroup;
var count = 0;
var starImg;
var starSound;
var score , scoreImg ,scoreImg2; 
var robot,robotImg;
var level = 0;
var spacefactImg;
var spacefact;
var fctImg2  , fctImg3 , fctImg4 ; 
var blkbg ; 
var winImg;
var win;
var typeFlag = false;

function preload()
{
 bg = loadImage("image/bg4.jpg");
 asImg = loadImage("image/hero.png");
 stImg = loadImage("image/stone.png");
 stImg2 = loadImage("image/stone2.png");
 stImg3 = loadImage("image/stone3.png");
 rewardImg = loadImage("image/reward.png");
 starImg = loadImage("image/star.png")
 starSound = loadSound("image/starSound.wav");
 scoreImg = loadImage("image/empty.png");
 scoreImg2 = loadImage("image/one_star.png");
 scoreImg3 = loadImage("image/stars.png");
 robotImg = loadImage("image/robot.gif");
 spacefactImg = loadImage("image/jupitermoon.jpg");
 fctImg2 = loadImage("image/fctImg2.jpg");
 fctImg3 = loadImage("image/spacefact.jpg");
 fctImg4 = loadImage("image/space-facts.jpg")
 blkbg = loadImage("image/blkbg.jpg");
 winImg = loadImage("image/youwin.png");

}

function setup() {
 createCanvas(1200,510);
  
 astro = createSprite(100,400,50,50);
 astro.addImage(asImg) ;
 astro.scale = 0.06;
 astro.debug = false;

 score = createSprite(1000,50,100,50);
 score.addImage(scoreImg3);
 score.addImage(scoreImg2);
 score.addImage(scoreImg);
 score.changeImage(scoreImg);
 score.scale = 0.5;

 robot = createSprite(270,250,50,50);
 robot.addImage(robotImg);
 robot.scale = 0.15;
 robot.visible = false;

 spacefact = createSprite(600,250);
 spacefact.addImage(spacefactImg);
 spacefact.scale = 0.3;
 spacefact.visible = false;

 win = createSprite(600,300);
 win.addImage(winImg);
 win.scale = 0.5
 win.visible = false ; 

 stoneGroup = new Group() 
 rwdgroup = new Group();
}

function draw() 
{
  background(bg);
  if(astro.x<=70){

    astro.x = 70;
  }
  if(astro.x>=1100){

    astro.x = 1100;
  }
  if(astro.y<=100){

    astro.y = 100;
  }
 

  if(gameState === 1 ){

    if (keyDown ("space")){
  astro.velocityY = -4;
}

if (keyDown (LEFT_ARROW)){
  astro.velocityX = -5;
}

if (keyDown (RIGHT_ARROW)){
  astro.velocityX = 5;
}
  
  astro.velocityY += 0.08;
  if(stoneGroup.isTouching(astro)){
    astro.velocityY = 0;
  }

  if(rwdgroup.isTouching(astro)){
    starSound.play();
    rwdgroup.destroyEach();
    count ++;
    console.log(count)
  }

  
  reward() ;
  stone() ;

}
if(count === 1 ){
  score.addImage(scoreImg2);
}

if(count === 2 ){
    score.addImage(scoreImg3);
    gameState = 0;
    level ++;// 
}
if(level === 3){
  background(blkbg);
  text.visible = false; 
  rwdgroup.destroyEach();
  astro.destroy();
  stoneGroup.destroyEach();
  score.destroy();
  robot.destroy();
  spacefact.destroy();

  win.visible = true ; 

}


if(gameState === 0){
  
  fill(255)
  text(" PRESS THE SPCEBAR TO CONTINUE ",490,60) ;
  astro.setVelocity(0,0) ;
  stoneGroup.setVelocityEach(0,0);

  switch(level){
  case 1 :

   console.log("level  1 ")
   robot.visible = true;
    spacefact.visible = true;
    break;

    case 2 :

   console.log("level  2 ")
   robot.visible = true;
   spacefact.addImage(fctImg2);
   spacefact.visible = true;
   break;
   
   case 3 :

   console.log("level  3 ")
   robot.visible = true;
   spacefact.addImage(fctImg3);
   spacefact.visible = true;
   break;
}

  count  = 0 ;
  if(keyDown("space")){
    text.visible = false;
    stoneGroup.destroyEach();
    score.addImage(scoreImg);
    robot.visible = false;
    spacefact.visible = false;
    gameState = 1;
  } 
}
   if(astro.y>450 || astro.x>1100){
       astro.x = 100;
       astro.y = 400;
    }


  drawSprites();
}

function stone() {
if (frameCount % 200 === 0){
  var  x  = Math.round(random(1,3))    ;
  console.log(x+ "this is the value of x");
  var st = createSprite(1200,450,50,50);
  st.velocityX = -2;
  switch(x){
    case 1 : 
    st.addImage(stImg);
    break ; 
    
    case 2 :
    st.addImage(stImg2)  ;
    break ; 

    case 3: 
    st.addImage(stImg3);
    break; 
}
  
  st.scale  = 0.08;
  st.debug = false;
  st.setCollider("rectangle",0,0,50,50)
  stoneGroup.add(st) ;

  spacefact.depth = st.depth+1;

  }
}

function reward(){
if(frameCount % 800 === 0){
  var y = Math.round(random(100,200))
 var rwd = createSprite(1200,y,50,50);
 rwd.velocityX = -3;
 rwd.addImage(starImg);
 rwd.scale = 0.08 ; 
 rwdgroup.add(rwd);
}
}

function gameEnd(){ 
rwdgroup.destroyEach();
astro.destroyEach();
stoneGroup.destroyEach();
spacefact.destroyEach();  

}