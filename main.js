status="";
objects=[];
video="";
function setup() {  
    video=createCapture(VIDEO);
    video.size(300,300);
    canvas=createCanvas(300,300);
    video.hide();
    canvas.center();
}
function gotResult(results,error){
    if (status=error){
        console.log("Error");
    }
    console.log(results);
    objects=results;
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status:Object Detected";
    objectDetector.detect(results);
}
function modelLoaded(){
    console.log("Model Loaded!");
    status=true;

}
function draw(){
    image(video,0,0,300,300);
    if(status!=""){
        objectDetector.detect(video,gotResult);
        for( i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Status:Object Detected";
            document.getElementById("number_of_objects").innerHTML="Number of detected are:"+objects.length;

            fill('#FF0000');
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label+" " +percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke('#FF0000');
            rect(objects[i].x,objects[i].y, objects[i].width,objects[i].height);
        }

        video.stop();
 }
    }


