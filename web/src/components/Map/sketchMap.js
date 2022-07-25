import map from "./map.png"
import * as p5 from "p5";
/* SCREEN POSITION FUNCTION FROM BOHNACKER */
// Acknowledgement to Thibault Coppex (@tcoppex) for the 3d-modelview-projection-math.
// Had to adjust it a bit maybe because p5js changed the way webgl is handled since 2016.

// See: https://editor.p5js.org/bohnacker/sketches/nUk3bVW7b on how to use it


function addScreenPositionFunction(p5Instance) {
	let p = p5Instance || this;
    
	// find out which context we're in (2D or WEBGL)
	const R_2D = 0;
	const R_WEBGL = 1;
	let context = getObjectName(p._renderer.drawingContext).search("2D") >= 0 ? R_2D : R_WEBGL;

	// the stack to keep track of matrices when using push and pop
	if (context == R_2D) {
		p._renderer.matrixStack = [new p5.Matrix()];
	}

	// replace all necessary functions to keep track of transformations

	if (p.draw instanceof Function) {
		let drawNative = p.draw;
		p.draw = function(...args) {
			if (context == R_2D) p._renderer.matrixStack = [new p5.Matrix()];
			drawNative.apply(p, args);
		};
	}


	if (p.resetMatrix instanceof Function) {
		let resetMatrixNative = p.resetMatrix;
		p.resetMatrix = function(...args) {
			if (context == R_2D) p._renderer.matrixStack = [new p5.Matrix()];
			resetMatrixNative.apply(p, args);
		};
	}

	if (p.translate instanceof Function) {
		let translateNative = p.translate;
		p.translate = function(...args) {
			if (context == R_2D) last(p._renderer.matrixStack).translate(args);
			translateNative.apply(p, args);
		};
	}

	if (p.rotate instanceof Function) {
		let rotateNative = p.rotate;
		p.rotate = function(...args) {
			if (context == R_2D) {
				let rad = p._toRadians(args[0]);
				last(p._renderer.matrixStack).rotateZ(rad);
			}
			rotateNative.apply(p, args);
		};
	}

	if (p.rotateX instanceof Function) {
		let rotateXNative = p.rotateX;
		p.rotateX = function(...args) {
			if (context == R_2D) {
				let rad = p._toRadians(args[0]);
				last(p._renderer.matrixStack).rotateX(rad);
			}
			rotateXNative.apply(p, args);
		};
	}
	if (p.rotateY instanceof Function) {
		let rotateYNative = p.rotateY;
		p.rotateY = function(...args) {
			if (context == R_2D) {
				let rad = p._toRadians(args[0]);
				last(p._renderer.matrixStack).rotateY(rad);
			}
			rotateYNative.apply(p, args);
		};
	}
	if (p.rotateZ instanceof Function) {
		let rotateZNative = p.rotateZ;
		p.rotateZ = function(...args) {
			if (context == R_2D) {
				let rad = p._toRadians(args[0]);
				last(p._renderer.matrixStack).rotateZ(rad);
			}
			rotateZNative.apply(p, args);
		};
	}

	if (p.scale instanceof Function) {
		let scaleNative = p.scale;
		p.scale = function(...args) {
			if (context == R_2D) {
				let m = last(p._renderer.matrixStack);
				let sx = args[0];
				let sy = args[1] || sx;
				let sz = context == R_2D ? 1 : args[2];
				m.scale([sx, sy, sz]);
			}
			scaleNative.apply(p, args);
		};
	}

	// Help needed: don't know what transformation matrix to use 
	// Solved: Matrix multiplication had to be in reversed order. 
	// Still, this looks like it could be simplified.

	if (p.shearX instanceof Function) {
		let shearXNative = p.shearX;
		p.shearX = function(...args) {
			if (context == R_2D) {
				let rad = p._toRadians(args[0]);
				let stack = p._renderer.matrixStack;
				let m = last(stack);
				let sm = new p5.Matrix();
				sm.mat4[4] = Math.tan(rad);
				sm.mult(m);
				stack[stack.length - 1] = sm;
			}
			shearXNative.apply(p, args);
		};
	}

	if (p.shearY instanceof Function) {
		let shearYNative = p.shearY;
		p.shearY = function(...args) {
			if (context == R_2D) {
				let rad = p._toRadians(args[0]);
				let stack = p._renderer.matrixStack;
				let m = last(stack);
				let sm = new p5.Matrix();
				sm.mat4[1] = Math.tan(rad);
				sm.mult(m);
				stack[stack.length - 1] = sm;
			}
			shearYNative.apply(p, args);
		};
	}


	if (p.applyMatrix instanceof Function) {
		let applyMatrixNative = p.applyMatrix;
		p.applyMatrix = function(...args) {
			if (context == R_2D) {
				let stack = p._renderer.matrixStack;
				let m = last(stack);
				let sm = new p5.Matrix();
				sm.mat4[0] = args[0];
				sm.mat4[1] = args[1];
				sm.mat4[4] = args[2];
				sm.mat4[5] = args[3];
				sm.mat4[12] = args[4];
				sm.mat4[13] = args[5];
				sm.mult(m);
				stack[stack.length - 1] = sm;
			}
			applyMatrixNative.apply(p, args);
		};
	}


	if (p.push instanceof Function) {
		let pushNative = p.push;
		p.push = function(...args) {
			if (context == R_2D) {
				let m = last(p._renderer.matrixStack);
				p._renderer.matrixStack.push(m.copy());
			}
			pushNative.apply(p, args);
		};
	}
	if (p.pop instanceof Function) {
		let popNative = p.pop;
		p.pop = function(...args) {
			if (context == R_2D) p._renderer.matrixStack.pop();
			popNative.apply(p, args);
		};
	}



	p.screenPosition = function(x, y, z) {
		if (x instanceof p5.Vector) {
			let v = x;
			x = v.x;
			y = v.y;
			z = v.z;
		} else if (x instanceof Array) {
			let rg = x;
			x = rg[0];
			y = rg[1];
			z = rg[2] || 0;
		}
		z = z || 0;

		if (context == R_2D) {
			let m = last(p._renderer.matrixStack);
			// probably not needed:
			// let mInv = (new p5.Matrix()).invert(m);

			let v = p.createVector(x, y, z);
			let vCanvas = multMatrixVector(m, v);
			// console.log(vCanvas);
			return vCanvas;

		} else {
			let v = p.createVector(x, y, z);

			// Calculate the ModelViewProjection Matrix.
			let mvp = (p._renderer.uMVMatrix.copy()).mult(p._renderer.uPMatrix);

			// Transform the vector to Normalized Device Coordinate.
			let vNDC = multMatrixVector(mvp, v);

			// Transform vector from NDC to Canvas coordinates.
			let vCanvas = p.createVector();
			vCanvas.x = 0.5 * vNDC.x * p.width;
			vCanvas.y = 0.5 * -vNDC.y * p.height;
			vCanvas.z = 0;

			return vCanvas;
		}

	}


	// helper functions ---------------------------

	function last(arr) {
		return arr[arr.length - 1];
	}

	function getObjectName(obj) {
		var funcNameRegex = /function (.{1,})\(/;
		var results = (funcNameRegex).exec((obj).constructor.toString());
		return (results && results.length > 1) ? results[1] : "";
	};


	/* Multiply a 4x4 homogeneous matrix by a Vector4 considered as point
	 * (ie, subject to translation). */
	function multMatrixVector(m, v) {
		if (!(m instanceof p5.Matrix) || !(v instanceof p5.Vector)) {
			print('multMatrixVector : Invalid arguments');
			return;
		}

		var _dest = p.createVector();
		var mat = m.mat4;

		// Multiply in column major order.
		_dest.x = mat[0] * v.x + mat[4] * v.y + mat[8] * v.z + mat[12];
		_dest.y = mat[1] * v.x + mat[5] * v.y + mat[9] * v.z + mat[13];
		_dest.z = mat[2] * v.x + mat[6] * v.y + mat[10] * v.z + mat[14];
		var w = mat[3] * v.x + mat[7] * v.y + mat[11] * v.z + mat[15];

		if (Math.abs(w) > Number.EPSILON) {
			_dest.mult(1.0 / w);
		}

		return _dest;
	}

}
/* END SCREEN POSITION FUNCTION FROM BOHNACKER*/
function sketch (p) {
    let theta = 0;
    let speed = .0002;
    let baseDiameter = 7;
    let pulseAmplitude = 1;
    let locations = [
        ["Al Quds Bard, Palestine", 403, 162, [96.68432985247617, -99.77048875758591, -143.8679600677302], "/partner/alquds-bard-college"],
        ["American University of Central Asia, Kyrgyzstan", 301.6666564941406, 131, [141.213347502286, -132.60815996037303, -49.737977432971014], "/partner/american-university-of-central-asia"],
        ["Arizona State University, USA", 814, 154, [-148.68833112741504, -115.33449198769623, 67.74758404905829], "/partner/arizona-state-university"],
        ["Bard College Annandale, USA", 706, 134, [-146.4091932336337, -129.07706684766626, -43.628648279308514], "/partner/bard-annandale"],
        ["Bard College Berlin, Germany", 463.6666564941406, 104, [20.51435084614953, -152.73109605144458, -127.48479794973788], "/partner/bard-berlin"],
        ["Birkbeck College at the University of London, UK", 500.6666564941406, 107, [9.43606576466018e-15, -154.10264855515788, -127.48479794973788], "/partner/birkbeck-college"],
        ["Central European University, Hungary/Austria", 463, 113, [32.72633202732323, -146.40919323363363, -132.2623730647304], "/partner/central-european-university"],
        ["European Humanities University, Lithuania", 437.6666564941406, 103, [45.1417092130399, -155.3787822607202, -117.5570504584946], "/partner/european-humanities-university"],
        ["Hampton University, USA", 713, 145, [-155.231838951202, -120.41015693700061, -37.47626291714492], "/partner/hampton-university"],
        ["Recovering Voices, Smithsonian Institution, USA", 711.6666564941406, 139, [-151.37306697925533, -125.22669168775046, -37.47626291714492], "/partner/recovering-voices"],
        ["Universidad de Los Andes, Colombia", 704, 237, [-190.2077605874666, -17.979927081801367, -59.14161000880932], "/partner/universidad-de-los-andes"],
        ["University of Thessaly, Greece", 473,140, [62.15557654316519, -121.98718749934548, -145.79372548428228], "/partner/university-of-thessaly"]
    ]
    let sensitivityZoom = 0
    
    
    p.orbitControl = function(sensitivityX, sensitivityY) {
        this._assert3d('orbitControl');
        // p.prototype._validateParameters('orbitControl', arguments);
    
        const mouseInCanvas =
            this.mouseX < this.width &&
            this.mouseX > 0 &&
            this.mouseY < this.height &&
            this.mouseY > 0;
        if (!mouseInCanvas) return;
    
        const cam = this._renderer._curCamera;
    
        if (typeof sensitivityX === 'undefined') {
            sensitivityX = 1;
        }
        if (typeof sensitivityY === 'undefined') {
            sensitivityY = sensitivityX;
        }
    
    
        if (this.contextMenuDisabled !== true) {
            this.canvas.oncontextmenu = () => false;
            this._setProperty('contextMenuDisabled', true);
        }
    
        if (this.wheelDefaultDisabled !== true) {
            this.canvas.onwheel = () => false;
            this._setProperty('wheelDefaultDisabled', true);
        }
    
        const scaleFactor = this.height < this.width ? this.height : this.width;
    
        if (this._mouseWheelDeltaY !== this._pmouseWheelDeltaY) {
            if (this._mouseWheelDeltaY > 0) {
                this._renderer._curCamera._orbit(0, 0, sensitivityZoom * scaleFactor);
            } else {
                this._renderer._curCamera._orbit(0, 0, -sensitivityZoom * scaleFactor);
            }
        }
    
        if (this.mouseIsPressed) {
            
            if (this.mouseButton === this.LEFT) {
                const deltaTheta = -sensitivityX * (this.mouseX - this.pmouseX) / scaleFactor;
                const deltaPhi =
                    sensitivityY * (this.mouseY - this.pmouseY) / scaleFactor;
                this._renderer._curCamera._orbit(deltaTheta, deltaPhi, 0);
            } else if (this.mouseButton === this.RIGHT) {
                const local = cam._getLocalAxes();
    
                const xmag = Math.sqrt(local.x[0] * local.x[0] + local.x[2] * local.x[2]);
                if (xmag !== 0) {
                    local.x[0] /= xmag;
                    local.x[2] /= xmag;
                }
    
                const ymag = Math.sqrt(local.y[0] * local.y[0] + local.y[2] * local.y[2]);
                if (ymag !== 0) {
                    local.y[0] /= ymag;
                    local.y[2] /= ymag;
                }
    
                const dx = -1 * sensitivityX * (this.mouseX - this.pmouseX);
                const dz = -1 * sensitivityY * (this.mouseY - this.pmouseY);
    
                cam.setPosition(
                    cam.eyeX + dx * local.x[0] + dz * local.z[0],
                    cam.eyeY,
                    cam.eyeZ + dx * local.x[2] + dz * local.z[2]
                );
            }
        }
        return this;
    };
    let img;
    let star;
    let positions = [];
    let graphics;
    let font;
    
    p.setup = function() {
        let c;
        if(typeof window != `undefined`){
            if(window.innerWidth <= 768){
              c = p.createCanvas((window.innerWidth / 100 * 100 - 20), (window.innerHeight / 100 * 72), p.WEBGL); 
            }else{
              c = p.createCanvas((window.innerWidth / 100 * 82 - 100), (window.innerHeight / 100 * 62), p.WEBGL); 
            }
            // c.parent(el)
            p.camera(0, 0, 200 + p.sin(p.frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);
            graphics = p.createGraphics(1000, 500);
            addScreenPositionFunction( p );
        }
       
    
    }
    
    p.preload = function() {
        img = p.loadImage(map);
    }

    let x = locations[0][1];
    let y = locations[0][2];
    let count = 1;
    let pts = []
    
    
        p.draw = function() {
            if(typeof window != `undefined`){
            p.background(255);
            let diam = baseDiameter + p.sin(theta) * pulseAmplitude;
            graphics.image(img, 0, 0, 1000, 500);
            graphics.fill(0, 130, 151, 200)
            
            graphics.noStroke()
            p.rotateY(p.millis() / 10000);
            p.rotateZ(p.millis() / 15000);
            p.push()
            p.stroke(191, 13, 62, 100)
            p.strokeWeight(0.5);
            p.noFill()
            for (let j = 0; j < locations.length; j++) {
                p.beginShape()
                let current = locations[j][3]
                p.vertex(current[0], current[1], current[2]) 
                for (let i = 0; i < locations.length; i++) {
                        let now = locations[i][3]
                        p.vertex(now[0], now[1], now[2])     
                }
                p.endShape()
            }
            
            for (let i = 0; i < locations.length; i++) {
                // graphics.ellipse(locations[i][1], locations[i][2], diam, diam)
                let current = locations[i][3]
                let pos = p.screenPosition(current);
                
                p.push()
                p.noStroke()
                if(p.dist(pos.x, pos.y, p.mouseX - window.innerWidth/2.65, p.mouseY - window.innerHeight/3.25) < 15){
                    p.fill(191, 13, 62, 100)
                    
                }else{
                    p.fill(0, 130, 151, 100)
                }
                p.translate(current[0], current[1],current[2])
               
                
                p.shininess(500);
                let locX = p.mouseX - p.width / 2;
                let locY = p.mouseY - p.height / 2;
                p.ambientLight(100);
                // p.pointLight(0, 130, 151, locX, locY, 500);
                // p.specularMaterial(0, 130, 151, 150)
                if(p.dist(pos.x, pos.y, p.mouseX - window.innerWidth/2.65, p.mouseY - window.innerHeight/3.25) < 12){
                    p.ellipse(p.mouseX - window.innerWidth/2.65, p.mouseY - window.innerHeight/3.25, 5, 5)
                    p.emissiveMaterial(0, 130, 151, 255)
                    if(typeof window != `undefined`){
                        let a = document.querySelector("a[href='"+ locations[i][4] +"']");
                        console.log(locations[i][4])
                        a.style.background = "rgb(191, 13, 62)"
                        a.style.color = "#D4EAED"
                        a.style.fontWeight = "bold"
                    }
                }else{
                    if(typeof window != `undefined`){
                        p.emissiveMaterial(191, 13, 62, 255)
                        let a = document.querySelector("a[href='"+ locations[i][4] +"']");
                        a.style.background = "none"
                        a.style.color = "rgb(191, 13, 62)"
                        a.style.fontWeight = "normal"
                    }
                }                
                p.sphere(diam)
                p.pop()
            }
    
          
       
            p.noStroke();
            p.texture(graphics);
    
            // p.orbitControl();
    
    
            p.push()
           
    
            p.sphere(200);
            p.fill(255)
            p.strokeWeight(2)
            p.stroke("#008297") 
    
            p.pop()
            p.fill(0,255,0);
            p.texture("");
            // for(let i = 0; i < 900; i++){
            //     let lon = p.map(i, 0, 900, -p.PI, p.PI);
              
            //     for(let j = 0; j < 400; j++){
            //         let lat = p.map(j, 0, 400, -p.HALF_PI, p.HALF_PI)
            //         let x = 200 * p.sin(lon) * p.cos(lat)
            //         let y = 200 * p.sin(lon) * p.sin(lat)
            //         let z = 200 * p.cos(lon);
            //         let pos = p.screenPosition(x, y, z);
                    
            //         p.push()
            //         if(p.dist(pos.x, pos.y, p.mouseX - window.innerWidth/2.65, p.mouseY - window.innerHeight/3.25) < 10){
            //             p.fill(255,0,0)
            //             if(p.mouseIsPressed){
            //                 console.log(x,y,z)
            //             }
            //         }else{
            //             p.fill(0,255,0);
            //         }
            //         p.translate(x,y,z);
            //         // p.sphere(2)
            //         p.pop()
            //     }
            // }

            p.fill(255)
            theta += speed;
        }
    
    }
    p.mouseReleased = function(){
        if(typeof window != `undefined`){
        for(let i = 0; i < locations.length; i++){
            let current = locations[i][3]
            let pos = p.screenPosition(current);
            if(p.dist(pos.x, pos.y, p.mouseX - window.innerWidth/2.65, p.mouseY - window.innerHeight/3.25) < 15){
                    if(typeof window != `undefined`){
                        window.location.href = locations[i][4]
                    }
                }
        }
        }
    }
    p.windowResized = function() {
        if(window?.innerWidth <= 768){
            p.resizeCanvas((window?.innerWidth / 100 * 100 - 20), (window?.innerHeight / 100 * 72));
            p.camera(0, 0, 200 + p.sin(p.frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);
    
        }else{
            p.resizeCanvas((window?.innerWidth / 100 * 82 - 100), (window?.innerHeight / 100 * 72));
                  p.camera(0, 0, 200 + p.sin(p.frameCount * 0.01) * 5, 0, 0, 0, 0, 1, 0);
    
        }
    }
    
  
  };
  
  
  export default sketch