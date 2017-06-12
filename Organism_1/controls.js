//TESTING CONTROLS
function controlsInit() {
    maxVertP = createP('MaxVert');
    maxVertSlider = createSlider(3, 100, organism.maxVert, 1);
    maxLinesP = createP('MaxLines');
    maxLinesSlider = createSlider(1, 72, organism.maxLines, 1);
    flowVelP = createP('MaxFlowVel');
    flowVelSlider = createSlider(-0.5, 0.5, organism.flowVel, 0.01);
    stepP = createP('Step');
    stepSlider = createSlider(0, 1, organism.step, 0.01);
    maxWidthP = createP('MaxWidth');
    maxWidthSlider = createSlider(1, 250, organism.maxWidth, 1);
    maxYDislocP = createP('MaxY_Dislocation')
    maxYDislocSlider = createSlider(0, 100, organism.maxYDisloc, 1)
    fpsP = createP('fps');
    interpRadio = createRadio();
    interpRadio.option("points");
    interpRadio.option("lines");
    interpRadio.option("normal");
    interpRadio.position(width, 0)
    
    maxVertSlider.position(width, 0 + 10 + 50);
    maxLinesSlider.position(width, 0 + 60 + 50);
    flowVelSlider.position(width, 0 + 110 + 50);
    stepSlider.position(width, 0 + 160 + 50);
    maxWidthSlider.position(width, 0 + 210 + 50);
    maxYDislocSlider.position(width, 260 + 50)
    
    maxVertP.position(width, 0 + 10 + 15);
    maxLinesP.position(width, 0 + 60 + 15);
    flowVelP.position(width, 0 + 110 + 15);
    stepP.position(width, 0 + 160 + 15);
    maxWidthP.position(width, 0 + 210 + 15);
    fpsP.position(width, 0 + 310 + 15);
    maxYDislocP.position(width, 0 + 260 + 15)
    
    maxVertSlider.hide();
    maxLinesSlider.hide();
    flowVelSlider.hide();
    stepSlider.hide();
    maxWidthSlider.hide();
    maxYDislocSlider.hide();
    maxVertP.hide();
    maxLinesP.hide();
    flowVelP.hide();
    stepP.hide();
    maxWidthP.hide();
    fpsP.hide();
    interpRadio.hide(); 
    maxYDislocP.hide();
}   

function controlsUpdate() {
    organism.maxVert = maxVertSlider.value();
    organism.maxLines = maxLinesSlider.value();
    organism.flowVel = flowVelSlider.value();
    organism.step = stepSlider.value();
    organism.maxWidth = maxWidthSlider.value();
    organism.maxYDisloc = maxYDislocSlider.value();
    interpShape = interpRadio.value();
    
    //visualizzazione dati
    maxVertP.html('MaxVert: ' + organism.maxVert);
    maxLinesP.html('MaxLines: ' + organism.maxLines);
    flowVelP.html('FlowVel: ' + organism.flowVel);
    stepP.html('Step: ' + organism.step);
    maxWidthP.html('MaxWidth: ' + organism.maxWidth);
    maxYDislocP.html('MaxY_Dislocation: ' + organism.maxYDisloc)
    fpsP.html('FPS: ' + frameRate());
    
}

function keyboardControlsListen() {
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
            maxYDislocSlider.show();
            maxYDislocP.show();
        }
        else {
            maxVertSlider.hide();
            maxLinesSlider.hide();
            flowVelSlider.hide();
            stepSlider.hide();
            maxWidthSlider.hide();
            maxYDislocSlider.hide();
            maxVertP.hide();
            maxLinesP.hide();
            flowVelP.hide();
            stepP.hide();
            maxWidthP.hide();
            fpsP.hide();
            interpRadio.hide();
            maxYDislocP.hide();
        }
    }
}