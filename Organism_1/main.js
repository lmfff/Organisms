var rotX;
var rotZ;
var mouseRotX = 0;
var mouseRotY = 0;
var lp = true;
var organism = {
    minY: -200,
    maxY: 200,
    maxVert: 40, 
    maxLines: 18,  //per quadrante
    flow: 0, 
    flowVel: 0, 
    step: 0.05, 
    maxWidth: 150
}
//testing controls and visualizzione dati
var maxVertSlider;
var maxLinesSlider;
var flowVelSlider;
var stepSlider;
var maxWidthSlider;
var interpRadio;
var interpShape = 'points';
var maxVertP;
var maxLinesP;
var flowVelP;
var stepP;
var maxWidthP;
var fpsP;

var controlsShowing = false;



function setup() {
    createCanvas(550, 500, WEBGL);
    background(100);
    controlsInit();    
}

function draw() {
    
    controlsUpdate();
    
    //Increment flow
    organism.flow += organism.flowVel;
    
    //Frame Refresh
    background(250);
    
    //Bars Formatting and Display
    bars();
    
    //Rotation controls (mouse)
    rotateY(mouseRotY);
    rotateX(mouseRotX);
    
    //ORGANISM
    
    //LOOP INTORNO A ASSE Y (linee)
    //Iterazione di ognuna delle prime 4 linee maxLines volte per quadrante
    for (var u = 0; u < organism.maxLines; u++) {
        rotateY(PI / 2 / organism.maxLines);
                
        //Change shape interpolation based on interpShape variable
        interpShapeFun();
        
        //Generate first 4 lines (1 per quadrante)
        for (var q = 0; q < 4; q++) {
            
            //Based on the number of iteration (q) cambia il quadrante in cui la linea viene generata
            //RotX e RotZ -> fattori di moltiplicazione delle coordinate dei vertici
            switch (q) {
            case 0:
                rotX = 1;
                rotZ = 1;
                break;
            case 1:
                rotX = -1;
                rotZ = 1;
                break;
            case 2:
                rotX = -1;
                rotZ = -1;
                break;
            case 3:
                rotX = 1;
                rotZ = -1;
                break;
            }
            
            push();
            
            //LOOP SU ASSE Y (vertici)
            for (var k = 0; k <= organism.maxVert; k++) {
                
                //Coordinata Y dei vertici
                var y = organism.minY + k * (organism.maxY - organism.minY) / organism.maxVert;
                
                //Aumenta variable mlt proporzionalmente alla vicinanza della coordinata Y al centro dell'altezza dell'organismo
                if (k >= 0 && k <= organism.maxVert / 2) {
                    var mlt = map(k, 0, organism.maxVert / 2, 0, organism.maxWidth);
                }
                if (k >= organism.maxVert / 2 && k <= organism.maxVert) {
                    var mlt = map(k, organism.maxVert / 2, organism.maxVert, organism.maxWidth, 0);
                }
                
                //Colora proporzionalmente a mlt
                fill(mlt);
                
                //Genera coordinate x e z con perlin Noise con step variabile flow globale variabile e li allontana dall'asse Y proporzionalmente a mlt
                var x = noise((0.1 + organism.step * k) + organism.flow) * mlt;
                var z = noise((0.1 + organism.step * k) + organism.flow) * mlt;
                
                //Genera vertice
                vertex(x * rotX, y, z * rotZ)
            }
            pop();
        }
        endShape();
    }
}


function bars() {
    push()
    //Formatting
    specularMaterial(200);
    pointLight(250, 250, 250, 100, 100, 0);
    //Displaying
    translate(- 60, 0, -100)
    box(-30, height*2);
    translate(160, 0, 200)
    box(10, height);
    translate(80, 0, 0);
    box(10, height);
    pop()
}

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
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        mouseRotX += map(mouseY, 0, width, 0, TAU / 32);
        mouseRotY += map(mouseX, 0, height, 0, TAU / 32);
    }
}

