class point
{
  constructor(x,y,h,color)
  {
    this.x = x;
    this.y = y; 
    this.h=h;
    this.color=color;
  }

  getXY()
  {
    return this.X + " " + this.y;
  }
  
  drawPoint(ctx)
  {
    // square = new square(new point(this.x , this.y), 10 , "red");
    // square.draw(ctx);

    // var a = 0 , b =255;

   // var h = Math.floor(a+Math.random() * (b-a));
    var f =true;
    console.log("Color: ",this.color);
    console.log("Height: ",this.h);

    var rect = new Rectangle(new point(this.x-3 , this.y),
                             new point(this.x+3 , this.y),
                             new point(this.x+3 , this.y- this.h),
                             new point(this.x-3 , this.y-this.h)
                             ,this.color,f);

    var rect2 = new Rectangle(new point(this.x-1 , this.y),
                             new point(this.x+1 , this.y),
                             new point(this.x+1 , this.y-this.h),
                             new point(this.x-1 , this.y-this.h)
                             ,"black",!f);
    rect.draw(ctx);
    rect2.draw(ctx);
                             
  }
}