document.getElementById("imageFile").addEventListener("change",handleFiles);

var fitImage = function (imageobj)
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

function calcAndGraph(img)
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
console.log(ctx.getImageData(xStart ,yStart ,rendablewidth,rendableheight).data);

  histogram({rD,gD,bD});

}

// function histogram(data)
// {
//   console.log("Insilde histogram");
// }

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

