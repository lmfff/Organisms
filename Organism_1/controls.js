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

function controlsUpdate() {
    organism.maxVert = maxVertSlider.value();
    organism.maxLines = maxLinesSlider.value();
    organism.flowVel = flowVelSlider.value();
    organism.step = stepSlider.value();
    organism.maxWidth = maxWidthSlider.value();
    interpShape = interpRadio.value();
    
    //visualizzazione dati
    maxVertP.html('MaxVert: ' + organism.maxVert);
    maxLinesP.html('MaxLines: ' + organism.maxLines);
    flowVelP.html('FlowVel: ' + organism.flowVel);
    stepP.html('Step: ' + organism.step);
    maxWidthP.html('MaxWidth: ' + organism.maxWidth);
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