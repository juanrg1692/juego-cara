
var capture;
var tracker
var w = 640;
var h = 480;
let pg;
var button;
var button0;
var slider;


function setup() {
    createCanvas(w,h);
    createP("presiona cualquier tecla para activar el video");
    capture = createCapture({
        audio: false,
        video: {
            width: w,
            height: h
        }
    }, function() {
        console.log('capture ready.')
    });
    capture.elt.setAttribute('playsinline', '');
    createCanvas(w, h);
    capture.size(w, h);
    capture.hide();
    tracker = new clm.tracker();
    tracker.init();
    tracker.start(capture.elt);

    pg = createGraphics(w,h);

    button = createButton("guardar");
    button.mousePressed(saveAs);
    slider = createSlider(5,20,10);
}

function saveAs() {
    save("a.png");
}



function draw() {

    if(keyIsPressed === true){
    image(capture,0,0);
    }else{
    background(255);
    }

    
    var positions = tracker.getCurrentPosition();


    if (positions.length > 0) {
        pg.noStroke();
        pg.fill(0, 0, 255);
        var xx = positions[62][0];
        var yy =  positions[62][1];
        var col = map(sin(frameCount*0.1),-1,1,0,255);
        pg.fill(col);
        pg.ellipse(xx-xx/2,yy-yy/2, slider.value(),  slider.value());

        image(pg,0,0);
    }
}
