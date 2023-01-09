song1 ="";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist=0;
status1 = "";
status2 = "";
function preload()
{
    song1 = loadSound("believer.mp3");
    song2 = loadSound("Stay.mp3");
}
function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("ScoreLeftWrist = "+ scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX + "leftWristY = "+ leftWristY);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+rightWristX +"rightWristY = "+ rightWristY);
    }
}
function draw()
{
    image(video, 0, 0, 600, 500);
    fill("#FF0000");
    stroke("#FF0000");
    status1 = song1.isPlaying();
    status2 = song2.isPlaying();
    if (scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);
        song2.stop();
        if (status1 == false)
        {
            song1.play();
            document.getElementById("song_name").innerHTML = "Playing Believer";
        }
    }
    if (scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if (status2 == false)
        {
            song2.play();
            document.getElementById("song_name").innerHTML = "Playing Stay";
        }
    }
}
function modelLoaded()
{
    console.log("PoseNet is Initialized!");
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}