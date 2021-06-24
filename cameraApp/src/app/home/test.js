import Peer from 'peerjs';

import $ from "jquery";

//sending function is called sendJSON

const video = document.querySelector('video');
const canvas = document.querySelector('canvas');

let streamStarted = false;
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const sendBtn = document.getElementById("send");

function sendJSON(file) {


    let formdata = new FormData();
    // Creating a XHR object 
    let xhr = new XMLHttpRequest();

    let url = "http://172.28.133.173:5000/image";
    formdata.append("image", file);
    console.log(formdata);
    // open a connection 
    xhr.open("POST", url, true);
    // xhr.withCredentials = "true";
    // xhr.setRequestHeader("Content-Type", "application/upload");
    // // Set the request header i.e. which type of content you are sending 
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // Create a state change callback 
    xhr.onload = function () {
        if (this.status === 200)
            console.log(this.response);
        else
            console.error(xhr);
    };

    // Converting JSON data to string 
    // var data = JSON.stringify({ "name": image });

    // Sending data with the request 
    xhr.send(formdata);
}

sendBtn.onclick = () => {
    // peer.call('83123xuz2pp10000', video.srcObject);
    setInterval(() => {
        canvas.getContext("2d").drawImage(video, 0, 0, 250, 250);
        canvas.toBlob(sendJSON, "image/jpeg");
    }, 1000)
    // sendJSON(img);
    // alert("done");
}
const constraints = {
    video: {
        width: {
            min: 1280,
            ideal: 1280,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 720,
            max: 1440
        },
        //lw hasht8l back camera uncomment
        // facingMode: {
        //     exact: 'environment'
        // }
        facingMode: 'user'
    }
};

play.onclick = () => {
    console.log("play clicked");
    if (streamStarted) {
        video.play();
        return;
    }
    if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {

        startStream(constraints);

    }
    // join();

};
const pauseStream = () => {
    video.pause();
};


pause.onclick = pauseStream;

const startStream = async (constraints) => {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    handleStream(stream);

};


const handleStream = (stream) => {
    console.log("handle streaming");
    video.srcObject = stream;

};


const getCameraSelection = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(device => device.kind === 'videoinput');
    const options = videoDevices.map(videoDevice => {
        return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
    });
};

getCameraSelection();
