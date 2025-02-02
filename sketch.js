let MyCanvas1, MyCanvas2, scratchBg;
let ScratchCard, ScratchOffLayer, Kugua_BW, Kugua_Gold, UnclePenguin;
let AwardsX = [];
let AwardsY = [];
let Icon    = [];
let Money   = [];
let FixVal  = 0;
let CircleCenterX, CircleCenterY = 0;

function preload()
{
  ScratchCard     = loadImage("ScratchCard.jpg");
  ScratchOffLayer = loadImage("ScratchOffLayer.png");
  Kugua_BW        = loadImage("Kugua_BW.png");
  Kugua_Gold      = loadImage("Kugua_Gold.png");
  UnclePenguin    = loadImage("UnclePenguin.png");
}

function setup() 
{
  MyCanvas1 = createCanvas(windowWidth, windowHeight);
  scratchBg = createGraphics(width, height);

  frameRate(30);

  background(245, 86, 80);
  if(windowHeight/windowWidth > 4/3)
  {
    FixVal = width*4/3;
    MyCanvas2 = createGraphics(width, width*4/3);
    MyCanvas2.image(ScratchOffLayer, 0, 0, width, width*4/3);

    scratchBg.image(ScratchCard, 0, height/2-(width*4/3/2), width, width*4/3);

    CircleCenterX = width/2;
    CircleCenterY = height/2+width*0.125;
  }
  else
  {
    FixVal = height*3/4;
    MyCanvas2 = createGraphics(height*3/4, height);
    MyCanvas2.image(ScratchOffLayer, 0, 0, height*3/4, height);

    scratchBg.image(ScratchCard, width/2-(height*3/4/2), 0, height*3/4, height);

    CircleCenterX = width/2;
    CircleCenterY = height*0.3888+FixVal*0.5388/2;
  }

  for(let i=0; i<5; i++)
  {
    let angleStep = TWO_PI / 5;
    let angle = random(angleStep*i+radians(20), angleStep*i+radians(72)-radians(20));
    if(windowHeight/windowWidth > 4/3)
    {
      AwardsX[i] = CircleCenterX + FixVal*0.18 * cos(angle);
      AwardsY[i] = CircleCenterY + FixVal*0.18 * sin(angle);
    }
    else
    {
      AwardsX[i] = CircleCenterX + FixVal*0.25 * cos(angle);
      AwardsY[i] = CircleCenterY + FixVal*0.25 * sin(angle);
    }
    
    let RanMon = round(random(0, 10000));
    if(RanMon<=2000) { Icon[i] = "苦瓜"; } else { Icon[i] = "鵝叔"; }
    RanMon = round(random(0, 10000));
    if(RanMon<=6000) 
    { 
      let RanMon2 = round(random(1, 9));
      Money[i] = "$"+RanMon2*100;
    }
    else if(RanMon>6000 && RanMon<=9999)
    {
      let RanMon2 = round(random(1, 9));
      Money[i] = "$"+RanMon2+",000";
    }
    else
    { 
      Money[i] = "噗幣";
      Icon[i] = "金苦瓜";
    }

    if(Icon[i] == "苦瓜")
    {
      scratchBg.image(Kugua_BW, AwardsX[i]-FixVal*0.05, AwardsY[i]-FixVal*0.05, FixVal*0.1, FixVal*0.1);
    }
    else if(Icon[i] == "鵝叔")
    {
      scratchBg.image(UnclePenguin, AwardsX[i]-FixVal*0.05, AwardsY[i]-FixVal*0.05, FixVal*0.1, FixVal*0.1);
    }
    else
    {
      scratchBg.image(Kugua_Gold, AwardsX[i]-FixVal*0.05, AwardsY[i]-FixVal*0.05, FixVal*0.1, FixVal*0.1);
    }
    scratchBg.textAlign(CENTER, CENTER); scratchBg.textStyle(BOLD); scratchBg.textSize(FixVal*0.04); scratchBg.fill(0); scratchBg.noStroke(); scratchBg.text(Money[i], AwardsX[i], AwardsY[i]+FixVal*0.07);
  }
}

function draw() 
{
  let isErasing = false;
  if (mouseIsPressed || touches.length > 0)
  {
    MyCanvas2.erase();
    MyCanvas2.strokeWeight(100);
    isErasing = true;

    if(mouseIsPressed)
    {
      MyCanvas2.line(mouseX-getCanvasX(), mouseY-getCanvasY(), pmouseX-getCanvasX(), pmouseY-getCanvasY());
    }
    if(touches.length > 0) 
    {
      for (let i = 0; i < touches.length; i++) 
      {
        MyCanvas2.line(touches[i].x-getCanvasX(), touches[i].y-getCanvasY(), pmouseX-getCanvasX(), pmouseY-getCanvasY());
      }
    }
  }
  if (isErasing) { MyCanvas2.noErase(); }

  image(scratchBg, 0, 0);

  if(windowHeight/windowWidth > 4/3)
  {
    image(MyCanvas2, 0, height/2-(width*4/3/2), width, width*4/3);
    noFill(); strokeWeight(12); stroke(250, 185, 95);
    ellipse(CircleCenterX, CircleCenterY, width*0.76, width*0.76);
  }
  else
  {
    image(MyCanvas2, width/2-(height*3/4/2), 0, height*3/4, height);
    noFill(); strokeWeight(12); stroke(250, 185, 95);
    ellipse(CircleCenterX, CircleCenterY, FixVal*0.76, FixVal*0.76);
  }
  //textAlign(CENTER, CENTER); textStyle(BOLD); textSize(FixVal*0.04); fill(255); noStroke(); text("30W", width/2, height-50);
}
  

function getCanvasX() 
{
  if (windowHeight/windowWidth > 4/3) return 0;
  return width/2 - (height*3/4/2);
}

function getCanvasY() 
{
  if (windowHeight/windowWidth > 4/3) return height/2 - (width * 4/3/2);
  return 0;
}

function windowResized() 
{
  resizeCanvas(windowWidth, windowHeight);
  background(245, 86, 80);
  scratchBg = createGraphics(width, height);
  if(windowHeight/windowWidth > 4/3)
  {
    FixVal = width*4/3;
    MyCanvas2 = createGraphics(width, width*4/3);
    MyCanvas2.image(ScratchOffLayer, 0, 0, width, width*4/3);
    scratchBg.image(ScratchCard, 0, height/2-(width*4/3/2), width, width*4/3);
    CircleCenterX = width/2;
    CircleCenterY = height/2+width*0.125;
  }
  else
  {
    FixVal = height*3/4;
    MyCanvas2 = createGraphics(height*3/4, height);
    MyCanvas2.image(ScratchOffLayer, 0, 0, height*3/4, height);
    scratchBg.image(ScratchCard, width/2-(height*3/4/2), 0, height*3/4, height);
    CircleCenterX = width/2;
    CircleCenterY = height*0.3888+FixVal*0.5388/2;
  }

  for(let i=0; i<5; i++)
  {
    
    let angleStep = TWO_PI / 5;
    let angle = random(angleStep*i+radians(21), angleStep*i+radians(72)-radians(21));
    if(windowHeight/windowWidth > 4/3)
    {
      AwardsX[i] = CircleCenterX + FixVal*0.18 * cos(angle);
      AwardsY[i] = CircleCenterY + FixVal*0.18 * sin(angle);
    }
    else
    {
      AwardsX[i] = CircleCenterX + FixVal*0.25 * cos(angle);
      AwardsY[i] = CircleCenterY + FixVal*0.25 * sin(angle);
    }

    if(Icon[i] == "苦瓜")
    {
      scratchBg.image(Kugua_BW, AwardsX[i]-FixVal*0.05, AwardsY[i]-FixVal*0.05, FixVal*0.1, FixVal*0.1);
    }
    else if(Icon[i] == "鵝叔")
    {
      scratchBg.image(UnclePenguin, AwardsX[i]-FixVal*0.05, AwardsY[i]-FixVal*0.05, FixVal*0.1, FixVal*0.1);
    }
    else
    {
      scratchBg.image(Kugua_Gold, AwardsX[i]-FixVal*0.05, AwardsY[i]-FixVal*0.05, FixVal*0.1, FixVal*0.1);
    }
    scratchBg.textAlign(CENTER, CENTER); scratchBg.textStyle(BOLD); scratchBg.textSize(FixVal*0.04); scratchBg.fill(0); scratchBg.noStroke(); scratchBg.text(Money[i], AwardsX[i], AwardsY[i]+FixVal*0.07);
  }
}

document.body.addEventListener('touchmove', function(e) 
{
  e.preventDefault();
}, { passive: false });