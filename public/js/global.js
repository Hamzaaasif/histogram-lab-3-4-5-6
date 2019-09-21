var cvs ;
var ctx;
var columns , rows ;
var tileWidth , tileHeight;

cvs = document.getElementById("mycanvas");
ctx = cvs.getContext('2d');

//document.getElementById("imageFile").addEventListener("change",handleFiles);

var imageAspectRatio , canvasAspectRatio ,rendableheight ,rendablewidth , xStart , yStart;
columns = 4 ,rows = 4 ;
tileWidth = Math.round(cvs.width / columns);
tileHeight = Math.round(cvs.height / rows);