document.getElementById("imageFile").addEventListener("change",handleFiles);

var fitImage = function (imageobj) //fit image on canvas Aspect ratio
    {
        imageAspectRatio = imageobj.width/imageobj.height;
        canvasAspectRatio = cvs.width/cvs.height;  
        rendableheight ,rendablewidth , xStart , yStart;
        
        if (imageAspectRatio < canvasAspectRatio)
        {
            rendableheight = cvs.height;
            rendablewidth = imageobj.width *(rendableheight/imageobj.height);
            xStart = (cvs.width - rendablewidth)/2;
            yStart = 0;
        }

        if (imageAspectRatio > canvasAspectRatio)
        {
            rendablewidth = cvs.width;
            rendableheight = imageobj.height *(rendablewidth/imageobj.width);
            xStart = 0;
            yStart = (cvs.height - rendableheight)/2;
        }

        else
        {
            rendableheight = cvs.height;
            rendablewidth=cvs.width;
            xStart=0;
            yStart=0;
        }
        calcAndGraph(imageobj);
    }

function calcAndGraph(img) //get image data and and retun RGB data 
  {
    let rD={},gD={},bD={},aD={};
    ctx.clearRect(0,0,cvs.width,cvs.height);
    ctx.drawImage(img , xStart ,yStart ,rendablewidth,rendableheight );
    const iD = ctx.getImageData(xStart ,yStart ,rendablewidth,rendableheight).data;
    
    //let pixelSum={};
    for (var i=0; i<256; i++) { rD[i]=0; gD[i]=0; bD[i]=0;aD[i]=0; }
   // for(var i=0;i<256;i++) {pixelSum[i]=0; }
    for (var i=0;i<iD.length;i+=4)
{
    rD[iD[i]]++;
    gD[iD[i+1]]++;
    bD[iD[i+2]]++;
    aD[iD[i+3]]++;
}
  histogram({rD,gD,bD,aD});

}

var  drawAxes = function ()  //draw x and uy axis 
{
  ctx.lineWidth = 5;
  ctx.strokeStyle = "green";
  ctx.beginPath();
  ctx.moveTo(xStart , yStart+rendableheight);
  ctx.lineTo(xStart+rendablewidth , yStart+rendableheight);
  ctx.closePath();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(xStart , yStart+rendableheight);
  ctx.lineTo(xStart , yStart);
  ctx.closePath();
  ctx.stroke();
}

function histogram(data)  //draw hstogram
{

  function size_dict(d){c=0 ; for(i in d) ++c; return c}
  drawAxes();

  // a= new point(320 , 240);
  // console.log(a, "xx: ",a.x,"yy: ",a.y);
  // a.drawPoint(ctx);
  //   // LERP for drawing points (lerp(t) = A + (B-A)*t)

  maxRed=Math.max(data.rD[0]);
  maxGreen=Math.max(data.gD[0]);
  maxBlue=Math.max(data.bD[0]);

  console.log("Max Red",data.rD[0]);

  source = new point (xStart  , yStart+rendableheight,0,"green");  //A
  destination = new point(xStart+rendablewidth,yStart+rendableheight,0,"green"); //B

  numPoints = 255;
  tMin = 0.0; tMax= 1.0; delT =(tMax- tMin)/255;
  var t = tMin;

  let lerpX = {}, lerpY={}, redHeight={};

  for(var i =0 ; i<numPoints ;i++) //l(t)=source + (dest-source)*t
  {
    lerpX[i] = Math.round((source.x + (destination.x - source.x)*t ) );
    lerpY[i] = Math.round((source.y + (destination.y - source.y)*t ) );

    redHeight=(data.rD[i]/maxRed)*100;
    greenHeight=(data.gD[i]/maxGreen)*100;
    blueHeight=(data.bD[i]/maxBlue)*100; 

    t+=delT; 

    tweenRed = new point (lerpX[i] , lerpY[i],redHeight,"red");
    tweenGreen = new point (lerpX[i] , lerpY[i],greenHeight,"green");
    tweenBlue = new point (lerpX[i] , lerpY[i],blueHeight,"blue");

    //console.log(tween);
    tweenRed.drawPoint(ctx);
    tweenGreen.drawPoint(ctx);
    tweenBlue.drawPoint(ctx);
    
  }
}


function handleFiles()
{
//console.log("handlefiles");  
var theGoods = document.getElementById('imageFile').files[0];

var reader = new FileReader();

var image = new Image();
image.crossOrigin= "Anonymous";
reader.addEventListener("load",function(){image.src=reader.result;},false);

image.onload = function()
{
  fitImage(image);
}
if(theGoods)
{
  reader.readAsDataURL(theGoods);
}
}

