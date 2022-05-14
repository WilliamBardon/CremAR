window.onload = () => {
    setInterval(() => {
        findDistance();
    }, 10000);

    // getLocation();
    let gps_button = document.getElementById('gps-button');
    if (gps_button) {
        gps_button.onclick = function () { getLocation() };
    }

}

function findDistance() {
    const distanceMsg = document.getElementById('box-duomo').getAttribute('distanceMsg');
    const info = document.getElementById('distance')
    info.innerHTML = distanceMsg;

    const distanceMD = document.getElementById('box-md').getAttribute('distanceMsg');
    const infoMD = document.getElementById('distance-md')
    infoMD.innerHTML = distanceMD;

    const distanceRivolta = document.getElementById('box-rivolta').getAttribute('distanceMsg');
    const infoRivolta = document.getElementById('distance-rivolta')
    infoRivolta.innerHTML = distanceRivolta;


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
