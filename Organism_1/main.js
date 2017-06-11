var maxVert = 40;
var maxLines = 18; //per quadrante
var flow = 0;
var flowVel = 0;
var step = 0.05;
var maxWidth = 150;
var rotX;
var rotZ;
var mouseRotX = 0;
var mouseRotY = 0;
var lp = true;
//control and testing sliders
var maxVertSlider;
var maxLinesSlider;
//var flowSlider;
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
    maxVertP = createP('MaxVert');
    maxVertSlider = createSlider(3, 100, maxVert, 1);
    maxLinesP = createP('MaxLines');
    maxLinesSlider = createSlider(1, 72, maxLines, 1);
    //flowSlider = createSlider(-100, 100, flow, 1);
    flowVelP = createP('MaxFlowVel');
    flowVelSlider = createSlider(-0.5, 0.5, flowVel, 0.01);
    stepP = createP('Step');
    stepSlider = createSlider(0, 1, step, 0.01);
    maxWidthP = createP('MaxWidth');
    maxWidthSlider = createSlider(1, 250, maxWidth, 1);
    fpsP = createP('fps');
    interpRadio = createRadio();
    interpRadio.option("points");
    interpRadio.option("lines");
    interpRadio.option("normal");
    maxVertSlider.position(0, height + 10 + 50);
    maxLinesSlider.position(0, height + 60 + 50);
    flowVelSlider.position(0, height + 110 + 50);
    stepSlider.position(0, height + 160 + 50);
    maxWidthSlider.position(0, height + 210 + 50);
    maxVertP.position(0, height + 10 + 15);
    maxLinesP.position(0, height + 60 + 15);
    flowVelP.position(0, height + 110 + 15);
    stepP.position(0, height + 160 + 15);
    maxWidthP.position(0, height + 210 + 15);
    fpsP.position(0, height + 260 + 15);
    maxVertSlider.hide();
    maxLinesSlider.hide();
    flowVelSlider.hide();
    stepSlider.hide();
    maxWidthSlider.hide();
    maxVertP.hide();
    maxLinesP.hide();
    flowVelP.hide();
    stepP.hide();
    maxWidthP.hide();
    fpsP.hide();
    interpRadio.hide();
}

function draw() {
    //test barre
    
    
    maxVert = maxVertSlider.value();
    maxLines = maxLinesSlider.value();
    //flow = flowSlider.value(); if added will stop motion
    flowVel = flowVelSlider.value();
    step = stepSlider.value();
    maxWidth = maxWidthSlider.value();
    var frmRot = frameCount % 120;
    
    //rotateY(map(frmRot, 0, 119, 0, TAU));
    //rotateX(map(frmRot, 0, 119, 0, TAU));
    flow += flowVel;
    background(250);
    fill(0);
    
    push()
    //ambientLight(100);
    specularMaterial(200);
    pointLight(250, 250, 250, 100, 100, 0);
    translate(- 60, 0, -100)
    box(-30, height*2);
    translate(160, 0, 200)
    box(10, height);
    translate(80, 0, 0);
    box(10, height);
    pop()
    
    rotateY(mouseRotY);
    rotateX(mouseRotX);
    for (var u = 0; u < maxLines; u++) {
        rotateY(PI / 2 / maxLines);
        interpShape = interpRadio.value();
        
        
        
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
        }
        else {
            beginShape();
        }
        for (var q = 0; q < 4; q++) {
            //a 4 zone
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
            //rotateY((TAU / (maxLines - 1)) * q);
            //beginShape();
            for (var k = 0; k <= maxVert; k++) {
                //-200 = min Y , 400 = altezza totale
                var y = -200 + k * 400 / maxVert;
                if (k >= 0 && k <= maxVert / 2) {
                    var mlt = map(k, 0, maxVert / 2, 0, maxWidth);
                }
                if (k >= maxVert / 2 && k <= maxVert) {
                    var mlt = map(k, maxVert / 2, maxVert, maxWidth, 0);
                }
                fill(mlt);
                //più è grande lo step più "porzione" di noise viene effettivamente visualizzata
                var x = noise((0.1 + step * k) + flow) * mlt;
                var z = noise((0.1 + step * k) + flow) * mlt;
                if (k === 0 || k === maxVert) {
                    x = 0;
                    z = 0;
                }
                vertex(x * rotX, y, z * rotZ)
            }
            //endShape();
            pop();
        }
        endShape();
    }
    //visualizzazione dati
    maxVertP.html('MaxVert: ' + maxVert);
    maxLinesP.html('MaxLines: ' + maxLines);
    flowVelP.html('FlowVel: ' + flowVel);
    stepP.html('Step: ' + step);
    maxWidthP.html('MaxWidth: ' + maxWidth);
    fpsP.html('FPS: ' + frameRate());
    
    
}

function keyPressed() {
    if (keyCode === ALT) {
        lp = !lp;
        if (lp) {
            loop()
        }
        else {
            noLoop()
        }
    }
    if (key === 'c' || key === 'C') {
        controlsShowing = !controlsShowing
        if (controlsShowing) {
            maxVertSlider.show();
            maxLinesSlider.show();
            flowVelSlider.show();
            stepSlider.show();
            maxWidthSlider.show();
            maxVertP.show();
            maxLinesP.show();
            flowVelP.show();
            stepP.show();
            maxWidthP.show();
            fpsP.show();
            interpRadio.show();
        }
        else {
            maxVertSlider.hide();
            maxLinesSlider.hide();
            flowVelSlider.hide();
            stepSlider.hide();
            maxWidthSlider.hide();
            maxVertP.hide();
            maxLinesP.hide();
            flowVelP.hide();
            stepP.hide();
            maxWidthP.hide();
            fpsP.hide();
            interpRadio.hide();
        }
    }
}

function mouseDragged() {
    if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
        mouseRotX += map(mouseY, 0, width, 0, TAU / 32);
        mouseRotY += map(mouseX, 0, height, 0, TAU / 32);
    }
}