/*
 * Exercice: afficher l'enfant d'un objet du DOM
 */

// Affiche un enfant d'un objet du DOM
// Le paramètre noeud est l'objet du DOM
// Le paramètre indice est l'indice de l'enfant à afficher
function afficherEnfant(noeud, indice) {
    var nodeType = noeud.nodeType;
    var nChildren = noeud.childNodes.length;


    if (nodeType === document.ELEMENT_NODE &&
        indice >= 0 && indice < nChildren) {
        console.log(noeud.childNodes[indice]);
    } else if (nodeType != document.ELEMENT_NODE) {
        console.error("Type de noeud incorrect");
    } else {
        console.error("Indice incorrect");
    }
}

// Doit afficher le noeud h1
afficherEnfant(document.body, 1);

// Doit afficher l'erreur "Indice incorrect"
// L'indice demandé est négatif
afficherEnfant(document.body, -1);

// Doit afficher l'erreur "Indice incorrect"
// Le noeud body a moins de 9 noeuds enfants
afficherEnfant(document.body, 8);

// Doit afficher l'erreur "Type de noeud incorrect"
// Le premier noeud enfant de body est textuel et n'a donc pas d'enfants
afficherEnfant(document.body.childNodes[0], 0);
