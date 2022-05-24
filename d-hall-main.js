img = "";
Status = "";

function preload() {
    img = loadImage('d-hall-img.jpg');
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    document.getElementById("status").innerHTML = "Status : Object is Detecting";
    ObjectDetector = ml5.objectDetector("cocossd", modelLoaded);
}
function draw() {
    image(img, 0, 0, 600, 400);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        ObjectDetector.detect(img, gotResults);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object is Detected";
            document.getElementById("number").innerHTML = "Number of Objects Detected are : " + objects.length;
            label = objects[i].label;
            fill("#fc0303");
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%",objects[i].x - 180, objects[i].y - 200);
            noFill();
            stroke("#fc0303");
            rect(objects[i].x - 180, objects[i].y - 200, objects[i].width - 2693, objects[i].height - 1750);
        }
    }
}
function back(){
    window.location = "index.html";
}
function modelLoaded() {
    console.log("cocoSsd initialized");
    Status = true;
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
        console.log(results);
        objects = results;
    }