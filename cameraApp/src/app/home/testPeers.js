import Peer from 'peerjs';

// const peerServer =require('peer') PeerServer({ port: 9000, path: '/myapp' });
var lastPeerId = null;
var peer = null; // own peer object
var conn = null;
function initialize() {
    // Create own peer object with connection to shared PeerJS server
    peer = new Peer(null, {
        debug: 2
    });

    peer.on('open', function (id) {
        // Workaround for peer.reconnect deleting previous id
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
    });
    peer.on('connection', function (c) {
        // Disallow incoming connections
        c.on('open', function () {
            c.send("Sender does not accept incoming connections");
            setTimeout(function () { c.close(); }, 500);
        });
    });
    peer.on('disconnected', function () {
        console.log('Connection lost. Please reconnect');

        // Workaround for peer.reconnect deleting previous id
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on('close', function () {
        conn = null;
        console.log('Connection destroyed');
    });
    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
}
function join() {

    // // Create connection to destination peer specified in the input field
    // conn = peer.connect('83123xuz2pp00000', {
    //     reliable: true
    // });

    // conn.on('open', function () {
    //     console.log("Connected to: " + conn.peer);

    var call = peer.call('83123xuz2pp00000', video.srcObject);
    // call.on('stream', function (remoteStream) {
    //     // Show stream in some video/canvas element.
    //     console.log("stream on", remoteStream);
    // });
    // call.on('error', function () {
    //     console.log(err);
    // })


    // });
}

initialize();




const controls = document.querySelector('.controls');
const cameraOptions = document.querySelector('.video-options>select');
const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const screenshotImage = document.querySelector('img');
// const buttons = [...controls.querySelectorAll('button')];
let streamStarted = false;
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const screenshot = document.getElementById("screen");
const connectBtn = document.getElementById("connect");
const sendBtn = document.getElementById("send");
// const [play, pause, screenshot] = buttons;
console.log("hii");

sendBtn.onclick = () => {
    peer.call('83123xuz2pp10000', video.srcObject);

}
const constraints = {
    video: {
        width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
        },
        height: {
            min: 720,
            ideal: 1080,
            max: 1440
        },
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
        const updatedConstraints = {
            ...constraints,
            deviceId: {
                exact: cameraOptions.value
            }
        };
        startStream(updatedConstraints);

    }
    // join();

};
connectBtn.onclick = () => {
    // Create connection to destination peer specified in the input field
    conn = peer.connect('83123xuz2pp10000', {
        reliable: true
    });

    conn.on('open', function () {
        console.log("Connected to: " + conn.peer);
    });
}
const pauseStream = () => {
    video.pause();
};

const doScreenshot = () => {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    screenshotImage.src = canvas.toDataURL('image/webp');
    screenshotImage.classList.remove('d-none');
};

pause.onclick = pauseStream;
screenshot.onclick = doScreenshot;

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
    cameraOptions.innerHTML = options.join('');
};

getCameraSelection();
