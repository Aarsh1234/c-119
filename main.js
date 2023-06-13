function setup(){
    canvas=createCanvas(300, 300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload(){
    classifier=ml5.imageClassifier("DoodleNet");
}
function draw(){
    strokeWeight(12);
    stroke(255, 0, 0);
    if (mouseIsPressed){
        line(pmouseX, pmouseY, mouseX, mouseY);
    }
}
function classifyCanvas(){
    classifier.classify(canvas, gotresults);
}
function gotresults(error ,result){
if (error){
    console.error(error);
}
console.log(result);
document.getElementById("label").innerHTML="label: " + result[0].label;
document.getElementById("Confidence").innerHTML="confidence: " + Math.round(result[0].confidence * 100) + "%";
utter_this=new SpeechSynthesisUtterance(result[0].label);
synth.speak(utter_this);
}
function clearCanvas(){
    background("white");
}