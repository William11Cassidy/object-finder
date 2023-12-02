video = ""
objects = []
status = ""



function draw() {
    image(video, 0, 0, 600, 420)
    if (status) {
        objectDetector.detect(video, gotResult)
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "status: objects detected "
            percent = floor(objects[i].confidence * 100) + "%"
            fill("blue")
            text(objects[i].label + percent, objects[i].x + 10, objects[i].y + 10)
            noFill()
            stroke("green")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
            if (objects[i].label=="person") {
            document.getElementById("status").innerHTML = "status: baby detected "
            }
        }
    }
}
function setup() {
    canvas = createCanvas(600, 420)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelloaded)
    document.getElementById("status").innerHTML = "status: detecting objects "
}
function modelloaded() {
    status = true
    objectDetector.detect(video, gotResult)
}

function gotResult(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        objects = result
    }
}