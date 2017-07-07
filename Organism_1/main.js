var rotX;
var rotZ;
var mouseRotX = 0;
var mouseRotY = 0;
var lp = true;
var organism = {
    h: 500,
    minY: - this.h/2,
    maxY: this.h/2,
    maxVert: 40, 
    maxLines: 18,  //per quadrante
    flow: 0, 
    flowVel: 0.01, 
    step: 0.02, 
    maxWidth: 150,
    yDisloc: 0,
    maxYDisloc: 0,
    rtZ: 0,
    rtX: 0,
    trsY: 0,
    trsX: 0
}
var bars = []
var vertV;
//testing controls and visualizzione dati
var maxVertSlider;
var maxLinesSlider;
var flowVelSlider;
var stepSlider;
var maxWidthSlider;
var interpRadio;
var interpShape = 'normal';
var maxVertP;
var maxLinesP;
var flowVelP;
var stepP;
var maxWidthP;
var fpsP;
var swt;
var widthOff = 0;
var velOff = 0;
var maxVelOff = 0;
var demoMode = false;
var leftOff = 0;
var rightOff = 0;
var stereoOff = 0;

var debugMode = false; //SET IT TO FALSE WHEN USING IN MAX!!!

if(debugMode) {
    demoMode = true;
}

if(!debugMode) {
        window.max.bindInlet('demoMode', function (toggle) {
        demoMode = !demoMode
    });

    window.max.bindInlet('cross', function (bass, middle, high) {
        widthOff = bass * 100;
        velOff = middle * 20;
        organism.yDisloc = high * 20;
    });
    
    window.max.bindInlet('stereo', function (left, right) {
        leftOff = left * 20;
        rightOff = right * 20;
    });

    if (!demoMode) {
        window.max.bindInlet('nkPot', function (pot1, pot2, pot3, pot4, pot5, pot6, pot7) {
            organism.step = map(pot1, 0, 127, 0, 1);
            organism.h = map(pot2, 0, 127, 0, 1000);
            organism.rtX = map(pot3, 0, 127, 0, TAU/2);
            organism.maxYDisloc = map(pot4, 0, 127, 0, 100);
            organism.flowVel = map(pot5, 0, 127, -0.5, 0.5);
            organism.rtZ = map(pot6, 0, 127, 0, TAU/2);
            organism.trsX = map(pot7, 0, 127, -300, 300);
        });
    }

    if (!demoMode) {
        window.max.bindInlet('nkFad', function (fad1, fad2, fad3, fad4, fad5, fad6, fad7, fad8) {
            organism.maxWidth = map(fad2, 0, 127, 1, 250);
            organism.trsY = map(fad7, 0, 127, 300, -300);
            maxVelOff = map(fad5, 0, 127, 0, 1)
        });
    }
    
    if (!demoMode) {
        window.max.bindInlet('nkTrsp', function (stop, start, rec) {
            if (stop) {
                interpShape = 'points'
            } else if (start) {
                interpShape = 'lines'
            } else if (rec) {
                interpShape = 'normal'
            } else {
                interpShape = 'normal€'
            }
        });
    }


}



var controlsShowing = false;



function setup() {
    createCanvas(1920, 1080, WEBGL);
    background(100);
    controlsInit(); 
    
    //generate bars
    /*for(var u = 0; u < 400; u++){
        var bar = new Bar((u * width/400) - width/2, sin(map(u, 0, 399, 0, TAU*8))*height/2, 0, 5, 5)
        bars.push(bar)
    }
    /*var bar1 = new Bar(-60, 0, -100, 30, height*2)
    var bar2 = new Bar(100, 0, 100, 15, height*2)
    var bar3 = new Bar(180, 0, 100, 10, height*2)
    
    //populate array
    bars.push(bar1)
    bars.push(bar2)
    bars.push(bar3)
    */
}


function draw() {
    
    if (demoMode){
        organism.h = 250;
        organism.trsY = 0;
        organism.trsX = 0;
        controlsUpdate();
    }   else {
        fpsP.html('FPS: ' + frameRate());
    }
    
    //Increment flow
    organism.flow += (organism.flowVel + velOff * maxVelOff);
    
    //Frame Refresh
    background(250);
    
    //Bars Formatting and Display
    barsFun();
    
    
    
    //ORGANISM
    
    translate(organism.trsX, organism.trsY, 0)
    
    //Rotation controls
    if (demoMode) {
        rotateY(mouseRotY);
        rotateX(mouseRotX);
    } else {
        rotateZ(organism.rtZ)
        rotateX(organism.rtX)
    }
    organism.maxY = organism.h/2
    organism.minY = -organism.h/2
    //LOOP INTORNO A ASSE Y (linee)
    //Iterazione di ognuna delle prime 4 linee maxLines volte per quadrante
    for (var u = 0; u < organism.maxLines; u++) {
        rotateY(PI / 2 / organism.maxLines);
                
        //Change shape interpolation based on interpShape variable
        interpShapeFun();
        translate(0, organism.yDisloc * organism.maxYDisloc * random(-1, 1), 0)
        //Generate first 4 lines (1 per quadrante)
        for (var q = 0; q < 4; q++) {
            
            //Based on the number of iteration (q) cambia il quadrante in cui la linea viene generata
            //RotX e RotZ -> fattori di moltiplicazione delle coordinate dei vertici
            switch (q) {
            case 0:
                rotX = 1;
                rotZ = 1;
                stereoOff = 0
                break;
            case 1:
                rotX = -1;
                rotZ = 1;
                stereoOff = leftOff
                break;
            case 2:
                rotX = -1;
                rotZ = -1;
                stereoOff = 0
                break;
            case 3:
                rotX = 1;
                rotZ = -1;
                stereoOff = rightOff
                break;
            }
            
            push();
            
            //LOOP SU ASSE Y (vertici)
            for (var k = 0; k <= organism.maxVert; k++) {
                
                //Coordinata Y dei vertici
                var y = organism.minY + k * (organism.maxY - organism.minY) / organism.maxVert;
                
                
                
                //Aumenta variable mlt proporzionalmente alla vicinanza della coordinata Y al centro dell'altezza dell'organismo
                if (k >= 0 && k <= organism.maxVert / 2) {
                    var mlt = map(k, 0, organism.maxVert / 2, 0, organism.maxWidth + widthOff);
                }
                if (k >= organism.maxVert / 2 && k <= organism.maxVert) {
                    var mlt = map(k, organism.maxVert / 2, organism.maxVert, organism.maxWidth + widthOff, 0);
                }
                
                //Colora proporzionalmente a mlt
                fill(mlt);
                
                //Genera coordinate x e z con perlin Noise con step variabile flow globale variabile e li allontana dall'asse Y proporzionalmente a mlt
                var x = noise((0.1 + organism.step * k) + organism.flow + stereoOff) * mlt;
                var z = noise((0.1 + organism.step * k) + organism.flow + stereoOff) * mlt;
                
                /*
                SISTEMA FISICO FALLIMENTARE
                vertV = createVector(x, z);
                //console.log(vertV)
                for (var n = 0; n < bars.length; n++) {
                    let rRep = sqrt(sq(bars[n].width)*2)/2
                
                    if (dist(vertV.x, vertV.y, bars[n].x, bars[n].z) < rRep) {
                        let vertInit = createVector(bars[n].x + rRep, bars[n].z)
                        var alph = Math.acos(vertV.dot(vertInit) / (vertV.mag() * vertInit.mag()));//vertV.angleBetween(vertInit)
                        var resVect = p5.Vector.fromAngle(radians(alph))
                        resVect.sub(vertV)
                        resVect.setMag(resVect.mag() * 0.8)
                        swt = true
                        break;
                    } else {
                        swt = false
                    }
                }
                
                if (swt){
                    vertex(resVect.x * rotX, y, resVect.y * rotZ)
                }else{ */
                
                    vertex(x * rotX, y, z * rotZ)
                
                //}
                //Genera vertice (SISTEMA FISICO FALLIMENTARE)
                //vertex(x * rotX, y, z * rotZ)
            }
            pop();
        }
        endShape();
    }
}

//bars constructor function

function Bar(x, y, z, width, height) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    
    this.update = function() {
        push()
        translate(this.x, this.y, this.z)
    }
    
    this.display = function() {
        sphere(this.width, this.height)
        pop()
    }
}


//Draws all the bars
function barsFun() {
    push()
    //Formatting
    specularMaterial(200);
    pointLight(250, 250, 250, 100, 100, 0);
    //Displaying
    for (var j = 0; j < bars.length; j++){
        bars[j].update()
        bars[j].display()
    }
    pop()
}

//Interpolation switch function
function interpShapeFun() {
    if (interpShape) {
            if (interpShape === 'points') {
                beginShape(POINTS);
            }
            else if (interpShape === 'lines') {
                beginShape(LINES);
            }
            else if (interpShape === 'normal') {
                beginShape();
            }
        } else {
            beginShape();
        }
} 

//EVENT LISTENERS
function keyPressed() {
    keyboardControlsListen();
}

function mouseDragged() {
    if(demoMode){
        if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
            mouseRotX += map(mouseY, 0, width, 0, TAU / 32);
            mouseRotY += map(mouseX, 0, height, 0, TAU / 32);
        }
    }
}

