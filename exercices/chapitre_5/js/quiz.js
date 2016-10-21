// Liste des questions à afficher. Une question est déinie par son énoncé et sa
// réponse
var questions = [{
    enonce: "Combien font 2+2 ?",
    reponse: "2 + 2 = 4"
}, {
    enonce: "En quelle année Christophe Colomb a-t-il découvert l'Amérique ?",
    reponse: "1492"
}, {
    enonce: "On me trouve 2 fois dans l'année, 1 fois dans la semane, mais pas du tout dans le jour... Qui suis-je ?",
    reponse: "La lettre N"
}]

questions.forEach(function (obj, i) {
    document.body.style.marginLeft = "10px";

    // Bloc de la question
    enonceConteneurElt = document.createElement("div");
    titreElt = document.createElement("strong");
    titreElt.textContent = "Question " + (i+1) + ": ";
    enonceElt = document.createElement("i");
    enonceElt.textContent = obj.enonce;

    enonceConteneurElt.appendChild(titreElt);
    enonceConteneurElt.appendChild(enonceElt);
    enonceConteneurElt.style.marginBottom = "1ex";


    document.getElementById("contenu").appendChild(enonceConteneurElt);

    // Bloc de la réponse
    reponseConteneurElt = document.createElement("div");
    reponseElt = document.createElement("span");
    reponseElt.textContent = obj.reponse;
    reponseElt.style.display = "none";
    boutonElt = document.createElement("button");
    boutonElt.textContent = "Afficher la réponse";

    boutonElt.addEventListener("click", function (e) {
        e.target.style.display = "none";
        e.target.previousSibling.style.display = "inline";
    });

    reponseConteneurElt.appendChild(reponseElt);
    reponseConteneurElt.appendChild(boutonElt);
    reponseConteneurElt.style.marginBottom = "1ex";

    document.getElementById("contenu").appendChild(reponseConteneurElt);

});

