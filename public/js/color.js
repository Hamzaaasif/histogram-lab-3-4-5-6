window.onload = myDisplay();
    

let yAxis=false;
let activeColor='red';
function amplify(e)
{
    const colors = ['red','green','blue'];
    const boost=e.target.id;
    if(boost=='blend')
    {
        document.querySelectorAll('rect').forEach(bar=>{
            bar.style.opacity=0.7;
        });
    }
    else
    {
        activeColor=boost;
        const deaden = colors.filter(e=>e!==boost);
        document.querySelectorAll('.bar-'+boost).forEach(bar=>{
            bar.style.opacity=1.0;
        });
        deaden.forEach(color=>{
            document.querySelectorAll('.bar-'+color).forEach(bar=>{
                bar.style.opacity=0.2;
            });
        });
    }
}


function myInit()
{  
    //alert("inside myInit Function");
    document.getElementById("imageFile").addEventListener("change",handleFiles);
    document.querySelectorAll("button.focuser").forEach(button=>{
        button.addEventListener("click",amplify);
        myDisplay();
    });
    //myDisplay();
}


document.addEventListener("DOMContentLoaded",function(event){
    // console.log("Dom loaded");
    // var image=new Image();
    // image.onload=function(){calcAndGraph(image);}
    //  image.src='download.jpg';
    myInit();
})


function myDisplay()
{
    console.log("My display Function");
    //alert("inside myDisplay Function");
    // var cvs = document.getElementById('mycanvas');
    // var ctx = cvs.getContext('2d');

    // var columns = 4;
    // var rows = 4;
    
    // var tileWidth = Math.round(cvs.width/columns);
    // var tileheight = Math.round(cvs.height/rows);

    var image1 = new Image();
    var image2 = new Image();
    image1.src= 'images/basketball.jpg';
    image2.src='images/download.jpg';

    image1.onload = function()
    {

        for(i = 0 ; i < 5 ; i++ )
        {
            for(j=0 ; j < 5 ; j++)
            {
           // console.log(i , j);
            xIndex = i, yIndex = j;
            x = xIndex * tileWidth;
            y =yIndex*tileHeight;
            ctx.drawImage(image1,x,y,tileWidth,tileHeight);
            }
        }
        handleFiles();
        // xIndex = 1.5, yIndex = 1.5;
        // x = xIndex * tileWidth, 
        // y =yIndex*tileheight;
        // ctx.drawImage(image1,x,y,tileWidth,tileheight);

        // xIndex=0 , yIndex=0;
        // x=xIndex*tileWidth,y=yIndex*tileheight;
        // ctx.drawImage(image2,x,y,tileWidth,tileheight);

    }


}
