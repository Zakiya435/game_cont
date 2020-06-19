var man,man_img,man_right,man_left;
var bg;
var ground,ground2,ground3,ground4,invisibleGround,invisibleGround2;
var germ,germ2,germ3,germ4,germs_img,germlast;
var bullet,pills;
var door,door_img;
var leftedge,rightedge,bottomedge,topedge;
var timer = 0;
var gameState = "PLAY";
var game = "ON";
var death = 0;

function preload()
{
  bg = loadImage("sprites/bg.jpg");
  bg2 = loadImage("sprites/bg2.jpg");
  man_img = loadImage("sprites/front1.png");
  man_left = loadImage("sprites/left1.png");
  man_right = loadImage("sprites/right1.png");
  germs_img = loadImage("sprites/viruses.png");
  door_img = loadImage("sprites/door.png");
  masks = loadImage("sprites/masks.png");
  stayathome = loadImage("sprites/stay at home.png");
  leftinf = loadImage("sprites/leftinf.png");
  rightinf = loadImage("sprites/rightinf.png");
  gameOver = loadImage("sprites/gameover.gif");
  last_virus = loadImage("sprites/lastvirus.png");
  win = loadImage("sprites/win.jpg");
  ground_img = loadImage("sprites/ground.gif");
}



function setup() 
{
  createCanvas(windowWidth,windowHeight);
  man = createSprite(windowWidth/2 - 700,windowHeight/2 + 300,50, 50);
  man.addAnimation("right",man_right);
  man.addAnimation("left",man_left);  
  man.addAnimation("leftinfected",leftinf);
  man.addAnimation("rightinfected",rightinf);
  man.scale = 0.3;
  man.setCollider("circle",20,20);

  germ = createSprite(windowWidth,windowHeight/2+300,30,30);
  germ.addImage("germ",germs_img);
  germ.scale = 0.25;
  germ.velocityX = -9;

  germ2 = createSprite(windowWidth/2-780,windowHeight/2 + 500,30,30);
  germ2.addImage("germ",germs_img);
  germ2.scale = 0.25;
  germ2.velocityX = 10;

  germ3 = createSprite(windowWidth,windowHeight/2 + 100,30,30);
  germ3.addImage("germ",germs_img);
  germ3.scale = 0.25;
  germ3.velocityX = -10; 
  

  ground = createSprite(windowWidth/2,windowHeight/2 + 370,windowWidth,5 );
  ground.shapeColor = '#ff0000';
  ground2 = createSprite(windowWidth/2 - 380,windowHeight/2 + 170,windowWidth,5);
  ground2.shapeColor = '#ff0000';
  ground3 = createSprite(windowWidth/2 + 250,windowHeight/2 - 50,windowWidth,5);
  ground3.shapeColor = '#ff0000';
  ground4 = createSprite(windowWidth/2 - 380,windowHeight/2 - 270,windowWidth,5);
  ground4.shapeColor = '#ff0000';

  topedge = createSprite(windowWidth/2,windowHeight/2 - 380,windowWidth,2);
  bottomedge = createSprite(windowWidth/2,windowHeight/2 + 380,windowWidth,2);
  leftedge = createSprite(0,windowHeight/2,2,windowHeight);
  rightedge = createSprite(windowWidth,windowHeight/2,2,windowHeight);

  invisibleGround = createSprite(windowWidth/2 - 380,windowHeight/2 + 140,windowWidth,5)
  invisibleGround.visible = false;
  invisibleGround2 = createSprite(windowWidth/2 + 250,windowHeight/2 - 70,windowWidth,5);
  invisibleGround2.visible = false;

  door = createSprite(windowWidth/2 - 730,windowHeight/2 - 330,10);
  door.addAnimation("door",door_img);
  door.scale = 0.5;

  germlast = createSprite(windowWidth/2,windowHeight/2 - 300,100,100);
  germlast.addAnimation("lastone",last_virus);
  germlast.scale = 0.35;
  germlast.visible = false;
  germlast.rotationSpeed = 10;

  germlast2 = createSprite(windowWidth/2,windowHeight/2 - 300,100,100);
  germlast2.addAnimation("lastone",last_virus);
  germlast2.scale = 0.35;
  germlast2.visible = false;
  germlast2.rotationSpeed = 7;

  germlast3 = createSprite(windowWidth/2,windowHeight/2 - 300,100,100);
  germlast3.addAnimation("lastone",last_virus);
  germlast3.scale = 0.35;
  germlast3.visible = false;
  germlast3.rotationSpeed = 12;

  man2 = createSprite(windowWidth/2,windowHeight/2 + 300,50,50);
  man2.addImage("front",man_img);
  man2.scale = 0.30;
  man2.visible = false;
}





function draw() 
{
  if(game === "ON")
  {
  background(bg);
  image(masks,windowWidth/2 - 300,windowHeight/2 - 250,400,150);
  image(stayathome,windowWidth/2,windowHeight/2,450,150);
  textSize(20);
  fill("white");
  text("If you touch a germ, you will be infected and it will be harder to move!!",windowWidth/2 - 200,windowHeight/2 + 300);
  text("If you touch a germ thrice, you will die!!",windowWidth/2 - 100,windowHeight/2);
  text("Beware! You might also feel the pull of germs sometimes!!",windowWidth/2 - 200,windowHeight/2 - 300);
  
  man.collide(ground);
  man.collide(ground2);
  man.collide(ground3);
  man.collide(ground4); 
  man.collide(topedge);
  man.collide(bottomedge);
  man.collide(leftedge);
  man.collide(rightedge);
  germ2.collide(invisibleGround);
  germ3.collide(invisibleGround2);
  germ3.collide(ground2);


  man2.collide(rightedge);
  man2.collide(leftedge);
  
  if(gameState === "PLAY")
  {

  if(keyDown("RIGHT_ARROW"))
  {
   man.changeAnimation("right",man_right);
   man.x += 15;          
  }
  if(keyDown("LEFT_ARROW"))
  {
    man.changeAnimation("left",man_left);
    man.x -= 15;
  }
  if(keyDown("UP_ARROW"))
  {        
    man.velocityY = -10;
  }
  }


  man.velocityY = man.velocityY + 0.8;
  germ2.velocityY = germ2.velocityY + 0.8;
  germ3.velocityY = germ3.velocityY + 0.8;
   

  if(man.collide(germ))
  {
    germ.x = windowWidth;
    germ.velocityX = -10;
    man.velocityX = 0;
    gameState = "INFECTED";
    death++;
  }
  if(man.collide(germ2))
  {
    germ2.x = windowWidth/2 - 700;
    germ2.velocityX = 10;
    man.velocityX = 0;
    death++;
    gameState = "INFECTED";
  }
  if(man.collide(germ3))
  {
    germ3.x = windowWidth;
    germ3.velocityX = -10;
    man.velocityX = 0;
    death++;
    gameState = "INFECTED";
  }
  if(germ.x < windowWidth/2 - 700)
  { 
    germ.x = windowWidth;
    germ.velocityX = -10;
  }
  if(germ2.y > windowHeight)
  {
    germ2.x = windowWidth/2 - 700;
    germ2.y = windowHeight/2;
  }
  if(germ3.y > windowHeight/2)
  {
    germ3.x = windowWidth;
    germ3.y = windowHeight/2 - 200;
  }
  if(death === 3)
  {
    game = "OFF";
  }

if(gameState === "INFECTED")
{
  
  if(keyDown("RIGHT_ARROW"))
  {
   man.changeAnimation("rightinfected",rightinf);
   man.x += 10;          
  }
  if(keyDown("LEFT_ARROW"))
  {
    man.changeAnimation("leftinfected",leftinf);
    man.x -= 10;
  }
  if(keyDown("UP_ARROW"))
  {        
    man.velocityY -= 10;
  }
 }

  if(man.x <= windowWidth/2 - 380 && man.y <= windowHeight/2 - 300)
  {
    gameState = "NEXT_LEVEL";
  }
  
  
  if(gameState === "NEXT_LEVEL")
  { 
    reset(); 
    fill("white");
    textSize(40);
    text("DODGE ALL THE GERMS!!",windowWidth/2,windowHeight/2);
    man2.setCollider("rectangle",0,0,200,250);
    man2.visible = true;
    germlast.visible = true;
    germlast.velocityY = 18;
    if(germlast.y > windowHeight)
    {
      germlast.y = windowHeight/2 - 380;
      var rand = random(windowWidth/2 - 200,windowWidth/2);
      germlast.x = rand;
      timer++;
    }
    if(germlast2.y > windowHeight)
    {
      germlast2.y = windowHeight/2 - 380;
      var rand2 = random(windowWidth/2 - 700,windowWidth/2 - 300);
      germlast2.x = rand2;
    }
    if(germlast3.y > windowHeight)
    {
      germlast3.y = windowHeight/2 - 380;
      var rand3 = random(windowWidth/2 + 100,windowWidth);
      germlast3.x = rand3;
    }
    if(keyDown("RIGHT_ARROW"))
    {
      man2.x += 15;          
    }
    if(keyDown("LEFT_ARROW"))
    {
      man2.x -= 15;
    }
    if(man2.collide(germlast))
    {
      game = "OFF";
    }
    if(man2.collide(germlast2))
    {
      game = "OFF";
    }
    if(man2.collide(germlast3))
    {
      game = "OFF";
    }
    if(timer === 20)
    {
      germlast.velocityY = 0;
      man2.velocityX = 0;
      germlast2.velocityY = 0;
      germlast3.velocityY = 0;
      germlast3.visible = false;
      germlast2.visible = false;
      germlast.visible = false;
      man2.visible = false;
      ground.visible = false;
      image(win,0,0,windowWidth,windowHeight);
    }
    if(timer === 5||timer === 6||timer === 7||timer === 8||timer === 9)
    {
      germlast.velocityY = 21;
      germlast2.visible = true;
      germlast2.velocityY = 18;
    }
    if(timer === 10||timer === 11|| timer === 12||timer === 13||timer === 14)
    {
      germlast.velocityY = 24;
      germlast2.velocityY = 21;
      germlast3.visible = true;
      germlast3.velocityY = 18;
    }
    if(timer === 15||timer === 16|| timer === 17|| timer === 18|| timer === 19)
    {
      germlast.velocityY = 27;
      germlast2.velocityY = 24;
      germlast3.velocityY = 21;
    }
  }
  drawSprites();
}
if(game === "OFF")
{
  image(gameOver,0,0,windowWidth,windowHeight);
}
}
function reset()
{
  background(bg2);
  ground2.destroy();
  ground3.destroy();
  ground4.destroy();
  germ.destroy();
  germ2.destroy();
  germ3.destroy();
  man.destroy();
  door.destroy();  
}