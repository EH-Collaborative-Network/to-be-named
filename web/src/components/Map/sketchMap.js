import one from "./1.png"

function sketch (p) {
    let img;
    let graphics;
    let num = 1;
    let shouldDraw = true;
    let veins = []

   
    p.setup = function() {
        let c;
        
        if(typeof window != `undefined`){
            if(window.innerWidth <= 768){
              c = p.createCanvas((window.innerWidth), (window.innerHeight)); 
            }else{
              c = p.createCanvas((window.innerWidth), (window.innerHeight)); 
            }
            p.background(0)
            p.noStroke();
            p.image(img,0,0,window.innerWidth,window.innerHeight)
        }
        

    }
    
    p.preload = function() {
        if(typeof window != `undefined`){
          let imgs = document.querySelectorAll(".src");
          one = imgs[imgs.length-1].src
        }
        img = p.loadImage(one);
    }

    p.draw = function() {
        p.drawingContext.globalCompositeOperation = 'destination-out';


        if(typeof window != `undefined`){
            if(shouldDraw){

                for(let i = 0; i < veins.length;i++){
                veins[i].show()
                }
                
            }
        }     
    }
    p.mousePressed = function(){
        shouldDraw = true;
        //could be something like erase()
    }

    p.mouseMoved = function(){
        if(p.random([true,false,false])){
            let x = p.random(p.mouseX - 10, p.mouseX + 10);
            let y = p.random(p.mouseY - 10, p.mouseY + 10);
            veins.push(new Vein(x,y))
          }
        if(p.random([false,false,false])){
        veins.splice(p.floor(p.random(0,veins.length-1)), 1)
        }
    }
    p.touchMoved = function(){
        if(p.random([true,false,false])){
            let x = p.random(p.mouseX - 10, p.mouseX + 10);
            let y = p.random(p.mouseY - 10, p.mouseY + 10);
            veins.push(new Vein(x,y))
          }
          if(p.random([false,false,false])){
            veins.splice(p.floor(p.random(0,veins.length-1)), 1)
            }
    }
    p.windowResized = function() {
        if(window?.innerWidth <= 768){
            p.resizeCanvas((window?.innerWidth), (window?.innerHeight));
        }else{
            p.resizeCanvas((window?.innerWidth), (window?.innerHeight));    
        }
        p.blendMode(p.BLEND);
        p.background("#00fff");
        p.image(img,0,0,window.innerWidth,window.innerHeight);

    }
    class Vein{
        constructor(x,y){
          this.x = x;
          this.y = y;
          this.count = 0;
        }
        show(){
            if(typeof window != `undefined`){
            let fw = p.windowWidth/25;
            let fh = p.windowHeight/25;
            let xf = p.floor(p.map(this.x,0, p.windowWidth, 0, 25));
            let yf = p.floor(p.map(this.y,0, p.windowHeight, 0, 25));
            xf = xf + p.floor(p.random(-2,2))
            yf = yf + p.floor(p.random(-2,2))
          if(this.count == 0){

                this.x = fw * xf;
                this.y = fh * yf;

            
            p.rect(this.x,this.y, fw, fh);
  
          }else if(this.count < 100 ){
            if(p.random([true,false,false])){
                this.x = this.x + (fw * p.floor(p.random(-2,2)));
                this.y = this.y + (fh * p.floor(p.random(-2,2)));
            }
            p.rect(this.x,this.y, fw, fh);
          }
          this.count = this.count + 1
        }
        }
      }

  };
  
  
  export default sketch