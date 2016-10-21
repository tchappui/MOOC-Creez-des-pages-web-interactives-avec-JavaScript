//écrire le gestionnaire d'événement pour la modification d'un dessert
function handle_click_on_listitem(e) {
    modif = prompt("Proposez votre modification:");
    e.target.textContent = modif;
}

//écrire le gestionnaire d'événement pour l'ajout d'un dessert
function handle_click_on_button(e) {
    nouveau = prompt("Ajoutez un nouveau dessert à votre liste de favoris:");
    nouveauElt = document.createElement("li");
    nouveauElt.textContent = nouveau;

    document.querySelector("#desserts").appendChild(nouveauElt);
    nouveauElt.addEventListener("click", handle_click_on_listitem);

}

buttonElt = document.querySelector("button");
buttonElt.addEventListener("click", handle_click_on_button);

itemElts = document.querySelectorAll("li");

for (var i = 0; i < itemElts.length; i++)
{
    itemElts[i].addEventListener("click", handle_click_on_listitem);
}
