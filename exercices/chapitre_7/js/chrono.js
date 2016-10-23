var boutonElt = document.querySelector("button");
var secElt = document.querySelector("#secondes");
var chronoId;

boutonElt.addEventListener("click", function(e) {
    if (e.target.textContent === "Démarrer") {
        chronoId = setInterval(function () {
            var t = parseInt(secElt.textContent, 10);
            secElt.textContent = t + 1;
        }, 1000);

        e.target.textContent = "Arrêter";
    } else // arrêter
    {
        clearInterval(chronoId);
        e.target.textContent = "Démarrer";
    }
});
