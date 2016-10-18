function getBoutonSouris(code) {
    var bouton = "inconnu";

    switch (code) {
        case 0:
            bouton = "gauche";
            break;
        case 1:
            bouton = "milieu";
            break;
        case 2:
            bouton = "droite";
            break;
    };

    return bouton;
}

// Affiche des informations sur un événement souris
function infosSouris(e) {
    console.log("Evénement souris : " + e.type + ", bouton : " + getBoutonSouris(e.button) + ", X : " + e.clientX + ", Y : " + e.clientY);
}

document.addEventListener("click", infosSouris);
