Webcam.set({
    width: 350,
    height:300,
    image_format: "png",
    png_quality: 90
});

var predection1="";
var predection2="";

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_URI){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_URI+'">';
    });
}
console.log("ml5 version:",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/yBfukGn7u/model.json",model_loaded);
function model_loaded() {
    console.log("Model is loaded")
}

function speak() {
    var synth = window.speechSynthesis;
    speak_data1 = "The first predction is"+predection1;
    speak_data2 = "second predction is " + predection2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}

function check() {
    img=document.getElementById("captured_image")
    classifier.classify(img,got_result)
}

function got_result(error,results) {
    if(error) {
        console.error(error)
    } else{
        console.log(results)
    
    document.getElementById("emotion_name_1").innerHTML=results[0].label;
    document.getElementById("emotion_name_2").innerHTML=results[1].label;
    predection1=results[0].label;
    predection2=results[1].label;
    speak();

    if(predection1=="Happy") {
        document.getElementById("emoji1").innerHTML="&#128522";
    }
    if(predection1=="Sad") {
        document.getElementById("emoji1").innerHTML="&#128532";
    }
    if(predection1=="Angry") {
        document.getElementById("emoji1").innerHTML="&#128548";
    }

    if(predection2=="Happy") {
        document.getElementById("emoji2").innerHTML="&#128522";
    }
    if(predection2=="Sad") {
        document.getElementById("emoji2").innerHTML="&#128532";
    }
    if(predection2=="Angry") {
        document.getElementById("emoji3").innerHTML="&#128548";
    }
    
}
}