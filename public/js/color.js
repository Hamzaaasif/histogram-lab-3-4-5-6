window.onload = myDisplay();

// let cv=document.getElementById("mycanvas")
// let ctx=cv.getContext("2d");



    

let yAxis=false;
let activeColor='red';
function histogram(data)
{
    console.log("handlefiles"); 
    let W=1500;
    let H= W/2.8;
    const svg = d3.select('svg');
    //set the dimensons and and margins of graph
    const margin = {top: 20, right: 30, bottom: 30, left: 50};
    const width =W - margin.left - margin.right;
    const height =H -margin.top -margin.bottom;
    let q = document.querySelector('svg');
    q.style.width=W;
    q.style.height=H;
    if(yAxis){d3.selectAll("g.y-axis").remove();yAxis=false}
    function graphComponent(data, color)
    {
        d3.selectAll(".bar-"+color).remove();
        var data = Object.keys(data).map(function(key){return {freq:data[key], idx:+key}});
        
        var x =d3.scaleLinear()
                .range([0,width])
                .domain([0, d3.max(data, function(d){return d.idx;})]);

        var y=d3.scaleLinear()
            .range([height,0])
            .domain([0, d3.max(data,function(d) {return d.freq;})]);

        var g = svg.append("g")
           .attr("transform","translate("+margin.left+","+margin.top+")");
        if(!yAxis)
        {
            yAxis=true;
            g.append("g")
            .attr("class","y-axis")
            .attr("transform","translate("+ -2 + ",0")
            .call(d3.axisLeft(y).ticks(10).tickSizeInner(10).tickSizeOuter(2));
        }
        g.selectAll(".bar-"+color)
          .data(data)
          .enter().append("rect")
          .attr("class","bar-"+color)
          .attr("fill",color)
          .attr("x",function(d){return x(d.idx);})
          .attr("y",function(d){return y(d.freq);})
          .attr("width",2)
          .attr("opacity",1.0)
          .attr("height",function(d){return height - y(d.freq);})
    }
    graphComponent(data.gD,"green");
    graphComponent(data.bD,"blue");
    graphComponent(data.rD,"red");

}


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
