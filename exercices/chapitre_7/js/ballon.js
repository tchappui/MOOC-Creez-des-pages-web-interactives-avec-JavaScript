var demarrerElt = document.getElementById("demarrer");
var arreterElt = document.getElementById("arreter");

var cadreElt = document.getElementById("cadre");
var ballonElt = document.getElementById("ballon");

var largeurBallon = parseInt(getComputedStyle(ballonElt).width, 10);
var positionStop = parseInt(getComputedStyle(cadreElt).width, 10) - largeurBallon;

var positionInit = 0;
var position = 0;
var vitesse = 5;
var direction = 1;

var animationId;

function animerBallon () {
    var distance = vitesse * direction;

    if (position <= vitesse && direction < 0)
    {
        distance = position * direction;
        direction = -direction;
    }
    else if (positionStop - position <= vitesse && direction > 0)
    {
        distance = (positionStop - position) * direction;
        direction = -direction;
    }

    position += distance;
    ballonElt.style.left = position + "px";

    animationId = requestAnimationFrame(animerBallon);
}

demarrerElt.addEventListener("click", function (e) {
    animationId = requestAnimationFrame(animerBallon);
    demarrerElt.disabled = true;
    arreterElt.disabled = false;
});

arreterElt.addEventListener("click", function (e) {
    cancelAnimationFrame(animationId);
    demarrerElt.disabled = false;
    arreterElt.disabled = true;
});


