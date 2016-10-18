function gestionCouleur(e) {
    var code = String.fromCharCode(e.charCode).toUpperCase();
    console.log("Keypress: " + code);

    var color = "";

    switch (code) {
        case "R":
            color = "red";
            break;
        case "J":
            color = "yellow";
            break;
        case "V":
            color = "green";
            break;
        case "B":
            color = "white";
            break;
        default:
            // Do nothing
            break;
    }

    var divs = document.querySelectorAll("body > div");

    for (var i = 0; color && i < divs.length; i++) {
        divs[i].style.backgroundColor = color;
    }
}

document.addEventListener("keypress", gestionCouleur);
