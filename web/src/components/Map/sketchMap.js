function sketch (p) {
    let graphics;
    let num = 1;
    let shouldDraw = true;
    let veins = []
    let six;
    let count = 0;
    let stepCount = 0;
    let blocks = [
        [10, 1],
    [9, 1],
    [8, 1],
    [7, 2],
    [6, 2],
    [5, 2],
    [4, 3],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
    [6, 6],
    [7, 6],
    [8, 6],
    [9, 6],
    [10, 7],
    [11, 7],
    [12, 7],
    [13, 7],
    [14, 7],
    [15, 8],
    [16, 8],
    [17, 8],
    [18, 9],
    [19, 9],
    [20, 10],
    [20, 11],
    [19, 12],
    [18, 12],
    [17, 12],
    [16, 13],
    [15, 13],
    [14, 12],
    [13, 12],
    [12, 12],
    [11, 12],
    [10, 13],
    [9, 13],
    [8, 13],
    [7, 13],
    [6, 14],
    [5, 14],
    [4, 14],
    [3, 15],
    [2, 15],
    [2, 16],
    [2, 17],
    [3, 18],
    [4, 18],
    [5, 19],
    [6, 19],
    [7, 18],
    [8, 18],
    [9, 18],
    [10, 19],
    [11, 19],
    [12, 20],
    [13, 20],
    [14, 20],
    [15, 21],
    [16, 21],
    [17, 21],
    [18, 22],
    [19, 22]];
    let extras = [

    ];
    let opacities = [];
    let indeces = [0, 9, 21,28, 43, 56,63]
    let locations = [
        "<a href='/exhibition/berlin'>Berlin<br><span>June 30 - Oct 1, 2023</span><span class='hidden-message'><br>more info→</span></a>",
        "<a href='/exhibition/hudson-valley'>Hudson Valley<br><span>Sep 05 - Oct 14, 2023</span><span class='hidden-message'><br>more info→</span></a>",
        "<a href='/exhibition/athens'>Athens<br><span>Oct 30 - Nov 20, 2023</span><span class='hidden-message'><br>more info→</span></a>",
        "<a href='/exhibition/palestine'>Palestine<br><span>Spring, 2024</span><span class='hidden-message'><br>more info→</span></a>",
        "<a href='/exhibition/bishkek'>Bishkek<br><span>Spring, 2024</span><span class='hidden-message'><br>more info→</span></a>",
        "<a href='/exhibition/sakha'>Online<br>with artists from Sakha<br><span>Spring, 2024</span><span class='hidden-message'><br>more info→</span></a>",
        "<a href='/exhibition/mexico'>Mexico<br><span>Summer, 2024</span><span class='hidden-message'><br>more info→</span></a>"
    ]
    let els = [

    ]
    p.setup = function(){
        let c;
        
        if(typeof window != `undefined`){
        
            if(window.innerWidth <= 768){
              c = p.createCanvas((window.innerWidth/1.2), (400)); 
            }else{
              c = p.createCanvas((window.innerWidth/1.38), (700)); 
            }

            p.noStroke();
           
            let loader = document.getElementById('loader');
            loader.classList.add('off')
        }
        p.frameRate(10)
        /* make labels */
        let traveling = p.createElement('h5', "<a href='/exhibition/traveling-works'>See Traveling Works<br><span>(works that will move throughout the exhibition sites)</span><span class='hidden-message'><br>more info→</span></a>");
        let fw = p.width/25;
        let fh = p.height/25;
        traveling.position(2.3 * fw , 23.5 * fh - fh);

        for(let i = 0; i < indeces.length; i++){
            let h5 = p.createElement('h5', locations[i]);
            let x = blocks[indeces[i]][0]
            let y = blocks[indeces[i]][1]
            if(i == 0){
                h5.position(x * fw + (fw * 1.5), y * fh - fh);
            }else if(i == 1){
                h5.position(x * fw - (fw * 2), y * fh + (fh * 1.5));
            }else if(i == 2){
                h5.position(x * fw + (fw * 1), y * fh - (fh * 4));
            }else if(i == 3){
                h5.position(x * (fw * 1.15), y * fh + (fh *0.5));
            }else if(i == 4){
                h5.position(x * fw - (fw * 1.5), y * fh - (fh * 3));
            }else if(i == 5){
                h5.position(x * fw + (fw * 0), y * fh - (fh * 4));
            }else if(i == 6){
                h5.position(x * (fw + (fw * 0.1)), y * fh - (fh * 1.5));
            }
            
            // h5.style("color","#1C1E33");
            h5.id("label"+i)
            els.push("label"+i);
        }
    }
    p.draw = function(){
        p.clear();

        if(count == blocks.length){
            count = 0; 
            extras = [];
        }else if(indeces.includes(count) && count == 63){
            for(let j=0;j<els.length;j++){
                if(j == indeces.indexOf(count)){
    
                    document.getElementById(els[j]).classList.add("on")
                }else{
    
                    document.getElementById(els[j]).classList.remove("on")
                }
            }
            if(stepCount == 50){
                stepCount = 0;
                count += 1;
           }else if(stepCount > 0){
            stepCount += 1
           } else if(stepCount == 0){
            stepCount += 1;
           }
        }else if(indeces.includes(count) ){
            // els[count].style("color","#1C1E33");
            for(let j=0;j<els.length;j++){
                if(j == indeces.indexOf(count)){
    
                    document.getElementById(els[j]).classList.add("on")
                }else{
    
                    document.getElementById(els[j]).classList.remove("on")
                }
            }
    
           if(stepCount == 10){
                stepCount = 0;
                count += 1;
           }else if(stepCount > 0){
            stepCount += 1
           } else if(stepCount == 0){
            stepCount += 1;
           }
        }else{
            count += 1;
        }
        drawBlocks()
        /* Utility functions */
           
    }
    function isArrayInArray(arr, item){
        let item_as_string = JSON.stringify(item);
        
        let contains = arr.some(function(ele){
            return JSON.stringify(ele) === item_as_string;
        });
        return contains;
    }
    function drawBlocks(){
        let fw = p.width/25;
        let fh = p.height/25;
        
        for(let i = 0; i < blocks.length; i++){
            let x = blocks[i][0]
            let y = blocks[i][1]
            
            if(indeces.includes(i)){
                p.noStroke()
                p.fill(28,30,51,255)        
            }else{
                if(count == i && i > 0){
                    p.stroke(28,30,51);
                    p.fill(28,30,51,255);
                    let rx = p.floor(p.random(-1,1))
                    let ry = p.floor(p.random(-1,1))
                    if(p.random([true,true,true,false])){
                        if(!isArrayInArray(blocks, [x + rx,y + ry]) && !isArrayInArray(extras, [x + rx,y + ry])){
                            extras.push([x + rx,y + ry])
                            opacities.push(p.floor(p.random(150,245)))
                        }
                        if(p.random([true,true])){
                            let rx2 = p.floor(p.random(-2,2))
                            let ry2 = p.floor(p.random(-2,2))
                            if(!isArrayInArray(blocks, [rx + rx2,ry + ry2]) && !isArrayInArray(extras, [rx + rx2,ry + ry2])){
                                extras.push([rx + rx2,ry + ry2])
                                opacities.push(p.floor(p.random(200,225)))
                            }
                            if(p.random([true,true])){
                                let rx3 = p.floor(p.random(-2,2))
                                let ry3 = p.floor(p.random(-2,2))
                                if(!isArrayInArray(blocks, [rx2 + rx3,ry2 + ry3]) && !isArrayInArray(extras, [rx2 + rx3,ry2 + ry3])){
                                    extras.push([rx2 + rx3,ry2 + ry3])
                                    opacities.push(p.floor(p.random(225,235)))
                                }
                                if(p.random([true,true])){
                                    let rx4 = p.floor(p.random(-2,2))
                                    let ry4 = p.floor(p.random(-2,2))
                                    if(!isArrayInArray(blocks, [rx3 + rx4,ry3 + ry4]) && !isArrayInArray(extras, [rx3 + rx4,ry3 + ry4])){
                                        extras.push([rx3 + rx4,ry3 + ry4])
                                        opacities.push(p.floor(p.random(235,245)))
                                    }
                                }
                            }
                        }
                    }
                    
                }else if (count > i) {
                    p.noStroke();
                    p.fill(200,200,200,80)
                    // fill(28,30,51,255);
                    // fill(28,30,51,255 -(abs(count - i) * 1));
                }else{
                    p.stroke(248,248,248)
                    p.fill(248,248,248)
                }
          
                
            }
           

            p.rect(x * fw,y *fh, fw, fh);
            
        }
        
        let miniExtras = []
        let miniOpacities = []
        let rx = 1;
        let ry = 22;
        miniExtras.push([rx,ry])
        miniOpacities.push(p.color(248,248,248,200))
        if(p.random([true,false])){
            let mini1 = p.floor(p.random(-1,1))
            let mini2 = p.floor(p.random(-1,1))
            miniExtras.push([rx + mini1,ry + mini2])
            miniOpacities.push(p.floor(p.random(225,235)))
            if(p.random([true,false])){
                let mini12 = p.floor(p.random(-1,1))
                let mini22 = p.floor(p.random(-1,1))
                miniExtras.push([mini1 + mini12,mini2 + mini22])
                miniOpacities.push(p.floor(p.random(225,235)))
                if(p.random([true,false])){
                    let mini123 = p.floor(p.random(-1,1))
                    let mini223 = p.floor(p.random(-1,1))
                    miniExtras.push([mini12 + mini123,mini22 + mini223])
                    miniOpacities.push(p.floor(p.random(225,235)))
                }
            }
        }
        for(let i = 0; i < miniExtras.length; i++){
            p.stroke(miniOpacities[i])
            p.fill(miniOpacities[i])
            p.rect(miniExtras[i][0] * fw, miniExtras[i][1] * fh, fw, fh)
        }
        
        for(let i = 0; i < 25; i++){
            for(let j = 0; j < 25; j++){
                

                if(!isArrayInArray(blocks, [i,j]) && !isArrayInArray(extras, [i,j]) && !isArrayInArray(miniExtras, [i,j])){
                    p.stroke(245,245,245);
                    p.fill(245,245,245);
                    p.rect(i * fw, j * fh, fw, fh);
                }
            }
        }
        for(let i = 0; i < extras.length; i++){
            p.noStroke()
            p.fill(248,248,248,opacities[i]);
            p.rect(extras[i][0] * fw,extras[i][1] * fh, fw, fh);
        }
    
    }

    p.windowResized = function() {
        let c;
        if(window.innerWidth <= 768){
            c = p.createCanvas((window.innerWidth/1.2), (400)); 
          }else{
            c = p.createCanvas((window.innerWidth/1.38), (700)); 
          }
        p.clear()
    }
}

export default sketch