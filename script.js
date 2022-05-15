window.onload = () => {
    loadData();
    setInterval(() => {
        findDistance();
    }, 10000);

    // getLocation();
    let gps_button = document.getElementById('gps-button');
    if (gps_button) {
        gps_button.onclick = function () { getLocation() };
    }

    let take_snapshot_button = document.getElementById('take-snapshot');

    take_snapshot_button.onclick = function () {
        // var strMime = "image/jpeg";
        // // imgData = renderer.domElement.toDataURL(strMime);
        // var imgData = document.getElementsByClassName("a-canvas")[0].toDataURL();


        //document.querySelector('a-scene').components.screenshot.capture('perspective')


        let canvasNew = document.createElement('canvas');
        let canvas = document.getElementsByClassName("a-canvas")[0];
        let video = document.getElementById("arjs-video");

        canvasNew.width = video.clientWidth;
        canvasNew.height = video.clientHeight;

        let ctx = canvasNew.getContext('2d');
        ctx.drawImage(video, 0, 0, canvasNew.width, canvasNew.height);
        ctx.drawImage(canvas, 0, 0, canvasNew.width, canvasNew.height);

        let imgData = canvasNew.toDataURL('image/png');

        console.log("imgData", imgData)
        saveFile(imgData, "test.png");



        // html2canvas(document.getElementById("body")).then((canvas) => {
        //     let a = document.createElement("a");
        //     a.download = "cremaAR.png";
        //     a.href = canvas.toDataURL("image/png");
        //     a.click(); // MAY NOT ALWAYS WORK!
        //   });
    };
}

var saveFile = function (strData, filename) {
    console.log("entro in save file")
    var link = document.createElement('a');
    if (typeof link.download === 'string') {
        document.body.appendChild(link); //Firefox requires the link to be in the body
        link.download = filename;
        link.href = strData;
        link.click();
        document.body.removeChild(link); //remove the link when done
    } else {
        location.replace(uri);
    }
}

function loadData() {
    // var json = require('./data.json');
    // console.log("json", json);
    fetch("./data.json")
        .then(response => {
            return response.json();
        })
        .then(jsondata => {
            console.log(jsondata);
            renderModels(jsondata.models);
        });
}

function renderModels(models) {
    let scene = document.querySelector('a-scene');

    models.forEach((model) => {
        let box = document.createElement('a-box');
        box.id = model.id;
        box.setAttribute('gps-projected-entity-place', `latitude: ${model.location.lat}; longitude: ${model.location.lng};`);
        box.setAttribute('material', `color: ${model.color}`);
        box.setAttribute('scale', '10 10 10');
        //box.setAttribute('animation-mixer', '');
        console.log("box", box)
        scene.appendChild(box);
    });
}

function findDistance() {
    let cam = document.querySelector("[camera]");
    let box = document.getElementById('box-duomo');
    let camPos = cam.object3D.position;
    let boxPos = box.object3D.position;
    let distance = camPos.distanceTo(boxPos);
    console.log("distance", distance);
    const info = document.getElementById('distance')
    info.innerHTML = distance;

    // if (distance < 5) {
    //     // camera closer than 5m, do something
    // }
    // const distanceMsg = document.getElementById('box-duomo').getAttribute('distanceMsg');
    // console.log("distanceMsg - Duomo", distanceMsg);
    // const info = document.getElementById('distance')
    // info.innerHTML = distanceMsg;

    const distanceMD = document.getElementById('box-md').getAttribute('distanceMsg');
    console.log("distanceMsg - MD", distanceMD);
    const infoMD = document.getElementById('distance-md')
    infoMD.innerHTML = distanceMD;


    // const distanceRivolta = document.getElementById('box-rivolta').getAttribute('distanceMsg');
    // console.log("distanceMsg - Rivolta", distanceRivolta);
    // const infoRivolta = document.getElementById('distance-rivolta')
    // infoRivolta.innerHTML = distanceRivolta;

    // alert(distanceMsg);
}


function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    alert("Latitude : " + latitude + " Longitude: " + longitude);
}
function errorHandler(err) {
    if (err.code == 1) {
        alert("Error: Access is denied! If you are using an IPhone go to Settings > Privacy > Location > Safari and Enable and if the problem persist go to Settings > Safari > Position > Enable");
    }
    else if (err.code == 2) {
        alert("Error: Position is unavailable!");
    }
}

function getLocation() {
    if (navigator.geolocation) {
        // timeout at 60000 milliseconds (60 seconds)
        var options = { timeout: 60000 };
        navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
    } else {
        alert("Sorry, browser does not support geolocation!");
    }
}
