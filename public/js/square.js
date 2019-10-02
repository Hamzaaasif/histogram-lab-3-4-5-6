class square
{
  constructor(origin , length , color)
  {
    this.origin = origin;
    this.length = length;
    this.color = color;
  }

  draw (ctx)
  {
    ctx.beginPath();
    ctx.moveTo(this.origin.x , this.origin.y);

    ctx.lineTo(this.origin.x + this.length , this.origin.y);
    ctx.lineTo(this.origin.x + this.length , this.origin.y+ this.length);
    ctx.lineTo(this.origin.x  , this.origin.y + this.length);
    ctx.lineTo(this.origin.x , this.origin.y);

    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
}