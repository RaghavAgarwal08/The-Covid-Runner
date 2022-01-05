var PLAY = 1;
var END = 0;
var gameState = PLAY;

var man, manImg;
var scene, sceneImg;
var invisibleGround;
var covid, covidImg, covidGroup
var score 
var sanitizer, sanitizerImg, sanitizerGroup;
var sLevel;
var gameOver, gameOverImg;
var restart, restartImg;
var hs;
var bgSound;
var topGround

function preload(){
   manImg = loadImage("giphy.gif");
   sceneImg = loadImage("bg.jpg");
   
   covidImg = loadImage("corona.png");

   sanitizerImg = loadImage("cleaner.png");

   gameOverImg = loadImage("gameOver.png");
   restartImg = loadImage("restartButton.png");
   
}

function setup() {
    createCanvas(600,600)
    //creating scene
    
 scene = createSprite(300,300);
 scene.addImage(sceneImg);
 
 scene.scale = 1.8
    //creating man
 man = createSprite(70,500,50,50);
 man.addImage(manImg);
 man.scale = 0.4;
 //man.debug = true;

 
topGround = createSprite(300,10, 600, 20);
topGround.visible = false;
 //creating invis floor
invisibleGround = createSprite(0,590,600,20);    
invisibleGround.visible = false;   

covidGroup = new Group();
sanitizerGroup = new Group();

gameOver = createSprite(300,300)
gameOver.addImage(gameOverImg);
gameOver.scale=0.5;
gameOver.visible = false;

restart= createSprite(330, 420)
restart.addImage(restartImg);
restart.scale = 0.1;
restart.visible = false;

score = 0;
sLevel = 0;
hs = 0;
}

function draw() {
   
background(sceneImg);


if(gameState==PLAY){
   

  

if(score>hs){
   hs=score;
}
if(sLevel<35){
   spawnCovid();
   score = score + Math.round(getFrameRate()/60);

   scene.velocityX = -2;

   if(scene.x<100){
      scene.x = width/2;
   }

   if(keyDown("space")){
      man.velocityY = -13;
   }

   man.velocityY +=0.8;

   if(covidGroup.isTouching(man)){
      sLevel+=5;
      covidGroup.destroyEach();
   }

   if(sanitizerGroup.isTouching(man)){
      sLevel-=10;
      sanitizerGroup.destroyEach();
   }

   man.collide(invisibleGround);
man.collide(topGround);
   
spawnSanitizer();

gameOver.visible= false;
restart.visible = false;
man.visible = true;
}

  

}

if(sLevel>30){
   gameState==END
   gameOver.visible= true;
   restart.visible = true;
   man.visible = false;
   scene.velocityX = 0;
   score= score*1;

   if(mousePressedOver(restart)){
      reset();
   }
}
if(gameState==END){
   man.destroy();
   gameOver.visible = true;
   restart.visible = true;
}

console.log(gameState)
drawSprites();

textSize(20)
fill ("green")
stroke("red")
 text("Score:"+score, 20, 50);
 text("Sickness Level:"+sLevel, 150, 50);
text("High Score:"+hs, 350, 50)

}

function spawnCovid(){
  
    if(frameCount%50 == 0){
      covid = createSprite(600,Math.round(random(50,550)));
      covid.addImage(covidImg);
      covid.scale = 0.1;
      covid.velocityX = -5;
      covidGroup.add(covid);
   }
}

function spawnSanitizer(){
   if(frameCount%500 == 0){
      sanitizer = createSprite(600,Math.round(random(100,550)), 50,50);
      sanitizer.addImage(sanitizerImg);
      sanitizer.scale = 0.1;
      sanitizer.velocityX = -5;
      sanitizerGroup.add(sanitizer);
      
   }
}

function reset(){
   sLevel = 0;
score = 0;
}