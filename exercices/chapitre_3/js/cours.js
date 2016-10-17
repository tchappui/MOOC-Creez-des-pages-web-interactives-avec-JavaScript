// Créer un nouvel élément paragram pièce par pièce
var paragrapheElt = document.createElement("p");
var texteElt1 = document.createTextNode("En voici une ");
var lienElt = document.createElement("a");
lienElt.href = "https://fr.wikipedia.org/wiki/Liste_des_langages_de_programmation";
lienElt.textContent = "liste";
var texteElt2 = document.createTextNode(" plus complète.");

paragrapheElt.appendChild(texteElt1);
paragrapheElt.appendChild(lienElt);
paragrapheElt.appendChild(texteElt2);

// On récupère l'élément contenu et on y insère le nouveau paragraphe
var contenuElt = document.getElementById("contenu");
contenuElt.appendChild(paragrapheElt);
